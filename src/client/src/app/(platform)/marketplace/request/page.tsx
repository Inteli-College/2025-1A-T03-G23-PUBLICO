"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ArrowLeft, Upload, Lightbulb } from 'lucide-react';

export interface CustomExperienceRequest {
  title: string;
  subject: string;
  description: string;
  attachments?: FileList;
}

const requestCustomExperience = async (data: CustomExperienceRequest): Promise<{ message: string }> => {
    console.log("A enviar solicitação de experiência personalizada:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));

    return { message: "Sua solicitação foi enviada com sucesso! Criadores interessados entrarão em contato." };
};


const HowItWorksStep = ({ number, title, description }: { number: number, title: string, description: string }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center mr-4">{number}</div>
        <div>
            <h4 className="font-bold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);

export default function RequestExperiencePage() {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomExperienceRequest>();
    const [isLoading, setIsLoading] = useState(false);
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const onSubmit: SubmitHandler<CustomExperienceRequest> = async (data) => {
        setIsLoading(true);
        setFormMessage(null);
        try {
            const response = await requestCustomExperience(data);
            setFormMessage({ type: 'success', text: response.message });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
            setFormMessage({ type: 'error', text: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <a href="/marketplace" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeft size={18} />
                Voltar para o Marketplace
            </a>

            <h1 className="text-3xl font-bold text-gray-800">Solicite uma Experiência Sob Medida</h1>
            <p className="text-gray-600 mt-1">Preencha o formulário abaixo com os detalhes e criadores da nossa comunidade poderão entrar em contato.</p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Coluna do Formulário */}
                <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Informações Básicas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título da Experiência Desejada</label>
                                <input id="title" type="text" placeholder="Ex: Exploração do Sistema Cardiovascular" {...register("title", { required: "O título é obrigatório" })} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Matéria / Disciplina</label>
                                <select id="subject" {...register("subject", { required: "Selecione uma matéria" })} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Selecione uma matéria</option>
                                    <option>Ciências</option>
                                    <option>História</option>
                                    <option>Matemática</option>
                                </select>
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Descrição Detalhada</h2>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descreva sua visão</label>
                            <textarea id="description" rows={6} placeholder="Descreva os principais conceitos a serem abordados, interações desejadas, e os objetivos de aprendizagem..." {...register("description", { required: "A descrição é obrigatória" })} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>
                    </div>

                    <div>
                         <h2 className="text-xl font-bold text-gray-800 mb-4">Referências e Anexos</h2>
                         <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                               <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                               <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                     <span>Carregue um arquivo</span>
                                     <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                  </label>
                                  <p className="pl-1">ou arraste e solte</p>
                               </div>
                               <p className="text-xs leading-5 text-gray-600">PNG, JPG, PDF até 10MB</p>
                            </div>
                         </div>
                    </div>

                    {formMessage && (
                        <div className={`p-4 rounded-md text-sm ${formMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {formMessage.text}
                        </div>
                    )}

                    <div className="text-right">
                        <button type="submit" disabled={isLoading} className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed">
                            {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
                        </button>
                    </div>
                </form>

                {/* Coluna "Como Funciona" */}
                <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Como Funciona?</h3>
                    <div className="space-y-6">
                        <HowItWorksStep number={1} title="Envio" description="Você preenche e envia sua ideia com todos os detalhes." />
                        <HowItWorksStep number={2} title="Análise" description="Criadores da nossa comunidade analisam a proposta." />
                        <HowItWorksStep number={3} title="Proposta" description="Interessados enviam um orçamento e cronograma detalhados." />
                        <HowItWorksStep number={4} title="Criação" description="Uma vez aprovado, inicia-se o desenvolvimento da sua experiência!" />
                    </div>
                     <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
                        <div className="flex">
                           <div className="flex-shrink-0"><Lightbulb className="h-5 w-5 text-indigo-400" aria-hidden="true" /></div>
                           <div className="ml-3"><p className="text-sm text-indigo-700">Dica: Quanto mais detalhes você fornecer, melhores serão as propostas que receberá.</p></div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
}

