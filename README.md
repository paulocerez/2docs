<div align="center">

<img src="public/2docs-logo.svg" alt="2docs Logo" width="180" height="180" />

<h1 style="margin-top: 8px;">2docs</h1>

Generate robust code workflows by integrating two or more API's seamlessly. Works by inserting a descriptive workflow prompt and the links to the API references to be included. Finetune and iterate as needed. Cheap, accurate, and user-friendly.

<div style="display: flex; justify-content: space-around; align-items: center; padding: 10px 0px">
  <table style="border-collapse: collapse; border: none;">
    <tr>
      <td align="center" width="200" style="border: none;">
        <a href="https://docs.2docs.dev">Documentation</a>
      </td>
      <td align="center" width="200" style="border: none;">
        <a href="https://docs.2docs.dev/getting-started">Getting Started</a>
      </td>
      <td align="center" width="200" style="border: none;">
        <a href="https://docs.2docs.dev/examples">API Reference</a>
      </td>
    </tr>
  </table>
</div>
</div>

---

## Table of Contents

- [Who is this useful for?](#who-is-this-useful-for)
  - [User Personas](#user-personas)
  - [User Stories](#user-stories)
- [Usage](#usage)
  - [Web App](#web-app)
  - [API](#api)
  - [Local Usage](#local-usage)
- [Conceptual Guide](#conceptual-guide)
- [Feature Roadmap](#feature-roadmap)
- [Database](#database)
  - [Entity-Relationship Diagram](#entity-relationship-diagram)
  - [PostgreSQL](#postgresql)
  - [Qdrant](#qdrant)
- [Security](#security)
  - [Threat Model](#threat-model)
  - [Cyber Security Measures](#cyber-security-measures)
  - [Current External Dependencies](#current-external-dependencies)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Possible Contributions](#possible-contributions)

---

## TL;DR

2docs is a tool that generates code workflows by connecting multiple APIs though their references. It crawls API documentation directly for up-to-date accuracy, enabling developers to build integrated systems quickly with full code ownership (no vendor lock-in). Cheap, reliable, accurate. It uses vector embeddings for efficient API endpoint matching.

- It offers three ways to use:
  - Web App: Quick browser-based interface
  - API: Direct endpoint access
  - Local Setup: Full development environment

Built with Next.js/TypeScript, PostgreSQL (Neon Serverless), Qdrant, and Docker.

Watch me give a few words about the tool here: ⬇️

<iframe width="640" height="400" src="https://www.loom.com/embed/9cb21f641319445eb8e64bde2aa23e34?sid=5dfc7397-4e70-44e9-a45c-d8f319696f67?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
 frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Who is this useful for?

The tool aims to simplify the creation of automations with full ownership over the code. Compared to common automation tools it aims to give the developer full control over the generated code while maintaining much lower costs (plus no lock-in effects, you own all the code) and higher accuracy due to frequent crawling of the API references directly.

Some API's change quite frequently. This might take quite some time to be reflected in Integrations of tools like Zapier or Make. Furthermore, 2docs intends to create educational transparency for developers getting started using multiple Application Programming Interfaces. As this is a crucial skill for developers nowadays, the data flows between these interfaces should be playful, easy to grasp, and highly interactive.

<details>
<summary>User Personas</summary>
<br />

- Name: Paul
- Developer skill: Midlevel
- Programming languages: JS/TS
- Developer environment: MacOS, Linux
- Team role: Software Engineer
  <br />
- Name: Lisa
- Developer skill: No-code experience, Web Dev Basics
- Programming languages: JS/TS, Python
- Developer environment: MacOS, Linux
- Team role: Product Manager
</details>

<details>
<summary>User Stories</summary>

```
”As a developer, I want to implement two or more API's quickly so our product can access 3rd party data to build a better product for our clients.”
```

```
”As a Product Manager, I want to easily understand the requirements on how to integrate different services using custom code to improve our product and automate boring stuff.”
```

</details>
</div>

## Usage

Depending on your use case, there's different ways of working with 2docs workflows:

### Web App

The easiest way to use 2docs is via the web app running in the browser. It is currently visible <a href="https://2docs.vercel.app/">here</a>.

### API

Check out the API reference here to call the respective endpoints for workflow generation and retrieve the code.

### Local usage

Follow the instructions below to set up a local development environment for 2docs.

##### Clone the repository

```
git clone https://github.com/paulocerez/2docs.git
```

##### Copy the .env.example file into a .env

```
cp .env.example .env
```

```
AUTH_SECRET=
DATABASE_PASSWORD=
AUTH_DRIZZLE_URL=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
DATABASE_URL=
OPENAI_API_KEY=
FIRECRAWL_API_KEY=
QDRANT_API_KEY=
QDRANT_URL=
```

##### Get the necessary API-Keys

```
Visit and generate an API Key at OpenAI.
```

##### Install the required dependencies

```
npm install
```

##### Run the application locally

```
docker compose up --build
```

## Conceptual Guide

## Feature Roadmap

##### 15-11-2024

Users can start basic chat sessions, crawling entire API references and store these in the Vector Database. The generator then builds a workflow based on the user prompt.

##### 15-12-2024

The workflows are much more accurate. Users can share workflows in an Online Community.

## Database

### Entity-Relationship Diagram

```mermaid
erDiagram
users ||--o{ chats : creates
users ||--o{ apiDocumentations : creates
users ||--o{ workflows : creates
chats ||--o{ chatApiLinks : has
apiDocumentations ||--o{ apiEndpoints : contains
apiDocumentations ||--o{ chatApiLinks : referenced_in
workflows ||--o{ workflowSteps : contains
workflows ||--o{ workflowVariables : has
apiEndpoints ||--o{ workflowSteps : used_in
users {
string id PK
string name
string email
}
chats {
string id PK
string userId FK
string title
}
apiDocumentations {
string id PK
string name
string createdBy FK
}
apiEndpoints {
string id PK
string apiDocumentationId FK
string path
string method
}
chatApiLinks {
string chatId FK
string apiDocumentationId FK
}
workflows {
string id PK
string userId FK
string title
}
workflowSteps {
string id PK
string workflowId FK
string apiEndpointId FK
int order
}
workflowVariables {
string id PK
string workflowId FK
string name
string defaultValue
string description
}
```

### PostgreSQL

```
Storing data in tables per entity.
```

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

### Qdrant

```
Storing vector embeddings of the scraped API references, performing vector similarity search for efficient endpoint retrieval.
```

| Entity                                | Information stored                            | References | Referenced By | Example                                                                                                                                                             |
| ------------------------------------- | --------------------------------------------- | ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vector Embeddings (Qdrant Collection) | Vector embeddings of API documentation chunks | -          | -             | { id: "vec505", vector: [0.1, 0.2, ...], payload: { apiDocumentationId: "api789", apiEndpointId: "endpoint101", content: "This endpoint retrieves user data..." } } |

## Security

### Threat Model

### Cyber security measures

| Entry Point | Threat | Mitigation |
| ----------- | ------ | ---------- |

### Current external dependencies

Auth.js for OAuth authentication. Google as the Identity Provider for Sign-up and login functionality. Qdrant and Neon Serverless as Database Cloud Services.

## Architecture

Currently under construction 🔨

## Technologies

- Next.js 15 (App Router, TypeScript, TailwindCSS)
- Postgresql (Neon Serverless), Qdrant
- Firecrawl
- Docker

## Possible contributions

- Crawling service: Currently using FireCrawl Cloud as a 3rd-party library for crawling the API references -> Small vendor-lock-in + DOS risks (and high costs)
