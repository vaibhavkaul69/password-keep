import React, { useEffect, useRef, useState } from 'react';
import { IPasswordInputWithEyeProps } from '../../types';
import CloseEyeBlack from '../../assets/close_eye_black.png';
import OpenEyeBlack from '../../assets/open_eye_black.png'
import CloseEyeWhite from '../../assets/close_eye_white.png';
import OpenEyeWhite from '../../assets/open_eye_white.png';

const PasswordInputWithEye: React.FC<IPasswordInputWithEyeProps> = ({ passwordText, className, colorOfEyeIcon, onInputChange }) => {
    const [showPassword, togglePassword] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    const getEyeIcon = () => {
        console.log({ showPassword })
        switch (colorOfEyeIcon) {
            case 'BLACK': {
                return showPassword ? OpenEyeBlack : CloseEyeBlack;
            }
            default: {
                return showPassword ? OpenEyeWhite : CloseEyeWhite;
            }
        }
    }

    return (
        <div className="w-100 h-100 pos-relative">
            <img
                alt="Toggle Password Icon"
                onClick={() => togglePassword(!showPassword)}
                src={getEyeIcon()}
                className="toggle-eye-icon"
            />
            <input ref={inputRef} onChange={(e) => {
                onInputChange && onInputChange(e.target.value);
            }}
                type={showPassword ? 'text' : 'password'}
                className={`toggle-eye-input`}
                value={passwordText}
            />
        </div>
    )
}

PasswordInputWithEye.defaultProps = {
    colorOfEyeIcon: 'BLACK'
}

export default PasswordInputWithEye;