import React, { useState } from 'react';
import '../../App.css';
import { AccountTypes, AccountTypesArray } from '../../common/constants';
import { IPasswordDetailsInput } from '../../types';
import CloseButtonIcon from '../../assets/close_icon.png';
import { generateUniqueUUID } from '../../common/utils';
import PasswordInputWithEye from '../TogglePasswordEyeInput';

const PasswordDetailsInput: React.FC<IPasswordDetailsInput> = ({ setPasswordDetails, openPasswordDetailFillForm }) => {
    const [accountType, setAccountType] = useState<string | null>(null);
    const [userName, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const submitData = () => {
        if (accountType && userName && password) {
            const payload = {
                accountType: accountType as AccountTypes,
                userName: userName,
                password: password,
                id: generateUniqueUUID()
            }
            setPasswordDetails && setPasswordDetails(payload);
            setAccountType('');
            setPassword('');
            setUsername('');
        }

    }

    return (
        <div className="password-details-input-container">
            <img alt="Close Button" onClick={() => openPasswordDetailFillForm(false)} src={CloseButtonIcon} className="password-details-input-container__close-button" />
            <label className="password-details-input-label" htmlFor="account_type">Account Type: </label>
            <select onChange={(e) => setAccountType(e.target.value)} value={accountType as string} className="password-details-input">
                {AccountTypesArray.map((type) => {
                    return <option key={type} value={type} defaultValue={type}>{type}</option>
                })}
            </select>
            <label className="password-details-input-label" htmlFor="username">Username: </label>
            <input onChange={(e) => setUsername(e.target.value)} value={userName as string} className="password-details-input" name="username" type="text" />
            <label className="password-details-input-label" htmlFor="password">Password: </label>
            <div className="password-details-input-and-eye-toggler-container">
                <PasswordInputWithEye onInputChange={(value) => setPassword(value)} className='password-details-input' passwordText={password as string} />
            </div>
            <button onClick={submitData} className={password ? 'password-details-submit-btn' : 'password-details-submit-btn__disabled'}>SUBMIT</button>
        </div>
    )
}

export default PasswordDetailsInput;