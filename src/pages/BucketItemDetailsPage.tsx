import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonAlert,
    IonButton,
    IonMenuButton,
    IonSpinner, IonItem, IonLabel, IonToggle,
} from '@ionic/react';
import { useHistory,useLocation, useParams } from 'react-router-dom';
import { BucketItem } from '../models/BucketItem';
import BucketListService from '../services/BucketListService';
import { useEffect, useState } from 'react';
import EditBucketItemModal from '../components/EditBucketitemModal';


interface RouteParams {
    id: string;
}

const BucketItemDetailsPage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const history = useHistory();

    const location = useLocation();

    const isExplore = location.pathname.startsWith('/explore');

    const [item, setItem] = useState<BucketItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const loadItem = async () => {
            try {
                let data;

                if (isExplore) {
                    data = await BucketListService.getPublicItem(id);
                } else {
                    data = await BucketListService.getItem(id);
                }

                if (data) {
                    setItem(data);
                }
            } catch (error) {
                console.error('Error loading item:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadItem();
    }, [id]);

    const handleDelete = async () => {
        if (!item) {
            return;
        }

        try {
            await BucketListService.deleteItem(item.id);
            history.push('/my-list');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleUpdate = async (updatedItem: BucketItem) => {
        try {
            const updated = await BucketListService.updateItem(updatedItem);
            setItem(updated);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleSave = async () => {
        if (!item) {
            return;
        }

        try {
            await BucketListService.updateItem(item);

            alert('Item updated successfully!');
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    if (isLoading) {
        return (
            <IonPage>
                <IonContent className="ion-padding">
                    <IonSpinner />
                </IonContent>
            </IonPage>
        );
    }

    // const testItem: BucketItemModel = {
    //     id: '1',
    //     title: 'Visit Japan',
    //     description: 'Visit Tokyo and Kyoto',
    //     category: 'Travel',
    //     completed: false,
    //     isPublic: true,
    //     ownerId: 'test-user',
    //     createdBy: 'test-user',
    // };

    if (!item) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start" />
                        <IonTitle>Bucket Item</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h2>Item not found</h2>
                <IonButton onClick={() => history.push('/my-list')}>
                    Back to My List
                </IonButton>
            </IonContent>
        </IonPage>
    );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start" />
                    <IonTitle>{item.title}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h1>{item.title}</h1>

                <p>{item.description}</p>

                <p>
                    <strong>Category:</strong> {item.category}
                </p>

                {!isExplore && (
                    <IonItem>
                    <IonLabel>Completed</IonLabel>
                <IonToggle
                    checked={item.completed}
                    onIonChange={(e) => {
                        setItem({
                            ...item,
                            completed: e.detail.checked
                        });
                    }}
                />
                    </IonItem>
                )}
                {!isExplore && (
                <IonItem>
                    <IonLabel>Public item</IonLabel>

                    <IonToggle
                        checked={item.isPublic}
                        onIonChange={(e) => {
                            setItem({
                                ...item,
                                isPublic: e.detail.checked
                            });
                        }}
                    />
                </IonItem>
                )}

                {!isExplore && (
                <IonButton expand="block" onClick={handleSave}>
                    Save Changes
                </IonButton>
                )}

                {!isExplore && (
                <IonButton
                    expand="block"
                    onClick={() => setIsEditModalOpen(true)}
                >
                    Edit
                </IonButton>
                )}

                {!isExplore && (
                <IonButton
                    expand="block"
                    onClick={() => setShowDeleteAlert(true)}
                >
                    Delete
                </IonButton>
                )}
            <IonAlert
                isOpen={showDeleteAlert}
                header="Delete item?"
                message="Are you sure you want to delete this bucket list item?"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                    {
                        text: 'Delete',
                        role: 'destructive',
                        handler: handleDelete,
                    },
                ]}
                onDidDismiss={() => setShowDeleteAlert(false)}
            />
                <EditBucketItemModal
                    isOpen={isEditModalOpen}
                    item={item}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleUpdate}
                />
            </IonContent>
        </IonPage>
    );
};

export default BucketItemDetailsPage;