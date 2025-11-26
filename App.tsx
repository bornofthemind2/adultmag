import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppStore } from './context/AppContext';
import { AgeGate } from './components/AgeGate';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AdminPage } from './pages/AdminPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProductPage } from './pages/ProductPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { WishlistPage } from './pages/WishlistPage';
import { Toaster } from 'react-hot-toast';

const ProtectedAdminRoute = ({ children }: React.PropsWithChildren) => {
  const { user } = useAppStore();
  if (!user.isAuthenticated || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const Layout = ({ children }: React.PropsWithChildren) => {
  const { ageVerified } = useAppStore();
  
  if (!ageVerified) return <AgeGate />;

  return (
    <div className="flex flex-col min-h-screen bg-dark-900 text-gray-200 font-sans">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const AppContent = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </Router>
    </AppProvider>
  );
}