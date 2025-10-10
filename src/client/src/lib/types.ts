// Define a estrutura de um objeto na cena
export interface SceneObject {
    id: string;
    name: string;
    type: 'model' | 'shape' | 'text' | 'light' | 'camera';
    transform: {
      position: { x: number; y: number; z: number };
      rotation: { x: number; y: number; z: number };
      scale: { x: number; y: number; z: number };
    };
    material?: {
      baseColor: string;
      // ... outras propriedades de material
    };
    interactivity?: {
      onClickAction: 'show_text' | 'show_formula' | null;
    };
    // Outras propriedades específicas do tipo, como 'text' para um TextLabel
    text?: string;
  }
  
  // O payload que será enviado para a API
  export interface ExperiencePayload {
    id: string;
    name: string;
    type: 'VA' | 'VR';
    sceneObjects: SceneObject[];
    // Poderíamos adicionar aqui a URL da foto 360, por exemplo
    skyboxUrl?: string;
  }

  export interface Experience {
    id: string;
    name: string;
    sceneObjects: any;
    
  }