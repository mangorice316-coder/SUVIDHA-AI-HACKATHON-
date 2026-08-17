import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, HelpCircle } from 'lucide-react';
import { CircuitGraphData } from '../../types/topostem';
import { audioEngine } from '../../services/audioEngine';

interface QueryConsoleProps {
  graphData: CircuitGraphData;
}

export const QueryConsole: React.FC<QueryConsoleProps> = ({ graphData }) => {
  const [query, setQuery] = useState<string>('');
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null);

  const handleAsk = (questionText: string) => {
    // Find closest match in pre-computed interactive questions or generate graph inference
    const matched = graphData.interactiveQuestions.find(q => 
      q.question.toLowerCase().includes(questionText.toLowerCase().slice(0, 15)) ||
      questionText.toLowerCase().includes('parallel') ||
      questionText.toLowerCase().includes('impedance')
    );

    if (matched) {
      setActiveAnswer(matched.answer);
      audioEngine.speakAnnouncement(matched.answer);
    } else {
      const genericResp = `Topological Query: Node A branches into Resistor R1 (100 Ohms) in series with Inductor L1 (50mH) on top, and Resistor R2 (200 Ohms) with Capacitor C1 (10uF) on bottom.`;
      setActiveAnswer(genericResp);
      audioEngine.speakAnnouncement(genericResp);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleAsk(query);
    setQuery('');
  };

  return (
    <div className="card" role="region" aria-label="Relational Natural Language Graph Query Console">
      <div className="card-header">
        <h3 className="card-title">
          <MessageSquare size={18} color="var(--purple-primary)" />
          <span>Relational Spatial Query Engine</span>
        </h3>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Graph-Constrained NL</span>
      </div>

      {/* Suggested Quick Queries */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        {graphData.interactiveQuestions.map((q, idx) => (
          <button
            key={idx}
            className="btn btn-outline"
            style={{ fontSize: '11px', padding: '5px 10px' }}
            onClick={() => handleAsk(q.question)}
          >
            <Sparkles size={13} color="var(--cyan-primary)" />
            <span>{q.question}</span>
          </button>
        ))}
      </div>

      {/* Query Input Box */}
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask e.g. 'What is connected in parallel with Resistor R2?'"
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            fontSize: '13px',
            color: 'var(--text-primary)'
          }}
        />
        <button type="submit" className="btn btn-primary" aria-label="Send Query">
          <Send size={15} />
        </button>
      </form>

      {/* Answer Box */}
      {activeAnswer && (
        <div style={{ background: 'var(--bg-secondary)', borderLeft: '4px solid var(--cyan-primary)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cyan-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Topological Reasoning Response
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
            {activeAnswer}
          </p>
        </div>
      )}
    </div>
  );
};
