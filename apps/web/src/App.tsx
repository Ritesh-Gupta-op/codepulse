import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { RepositoryDetailPage } from './pages/RepositoryDetailPage';
import { AdminPage } from './pages/AdminPage';
import { InsightsPage } from './pages/InsightsPage';
import { AiLabPage } from './pages/AiLabPage';
import { SecurityPage } from './pages/SecurityPage';
import { ConnectGithub } from './pages/ConnectGithub';

export function App() {
  return (
    <Routes>
      {/* Root Path - Sign In Page */}
      <Route path="/" element={<LoginPage />} />
      
      {/* GitHub Connect Step */}
      <Route path="/connect-github" element={<ConnectGithub />} />
      
      {/* App Routes */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/repositories" element={<RepositoriesPage />} />
      <Route path="/repositories/:id" element={<RepositoryDetailPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/ai-lab" element={<AiLabPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/admin" element={<AdminPage />} />
      
      {/* Fallback Catch-All Route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}