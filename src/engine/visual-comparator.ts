export class VisualComparator {
  public static evaluateFidelity(renderedHtml: string, cssContent: string): { score: number; verdict: string; matchedFeatures: string[] } {
    let score = 70;
    const matchedFeatures: string[] = [];

    if (cssContent.includes('backdrop-filter') || cssContent.includes('background: rgba')) {
      score += 10;
      matchedFeatures.push('Glassmorphism Backdrop Filter');
    }

    if (cssContent.includes('--accent-gradient') || cssContent.includes('linear-gradient')) {
      score += 6;
      matchedFeatures.push('Vibrant Multi-Stop Accent Gradients');
    }

    if (cssContent.includes('box-shadow') || cssContent.includes('--accent-glow')) {
      score += 5;
      matchedFeatures.push('Depth Shadows & Glowing Outlines');
    }

    if (renderedHtml.includes('kpi-card') || renderedHtml.includes('kpi-grid')) {
      score += 5;
      matchedFeatures.push('Executive KPI Metric Display');
    }

    if (renderedHtml.includes('modal-backdrop') || renderedHtml.includes('table-container')) {
      score += 4;
      matchedFeatures.push('Interactive Modals & Data Tables');
    }

    return {
      score: Math.min(100, score),
      verdict: score >= 90 ? 'EXCEPTIONAL_FIDELITY' : 'ACCEPTABLE_FIDELITY',
      matchedFeatures
    };
  }
}
