import {IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';

const MyListPage: React.FC = () => {

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
            <p>Your bucket list will appear here.</p>
        </IonContent>
    </IonPage>
  );
};

export default MyListPage;
