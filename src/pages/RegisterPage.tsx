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

const RegisterPage: React.FC = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');

    const handleRegister = async () => {

        setError('');

        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setError('Password must contain at least 6 characters.');
            return;
        }

        try {

            await AuthService.register(email, password);

            history.push('/my-list');

        } catch (error) {

            console.error('Registration error:', error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Registration failed.'
            );
        }
    };


    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <h1>BucketList</h1>

                <p>Create your account</p>

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

                <IonItem>
                    <IonLabel position="stacked">
                        Confirm Password
                    </IonLabel>

                    <IonInput
                        type="password"
                        value={confirmPassword}
                        placeholder="Repeat your password"
                        onIonInput={(e) =>
                            setConfirmPassword(e.detail.value ?? '')
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
                    onClick={handleRegister}
                >
                    Register
                </IonButton>

                <IonButton
                    expand="block"
                    fill="clear"
                    onClick={() => history.push('/login')}
                >
                    Already have an account? Login
                </IonButton>

            </IonContent>

        </IonPage>
    );
};

export default RegisterPage;