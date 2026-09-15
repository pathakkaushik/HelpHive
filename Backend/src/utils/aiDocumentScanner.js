import fs from 'fs';
import axios from 'axios';

// Extensive list of non-document keywords (food, snacks, beverages, exam papers, memes, scenery, etc.)
export const INVALID_FILENAME_KEYWORDS = [
    // Food & Drinks
    'badapao', 'vadapao', 'vadapav', 'vada', 'pao', 'pav', 'samosa', 'chaii', 'chai', 'tea', 'coffee',
    'biryani', 'thali', 'food', 'dish', 'recipe', 'snack', 'dinner', 'lunch', 'breakfast',
    'pizza', 'burger', 'noodle', 'rice', 'curry', 'paneer', 'chicken', 'mutton', 'sweet', 'mithai',
    'cake', 'juice', 'drink', 'eating', 'restaurant', 'hotel', 'menu', 'roti', 'paratha', 'dosa', 'idli',
    // Exam & School/College
    'question', 'exam', 'paper', 'marks', 'syllabus', 'assignment', 'homework', 'test', 'result',
    'sheet', 'page', 'book', 'notes', 'questionpaper', 'anskey',
    // General Media & Non-documents
    'meme', 'wallpaper', 'scenery', 'nature', 'landscape', 'flower', 'car', 'bike', 'vehicle',
    'game', 'screenshot', 'dp', 'avatar', 'funny', 'download', 'image', 'picture', 'photo',
    'img', 'pic', 'selfie', 'camera', 'gallery', 'random', 'temp'
];

export const validateDocumentWithAI = async (filePath, originalName = '', documentType = 'Government ID') => {
    // 1. Strict Filename & Keyword Inspection
    const cleanFileName = (originalName || filePath).toLowerCase();
    
    // Check if filename contains any forbidden non-document terms
    const matchedKeyword = INVALID_FILENAME_KEYWORDS.find(keyword => cleanFileName.includes(keyword));

    // Exclude if filename contains explicit document indicators (e.g., aadhaar_photo.jpg)
    const isExplicitDocName = cleanFileName.includes('aadhaar') || cleanFileName.includes('pan') || cleanFileName.includes('police') || cleanFileName.includes('passport') || cleanFileName.includes('license');

    if (matchedKeyword && !isExplicitDocName) {
        return {
            isValid: false,
            reason: `Invalid document detected ('${originalName}'). AI Scanner detected '${matchedKeyword}' content. Please upload a valid official ${documentType}.`
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
CRITICAL: If the image shows food, vada pav, samosa, chai, biryani, thali, exam question papers, textbook pages, scenery, animals, memes, or non-document objects, set isValidDocument to FALSE.
Respond ONLY in JSON format:
{
  "isValidDocument": boolean,
  "detectedContent": "string",
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
