import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '../../assets/close_icon.png';
import { action_closeAuthenticationModal } from '../../redux/actions';

const AuthModal = () => {
    const { isAuthModalOpen } = useSelector((initialState: any) => ({
        isAuthModalOpen: initialState.mainState.isAuthModalOpen
    }));

    const dispatch = useDispatch();

    if (isAuthModalOpen === true) {
        return <div className="auth_modal__container">
            <div className="auth_modal__body">
                <button onClick={() => dispatch(action_closeAuthenticationModal())} className="auth_modal_body__close_icon">
                    <img src={CloseIcon} />
                </button>
            </div>
        </div>
    }

    return null;

}

export default AuthModal;
