import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { BucketItem as BucketItemModel } from '../models/BucketItem';
import './BucketItem.css';

interface BucketItemProps {
    item: BucketItemModel;
    source?: 'my-list' | 'explore';
}

const BucketItem: React.FC<BucketItemProps> = ({ item, source = 'my-list', }) => {
    const history = useHistory();

    const openDetails = () => {

        if (source === 'explore') {
            history.push(`/explore/item/${item.id}`);
        } else {
            history.push(`/my-list/item/${item.id}`);
        }
    };

    return (
        <IonCard button className="bucket-card" onClick={openDetails}>
            <IonCardHeader>
                <IonCardTitle>{item.title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <p>{item.description}</p>
                <p>Category: {item.category}</p>
                <p>
                    Status: {item.completed ? 'Completed' : 'Not completed'}
                </p>
            </IonCardContent>
        </IonCard>
    );
};

export default BucketItem;