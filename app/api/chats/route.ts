import { createChat, getAllChatsByUserId } from "@/db/postgres/queries/chat";
import { NextRequest, NextResponse } from "next/server";


/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: API endpoints for managing chats
 * 
 * /chats:
 *   get:
 *     summary: Get all chats for a user
 *     tags: [Chats]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to fetch chats for
 *     responses:
 *       200:
 *         description: List of chats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: User ID not provided
 *       500:
 *         description: Server error
 *   
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: Initial prompt for the chat
 *     responses:
 *       201:
 *         description: Chat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 */

export async function GET (request: NextRequest): Promise<NextResponse> {
	const userId = request.nextUrl.searchParams.get("userId")
	
	if (!userId) {
		return NextResponse.json({error: "User Id is not provided"}, { status: 400 })
	}
	try {
		const result = await getAllChatsByUserId(userId);
		return NextResponse.json(result, { status: 200 })
	} catch (error) {
		console.error("Error fetching chats", error)
		return NextResponse.json({ error: "Could not get chats"}, { status: 500 })
	}
} 
export async function POST (request: NextRequest): Promise<NextResponse> {
	const body = await request.json();
	try {
		const result = await createChat(body, body.prompt);
		return NextResponse.json(result, { status: 201 })
	} catch (error) {
		console.error("Error creating chat", error)
		return NextResponse.json({ error: "Could not create chat"}, { status: 500 })
	}
}