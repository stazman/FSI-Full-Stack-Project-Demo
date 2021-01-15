import { useEffect } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { AppRouter } from './AppRouter'
import { initialState } from './state/initialState';
import { reducer } from './state/reducer';

const store = createStore(reducer, initialState)

export function App() {
  return (
    <Provider store={store}>
        <AppRouter />
    </Provider>
  );
}