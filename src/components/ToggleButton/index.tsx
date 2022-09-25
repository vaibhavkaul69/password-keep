import React from 'react';
import { IToggleSwitchInterface } from '../../types';
import OpenEyeIcon from '../../assets/open_eye_icon.png';
import CloseEyeIcon from '../../assets/close_eye_icon.png';

const ToggleEyeSwitch: React.FC<IToggleSwitchInterface> = ({ showPassword, onToggleEyeClick }) => {
    return <img
        onClick={() => onToggleEyeClick(!showPassword)}
        src={showPassword ? OpenEyeIcon : CloseEyeIcon}
        className="toggle-eye-icon"
    />
};

export default ToggleEyeSwitch;
