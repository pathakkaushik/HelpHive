import fs from 'fs';
import axios from 'axios';

// Keywords that indicate non-document files (food, exam papers, memes, scenery, etc.)
const INVALID_FILENAME_KEYWORDS = [
    'food', 'biryani', 'thali', 'dish', 'recipe', 'snack', 'dinner', 'lunch', 'breakfast',
    'question', 'exam', 'paper', 'marks', 'syllabus', 'assignment', 'homework',
    'meme', 'wallpaper', 'scenery', 'nature', 'landscape', 'flower', 'car', 'bike',
    'game', 'screenshot', 'dp', 'avatar', 'funny', 'download', 'image', 'picture'
];

export const validateDocumentWithAI = async (filePath, originalName = '', documentType = 'Government ID') => {
    // 1. Filename Pattern Verification
    const cleanFileName = (originalName || filePath).toLowerCase();
    const matchedInvalidKeyword = INVALID_FILENAME_KEYWORDS.find(keyword => cleanFileName.includes(keyword));

    // If filename clearly indicates non-document file (e.g., biryani.jpg, thali.png, question-paper.pdf)
    if (matchedInvalidKeyword && !cleanFileName.includes('aadhaar') && !cleanFileName.includes('pan') && !cleanFileName.includes('police') && !cleanFileName.includes('id')) {
        return {
            isValid: false,
            reason: `Invalid document detected ('${originalName}'). AI Scanner identified '${matchedInvalidKeyword}' content. Please upload an official ${documentType}.`
        };
    }

    // 2. Gemini Vision AI Deep Image Inspection
    const googleApiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (googleApiKey && googleApiKey.trim() !== '') {
        try {
            const fileBuffer = fs.readFileSync(filePath);
            const base64Data = fileBuffer.toString('base64');
            
            let mimeType = 'image/jpeg';
            if (filePath.endsWith('.png')) mimeType = 'image/png';
            if (filePath.endsWith('.webp')) mimeType = 'image/webp';

            const prompt = `Inspect this file uploaded for a ${documentType} verification requirement.
Is this a genuine, official document (Aadhaar Card, PAN Card, Voter ID, Driving License, Police Verification Certificate, or Govt Document)?
CRITICAL: If the image shows food, meals, thali, biryani, exam question papers, textbook pages, scenery, animals, memes, or non-document objects, set isValidDocument to FALSE.
Respond ONLY in JSON format:
{
  "isValidDocument": boolean,
  "detectedContent": "string",
  "reason": "1 short sentence explaining why it is valid or invalid"
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
                if (parsed.isValidDocument === false) {
                    return {
                        isValid: false,
                        reason: parsed.reason || `AI Scanner rejected image. Detected: ${parsed.detectedContent || 'Non-document object'}.`
                    };
                }
            }
        } catch (error) {
            console.error("Gemini Vision Scan Error:", error.response?.data || error.message);
        }
    }

    return { isValid: true, reason: "Document validated successfully." };
};
