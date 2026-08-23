import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
//import { useParams } from 'react-router-dom';
import { BucketItem as BucketItemModel } from '../models/BucketItem';

const BucketItemDetailsPage: React.FC = () => {
    //const { id } = useParams<{ id: string }>();

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
            </IonContent>
        </IonPage>
    );
};

export default BucketItemDetailsPage;