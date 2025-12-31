import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Order, Retailer, Product } from '../types';

// Initialize the API client. 
// In a real app, strict error handling for missing keys is needed.
const getClient = () => {
    // Vite exposes env vars prefixed with VITE_ to the client
    // For Cloudflare Pages, set VITE_GEMINI_API_KEY in environment variables
    // Fallback support for build-time replacement via define
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 
                   (import.meta.env as any).GEMINI_API_KEY || 
                   ''; 
    // We proceed even if empty to prevent crash on startup, but calls will fail if not set.
    return new GoogleGenAI({ apiKey });
};

export const getBusinessInsights = async (
    orders: Order[], 
    retailers: Retailer[],
    products: Product[]
): Promise<string> => {
    try {
        const client = getClient();
        
        // Prepare context for the AI
        const context = `
            You are a smart business assistant for an Indian Distributor.
            Here is the current snapshot of the business:
            - Total Orders: ${orders.length}
            - Pending Orders: ${orders.filter(o => o.status === 'Pending Approval').length}
            - Total Retailers: ${retailers.length}
            - Products Low on Stock: ${products.filter(p => p.stock < 50).map(p => p.name).join(', ')}
            - Total Outstanding (Udhaar): ₹${retailers.reduce((acc, r) => acc + r.outstandingBalance, 0)}
        `;

        const response: GenerateContentResponse = await client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `${context} 
            Provide 3 short, actionable bullet points for the business owner to improve efficiency today. 
            Write in simple English suitable for an Indian business owner.`,
            config: {
                temperature: 0.7,
            }
        });

        return response.text || "Could not generate insights at this moment.";
    } catch (error) {
        console.error("AI Service Error:", error);
        return "AI service is currently unavailable. Please check your internet connection.";
    }
};

