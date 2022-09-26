import React, { useRef, useState } from 'react';
import '../../App.css';
import { AccountTypes, AccountTypesArray } from '../../common/constants';
import { IPasswordDetailsInput } from '../../types';
import ToggleEyeSwitch from '../ToggleButton';

const PasswordDetailsInput: React.FC<IPasswordDetailsInput> = ({ setPasswordDetails }) => {
    const accountTypeRef = useRef<HTMLSelectElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword, togglePassword] = useState<boolean>(false);

    const submitData = () => {
        if (accountTypeRef.current &&
            accountTypeRef.current.value &&
            usernameRef.current &&
            usernameRef.current.value &&
            passwordRef.current &&
            passwordRef.current.value
        ) {
            const payload = {
                accountType: accountTypeRef.current.value as AccountTypes,
                userName: usernameRef.current.value,
                password: passwordRef.current.value
            }

            setPasswordDetails && setPasswordDetails(payload);
        }

    }

    return (
        <div className="password-details-input-container">
            <label className="password-details-input-label" htmlFor="account_type">Account Type: </label>
            <select ref={accountTypeRef} className="password-details-input">
                {AccountTypesArray.map((type) => {
                    return <option key={type} value={type} defaultValue={type}>{type}</option>
                })}
            </select>
            <label className="password-details-input-label" htmlFor="username">Username: </label>
            <input ref={usernameRef} className="password-details-input" name="username" type="text" />
            <label className="password-details-input-label" htmlFor="password">Password: </label>
            <div className="password-details-input-and-eye-toggler-container">
                <input ref={passwordRef} className="password-details-input" name="password" type={showPassword ? 'text' : 'password'} />
                <ToggleEyeSwitch showPassword={showPassword} onToggleEyeClick={togglePassword} />
            </div>
            <button onClick={submitData} className="password-details-submit-btn">SUBMIT</button>
        </div>
    )
}

export default PasswordDetailsInput;