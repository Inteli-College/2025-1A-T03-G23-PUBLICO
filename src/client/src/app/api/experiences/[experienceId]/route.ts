// app/api/experiences/[experienceId]/route.ts

import { NextResponse } from 'next/server';

// DADOS MOCKADOS PARA A API RETORNAR EM UMA CHAMADA GET
// É AQUI QUE VOCÊ COLOCA OS DADOS!
const MOCK_EXPERIENCE_DATA = {
  id: "egypt-123",
  name: 'História do Egito - Carregado da API Mock',
  type: 'VA',
  sceneObjects: [
    { id: 'camera-main', name: 'Main Camera', type: 'camera', transform: { position: { x: 0, y: 1, z: 5 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } } },
    { id: 'light-sun', name: 'Sun (Directional Light)', type: 'light', transform: { position: { x: 1, y: 3, z: 2 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } } },
    { id: 'model-pyramid', name: '3D Model: "Pyramid"', type: 'model', transform: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } }, material: { baseColor: '#D4AF37' }, interactivity: { onClickAction: 'show_text' } },
  ]
};

// Handler para CARREGAR uma experiência (GET)
export async function GET(
  request: Request,
  { params }: { params: { experienceId: string } }
) {
  const id = params.experienceId;
  console.log(`✅ [API Mock] Requisição GET recebida para carregar a experiência: ${id}`);
  
  // Simula a latência da rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Retorna os dados mockados definidos acima
  return NextResponse.json(MOCK_EXPERIENCE_DATA, { status: 200 });
}


// Handler para SALVAR uma experiência (PUT) - o que já tínhamos
export async function PUT(
  request: Request,
  { params }: { params: { experienceId: string } }
) {
  const id = params.experienceId;
  const body = await request.json();
  console.log(`✅ [API Mock] Requisição PUT recebida para SALVAR a experiência: ${id}`);
  console.log('✅ Payload recebido:', body);
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({ message: `Experiência ${id} salva com sucesso (mock).` }, { status: 200 });
}