import React, { useState } from 'react';
import { CircuitGraphData, CircuitNode } from '../../types/topostem';
import { TOPOSTEM_PRESET_CIRCUITS } from '../../services/fixtures';
import { CircuitCanvas } from './CircuitCanvas';
import { KeyNavPanel } from './KeyNavPanel';
import { QueryConsole } from './QueryConsole';
import { CircuitSimulator } from './CircuitSimulator';
import { audioEngine } from '../../services/audioEngine';
import { AlertCircle, CheckCircle2, Sparkles, Upload, Network, Binary } from 'lucide-react';

export const TopoSTEMView: React.FC = () => {
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('ac_bridge');
  const [graphData, setGraphData] = useState<CircuitGraphData>(TOPOSTEM_PRESET_CIRCUITS.ac_bridge);
  const [activeNodeId, setActiveNodeId] = useState<string>(graphData.entryNodeId);
  const [activeLoopId, setActiveLoopId] = useState<string | null>(null);

  const activeNode = graphData.nodes.find(n => n.id === activeNodeId) || graphData.nodes[0];

  const handlePresetSwitch = (key: string) => {
    setSelectedPresetKey(key);
    const data = TOPOSTEM_PRESET_CIRCUITS[key];
    if (data) {
      setGraphData(data);
      setActiveNodeId(data.entryNodeId);
      setActiveLoopId(null);
      audioEngine.speakAnnouncement(`Loaded ${data.title}. ${data.totalComponents} spatial nodes identified.`);
    }
  };

  // Navigation Logic
  const handleNavigate = (direction: 'left' | 'right' | 'up' | 'down') => {
    audioEngine.playBranchChime(direction);

    const connectedEdges = graphData.edges.filter(
      e => e.fromNodeId === activeNodeId || e.toNodeId === activeNodeId
    );

    let candidateNodeId: string | null = null;

    if (direction === 'right') {
      const rightEdge = connectedEdges.find(e => {
        const otherId = e.fromNodeId === activeNodeId ? e.toNodeId : e.fromNodeId;
        const otherNode = graphData.nodes.find(n => n.id === otherId);
        return otherNode && otherNode.position.x > activeNode.position.x;
      });
      if (rightEdge) {
        candidateNodeId = rightEdge.fromNodeId === activeNodeId ? rightEdge.toNodeId : rightEdge.fromNodeId;
      }
    } else if (direction === 'left') {
      const leftEdge = connectedEdges.find(e => {
        const otherId = e.fromNodeId === activeNodeId ? e.toNodeId : e.fromNodeId;
        const otherNode = graphData.nodes.find(n => n.id === otherId);
        return otherNode && otherNode.position.x < activeNode.position.x;
      });
      if (leftEdge) {
        candidateNodeId = leftEdge.fromNodeId === activeNodeId ? leftEdge.toNodeId : leftEdge.fromNodeId;
      }
    } else if (direction === 'up') {
      const upEdge = connectedEdges.find(e => {
        const otherId = e.fromNodeId === activeNodeId ? e.toNodeId : e.fromNodeId;
        const otherNode = graphData.nodes.find(n => n.id === otherId);
        return otherNode && otherNode.position.y < activeNode.position.y;
      });
      if (upEdge) {
        candidateNodeId = upEdge.fromNodeId === activeNodeId ? upEdge.toNodeId : upEdge.fromNodeId;
      }
    } else if (direction === 'down') {
      const downEdge = connectedEdges.find(e => {
        const otherId = e.fromNodeId === activeNodeId ? e.toNodeId : e.fromNodeId;
        const otherNode = graphData.nodes.find(n => n.id === otherId);
        return otherNode && otherNode.position.y > activeNode.position.y;
      });
      if (downEdge) {
        candidateNodeId = downEdge.fromNodeId === activeNodeId ? downEdge.toNodeId : downEdge.fromNodeId;
      }
    }

    if (candidateNodeId) {
      const targetNode = graphData.nodes.find(n => n.id === candidateNodeId);
      if (targetNode) {
        setActiveNodeId(targetNode.id);
        audioEngine.playComponentSonification(targetNode.type, targetNode.position.x);
        audioEngine.speakAnnouncement(`${targetNode.label}. ${targetNode.value ? `Value: ${targetNode.value}` : ''}`);
      }
    } else {
      audioEngine.speakAnnouncement("Boundary reached. No connected branch in that direction.");
    }
  };

  const handleCycleLoop = () => {
    if (!graphData.loops.length) return;
    const currentIndex = graphData.loops.findIndex(l => l.id === activeLoopId);
    const nextIndex = (currentIndex + 1) % (graphData.loops.length + 1);
    
    if (nextIndex === graphData.loops.length) {
      setActiveLoopId(null);
      audioEngine.speakAnnouncement("Cleared active loop highlighting.");
    } else {
      const nextLoop = graphData.loops[nextIndex];
      setActiveLoopId(nextLoop.id);
      audioEngine.speakAnnouncement(`Tracing ${nextLoop.name}. Sequence: ${nextLoop.nodeSequence.length} nodes.`);
    }
  };

  const activeLoop = graphData.loops.find(l => l.id === activeLoopId);

  return (
    <div className="tab-pane" role="tabpanel" id="panel-topostem" aria-labelledby="tab-topostem">
      {/* Diagram Lab Header Banner */}
      <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.98))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="hero-pill-badge" style={{ fontSize: '10px' }}>Multi-Sensory Diagram Lab</span>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Interactive Circuit & Topology Canvas</h2>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
              Navigate STEM diagrams with interactive spatial visual cues and stereo audio feedback. Use Arrow Keys or click nodes to explore components.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`btn ${selectedPresetKey === 'ac_bridge' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => handlePresetSwitch('ac_bridge')}
            >
              <Network size={14} /> AC Bridge Circuit (Physics)
            </button>
            <button 
              className={`btn ${selectedPresetKey === 'bst_tree' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => handlePresetSwitch('bst_tree')}
            >
              <Binary size={14} /> Binary Search Tree (CS)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="view-grid-two-col">
        {/* Left Column: The Interactive Spatial Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <div className="card-header">
              <div>
                <span className="tab-badge" style={{ marginBottom: '6px', display: 'inline-block' }}>
                  {graphData.domain} • {graphData.difficulty}
                </span>
                <h2 className="card-title" style={{ fontSize: '17px' }}>
                  <Sparkles size={18} color="var(--cyan-primary)" />
                  <span>{graphData.title}</span>
                </h2>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {graphData.totalComponents} Nodes Detected
              </span>
            </div>

            <CircuitCanvas
              graphData={graphData}
              activeNodeId={activeNodeId}
              onSelectNode={(node) => setActiveNodeId(node.id)}
              activeLoopId={activeLoopId}
            />

            {/* Spatial Navigation Tip */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>🎧 Stereo panning active: Left ear (West) ⟷ Right ear (East)</span>
              <span>Press Arrow Keys or Click nodes</span>
            </div>
          </div>

          <CircuitSimulator graphData={graphData} />
          <QueryConsole graphData={graphData} />
        </div>

        {/* Right Column: Inaccessible Baseline vs Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* The Inaccessible Baseline Box */}
          <div className="card" style={{ borderLeft: '4px solid var(--rose-primary)' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--rose-primary)', fontWeight: 700, fontSize: '14px' }}>
                <AlertCircle size={18} />
                <span>The Inaccessible Baseline (Standard Alt-Text)</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Linear Audio Collapse</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
              "{graphData.inaccessibleLinearAltText}"
            </p>
            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--rose-primary)' }}>
              ⚠️ Sighted students glance at parallel loops instantly; blind students must listen to 90 seconds of monotone audio without the ability to query connections.
            </div>
          </div>

          {/* Directional Matrix & Sonification */}
          <KeyNavPanel
            graphData={graphData}
            activeNode={activeNode}
            onNavigate={handleNavigate}
            onCycleLoop={handleCycleLoop}
            activeLoopName={activeLoop ? activeLoop.name : null}
          />
        </div>
      </div>
    </div>
  );
};
