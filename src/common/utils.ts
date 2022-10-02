import Crypto from 'crypto-js';
import { jsPDF } from "jspdf";
import { IPasswordDetailsPayload } from '../types';
import { keyToEncyptDecrypt, passwordDetailsStorageKeyName, pdfFileName, storageErrorMessage } from './constants';

const jsPDFInstance = new jsPDF();

export const getPasswordDetailsFromLocalStorage = (shouldDecryptPassword: boolean = true): Array<IPasswordDetailsPayload> | null => {
    let payloadToReturn = [];

    if (window.localStorage) {
        const getItemFromStorage = JSON.parse(localStorage.getItem(passwordDetailsStorageKeyName) as string);
        if (getItemFromStorage && getItemFromStorage.length > 0) {
            payloadToReturn = getItemFromStorage.map((item: IPasswordDetailsPayload) => {
                return {
                    accountType: item.accountType,
                    userName: item.userName,
                    password: shouldDecryptPassword ? decryptPasswordString(item.password) : item.password,
                    id: item.id
                }
            })
        }

        return payloadToReturn;
    } else {
        alert(storageErrorMessage);
        return null;
    }



}

export const setPasswordDetailsToLocalStorage = (payload: IPasswordDetailsPayload) => {
    const detailsFromStorage = getPasswordDetailsFromLocalStorage(false);

    if (payload && detailsFromStorage) {
        const encyptedPasswordPayload = { ...payload };
        encyptedPasswordPayload.password = encryptPasswordString(encyptedPasswordPayload.password);
        const dataToSet = [...detailsFromStorage, encyptedPasswordPayload];
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


/**
A function that returns a universally unique identifier (uuid).  
example: 1b83fd69-abe7-468c-bea1-306a8aa1c81d
`return <string>` : 32 character uuid (see example)
**/
export const generateUniqueUUID = () => {
    const hashTable = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
    ];
    let uuid = [];
    for (let i = 0; i < 35; i++) {
        if (i === 7 || i === 12 || i === 17 || i === 22) {
            uuid[i] = '-';
        } else {
            uuid[i] = hashTable[Math.floor(Math.random() * hashTable.length - 1)];
        }
    }
    return uuid.join('');
};

export const downloadPasswordsAsPDF = () => {
    const detailsFromStorage = getPasswordDetailsFromLocalStorage(true);
    const valuesToStartFrom = 10;
    const adderValueForPasswordAlongYAxis = 15;
    const adderValueForUsernameAlongYAxis = 5;
    const adderValueForLineSeperatorAlongYAxis = 20;
    const lengthOfLineSeperator = jsPDFInstance.internal.pageSize.getWidth() - 10;
    const multiplyFactorForPassWordAndUserNameValueAlongXAxis = 3;

    if (detailsFromStorage && detailsFromStorage.length > 0) {
        let j = 0;
        for (let i = 0; i < detailsFromStorage.length; i++) {
            const yDistance = 20 + i * 40;
            const xDistance = 10;
            const xDistanceForPasswordDetails = 20;
            let yDistanceForPasswordDetails = yDistance + 5;

            jsPDFInstance.setFontSize(20);
            jsPDFInstance.setFont('Roboto', 'normal', 'bold');
            jsPDFInstance.text(detailsFromStorage[i].accountType, xDistance, yDistance);

            while (j < 1) {
                jsPDFInstance.setFontSize(15);
                jsPDFInstance.setFont('Roboto', 'normal', 400);

                jsPDFInstance.text('Username - ', xDistanceForPasswordDetails, yDistanceForPasswordDetails + adderValueForUsernameAlongYAxis);
                jsPDFInstance.text(detailsFromStorage[i].userName, xDistanceForPasswordDetails + valuesToStartFrom * multiplyFactorForPassWordAndUserNameValueAlongXAxis, yDistanceForPasswordDetails + adderValueForUsernameAlongYAxis);

                jsPDFInstance.text('Password - ', xDistanceForPasswordDetails, yDistanceForPasswordDetails + adderValueForPasswordAlongYAxis);
                jsPDFInstance.text(detailsFromStorage[i].password, xDistanceForPasswordDetails + valuesToStartFrom * multiplyFactorForPassWordAndUserNameValueAlongXAxis, yDistanceForPasswordDetails + adderValueForPasswordAlongYAxis);
                j++;
            }

            jsPDFInstance.line(xDistance, yDistanceForPasswordDetails + adderValueForLineSeperatorAlongYAxis, lengthOfLineSeperator, yDistanceForPasswordDetails + adderValueForLineSeperatorAlongYAxis);
            j = 0;
        }
    }

    jsPDFInstance.save(pdfFileName);
}