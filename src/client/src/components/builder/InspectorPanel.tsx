import { SceneObject } from "@/lib/types";

interface InspectorPanelProps {
  selectedObject: SceneObject | null;
  sceneObjects: SceneObject[];
  onSelectObject: (id: string) => void;
}

export default function InspectorPanel({ selectedObject, sceneObjects, onSelectObject }: InspectorPanelProps) {
  return (
    <aside className="w-80 bg-base-200 border-l border-base-300 flex flex-col">
      {/* Painel de Hierarquia da Cena */}
      <div className="p-4 border-b border-base-300">
        <h2 className="text-sm font-bold mb-3">Hierarquia da Cena</h2>
        <ul>
          {sceneObjects.map(obj => (
            <li 
              key={obj.id} 
              onClick={() => onSelectObject(obj.id)}
              className={`p-1 px-2 text-sm rounded cursor-pointer ${selectedObject?.id === obj.id ? 'bg-brand-primary/20 text-brand-primary' : 'hover:bg-base-300'}`}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Painel do Inspetor */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-sm font-bold mb-4">Inspetor</h2>
        {selectedObject ? (
          <div className="space-y-6">
            {/* Seção de Transformação */}
            <div>
              <h3 className="text-xs font-bold uppercase text-content-secondary mb-2">Transform</h3>
              {/* Posição */}
              <div className="grid grid-cols-4 gap-2 items-center mb-2">
                <label className="text-sm col-span-1">Posição</label>
                <input type="number" value={selectedObject.transform.position.x} className="w-full p-1 text-sm border rounded col-span-1" />
                <input type="number" value={selectedObject.transform.position.y} className="w-full p-1 text-sm border rounded col-span-1" />
                <input type="number" value={selectedObject.transform.position.z} className="w-full p-1 text-sm border rounded col-span-1" />
              </div>
              {/* Rotação e Escala seguiriam o mesmo padrão */}
            </div>

            {/* Seção de Material */}
            {selectedObject.material && (
              <div>
                <h3 className="text-xs font-bold uppercase text-content-secondary mb-2">Material</h3>
                <div className="flex items-center gap-2">
                  <label className="text-sm">Cor Base</label>
                  <input type="color" value={selectedObject.material.baseColor} className="w-8 h-8 border-none rounded" />
                  <span className="text-sm font-mono">{selectedObject.material.baseColor}</span>
                </div>
              </div>
            )}

            {/* Seção de Interatividade */}
            {selectedObject.interactivity && (
              <div>
                <h3 className="text-xs font-bold uppercase text-content-secondary mb-2">Interatividade</h3>
                <label className="text-sm block mb-1">Ação ao Clicar</label>
                <select className="w-full p-2 text-sm border rounded">
                  <option value="show_text">Mostrar Texto</option>
                  <option value="show_formula">Mostrar Fórmula</option>
                </select>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-content-secondary">Selecione um objeto para ver suas propriedades.</p>
        )}
      </div>
    </aside>
  );
}