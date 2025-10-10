import axios from 'axios';
import { ExperiencePayload } from '@/lib/types';

// Configuração base do Axios (já existente)
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

const MOCK_EXPERIENCE_DATA: ExperiencePayload = {
  id: 'mock-id-123',
  name: 'Experiência Carregada (Mock Estático)',
  type: 'VA',
  skyboxUrl: 'https://exemplo.com/ceu_360.jpg',
  sceneObjects: [
    {
      id: 'camera-main',
      name: 'Main Camera',
      type: 'camera',
      transform: {
        position: { x: 0, y: 1.6, z: 5 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    },
    {
      id: 'light-sun',
      name: 'Sun (Directional Light)',
      type: 'light',
      transform: {
        position: { x: 5, y: 10, z: 2 },
        rotation: { x: -45, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    },
    {
      id: 'model-pyramid',
      name: '3D Model: "Pyramid"',
      type: 'model',
      transform: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 30, z: 0 },
        scale: { x: 1.5, y: 1.5, z: 1.5 },
      },
      material: {
        baseColor: '#D4AF37',
      },
      interactivity: {
        onClickAction: 'show_text',
      },
    },
  ],
};

/**
 * BUSCA os dados de uma experiência específica da API.
 * @param id - O ID da experiência a ser carregada.
 * @returns Os dados completos da experiência.
 */
export const getExperience = async (id: string): Promise<ExperiencePayload> => {
  try {
    //const response = await apiClient.get(`/experiences/${id}`);
    //return response.data;
    return MOCK_EXPERIENCE_DATA;
  } catch (error) {
    console.error('Erro ao carregar a experiência:', error);
    // Em um app real, poderíamos retornar um valor padrão ou tratar o erro de forma mais elegante.
    throw error;
  }
};

/**
 * SALVA o estado atual da experiência no backend (já existente).
 * @param payload - O estado completo da experiência a ser salvo.
 */
export const saveExperience = async (payload: ExperiencePayload): Promise<void> => {
  // ... (o código da função de salvar continua o mesmo)
  try {
    //await apiClient.put(`/experiences/${payload.id}`, payload);
    //console.log('Experiência salva com sucesso!', payload);
  } catch (error) {
    console.error('Erro ao salvar a experiência:', error);
    throw error;
  }
};