import { Dispatch, SetStateAction } from "react";
import { AccountTypes } from "./common/constants";

interface IPasswordDetailsPayload {
    accountType: AccountTypes,
    userName: string;
    password: string;
    id: string;
}

interface IAddPasswordDetailsButton {
    openPasswordDetailFillForm: Dispatch<SetStateAction<boolean>>;
    isPasswordDetailFillFormOpen: boolean;
}

interface IPasswordDetailsInput {
    setPasswordDetails: Dispatch<SetStateAction<IPasswordDetailsPayload>> | null;
    openPasswordDetailFillForm: Dispatch<SetStateAction<boolean>>;
}


interface IToggleSwitchInterface {
    showPassword: boolean;
    onToggleEyeClick: Dispatch<SetStateAction<boolean>>;
}

interface IPasswordDetailsBody {
    allSavedPasswords: Array<IPasswordDetailsPayload>;
}