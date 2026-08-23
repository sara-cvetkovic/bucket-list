import {IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, useIonViewWillEnter} from '@ionic/react';
import BucketItem from '../components/BucketItem';
import { BucketItem as BucketItemModel } from '../models/BucketItem';
import './MyListPage.css';

const MyListPage: React.FC = () => {

    const testItems: BucketItemModel[] = [
        {
            id: '1',
            title: 'Visit Japan',
            description: 'Visit Tokyo and Kyoto',
            category: 'Travel',
            completed: false,
            isPublic: true,
            ownerId: 'test-user',
            createdBy: 'test-user',
        },
        {
            id: '2',
            title: 'Learn Italian',
            description: 'Reach conversational level in Italian',
            category: 'Skills',
            completed: false,
            isPublic: false,
            ownerId: 'test-user',
            createdBy: 'test-user',
        },
        {
            id: '3',
            title: 'Go Skydiving',
            description: 'Try skydiving at least once',
            category: 'Adventure',
            completed: true,
            isPublic: true,
            ownerId: 'test-user',
            createdBy: 'test-user',
        },
    ];

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

        <IonContent className="ion-padding">
            <h1>My Bucket List</h1>
            <IonButton
                expand="block"
                routerLink="/my-list/add"
            >
                + Add Item
            </IonButton>
            <div className="my-list">
                {testItems.map((item) => (
                    <BucketItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </IonContent>
    </IonPage>
  );
};

export default MyListPage;
