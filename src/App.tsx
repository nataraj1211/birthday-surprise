import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { CreateBirthdayPage } from './pages/CreateBirthdayPage';
import { DesignSelectionPage } from './pages/DesignSelectionPage';
import { PublicBirthdayPage } from './pages/PublicBirthdayPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/designs" element={<DesignSelectionPage />} />
            <Route path="/designs/:relationshipType" element={<DesignSelectionPage />} />
            <Route path="/create" element={<CreateBirthdayPage />} />
            <Route path="/edit/:id" element={<CreateBirthdayPage />} />
            <Route path="/birthday/:slug" element={<PublicBirthdayPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
