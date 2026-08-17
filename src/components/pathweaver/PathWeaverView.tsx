import React, { useState } from 'react';
import { PathWeaverCaseStudy, ActionDAGNode } from '../../types/pathweaver';
import { PATHWEAVER_PRESET_CASES } from '../../services/fixtures';
import { DagVisualizer } from './DagVisualizer';
import { ActionTimeline } from './ActionTimeline';
import { ScriptModal } from './ScriptModal';
import { AlertCircle, GitFork, FileText, Sparkles } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

export const PathWeaverView: React.FC = () => {
  const [caseStudy, setCaseStudy] = useState<PathWeaverCaseStudy>(PATHWEAVER_PRESET_CASES.robotics_lab_access);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(caseStudy.nodes[0].id);
  const [activeScriptId, setActiveScriptId] = useState<string | null>(null);

  const handleToggleComplete = (nodeId: string) => {
    setCaseStudy(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => 
        n.id === nodeId 
          ? { ...n, status: n.status === 'completed' ? 'available' : 'completed' }
          : n
      )
    }));
  };

  const activeScript = activeScriptId && caseStudy.scripts[activeScriptId] ? caseStudy.scripts[activeScriptId] : null;

  return (
    <div className="tab-pane" role="tabpanel" id="panel-pathweaver" aria-labelledby="tab-pathweaver">
      {/* Top Banner */}
      <div className="judge-banner">
        <div className="judge-banner-content">
          <span className="judge-tag">Pillar 3 Focus</span>
          <div className="judge-banner-text">
            <strong>The Institutional Lore & Pathway Mismatch:</strong> Educational resources exist, but access is locked behind 40-page PDF handbooks and unwritten social prerequisites. PathWeaver compiles administrative policies into a deterministic Directed Acyclic Graph (DAG) of actionable micro-steps.
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="view-grid-two-col">
        {/* Left Column: Raw Policy Excerpt & Visual DAG */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Raw Policy Snippet */}
          <div className="card" style={{ borderLeft: '4px solid var(--amber-primary)' }}>
            <div className="card-header">
              <div>
                <span className="tab-badge" style={{ marginBottom: '6px', display: 'inline-block' }}>
                  {caseStudy.institutionContext}
                </span>
                <h2 className="card-title" style={{ fontSize: '17px' }}>
                  {caseStudy.title}
                </h2>
              </div>
            </div>

            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              Raw Opaque University Regulation Snippet (The Hidden Curriculum):
            </div>
            <div className="dense-source-box" style={{ borderLeftColor: 'var(--amber-primary)' }}>
              "{caseStudy.rawPolicySnippet}"
            </div>

            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--amber-primary)' }}>
              ⚠️ <strong>The Lockout Mechanism:</strong> {caseStudy.whyAutisticStudentsGetLockedOut}
            </div>
          </div>

          {/* Interactive Visual DAG Flowchart */}
          <DagVisualizer
            nodes={caseStudy.nodes}
            edges={caseStudy.edges}
            activeNodeId={activeNodeId}
            onSelectNode={(node) => setActiveNodeId(node.id)}
          />
        </div>

        {/* Right Column: Deterministic Action Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ActionTimeline
            nodes={caseStudy.nodes}
            activeNodeId={activeNodeId}
            onSelectNode={(node) => setActiveNodeId(node.id)}
            onToggleComplete={handleToggleComplete}
            onOpenScript={(scriptId) => setActiveScriptId(scriptId)}
          />
        </div>
      </div>

      {/* Pre-Drafted Script Modal */}
      <ScriptModal
        script={activeScript}
        onClose={() => setActiveScriptId(null)}
      />
    </div>
  );
};
