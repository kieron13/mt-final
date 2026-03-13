
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { StoreFront } from './views/StoreFront';
import { AdminDashboard } from './views/AdminDashboard';
import { AdminUserDetail } from './views/AdminUserDetail';
import { UserDashboard } from './views/UserDashboard';
import { ProductDetails } from './views/ProductDetails';
import { CategoryPage } from './views/CategoryPage';
import { ApiFeed } from './views/ApiFeed';
import { Auth } from './views/Auth';
import { StripeCheckout } from './views/StripeCheckout';
import { ManualCheckout } from './views/ManualCheckout';
import { AdminFunctions } from './views/AdminFunctions';
import { useAuthState } from './hooks/useAuth';
import { CartProvider } from './context/CartContext';
import { CartOverlay } from './components/CartOverlay';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { sendBrevoEmail, generateWelcomeEmail } from './services/brevoService';

const App: React.FC = () => {
  const { loading } = useAuthState();

  useEffect(() => {
    const sendTestEmail = async () => {
      if (localStorage.getItem('test_email_sent_webdev_attempt_2')) return;
      try {
        const snap = await getDoc(doc(db, 'settings', 'general'));
        if (snap.exists()) {
          const settings = snap.data();
          if (settings.brevoApiKey) {
            await sendBrevoEmail(
              settings.brevoApiKey,
              { name: settings.name || 'Store', email: settings.brevoSenderEmail },
              [{ email: 'webdev@cbh-cyprus.com', name: 'Web Dev' }],
              `Welcome to ${settings.name || 'Store'}`,
              generateWelcomeEmail('Web Dev', settings.name || 'Store', 'WELCOME-TEST20', settings.welcomeEmailContent)
            );
            localStorage.setItem('test_email_sent_webdev_attempt_2', 'true');
            console.log('Test email sent successfully to webdev@cbh-cyprus.com');
          }
        }
      } catch (err) {
        console.error('Failed to send test email', err);
      }
    };
    sendTestEmail();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-transparent selection:bg-teal-500/30 selection:text-teal-700 relative overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020617]">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-sky-500/10 blur-[120px] animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-500/10 blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-sky-500/10 blur-[120px] animate-blob" style={{ animationDelay: '4s' }}></div>
          </div>
          <Navigation />
          <CartOverlay />
          <main>
            <Routes>
              <Route path="/" element={<StoreFront />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/functions" element={<AdminFunctions />} />
              <Route path="/admin/users/:uid" element={<AdminUserDetail />} />
              <Route path="/profile" element={<UserDashboard />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              {/* Updated route to support optional product name slug at the end */}
              <Route path="/category/:categorySlug/:productId/:productSlug?" element={<ProductDetails />} />
              <Route path="/checkout/stripe" element={<StripeCheckout />} />
              <Route path="/checkout/manual" element={<ManualCheckout />} />
              
              <Route path="/api/v1/products" element={<ApiFeed type="products" />} />
              <Route path="/api/v1/categories" element={<ApiFeed type="categories" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
