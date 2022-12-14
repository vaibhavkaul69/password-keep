export type AccountTypes =
    'FACEBOOK' |
    'INSTAGRAM' |
    'GMAIL' |
    'HOTSTAR' |
    'LINKEDIN' |
    'JIRA' |
    'NETFLIX' |
    'TWITTER' |
    'SNAPCHAT' |
    'AMAZON_PRIME' |
    'SLACK' |
    'NOTION' |
    'NONE'

export const AccountTypesArray = [
    'None',
    'Facebook',
    'Instagram',
    'Gmail',
    'Hotstar',
    'Linkedin',
    'Jira',
    'Neflix',
    'Twitter',
    'Snapchat',
    'Amazon Prime',
    'Slack',
    'Notion'
];

const version = 1

export const passwordDetailsStorageKeyName = `PASSWORD_KEEPER_V${version}`;

export const keyToEncyptDecrypt = 'passwordKeeper';

export const storageErrorMessage = 'Sorry, your browser does not allow permission to use local-storage. Please try with a different browser.!';

export const pdfFileName = 'Password-Keep_Passwords.pdf'

export const dispatcherTypes = {
    openAuthModal: 'OPEN_AUTH_MODAL',
    closeAuthModal: 'CLOSE_AUTH_MODAL',
    isUserAuthenticated: 'USER_AUTHETICATION',
    authenticationPassword: 'AUTHENTICATION_PASSWORD'
}

export type EyeIconColor = 'BLACK' | 'WHITE';

export type WhatDetailsToGetType = 'PASSWORD_DETAILS' | 'USER_LOGIN_DETAILS';