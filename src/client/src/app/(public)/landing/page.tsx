'use client';

import React, { useState, useEffect, ImgHTMLAttributes } from 'react';
import axios from 'axios';
import Image, { StaticImageData } from "next/image";

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
};

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    imageUrl: string | StaticImageData;
    imageAlt: string;
    reverse?: boolean;
};

type TestimonialCardProps = {
    quote: string;
    authorName: string;
    authorTitle: string;
    authorAvatarUrl: string;
};

type PersonaCardProps = {
    imageUrl: string;
    imageAlt: string;
    title: string;
    description: string;
    linkText: string;
    href: string;
};

type GitHubStats = {
    stars: number;
    forks: number;
};

import assetsShelf from '../../../../assets/assetsShelf.png'
import assetsCreation from '../../../../assets/assetsCreation.png'
import classManagement from '../../../../assets/classManagement.png'
import xrConnection from '../../../../assets/xrConnection.png'

const Logo = ({ className = 'h-8 w-auto' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="30" y="22" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="bold" fill="currentColor">
            Ludara
        </text>
        <rect x="2" y="5" width="20" height="20" rx="4" fill="#38bdf8" />
        <rect x="6" y="9" width="12" height="12" rx="2" fill="white" />
    </svg>
);


const IconGitHub = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
);

const IconStar = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
);

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
    <a href={href} className="text-sm font-semibold leading-6 text-gray-700 hover:text-gray-900 transition-colors">
        {children}
    </a>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, imageUrl, imageAlt, reverse = false }) => (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-500 mb-4">
                {icon}
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h3>
            <p className="mt-4 text-gray-600">{description}</p>
        </div>
        <div className="md:w-1/2">
            <Image src={imageUrl} alt={imageAlt} className="rounded-xl shadow-lg w-full h-64 object-cover" />
        </div>
    </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, authorName, authorTitle, authorAvatarUrl }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => <IconStar key={i} className="w-5 h-5" />)}
        </div>
        <blockquote className="text-gray-700 italic">"{quote}"</blockquote>
        <figcaption className="mt-4 flex items-center gap-3">
        <img className="h-10 w-10 rounded-full object-cover" src={authorAvatarUrl} alt={authorName} />
        <div>
            <div className="font-semibold text-gray-900">{authorName}</div>
            <div className="text-gray-500 text-sm">{authorTitle}</div>
        </div>
        </figcaption>
    </div>
);

const PersonaCard: React.FC<PersonaCardProps> = ({ imageUrl, imageAlt, title, description, linkText, href }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center flex flex-col items-center">
        <img src={imageUrl} alt={imageAlt} className="h-40 w-auto mx-auto mb-6"/>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <a href={href} className="font-semibold text-sky-500 hover:text-sky-600 transition-colors">
            {linkText} &rarr;
        </a>
    </div>
);

export default function LandingPage() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  
  useEffect(() => {
    const getRepoStats = async (repo: string): Promise<GitHubStats> => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        return {
          stars: response.data.stargazers_count,
          forks: response.data.forks_count,
        };
      } catch (error) {
        console.error('Falha ao buscar estatísticas do repositório:', error);
        return { stars: 234, forks: 56 };
      }
    };

    getRepoStats('facebook/react').then(setGithubStats);
  }, []);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Ludara</span>
              <Logo />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <NavLink href="#">Recursos</NavLink>
            <NavLink href="#">Para Escolas</NavLink>
            <NavLink href="#">Preços</NavLink>
            <NavLink href="#">Para Criadores</NavLink>
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-4">
            <NavLink href="#">Login</NavLink>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-md border border-gray-300 bg-gray-50 transition-colors">
                <IconGitHub />
                <span className="font-mono text-xs">ludara/ludara</span>
                <span className="flex items-center gap-1 text-xs">
                    <IconStar className="w-4 h-4 text-gray-500"/>
                    {githubStats ? githubStats.stars : '...'}
                </span>
            </a>
            <a href="#" className="rounded-md bg-sky-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 transition-colors">
              Cadastre-se Gratuitamente
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Seção Hero */}
        <div className="relative isolate pt-14">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ff89] to-[#38bdf8] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        O Futuro da Educação é <span className="text-sky-500">Imersivo</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                        Capacite estudantes com experiências de aprendizado em VR e AR. Crie conteúdo interativo sem precisar de código. Transforme sua sala de aula com o poder da Ludara.
                        </p>
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                        <a href="#" className="rounded-md bg-sky-500 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 transition-colors">
                            Comece a Criar Gratuitamente
                        </a>
                        </div>
                    </div>
                    <div>
                        <Image src={xrConnection} alt="Ilustração de uma experiência de realidade virtual para educação" className="rounded-2xl shadow-2xl w-full h-auto object-cover" />
                    </div>
                </div>
            </div>
        </div>

        {/* Seção de Ferramentas */}
        <div className="py-24 sm:py-32 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Todas as Ferramentas Que Você Precisa para Inspirar</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        Nossa plataforma oferece tudo que educadores precisam para criar experiências de aprendizado imersivas e memoráveis.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-none space-y-20">
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        title="Editor Intuitivo de Arrastar e Soltar"
                        description="Construa experiências imersivas em VR sem precisar de código. Nosso editor visual permite que você crie cenas, adicione interatividade e publique seu conteúdo com facilidade."
                        imageUrl={assetsCreation}
                        imageAlt="Interface do editor de arrastar e soltar"
                    />
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6A1.125 1.125 0 012.25 11.25v-4.125zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25A1.125 1.125 0 0114.25 18v-9.375zM3.375 18c-.621 0-1.125-.504-1.125-1.125v-5.25c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-5.25z" /></svg>}
                        title="Biblioteca Rica de Recursos"
                        description="Acesse milhares de modelos 3D, ambientes e materiais de alta qualidade. De anatomia a monumentos históricos - tudo que você precisa ao seu alcance."
                        imageUrl={assetsShelf}
                        imageAlt="Coleção de modelos 3D na biblioteca de recursos"
                        reverse={true}
                    />
                     <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.228a4.5 4.5 0 00-1.897 1.897M18 18.72A7.5 7.5 0 1118 3.75v15z" /></svg>}
                        title="Gestão Simplificada de Turmas"
                        description="Distribua experiências para seus alunos e acompanhe o progresso deles. Gerencie suas turmas com ferramentas poderosas e simples, projetadas para educadores."
                        imageUrl={classManagement}
                        imageAlt="Dashboard de gestão de turmas"
                    />
                </div>
            </div>
        </div>

        {/* Nova Seção: Para quem é a Ludara? */}
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Para quem é a Ludara?</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                       Nossa plataforma foi desenhada para capacitar todo o ecossistema educacional a construir o futuro do aprendizado.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                   <PersonaCard
                        imageUrl="https://placehold.co/400x300/f0f9ff/0284c7?text=Escola"
                        imageAlt="Ilustração de uma escola"
                        title="Para Escolas"
                        description="Inove o ensino com experiências imersivas que engajam e transformam o aprendizado em toda a instituição."
                        linkText="Saiba mais"
                        href="#"
                   />
                   <PersonaCard
                        imageUrl="https://placehold.co/400x300/f0f9ff/0284c7?text=Professor"
                        imageAlt="Ilustração de um professor"
                        title="Para Professores"
                        description="Crie aulas inesquecíveis sem precisar de código. Transforme seu plano de aula em uma aventura virtual."
                        linkText="Comece a criar"
                        href="#"
                   />
                   <PersonaCard
                        imageUrl="https://placehold.co/400x300/f0f9ff/0284c7?text=Aluno"
                        imageAlt="Ilustração de um aluno"
                        title="Para Alunos"
                        description="Aprenda de forma interativa e divertida. Explore mundos virtuais e veja o conhecimento ganhar vida."
                        linkText="Explore experiências"
                        href="#"
                   />
                   <PersonaCard
                        imageUrl="https://placehold.co/400x300/f0f9ff/0284c7?text=Criador"
                        imageAlt="Ilustração de um criador de conteúdo"
                        title="Para Criadores"
                        description="Monetize sua criatividade. Desenvolva e venda experiências de RV/RA para educadores de todo o mundo."
                        linkText="Torne-se um criador"
                        href="#"
                   />
                </div>
            </div>
        </div>

        {/* Seção de Depoimentos */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Aprovado por Educadores em Todo o Mundo</h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Veja como professores e instituições estão transformando suas salas de aula.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 lg:grid-cols-3">
              <TestimonialCard 
                quote="A Ludara mudou o jogo. Meus alunos estão mais engajados do que nunca, e a facilidade de criar conteúdo é incrível."
                authorName="Ana Silva"
                authorTitle="Professora de Biologia, Colégio Inovar"
                authorAvatarUrl="https://placehold.co/40x40/facc15/422006?text=AS"
              />
              <TestimonialCard 
                quote="Eu não tenho experiência com programação, mas com a Ludara, criei minha primeira aula em VR em menos de uma hora. Fantástico!"
                authorName="Carlos Santos"
                authorTitle="Professor de História, Escola Aprender"
                authorAvatarUrl="https://placehold.co/40x40/4ade80/052e16?text=CS"
              />
              <TestimonialCard 
                quote="A biblioteca de recursos é vasta e de alta qualidade. Finalmente temos uma solução que é pedagogicamente sólida e tecnologicamente avançada."
                authorName="Maria Oliveira"
                authorTitle="Coordenadora de Tecnologia Educacional"
                authorAvatarUrl="https://placehold.co/40x40/f87171/450a0a?text=MO"
              />
            </div>
          </div>
        </div>

        {/* Seção de CTA Final */}
        <div className="bg-teal-600">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Pronto para Revolucionar sua Sala de Aula?</h2>
            <p className="mt-4 text-lg leading-8 text-teal-100">
              Junte-se a milhares de educadores que já estão criando o futuro do aprendizado com experiências imersivas.
            </p>
            <div className="mt-10">
              <a href="#" className="rounded-md bg-white px-5 py-3 text-base font-semibold text-teal-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors">
                Comece a Criar Gratuitamente
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <Logo className="h-10 text-white"/>
                    <p className="mt-4 text-sm leading-6 text-gray-300">
                        Capacitando educadores a criar o futuro do aprendizado com experiências imersivas que inspiram e engajam os alunos.
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold leading-6 text-white">Produto</h3>
                    <ul role="list" className="mt-6 space-y-4">
                        <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Recursos</a></li>
                        <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Modelos</a></li>
                        <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Marketplace</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold leading-6 text-white">Recursos</h3>
                    <ul role="list" className="mt-6 space-y-4">
                        <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Documentação</a></li>
                        <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Suporte</a></li>
                        <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Blog</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold leading-6 text-white">Empresa</h3>
                    <ul role="list" className="mt-6 space-y-4">
                        <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Sobre</a></li>
                        <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Contato</a></li>
                        <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Privacidade</a></li>
                    </ul>
                </div>
            </div>
          <div className="mt-16 border-t border-white/10 pt-8">
            <p className="text-xs leading-5 text-gray-400">&copy; 2024 Ludara. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
