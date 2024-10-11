import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react';
import { useAuth } from "@/hooks";
import store from "@/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as dotenv from "dotenv";
import { WebSocketProvider } from "@/context/WebSocketContext";
dotenv.config();

interface AuthProviderWrapperProps {
  children: React.ReactNode;
}

const AuthProviderWrapper: React.FC<AuthProviderWrapperProps> = ({ children }) => {
  useAuth();
  return <>{children}</>;
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <Provider store={store}>
        <AuthProviderWrapper>
          <WebSocketProvider>
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </WebSocketProvider>
          <ToastContainer theme="colored" />
        </AuthProviderWrapper>
      </Provider>
  );
};

export default App;
