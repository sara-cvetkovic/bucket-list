import { BucketItem } from '../models/BucketItem';
import DATABASE_URL from '../config/firebase';

class BucketListService {

    async getItems(): Promise<BucketItem[]> {
        const url = `${DATABASE_URL}/bucketItems.json`;

        console.log('Fetching URL:', url);

        const response = await fetch(url);

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`Failed to fetch bucket items: ${response.status}`);
        }

        const data = await response.json();

        console.log('Firebase response:', data);

        if (!data) {
            return [];
        }

        return Object.entries(data).map(([id, item]) => ({
            id,
            ...(item as Omit<BucketItem, 'id'>),
        }));
    }

    async getItem(id: string): Promise<BucketItem | null> {
        return null;
    }

    async addItem(item: BucketItem): Promise<void> {
    }

    async updateItem(item: BucketItem): Promise<void> {
    }

    async deleteItem(id: string): Promise<void> {
    }
}

export default new BucketListService();