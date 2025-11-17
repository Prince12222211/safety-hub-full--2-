import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReportForm from "./pages/ReportForm";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/submit-report"
        element={
          <ProtectedRoute>
            <ReportForm />
          </ProtectedRoute>
        }
      />

      <Route path="/alerts" element={<Alerts />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
