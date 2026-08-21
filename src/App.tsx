import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonMenu,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonList,
  IonItem,
  IonMenuToggle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import MyListPage from './pages/MyListPage';
import InspireMePage from './pages/InspireMePage';
import ExplorePage from './pages/ExplorePage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>BucketList</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonList>

              <IonMenuToggle>
                <IonItem routerLink="/my-list">
                  My Bucket List
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem routerLink="/inspire-me">
                  Inspire Me
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem routerLink="/explore">
                  Explore
                </IonItem>
              </IonMenuToggle>

            </IonList>
          </IonContent>
        </IonMenu>

      <IonTabs>
        <IonRouterOutlet id="main-content">
          <Route exact path="/my-list">
            <MyListPage />
          </Route>
          <Route exact path="/inspire-me">
            <InspireMePage />
          </Route>
          <Route path="/explore">
            <ExplorePage />
          </Route>
          <Route exact path="/">
            <Redirect to="/my-list" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="my-list" href="/my-list">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>My List</IonLabel>
          </IonTabButton>
          <IonTabButton tab="inspire-me" href="/inspire-me">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Inspire Me</IonLabel>
          </IonTabButton>
          <IonTabButton tab="explore" href="/explore">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Explore</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
