'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SignupForm() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState<{ login?: string; senha?: string }>({});

  const router = useRouter();

  // const validateEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const validateForm = () => {
    const newErrors = {} as { login?: string; senha?: string };

    if (!login) {
      newErrors.login = 'É necessário informar o usuário.';
    }

    if (login.length < 5 || login.length > 20){
        newErrors.login = 'Login precisa ter de 5 a 20 caracteres'
    }

    if (!senha) {
      newErrors.senha = 'É necessário informar a senha.';
    }

    if (senha.length < 5 || senha.length > 30){
        newErrors.senha= 'Login precisa ter de 8 a 30 caracteres'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha }),
      });

      if (response.status !== 201) 
        alert('Credenciais inválidas');

      if(response.status === 201)
        alert('Usuário Criado com sucesso')  
      
      setLogin('')
      setSenha('')
      
    } catch (error) {
      console.error('Login failed:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="login" className="text-sm text-gray-600">USUÁRIO</label>
          <input
            id="login"
            name="login"
            minLength={5}
            maxLength={20}
            placeholder="Digite um login de administrador"
            className="block w-full appearance-none rounded border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black "
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          {errors.login && <p className="text-red-500 text-xs pt-0.5 pl-1 fixed">{errors.login}</p>}
        </div>
        <div>
          <label htmlFor="password" className="text-sm text-gray-600">SENHA</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            maxLength={30}
            placeholder="Digite a senha de administrador"
            className="block w-full appearance-none rounded border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {errors.senha && <p className="text-red-500 text-xs pt-0.5 pl-1 fixed">{errors.senha}</p>}
        </div>
        <div>
          <button type="submit" className="w-full bg-[#7c6ed6cc] text-white px-4 py-2 rounded hover:bg-[#7B6ED6] text-lg mt-1">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
