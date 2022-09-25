import React from 'react';
import '../../App.css';
import { IAddPasswordDetailsButton } from '../../types';
import PlusIcon from '../../assets/add_details_icon.svg';

const AddPasswordDetailsButton: React.FC<IAddPasswordDetailsButton> = ({ openPasswordDetailFillForm, isPasswordDetailFillFormOpen }) => {

    return <button onClick={() => openPasswordDetailFillForm(!isPasswordDetailFillFormOpen)} className="add-password-details-buttons uppercase">
        <img className="add-details-icon" src={PlusIcon} /> Add Password Details
    </button>

}

export default AddPasswordDetailsButton;