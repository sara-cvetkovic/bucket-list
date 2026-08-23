import { BucketItem } from '../models/BucketItem';

class BucketListService {

    async getItems(): Promise<BucketItem[]> {
        return [];
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