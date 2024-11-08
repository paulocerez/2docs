# API-Docs based workflow generator

Provide the links to the API docs for the services you want to utilize, and let the system do the rest. Works best for all the integrations, Zapier didn't care about yet.

## Features

Users can build dynamic code workflows that include several API's. The workflows can soon be shared within the whole community to reuse common flow patterns.

## Database

PostgreSQL Entities:

- users
  Stores user information
  Referenced by: chats, apiDocumentations, workflows
- chats
  Stores individual chat sessions
  References: users
  Referenced by: chatApiLinks
- apiDocumentations
  Stores metadata about API documentations
  References: users (createdBy)
  Referenced by: apiEndpoints, chatApiLinks
- apiEndpoints
  Stores detailed information about individual API endpoints
  References: apiDocumentations
- chatApiLinks
  Links chats to specific API documentations
  References: chats, apiDocumentations
- workflows
  Stores user-created workflows
  References: users
  Referenced by: workflowSteps, workflowVariables
- workflowSteps
  Stores individual steps within a workflow
  References: workflows, apiEndpoints
- workflowVariables
  Stores variables used within workflows
  References: workflows

Qdrant Entity:

- Vector Embeddings (Qdrant Collection)
  Stores vector embeddings of API documentation chunks
  Payload includes references to PostgreSQL entities:
  apiDocumentationId (references apiDocumentations.id)
  apiEndpointId (references apiEndpoints.id)

## Security

Threat Model

## Architecture

Currently under construction 🔨

## Roadmap

Currently under construction 🔨
