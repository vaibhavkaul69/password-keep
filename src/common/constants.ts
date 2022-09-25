
import none from '../assets/none.png';
import facebook from '../assets/facebook.png'; import instagram from '../assets/instagram.png'; import gmail from '../assets/gmail.png'; import hotstar from '../assets/hotstar.png'; import linkedin from '../assets/linkedin.png'; import jira from '../assets/jira.png'; import neflix from '../assets/neflix.png'; import twitter from '../assets/twitter.png'; import snapchat from '../assets/snapchat.png'; import amazon_prime from '../assets/amazon prime.png'; import slack from '../assets/slack.png'; import notion from '../assets/notion.png';

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

export const AccountToIconMap = {
    facebook,
    instagram,
    gmail,
    hotstar,
    linkedin,
    jira,
    // netflix,
    twitter,
    snapchat,
    amazon_prime,
    slack,
    notion,
    none
}

const version = 1

export const passwordDetailsStorageKeyName = `PASSWORD_KEEPER_V${version}`;

export const keyToEncyptDecrypt = 'passwordKeeper';