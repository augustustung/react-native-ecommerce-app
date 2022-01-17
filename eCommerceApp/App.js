/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import ECommerceApp from './Navigation';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'
import CustomSpinLoading from './components/CustomSpinnerLoading';

function App() {

  useEffect(() => {
    SplashScreen.hide()
  }, [])


  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ECommerceApp />
          <CustomSpinLoading />
        </PersistGate>
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  )
};

export default App;
