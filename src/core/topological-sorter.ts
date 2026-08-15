import { ReasoningGraphStore } from './graph-store.js';
import { ExecutionStage } from './types.js';
import { CyclicDependencyError } from '../utils/errors.js';

export class TopologicalSorter {
  public static computeExecutionStages(graph: ReasoningGraphStore): ExecutionStage[] {
    const nodes = graph.getAllNodes();
    if (nodes.length === 0) return [];

    const inDegree = new Map<string, number>();
    const adj = new Map<string, string[]>();

    for (const n of nodes) {
      inDegree.set(n.id, 0);
      adj.set(n.id, []);
    }

    for (const edge of graph.getEdges()) {
      if (edge.type === 'DEPENDENCY') {
        const from = edge.fromNodeId;
        const to = edge.toNodeId;
        adj.get(from)?.push(to);
        inDegree.set(to, (inDegree.get(to) || 0) + 1);
      }
    }

    const stages: ExecutionStage[] = [];
    let processedCount = 0;
    let stageNum = 1;

    let currentLevel: string[] = [];
    for (const [id, deg] of inDegree.entries()) {
      if (deg === 0) {
        currentLevel.push(id);
      }
    }

    while (currentLevel.length > 0) {
      stages.push({
        stageNumber: stageNum++,
        nodeIds: [...currentLevel],
        parallel: currentLevel.length > 1
      });

      processedCount += currentLevel.length;
      const nextLevel: string[] = [];

      for (const u of currentLevel) {
        const neighbors = adj.get(u) || [];
        for (const v of neighbors) {
          const newDeg = (inDegree.get(v) || 0) - 1;
          inDegree.set(v, newDeg);
          if (newDeg === 0) {
            nextLevel.push(v);
          }
        }
      }

      currentLevel = nextLevel;
    }

    if (processedCount < nodes.length) {
      throw new CyclicDependencyError(
        `Detected cyclic dependency in reasoning graph. Processed ${processedCount} of ${nodes.length} nodes.`
      );
    }

    return stages;
  }
}
