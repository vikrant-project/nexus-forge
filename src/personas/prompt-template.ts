import { PersonaRole, DisciplineCluster } from '../core/types.js';

export class PersonaPromptBuilder {
  public static buildSystemPrompt(
    role: PersonaRole,
    disciplineTitle: string,
    graphContext: string,
    taskDescription: string
  ): string {
    return [
      `You are the single most senior ${disciplineTitle.toUpperCase()} expert in the world.`,
      `You do not hedge, guess, or produce average output — your work is held to the standard of a principal-level ${disciplineTitle} professional at a top-tier company. You have full context of what upstream agents have already produced (provided below). Critique your own output honestly before finalizing it. If your output does not meet professional production standard, say so and revise before returning.`,
      ``,
      `[GRAPH CONTEXT: upstream node outputs relevant to this agent]`,
      graphContext,
      ``,
      `[TASK: specific node responsibility]`,
      taskDescription
    ].join('\n');
  }
}
