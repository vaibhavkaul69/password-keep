import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getDetailsFromLocalStorage, setDetailsToLocalStorage } from './common/utils';
import AddPasswordDetailsButton from './components/AddPasswordDetailsButton';
import AuthModal from './components/AuthModal';
import Header from './components/Header';
import PasswordDetailsBody from './components/PasswordDetailsBody';
import PasswordDetailsInput from './components/PasswordDetailsInput';
import PasswordDetailsToPDF from './components/PdfDownloadComponent';
import { action_openUserAuthenticationModal, action_setAuthenticationPassword } from './redux/actions';
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
    const detailsFromStorage = getDetailsFromLocalStorage(true);
    if (detailsFromStorage?.userDetails) {
      dispatch(action_setAuthenticationPassword((detailsFromStorage?.userDetails.secretPin)));
    }
    dispatch(action_openUserAuthenticationModal());
  }, []);

  useEffect(() => {
    if (isUserAuthenticated) {
      const detailsFromStorage = getDetailsFromLocalStorage(true);
      const passwordDetails = detailsFromStorage?.passwordDetails;
      if (passwordDetails && passwordDetails.length > 0) {
        setAllSavedPasswords(passwordDetails);
      }
    } else {
      setAllSavedPasswords([]);
    }
  }, [isUserAuthenticated]);

  useEffect(() => {
    if (passwordDetails) {
      setDetailsToLocalStorage({ newPasswordPayload: passwordDetails, userSecretPin: null });
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
        {isPasswordDetailFillFormOpen ? <PasswordDetailsInput openPasswordDetailFillForm={openPasswordDetailFillForm} setPasswordDetails={setPasswordDetails} /> : <></>}
        {allSavedPasswords && allSavedPasswords.length > 0 ? <PasswordDetailsBody allSavedPasswords={allSavedPasswords} /> : <></>}
        {isUserAuthenticated === false ? <AuthModal /> : <></>}
      </div>
    </div>
  );
}

export default App;
