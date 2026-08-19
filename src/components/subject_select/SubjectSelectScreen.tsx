import React, { useState } from 'react';
import { UserProfile, StudentClass, EducationBoard } from '../../types/common';
import { SupportedLanguage } from '../../types/translangua';
import {
  Atom, FlaskConical, Dna, Cpu, Sparkles, ArrowRight, ArrowLeft, Globe,
  User, BookOpen, GraduationCap, Calculator, Play, CheckCircle2, Clock,
  Flame, Activity, RotateCcw, Search, Layers, Bookmark, ChevronRight, BarChart3
} from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';
import {
  curriculumManager,
  SubjectCategory,
  LessonItem,
  SubjectIconType
} from '../../services/curriculumState';

export interface SubjectOption {
  id: string;
  name: string;
  domain: string;
  grade: string;
  icon: SubjectIconType;
  title: string;
  summary: string;
  curriculum: string;
  defaultLanguage: SupportedLanguage;
  studyKey: string;
  initialTab?: string;
}

interface SubjectSelectScreenProps {
  userProfile: UserProfile;
  onSelectSubject: (subject: SubjectOption) => void;
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onSwitchProfile: () => void;
  onStartAdaptiveWorkflow?: () => void;
}

export const SubjectSelectScreen: React.FC<SubjectSelectScreenProps> = ({
  userProfile,
  onSelectSubject,
  selectedLanguage,
  onLanguageChange,
  onSwitchProfile,
  onStartAdaptiveWorkflow
}) => {
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState<SubjectCategory | null>(null);
  const [lessonSearchQuery, setLessonSearchQuery] = useState<string>('');

  const languages: { code: SupportedLanguage; name: string; native: string }[] = [
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  const getBoardLabel = (board: EducationBoard) => {
    switch (board) {
      case 'cbse': return 'CBSE / NCERT';
      case 'state_board': return 'State Board';
      case 'icse_isc': return 'ICSE / ISC';
      case 'university': return 'Technical University';
      default: return 'Curriculum';
    }
  };

  const getClassLabel = (cls: StudentClass) => {
    switch (cls) {
      case 'class_9': return 'Class 9';
      case 'class_10': return 'Class 10';
      case 'class_11': return 'Class 11';
      case 'class_12': return 'Class 12';
      case 'college_ug': return 'College STEM';
      default: return 'Grade';
    }
  };

  const categories = curriculumManager.getCurriculumForProfile(
    userProfile.studentClass,
    userProfile.board,
    selectedLanguage
  );

  const renderSubjectIcon = (icon: SubjectIconType, size = 26) => {
    switch (icon) {
      case 'maths':
        return <Calculator size={size} color="var(--cyan-primary)" />;
      case 'physics':
        return <Atom size={size} color="#38bdf8" />;
      case 'chemistry':
        return <FlaskConical size={size} color="var(--emerald-primary)" />;
      case 'biology':
        return <Dna size={size} color="var(--purple-primary)" />;
      case 'cs':
        return <Cpu size={size} color="var(--amber-primary)" />;
      case 'custom':
      default:
        return <Sparkles size={size} color="#ec4899" />;
    }
  };

  const handleLaunchLesson = (subject: SubjectCategory, lesson: LessonItem, resumeTab?: string) => {
    const option: SubjectOption = {
      id: lesson.id,
      name: subject.name,
      domain: lesson.domain || subject.domain,
      grade: `${getClassLabel(userProfile.studentClass)} (${getBoardLabel(userProfile.board)})`,
      icon: subject.icon,
      title: lesson.title,
      summary: lesson.summary,
      curriculum: `${subject.curriculum} — Chapter ${lesson.chapterNumber}`,
      defaultLanguage: selectedLanguage,
      studyKey: lesson.studyKey,
      initialTab: resumeTab
    };

    audioEngine.playChime(620, 0.2);
    audioEngine.speakAnnouncement(
      resumeTab
        ? `Resuming ${lesson.title} from where you left off in ${resumeTab}.`
        : `Opening ${lesson.title}.`
    );
    onSelectSubject(option);
  };

  return (
    <div className="subject-selection-container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '16px 8px' }}>
      
      {/* Student Welcome Header */}
      <div className="card" style={{
        marginBottom: '24px',
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.98))',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="hero-pill-badge" style={{ fontSize: '11px' }}>
                <User size={12} /> Student: {userProfile.name}
              </span>
              <span className="stat-capsule" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cyan-primary)' }}>
                {getBoardLabel(userProfile.board)} • {getClassLabel(userProfile.studentClass)}
              </span>
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
              {selectedSubjectCategory ? `${selectedSubjectCategory.name} Curriculum & Lessons` : `What would you like to study, ${userProfile.name}?`}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
              {selectedSubjectCategory
                ? `Browse all chapters and lessons for ${selectedSubjectCategory.name}. Click any lesson to start or resume from where you left off.`
                : `Showing personalized STEM subjects for ${getBoardLabel(userProfile.board)} ${getClassLabel(userProfile.studentClass)}.`}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Global Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-tertiary)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <Globe size={14} color="var(--cyan-primary)" />
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Language:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => onLanguageChange(l.code)}
                    className={`btn ${selectedLanguage === l.code ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '10px', padding: '2px 6px' }}
                  >
                    {l.native}
                  </button>
                ))}
              </div>
            </div>

            {/* Switch Profile Button */}
            <button
              className="btn btn-outline"
              onClick={onSwitchProfile}
              style={{ fontSize: '12px', padding: '6px 12px' }}
              title="Change Name, Class, or Board"
            >
              Switch Profile
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          LEVEL 1: MAIN SUBJECTS OVERVIEW GRID (BOX 1 MATHS, BOX 2 PHYSICS, etc.)
          ======================================================== */}
      {!selectedSubjectCategory && (
        <>
          {/* Adaptive Workflow Launch Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.12), rgba(168, 85, 247, 0.12))',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                color: 'var(--cyan-primary)',
                textTransform: 'uppercase',
                marginBottom: '6px'
              }}>
                <Sparkles size={13} />
                <span>Full Adaptive Onboarding & Diagnostic Engine</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                Want a fully customized 22-day study plan?
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                Input score target ➔ Ingest syllabus ➔ Take 3-min diagnostic ➔ Get your personalized knowledge map & daily mission.
              </p>
            </div>

            <button
              onClick={onStartAdaptiveWorkflow}
              className="btn btn-primary"
              style={{
                padding: '12px 22px',
                fontSize: '13.5px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 6px 20px rgba(0, 229, 255, 0.35)'
              }}
            >
              <span>Start Adaptive Diagnostic Workflow</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Section Heading */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Select a Subject Box
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {categories.length} Subject Disciplines Available
            </span>
          </div>

          {/* 6 Structured Subject Boxes Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '22px' }}>
            {categories.map((subject, idx) => {
              const stats = curriculumManager.getSubjectStats(subject);

              return (
                <div
                  key={subject.id}
                  className="card"
                  style={{
                    padding: '24px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8), rgba(2, 6, 23, 0.95))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    position: 'relative'
                  }}
                >
                  {/* Top Header */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: `${subject.color}18`,
                        border: `1px solid ${subject.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {renderSubjectIcon(subject.icon, 28)}
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '999px',
                          backgroundColor: `${subject.color}20`,
                          color: subject.color,
                          fontFamily: 'var(--font-mono)'
                        }}>
                          BOX ({idx + 1}) • {subject.name.toUpperCase()}
                        </span>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {subject.lessons.length} Interactive Lessons
                        </div>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                      {subject.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--cyan-primary)', fontWeight: 700, marginBottom: '10px' }}>
                      {subject.domain}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                      {subject.description}
                    </p>
                  </div>

                  {/* Progress & Last Studied Resume Bar */}
                  <div>
                    {/* Mastery Bar */}
                    <div style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Subject Mastery:</span>
                        <strong style={{ color: subject.color }}>{stats.averageMastery}%</strong>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${Math.max(5, stats.averageMastery)}%`,
                          height: '100%',
                          backgroundColor: subject.color,
                          borderRadius: '3px',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                    </div>

                    {/* Resume Badge if available */}
                    {stats.mostRecentLesson && stats.mostRecentRecord && (
                      <div style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(0, 229, 255, 0.08)',
                        border: '1px solid rgba(0, 229, 255, 0.25)',
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                          <Bookmark size={14} color="var(--cyan-primary)" style={{ flexShrink: 0 }} />
                          <div style={{ fontSize: '11.5px', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Resume: </span>
                            <strong>{stats.mostRecentLesson.title}</strong>
                            <span style={{ color: 'var(--cyan-primary)', display: 'block', fontSize: '10.5px' }}>
                              📍 Last at {stats.mostRecentRecord.lastTabName}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleLaunchLesson(subject, stats.mostRecentLesson!, stats.mostRecentRecord!.lastActiveTab)}
                          className="btn btn-primary"
                          style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '999px', flexShrink: 0 }}
                          title="Resume exactly where you left off"
                        >
                          <RotateCcw size={11} />
                          <span>Resume</span>
                        </button>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setSelectedSubjectCategory(subject);
                          audioEngine.playChime(650, 0.15);
                          audioEngine.speakAnnouncement(`Opened ${subject.name} lessons browser.`);
                        }}
                        className="btn btn-primary"
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          fontSize: '13px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Open {subject.name} Lessons ({subject.lessons.length})</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ========================================================
          LEVEL 2: SUBJECT CHAPTERS & LESSONS BROWSER (WHEN SUBJECT IS OPENED)
          ======================================================== */}
      {selectedSubjectCategory && (
        <div>
          {/* Breadcrumb & Navigation Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => {
                setSelectedSubjectCategory(null);
                audioEngine.playChime(520, 0.1);
              }}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', padding: '8px 16px' }}
            >
              <ArrowLeft size={16} />
              <span>← Back to All Subject Boxes</span>
            </button>

            {/* Quick Filter / Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 23, 42, 0.8)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <Search size={14} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Filter lessons or formulas..."
                value={lessonSearchQuery}
                onChange={(e) => setLessonSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '12.5px', outline: 'none', width: '200px' }}
              />
            </div>
          </div>

          {/* Subject Header Banner */}
          <div style={{
            padding: '24px 28px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: `1px solid ${selectedSubjectCategory.color}40`,
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: `${selectedSubjectCategory.color}20`,
                border: `1px solid ${selectedSubjectCategory.color}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {renderSubjectIcon(selectedSubjectCategory.icon, 32)}
              </div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                  {selectedSubjectCategory.name}
                </h3>
                <div style={{ fontSize: '13px', color: selectedSubjectCategory.color, fontWeight: 700 }}>
                  {selectedSubjectCategory.curriculum} • {selectedSubjectCategory.lessons.length} Core Interactive Chapters
                </div>
              </div>
            </div>

            {/* Overall Subject Stats */}
            {(() => {
              const stats = curriculumManager.getSubjectStats(selectedSubjectCategory);
              return (
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>
                      {stats.averageMastery}%
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Average Mastery</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--emerald-primary)', fontFamily: 'var(--font-mono)' }}>
                      {stats.completedLessons}/{stats.totalLessons}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Completed</div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Lessons List Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {selectedSubjectCategory.lessons
              .filter(l => {
                if (!lessonSearchQuery) return true;
                const q = lessonSearchQuery.toLowerCase();
                return l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q) || l.chapterName.toLowerCase().includes(q);
              })
              .map((lesson, lIdx) => {
                const prog = curriculumManager.getLessonProgress(lesson.id);
                const hasStarted = !!prog;
                const isMastered = prog && prog.masteryScore >= 80;

                return (
                  <div
                    key={lesson.id}
                    className="card"
                    style={{
                      padding: '20px 24px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(10, 15, 30, 0.85)',
                      border: isMastered ? '1px solid rgba(16, 185, 129, 0.4)' : hasStarted ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* Left: Chapter & Lesson Details */}
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '10.5px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: 'var(--text-secondary)',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          LESSON {lIdx + 1} • CHAPTER {lesson.chapterNumber}
                        </span>

                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {lesson.chapterName}
                        </span>

                        {isMastered ? (
                          <span style={{ fontSize: '10.5px', color: 'var(--emerald-primary)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <CheckCircle2 size={12} /> Mastered ({prog.masteryScore}%)
                          </span>
                        ) : hasStarted ? (
                          <span style={{ fontSize: '10.5px', color: 'var(--cyan-primary)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <Flame size={12} /> In Progress ({prog.masteryScore}%)
                          </span>
                        ) : (
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                            ⚪ Not Started
                          </span>
                        )}
                      </div>

                      <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                        {lesson.title}
                      </h4>

                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: 1.45 }}>
                        {lesson.summary}
                      </p>

                      {/* Formula Anchor or Details */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        {lesson.formulaAnchor && (
                          <span style={{
                            fontSize: '11.5px',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--purple-primary)',
                            backgroundColor: 'rgba(168, 85, 247, 0.1)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(168, 85, 247, 0.2)'
                          }}>
                            {lesson.formulaAnchor}
                          </span>
                        )}

                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {lesson.estimatedMinutes} mins
                        </span>

                        {/* Resume Point Tag */}
                        {prog && (
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            color: 'var(--cyan-primary)',
                            backgroundColor: 'rgba(0, 229, 255, 0.1)',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <Bookmark size={11} />
                            Resume at {prog.lastTabName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Action Button */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', flexShrink: 0 }}>
                      {hasStarted ? (
                        <button
                          onClick={() => handleLaunchLesson(selectedSubjectCategory, lesson, prog.lastActiveTab)}
                          className="btn btn-primary"
                          style={{
                            padding: '10px 20px',
                            fontSize: '13px',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            borderRadius: 'var(--radius-sm)',
                            boxShadow: '0 4px 14px rgba(0, 229, 255, 0.3)'
                          }}
                        >
                          <RotateCcw size={14} />
                          <span>Resume Where Left Off</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleLaunchLesson(selectedSubjectCategory, lesson)}
                          className="btn btn-primary"
                          style={{
                            padding: '10px 20px',
                            fontSize: '13px',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          <Play size={14} fill="currentColor" />
                          <span>Start Lesson 1</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

    </div>
  );
};
