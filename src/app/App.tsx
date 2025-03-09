import React from 'react';

import { ThemeProvider } from '@mui/material';

import Game from 'src/pages/Game';

import { theme } from 'src/shared/theme';


export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Game/>
    </ThemeProvider>
  );
};
