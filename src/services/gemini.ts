import { CircuitGraphData } from '../types/topostem';
import { TranslanguaStudySet, SupportedLanguage } from '../types/translangua';
import { PathWeaverCaseStudy } from '../types/pathweaver';
import { TOPOSTEM_PRESET_CIRCUITS, TRANSLANGUA_PRESET_STUDIES, PATHWEAVER_PRESET_CASES } from './fixtures';

export interface GeminiApiConfig {
  apiKey: string;
  model: string;
}

class GeminiService {
  private apiKey: string = '';
  private model: string = 'gemini-1.5-flash';

  constructor() {
    // Check if key is available in localStorage or env
    if (typeof window !== 'undefined') {
      this.apiKey = localStorage.getItem('SUVIDHA_GEMINI_API_KEY') || '';
    }
  }

  public setApiKey(key: string) {
    this.apiKey = key.trim();
    if (typeof window !== 'undefined') {
      localStorage.setItem('SUVIDHA_GEMINI_API_KEY', this.apiKey);
    }
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public hasApiKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  // ==========================================
  // TopoSTEM: Parse Circuit Image / Description
  // ==========================================
  public async parseCircuitDiagram(imageBase64OrText: string): Promise<CircuitGraphData> {
    if (!this.hasApiKey()) {
      // Return instant high-fidelity preset fixture
      return TOPOSTEM_PRESET_CIRCUITS.ac_bridge;
    }

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
      const systemInstruction = `You are TopoSTEM, an elite visual-to-topological graph compiler for blind learners. Parse the provided circuit/graph into a strict JSON topological structure with coordinates, nodes, edges, loops, and questions.`;

      const prompt = `Convert this circuit into topological JSON:\n${imageBase64OrText}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return JSON.parse(rawText) as CircuitGraphData;
      }
      return TOPOSTEM_PRESET_CIRCUITS.ac_bridge;
    } catch (err) {
      console.warn("Falling back to deterministic TopoSTEM fixture:", err);
      return TOPOSTEM_PRESET_CIRCUITS.ac_bridge;
    }
  }

  // ==========================================
  // TransLanguaSTEM: Synthesize Translanguaging Map
  // ==========================================
  public async generateTranslanguaMap(
    englishText: string,
    targetLanguage: SupportedLanguage
  ): Promise<TranslanguaStudySet> {
    if (!this.hasApiKey()) {
      return TRANSLANGUA_PRESET_STUDIES.maxwell_displacement;
    }

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
      const prompt = `Deconstruct this English STEM text into a pedagogical translanguaging card for a ${targetLanguage} speaker. Return strict JSON matching the TranslanguaStudySet interface.\n\nText: ${englishText}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return JSON.parse(rawText) as TranslanguaStudySet;
      }
      return TRANSLANGUA_PRESET_STUDIES.maxwell_displacement;
    } catch (err) {
      console.warn("Falling back to deterministic TransLangua fixture:", err);
      return TRANSLANGUA_PRESET_STUDIES.maxwell_displacement;
    }
  }

  // ==========================================
  // PathWeaver: Compile Policy into Action DAG
  // ==========================================
  public async compilePolicyDAG(policyText: string): Promise<PathWeaverCaseStudy> {
    if (!this.hasApiKey()) {
      return PATHWEAVER_PRESET_CASES.robotics_lab_access;
    }

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
      const prompt = `Compile this university policy text into an Action DAG for an autistic student. Return strict JSON matching PathWeaverCaseStudy.\n\nPolicy: ${policyText}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return JSON.parse(rawText) as PathWeaverCaseStudy;
      }
      return PATHWEAVER_PRESET_CASES.robotics_lab_access;
    } catch (err) {
      console.warn("Falling back to deterministic PathWeaver fixture:", err);
      return PATHWEAVER_PRESET_CASES.robotics_lab_access;
    }
  }
}

export const geminiService = new GeminiService();
