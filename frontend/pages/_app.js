import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // Verificar se a página atual é do painel administrativo
  const isAdminPage = Component.displayName === 'AdminPage' || 
                     (pageProps.router && pageProps.router.pathname && 
                      pageProps.router.pathname.startsWith('/admin'));
  
  return (
    <AuthProvider>
      <CartProvider>
        {isAdminPage ? (
          // Renderizar páginas de admin sem o Layout padrão
          <>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </>
        ) : (
          // Renderizar páginas normais com o Layout padrão
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Layout>
        )}
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;