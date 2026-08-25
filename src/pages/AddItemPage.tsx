import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

const AddItemPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Bucket Item</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonItem>
                    <IonInput
                        label="Title"
                        labelPlacement="stacked"
                        placeholder="e.g. Visit Japan"
                    />
                </IonItem>

                <IonItem>
                    <IonTextarea
                        label="Description"
                        labelPlacement="stacked"
                        placeholder="Describe your goal..."
                    />
                </IonItem>

                <IonItem>
                    <IonSelect
                        label="Category"
                        labelPlacement="stacked"
                        placeholder="Select category"
                    >
                        <IonSelectOption value="Travel">
                            Travel
                        </IonSelectOption>

                        <IonSelectOption value="Adventure">
                            Adventure
                        </IonSelectOption>

                        <IonSelectOption value="Skills">
                            Skills
                        </IonSelectOption>

                        <IonSelectOption value="Personal">
                            Personal
                        </IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonButton expand="block">
                    Add to Bucket List
                </IonButton>

            </IonContent>
        </IonPage>
    );
};

export default AddItemPage;