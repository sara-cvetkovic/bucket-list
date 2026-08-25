import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCheckbox,
    IonItem,
    IonLabel,
    IonButton
} from '@ionic/react';
import { useState } from 'react';
import InspireService from '../services/InspireService';
import { InspireIdea } from '../models/InspireIdea';
import BucketListService from "../services/BucketListService";


const InspirePage: React.FC = () => {

    const [ideas, setIdeas] = useState<InspireIdea[]>([]);
    const [selectedIdeas, setSelectedIdeas] = useState<InspireIdea[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRandomIdeas = async () => {

        setIsLoading(true);

        try {

            const allIdeas = await InspireService.getIdeas();

            const shuffled = [...allIdeas]
                .sort(() => Math.random() - 0.5);

            setIdeas(shuffled.slice(0, 5));
            setSelectedIdeas([]);

        } catch (error) {

            console.error('Error loading inspire ideas:', error);

        } finally {

            setIsLoading(false);
        }
    };

    const addSelectedIdeas = async () => {

        if (selectedIdeas.length === 0) {
            return;
        }

        try {

            for (const idea of selectedIdeas) {

                await BucketListService.addItem({
                    title: idea.title,
                    description: idea.description,
                    category: idea.category,
                    completed: false,
                    isPublic: false,
                    ownerId: '',
                    createdBy: '',
                });
            }

            setSelectedIdeas([]);

            alert(
                `${selectedIdeas.length} ideas added to your bucket list!`
            );

        } catch (error) {

            console.error(
                'Error adding selected ideas:',
                error
            );
        }
    };

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

                <IonButton
                    expand="block"
                    onClick={getRandomIdeas}
                >
                    ✨ Inspire Me
                </IonButton>

                {ideas.map((idea) => (
                    <IonItem key={idea.id}>

                        <IonCheckbox
                            slot="start"
                            checked={selectedIdeas.some(
                                selected => selected.id === idea.id
                            )}
                            onIonChange={(e) => {

                                if (e.detail.checked) {

                                    setSelectedIdeas(prev => [
                                        ...prev,
                                        idea
                                    ]);

                                } else {

                                    setSelectedIdeas(prev =>
                                        prev.filter(
                                            selected =>
                                                selected.id !== idea.id
                                        )
                                    );
                                }
                            }}
                        />

                        <IonLabel>
                            <h2>{idea.title}</h2>
                            <p>{idea.description}</p>
                            <p>{idea.category}</p>
                        </IonLabel>

                    </IonItem>
                ))}

                <IonButton
                    expand="block"
                    disabled={selectedIdeas.length === 0}
                    onClick={addSelectedIdeas}
                >
                    Add Selected
                </IonButton>

            </IonContent>
        </IonPage>
    );
};

export default InspirePage;