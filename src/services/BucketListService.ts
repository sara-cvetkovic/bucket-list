import { BucketItem } from '../models/BucketItem';
import DATABASE_URL from '../config/firebase';
import AuthService from './AuthService';

class BucketListService {

    async getItems(): Promise<BucketItem[]> {
        const token = AuthService.getToken();
        const url = `${DATABASE_URL}/bucketItems.json?auth=${token}`;

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
        const token = AuthService.getToken();

        const url = `${DATABASE_URL}/bucketItems/${id}.json?auth=${token}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch bucket item: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
            return null;
        }

        return {
            id,
            ...data,
        };
    }

    async addItem(item: Omit<BucketItem, 'id'>): Promise<BucketItem> {
        const token = AuthService.getToken();

        const url = `${DATABASE_URL}/bucketItems.json?auth=${token}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            throw new Error(`Failed to add bucket item: ${response.status}`);
        }

        const data = await response.json(); // Firebase vraća { name: "-Nxyz123..." }

        return {
            id: data.name,
            ...item,
        };
    }

    async updateItem(item: BucketItem): Promise<BucketItem> {
        const token = AuthService.getToken();

        const url = `${DATABASE_URL}/bucketItems/${item.id}.json?auth=${token}`;

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: item.title,
                description: item.description,
                category: item.category,
                completed: item.completed,
                isPublic: item.isPublic,
                ownerId: item.ownerId,
                createdBy: item.createdBy,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update bucket item: ${response.status}`);
        }

        return item;
    }

    async deleteItem(id: string): Promise<void> {
        const token = AuthService.getToken();

        const url = `${DATABASE_URL}/bucketItems/${id}.json?auth=${token}`;

        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete bucket item: ${response.status}`);
        }
    }
}

export default new BucketListService();