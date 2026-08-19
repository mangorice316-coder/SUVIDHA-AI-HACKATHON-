import React from 'react';
import { ActiveModule } from '../../types/common';
import { BookOpen, Cpu, Award, Sparkles, BarChart3 } from 'lucide-react';

interface ModuleNavProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
}

export const ModuleNav: React.FC<ModuleNavProps> = ({
  activeModule,
  onSelectModule
}) => {
  return (
    <nav className="module-tabs-wrapper" aria-label="Main Study Modes">
      <div className="module-tabs" role="tablist">
        {/* Tab 1: Concept Bridge */}
        <button
          role="tab"
          aria-selected={activeModule === 'translangua'}
          aria-controls="panel-translangua"
          id="tab-translangua"
          className={`module-tab-btn ${activeModule === 'translangua' ? 'active' : ''}`}
          onClick={() => onSelectModule('translangua')}
        >
          <BookOpen size={18} />
          <span>Concept Bridge (NCERT Lessons)</span>
          <span className="tab-badge">Press 1</span>
        </button>

        {/* Tab 2: Diagram & Circuit Lab */}
        <button
          role="tab"
          aria-selected={activeModule === 'topostem'}
          aria-controls="panel-topostem"
          id="tab-topostem"
          className={`module-tab-btn ${activeModule === 'topostem' ? 'active' : ''}`}
          onClick={() => onSelectModule('topostem')}
        >
          <Cpu size={18} />
          <span>Interactive Diagram Lab</span>
          <span className="tab-badge">Press 2</span>
        </button>

        {/* Tab 3: Derivation Practice */}
        <button
          role="tab"
          aria-selected={activeModule === 'proof_lab'}
          aria-controls="panel-proof-lab"
          id="tab-proof-lab"
          className={`module-tab-btn ${activeModule === 'proof_lab' ? 'active' : ''}`}
          onClick={() => onSelectModule('proof_lab')}
        >
          <Award size={18} />
          <span>Exam Derivation Practice</span>
          <span className="tab-badge">Press 3</span>
        </button>

        {/* Tab 4: AI Custom Scanner */}
        <button
          role="tab"
          aria-selected={activeModule === 'custom_study'}
          aria-controls="panel-custom-study"
          id="tab-custom-study"
          className={`module-tab-btn ${activeModule === 'custom_study' ? 'active' : ''}`}
          onClick={() => onSelectModule('custom_study')}
        >
          <Sparkles size={18} />
          <span>AI Lesson Scanner</span>
          <span className="tab-badge">Press 4</span>
        </button>

        {/* Tab 5: Study Progress */}
        <button
          role="tab"
          aria-selected={activeModule === 'progress'}
          aria-controls="panel-progress"
          id="tab-progress"
          className={`module-tab-btn ${activeModule === 'progress' ? 'active' : ''}`}
          onClick={() => onSelectModule('progress')}
        >
          <BarChart3 size={18} />
          <span>My Progress</span>
          <span className="tab-badge">Press 5</span>
        </button>
      </div>
    </nav>
  );
};
