import React from 'react';
import { ActionDAGNode } from '../../types/pathweaver';
import { CheckCircle2, Circle, Mail, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface ActionTimelineProps {
  nodes: ActionDAGNode[];
  activeNodeId: string | null;
  onSelectNode: (node: ActionDAGNode) => void;
  onToggleComplete: (nodeId: string) => void;
  onOpenScript: (scriptId: string) => void;
}

export const ActionTimeline: React.FC<ActionTimelineProps> = ({
  nodes,
  activeNodeId,
  onSelectNode,
  onToggleComplete,
  onOpenScript
}) => {
  return (
    <div className="card" role="region" aria-label="Single-Threaded Execution Roadmap">
      <div className="card-header">
        <h3 className="card-title">
          <FileText size={18} color="var(--emerald-primary)" />
          <span>Deterministic Action Checklist</span>
        </h3>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Chronological Sequence</span>
      </div>

      <div className="dag-flow-container">
        {nodes.map((node, index) => {
          const isSelected = node.id === activeNodeId;
          const isDone = node.status === 'completed';

          return (
            <div
              key={node.id}
              className={`dag-node-card ${node.isImplicitSocialPrerequisite ? 'implicit-prereq' : ''} ${isDone ? 'completed' : ''}`}
              style={{
                borderColor: isSelected ? 'var(--cyan-primary)' : undefined,
                boxShadow: isSelected ? '0 0 16px var(--cyan-glow)' : undefined
              }}
              onClick={() => onSelectNode(node)}
            >
              {/* Step Marker Button */}
              <button
                className="dag-step-number"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleComplete(node.id);
                  audioEngine.speakAnnouncement(`Toggled step ${index + 1} completion status.`);
                }}
                aria-label={`Mark step ${index + 1} as ${isDone ? 'incomplete' : 'completed'}`}
              >
                {isDone ? <CheckCircle2 size={18} color="var(--emerald-primary)" /> : index + 1}
              </button>

              {/* Node Details */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {node.title}
                  </h4>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--amber-primary)' }}>
                    Due: {node.hardDeadlineDate}
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.5' }}>
                  {node.plainLanguageDirective}
                </p>

                {/* Implicit Warning */}
                {node.isImplicitSocialPrerequisite && (
                  <div style={{ background: 'hsla(43, 96%, 56%, 0.1)', border: '1px solid hsla(43, 96%, 56%, 0.3)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--amber-primary)', marginBottom: '8px' }}>
                    <AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    <strong>Hidden Expectation:</strong> {node.explicitPolicyCitation}
                  </div>
                )}

                {/* Action Trigger Button */}
                {node.scriptTemplateId && (
                  <button
                    className="btn btn-secondary"
                    style={{ fontSize: '11px', padding: '6px 10px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenScript(node.scriptTemplateId!);
                    }}
                  >
                    <Mail size={13} color="var(--cyan-primary)" />
                    <span>Open Pre-Drafted Email Script</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
