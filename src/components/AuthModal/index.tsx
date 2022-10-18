import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '../../assets/close_icon.png';
import { action_authenticateUser, action_closeAuthenticationModal, action_setAuthenticationPassword } from '../../redux/actions';
import SecurityGuard from '../../assets/security_guard.jpeg';
import PasswordInputWithEye from '../TogglePasswordEyeInput';
import { resetPin, setDetailsToLocalStorage } from '../../common/utils';

const AuthModal = () => {
    const { isAuthModalOpen, userAuthenticationPassword } = useSelector((initialState: any) => ({
        isAuthModalOpen: initialState.mainState.isAuthModalOpen,
        userAuthenticationPassword: initialState.mainState.userAuthenticationPassword
    }));
    const [secretPin, setSecretPin] = useState<string>('');
    const [confirmSecretPin, setConfirmSecretPin] = useState<string>('');

    const dispatch = useDispatch();

    const setUserSecretPin = () => {
        if (userAuthenticationPassword) {
            if (userAuthenticationPassword === secretPin) {
                dispatch(action_authenticateUser(true));
            } else {
                alert('Wrong Pin.!');
                setSecretPin('');
            }
        } else {
            if (secretPin === confirmSecretPin) {
                setDetailsToLocalStorage({ newPasswordPayload: null, userSecretPin: secretPin });
                dispatch(action_authenticateUser(true));
            } else {
                alert('Pins do not match. Try Again.!')
            }

        }
    }

    const resetAuthPin = () => {
        resetPin();
        dispatch(action_authenticateUser(false));
        dispatch(action_setAuthenticationPassword(''));
    }

    const renderLableWithInput = (labelText: string, uniqueIdentifier: string, stateSetterFunction: any, inputValue: string, subtitleText: string) => {
        return (
            <>
                <label className="auth_modal_body__input_label" htmlFor={uniqueIdentifier}>{labelText}</label>
                <PasswordInputWithEye onInputChange={(value) => stateSetterFunction(value)} colorOfEyeIcon='BLACK' passwordText={inputValue} className='auth_modal_body__input' />
                <p className="subtitle-text">
                    {subtitleText}
                </p>

            </>
        );
    }
    const renderUIForNonAuthenticatedUser = () => {
        return (
            <div className="auth_modal_body__input_container">
                {renderLableWithInput('Create New Secret Pin', 'mainPassword', setSecretPin, secretPin, 'Enter a new 4 digit numeric pin')}
                {renderLableWithInput('Re-Enter Secret Pin', 'reEnterPassword', setConfirmSecretPin, confirmSecretPin, 'Re-Enter the 4 digit numeric pin')}
            </div>
        );
    }

    const renderUIForAuthenticatedUser = () => {
        return (
            <div className="auth_modal_body__input_container">
                {renderLableWithInput('Enter Secret Pin', 'mainPassword', setSecretPin, secretPin, 'Enter your 4 digit numeric pin to access passwords')}
                <p onClick={resetAuthPin} className="auth_modal_body__reset-pin-text">Reset Pin</p>
            </div>
        );
    }

    if (isAuthModalOpen === true) {
        return <div className="auth_modal__container">
            <div className="auth_modal__body">
                {/* <button onClick={() => dispatch(action_closeAuthenticationModal())} className="auth_modal_body__close_icon">
                    <img src={CloseIcon} />
                </button> */}
                <div className="auth_modal_body__left_side">
                    <img src={SecurityGuard}
                    />                </div>
                <div className="auth_modal_body__right_side">
                    {userAuthenticationPassword && userAuthenticationPassword.length > 0 ? renderUIForAuthenticatedUser() : renderUIForNonAuthenticatedUser()}
                    <button onClick={setUserSecretPin} className="auth_modal__submit_btn">Submit</button>
                </div>
            </div>
        </div >
    }

    return null;

}

export default AuthModal;
