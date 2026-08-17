import React, { useState } from 'react';
import { ProofAssemblerPiece } from '../../types/translangua';
import { CheckCircle2, RotateCcw, Award, ArrowRight, HelpCircle } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';
import confetti from 'canvas-confetti';

interface ProofAssemblerProps {
  initialPieces: ProofAssemblerPiece[];
  expectedSummary: string;
}

export const ProofAssembler: React.FC<ProofAssemblerProps> = ({
  initialPieces,
  expectedSummary
}) => {
  const [availablePieces, setAvailablePieces] = useState<ProofAssemblerPiece[]>(initialPieces);
  const [placedPieces, setPlacedPieces] = useState<ProofAssemblerPiece[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePlacePiece = (piece: ProofAssemblerPiece) => {
    const nextPlaced = [...placedPieces, piece];
    const nextAvailable = availablePieces.filter(p => p.id !== piece.id);

    setPlacedPieces(nextPlaced);
    setAvailablePieces(nextAvailable);
    setErrorMessage(null);

    audioEngine.speakAnnouncement(`Added clause: ${piece.englishFragment}`);

    // Check completion
    if (nextPlaced.length === initialPieces.length) {
      // Validate order
      const isCorrect = nextPlaced.every((p, idx) => p.correctOrder === idx + 1);
      if (isCorrect) {
        setIsCompleted(true);
        audioEngine.speakAnnouncement("Mastery Achieved! Formal academic English derivation assembled correctly.");
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } else {
        setErrorMessage("Sequence incorrect. Review the logical derivation flow and try again.");
      }
    }
  };

  const handleRemovePiece = (piece: ProofAssemblerPiece) => {
    setPlacedPieces(placedPieces.filter(p => p.id !== piece.id));
    setAvailablePieces([...availablePieces, piece]);
    setIsCompleted(false);
    setErrorMessage(null);
  };

  const handleReset = () => {
    setPlacedPieces([]);
    setAvailablePieces(initialPieces);
    setIsCompleted(false);
    setErrorMessage(null);
  };

  return (
    <div className="card" role="region" aria-label="Interactive Academic English Proof Assembler">
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={18} color="var(--emerald-primary)" />
          <h3 className="card-title">Interactive Academic Proof Assembler</h3>
        </div>
        <button className="btn btn-outline" onClick={handleReset} style={{ fontSize: '11px', padding: '4px 8px' }}>
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        Assemble the formal academic English scientific derivation step-by-step using your bridged conceptual intuition:
      </p>

      {/* Drop Zone / Assembled Proof Canvas */}
      <div className="proof-dropzone">
        {placedPieces.length === 0 ? (
          <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic', margin: 'auto' }}>
            Click available fragments below in logical order to assemble the formal English proof...
          </span>
        ) : (
          placedPieces.map((piece) => (
            <span
              key={piece.id}
              className="proof-piece placed"
              onClick={() => handleRemovePiece(piece)}
              title="Click to remove"
            >
              {piece.englishFragment}
            </span>
          ))
        )}
      </div>

      {/* Available Fragments */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
          Available Fragments (Click to place in sequence):
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {availablePieces.map((piece) => (
            <button
              key={piece.id}
              className="proof-piece"
              onClick={() => handlePlacePiece(piece)}
            >
              <span>{piece.englishFragment}</span>
              <span style={{ fontSize: '10px', opacity: 0.7, marginLeft: '6px' }}>({piece.vernacularHint})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div style={{ color: 'var(--rose-primary)', fontSize: '12px', background: 'hsla(348, 83%, 60%, 0.1)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '10px' }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Success Banner */}
      {isCompleted && (
        <div style={{ background: 'hsla(152, 76%, 45%, 0.15)', border: '1px solid var(--emerald-primary)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-primary)', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
            <CheckCircle2 size={18} /> Formal English Proof Verified!
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
            "{expectedSummary}"
          </p>
        </div>
      )}
    </div>
  );
};
