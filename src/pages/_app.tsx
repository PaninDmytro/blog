import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import '../styles/globals.css';
import { Navbar } from "../components/layout/navbar/Navbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
