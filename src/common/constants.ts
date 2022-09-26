
import none from '../assets/none.png';

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

export const baseUrlForIcon = 'https://raw.githubusercontent.com/vaibhavkaul69/password-keep/master/src/assets/account_types_icons/';

export const fileExtension = '.png';