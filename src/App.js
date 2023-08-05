import React from "react";
import AppProviders from "./AppProviders";
import PageLayout from "./PageLayout";
import AppRouter from "./rotes";
import '../src/styles/root.scss';
import { Provider } from "react-redux";
import store from "./redux/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <AppProviders>
        <PageLayout>
          <AppRouter />
        </PageLayout>
      </AppProviders>
    </Provider>
  );
};

export default App;
