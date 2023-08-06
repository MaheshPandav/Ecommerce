import React from "react";
import AppProviders from "./AppProviders";
import PageLayout from "./PageLayout";
import AppRouter from "./rotes";

const App = () => {
  return (
      <AppProviders>
        <PageLayout>
          <AppRouter />
        </PageLayout>
      </AppProviders>

  );
};

export default App;
