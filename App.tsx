import ThemeContextProvider from '@context/ThemeContext';
import React from 'react';
import MainApp from './app/MainApp';

const App = () => {
  return (
    <ThemeContextProvider>
      <MainApp />
    </ThemeContextProvider>
  );
};

export default App;
