// Simples por enquanto, focando na estrutura visual
const TABS = ['Modelos', 'Formas', 'Luzes', 'Mídia'];

const ASSETS = {
  Modelos: [
    { name: 'Pirâmide', icon: 'pyramid.png' },
    { name: 'Coluna Romana', icon: 'column.png' },
    { name: 'DNA Helix', icon: 'dna.png' },
    { name: 'Templo Grego', icon: 'temple.png' },
  ],
  Formas: [
    { name: 'Cubo', icon: 'cube.png' },
    { name: 'Esfera', icon: 'sphere.png' },
    { name: 'Cilindro', icon: 'cylinder.png' },
    { name: 'Cone', icon: 'cone.png' },
  ],
  // ... outros tipos
};

export default function AssetSidebar() {
  const activeTab = 'Modelos'; // Estado seria gerenciado com useState

  return (
    <aside className="w-72 bg-base-200 border-r border-base-300 flex flex-col">
      <div className="p-4 border-b border-base-300">
        <input type="search" placeholder="Buscar assets..." className="w-full px-3 py-2 text-sm border rounded-md" />
      </div>
      <div className="flex border-b border-base-300">
        {TABS.map(tab => (
          <button key={tab} className={`flex-1 p-3 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-content-secondary'}`}>
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {/* Renderização dinâmica dos assets da aba ativa */}
          {ASSETS[activeTab].map(asset => (
            <div key={asset.name} className="flex flex-col items-center p-2 rounded-md hover:bg-base-300 cursor-pointer">
              <div className="w-16 h-16 bg-white border rounded-md flex items-center justify-center mb-2">
                {/* Placeholder para o ícone do asset */}
                <span className="text-4xl">🏛️</span> 
              </div>
              <span className="text-xs text-center">{asset.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}