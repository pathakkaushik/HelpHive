import axios from 'axios';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const queryChatbot = asyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message) {
        throw new ApiError(400, "Message content is required");
    }

    const togetherAIApiKey = process.env.TOGETHER_API_KEY;
    if (!togetherAIApiKey) {
        throw new ApiError(500, "Chatbot API key is not configured on the server.");
    }

    // System prompt to guide the AI's personality and purpose
    const systemPrompt = `You are "HelpHive Assistant," a friendly and helpful AI assistant for the HelpHive platform. Your goal is to assist users looking for or offering domestic help services like maids, cooks, and babysitters.
- Be polite, concise, and professional.
- If you don't know an answer, say so. Do not make up information about pricing or specific helpers.
- Gently guide users to use the website's features (e.g., "You can find verified helpers by using the filters on the 'Find Help' page.").
- Your knowledge is based on the platform's public information. You cannot access user accounts or booking details.`;

    try {
        const response = await axios.post(
            'https://api.together.xyz/v1/chat/completions',
            {
                model: 'mistralai/Mixtral-8x7B-Instruct-v0.1', // A powerful and fast model
                max_tokens: 512,
                temperature: 0.7,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt,
                    },
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${togetherAIApiKey}`,
                },
            }
        );

        const botReply = response.data.choices[0].message.content;

        return res
            .status(200)
            .json(new ApiResponse(200, { reply: botReply }, "Query successful"));

    } catch (error) {
        console.error("Error calling Together AI:", error.response?.data || error.message);
        throw new ApiError(502, "The AI service is currently unavailable. Please try again later.");
    }
});

export { queryChatbot };