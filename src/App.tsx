import React, { useEffect, useState } from 'react';
import './App.css';
import { getPasswordDetailsFromLocalStorage, setPasswordDetailsToLocalStorage } from './common/utils';
import AddPasswordDetailsButton from './components/AddPasswordDetailsButton';
import Header from './components/Header';
import PasswordDetailsBody from './components/PasswordDetailsBody';
import PasswordDetailsInput from './components/PasswordDetailsInput';
import { IPasswordDetailsPayload } from './types';

function App() {
  const [isPasswordDetailFillFormOpen, openPasswordDetailFillForm] = useState<boolean>(false);
  const [passwordDetails, setPasswordDetails] = useState<IPasswordDetailsPayload | null>(null);
  const [allSavedPasswords, setAllSavedPasswords] = useState<Array<IPasswordDetailsPayload>>([]);

  useEffect(() => {
    const details = getPasswordDetailsFromLocalStorage();
    if (details && details.length > 0) {
      setAllSavedPasswords(details);
    }
  }, []);

  useEffect(() => {
    if (passwordDetails) {
      setPasswordDetailsToLocalStorage(passwordDetails);
      const newPasswordDetailsArray = [...allSavedPasswords, passwordDetails];
      setAllSavedPasswords(newPasswordDetailsArray);
    }
  }, [passwordDetails]);



  return (
    <div className="App">
      <div className="app-body">
        <Header />
        <AddPasswordDetailsButton openPasswordDetailFillForm={openPasswordDetailFillForm} isPasswordDetailFillFormOpen={isPasswordDetailFillFormOpen} />
        {isPasswordDetailFillFormOpen && <PasswordDetailsInput openPasswordDetailFillForm={openPasswordDetailFillForm} setPasswordDetails={setPasswordDetails} />}
        {allSavedPasswords && allSavedPasswords.length > 0 && <PasswordDetailsBody allSavedPasswords={allSavedPasswords} />}
      </div>
    </div>
  );
}

export default App;
