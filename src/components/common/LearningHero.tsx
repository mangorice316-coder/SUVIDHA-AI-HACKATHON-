import React, { useState } from 'react';
import { BookOpen, Sparkles, Languages, Lightbulb, ChevronDown, ChevronUp, Atom, FlaskConical, Dna, Cpu } from 'lucide-react';
import { ActiveModule } from '../../types/common';
import { audioEngine } from '../../services/audioEngine';

interface LearningHeroProps {
  onSelectModule: (mod: ActiveModule) => void;
  activeModule: ActiveModule;
}

export const LearningHero: React.FC<LearningHeroProps> = ({
  onSelectModule,
  activeModule
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <section className="learning-hero-container" aria-label="Welcome and Study Guide">
      <div className="hero-top-banner">
        <div className="hero-badge-group">
          <span className="hero-pill-badge">
            <Sparkles size={13} /> Multilingual STEM Learning Assistant
          </span>
          <span className="hero-status-pill">
            <span className="live-pulse-dot"></span> NCERT & STEM Curriculum Aligned
          </span>
        </div>

        <button 
          className="hero-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse Guide" : "Expand Guide"}
        >
          {isExpanded ? (
            <><span>Compact</span> <ChevronUp size={14} /></>
          ) : (
            <><span>Study Overview</span> <ChevronDown size={14} /></>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="hero-body">
          <div className="hero-main-statement">
            <h2 className="hero-headline">
              <span className="highlight-text">Understand concepts in your mother tongue.</span> Master formal English exams.
            </h2>
            <p className="hero-subtext">
              Don't let complex academic terminology or dense textbook phrasing block your learning. 
              LearnCraft maps everyday physical intuition directly to formal scientific terminology so you can read textbooks and write exam derivations with complete confidence.
            </p>
          </div>

          {/* Quick Subject Study Presets */}
          <div className="hero-subject-chips">
            <div className="subject-chip-title">
              <BookOpen size={14} color="var(--cyan-primary)" />
              <span>Select a Topic to Study:</span>
            </div>
            <div className="subject-chips-list">
              <button 
                className={`subject-chip-btn ${activeModule === 'translangua' ? 'active' : ''}`}
                onClick={() => {
                  onSelectModule('translangua');
                  audioEngine.speakAnnouncement("Loaded Physics: Maxwell's Displacement Current.");
                }}
              >
                <Atom size={14} color="var(--cyan-primary)" />
                <span>Physics: Displacement Current</span>
                <span className="chip-grade">Class 12</span>
              </button>

              <button 
                className={`subject-chip-btn ${activeModule === 'translangua' ? 'active' : ''}`}
                onClick={() => {
                  onSelectModule('translangua');
                  audioEngine.speakAnnouncement("Loaded Chemistry: Chemical Equilibrium.");
                }}
              >
                <FlaskConical size={14} color="var(--emerald-primary)" />
                <span>Chemistry: Le Chatelier's Law</span>
                <span className="chip-grade">Class 11</span>
              </button>

              <button 
                className={`subject-chip-btn ${activeModule === 'topostem' ? 'active' : ''}`}
                onClick={() => {
                  onSelectModule('topostem');
                  audioEngine.speakAnnouncement("Loaded Interactive Circuit & Diagram Lab.");
                }}
              >
                <Cpu size={14} color="var(--purple-primary)" />
                <span>Diagram Lab: Spatial Circuits</span>
                <span className="chip-grade">Interactive</span>
              </button>

              <button 
                className={`subject-chip-btn ${activeModule === 'proof_lab' ? 'active' : ''}`}
                onClick={() => {
                  onSelectModule('proof_lab');
                  audioEngine.speakAnnouncement("Loaded Derivation Practice Lab.");
                }}
              >
                <Lightbulb size={14} color="var(--amber-primary)" />
                <span>Exam Derivation Practice</span>
                <span className="chip-grade">Self-Test</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
