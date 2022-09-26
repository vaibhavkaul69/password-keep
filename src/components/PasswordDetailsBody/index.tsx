import React from 'react';
import '../../App.css';
import { baseUrlForIcon, fileExtension } from '../../common/constants';
import { IPasswordDetailsBody } from '../../types';

const PasswordDetailsBody: React.FC<IPasswordDetailsBody> = ({ allSavedPasswords }) => {
    console.log(allSavedPasswords)
    return <div className="password-details-body-container">
        {allSavedPasswords.map(passwordDetail => {
            return <div key={passwordDetail.password} className="password-details-body-thumbnail">
                <div className="">
                    <img src={baseUrlForIcon + passwordDetail.accountType.toLowerCase() + fileExtension} />
                    <p className="">{passwordDetail.accountType}</p>
                </div>
            </div>
        })}
    </div>
}

export default PasswordDetailsBody;

// [
//     'None',
//     'Facebook',
//     'Instagram',
//     'Gmail',
//     'Hotstar',
//     'Linkedin',
//     'Jira',
//     'Neflix',
//     'Twitter',
//     'Snapchat',
//     'Amazon Prime',
//     'Slack',
//     'Notion'
// ].map((item) => {
//     return `import ${item.toLowerCase()} from '../assets/${item.toLowerCase()}.png';`;
// }).join(' ');