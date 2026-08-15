import { GraphNode, GraphEdge, NodeStatus, EdgeType, Artifact } from './types.js';
import { GraphValidationError } from '../utils/errors.js';

export class ReasoningGraphStore {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: GraphEdge[] = [];

  public addNode(node: GraphNode): void {
    if (this.nodes.has(node.id)) {
      throw new GraphValidationError(`Node '${node.id}' already exists in graph.`);
    }
    this.nodes.set(node.id, {
      ...node,
      artifacts: [...(node.artifacts || [])],
      inputContext: { ...(node.inputContext || {}) }
    });
  }

  public getNode(id: string): GraphNode | null {
    return this.nodes.get(id) || null;
  }

  public updateNode(id: string, updates: Partial<GraphNode>): GraphNode {
    const existing = this.nodes.get(id);
    if (!existing) {
      throw new GraphValidationError(`Node '${id}' does not exist.`);
    }
    const updated: GraphNode = {
      ...existing,
      ...updates,
      artifacts: updates.artifacts ? [...updates.artifacts] : existing.artifacts,
      metadata: { ...(existing.metadata || {}), ...(updates.metadata || {}) }
    };
    this.nodes.set(id, updated);
    return updated;
  }

  public getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }

  public addEdge(edge: GraphEdge): void {
    if (!this.nodes.has(edge.fromNodeId)) {
      throw new GraphValidationError(`Source node '${edge.fromNodeId}' does not exist for edge '${edge.id}'.`);
    }
    if (!this.nodes.has(edge.toNodeId)) {
      throw new GraphValidationError(`Target node '${edge.toNodeId}' does not exist for edge '${edge.id}'.`);
    }
    this.edges.push({ ...edge });
  }

  public getEdges(): GraphEdge[] {
    return [...this.edges];
  }

  public getInEdges(nodeId: string, type?: EdgeType): GraphEdge[] {
    return this.edges.filter((e) => e.toNodeId === nodeId && (!type || e.type === type));
  }

  public getOutEdges(nodeId: string, type?: EdgeType): GraphEdge[] {
    return this.edges.filter((e) => e.fromNodeId === nodeId && (!type || e.type === type));
  }

  public getUpstreamNodes(nodeId: string): GraphNode[] {
    const depEdges = this.getInEdges(nodeId, 'DEPENDENCY');
    return depEdges
      .map((e) => this.getNode(e.fromNodeId))
      .filter((n): n is GraphNode => n !== null);
  }

  public getDownstreamNodes(nodeId: string): GraphNode[] {
    const depEdges = this.getOutEdges(nodeId, 'DEPENDENCY');
    return depEdges
      .map((e) => this.getNode(e.toNodeId))
      .filter((n): n is GraphNode => n !== null);
  }

  public getRevisions(originalNodeId: string): GraphNode[] {
    const revisions: GraphNode[] = [];
    let currentId = originalNodeId;
    while (currentId) {
      const revEdges = this.getOutEdges(currentId, 'REVISION');
      if (revEdges.length === 0) break;
      const nextNode = this.getNode(revEdges[0].toNodeId);
      if (!nextNode) break;
      revisions.push(nextNode);
      currentId = nextNode.id;
    }
    return revisions;
  }

  public getAllArtifacts(): Artifact[] {
    const artifacts: Artifact[] = [];
    const seen = new Set<string>();
    for (const node of this.nodes.values()) {
      for (const a of node.artifacts) {
        if (!seen.has(a.id)) {
          seen.add(a.id);
          artifacts.push(a);
        }
      }
    }
    return artifacts;
  }

  public clear(): void {
    this.nodes.clear();
    this.edges = [];
  }

  public toJSON(): { nodes: GraphNode[]; edges: GraphEdge[] } {
    return {
      nodes: this.getAllNodes(),
      edges: this.getEdges()
    };
  }

  public fromJSON(data: { nodes: GraphNode[]; edges: GraphEdge[] }): void {
    this.clear();
    for (const n of data.nodes) {
      this.addNode(n);
    }
    for (const e of data.edges) {
      this.addEdge(e);
    }
  }
}
