import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { useState } from 'react';

interface BucketItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BucketItemModal: React.FC<BucketItemModalProps> = ({
                                                             isOpen,
                                                             onClose,
                                                         }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);

        if (!title.trim() || !description.trim() || !category) {
            return;
        }

        console.log('Form submitted:', {
            title,
            description,
            category,
        });

        onClose();
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Bucket Item</IonTitle>

                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                            Close
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                {/* TITLE */}
                <IonItem>
                    <IonInput
                        label="Title"
                        labelPlacement="stacked"
                        placeholder="e.g. Visit Japan"
                        value={title}
                        onIonInput={(e) => setTitle(e.detail.value ?? '')}
                    />
                </IonItem>

                {submitted && !title.trim() && (
                    <IonLabel color="danger">
                        Title is required.
                    </IonLabel>
                )}

                {/* DESCRIPTION */}
                <IonItem>
                    <IonTextarea
                        label="Description"
                        labelPlacement="stacked"
                        placeholder="Describe your goal..."
                        value={description}
                        onIonInput={(e) => setDescription(e.detail.value ?? '')}
                    />
                </IonItem>

                {submitted && !description.trim() && (
                    <IonLabel color="danger">
                        Description is required.
                    </IonLabel>
                )}

                {/* CATEGORY */}
                <IonItem>
                    <IonSelect
                        label="Category"
                        labelPlacement="stacked"
                        placeholder="Select category"
                        value={category}
                        onIonChange={(e) => setCategory(e.detail.value)}
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

                {submitted && !category && (
                    <IonLabel color="danger">
                        Category is required.
                    </IonLabel>
                )}

                <IonButton
                    expand="block"
                    className="ion-margin-top"
                    onClick={handleSubmit}
                >
                    Add Item
                </IonButton>

            </IonContent>
        </IonModal>
    );
};

export default BucketItemModal;