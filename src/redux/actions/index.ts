import { dispatcherTypes } from "../../common/constants"

export const action_openUserAuthenticationModal = () => {
    return {
        type: dispatcherTypes.openAuthModal,
        payload: true
    }
}

export const action_closeAuthenticationModal = () => {
    return {
        type: dispatcherTypes.closeAuthModal,
        payload: false
    }
}

export const action_authenticateUser = (payload: boolean) => {
    return {
        type: dispatcherTypes.isUserAuthenticated,
        payload: payload
    }
}

export const action_setAuthenticationPassword = (payload: string) => {
    return {
        type: dispatcherTypes.authenticationPassword,
        payload: payload
    }
}