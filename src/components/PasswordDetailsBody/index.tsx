import React, { useState } from 'react';
import '../../App.css';
import { IPasswordDetailsBody, IPasswordDetailsPayload } from '../../types';
import LockIcon from '../../assets/lock_icon.png'
import PasswordInputWithEye from '../TogglePasswordEyeInput';

const PasswordDetailsBody: React.FC<IPasswordDetailsBody> = ({ allSavedPasswords }) => {
    return <div className="password-details-body-container">
        {allSavedPasswords.map((passwordDetail: IPasswordDetailsPayload) => {
            return (
                <div key={passwordDetail.password} className="password-details-body-thumbnail">
                    <header className="password-details-body-thumbnail__header">
                        <img alt="Lock Icon" className="password-details-body-thumbnail__icon" src={LockIcon} />
                        <strong className="password-details-body-thumbnail__heading">{passwordDetail.accountType}</strong>
                    </header>
                    <div className="password-details-body-thumbnail__body-content">
                        <label className="password-details-body-thumbnail__body-content-label" htmlFor="username">Username: </label>
                        <input value={passwordDetail.userName} className="password-details-body-thumbnail__body-content-input" name="username" type="text" />
                        <label className="password-details-body-thumbnail__body-content-label" htmlFor="password">Password: </label>
                        <PasswordInputWithEye className='password-details-body-thumbnail__body-content-input' passwordText={passwordDetail.password} />
                    </div>
                </div>
            );
        })}
    </div>
}

export default PasswordDetailsBody;
