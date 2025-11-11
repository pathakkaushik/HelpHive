import axios from 'axios';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const queryChatbot = asyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message) {
        throw new ApiError(400, "Message content is required");
    }

    const googleApiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!googleApiKey) {
        throw new ApiError(500, "Chatbot API key is not configured on the server.");
    }

    // System prompt to guide the AI's personality and purpose
    const systemPrompt = `You are "HelpHive Assistant," a friendly and helpful AI assistant for the HelpHive platform. Your goal is to assist users looking for or offering domestic help services like maids, cooks, and babysitters.
- Be polite, concise, and professional.
- If you don't know an answer, say so. Do not make up information about pricing or specific helpers.
- Gently guide users to use the website's features (e.g., "You can find verified helpers by using the filters on the 'Find Help' page.").
- Your knowledge is based on the platform's public information. You cannot access user accounts or booking details.`;

    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${googleApiKey}`;

    try {
        const response = await axios.post(
            apiEndpoint,
            {
                // Gemini uses a 'contents' array for conversational history.
                // We provide the system prompt as the first "user" turn to set the context.
                contents: [
                    {
                        parts: [ { text: systemPrompt } ]
                    },
                    {
                        parts: [ { text: "Okay, I understand. I am the HelpHive Assistant." } ],
                        role: "model"
                    },
                    {
                        parts: [ { text: message } ]
                    }
                ],
                // Optional: Configuration for safety and generation
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 512,
                }
            }
        );

        // Safely access the response text
        const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!botReply) {
             throw new ApiError(502, "The AI service returned an invalid response.");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { reply: botReply }, "Query successful"));

    } catch (error) {
        console.error("Error calling Google Gemini AI:", error.response?.data || error.message);
        throw new ApiError(502, "The AI service is currently unavailable. Please try again later.");
    }
});

export { queryChatbot };