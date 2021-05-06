import React from 'react'
import { store } from "../actions/store"
import { Provider } from "react-redux";
import DCars from '../components/DCars';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";

export default function Home() {
    return (
            <Provider store={store}>
          <ToastProvider autoDismiss={true}>
            <Container maxWidth="lg">
              <DCars />
            </Container>
          </ToastProvider>
        </Provider>
    )
}
