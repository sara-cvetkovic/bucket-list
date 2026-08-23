export interface BucketItem {
    id: string;
    title: string;
    description: string;
    category: string;
    completed: boolean;
    isPublic: boolean;
    ownerId: string;
    createdBy: string;
}