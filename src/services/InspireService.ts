import { InspireIdea } from '../models/InspireIdea';
import AuthService from './AuthService';

const DATABASE_URL =
    import.meta.env.VITE_FIREBASE_DATABASE_URL;

class InspireService {

    async getIdeas(): Promise<InspireIdea[]> {

        const token = AuthService.getToken();

        const url =
            `${DATABASE_URL}/inspireIdeas.json?auth=${token}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch inspire ideas: ${response.status}`
            );
        }

        const data = await response.json();

        if (!data) {
            return [];
        }

        return Object.entries(data).map(
            ([id, idea]) => ({
                id,
                ...(idea as Omit<InspireIdea, 'id'>),
            })
        );
    }
}

export default new InspireService();