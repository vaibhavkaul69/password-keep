import { dispatcherTypes } from "../../common/constants";

export const initialState = {
    isAuthModalOpen: false,
    isUserAuthenticated: false,
    userAuthenticationPassword: null
};

const mainReducer = (state = initialState, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case dispatcherTypes.openAuthModal:
            return {
                ...state,
                isAuthModalOpen: payload,
            };
        case dispatcherTypes.closeAuthModal:
            return {
                ...state,
                isAuthModalOpen: payload,
            };
        case dispatcherTypes.isUserAuthenticated:
            return {
                ...state,
                isUserAuthenticated: payload,
            };
        case dispatcherTypes.authenticationPassword:
            return {
                ...state,
                userAuthenticationPassword: payload,
            };
        default:
            return state;
    }
};

export default mainReducer;