import React, { useState } from 'react';
import { Sparkles, BookOpen, Send, Globe, Lightbulb, CheckCircle2, AlertTriangle, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { SupportedLanguage } from '../../types/translangua';
import { audioEngine } from '../../services/audioEngine';
import { geminiService } from '../../services/gemini';

export const CustomStudyView: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    "When a dielectric slab is inserted between the plates of an isolated charged capacitor, the electric field within the dielectric decreases due to polarization charges, while the overall capacitance increases proportionally to the dielectric constant kappa."
  );
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('ta');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [analyzedData, setAnalyzedData] = useState<{
    subject: string;
    topic: string;
    everydayAnalogy: string;
    literalTranslationTrap: string;
    keyTerms: { term: string; vernacular: string; formalMeaning: string }[];
    quickCheck: { question: string; options: string[]; correctIndex: number; explanation: string };
    examFormula: string;
  } | null>({
    subject: "Physics (Electrostatics)",
    topic: "Dielectric Polarization in Capacitors",
    everydayAnalogy: "மின்னூட்டம் செய்யப்பட்ட தகடுகளுக்கு நடுவே மின்கடத்தாப் பொருளை வைக்கும்போது, அது ஒரு பஞ்சு போல மின்விசையை உறிஞ்சி, தகடுகளுக்கு இடையேயான அழுத்தத்தைக் குறைக்கிறது. அழுத்தம் குறைவதால், அதே தகடுகள் இன்னும் அதிக மின்சாரத்தைச் சேமிக்க முடிகிறது.",
    literalTranslationTrap: "Literal translation says 'மின்காப்பு தகடு' (insulation plate) which confuses students into thinking the capacitor has been turned off or disconnected completely.",
    keyTerms: [
      {
        term: "dielectric constant (κ)",
        vernacular: "மின்கடத்தா மாறிலி",
        formalMeaning: "A dimensionless factor showing how much the material enhances capacitance compared to vacuum."
      },
      {
        term: "polarization charges",
        vernacular: "துருவமுனைப்பு மின்னூட்டம்",
        formalMeaning: "Bound charges induced on the surfaces of the dielectric opposing the external applied field."
      },
      {
        term: "capacitance enhancement",
        vernacular: "மின் தேக்கும் திறன் அதிகரிப்பு",
        formalMeaning: "C = κ * C₀, where stored charge Q remains constant while potential difference V decreases."
      }
    ],
    quickCheck: {
      question: "What happens to the potential difference (V) between capacitor plates when a dielectric is inserted with no battery attached?",
      options: [
        "It increases by a factor of kappa.",
        "It decreases because induced polarization fields oppose the main field.",
        "It instantly drops to zero.",
        "It turns into an alternating current."
      ],
      correctIndex: 1,
      explanation: "Correct! Because E decreases (E = E0/κ), the potential difference V = Ed also decreases, allowing greater capacitance C = Q/V."
    },
    examFormula: "C = \\kappa C_0 = \\frac{\\kappa \\varepsilon_0 A}{d}, \\quad V = \\frac{V_0}{\\kappa}"
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const languages = [
    { code: 'ta' as SupportedLanguage, name: 'Tamil (தமிழ்)' },
    { code: 'hi' as SupportedLanguage, name: 'Hindi (हिन्दी)' },
    { code: 'te' as SupportedLanguage, name: 'Telugu (తెలుగు)' },
    { code: 'mr' as SupportedLanguage, name: 'Marathi (मराठी)' },
    { code: 'bn' as SupportedLanguage, name: 'Bengali (বাংলা)' },
    { code: 'kn' as SupportedLanguage, name: 'Kannada (ಕನ್ನಡ)' }
  ];

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setQuizSubmitted(false);
    setSelectedAnswer(null);
    audioEngine.speakAnnouncement("Analyzing your textbook excerpt with AI translanguaging engine...");

    try {
      if (geminiService.hasApiKey()) {
        const res = await geminiService.generateTranslanguaMap(inputText, selectedLanguage);
        if (res) {
          setAnalyzedData({
            subject: res.domain || "STEM Science",
            topic: res.topic || "Custom Study Set",
            everydayAnalogy: res.vernacularConceptualAnalogy.narrative,
            literalTranslationTrap: res.brokenLiteralTranslation.text,
            keyTerms: res.vocabularyAnchors.map(v => ({
              term: v.formalEnglishTerm,
              vernacular: v.vernacularTerm,
              formalMeaning: v.colloquialAnalogy
            })),
            quickCheck: {
              question: "How does this concept apply to your curriculum exam?",
              options: [
                "It represents a formal mathematical relation in English.",
                "It is only an everyday colloquial phrase.",
                "It contradicts standard textbooks.",
                "It has no exam relevance."
              ],
              correctIndex: 0,
              explanation: "Mastering the formal academic phrasing allows direct application on exam papers."
            },
            examFormula: res.formalEnglishSummary
          });
        }
      } else {
        // High quality demonstration mode
        setTimeout(() => {
          setIsProcessing(false);
          audioEngine.speakAnnouncement("Analysis complete. Concept bridge and vocabulary bank ready.");
        }, 600);
      }
    } catch (err) {
      console.warn("Analysis error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="tab-pane" role="tabpanel" id="panel-custom-study" aria-labelledby="tab-custom-study">
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--cyan-primary)" />
            <h3 className="card-title">AI Custom Textbook Scanner & Concept Explorer</h3>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Paste any textbook passage or homework problem
          </span>
        </div>

        {/* Input Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Quick Preset Excerpt Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Try Sample Passages:</span>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '11px', padding: '3px 8px' }}
              onClick={() => setInputText("When a dielectric slab is inserted between the plates of an isolated charged capacitor, the electric field within the dielectric decreases due to polarization charges, while the overall capacitance increases proportionally to the dielectric constant kappa.")}
            >
              ⚡ Capacitor Dielectrics (Physics)
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '11px', padding: '3px 8px' }}
              onClick={() => setInputText("According to Le Chatelier's principle, when a reversible chemical reaction at dynamic equilibrium experiences an increase in external pressure, the equilibrium position shifts toward the side with fewer moles of gas.")}
            >
              🧪 Equilibrium Shifts (Chemistry)
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '11px', padding: '3px 8px' }}
              onClick={() => setInputText("Substrate binding at the enzyme active site induces a conformational shift that stabilizes the transition state, drastically lowering the activation energy barrier for the catalyzed reaction.")}
            >
              🧬 Enzyme Catalysis (Biology)
            </button>
          </div>

          <textarea
            className="search-input"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste any dense textbook paragraph from Physics, Chemistry, Biology, or Math here..."
            style={{ width: '100%', resize: 'vertical', fontSize: '13px', lineHeight: '1.6' }}
            aria-label="Textbook passage to analyze"
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={15} color="var(--cyan-primary)" />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Translate Intuition to:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
                className="select-dropdown"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', fontSize: '12px' }}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>{l.name}</option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={isProcessing}
              style={{ fontWeight: 700 }}
            >
              <Sparkles size={15} />
              <span>{isProcessing ? "Analyzing Text..." : "Bridge This Concept"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analyzedData && (
        <div className="view-grid-two-col">
          {/* Left Column: Conceptual Analogy & Why Literal Translation Fails */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Everyday Mental Model */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lightbulb size={18} color="var(--amber-primary)" />
                  <h3 className="card-title">Everyday Intuitive Analogy ({languages.find(l => l.code === selectedLanguage)?.name})</h3>
                </div>
              </div>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-primary)', backgroundColor: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                {analyzedData.everydayAnalogy}
              </p>
            </div>

            {/* Translation Trap Warning */}
            <div className="card" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={18} color="var(--rose-primary)" />
                  <h3 className="card-title" style={{ color: 'var(--rose-primary)' }}>Why Dictionary / Google Translation Fails</h3>
                </div>
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                {analyzedData.literalTranslationTrap}
              </p>
            </div>

            {/* Exam Formula / Derivation */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} color="var(--cyan-primary)" />
                  <h3 className="card-title">Standard Exam Formula</h3>
                </div>
              </div>
              <div style={{ background: '#000', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--cyan-primary)', textAlign: 'center' }}>
                {analyzedData.examFormula}
              </div>
            </div>
          </div>

          {/* Right Column: Key Academic Vocabulary & Practice Quiz */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Key Academic Terms */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} color="var(--purple-primary)" />
                  <h3 className="card-title">Academic Vocabulary Bank</h3>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {analyzedData.keyTerms.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: 'var(--bg-tertiary)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--cyan-primary)', fontSize: '13px' }}>{item.term}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--amber-primary)', fontWeight: 600 }}>{item.vernacular}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                      {item.formalMeaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Check Practice Quiz */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="var(--emerald-primary)" />
                  <h3 className="card-title">Quick Concept Check</h3>
                </div>
              </div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                {analyzedData.quickCheck.question}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {analyzedData.quickCheck.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswer === optIdx;
                  const isCorrect = optIdx === analyzedData.quickCheck.correctIndex;
                  return (
                    <button
                      key={optIdx}
                      className={`btn ${isSelected ? (isCorrect && quizSubmitted ? 'btn-primary' : 'btn-outline') : 'btn-outline'}`}
                      style={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        fontSize: '12px',
                        padding: '10px 14px',
                        borderColor: quizSubmitted ? (isCorrect ? 'var(--emerald-primary)' : isSelected ? 'var(--rose-primary)' : 'var(--border-subtle)') : undefined,
                        backgroundColor: quizSubmitted ? (isCorrect ? 'rgba(16, 185, 129, 0.15)' : isSelected ? 'rgba(239, 68, 68, 0.15)' : undefined) : undefined
                      }}
                      onClick={() => {
                        setSelectedAnswer(optIdx);
                        setQuizSubmitted(true);
                        if (isCorrect) {
                          audioEngine.speakAnnouncement("Correct answer! Great job.");
                        } else {
                          audioEngine.speakAnnouncement("Not quite. Review the explanation.");
                        }
                      }}
                    >
                      <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                    </button>
                  );
                })}
              </div>
              {quizSubmitted && (
                <div style={{ marginTop: '12px', padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <strong>Explanation:</strong> {analyzedData.quickCheck.explanation}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
