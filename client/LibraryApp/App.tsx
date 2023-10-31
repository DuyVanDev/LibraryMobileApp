import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Read from './components/Read';
// import BottomTabs from './components/BottomTabs';
import Test from './components/Test';
import BottomTabs from './components/BottomTabs';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <BottomTabs />
          
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
