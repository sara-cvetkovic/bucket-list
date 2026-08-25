import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal, IonSelect, IonSelectOption,
    IonTextarea,
    IonTitle, IonToggle,
    IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { BucketItem } from '../models/BucketItem';

interface EditBucketItemModalProps {
    isOpen: boolean;
    item: BucketItem | null;
    onClose: () => void;
    onSave: (item: BucketItem) => void;
}

const EditBucketItemModal: React.FC<EditBucketItemModalProps> = ({
                                                                     isOpen,
                                                                     item,
                                                                     onClose,
                                                                     onSave,
                                                                 }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [completed, setCompleted] = useState(false);
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        if (item) {
            setTitle(item.title);
            setDescription(item.description);
            setCategory(item.category);
            setCompleted(item.completed);
            setIsPublic(item.isPublic);
        }
    }, [item]);

    const handleSave = () => {
        if (!item) {
            return;
        }

        onSave({
            ...item,
            title: title.trim(),
            description: description.trim(),
            category,
            completed,
            isPublic,
        });

        onClose();
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit Item</IonTitle>

                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                            Close
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Title</IonLabel>
                    <IonInput
                        value={title}
                        onIonInput={(e) =>
                            setTitle(e.detail.value ?? '')
                        }
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Description</IonLabel>
                    <IonTextarea
                        value={description}
                        onIonInput={(e) =>
                            setDescription(e.detail.value ?? '')
                        }
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Category</IonLabel>
                    <IonSelect value={category} onIonChange={(e) => setCategory(e.detail.value)} placeholder="Select category">
                        {['Travel', 'Adventure', 'Skills', 'Personal'].map((cat) => (
                            <IonSelectOption key={cat} value={cat}>{cat}</IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel>Completed</IonLabel>
                    <IonToggle checked={completed} onIonChange={(e) => setCompleted(e.detail.checked)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Public</IonLabel>
                    <IonToggle checked={isPublic} onIonChange={(e) => setIsPublic(e.detail.checked)} />
                </IonItem>

                <IonButton
                    expand="block"
                    onClick={handleSave}
                >
                    Save Changes
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default EditBucketItemModal;