import { auth } from "@/auth";
import { authorizeUser } from "@/lib/auth/authorize-user";
import { createMessage } from "@/db/queries/message/message";
import { generateChatCompletion } from "@/lib/language-model/chat-completion";
import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "@/utils/getSystemPrompt";

export async function POST(
  request: NextRequest, 
  { params }: { params: { userId: string, chatId: string }}
): Promise<NextResponse> {
  const session = await auth();
  
  const authError = await authorizeUser(session, params.userId, "ask workflow questions");
  if (authError) return authError;

  try {
    const { messages, codeSnippet } = await request.json();
    const systemPrompt = getSystemPrompt(codeSnippet);

    const response = await generateChatCompletion([
      { role: "system", content: systemPrompt },
      ...messages,
    ]);

    const newMessage = await createMessage({
      chatId: params.chatId,
      content: response,
      role: 'assistant',
      timestamp: new Date(),
    });

    return NextResponse.json({
      message: newMessage
    }, { status: 201 });
  } catch (error) {
    console.error("Error generating workflow explanation", error);
    return NextResponse.json({ error: "Failed to generate workflow explanation" }, { status: 500 });
  }
}