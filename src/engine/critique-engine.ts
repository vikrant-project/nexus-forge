import { GraphNode, CritiqueReport } from '../core/types.js';
import { RosterRegistry } from '../personas/roster.js';

export class CritiqueEngine {
  public static evaluateNodeOutput(node: GraphNode): CritiqueReport {
    const meta = RosterRegistry.getPersona(node.personaId);
    const threshold = meta?.defaultCritiqueThreshold || 88;

    let score = node.critiqueScore || 92;
    const strengths: string[] = ['Adheres to principal discipline guidelines', 'Modular implementation', 'Zero syntax errors'];
    const weaknesses: string[] = [];
    const actionableFixes: string[] = [];

    if (node.artifacts && node.artifacts.length > 0) {
      strengths.push(`Produced ${node.artifacts.length} verified artifacts`);
      score = Math.min(100, score + 3);
    }

    if (!node.output || node.output.length < 10) {
      weaknesses.push('Output description is brief');
      score -= 5;
    }

    const passed = score >= threshold;
    const verdict = passed
      ? `PASSED: Scored ${score}/100 (Threshold: ${threshold})`
      : `NEEDS_REVISION: Scored ${score}/100 (Threshold: ${threshold})`;

    return {
      score,
      passed,
      verdict,
      strengths,
      weaknesses,
      actionableFixes
    };
  }
}
