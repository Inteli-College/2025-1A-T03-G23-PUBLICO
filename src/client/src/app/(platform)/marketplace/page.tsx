"use client";

import React, { useState, useEffect } from 'react';
import { Search, Star } from 'lucide-react';

export interface Experience {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  price: number | 'Gratuito';
  rating: number;
  reviews: number;
}

const getFeaturedExperiences = async (): Promise<Experience[]> => {
    console.log("A obter dados de experiências simuladas...");
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        {
            id: '1',
            title: 'Roma Antiga Imersiva',
            author: 'Studio Histórico',
            imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop',
            price: 29.90,
            rating: 4.9,
            reviews: 234,
        },
        {
            id: '2',
            title: 'Anatomia do Coração',
            author: 'BioEducar',
            imageUrl: 'https://s5.static.brasilescola.uol.com.br/img/2019/08/caminho-do-sangue-no-coracao.jpg',
            price: 'Gratuito',
            rating: 4.7,
            reviews: 189,
        },
        {
            id: '3',
            title: 'Viagem pelo Sistema Solar',
            author: 'AstroEdu',
            imageUrl: 'https://s1.static.brasilescola.uol.com.br/be/2022/09/2-sistema-solar.jpg',
            price: 19.90,
            rating: 4.8,
            reviews: 156,
        },
    ];
};


const categories = ["Ciências", "História", "Matemática", "Artes", "Geografia"];

const ExperienceCard = ({ experience }: { experience: Experience }) => {
    const isFree = experience.price === 'Gratuito';
    const priceDisplay = isFree ? 'GRATUITO' : `R$ ${typeof experience.price === 'number' ? experience.price.toFixed(2).replace('.', ',') : '0,00'}`;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
            <div className="relative">
                <img
                    src={experience.imageUrl}
                    alt={`Imagem da experiência ${experience.title}`}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover"
                />
                <div
                    className={`absolute top-3 right-3 px-3 py-1 text-sm font-bold text-white rounded-full ${
                        isFree ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {priceDisplay}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 truncate">{experience.title}</h3>
                <p className="text-sm text-gray-600 mb-2">por {experience.author}</p>
                <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span>{experience.rating} ({experience.reviews})</span>
                </div>
                <button
                    className={`w-full mt-4 py-2 rounded-lg font-semibold text-white transition-colors ${
                        isFree ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isFree ? 'Obter Grátis' : 'Comprar Agora'}
                </button>
            </div>
        </div>
    );
};

export default function MarketplacePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const data = await getFeaturedExperiences();
                setExperiences(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    return (
        <div className="space-y-8">
            {/* Seção de Cabeçalho e Ações */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Explore a Loja de Experiências</h1>
                    <p className="text-gray-600 mt-1">Descubra experiências VR criadas por educadores de todo o mundo.</p>
                </div>
                <a href="/marketplace/request" className="bg-indigo-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap">
                    Solicitar Experiência
                </a>
            </div>

            {/* Barra de Pesquisa e Filtros */}
            <div className="flex items-center gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Pesquise por tópicos, matérias ou criadores..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    {categories.map(category => (
                        <button key={category} className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Grid de Experiências */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Experiências em Destaque</h2>
                {loading ? (
                    <p>A carregar experiências...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {experiences.map(exp => <ExperienceCard key={exp.id} experience={exp} />)}
                    </div>
                )}
            </div>
        </div>
    );
}

