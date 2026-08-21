import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

const InspirePage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inspire Me</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h1>Inspire Me</h1>
                <p>Need inspiration for your bucket list?</p>
            </IonContent>
        </IonPage>
    );
};

export default InspirePage;