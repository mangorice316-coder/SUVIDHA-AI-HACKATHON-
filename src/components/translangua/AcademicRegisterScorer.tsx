import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, Sparkles, Send, ArrowRight } from 'lucide-react';
import { RegisterScoreEvaluation } from '../../types/translangua';
import { audioEngine } from '../../services/audioEngine';

export const AcademicRegisterScorer: React.FC = () => {
  const [studentInput, setStudentInput] = useState<string>(
    "When capacitor charges up, the current disappears in the gap so Maxwell said changing electric lines make a fake current."
  );
  const [evaluation, setEvaluation] = useState<RegisterScoreEvaluation | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const handleEvaluate = () => {
    setIsEvaluating(true);
    audioEngine.speakAnnouncement("Analyzing sentence for academic English register and mathematical rigor.");

    // Evaluation Logic
    setTimeout(() => {
      const lower = studentInput.toLowerCase();
      let score = 55;
      const strengths: string[] = [];
      const improvements: { originalPhrase: string; recommendedFormalAcademicPhrase: string; explanation: string }[] = [];

      if (lower.includes("charges up") || lower.includes("charges")) {
        strengths.push("Correctly identifies capacitor charging context.");
        improvements.push({
          originalPhrase: "charges up",
          recommendedFormalAcademicPhrase: "undergoes transient charging",
          explanation: "In formal physics exams, 'transient charging' conveys time-dependence and mathematical rigor."
        });
      }

      if (lower.includes("fake current") || lower.includes("imaginary")) {
        improvements.push({
          originalPhrase: "fake current",
          recommendedFormalAcademicPhrase: "displacement current",
          explanation: "Use standard Maxwellian nomenclature to gain full examination marks."
        });
      } else if (lower.includes("displacement current")) {
        score += 25;
        strengths.push("Accurately uses the formal term 'displacement current'.");
      }

      if (lower.includes("changing electric lines") || lower.includes("electric field")) {
        improvements.push({
          originalPhrase: "changing electric lines",
          recommendedFormalAcademicPhrase: "time-varying electric flux",
          explanation: "'Time-varying flux' mathematically links to Gauss's Law (dΦ_E/dt)."
        });
      }

      const finalScore = Math.min(95, score + (lower.includes("proportional") ? 20 : 0));
      const rating = finalScore >= 85 ? 'Exemplary Scientific' : finalScore >= 70 ? 'Formal Academic' : finalScore >= 50 ? 'Emerging Academic' : 'Colloquial';

      const result: RegisterScoreEvaluation = {
        overallScore: finalScore,
        rating,
        strengths: strengths.length ? strengths : ["Understands fundamental physical phenomenon."],
        syntaxImprovements: improvements,
        mathematicalPrecisionFeedback: "Excellent conceptual grasp! Replacing everyday idioms with formal vector & calculus nomenclature will ensure 100% board/university exam marks."
      };

      setEvaluation(result);
      setIsEvaluating(false);
      audioEngine.speakAnnouncement(`Academic register evaluated: ${finalScore} percent. Rating: ${rating}`);
    }, 600);
  };

  return (
    <div className="card" role="region" aria-label="Academic Register Evaluator">
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={18} color="var(--purple-primary)" />
          <h3 className="card-title">Live Academic Register Scorer</h3>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Exam & Thesis Syntactic Checker</span>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        Type your scientific explanation in your own words. The engine evaluates whether your phrasing matches the required formal English academic register:
      </p>

      {/* Input Area */}
      <div style={{ marginBottom: '12px' }}>
        <textarea
          rows={3}
          value={studentInput}
          onChange={(e) => setStudentInput(e.target.value)}
          placeholder="Type your scientific explanation here..."
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            color: 'var(--text-primary)',
            fontSize: '13px',
            lineHeight: '1.6',
            resize: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
        <button className="btn btn-primary" onClick={handleEvaluate} disabled={isEvaluating}>
          <Sparkles size={14} /> {isEvaluating ? "Analyzing Syntax..." : "Evaluate Academic Register"}
        </button>
      </div>

      {/* Evaluation Results */}
      {evaluation && (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
          {/* Score Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Academic Register Score
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: evaluation.overallScore >= 75 ? 'var(--emerald-primary)' : 'var(--amber-primary)' }}>
                {evaluation.overallScore}/100 <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>({evaluation.rating})</span>
              </div>
            </div>
            <span className="tab-badge" style={{ backgroundColor: 'var(--bg-tertiary)', padding: '6px 12px', fontSize: '12px' }}>
              WCAG AAA Formatter
            </span>
          </div>

          {/* Syntax Upgrades */}
          {evaluation.syntaxImprovements.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cyan-primary)', marginBottom: '8px' }}>
                📝 Targeted Academic Register Upgrades:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {evaluation.syntaxImprovements.map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--rose-primary)', textDecoration: 'line-through' }}>"{item.originalPhrase}"</span>
                      <ArrowRight size={13} color="var(--text-muted)" />
                      <span style={{ color: 'var(--emerald-primary)', fontWeight: 700 }}>"{item.recommendedFormalAcademicPhrase}"</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                      {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Precision Feedback */}
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            💡 <strong>Examiner Feedback:</strong> {evaluation.mathematicalPrecisionFeedback}
          </div>
        </div>
      )}
    </div>
  );
};
