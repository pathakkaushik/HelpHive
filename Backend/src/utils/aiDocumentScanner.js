import fs from 'fs';
import axios from 'axios';

export const validateDocumentWithAI = async (filePath, documentType) => {
    const googleApiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!googleApiKey || googleApiKey.trim() === '') {
        return { isValid: true, reason: "AI Scanner Key inactive" };
    }

    try {
        const fileBuffer = fs.readFileSync(filePath);
        const base64Data = fileBuffer.toString('base64');
        
        let mimeType = 'image/jpeg';
        if (filePath.endsWith('.png')) mimeType = 'image/png';
        if (filePath.endsWith('.webp')) mimeType = 'image/webp';

        const prompt = `Analyze this uploaded file for a ${documentType} upload requirement. 
Is this a genuine official document (like Aadhaar Card, PAN Card, Voter ID, Driving License, Police Verification Certificate, or Govt Document)?
CRITICAL: If the image contains food, dishes, meals, exam papers, textbook pages, landscapes, animals, memes, or non-document objects, mark isValidDocument as FALSE.
Respond ONLY in strict JSON format:
{
  "isValidDocument": boolean,
  "detectedType": "string",
  "reason": "short explanation in 1 sentence"
}`;

        const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${googleApiKey}`;
        
        const response = await axios.post(apiEndpoint, {
            contents: [
                {
                    parts: [
                        {
                            inlineData: {
                                mimeType: mimeType,
                                data: base64Data
                            }
                        },
                        { text: prompt }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 256
            }
        }, { timeout: 12000 });

        const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
            const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanJson);
            return {
                isValid: Boolean(parsed.isValidDocument),
                reason: parsed.reason || "Invalid document format detected by AI Scanner."
            };
        }
    } catch (error) {
        console.error("AI Document Scanner Exception:", error.response?.data || error.message);
    }

    return { isValid: true, reason: "AI Scanner Network Fallback" };
};
