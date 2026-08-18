import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { CreateBirthdayPage } from './pages/CreateBirthdayPage';
import { DesignSelectionPage } from './pages/DesignSelectionPage';
import { PublicBirthdayPage } from './pages/PublicBirthdayPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthPage } from './pages/AuthPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/designs" element={<DesignSelectionPage />} />
              <Route path="/designs/:relationshipType" element={<DesignSelectionPage />} />
              <Route path="/birthday/:slug" element={<PublicBirthdayPage />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<AuthPage initialMode="login" />} />
              <Route path="/signup" element={<AuthPage initialMode="signup" />} />
              <Route path="/forgot-password" element={<AuthPage initialMode="forgot" />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* Protected Routes (Authentication Required) */}
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateBirthdayPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute>
                    <CreateBirthdayPage />
                  </ProtectedRoute>
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

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
