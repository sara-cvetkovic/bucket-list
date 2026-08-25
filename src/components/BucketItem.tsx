import {IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { BucketItem as BucketItemModel } from '../models/BucketItem';
import './BucketItem.css';

interface BucketItemProps {
    item: BucketItemModel;
    source?: 'my-list' | 'explore';
    showStatus?: boolean;
}

const BucketItem: React.FC<BucketItemProps> = ({ item, source = 'my-list', showStatus = true }) => {
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
                <IonCardSubtitle>{item.category}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <p>{item.description}</p>
                {showStatus && (
                    <IonBadge color={item.completed ? 'success' : 'medium'} style={{ marginTop: '8px' }}>
                        {item.completed ? 'Completed' : 'Not completed'}
                    </IonBadge>
                )}
            </IonCardContent>
        </IonCard>
    );
};

export default BucketItem;