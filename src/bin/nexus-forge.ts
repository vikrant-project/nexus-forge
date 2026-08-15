#!/usr/bin/env node
import { Command } from 'commander';
import { runOrchestrationCommand } from '../cli/run.js';
import { runRosterCommand } from '../cli/roster-cmd.js';
import { RosterRegistry } from '../personas/roster.js';

const program = new Command();

program
  .name('nexus-forge')
  .description('Single-Model Multi-Persona Agent Orchestration Framework for Antigravity IDE')
  .version('1.0.0');

program
  .command('run')
  .description('Run multi-agent graph orchestration on a prompt')
  .argument('<prompt>', 'User prompt describing what to build')
  .option('-o, --output <dir>', 'Directory to write generated project files to')
  .action(async (prompt, options) => {
    try {
      await runOrchestrationCommand(prompt, options.output);
    } catch (err: any) {
      console.error('Error during orchestration:', err.message);
      process.exit(1);
    }
  });

program
  .command('roster')
  .description('List all 40 specialized expert personas and discipline clusters')
  .action(() => {
    runRosterCommand();
  });

program.parse(process.argv);
