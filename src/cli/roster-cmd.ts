import { RosterRegistry } from '../personas/roster.js';
import { DisciplineCluster } from '../core/types.js';

export function runRosterCommand(): void {
  console.log('========================================================================');
  console.log('  NEXUS FORGE - 40 Expert Persona Roster');
  console.log('========================================================================\n');

  const clusters: { cluster: DisciplineCluster; title: string }[] = [
    { cluster: 'planning', title: 'PLANNING & ARCHITECTURE' },
    { cluster: 'backend', title: 'BACKEND ENGINEERING' },
    { cluster: 'frontend', title: 'FRONTEND / UI / UX' },
    { cluster: 'visual', title: 'VISUAL FIDELITY' },
    { cluster: 'security', title: 'CYBER SECURITY & SAST' },
    { cluster: 'qa', title: 'QUALITY ASSURANCE & TESTING' },
    { cluster: 'devops', title: 'DEVOPS & INFRASTRUCTURE' },
    { cluster: 'domain', title: 'DOMAIN SPECIALISTS' },
    { cluster: 'meta', title: 'META & OVERSIGHT GATEKEEPER' }
  ];

  for (const { cluster, title } of clusters) {
    const personas = RosterRegistry.getByDiscipline(cluster);
    console.log(`--- [DISCIPLINE: ${title}] (${personas.length} Personas) ---`);
    for (const p of personas) {
      const numStr = String(p.number).padStart(2, '0');
      console.log(`  #${numStr} [${p.id}] ${p.name}`);
      console.log(`      -> ${p.description}`);
    }
    console.log('');
  }

  console.log(`Total Active Personas: ${RosterRegistry.getAll().length}\n`);
}