import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { MCPHandlers } from './protocol-handlers.js';

export function createMCPServer(): Server {
  const server = new Server(
    { name: 'nexus-forge', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'nexus_orchestrate',
          description: 'Execute multi-agent graph orchestration on a single prompt to generate a full production application',
          inputSchema: {
            type: 'object',
            properties: {
              prompt: { type: 'string', description: 'Prompt describing the system or site to build' }
            },
            required: ['prompt']
          }
        },
        {
          name: 'nexus_list_roster',
          description: 'List all 40 expert personas across planning, backend, frontend, visual, security, QA, devops, domains, and meta',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        }
      ]
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === 'nexus_orchestrate') {
      const prompt = String((request.params.arguments as any)?.prompt || '');
      const res = await MCPHandlers.handleOrchestrate({ prompt });
      return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }
    if (request.params.name === 'nexus_list_roster') {
      const roster = MCPHandlers.handleListPersonas();
      return { content: [{ type: 'text', text: JSON.stringify(roster, null, 2) }] };
    }
    throw new Error(`Unknown tool: ${request.params.name}`);
  });

  return server;
}
