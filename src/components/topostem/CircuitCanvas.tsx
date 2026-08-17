import React from 'react';
import { CircuitGraphData, CircuitNode } from '../../types/topostem';
import { audioEngine } from '../../services/audioEngine';

interface CircuitCanvasProps {
  graphData: CircuitGraphData;
  activeNodeId: string;
  onSelectNode: (node: CircuitNode) => void;
  activeLoopId: string | null;
}

export const CircuitCanvas: React.FC<CircuitCanvasProps> = ({
  graphData,
  activeNodeId,
  onSelectNode,
  activeLoopId
}) => {
  const activeLoop = graphData.loops.find(l => l.id === activeLoopId);
  const activeLoopNodeIds = activeLoop ? activeLoop.nodeSequence : [];

  const handleNodeClick = (node: CircuitNode) => {
    onSelectNode(node);
    audioEngine.playComponentSonification(node.type, node.position.x);
    audioEngine.speakAnnouncement(`${node.label}. Value: ${node.value || 'N/A'}`);
  };

  return (
    <div className="circuit-canvas-wrapper" role="region" aria-label="Interactive 2D Circuit Graph Canvas">
      <svg className="circuit-svg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--cyan-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--purple-primary)" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid lines for spatial visual reference */}
        <g opacity="0.08" stroke="#fff" strokeWidth="1">
          {[100, 200, 300, 400, 500, 600, 700].map(x => (
            <line key={`x-${x}`} x1={x} y1="0" x2={x} y2="400" strokeDasharray="4 4" />
          ))}
          {[100, 200, 300].map(y => (
            <line key={`y-${y}`} x1="0" y1={y} x2="800" y2={y} strokeDasharray="4 4" />
          ))}
        </g>

        {/* Edges */}
        {graphData.edges.map(edge => {
          const fromNode = graphData.nodes.find(n => n.id === edge.fromNodeId);
          const toNode = graphData.nodes.find(n => n.id === edge.toNodeId);
          if (!fromNode || !toNode) return null;

          const x1 = fromNode.position.x * 800;
          const y1 = fromNode.position.y * 400;
          const x2 = toNode.position.x * 800;
          const y2 = toNode.position.y * 400;

          const isLoopEdge = activeLoopNodeIds.includes(edge.fromNodeId) && activeLoopNodeIds.includes(edge.toNodeId);
          const isConnectedToActive = edge.fromNodeId === activeNodeId || edge.toNodeId === activeNodeId;

          return (
            <g key={edge.id}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={`circuit-edge-line ${isLoopEdge || isConnectedToActive ? 'active-path' : ''}`}
              />
              {/* Branch Label */}
              <text
                x={(x1 + x2) / 2}
                y={(y1 + y2) / 2 - 8}
                fill="var(--text-muted)"
                fontSize="10"
                fontFamily="var(--font-mono)"
                textAnchor="middle"
              >
                {edge.label}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {graphData.nodes.map(node => {
          const cx = node.position.x * 800;
          const cy = node.position.y * 400;
          const isSelected = node.id === activeNodeId;
          const isInLoop = activeLoopNodeIds.includes(node.id);

          return (
            <g 
              key={node.id} 
              onClick={() => handleNodeClick(node)}
              tabIndex={0}
              role="button"
              aria-label={`${node.label} at position ${Math.round(node.position.x * 100)} percent across`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNodeClick(node);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer Glow for Selected Node */}
              {isSelected && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="24"
                  fill="none"
                  stroke="var(--amber-primary)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity="0.8"
                />
              )}

              {/* Node Circle */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 16 : 12}
                fill={isSelected ? 'var(--amber-primary)' : isInLoop ? 'var(--cyan-primary)' : 'var(--bg-tertiary)'}
                stroke={isSelected ? '#fff' : 'var(--border-strong)'}
                strokeWidth="2.5"
                className={`circuit-node-dot ${isSelected ? 'selected' : ''}`}
              />

              {/* Component Icon / Type Initial */}
              <text
                x={cx}
                y={cy + 4}
                fill={isSelected ? '#000' : 'var(--text-primary)'}
                fontSize="10"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                textAnchor="middle"
                pointerEvents="none"
              >
                {node.type === 'ac_source' || node.type === 'battery' ? 'V' :
                 node.type === 'resistor' ? 'R' :
                 node.type === 'capacitor' ? 'C' :
                 node.type === 'inductor' ? 'L' :
                 node.type === 'ground' ? '⏚' : '•'}
              </text>

              {/* Node Label */}
              <text
                x={cx}
                y={cy + 26}
                fill={isSelected ? 'var(--amber-primary)' : 'var(--text-secondary)'}
                fontSize="11"
                fontWeight="600"
                fontFamily="var(--font-sans)"
                textAnchor="middle"
              >
                {node.label.split('(')[0]}
              </text>

              {/* Component Value */}
              {node.value && (
                <text
                  x={cx}
                  y={cy + 38}
                  fill="var(--cyan-primary)"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  textAnchor="middle"
                >
                  {node.value} {node.unit || ''}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
