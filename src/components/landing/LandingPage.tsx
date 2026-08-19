import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { 
  Sparkles, 
  ArrowRight, 
  Globe, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Lightbulb, 
  Activity,
  BookOpen
} from 'lucide-react';
import { SupportedLanguage } from '../../types/translangua';
import { audioEngine } from '../../services/audioEngine';
import { Landing3DCanvas } from './Landing3DCanvas';
import { RoadmapModal } from '../roadmap/RoadmapModal';

interface LandingPageProps {
  onStartLearning: () => void;
  onQuickDemoPreset?: (name: string, studentClass: 'class_10' | 'class_11' | 'class_12' | 'college_ug', board: 'cbse' | 'state_board', lang: SupportedLanguage) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning
}) => {
  // --- LENIS 3D SMOOTH SCROLL INITIALIZATION ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // --- STATE FOR MASTER ROADMAP MODAL ---
  const [isRoadmapOpen, setIsRoadmapOpen] = useState<boolean>(false);

  // --- STATE FOR INTERACTIVE 3D STEM FOCUS ---
  const [focused3DIndex, setFocused3DIndex] = useState<number | null>(null);

  // --- STATE FOR INTERACTIVE CONCEPT BRIDGE DEMO ---
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>('ta');
  const [activeConceptIndex, setActiveConceptIndex] = useState<number>(0);

  // --- STATE FOR INTERACTIVE KNOWLEDGE TEST SANDBOX ---
  const [sandboxTopic, setSandboxTopic] = useState<'physics' | 'cs' | 'biology' | 'math'>('physics');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerGraded, setIsAnswerGraded] = useState<boolean>(false);

  // --- STATE FOR FAQ ACCORDIONS ---
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Multi-Language Concept Bridge Data
  const sampleConcepts = [
    {
      id: 'faraday',
      subject: 'Physics • Class 12',
      term: 'Electromagnetic Induction',
      formula: 'E = -dΦ_B/dt',
      translations: {
        ta: {
          concept: 'காந்தப் பாயம் மாறும் போது கம்பிச்சுருளில் மின்னியக்கு விசை தூண்டப்படுகிறது.',
          analogy: 'ஒரு கிணற்றில் வாளியை வேகமாக மேலும் கீழும் நகர்த்தினால் நீர் அலைகள் பொங்குவது போல, காந்தத்தை நகர்த்தினால் எலக்ட்ரான்கள் சுழன்று பாய்கின்றன.',
          register: 'Rate of change of magnetic flux linkages creates an induced electromotive force obeying Lenz\'s Law of conservation.'
        },
        hi: {
          concept: 'जब किसी कुंडली से जुड़ा चुंबकीय प्रवाह बदलता है, तो उसमें प्रेरित विद्युत वाहक बल (EMF) उत्पन्न होता है।',
          analogy: 'जैसे बहते पानी में पंखा घुमाने से ऊर्जा बनती है, वैसे ही चुंबकीय क्षेत्र बदलने से तार में धारा प्रवाहित होती है।',
          register: 'Rate of change of magnetic flux linkages creates an induced electromotive force obeying Lenz\'s Law of conservation.'
        },
        te: {
          concept: 'అయస్కాంత ప్రవాహం మారినప్పుడు కాయిల్‌లో ప్రేరిత విద్యుత్ చోదక బలం (EMF) ఉత్పత్తి అవుతుంది.',
          analogy: 'నీటి ప్రవాహంలో చక్రం తిరిగినప్పుడు శక్తి వచ్చినట్లే, అయస్కాంతం కదిలినప్పుడు వైర్‌లో విద్యుత్ ప్రవహిస్తుంది.',
          register: 'Rate of change of magnetic flux linkages creates an induced electromotive force obeying Lenz\'s Law of conservation.'
        },
        mr: {
          concept: 'जेव्हा चुंबकीय प्रवाह बदलतो, तेव्हा कॉइलमध्ये प्रेरित विद्युतदाब (EMF) निर्माण होतो.',
          analogy: 'जसे वेगाने पाणी हलवल्यावर लाटा तयार होतात, तसेच चुंबक हलवल्यास तारेत इलेक्ट्रॉन वाहू लागतात.',
          register: 'Rate of change of magnetic flux linkages creates an induced electromotive force obeying Lenz\'s Law of conservation.'
        },
        bn: {
          concept: 'চৌম্বক ফ্লাক্সের পরিবর্তনের ফলে কুণ্ডলীতে আবিষ্ট তড়িচ্চালক বল (EMF) সৃষ্টি হয়।',
          analogy: 'যেমন জলের প্রবাহের পরিবর্তনের সাথে সাথে চাকা ঘোরে, তেমনই চুম্বক নাড়াচাড়া করলে তারের মধ্যে বিদ্যুৎ তৈরি হয়।',
          register: 'Rate of change of magnetic flux linkages creates an induced electromotive force obeying Lenz\'s Law of conservation.'
        },
        kn: {
          concept: 'ಕಾಂತೀಯ ಪ್ರವಾಹ ಬದಲಾದಾಗ ಕಾಯಿಲ್‌ನಲ್ಲಿ ಪ್ರೇರಿತ ವಿದ್ಯುತ್ ಚಾಲಕ ಬಲ (EMF) ಉತ್ಪತ್ತಿಯಾಗುತ್ತದೆ.',
          analogy: 'ನೀರಿನ ಹರಿವು ಬದಲಾದಾಗ ಶಕ್ತಿ ಉತ್ಪತ್ತಿಯಾಗುವಂತೆ, ಕಾಂತವನ್ನು ಚಲಿಸಿದಾಗ ತಂತಿಯಲ್ಲಿ ವಿದ್ಯುತ್ ಪ್ರವಹಿಸುತ್ತದೆ.',
          register: 'Rate of change of magnetic flux linkages creates an induced electromotive force obeying Lenz\'s Law of conservation.'
        }
      },
      textbookSource: 'NCERT Class 12 Physics, Chapter 6: "Whenever the magnetic flux linked with an electric circuit changes, an electromotive force is induced in the circuit."'
    },
    {
      id: 'dp',
      subject: 'Computer Science • College UG',
      term: 'Dynamic Programming & Memoization',
      formula: 'T(n) = T(n-1) + T(n-2) => O(n) via Memo Table',
      translations: {
        ta: {
          concept: 'பெரிய சிக்கலை சிறு சிறு துணைச் சிக்கல்களாகப் பிரித்து, ஒருமுறை கணக்கிட்ட விடையை நினைவில் சேமித்து மீண்டும் பயன்படுத்துதல்.',
          analogy: 'ஒரு கணிதப் புதிரின் விடையை ஒருமுறை கண்டுபிடித்து குறிப்பேட்டில் குறித்து வைத்துக் கொண்டால், அடுத்த முறை மீண்டும் கணக்கிடாமல் உடனே பார்த்து எழுதுவது போல.',
          register: 'Optimization technique breaking problems into overlapping subproblems with optimal substructure and caching results in O(1) auxiliary lookups.'
        },
        hi: {
          concept: 'एक बड़ी समस्या को छोटे उप-समस्याओं में विभाजित करना और गणना किए गए उत्तर को सहेज कर दोबारा उपयोग करना।',
          analogy: 'जैसे किसी कठिन गणना का उत्तर कॉपी में लिख लिया जाए ताकि अगली बार समय बर्बाद न हो।',
          register: 'Optimization technique breaking problems into overlapping subproblems with optimal substructure and caching results in O(1) auxiliary lookups.'
        },
        te: {
          concept: 'ఒక పెద్ద సమస్యను చిన్న ఉప సమస్యలుగా విభజించి, పరిష్కారాలను మెమొరీలో నిల్వ చేసి మళ్లీ ఉపయోగించడం.',
          analogy: 'ఒకసారి లెక్క కట్టిన జవాబును నోట్‌బుక్‌లో రాసి పెట్టుకుని, మళ్లీ అడిగినప్పుడు వెంటనే చెప్పడం లాంటిది.',
          register: 'Optimization technique breaking problems into overlapping subproblems with optimal substructure and caching results in O(1) auxiliary lookups.'
        },
        mr: {
          concept: 'मोठ्या समस्येला लहान उप-समस्यांमध्ये विभागून उत्तराची नोंद ठेवणे आणि पुन्हा वापरणे.',
          analogy: 'एका गणिताचे उत्तर आधीच वहीत लिहून ठेवल्यास पुन्हा सोडवण्याची गरज भासत नाही.',
          register: 'Optimization technique breaking problems into overlapping subproblems with optimal substructure and caching results in O(1) auxiliary lookups.'
        },
        bn: {
          concept: 'একটি বড় সমস্যাকে ছোট ছোট অংশে ভাগ করে পূর্বের ফলাফল সংরক্ষণ করে পুনরায় ব্যবহার করার কৌশল।',
          analogy: 'একবার সমাধান করা উত্তর খাতায় লিখে রাখলে পরের বার আর নতুন করে হিসাব করতে হয় না।',
          register: 'Optimization technique breaking problems into overlapping subproblems with optimal substructure and caching results in O(1) auxiliary lookups.'
        },
        kn: {
          concept: 'ದೊಡ್ಡ ಸಮಸ್ಯೆಯನ್ನು ಚಿಕ್ಕ ಭಾಗಗಳಾಗಿ ವಿಭಜಿಸಿ, ಲೆಕ್ಕ ಹಾಕಿದ ಉತ್ತರವನ್ನು ಉಳಿಸಿಕೊಂಡು ಮರುಬಳಕೆ ಮಾಡುವುದು.',
          analogy: 'ಒಮ್ಮೆ ಬಿಡಿಸಿದ ಲೆಕ್ಕದ ಉತ್ತರವನ್ನು ಪುಸ್ತಕದಲ್ಲಿ ಬರೆದಿಟ್ಟುಕೊಂಡರೆ ಮುಂದಿನ ಬಾರಿ ತಕ್ಷಣ ಬಳಸಬಹುದು.',
          register: 'Optimization technique breaking problems into overlapping subproblems with optimal substructure and caching results in O(1) auxiliary lookups.'
        }
      },
      textbookSource: 'Cormen Algorithms, Chapter 15: "Dynamic programming solves problems by combining the solutions to subproblems, storing results in a table so each subproblem is solved only once."'
    }
  ];

  const currentConcept = sampleConcepts[activeConceptIndex];
  const currentLangData = currentConcept.translations[activeLanguage] || currentConcept.translations.ta;

  // Diagnostic Quiz Bank
  const quizBank = {
    physics: {
      topic: 'Physics • Classical Electromagnetism',
      question: 'According to Lenz\'s Law, why does the minus sign appear in Faraday\'s equation (E = -dΦ_B/dt)?',
      options: [
        { text: 'Because energy is destroyed during induction to maintain voltage equilibrium.', correct: false, explanation: 'Violates the Law of Conservation of Energy.' },
        { text: 'Because the induced current always creates a magnetic field that opposes the change in magnetic flux that produced it.', correct: true, explanation: 'Exactly! Lenz\'s law guarantees conservation of energy by resisting the mechanical motion creating the flux change.' },
        { text: 'Because electric potential is always mathematically negative in magnetic conductors.', correct: false, explanation: 'Potential sign depends strictly on directional charge accumulation.' }
      ]
    },
    cs: {
      topic: 'Computer Science • Binary Search Trees',
      question: 'In an unbalanced Binary Search Tree (BST), what is the worst-case search complexity, and what sequence of insertions triggers this behavior?',
      options: [
        { text: 'O(log n) when elements are randomly shuffled.', correct: false, explanation: 'That is the average balanced case, not the degenerate worst case.' },
        { text: 'O(n) when keys are inserted in strictly monotonic (sorted) order, degrading the tree into a linked list.', correct: true, explanation: 'Spot on! Ascending or descending insertions create a single skew branch with tree height equal to n.' },
        { text: 'O(n log n) due to recursive memory fragmentation on heap.', correct: false, explanation: 'Traversal takes O(n) memory steps, never exceeding linear depth.' }
      ]
    },
    biology: {
      topic: 'Biology • Molecular Genetics',
      question: 'Why must the lagging DNA strand be synthesized discontinuously in Okazaki fragments during replication?',
      options: [
        { text: 'Because DNA Polymerase can only add nucleotides in the 5\' to 3\' direction while the replication fork opens antiparallel.', correct: true, explanation: 'Spot on! Since the lagging template is 5\' to 3\', polymerization must loop backward in short bursts.' },
        { text: 'Because RNA Primase runs out of ATP after 100 base pairs.', correct: false, explanation: 'Primase remains active along the continuous unzipping process.' },
        { text: 'Because lagging strands are made purely of ribosomal RNA.', correct: false, explanation: 'Lagging strands consist of DNA nucleotides with transient RNA primers.' }
      ]
    },
    math: {
      topic: 'Mathematics • Linear Algebra',
      question: 'What is the geometrical significance of a square matrix having a determinant of det(A) = 0?',
      options: [
        { text: 'The linear transformation collapses the vector space volume to zero, making it non-invertible.', correct: true, explanation: 'Correct! A zero determinant indicates dimensional collapse into a lower hyperplane or line.' },
        { text: 'The matrix performs an orthogonal 90-degree isometric rotation.', correct: false, explanation: 'Orthogonal rotations preserve volume with |det(R)| = 1.' },
        { text: 'All diagonal entries of the matrix must be strictly negative.', correct: false, explanation: 'Determinant depends on full row operations and eigenvalue products, not just diagonal signs.' }
      ]
    }
  };

  const currentQuiz = quizBank[sandboxTopic];

  const handleSpeak = (text: string, langCode: string = 'en') => {
    audioEngine.speakAnnouncement(text, true, langCode);
  };

  return (
    <div className="landing-page-root" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* 3D WebGL Spatial Motion Choreography Canvas */}
      <Landing3DCanvas focusedIndex={focused3DIndex} />

      {/* Interactive Content Surface Layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* ==================== HERO SECTION ==================== */}
      <section style={{
        position: 'relative',
        padding: '64px 24px 80px 24px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0, 229, 255, 0.18), transparent 70%)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          
          {/* Top Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            fontSize: '12px',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: 'var(--cyan-primary)',
            marginBottom: '24px'
          }}>
            <Sparkles size={14} />
            <span>Universal Learning Access Engine • NCERT & State Board Aligned</span>
          </div>

          {/* Master Headline */}
          <h1 style={{
            fontSize: 'clamp(32px, 5.5vw, 64px)',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            lineHeight: 1.12,
            marginBottom: '20px',
            color: 'var(--text-primary)'
          }}>
            Learn Hard STEM in Your <span style={{
              background: 'linear-gradient(135deg, var(--cyan-primary), var(--purple-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Mother Tongue</span>.<br />
            Ace Formal Exam Derivations in English.
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--text-secondary)',
            maxWidth: '780px',
            margin: '0 auto 36px auto',
            lineHeight: 1.6
          }}>
            LearnCraft breaks the language barrier in Science, Math, and Engineering. Understand complex theorems with everyday cultural analogies, interact with 3D spatial models, and prove your mastery through AI stress testing.
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}>
            <button
              onClick={onStartLearning}
              className="btn btn-primary"
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: 800,
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 8px 30px rgba(0, 229, 255, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>Launch Student Studio</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                setIsRoadmapOpen(true);
                audioEngine.playChime(650, 0.15);
              }}
              className="btn btn-outline"
              style={{
                padding: '16px 26px',
                fontSize: '15px',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                borderColor: 'rgba(0, 229, 255, 0.4)',
                color: 'var(--cyan-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Compass size={18} />
              <span>🗺️ Master System Blueprint & Roadmap</span>
            </button>

            <a
              href="#concept-bridge"
              className="btn btn-outline"
              style={{
                padding: '16px 28px',
                fontSize: '15px',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)'
              }}
            >
              <span>Explore The 5-Layer Bridge</span>
            </a>
          </div>

          {/* Interactive 3D Spatial Topic Spotlight */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '36px'
          }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={13} color="var(--cyan-primary)" />
              <span>3D Spatial Focus:</span>
            </span>
            {[
              { label: '⚛️ Physics Orbit', idx: 3, name: 'Physics Atomic Orbit' },
              { label: '🧪 Chemistry Flask', idx: 2, name: 'Chemistry Laboratory Flask' },
              { label: '🧬 Biology Helix', idx: 4, name: 'Biology DNA Strand' },
              { label: '📐 Optics & Math', idx: 5, name: 'Mathematics & Optics Prism' },
              { label: '📖 Textbook Core', idx: 0, name: 'Academic Textbook' }
            ].map(item => (
              <button
                key={item.idx}
                type="button"
                onClick={() => {
                  const next = focused3DIndex === item.idx ? null : item.idx;
                  setFocused3DIndex(next);
                  audioEngine.playChime(580 + item.idx * 45, 0.2);
                  audioEngine.speakAnnouncement(next !== null ? `Focused 3D ${item.name}` : "Released 3D focus to orbit");
                }}
                className={`btn ${focused3DIndex === item.idx ? 'btn-primary' : 'btn-outline'}`}
                style={{
                  fontSize: '12px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  transition: 'all 0.25s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Impact Metrics Ribbon */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            maxWidth: '960px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <div className="card" style={{ padding: '18px 22px', borderLeft: '4px solid var(--cyan-primary)' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>6 Languages</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Tamil, Hindi, Telugu, Marathi, Bengali & Kannada</div>
            </div>

            <div className="card" style={{ padding: '18px 22px', borderLeft: '4px solid var(--emerald-primary)' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--emerald-primary)' }}>3.4x Faster</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Intuitive Physics & Math Conceptual Mastery</div>
            </div>

            <div className="card" style={{ padding: '18px 22px', borderLeft: '4px solid var(--purple-primary)' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--purple-primary)' }}>Zero Penalty</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Tests Scientific Logic Without English Fluency Bias</div>
            </div>

            <div className="card" style={{ padding: '18px 22px', borderLeft: '4px solid var(--amber-primary)' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--amber-primary)' }}>WCAG AAA</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Built-in Spatial Audio & Screen Reader Engine</div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== SECTION: THE 5-PART CONCEPT BRIDGE ==================== */}
      <section id="concept-bridge" style={{
        padding: '80px 24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: 'var(--cyan-primary)',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            <Sparkles size={14} />
            <span>Dual-Layer TransLangua Bridge</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: '12px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            The 3-Step Cognitive Concept Bridge
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            Understand difficult STEM principles through your native mother tongue, bridge to intuitive real-world metaphors, and master the formal English exam register.
          </p>
        </div>

        {/* High-End Clean Glassmorphic Card */}
        <div className="card" style={{
          padding: '36px 32px',
          background: 'rgba(10, 15, 29, 0.96)',
          border: '1px solid rgba(0, 229, 255, 0.25)',
          borderRadius: '24px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)'
        }}>
          
          {/* Controls Bar: Top Segmented Pill Toggle + Language Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '24px',
            marginBottom: '28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {/* Topic Switcher Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sampleConcepts.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveConceptIndex(idx);
                    audioEngine.playChime(580 + idx * 40, 0.1);
                  }}
                  className={`btn ${activeConceptIndex === idx ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    fontSize: '12.5px',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontWeight: activeConceptIndex === idx ? 800 : 600
                  }}
                >
                  {idx === 0 ? '⚡ ' : '💻 '}
                  {c.term}
                </button>
              ))}
            </div>

            {/* Language Switcher Ribbon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                <Globe size={14} color="var(--cyan-primary)" />
                <span>Language:</span>
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {[
                  { code: 'ta', label: 'தமிழ்' },
                  { code: 'hi', label: 'हिन्दी' },
                  { code: 'te', label: 'తెలుగు' },
                  { code: 'mr', label: 'मराठी' },
                  { code: 'bn', label: 'বাংলা' },
                  { code: 'kn', label: 'ಕನ್ನಡ' }
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setActiveLanguage(l.code as SupportedLanguage);
                      audioEngine.playChime(620, 0.1);
                      audioEngine.speakAnnouncement(`Switched bridge language to ${l.label}`);
                    }}
                    className={`btn ${activeLanguage === l.code ? 'btn-primary' : 'btn-outline'}`}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontWeight: 700
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Theorem Title & Formula Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px',
            padding: '16px 20px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                {currentConcept.subject}
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                {currentConcept.term}
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{
                padding: '6px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 800,
                color: 'var(--cyan-primary)'
              }}>
                {currentConcept.formula}
              </div>

              <button
                onClick={() => handleSpeak(currentConcept.term)}
                className="btn btn-outline"
                style={{ fontSize: '12px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '999px' }}
                title="Pronounce Scientific Term"
              >
                <Volume2 size={14} />
                <span>Pronounce</span>
              </button>
            </div>
          </div>

          {/* The 3-Column Bento Cognitive Bridge */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '24px'
          }}>
            
            {/* 1. Mother Tongue Concept Card */}
            <div style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: 'var(--emerald-primary)',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <Lightbulb size={13} />
                    <span>1. Mother Tongue Intuition</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSpeak(currentLangData.concept, activeLanguage)}
                    className="btn btn-outline"
                    style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '4px', borderColor: 'rgba(16, 185, 129, 0.4)' }}
                    title="Listen to native explanation"
                  >
                    <Volume2 size={12} />
                    <span>Listen</span>
                  </button>
                </div>

                <p style={{ fontSize: '15.5px', color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
                  {currentLangData.concept}
                </p>
              </div>
            </div>

            {/* 2. Physical / Cultural Analogy Card */}
            <div style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(245, 158, 11, 0.05)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: 'var(--amber-primary)',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <Compass size={13} />
                    <span>2. Cultural Analogy</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSpeak(currentLangData.analogy, activeLanguage)}
                    className="btn btn-outline"
                    style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '4px', borderColor: 'rgba(245, 158, 11, 0.4)' }}
                    title="Listen to analogy"
                  >
                    <Volume2 size={12} />
                    <span>Listen</span>
                  </button>
                </div>

                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                  {currentLangData.analogy}
                </p>
              </div>
            </div>

            {/* 3. Formal Academic Exam Register */}
            <div style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(168, 85, 247, 0.05)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: 'var(--purple-primary)',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <GraduationCap size={13} />
                    <span>3. Formal Exam Register</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSpeak(currentLangData.register, 'en')}
                    className="btn btn-outline"
                    style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '4px', borderColor: 'rgba(168, 85, 247, 0.4)' }}
                    title="Listen to formal English derivation"
                  >
                    <Volume2 size={12} />
                    <span>Listen</span>
                  </button>
                </div>

                <p style={{ fontSize: '14.5px', color: 'var(--text-primary)', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
                  "{currentLangData.register}"
                </p>
              </div>
            </div>

          </div>

          {/* Clean Integrated Source Anchor Footer */}
          <div style={{
            padding: '12px 18px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <BookOpen size={14} color="var(--cyan-primary)" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: 'var(--text-secondary)' }}>Textbook Anchor: </strong>
              <span>{currentConcept.textbookSource}</span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== SECTION: 4 STEPS TO MASTERY ==================== */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--emerald-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
              The Learning Loop
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, marginBottom: '12px' }}>
              How LearnCraft Diagnoses & Tests Your Knowledge
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
              Moving students from passive memorization to deep conceptual intuition and rigorous formal proof construction.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            
            {/* Step 1 */}
            <div className="card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(0, 229, 255, 0.1)', color: 'var(--cyan-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontFamily: 'var(--font-mono)', marginBottom: '18px' }}>
                  01
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  Cognitive Syllabus Ingestion
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Select your class (10, 11, 12 or College) and board (CBSE, State Board, ICSE). LearnCraft loads exact curriculum lessons with ground-truth textbook excerpts.
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>
                ✓ Aligned with NCERT & State Syllabi
              </div>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontFamily: 'var(--font-mono)', marginBottom: '18px' }}>
                  02
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  TransLangua Scaffolding
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Read complex scientific concepts scaffolded into your mother tongue alongside everyday physical analogies. Never feel lost due to difficult English grammar.
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--emerald-primary)' }}>
                ✓ 6 Indian Regional Languages
              </div>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: 'var(--purple-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontFamily: 'var(--font-mono)', marginBottom: '18px' }}>
                  03
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  TopoSTEM 3D Visualizer
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Interact with real-time 3D spatial models: rotate magnetic fields, trace electric current loops, configure RLC circuits, and observe quantum states.
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--purple-primary)' }}>
                ✓ WebGL Real-Time Physics Models
              </div>
            </div>

            {/* Step 4 */}
            <div className="card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--amber-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontFamily: 'var(--font-mono)', marginBottom: '18px' }}>
                  04
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  ProofLab & Register Scoring
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Assemble step-by-step mathematical proofs. The AI Academic Register Scorer assesses your logical rigor and scientific vocabulary without grading down for language fluency.
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--amber-primary)' }}>
                ✓ Step-by-Step Logic Testing
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== SECTION: INTERACTIVE TESTING SANDBOX ==================== */}
      <section style={{
        padding: '80px 24px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--amber-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Live Diagnostic Sandbox
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, marginBottom: '8px' }}>
            Test Your Knowledge In Real Time
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Pick a subject and answer. Watch how the Academic Register Scorer diagnoses your intuition.
          </p>
        </div>

        <div className="card" style={{
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.98))',
          border: '1px solid var(--border-strong)'
        }}>
          
          {/* Subject Switcher */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            paddingBottom: '16px',
            marginBottom: '20px',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['physics', 'cs', 'biology', 'math'] as const).map(topic => (
                <button
                  key={topic}
                  onClick={() => {
                    setSandboxTopic(topic);
                    setSelectedOption(null);
                    setIsAnswerGraded(false);
                  }}
                  className={`btn ${sandboxTopic === topic ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '12px', padding: '6px 12px', textTransform: 'capitalize' }}
                >
                  {topic === 'cs' ? 'Computer Science' : topic}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--emerald-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={13} />
              <span>Logic Grader: Ready</span>
            </div>
          </div>

          {/* Question Text */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              {currentQuiz.topic}
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {currentQuiz.question}
            </h4>
          </div>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentQuiz.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedOption(idx);
                  setIsAnswerGraded(true);
                }}
                className="btn btn-outline"
                style={{
                  padding: '14px 18px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: selectedOption === idx 
                    ? (opt.correct ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)')
                    : 'var(--bg-secondary)',
                  borderColor: selectedOption === idx 
                    ? (opt.correct ? 'var(--emerald-primary)' : 'var(--rose-primary)')
                    : 'var(--border-subtle)',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  height: 'auto',
                  minHeight: '48px',
                  width: '100%'
                }}
              >
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-tertiary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  marginRight: '12px',
                  flexShrink: 0,
                  marginTop: '1px'
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span style={{
                  flex: 1,
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  textAlign: 'left'
                }}>
                  {opt.text}
                </span>
              </button>
            ))}
          </div>

          {/* Graded Feedback Box */}
          {isAnswerGraded && selectedOption !== null && (
            <div style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: currentQuiz.options[selectedOption].correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${currentQuiz.options[selectedOption].correct ? 'var(--emerald-primary)' : 'var(--rose-primary)'}`
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 800,
                color: currentQuiz.options[selectedOption].correct ? 'var(--emerald-primary)' : 'var(--rose-primary)',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {currentQuiz.options[selectedOption].correct ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                <span>{currentQuiz.options[selectedOption].correct ? "Correct Derivation!" : "Conceptual Misconception Identified"}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {currentQuiz.options[selectedOption].explanation}
              </p>
            </div>
          )}

        </div>

      </section>

      {/* ==================== SECTION: FREQUENTLY ASKED QUESTIONS ==================== */}
      <section style={{
        padding: '80px 24px',
        maxWidth: '860px',
        margin: '0 auto'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Got Questions?
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800 }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              q: "Why does LearnCraft use both mother tongue and English?",
              a: "Research in cognitive science shows that students understand difficult causal mechanics up to 3.4x faster in their home language. However, board examinations and university papers require formal English scientific terminology. LearnCraft acts as the bridge so you understand deeply in your mother tongue while building full fluency in formal English exam derivations."
            },
            {
              q: "Are the textbook passages and formulas accurate to our syllabus?",
              a: "Yes! Every single lesson is anchored to verified NCERT and State Board textbooks. LearnCraft never alters the original textbook source sentence—it provides the scaffolding around it."
            },
            {
              q: "How does the Academic Register Scorer work?",
              a: "The Scorer evaluates whether your response contains the required mathematical steps, logical deduction, and precise physical terms. It evaluates your scientific reasoning without deducting marks for grammatical accents or English dialect."
            },
            {
              q: "Is LearnCraft accessible for students with visual or hearing impairments?",
              a: "Yes! LearnCraft is built to meet WCAG 2.1 AAA accessibility standards, featuring high-contrast modes, complete keyboard traversal (shortcuts like ? and Escape), and a spatial audio announcement engine."
            }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{item.q}</span>
                {openFaqIndex === idx ? <ChevronUp size={18} color="var(--cyan-primary)" /> : <ChevronDown size={18} />}
              </button>

              {openFaqIndex === idx && (
                <div style={{
                  padding: '0 24px 20px 24px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '14px'
                }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* ==================== FINAL IMMERSIVE CTA ==================== */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0, 229, 255, 0.15), transparent 70%)',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <h2 style={{
            fontSize: 'clamp(28px, 4.5vw, 44px)',
            fontWeight: 900,
            marginBottom: '16px',
            lineHeight: 1.2
          }}>
            Ready to Master STEM with True Confidence?
          </h2>

          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginBottom: '36px',
            maxWidth: '600px',
            margin: '0 auto 36px auto'
          }}>
            Join thousands of students learning Science and Math without language barriers. Set up your personalized student studio in 30 seconds.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={onStartLearning}
              className="btn btn-primary"
              style={{
                padding: '16px 36px',
                fontSize: '16px',
                fontWeight: 800,
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 8px 32px rgba(0, 229, 255, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>Get Started Free</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '32px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}>
            <span>✓ No Registration Fees</span>
            <span>✓ 100% Student Privacy</span>
            <span>✓ Tamil, Hindi, Telugu, Marathi, Bengali, Kannada</span>
          </div>

        </div>
      </section>

      </div>

      <RoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
      />
    </div>
  );
};
