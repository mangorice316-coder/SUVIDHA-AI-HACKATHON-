import React from 'react';
import { ActiveModule } from '../../types/common';
import { Network, Languages, GitFork } from 'lucide-react';

interface ModuleNavProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
}

export const ModuleNav: React.FC<ModuleNavProps> = ({
  activeModule,
  onSelectModule
}) => {
  return (
    <nav className="module-tabs-wrapper" aria-label="Main Accessibility Pillars">
      <div className="module-tabs" role="tablist">
        {/* Module 1: TopoSTEM */}
        <button
          role="tab"
          aria-selected={activeModule === 'topostem'}
          aria-controls="panel-topostem"
          id="tab-topostem"
          className={`module-tab-btn ${activeModule === 'topostem' ? 'active' : ''}`}
          onClick={() => onSelectModule('topostem')}
        >
          <Network size={18} />
          <span>TopoSTEM (Spatial & Visual)</span>
          <span className="tab-badge">Press 1</span>
        </button>

        {/* Module 2: TransLanguaSTEM */}
        <button
          role="tab"
          aria-selected={activeModule === 'translangua'}
          aria-controls="panel-translangua"
          id="tab-translangua"
          className={`module-tab-btn ${activeModule === 'translangua' ? 'active' : ''}`}
          onClick={() => onSelectModule('translangua')}
        >
          <Languages size={18} />
          <span>TransLanguaSTEM (Academic Register)</span>
          <span className="tab-badge">Press 2</span>
        </button>

        {/* Module 3: PathWeaver */}
        <button
          role="tab"
          aria-selected={activeModule === 'pathweaver'}
          aria-controls="panel-pathweaver"
          id="tab-pathweaver"
          className={`module-tab-btn ${activeModule === 'pathweaver' ? 'active' : ''}`}
          onClick={() => onSelectModule('pathweaver')}
        >
          <GitFork size={18} />
          <span>PathWeaver (Hidden Curriculum)</span>
          <span className="tab-badge">Press 3</span>
        </button>
      </div>
    </nav>
  );
};
