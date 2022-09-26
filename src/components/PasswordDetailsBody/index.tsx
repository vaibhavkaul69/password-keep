import React, { useState } from 'react';
import '../../App.css';
import { IPasswordDetailsBody } from '../../types';
import LockIcon from '../../assets/lock_icon.png';
import ToggleEyeSwitch from '../ToggleButton';

const PasswordDetailsBody: React.FC<IPasswordDetailsBody> = ({ allSavedPasswords }) => {
    const [showPassword, togglePassword] = useState<boolean>(false);

    return <div className="password-details-body-container">
        {allSavedPasswords.map(passwordDetail => {
            return <div key={passwordDetail.password} className="password-details-body-thumbnail">
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
                        <ToggleEyeSwitch showPassword={showPassword} onToggleEyeClick={togglePassword} />
                    </div>
                </div>
            </div>
        })}
    </div>
}

export default PasswordDetailsBody;
