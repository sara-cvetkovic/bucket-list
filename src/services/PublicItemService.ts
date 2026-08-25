import { BucketItem } from '../models/BucketItem';
import AuthService from './AuthService';

const DATABASE_URL =
    import.meta.env.VITE_FIREBASE_DATABASE_URL;

class PublicItemService {

    async getPublicItems(): Promise<BucketItem[]> {

        const token = AuthService.getToken();

        const url =
            `${DATABASE_URL}/publicItems.json?auth=${token}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch public items: ${response.status}`
            );
        }

        const data = await response.json();

        if (!data) {
            return [];
        }

        return Object.entries(data).map(
            ([id, item]) => ({
                id,
                ...(item as Omit<BucketItem, 'id'>),
            })
        );
    }
}

export default new PublicItemService();