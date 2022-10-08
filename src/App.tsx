import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getPasswordDetailsFromLocalStorage, setPasswordDetailsToLocalStorage } from './common/utils';
import AddPasswordDetailsButton from './components/AddPasswordDetailsButton';
import AuthModal from './components/AuthModal';
import Header from './components/Header';
import PasswordDetailsBody from './components/PasswordDetailsBody';
import PasswordDetailsInput from './components/PasswordDetailsInput';
import PasswordDetailsToPDF from './components/PdfDownloadComponent';
import { action_openUserAuthenticationModal } from './redux/actions';
import { IPasswordDetailsPayload } from './types';

function App() {
  const [isPasswordDetailFillFormOpen, openPasswordDetailFillForm] = useState<boolean>(false);
  const [passwordDetails, setPasswordDetails] = useState<IPasswordDetailsPayload | null>(null);
  const [allSavedPasswords, setAllSavedPasswords] = useState<Array<IPasswordDetailsPayload>>([]);
  const { isUserAuthenticated } = useSelector((initialState: any) => ({
    isUserAuthenticated: initialState.mainState.isUserAuthenticated
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action_openUserAuthenticationModal());

  }, []);

  useEffect(() => {
    if (isUserAuthenticated) {
      const details = getPasswordDetailsFromLocalStorage();
      if (details && details.length > 0) {
        setAllSavedPasswords(details);
      }
    } else {
      setAllSavedPasswords([]);
    }
  }, [isUserAuthenticated]);

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
        <PasswordDetailsToPDF />
        <AddPasswordDetailsButton openPasswordDetailFillForm={openPasswordDetailFillForm} isPasswordDetailFillFormOpen={isPasswordDetailFillFormOpen} />
        {isPasswordDetailFillFormOpen && <PasswordDetailsInput openPasswordDetailFillForm={openPasswordDetailFillForm} setPasswordDetails={setPasswordDetails} />}
        {allSavedPasswords && allSavedPasswords.length > 0 && <PasswordDetailsBody allSavedPasswords={allSavedPasswords} />}
        <AuthModal />
      </div>
    </div>
  );
}

export default App;
