import React, { useState } from 'react';
import { SubjectOption } from '../subject_select/SubjectSelectScreen';
import { SupportedLanguage } from '../../types/translangua';
import {
  ArrowLeft, BookOpen, Cpu, Award, BarChart3, Globe, GitBranch,
  BookX, Calendar, Sparkles, Bot, Flame, Zap, Brain, Layers, FlaskConical
} from 'lucide-react';
import { TRANSLANGUA_PRESET_STUDIES } from '../../services/fixtures';
import { BridgeCoreFlow } from '../translangua/BridgeCoreFlow';
import { DualLayerCard } from '../translangua/DualLayerCard';
import { VocabularyBridge } from '../translangua/VocabularyBridge';
import { ProofAssembler } from '../translangua/ProofAssembler';
import { AcademicRegisterScorer } from '../translangua/AcademicRegisterScorer';
import { TopoSTEMView } from '../topostem/TopoSTEMView';
import { CustomStudyView } from '../custom_study/CustomStudyView';
import { LearningProgressView } from '../progress/LearningProgressView';
import { SkillTreeView } from '../skill_tree/SkillTreeView';
import { MistakeNotebookView } from '../mistakes/MistakeNotebookView';
import { SpacedRevisionView } from '../spaced_revision/SpacedRevisionView';
import { TeachItBackView } from '../feynman/TeachItBackView';
import { LearningCoachHub } from '../learning_os/LearningCoachHub';
import { ExplainThreeWaysView } from '../learning_os/ExplainThreeWaysView';
import { VirtualExperimentLab } from '../learning_os/VirtualExperimentLab';
import { AiTutorModal } from '../tutor/AiTutorModal';
import { DailyMissionModal } from '../gamification/DailyMissionModal';
import { RoadmapModal } from '../roadmap/RoadmapModal';
import { learningEngine } from '../../services/learningEngine';
import { audioEngine } from '../../services/audioEngine';
import { curriculumManager } from '../../services/curriculumState';

interface SubjectStudyViewProps {
  subject: SubjectOption;
  onBackToSubjects: () => void;
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const SubjectStudyView: React.FC<SubjectStudyViewProps> = ({
  subject,
  onBackToSubjects,
  selectedLanguage,
  onLanguageChange
}) => {
  const [activeTab, setActiveTab] = useState<
    'coach_hub' | 'bridge' | 'three_ways' | 'experiment' | 'skill_tree' | 'diagram' | 'derivation' | 'revision' | 'mistakes' | 'feynman' | 'progress'
  >(() => {
    return (subject.initialTab as any) || 'coach_hub';
  });

  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [isMissionsOpen, setIsMissionsOpen] = useState<boolean>(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState<boolean>(false);

  const getTabHumanLabel = (tab: string): string => {
    switch (tab) {
      case 'coach_hub': return 'AI Coach Hub';
      case 'bridge': return 'Concept Bridge';
      case 'three_ways': return 'Explain 3 Ways';
      case 'experiment': return 'Virtual Experiment Lab';
      case 'skill_tree': return 'Skill Tree & Gaps';
      case 'diagram': return '3D Diagram Lab';
      case 'derivation': return 'Exam Derivation Lab';
      case 'revision': return 'Spaced Revision';
      case 'mistakes': return 'Mistake Notebook';
      case 'feynman': return 'Teach It Back (Feynman)';
      case 'progress': return 'Progress & Mastery';
      default: return 'Study Session';
    }
  };

  // Automatically remember the student's exact tab position
  React.useEffect(() => {
    curriculumManager.saveProgress(
      subject.id,
      subject.name,
      activeTab,
      getTabHumanLabel(activeTab),
      2
    );
  }, [subject.id, subject.name, activeTab]);

  const study = TRANSLANGUA_PRESET_STUDIES[subject.studyKey] || TRANSLANGUA_PRESET_STUDIES.maxwell_displacement;

  const languages: { code: SupportedLanguage; name: string; native: string }[] = [
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  // If custom scanner was selected
  if (subject.id === 'custom') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            className="btn btn-outline"
            onClick={onBackToSubjects}
            style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} />
            <span>Choose Another Subject</span>
          </button>
          <div style={{ fontSize: '13px', color: 'var(--cyan-primary)', fontWeight: 700 }}>
            AI Custom Textbook Scanner Mode
          </div>
        </div>
        <CustomStudyView />
      </div>
    );
  }

  return (
    <div className="subject-study-wrapper" style={{ position: 'relative' }}>
      
      {/* Subject Header & Quick Stats Bar */}
      <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.98))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              className="btn btn-outline"
              onClick={onBackToSubjects}
              style={{ fontSize: '12px', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              title="Return to Subject Selection"
            >
              <ArrowLeft size={15} />
              <span>All Subjects</span>
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span className="hero-pill-badge" style={{ fontSize: '10px' }}>{subject.name} • {subject.grade}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{subject.curriculum}</span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {subject.title}
              </h2>
            </div>
          </div>

          {/* Gamification Stats & Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            
            {/* Master Roadmap Button */}
            <button
              onClick={() => {
                setIsRoadmapOpen(true);
                audioEngine.playChime(650, 0.15);
              }}
              className="btn btn-outline"
              style={{
                fontSize: '11.5px',
                padding: '5px 12px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderColor: 'rgba(0, 229, 255, 0.4)',
                color: 'var(--cyan-primary)'
              }}
            >
              <span>🗺️ Roadmap & Blueprint</span>
            </button>

            {/* XP & Streak Trigger */}
            <button
              onClick={() => {
                setIsMissionsOpen(true);
                audioEngine.playChime(650, 0.15);
              }}
              className="btn btn-outline"
              style={{
                fontSize: '12px',
                padding: '5px 12px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderColor: 'rgba(245, 158, 11, 0.4)'
              }}
            >
              <span style={{ color: 'var(--amber-primary)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Zap size={13} fill="currentColor" /> {learningEngine.getXp()} XP
              </span>
              <span style={{ color: '#f43f5e', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Flame size={13} fill="currentColor" /> {learningEngine.getStreak()}d
              </span>
            </button>

            {/* Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} color="var(--cyan-primary)" />
              <div style={{ display: 'flex', gap: '4px' }}>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    className={`btn ${selectedLanguage === l.code ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '11px', padding: '4px 8px' }}
                    onClick={() => {
                      onLanguageChange(l.code);
                      audioEngine.speakAnnouncement(`Switched explanation language to ${l.name}`);
                    }}
                  >
                    {l.native}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Comprehensive Navigation Tabs */}
      <nav className="module-tabs-wrapper" aria-label="Subject Study Tabs" style={{ marginBottom: '20px' }}>
        <div className="module-tabs" role="tablist" style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: 'flex', gap: '6px' }}>
          
          <button
            role="tab"
            aria-selected={activeTab === 'coach_hub'}
            className={`module-tab-btn ${activeTab === 'coach_hub' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('coach_hub');
              audioEngine.playChime(580, 0.1);
            }}
          >
            <Brain size={15} />
            <span>AI Learning Coach Hub</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'bridge'}
            className={`module-tab-btn ${activeTab === 'bridge' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('bridge');
              audioEngine.playChime(600, 0.1);
            }}
          >
            <BookOpen size={15} />
            <span>Concept Bridge</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'three_ways'}
            className={`module-tab-btn ${activeTab === 'three_ways' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('three_ways');
              audioEngine.playChime(620, 0.1);
            }}
          >
            <Layers size={15} />
            <span>"Explain 3 Ways"</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'experiment'}
            className={`module-tab-btn ${activeTab === 'experiment' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('experiment');
              audioEngine.playChime(640, 0.1);
            }}
          >
            <FlaskConical size={15} />
            <span>Virtual Experiment Lab</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'skill_tree'}
            className={`module-tab-btn ${activeTab === 'skill_tree' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('skill_tree');
              audioEngine.playChime(660, 0.1);
            }}
          >
            <GitBranch size={15} />
            <span>Skill Tree & Gaps</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'diagram'}
            className={`module-tab-btn ${activeTab === 'diagram' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('diagram');
              audioEngine.playChime(680, 0.1);
            }}
          >
            <Cpu size={15} />
            <span>3D Diagram Lab</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'derivation'}
            className={`module-tab-btn ${activeTab === 'derivation' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('derivation');
              audioEngine.playChime(700, 0.1);
            }}
          >
            <Award size={15} />
            <span>Exam Derivation</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'revision'}
            className={`module-tab-btn ${activeTab === 'revision' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('revision');
              audioEngine.playChime(720, 0.1);
            }}
          >
            <Calendar size={15} />
            <span>Spaced Revision</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'mistakes'}
            className={`module-tab-btn ${activeTab === 'mistakes' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('mistakes');
              audioEngine.playChime(740, 0.1);
            }}
          >
            <BookX size={15} />
            <span>Mistake Notebook</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'feynman'}
            className={`module-tab-btn ${activeTab === 'feynman' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('feynman');
              audioEngine.playChime(760, 0.1);
            }}
          >
            <Sparkles size={15} />
            <span>"Teach It Back" Feynman</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'progress'}
            className={`module-tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('progress');
              audioEngine.playChime(780, 0.1);
            }}
          >
            <BarChart3 size={15} />
            <span>Progress & Mastery</span>
          </button>

        </div>
      </nav>

      {/* Tab 0: AI Learning Coach Hub (Central OS View) */}
      {activeTab === 'coach_hub' && (
        <LearningCoachHub
          onStartSessionAction={(action) => {
            if (action === 'concept_repair') setActiveTab('bridge');
            else if (action === 'active_recall') setActiveTab('revision');
            else if (action === 'problem_solving') setActiveTab('derivation');
            else if (action === 'mistake_review') setActiveTab('mistakes');
          }}
        />
      )}

      {/* Tab 1: Concept Bridge & Textbook Lesson */}
      {activeTab === 'bridge' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <BridgeCoreFlow />

          <div className="view-grid-two-col">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <DualLayerCard studySet={study} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <VocabularyBridge vocabulary={study.vocabularyAnchors} />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Explain It Three Ways */}
      {activeTab === 'three_ways' && (
        <ExplainThreeWaysView currentConceptKey={subject.studyKey} />
      )}

      {/* Tab 3: Virtual Experiment Lab */}
      {activeTab === 'experiment' && (
        <VirtualExperimentLab />
      )}

      {/* Tab 4: Skill Tree & Knowledge Map */}
      {activeTab === 'skill_tree' && (
        <SkillTreeView
          currentLanguage={selectedLanguage}
          onSelectConceptStudy={() => {
            setActiveTab('bridge');
          }}
        />
      )}

      {/* Tab 5: Diagram & Circuit Lab */}
      {activeTab === 'diagram' && (
        <div>
          <TopoSTEMView />
        </div>
      )}

      {/* Tab 6: Exam Derivation Practice */}
      {activeTab === 'derivation' && (
        <div className="view-grid-two-col">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ProofAssembler
              initialPieces={study.proofAssemblerPieces}
              expectedSummary={study.formalEnglishSummary}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <AcademicRegisterScorer />
          </div>
        </div>
      )}

      {/* Tab 7: Spaced Revision Queue */}
      {activeTab === 'revision' && (
        <SpacedRevisionView />
      )}

      {/* Tab 8: Mistake Notebook & "Why Am I Wrong?" */}
      {activeTab === 'mistakes' && (
        <MistakeNotebookView />
      )}

      {/* Tab 9: "Teach It Back" Feynman Studio */}
      {activeTab === 'feynman' && (
        <TeachItBackView />
      )}

      {/* Tab 10: Learning Progress & Mastery */}
      {activeTab === 'progress' && (
        <div>
          <LearningProgressView />
        </div>
      )}

      {/* FLOATING ACTION BUTTON: 24/7 Socratic AI Tutor with Personas */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 900
      }}>
        <button
          onClick={() => {
            setIsTutorOpen(true);
            audioEngine.playChime(700, 0.2);
          }}
          className="btn btn-primary"
          style={{
            padding: '14px 22px',
            borderRadius: '999px',
            boxShadow: '0 10px 30px rgba(0, 229, 255, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 800
          }}
        >
          <Bot size={18} />
          <span>Ask Socratic AI Tutor</span>
        </button>
      </div>

      {/* Modals */}
      <AiTutorModal
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        currentLanguage={selectedLanguage}
        currentConceptTitle={subject.title}
      />

      <DailyMissionModal
        isOpen={isMissionsOpen}
        onClose={() => setIsMissionsOpen(false)}
      />

      <RoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
      />

    </div>
  );
};
