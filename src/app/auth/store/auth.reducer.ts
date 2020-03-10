import { User } from '../user.model';
import * as AuthActions from './auth.actions';
import { Login } from './auth.actions';

export interface State {
    user: User;
}

const initialState: State = {
    user: null
};

export function authReducer(
    state = initialState,
    action: AuthActions.AuthActions
) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const a = action as Login;
            const user = new User(
                a.payload.email,
                a.payload.userId,
                a.payload.token,
                a.payload.expirationData
            );
            return {
                ...state,
                user: user
            };
        case AuthActions.LOGOUT:
            return {
                ...state
            };

        default: {
            return state;
        }
    }
}
