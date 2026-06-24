import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import CreateOrganizationPage
from '../pages/onboarding/CreateOrganizationPage';
import MembersPage
from '../pages/dashboard/MembersPage';

import InvitesPage
from '../pages/dashboard/InvitesPage';
import JoinOrganizationPage
from '../pages/onboarding/JoinOrganizationPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

import OnboardingPage from '../pages/onboarding/OnboardingPage';

import DashboardPage from '../pages/dashboard/DashboardPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/onboarding"
          element={
            <OnboardingPage />
          }
        />

        <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
            <DashboardPage />
            </ProtectedRoute>
        }
        />
        <Route
        path="/organizations/create"
        element={
            <CreateOrganizationPage />
        }
        />

        <Route
        path="/organizations/join"
        element={
            <JoinOrganizationPage />
        }
        />

        <Route
        path="/members"
        element={<MembersPage />}
        />

        <Route
        path="/invites"
        element={<InvitesPage />}
        />
        <Route
        path="/join/:token"
        element={
            <JoinOrganizationPage />
        }
        />
      </Routes>
    </BrowserRouter>
  );
}