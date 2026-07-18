import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { RepositoryDetailPage } from './pages/RepositoryDetailPage';
import { AdminPage } from './pages/AdminPage';
import { InsightsPage } from './pages/InsightsPage';
import { AiLabPage } from './pages/AiLabPage';
import { SecurityPage } from './pages/SecurityPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/repositories" element={<RepositoriesPage />} />
      <Route path="/repositories/:id" element={<RepositoryDetailPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/ai-lab" element={<AiLabPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
