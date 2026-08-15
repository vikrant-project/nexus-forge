import { RosterRegistry } from '../personas/roster.js';

export function runRosterCommand(): void {
  const personas = RosterRegistry.getAllPersonas();
  console.log(`\n========================================================================`);
  console.log(`  NEXUS FORGE â€” 40 Expert Persona Roster`);
  console.log(`========================================================================\n`);

  const disciplines = ['planning', 'backend', 'frontend', 'visual', 'security', 'qa', 'devops', 'domain', 'meta'];

  for (const d of disciplines) {
    const group = personas.filter((p) => p.discipline === d);
    console.log(`\n--- [DISCIPLINE CLUSTER: ${d.toUpperCase()}] (${group.length} Personas) ---`);
    for (const p of group) {
      console.log(`  #${p.number.toString().padStart(2, '0')} [${p.id}] ${p.name}`);
      console.log(`      â†³ ${p.description}`);
    }
  }
  console.log(`\nTotal Active Personas: ${personas.length}\n`);
}
