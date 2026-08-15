export class NexusForgeError extends Error {
  public readonly code: string;
  public readonly details?: any;

  constructor(message: string, code = 'NEXUS_FORGE_ERROR', details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class PersonaExecutionError extends NexusForgeError {
  constructor(message: string, details?: any) {
    super(message, 'PERSONA_EXECUTION_ERROR', details);
  }
}

export class CyclicDependencyError extends NexusForgeError {
  constructor(message: string, details?: any) {
    super(message, 'CYCLIC_DEPENDENCY_ERROR', details);
  }
}

export class MaxRevisionsExceededError extends NexusForgeError {
  constructor(message: string, details?: any) {
    super(message, 'MAX_REVISIONS_EXCEEDED_ERROR', details);
  }
}

export class GatekeeperRejectionError extends NexusForgeError {
  constructor(message: string, details?: any) {
    super(message, 'GATEKEEPER_REJECTION_ERROR', details);
  }
}

export class GraphValidationError extends NexusForgeError {
  constructor(message: string, details?: any) {
    super(message, 'GRAPH_VALIDATION_ERROR', details);
  }
}
