"use client";

import { Workflow } from "@/components/workflow/Workflow";
const sampleSteps = [
  {
    id: "1",
    endpointId: "fetch-user-data",
    order: 1,
    inputMapping: '{"userId": "$.input.userId"}',
    outputMapping: '{"userData": "$.response.data"}',
  },
  {
    id: "2",
    endpointId: "process-user-preferences",
    order: 2,
    inputMapping: '{"preferences": "$.steps.1.userData.preferences"}',
    outputMapping: '{"processedPreferences": "$.result"}',
  },
  {
    id: "3",
    endpointId: "generate-recommendations",
    order: 3,
    inputMapping:
      '{"userProfile": "$.steps.1.userData", "preferences": "$.steps.2.processedPreferences"}',
    outputMapping: '{"recommendations": "$.generatedRecommendations"}',
  },
  {
    id: "4",
    endpointId: "format-response",
    order: 4,
    inputMapping:
      '{"userData": "$.steps.1.userData", "recommendations": "$.steps.3.recommendations"}',
    outputMapping: '{"formattedResponse": "$.formatted"}',
  },
];

const sampleVariables = [
  {
    id: "var1",
    name: "userId",
    defaultValue: "12345",
    description: "The unique identifier for the user",
  },
  {
    id: "var2",
    name: "apiKey",
    description: "API key for external service authentication",
  },
  {
    id: "var3",
    name: "maxRecommendations",
    defaultValue: "5",
    description: "Maximum number of recommendations to generate",
  },
];

export default function WorkflowPage() {
  return (
    <div className="min-h-screen py-12">
      <Workflow steps={sampleSteps} variables={sampleVariables} />
    </div>
  );
}
