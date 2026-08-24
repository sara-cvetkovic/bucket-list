import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonTextarea,
    IonTitle,
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

    useEffect(() => {
        if (item) {
            setTitle(item.title);
            setDescription(item.description);
            setCategory(item.category);
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
                    <IonInput
                        value={category}
                        onIonInput={(e) =>
                            setCategory(e.detail.value ?? '')
                        }
                    />
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