import React, { useState } from 'react';
import { geminiService } from '../../services/gemini';
import { SupportedLanguage } from '../../types/translangua';
import { audioEngine } from '../../services/audioEngine';
import { learningOS, TEACHER_PERSONAS } from '../../services/learningOS';
import { TeacherPersona, TeacherPersonaId } from '../../types/learningOS';
import { Bot, Send, Sparkles, X, User, RefreshCw, Volume2, UserCheck } from 'lucide-react';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  currentConceptTitle?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  currentConceptTitle = "Electromagnetic Induction & Faraday's Law"
}) => {
  const [selectedPersona, setSelectedPersona] = useState<TeacherPersona>(learningOS.getActivePersona());
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'tutor',
      text: `Hello! I'm your LearnCraft AI Tutor (${selectedPersona.name} ${selectedPersona.avatar}). Ask me anything about ${currentConceptTitle}, or pick a prompt below to learn with everyday analogies, Socratic hints, or step-by-step derivations in your mother tongue!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Explain like I'm 10 with a real-world story",
    "Give me a Socratic hint without spoiling the answer",
    `Explain this concept in ${currentLanguage === 'ta' ? 'Tamil' : currentLanguage === 'hi' ? 'Hindi' : currentLanguage === 'te' ? 'Telugu' : 'my mother tongue'}`,
    "Show the complete mathematical derivation step-by-step",
    "What is the most common exam misconception students make?"
  ];

  const handlePersonaChange = (persona: TeacherPersona) => {
    setSelectedPersona(persona);
    learningOS.setActivePersona(persona.id);
    audioEngine.playChime(650, 0.15);
    audioEngine.speakAnnouncement(`Switched tutor persona to ${persona.name}`);
    
    setMessages(prev => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'tutor',
        text: `Switched mode to ${persona.avatar} **${persona.name}**! ${persona.tagline}`,
        timestamp: 'Just now'
      }
    ]);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsGenerating(true);
    audioEngine.playChime(600, 0.15);

    try {
      let reply = "";
      if (geminiService.isConfigured()) {
        const systemContext = `You are ${selectedPersona.name} (${selectedPersona.tagline}) for LearnCraft. Current concept: ${currentConceptTitle}. Language: ${currentLanguage}.
Persona instructions: ${selectedPersona.tonePrompt}
Additional rules:
1. Explain with crystal clarity and pedagogical empathy.
2. If asked in mother tongue, provide seamless bilingual code-switching (Tamil/Hindi/etc. with English technical terms preserved).`;
        
        reply = await geminiService.generateContent(`${systemContext}\n\nStudent question: ${textToSend}`);
      } else {
        // High quality offline fallback responses tailored to persona
        if (selectedPersona.id === 'socratic' || textToSend.includes("Socratic") || textToSend.includes("hint")) {
          reply = `Think about this: What would happen to energy conservation if the coil attracted the magnet instead of repelling it? Would you get free acceleration forever? Why is that physically impossible?`;
        } else if (selectedPersona.id === 'coach') {
          reply = `Let's crush this concept! You already know that changing flux creates an EMF. The key is just the minus sign (Lenz's Law). Nail this derivation once, and that's an easy 5 marks guaranteed on your exam board paper!`;
        } else if (selectedPersona.id === 'professor' || textToSend.includes("derivation")) {
          reply = `Here is the formal proof:\n1. Magnetic Flux: Φ = ∬ B · dA\n2. Faraday-Maxwell Relation: ∮ E · dl = -dΦ/dt\n3. Induced Current: I = ε / R = -(N/R)(dΦ/dt)\nThe negative sign represents Lenz's opposing flux boundary condition.`;
        } else if (selectedPersona.id === 'beginner' || textToSend.includes("10") || textToSend.includes("story")) {
          reply = `Imagine you're riding a bicycle through tall grass. If you pedal gently, the grass bends easily. But if you try to sprint forward rapidly, the grass pushes back hard against your shins! That's exactly how nature behaves with magnetic flux: the faster you force a change, the stronger the coil pushes back.`;
        } else if (selectedPersona.id === 'exam_trainer') {
          reply = `CBSE Examiner Tip: Writing e = dΦ/dt gets you 0.5/2 marks. You MUST state Lenz's Law and include the negative sign e = -dΦ/dt with the statement: "The induced EMF opposes the rate of change of magnetic flux."`;
        } else {
          reply = `In ${currentConceptTitle}, the central principle is that dynamic changes in physical fields create opposing reactions to preserve conservation laws. Stating the exact direction and rate of change will guarantee full marks on your exam!`;
        }
      }

      const tutorMsg: ChatMessage = {
        id: `tut-${Date.now()}`,
        sender: 'tutor',
        text: reply,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, tutorMsg]);
      audioEngine.playChime(750, 0.2);
    } catch {
      const errorMsg: ChatMessage = {
        id: `tut-${Date.now()}`,
        sender: 'tutor',
        text: "I'm having trouble reaching the network right now, but remember: the induced EMF always opposes the rate of change of magnetic flux (e = -dΦ/dt).",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSpeakMessage = (text: string) => {
    audioEngine.speakAnnouncement(text, true, currentLanguage);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(2, 6, 23, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      
      <div className="card" style={{
        width: '100%',
        maxWidth: '720px',
        height: '84vh',
        maxHeight: '740px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden'
      }}>
        
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(15, 23, 42, 0.85)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 229, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              flexShrink: 0
            }}>
              {selectedPersona.avatar}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedPersona.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {currentConceptTitle}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Persona Selector Ribbon */}
        <div style={{
          padding: '8px 16px',
          backgroundColor: 'rgba(2, 6, 23, 0.6)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', marginRight: '4px' }}>
            Persona:
          </span>
          {TEACHER_PERSONAS.map(p => (
            <button
              key={p.id}
              onClick={() => handlePersonaChange(p)}
              className={`btn ${selectedPersona.id === p.id ? 'btn-primary' : 'btn-outline'}`}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0
              }}
            >
              <span>{p.avatar}</span>
              <span>{p.name.replace('The ', '')}</span>
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map(msg => {
            const isTutor = msg.sender === 'tutor';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isTutor ? 'flex-start' : 'flex-end',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                {isTutor && (
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 229, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    {selectedPersona.avatar}
                  </div>
                )}

                <div style={{
                  maxWidth: '82%',
                  backgroundColor: isTutor ? 'rgba(30, 41, 59, 0.8)' : 'var(--cyan-primary)',
                  color: isTutor ? 'var(--text-primary)' : '#020617',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  borderTopLeftRadius: isTutor ? '2px' : '14px',
                  borderTopRightRadius: !isTutor ? '2px' : '14px',
                  fontSize: '13.5px',
                  lineHeight: 1.5,
                  position: 'relative'
                }}>
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                  
                  {isTutor && (
                    <button
                      onClick={() => handleSpeakMessage(msg.text)}
                      title="Read Aloud"
                      style={{
                        position: 'absolute',
                        bottom: '6px',
                        right: '8px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '2px'
                      }}
                    >
                      <Volume2 size={13} />
                    </button>
                  )}
                </div>

                {!isTutor && (
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--purple-primary)',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })}

          {isGenerating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan-primary)', fontSize: '13px' }}>
              <RefreshCw size={14} className="spinning" />
              <span>{selectedPersona.name} is formulating an intuitive response...</span>
            </div>
          )}
        </div>

        {/* Quick Prompt Chips */}
        <div style={{
          padding: '8px 16px',
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp)}
              className="btn btn-outline"
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '999px',
                flexShrink: 0
              }}
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder={`Ask ${selectedPersona.name.replace('The ', '')}...`}
            style={{
              flex: 1,
              backgroundColor: 'rgba(2, 6, 23, 0.7)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
              fontSize: '13.5px'
            }}
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={isGenerating || !inputText.trim()}
            className="btn btn-primary"
            style={{ padding: '0 16px', borderRadius: 'var(--radius-sm)' }}
          >
            <Send size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};
