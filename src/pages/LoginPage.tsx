import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    IonText,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';

const LoginPage: React.FC = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleLogin = async () => {

        setError('');

        if (!email || !password) {
            setError('Please enter your email and password.');
            return;
        }

        try {

            await AuthService.login(email, password);

            history.push('/my-list');

        } catch (error) {

            console.error('Login error:', error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Login failed.'
            );
        }
    };


    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <h1>Welcome back</h1>

                <p>Login to your BucketList</p>

                <IonItem>
                    <IonLabel position="stacked">
                        Email
                    </IonLabel>

                    <IonInput
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onIonInput={(e) =>
                            setEmail(e.detail.value ?? '')
                        }
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">
                        Password
                    </IonLabel>

                    <IonInput
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onIonInput={(e) =>
                            setPassword(e.detail.value ?? '')
                        }
                    />
                </IonItem>

                {error && (
                    <IonText color="danger">
                        <p>{error}</p>
                    </IonText>
                )}

                <IonButton
                    expand="block"
                    className="ion-margin-top"
                    onClick={handleLogin}
                >
                    Login
                </IonButton>

                <IonButton
                    expand="block"
                    fill="clear"
                    onClick={() => history.push('/register')}
                >
                    Don't have an account? Register
                </IonButton>

            </IonContent>

        </IonPage>
    );
};

export default LoginPage;