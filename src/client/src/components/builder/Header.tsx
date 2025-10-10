import { Plus, Copy, X } from 'lucide-react';

interface HeaderProps {
  experienceName: string;
  saveStatus: 'Salvo' | 'Salvando...' | 'Erro' | 'Carregando...';
}

export default function Header({ experienceName, saveStatus }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-base-100 p-3 border-b border-base-300 shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-base-content">{experienceName}</h1>
        <span className="text-sm text-content-secondary">{saveStatus}</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Ícones de ação no centro */}
        <button className="p-2 rounded hover:bg-base-200"><Plus size={20} /></button>
        <button className="p-2 rounded hover:bg-base-200"><Copy size={20} /></button>
        <button className="p-2 rounded hover:bg-base-200"><X size={20} /></button>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 text-sm font-medium text-brand-primary rounded-md hover:bg-brand-primary/10">
          Visualizar Experiência
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-md hover:bg-blue-600">
          Publicar
        </button>
        {/* Placeholder para o avatar do usuário */}
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </header>
  );
}