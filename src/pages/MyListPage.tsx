import {IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, useIonViewWillEnter} from '@ionic/react';
import BucketItem from '../components/BucketItem';
import { BucketItem as BucketItemModel } from '../models/BucketItem';
import './MyListPage.css';
import { useEffect, useState } from 'react';
import BucketItemModal from '../components/BucketItemModal';
import BucketListService from '../services/BucketListService';
import AuthService from '../services/AuthService';

const MyListPage: React.FC = () => {

    const [items, setItems] = useState<BucketItemModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const testItems: BucketItemModel[] = [
    //     {
    //         id: '1',
    //         title: 'Visit Japan',
    //         description: 'Visit Tokyo and Kyoto',
    //         category: 'Travel',
    //         completed: false,
    //         isPublic: true,
    //         ownerId: 'test-user',
    //         createdBy: 'test-user',
    //     },
    //     {
    //         id: '2',
    //         title: 'Learn Italian',
    //         description: 'Reach conversational level in Italian',
    //         category: 'Skills',
    //         completed: false,
    //         isPublic: false,
    //         ownerId: 'test-user',
    //         createdBy: 'test-user',
    //     },
    //     {
    //         id: '3',
    //         title: 'Go Skydiving',
    //         description: 'Try skydiving at least once',
    //         category: 'Adventure',
    //         completed: true,
    //         isPublic: true,
    //         ownerId: 'test-user',
    //         createdBy: 'test-user',
    //     },
    // ];

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await BucketListService.getItems();
                console.log('Firebase items:', data);
                setItems(data);

            } catch (error) {
                console.error('Error loading items:', error);
                console.error('Full error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadItems();
    }, []);

    const handleAddItem = async (formData: {
        title: string;
        description: string;
        category: string;
    }) => {
        try {
            const currentUser = AuthService.getCurrentUser();

            if (!currentUser) {
                return;
            }

            const newItem = await BucketListService.addItem({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                completed: false,
                isPublic: false,
                ownerId: '',
                createdBy: '',
            });

            setItems((prevItems) => [...prevItems, newItem]);

        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    useIonViewWillEnter(() => {
        console.log('My List - will enter');
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonMenuButton slot="start" />
          <IonTitle>My Bucket List</IonTitle>
        </IonToolbar>
      </IonHeader>

        <IonContent className="my-list-content ion-padding">
            <h1>My Bucket List</h1>
            <IonButton
                onClick={() => setIsModalOpen(true)}
                style={{
                    margin: '16px auto',
                    display: 'block',
                    width: 'fit-content',
                    minWidth: '160px',
                    '--border-radius': '20px',
                    '--padding-start': '32px',
                    '--padding-end': '32px',
                }}
            >
                + Add Item
            </IonButton>

            {isLoading ? (
                <p>Loading...</p>
            ) : items.length === 0 ? (
                <p>You don't have any bucket list items yet. Tap "+ Add Item" to create one.</p>
            ) : (
            <div className="my-list">
                {items.map((item) => (
                    <BucketItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
            )}
        </IonContent>
        <BucketItemModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddItem}
        />
    </IonPage>
  );
};

export default MyListPage;
