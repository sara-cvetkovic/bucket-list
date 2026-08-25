import { Redirect, Route, RouteProps } from 'react-router-dom';
import AuthService from '../services/AuthService';

export default function PrivateRoute({ children, ...rest }: RouteProps) {
    return (
        <Route
            {...rest}
            render={() =>
                AuthService.isLoggedIn() ? (children as React.ReactElement)  : <Redirect to='/login'/>
            }
        />
    );
}