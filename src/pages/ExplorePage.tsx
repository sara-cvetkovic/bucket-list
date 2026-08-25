import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButtons,
} from '@ionic/react';
import {useEffect, useState} from "react";
import {BucketItem as BucketItemModel} from "../models/BucketItem";
import BucketListService from "../services/BucketListService";
import BucketItem from "../components/BucketItem"


const ExplorePage: React.FC = () => {

    const [items, setItems] = useState<BucketItemModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPublicItems = async () => {
            try {
                const data = await BucketListService.getPublicItems();
                setItems(data);
            } catch (error) {
                console.error('Error loading public items:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPublicItems();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Explore</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h1>Explore</h1>
                <p>Discover public bucket list ideas.</p>

                {isLoading ? (
                    <p>Loading...</p>
                ) : items.length === 0 ? (
                    <p>No public bucket list items yet.</p>
                ) : (
                    <div className="my-list">
                        {items.map((item) => (
                            <BucketItem
                                key={item.id}
                                item={item}
                                source="explore"
                                showStatus={false}
                            />
                        ))}
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ExplorePage;