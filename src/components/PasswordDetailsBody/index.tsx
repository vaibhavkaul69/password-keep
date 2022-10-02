import React, { useState } from 'react';
import '../../App.css';
import { IPasswordDetailsBody } from '../../types';
import LockIcon from '../../assets/lock_icon.png'
import OpenEyeIcon from '../../assets/open_eye_icon.png';
import CloseEyeIcon from '../../assets/close_eye_icon.png';

const PasswordDetailsBody: React.FC<IPasswordDetailsBody> = ({ allSavedPasswords }) => {
    const [showPassword, togglePassword] = useState<boolean>(false);
    const [currentInputId, setCurrentInputId] = useState<string>('');

    const eyeClick = (showPassword: boolean, inputId: string) => {
        // setCurrentInputId(inputId);
        togglePassword(showPassword);
    }

    return <div className="password-details-body-container">
        {allSavedPasswords.map(passwordDetail => {

            return (
                <div key={passwordDetail.password} className="password-details-body-thumbnail">
                    <header className="password-details-body-thumbnail__header">
                        <img className="password-details-body-thumbnail__icon" src={LockIcon} />
                        <strong className="password-details-body-thumbnail__heading">{passwordDetail.accountType}</strong>
                    </header>
                    <div className="password-details-body-thumbnail__body-content">
                        <label className="password-details-body-thumbnail__body-content-label" htmlFor="username">Username: </label>
                        <input value={passwordDetail.userName} className="password-details-body-thumbnail__body-content-input" name="username" type="text" />
                        <label className="password-details-body-thumbnail__body-content-label" htmlFor="password">Password: </label>
                        <div className="password-details-input-and-eye-toggler-container">
                            <input value={passwordDetail.password} className="password-details-body-thumbnail__body-content-input" name="password" type={showPassword ? 'text' : 'password'} />
                            <img
                                onClick={() => togglePassword(!showPassword)}
                                src={showPassword ? OpenEyeIcon : CloseEyeIcon}
                                className="toggle-eye-icon"
                            />
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
}

export default PasswordDetailsBody;
