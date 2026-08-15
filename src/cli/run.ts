import { NexusForgeOrchestrator } from '../engine/orchestrator.js';
import * as fs from 'fs';
import * as path from 'path';

export async function runOrchestrationCommand(prompt: string, outputDir?: string): Promise<void> {
  console.log(`\n======================================================`);
  console.log(`  NEXUS FORGE â€” Multi-Agent Orchestration System`);
  console.log(`  Prompt: "${prompt}"`);
  console.log(`======================================================\n`);

  const result = await NexusForgeOrchestrator.executePrompt(prompt);

  console.log(`\nâœ… Orchestration Succeeded!`);
  console.log(`- Job ID: ${result.jobId}`);
  console.log(`- Project Category: ${result.category}`);
  console.log(`- Total Graph Nodes: ${result.nodes.length}`);
  console.log(`- Total Artifacts: ${result.artifacts.length}`);
  console.log(`- Final Review Sign-Off: ${result.finalReviewPassed ? 'APPROVED (Principal Engineer)' : 'PENDING'}`);
  console.log(`- Duration: ${result.executionDurationMs}ms\n`);

  if (outputDir && result.artifacts.length > 0) {
    const resolvedDir = path.resolve(outputDir);
    if (!fs.existsSync(resolvedDir)) {
      fs.mkdirSync(resolvedDir, { recursive: true });
    }

    for (const art of result.artifacts) {
      const filePath = path.join(resolvedDir, art.name);
      fs.writeFileSync(filePath, art.content, 'utf8');
      console.log(`  ðŸ“¦ Generated file: ${filePath}`);
    }
    console.log(`\nAll project artifacts successfully written to: ${resolvedDir}\n`);
  }
}
