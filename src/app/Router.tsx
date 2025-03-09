import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { Typography } from '@mui/material';

import { paths } from 'src/shared/consts';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={paths.index}
        element={<Typography variant="h1">Hello, World!</Typography>}
      />
      <Route
        path={paths.malware}
        element={<Navigate to={paths.index} replace />}
      />
    </>
  )
);
