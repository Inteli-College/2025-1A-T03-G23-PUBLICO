export interface Experience {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    price: number | 'Gratuito';
    rating: number;
    reviews: number;
    category: 'Ciências' | 'História' | 'Matemática' | 'Artes' | 'Geografia';
  }
  
  export interface CustomExperienceRequest {
    title: string;
    subject: string;
    schoolLevel: string;
    description: string;
    attachments?: File[];
  }
  