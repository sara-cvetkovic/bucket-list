import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonAlert,
    IonButton,
} from '@ionic/react';
//import { useParams } from 'react-router-dom';
import { BucketItem as BucketItemModel } from '../models/BucketItem';
import { useState } from 'react';

const BucketItemDetailsPage: React.FC = () => {
    //const { id } = useParams<{ id: string }>();

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const testItem: BucketItemModel = {
        id: '1',
        title: 'Visit Japan',
        description: 'Visit Tokyo and Kyoto',
        category: 'Travel',
        completed: false,
        isPublic: true,
        ownerId: 'test-user',
        createdBy: 'test-user',
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/my-list" />
                    </IonButtons>

                    <IonTitle>Bucket Item</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h1>{testItem.title}</h1>

                <p>Item ID: {testItem.id}</p>

                <p>
                    {testItem.description}
                </p>

                <p>
                    Category: {testItem.category}
                </p>

                <p>
                    Status: {testItem.completed ? 'Completed' : 'Not completed'}
                </p>

                <p>
                    Public: {testItem.isPublic ? 'Yes' : 'No'}
                </p>
                <IonButton
                    expand="block"
                    color="danger"
                    onClick={() => setShowDeleteAlert(true)}
                >
                    Delete Item
                </IonButton>
            </IonContent>

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
                        handler: () => {
                            console.log('Delete item:', testItem.id);
                        },
                    },
                ]}
                onDidDismiss={() => setShowDeleteAlert(false)}
            />
        </IonPage>
    );
};

export default BucketItemDetailsPage;