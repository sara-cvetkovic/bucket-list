import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const MyListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Bucket List</IonTitle>
        </IonToolbar>
      </IonHeader>

        <IonContent className="ion-padding">
            <h1>My Bucket List</h1>
            <p>Your bucket list will appear here.</p>
        </IonContent>
    </IonPage>
  );
};

export default MyListPage;
