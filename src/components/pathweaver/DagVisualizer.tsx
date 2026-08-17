import React from 'react';
import { ActionDAGNode, DAGEdge } from '../../types/pathweaver';
import { Sparkles, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface DagVisualizerProps {
  nodes: ActionDAGNode[];
  edges: DAGEdge[];
  activeNodeId: string | null;
  onSelectNode: (node: ActionDAGNode) => void;
}

export const DagVisualizer: React.FC<DagVisualizerProps> = ({
  nodes,
  edges,
  activeNodeId,
  onSelectNode
}) => {
  const handleNodeClick = (node: ActionDAGNode) => {
    onSelectNode(node);
    audioEngine.speakAnnouncement(`Selected Step: ${node.title}. Deadline in ${node.daysToDeadline} days.`);
  };

  return (
    <div className="card" role="region" aria-label="Interactive Institutional Action DAG Flowchart">
      <div className="card-header">
        <h3 className="card-title">
          <Sparkles size={18} color="var(--amber-primary)" />
          <span>Compiled Prerequisite Dependency Graph (DAG)</span>
        </h3>
        <div style={{ display: 'flex', gap: '10px', fontSize: '11px' }}>
          <span style={{ color: 'var(--amber-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ● Implicit Social Prerequisite
          </span>
          <span style={{ color: 'var(--cyan-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ● Standard Bureaucratic Step
          </span>
        </div>
      </div>

      {/* Visual DAG Canvas */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '20px', position: 'relative', minHeight: '360px' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--cyan-primary)" />
            </marker>
          </defs>

          {edges.map(edge => {
            const fromNode = nodes.find(n => n.id === edge.fromNodeId);
            const toNode = nodes.find(n => n.id === edge.toNodeId);
            if (!fromNode || !toNode) return null;

            const isEdgeActive = fromNode.id === activeNodeId || toNode.id === activeNodeId;

            return (
              <line
                key={edge.id}
                x1={fromNode.position.x + 100}
                y1={fromNode.position.y + 30}
                x2={toNode.position.x + 100}
                y2={toNode.position.y + 30}
                stroke={isEdgeActive ? 'var(--cyan-primary)' : 'var(--border-strong)'}
                strokeWidth={isEdgeActive ? '3' : '2'}
                strokeDasharray={edge.isStrictDependency ? 'none' : '4 3'}
                markerEnd={isEdgeActive ? 'url(#arrow-active)' : 'url(#arrow)'}
              />
            );
          })}
        </svg>

        {/* Nodes Absolute Layout */}
        <div style={{ position: 'relative', width: '100%', height: '340px' }}>
          {nodes.map((node, index) => {
            const isSelected = node.id === activeNodeId;

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                tabIndex={0}
                role="button"
                aria-label={`Step ${index + 1}: ${node.title}`}
                style={{
                  position: 'absolute',
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                  width: '240px',
                  background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: isSelected 
                    ? '2px solid var(--cyan-primary)' 
                    : node.isImplicitSocialPrerequisite 
                    ? '1.5px solid var(--amber-primary)' 
                    : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 16px var(--cyan-glow)' : 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)',
                  zIndex: isSelected ? 10 : 2
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: node.isImplicitSocialPrerequisite ? 'var(--amber-primary)' : 'var(--cyan-primary)'
                  }}>
                    {node.isImplicitSocialPrerequisite ? "⚠️ Hidden Curriculum" : "Step " + (index + 1)}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Clock size={10} /> {node.daysToDeadline}d left
                  </span>
                </div>

                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.3', marginBottom: '4px' }}>
                  {node.title}
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {node.department}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
