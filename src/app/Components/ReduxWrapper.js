"use client"
import { Provider } from 'react-redux'; // To connect Redux to React
import {store} from '@/app/StateManagment/store'; // Import the Redux store

export default function ReduxWrapper({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}