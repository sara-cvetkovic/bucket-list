import { BucketItem } from '../models/BucketItem';
import DATABASE_URL from '../config/firebase';
import AuthService from './AuthService';

class BucketListService {

    async getItems(): Promise<BucketItem[]> {
        const user = AuthService.getCurrentUser();

        if (!user) {
            throw new Error('User is not logged in.');
        }

        const token = AuthService.getToken();

        const url = `${DATABASE_URL}/bucketItems/${user.userId}.json?auth=${token}`;

        const response = await fetch(url);

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
        const user = AuthService.getCurrentUser();

        if (!user) {
            throw new Error('User is not logged in.');
        }

        const token = AuthService.getToken();

        const url = `${DATABASE_URL}/bucketItems/${user.userId}/${id}.json?auth=${token}`;

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
        const user = AuthService.getCurrentUser();

        if (!user) {
            throw new Error('User is not logged in.');
        }

        const token = AuthService.getToken()

        console.log('Current user:', user);
        console.log('Token:', token);
        console.log('Token exists:', !!token);

        const url = `${DATABASE_URL}/bucketItems/${user.userId}.json?auth=${token}`;

        const itemData = {
            ...item,
            ownerId: user.userId,
            createdBy: user.userId,
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData),
        });

        if (!response.ok) {
            throw new Error(`Failed to add bucket item: ${response.status}`);
        }

        const data = await response.json(); // Firebase vraća { name: "-Nxyz123..." }

        return {
            id: data.name,
            ...itemData,
        };
    }

    async updateItem(item: BucketItem): Promise<BucketItem> {
        const user = AuthService.getCurrentUser();

        if (!user) {
            throw new Error('User is not logged in.');
        }

        const token = AuthService.getToken();

        const url = `${DATABASE_URL}/bucketItems/${user.userId}/${item.id}.json?auth=${token}`;

        const itemData = {
            title: item.title,
            description: item.description,
            category: item.category,
            completed: item.completed,
            isPublic: item.isPublic,
            ownerId: user.userId,
            createdBy: item.createdBy,
        };

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        });


        if (item.isPublic) {
            await this.addPublicItem({
                ...item,
            });
        } else {
            await this.removePublicItem(item.id);
        }

        if (!response.ok) {
            throw new Error(`Failed to update bucket item: ${response.status}`);
        }

        return {
            ...item,
            ...itemData,
        };
    }

    async deleteItem(id: string): Promise<void> {
        const user = AuthService.getCurrentUser();

        if (!user) {
            throw new Error('User is not logged in.');
        }

        const token = AuthService.getToken();

        const url = `${DATABASE_URL}/bucketItems/${user.userId}/${id}.json?auth=${token}`;

        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete bucket item: ${response.status}`);
        }
    }

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

    async addPublicItem(item: BucketItem): Promise<void> {
        const token = AuthService.getToken();

        const url =
            `${DATABASE_URL}/publicItems/${item.id}.json?auth=${token}`;

        const publicItem = {
            title: item.title,
            description: item.description,
            category: item.category,
            completed: item.completed,
            isPublic: true,
            ownerId: item.ownerId,
            createdBy: item.createdBy,
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(publicItem),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to add public item: ${response.status}`
            );
        }
    }

    async removePublicItem(id: string): Promise<void> {
        const token = AuthService.getToken();

        const url =
            `${DATABASE_URL}/publicItems/${id}.json?auth=${token}`;

        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(
                `Failed to remove public item: ${response.status}`
            );
        }
    }

    async getPublicItem(id: string): Promise<BucketItem | null> {
        const token = AuthService.getToken();

        const url =
            `${DATABASE_URL}/publicItems/${id}.json?auth=${token}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch public item: ${response.status}`
            );
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
}

export default new BucketListService();