import {
  createBrowserRouter,
} from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisPage from '../pages/auth/RegisPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisPage />,
  },
]);