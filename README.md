# API-Docs based workflow generator

Provide the links to the API docs for the services you want to utilize, and let the system do the rest. Works best for all the integrations, Zapier didn't care about yet.

## Feature Roadmap

Users can build dynamic code workflows that include several API's. The workflows can soon be shared within the whole community to reuse common flow patterns.

## Database

PostgreSQL Entities:

Here are the two tables in Markdown format for your GitHub README:

PostgreSQL Entities:

| Entity            | Information stored                                  | References               | Referenced By                       | Example                                                                                                                                      |
| ----------------- | --------------------------------------------------- | ------------------------ | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| users             | User information                                    | -                        | chats, apiDocumentations, workflows | { id: "user123", name: "John Doe", email: "john@example.com" }                                                                               |
| chats             | Individual chat sessions                            | users                    | chatApiLinks                        | { id: "chat456", userId: "user123", title: "API Integration Chat" }                                                                          |
| apiDocumentations | Metadata about API documentations                   | users (createdBy)        | apiEndpoints, chatApiLinks          | { id: "api789", name: "GitHub API", createdBy: "user123" }                                                                                   |
| apiEndpoints      | Detailed information about individual API endpoints | apiDocumentations        | workflowSteps                       | { id: "endpoint101", apiDocumentationId: "api789", path: "/users", method: "GET" }                                                           |
| chatApiLinks      | Links between chats and API documentations          | chats, apiDocumentations | -                                   | { chatId: "chat456", apiDocumentationId: "api789" }                                                                                          |
| workflows         | User-created workflows                              | users                    | workflowSteps, workflowVariables    | { id: "workflow202", userId: "user123", title: "GitHub Issue Tracker" }                                                                      |
| workflowSteps     | Individual steps within a workflow                  | workflows, apiEndpoints  | -                                   | { id: "step303", workflowId: "workflow202", apiEndpointId: "endpoint101", order: 1 }                                                         |
| workflowVariables | Variables used within workflows                     | workflows                | -                                   | { id: "var404", workflowId: "workflow202", name: "GITHUBAPIKEY", defaultValue: null, description: "Your GitHub API key for authentication" } |

Qdrant Entity:

| Entity                                | Information stored                            | References | Referenced By | Example                                                                                                                                                             |
| ------------------------------------- | --------------------------------------------- | ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vector Embeddings (Qdrant Collection) | Vector embeddings of API documentation chunks | -          | -             | { id: "vec505", vector: [0.1, 0.2, ...], payload: { apiDocumentationId: "api789", apiEndpointId: "endpoint101", content: "This endpoint retrieves user data..." } } |

## Security

### Threat Model

### Cyber security measures

###

## Architecture

Currently under construction 🔨

## Roadmap

Currently under construction 🔨
