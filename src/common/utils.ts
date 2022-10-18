import Crypto from 'crypto-js';
import { jsPDF } from "jspdf";
import { IPasswordDetailsPayload } from '../types';
import { keyToEncyptDecrypt, passwordDetailsStorageKeyName, pdfFileName, storageErrorMessage, WhatDetailsToGetType } from './constants';

const jsPDFInstance = new jsPDF();

export const getDetailsFromLocalStorage = (shouldDecryptPassword: boolean = true) => {
    if (window.localStorage) {
        const getItemFromStorage = JSON.parse(localStorage.getItem(passwordDetailsStorageKeyName) as string);
        let userDetails = null;
        let passwordDetails = null;

        if (getItemFromStorage?.userDetails) {
            userDetails = {
                secretPin: decryptPasswordString(getItemFromStorage.userDetails.secretPin)
            }
        } else {
            userDetails = null;
        }

        if (getItemFromStorage?.passwordDetails) {
            passwordDetails = getItemFromStorage.passwordDetails?.map((item: IPasswordDetailsPayload) => {
                return {
                    accountType: item.accountType,
                    userName: item.userName,
                    password: shouldDecryptPassword ? decryptPasswordString(item.password) : item.password,
                    id: item.id
                }
            });
        } else {
            passwordDetails = null;
        }

        const payloadToReturn = {
            userDetails: userDetails,
            passwordDetails: passwordDetails
        }

        return payloadToReturn;
    } else {
        alert(storageErrorMessage);
        return null;
    }
}

export const setDetailsToLocalStorage = ({ newPasswordPayload, userSecretPin = null }: any) => {
    const detailsFromStorage = getDetailsFromLocalStorage(false);
    let userDetails = null;
    let passwordDetails: IPasswordDetailsPayload[] = [];
    let finalPayload: any = {};

    if (detailsFromStorage?.userDetails) {
        userDetails = {
            secretPin: encryptPasswordString(detailsFromStorage.userDetails.secretPin)
        }
    } else {
        userDetails = {
            secretPin: encryptPasswordString(userSecretPin)
        }
    }

    if (newPasswordPayload) {
        const encyptedPasswordPayload = { ...newPasswordPayload };
        encyptedPasswordPayload.password = encryptPasswordString(encyptedPasswordPayload.password);
        passwordDetails = [...detailsFromStorage?.passwordDetails, encyptedPasswordPayload]
    } else {
        passwordDetails = detailsFromStorage?.passwordDetails;
    }

    finalPayload = {
        userDetails: userDetails,
        passwordDetails: passwordDetails
    }

    return localStorage.setItem(passwordDetailsStorageKeyName, JSON.stringify(finalPayload));
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

export const resetPin = () => {
    const detailsFromStorage = getDetailsFromLocalStorage();
    const passwordDetails = detailsFromStorage?.passwordDetails;
    const payload = {
        passwordDetails: passwordDetails,
        userDetails: {
            secretPin: ''
        }
    }

    localStorage.setItem(passwordDetailsStorageKeyName, JSON.stringify(payload));
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
    const detailsFromStorage = getDetailsFromLocalStorage(true);
    const passwordDetails = detailsFromStorage?.passwordDetails;
    const valuesToStartFrom = 10;
    const adderValueForPasswordAlongYAxis = 15;
    const adderValueForUsernameAlongYAxis = 5;
    const adderValueForLineSeperatorAlongYAxis = 20;
    const lengthOfLineSeperator = jsPDFInstance.internal.pageSize.getWidth() - 10;
    const multiplyFactorForPassWordAndUserNameValueAlongXAxis = 3;

    if (passwordDetails && passwordDetails.length > 0) {
        let j = 0;
        for (let i = 0; i < passwordDetails.length; i++) {
            const yDistance = 20 + i * 40;
            const xDistance = 10;
            const xDistanceForPasswordDetails = 20;
            let yDistanceForPasswordDetails = yDistance + 5;

            jsPDFInstance.setFontSize(20);
            jsPDFInstance.setFont('Roboto', 'normal', 'bold');
            jsPDFInstance.text(passwordDetails[i].accountType, xDistance, yDistance);

            while (j < 1) {
                jsPDFInstance.setFontSize(15);
                jsPDFInstance.setFont('Roboto', 'normal', 400);

                jsPDFInstance.text('Username - ', xDistanceForPasswordDetails, yDistanceForPasswordDetails + adderValueForUsernameAlongYAxis);
                jsPDFInstance.text(passwordDetails[i].userName, xDistanceForPasswordDetails + valuesToStartFrom * multiplyFactorForPassWordAndUserNameValueAlongXAxis, yDistanceForPasswordDetails + adderValueForUsernameAlongYAxis);

                jsPDFInstance.text('Password - ', xDistanceForPasswordDetails, yDistanceForPasswordDetails + adderValueForPasswordAlongYAxis);
                jsPDFInstance.text(passwordDetails[i].password, xDistanceForPasswordDetails + valuesToStartFrom * multiplyFactorForPassWordAndUserNameValueAlongXAxis, yDistanceForPasswordDetails + adderValueForPasswordAlongYAxis);
                j++;
            }

            jsPDFInstance.line(xDistance, yDistanceForPasswordDetails + adderValueForLineSeperatorAlongYAxis, lengthOfLineSeperator, yDistanceForPasswordDetails + adderValueForLineSeperatorAlongYAxis);
            j = 0;
        }
    }

    jsPDFInstance.save(pdfFileName);
}