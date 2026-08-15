import { NexusForgeOrchestrator } from '../engine/orchestrator.js';
import * as fs from 'fs';
import * as path from 'path';

export async function runOrchestrationCommand(prompt: string, outputDir?: string): Promise<void> {
  console.log('\n======================================================');
  console.log('  NEXUS FORGE - Multi-Agent Orchestration System');
  console.log(`  Prompt: "${prompt}"`);
  console.log('======================================================\n');

  try {
    const result = await NexusForgeOrchestrator.executePrompt(prompt);

    console.log('\n[SUCCESS] Orchestration Completed:');
    console.log(`- Job ID: ${result.jobId}`);
    console.log(`- Project Category: ${result.category}`);
    console.log(`- Total Graph Nodes: ${result.nodes.length}`);
    console.log(`- Total Artifacts: ${result.artifacts.length}`);
    console.log(`- Final Review Sign-Off: ${result.finalReviewPassed ? 'APPROVED (Principal Engineer)' : 'REJECTED'}`);
    console.log(`- Duration: ${result.executionDurationMs}ms\n`);

    if (outputDir) {
      const resolvedDir = path.resolve(process.cwd(), outputDir);
      if (!fs.existsSync(resolvedDir)) {
        fs.mkdirSync(resolvedDir, { recursive: true });
      }

      for (const artifact of result.artifacts) {
        const filePath = path.join(resolvedDir, artifact.name);
        fs.writeFileSync(filePath, artifact.content, 'utf-8');
        console.log(`  [FILE] Generated: ${filePath}`);
      }
      console.log(`\nAll project artifacts successfully written to: ${resolvedDir}\n`);
    }
  } catch (err: any) {
    console.error(`\n[ERROR] Orchestration failed: ${err.message}\n`);
    process.exit(1);
  }
}