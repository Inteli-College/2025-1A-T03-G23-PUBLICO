"use client";

import React, { useState } from "react";
import axios from 'axios';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    console.log('Enviando credenciais para a API:', credentials);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email === "fail@example.com") {
        throw new Error("Credenciais inválidas simuladas");
    }

    const mockResponse: AuthResponse = {
      token: 'fake-jwt-token-12345',
      user: {
        id: '1',
        name: 'Usuário de Teste',
        email: credentials.email,
      },
    };
    
    return mockResponse;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro de API ao tentar fazer login:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Um erro de rede ocorreu.');
    } else {
      console.error('Erro inesperado ao tentar fazer login:', error);
      throw new Error('Um erro inesperado ocorreu.');
    }
  }
};

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.856 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

const MicrosoftIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 21 21">
        <path fill="#f25022" d="M1 1h9v9H1z"/>
        <path fill="#00a4ef" d="M1 11h9v9H1z"/>
        <path fill="#7fba00" d="M11 1h9v9h-9z"/>
        <path fill="#ffb900" d="M11 11h9v9h-9z"/>
    </svg>
);

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const credentials: LoginCredentials = { email, password };
            const response = await loginUser(credentials);
            console.log("Login bem-sucedido:", response);
            alert("Login bem-sucedido!");
        } catch (err) {
            setError("Falha no login. Verifique suas credenciais.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Entre na sua conta
                </h2>
                <p className="mt-2 text-gray-600">
                    Bem-vindo(a) de volta! Por favor, insira seus dados.
                </p>
            </div>

            <div className="space-y-3">
                <button className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <GoogleIcon />
                    Continuar com Google
                </button>
                <button className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <MicrosoftIcon />
                        Continuar com Microsoft
                </button>
            </div>

            <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 flex-shrink text-sm text-gray-500">ou</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Endereço de E-mail
                    </label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seuemail@exemplo.com" className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"/>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Senha
                    </label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"/>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex items-center justify-end">
                    <div className="text-sm">
                        <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                            Esqueceu a senha?
                        </a>
                    </div>
                </div>

                <button type="submit" disabled={isLoading} className="flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-teal-400">
                    {isLoading ? "Entrando..." : "Entrar"}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
                Não tem uma conta?{' '}
                <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                    Cadastre-se
                </a>
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <main className="grid min-h-screen w-full lg:grid-cols-2">
            <div className="hidden bg-slate-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
                <h1 className="text-2xl font-bold tracking-wide">Ludara</h1>
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">
                        Bem-vindo(a) de Volta.
                    </h2>
                    <p className="max-w-md text-lg text-slate-300">
                        Faça login para continuar sua jornada no aprendizado imersivo.
                    </p>
                </div>
                <footer className="text-sm text-slate-400">
                    © {new Date().getFullYear()} Ludara Inc. Todos os direitos reservados.
                </footer>
            </div>
            <div className="flex items-center justify-center bg-white p-8">
                <LoginForm />
            </div>
        </main>
    );
}