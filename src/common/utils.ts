import Crypto from 'crypto-js';
import { IPasswordDetailsPayload } from '../types';
import { keyToEncyptDecrypt, passwordDetailsStorageKeyName } from './constants';

export const getPasswordDetailsFromLocalStorage = (): Array<IPasswordDetailsPayload> => {
    let payloadToReturn = [];

    const getItemFromStorage = JSON.parse(localStorage.getItem(passwordDetailsStorageKeyName) as string);
    if (getItemFromStorage && getItemFromStorage.length > 0) {
        payloadToReturn = getItemFromStorage.map((item: IPasswordDetailsPayload) => {
            return {
                accountType: item.accountType,
                userName: item.userName,
                password: decryptPasswordString(item.password)
            }
        })
    }

    return payloadToReturn;
}

export const setPasswordDetailsToLocalStorage = (payload: IPasswordDetailsPayload) => {
    const detailsFromStorage = getPasswordDetailsFromLocalStorage();

    if (payload) {
        const payloadWithEncryptedPassword = { ...payload };
        payloadWithEncryptedPassword.password = encryptPasswordString(payload.password);

        const dataToSet = [...detailsFromStorage, payloadWithEncryptedPassword]

        const stringifiedPayload = JSON.stringify(dataToSet);

        return localStorage.setItem(passwordDetailsStorageKeyName, stringifiedPayload);
    }
}

export const encryptPasswordString = (stringToEncrypt: string) => {
    const encryptedData = Crypto.AES.encrypt(stringToEncrypt, keyToEncyptDecrypt).toString();

    return encryptedData;
}

export const decryptPasswordString = (stringToDecrypt: string) => {
    let bytes = Crypto.AES.decrypt(stringToDecrypt, keyToEncyptDecrypt);
    let decryptedData = bytes.toString(Crypto.enc.Utf8);

    return decryptedData;
}
