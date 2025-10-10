import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const loadUserFromCookies = async () => {
      const token = Cookies.get('auth_token');
      if (token) {
        try {
          // Em produção, aqui faria uma requisição ao backend para validar o token
          // e obter os dados do usuário
          const userData = JSON.parse(Cookies.get('user_data') || '{}');
          setUser(userData);
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
          Cookies.remove('auth_token');
          Cookies.remove('user_data');
        }
      }
      setLoading(false);
    };

    loadUserFromCookies();
  }, []);

  // Função para login
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulação de login - em produção, seria uma chamada à API
      if (email === 'teste@exemplo.com' && password === 'senha123') {
        const userData = {
          id: '1',
          name: 'Usuário Teste',
          email: 'teste@exemplo.com',
          role: 'customer'
        };
        
        // Salvar token e dados do usuário em cookies
        Cookies.set('auth_token', 'token_simulado_123', { expires: 7 });
        Cookies.set('user_data', JSON.stringify(userData), { expires: 7 });
        
        setUser(userData);
        toast.success('Login realizado com sucesso!');
        router.push('/perfil');
        return true;
      } else {
        toast.error('Email ou senha incorretos');
        return false;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro ao fazer login. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função para registro
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      // Simulação de registro - em produção, seria uma chamada à API
      const userData = {
        id: Math.floor(Math.random() * 1000).toString(),
        name,
        email,
        role: 'customer'
      };
      
      // Salvar token e dados do usuário em cookies
      Cookies.set('auth_token', 'token_simulado_' + userData.id, { expires: 7 });
      Cookies.set('user_data', JSON.stringify(userData), { expires: 7 });
      
      setUser(userData);
      toast.success('Cadastro realizado com sucesso!');
      router.push('/perfil');
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      toast.error('Erro ao criar conta. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
    setUser(null);
    router.push('/');
    toast.info('Você saiu da sua conta');
  };

  // Função para atualizar perfil
  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      // Simulação de atualização - em produção, seria uma chamada à API
      const updatedUser = { ...user, ...userData };
      
      // Atualizar dados do usuário em cookies
      Cookies.set('user_data', JSON.stringify(updatedUser), { expires: 7 });
      
      setUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!user, 
      user, 
      loading, 
      login, 
      register, 
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;