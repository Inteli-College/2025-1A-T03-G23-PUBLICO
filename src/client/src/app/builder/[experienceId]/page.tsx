"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Grid, TransformControls, Html, useTexture } from '@react-three/drei';
import { Play, Plus, Copy, X, Trash2, Move, Scale, RotateCw, Image as ImageIcon } from 'lucide-react';

// --- TYPES ---
type Vector3 = [number, number, number];

// Adicionado o tipo 'background' para a foto 360
type SceneObjectType = 'shape' | 'model' | 'light' | 'text' | 'background';

interface SceneObject {
  id: string;
  name: string;
  type: SceneObjectType;
  shape?: 'box' | 'sphere' | 'cone' | 'cylinder';
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  color: string;
  interactivity?: {
    action: 'show_text' | 'show_formula';
    content: string;
  };
  // Adicionado para armazenar a URL da imagem 360
  imageUrl?: string; 
}

// --- MOCK DATA ---
const initialSceneObjects: SceneObject[] = [
  {
    id: 'cone-1', name: 'Cone', type: 'shape', shape: 'cone', position: [0, 0.75, 0],
    rotation: [0, 0, 0], scale: [1, 1.5, 1], color: '#ef4444',
    interactivity: { action: 'show_formula', content: 'V = (1/3)πr²h' },
  },
  {
      id: 'main-camera', name: 'Main Camera', type: 'model',
      position: [0,0,0], rotation: [0,0,0], scale: [1,1,1], color: '#ffffff'
  },
  {
      id: 'grid-floor', name: 'Grid Floor', type: 'model',
      position: [0,0,0], rotation: [0,0,0], scale: [1,1,1], color: '#ffffff'
  }
];

// --- SUB-COMPONENTS ---

function Header({ experienceName, saveStatus }: { experienceName: string; saveStatus: string; }) {
  return (
    <header className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-2 border-b border-gray-200 shadow-sm z-20">
      <div className="flex items-center gap-4"><div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">V</div><div><h1 className="text-md font-semibold text-gray-800">{experienceName}</h1><span className="text-xs text-gray-500">{saveStatus}</span></div></div>
      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg"><button className="p-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"><Plus size={18} /></button><button className="p-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"><Copy size={18} /></button><button className="p-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"><X size={18} /></button></div>
      <div className="flex items-center gap-3"><button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"><Play size={16} />Preview</button><button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm">Publish</button><div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden"><img src="https://i.pravatar.cc/36" alt="User Avatar" /></div></div>
    </header>
  );
}

const TABS = ['Shapes', 'Models', 'Lights', 'Media'];
const ASSETS = {
  Shapes: [{ name: 'Cube', icon: 'cube', type: 'shape', shape: 'box' as const }, { name: 'Sphere', icon: 'sphere', type: 'shape', shape: 'sphere' as const }, { name: 'Cylinder', icon: 'cylinder', type: 'shape', shape: 'cylinder' as const }, { name: 'Cone', icon: 'cone', type: 'shape', shape: 'cone' as const }],
  Models: [], Lights: [], Media: [],
};

const AssetIcon = ({ icon }: { icon: string }) => {
    switch(icon) {
        case 'cube': return <div className="w-12 h-12 bg-blue-400 rounded-md"></div>;
        case 'sphere': return <div className="w-12 h-12 bg-orange-400 rounded-full"></div>;
        case 'cylinder': return <div className="w-10 h-12 bg-green-500 rounded-sm" style={{ clipPath: 'ellipse(50% 50% at 50% 50%)'}}></div>;
        case 'cone': return <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[48px] border-b-red-400"></div>;
        default: return <div className="w-12 h-12 bg-gray-300 rounded-md"></div>;
    }
}

function AssetSidebar({ onAddObject }: { onAddObject: (obj: SceneObject) => void }) {
  const [activeTab, setActiveTab] = useState('Shapes');

  const handleAddShape = (asset: typeof ASSETS.Shapes[0]) => {
    const newObject: SceneObject = {
      id: `${asset.shape}-${Date.now()}`, name: asset.name, type: 'shape', shape: asset.shape,
      position: [0, 1, 0], rotation: [0, 0, 0], scale: [1, 1, 1],
      color: '#'+(Math.random()*0xFFFFFF<<0).toString(16).padStart(6, '0'),
    };
    onAddObject(newObject);
  };
  
  // NOVA FUNÇÃO: Adiciona um objeto de fundo 360
  const handleAdd360Photo = () => {
    const imageUrl = prompt(
      "Por favor, insira a URL da imagem 360 (equiretangular):",
      "https://t3.ftcdn.net/jpg/03/22/88/26/360_F_322882600_y6JbONLD7YLdRrU5LFQReuq8YUwasfgg.jpg"
    );
    if (imageUrl) {
      const newObject: SceneObject = {
        id: `background-${Date.now()}`, name: 'Fundo 360', type: 'background',
        position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], color: '#ffffff',
        imageUrl: imageUrl,
      };
      onAddObject(newObject);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-10">
      <div className="p-3 border-b border-gray-200"><input type="search" placeholder="Search assets..." className="w-full px-3 py-1.5 text-sm border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
      <div className="flex border-b border-gray-200">{TABS.map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 p-3 text-sm font-medium transition-all ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}>{tab}</button>))}</div>
      <div className="flex-1 p-3 overflow-y-auto">
        {activeTab === 'Shapes' && <div className="grid grid-cols-2 gap-3">{(ASSETS.Shapes).map(asset => (<div key={asset.name} onClick={() => handleAddShape(asset)} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"><div className="w-20 h-20 flex items-center justify-center mb-2"><AssetIcon icon={asset.icon} /></div><span className="text-xs text-center text-gray-600">{asset.name}</span></div>))}</div>}
        {/* NOVO CONTEÚDO: Aba Mídia */}
        {activeTab === 'Media' && <div className="space-y-2"><button onClick={handleAdd360Photo} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-sm"><ImageIcon size={20} className="text-gray-500" />Adicionar Foto 360</button></div>}
      </div>
    </aside>
  );
}

interface InspectorPanelProps {
    sceneObjects: SceneObject[]; selectedObject: string | null; onSelectObject: (id: string | null) => void;
    onUpdateObject: (id: string, updatedObject: SceneObject) => void; onDeleteObject: (id: string) => void;
}

function InspectorPanel({ sceneObjects, selectedObject, onSelectObject, onUpdateObject, onDeleteObject }: InspectorPanelProps) {
  const selectedObjData = sceneObjects.find(obj => obj.id === selectedObject);
  const handlePropertyChange = (prop: string, value: string | number) => {
      if (!selectedObjData) return;
      const [mainKey, subKey] = prop.split('.');
      let updatedObject = { ...selectedObjData };
      if (subKey && (mainKey === 'position' || mainKey === 'rotation' || mainKey === 'scale')) {
          const newVec = [...updatedObject[mainKey]] as Vector3;
          const axisIndex = { x: 0, y: 1, z: 2 }[subKey as 'x'|'y'|'z'];
          newVec[axisIndex] = parseFloat(value as string);
          updatedObject = {...updatedObject, [mainKey]: newVec };
      } else { (updatedObject as any)[prop] = value; }
      onUpdateObject(updatedObject.id, updatedObject);
  };
  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col z-10">
      <div className="p-4 border-b border-gray-200"><h2 className="text-sm font-bold mb-3 text-gray-800">Scene Hierarchy</h2><ul className="space-y-1">{sceneObjects.map(obj => (<li key={obj.id} onClick={() => onSelectObject(obj.id)} className={`flex items-center justify-between p-1.5 px-2 text-sm rounded-md cursor-pointer ${selectedObject === obj.id ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100 text-gray-600'}`}><span>{obj.name}</span>{selectedObject === obj.id && !['main-camera', 'grid-floor'].includes(obj.id) && (<button onClick={(e) => { e.stopPropagation(); onDeleteObject(obj.id); }} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>)}</li>))}</ul></div>
      <div className="flex-1 p-4 overflow-y-auto"><h2 className="text-sm font-bold mb-4 text-gray-800">Inspector</h2>{selectedObjData ? (<div className="space-y-6">
        {/* NOVO: Mostra painel específico para fundo 360 */}
        {selectedObjData.type === 'background' && (<div><h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Background 360</h3><div><label className="text-sm text-gray-600 block mb-1">Image URL</label><input type="text" value={selectedObjData.imageUrl} onChange={(e) => handlePropertyChange('imageUrl', e.target.value)} className="w-full p-1.5 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" /></div></div>)}
        {/* Painéis existentes, agora condicionais */}
        {selectedObjData.type === 'shape' && (<><div><h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Transform</h3>{(['position', 'rotation', 'scale'] as const).map(prop => (<div key={prop} className="grid grid-cols-4 gap-2 items-center mb-2"><label className="text-sm col-span-1 text-gray-600 capitalize">{prop}</label>{(['x', 'y', 'z'] as const).map((axis, i) => (<input key={axis} type="number" step={prop === 'rotation' ? 1 : 0.1} value={prop === 'rotation' ? (selectedObjData[prop][i] * (180/Math.PI)).toFixed(0) : selectedObjData[prop][i].toFixed(2)} onChange={(e) => handlePropertyChange(`${prop}.${axis}`, prop === 'rotation' ? parseFloat(e.target.value) * (Math.PI/180) : e.target.value)} className="w-full p-1 text-sm border rounded-md text-center focus:ring-1 focus:ring-indigo-500 outline-none" />))}</div>))}</div><div><h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Material</h3><div className="flex items-center gap-3"><label className="text-sm text-gray-600">Base Color</label><input type="color" value={selectedObjData.color} onChange={(e) => handlePropertyChange('color', e.target.value)} className="w-8 h-8 p-0.5 border rounded" /><span className="text-sm font-mono text-gray-500">{selectedObjData.color}</span></div></div>{selectedObjData.interactivity && (<div><h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Interactivity</h3><label className="text-sm text-gray-600 block mb-1">On Click Action</label><select className="w-full p-2 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500 outline-none"><option value="show_formula">Show Formula</option><option value="show_text">Show Text</option></select></div>)}</>)}
      </div>) : (<p className="text-sm text-gray-500">Select an object to see its properties.</p>)}</div>
    </aside>
  );
}

// NOVO COMPONENTE: para renderizar a foto 360
function Skybox360({ url }: { url: string }) {
  const texture = useTexture(url);
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function SceneObjectMesh({ object, onSelect, selected }: { object: SceneObject; onSelect: (id: string, ref: React.RefObject<THREE.Mesh>) => void; selected: boolean; }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const geometry = useMemo(() => {
    switch (object.shape) {
      case 'box': return new THREE.BoxGeometry(1, 1, 1);
      case 'sphere': return new THREE.SphereGeometry(0.75, 32, 32);
      case 'cone': return new THREE.ConeGeometry(0.75, 1, 32);
      case 'cylinder': return new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
      default: return null;
    }
  }, [object.shape]);
  if (!geometry) return null;
  return (
    <mesh ref={meshRef} position={object.position} rotation={object.rotation} scale={object.scale} onClick={(e) => { e.stopPropagation(); onSelect(object.id, meshRef); }} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color={object.color} emissive={hovered || selected ? object.color : '#000000'} emissiveIntensity={hovered || selected ? 0.3 : 0} />
      {object.interactivity && selected && (<Html position={[0, object.scale[1] / 2 + 0.5, 0]} center><div className="bg-white/80 backdrop-blur-sm text-gray-800 text-sm p-2 rounded-md shadow-md select-none">{object.interactivity.content}</div></Html>)}
    </mesh>
  );
}

interface CanvasViewProps {
    sceneObjects: SceneObject[]; selectedObjectId: string | null; setSelectedObjectId: (id: string | null) => void;
    onUpdateObject: (id: string, updatedObject: SceneObject) => void; transformMode: 'translate' | 'rotate' | 'scale';
}

function CanvasView({ sceneObjects, selectedObjectId, setSelectedObjectId, onUpdateObject, transformMode }: CanvasViewProps) {
  const [selectedMeshRef, setSelectedMeshRef] = useState<React.RefObject<THREE.Mesh> | null>(null);
  const handleSelect = (id: string, ref: React.RefObject<THREE.Mesh>) => { setSelectedObjectId(id); setSelectedMeshRef(ref); };
  
  // Encontra se existe um fundo 360 na cena
  const backgroundObject = useMemo(() => sceneObjects.find(obj => obj.type === 'background'), [sceneObjects]);

  const handleTransform = (e: any) => {
      if (e && e.target && e.target.object) {
          const { position, rotation, scale } = e.target.object;
          const updatedObject = sceneObjects.find(obj => obj.id === selectedObjectId);
          if (updatedObject) {
              onUpdateObject(selectedObjectId!, { ...updatedObject, position: [position.x, position.y, position.z], rotation: [rotation.x, rotation.y, rotation.z], scale: [scale.x, scale.y, scale.z], });
          }
      }
  };
  return (
    <div className="w-full h-full bg-gray-100 relative">
      <Canvas shadows camera={{ position: [5, 5, 8], fov: 50 }}>
        <ambientLight intensity={backgroundObject ? 0.5 : 0.7} />
        <directionalLight castShadow position={[10, 10, 5]} intensity={1.5} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        
        {/* NOVO: Renderiza o fundo 360 e esconde o grid se existir */}
        {backgroundObject && backgroundObject.imageUrl ? (
          <Suspense fallback={null}><Skybox360 url={backgroundObject.imageUrl} /></Suspense>
        ) : (
          <Grid infiniteGrid sectionColor={'#d1d5db'} cellColor={'#e5e7eb'} />
        )}

        <OrbitControls makeDefault />
        {sceneObjects.filter(obj => obj.type === 'shape').map(obj => (<SceneObjectMesh key={obj.id} object={obj} onSelect={handleSelect} selected={obj.id === selectedObjectId} />))}
        
        {/* Desabilita os controles de transformação para o fundo */}
        {selectedObjectId && selectedMeshRef?.current && sceneObjects.find(o => o.id === selectedObjectId)?.type !== 'background' && (
            <TransformControls object={selectedMeshRef.current} mode={transformMode} onMouseUp={handleTransform} />
        )}
      </Canvas>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function BuilderPage() {
  const [experienceName, setExperienceName] = useState('Visualizing Geometric Volumes');
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>(initialSceneObjects);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>('cone-1');
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving...' | 'Error'>('Saved');
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');

  useEffect(() => {
    setSaveStatus('Saving...');
    const handler = setTimeout(() => {
      console.log("Saving experience...", { experienceName, sceneObjects });
      setSaveStatus('Saved');
    }, 2000);
    return () => clearTimeout(handler);
  }, [sceneObjects, experienceName]);

  const handleAddObject = (newObject: SceneObject) => { 
    // Garante que só existe um fundo 360 por vez
    if (newObject.type === 'background') {
      setSceneObjects(prev => [...prev.filter(obj => obj.type !== 'background'), newObject]);
    } else {
      setSceneObjects(prev => [...prev, newObject]);
    }
    setSelectedObjectId(newObject.id); 
  };
  const handleUpdateObject = (id: string, updatedObject: SceneObject) => { setSceneObjects(prev => prev.map(obj => obj.id === id ? updatedObject : obj)); };
  const handleDeleteObject = (id: string) => { setSceneObjects(prev => prev.filter(obj => obj.id !== id)); if (selectedObjectId === id) { setSelectedObjectId(null); } };

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50 text-gray-900">
      <Header experienceName={experienceName} saveStatus={saveStatus} />
      <main className="flex flex-1 overflow-hidden">
        <AssetSidebar onAddObject={handleAddObject} />
        <div className="flex-1 flex flex-col relative">
            <div className="absolute top-2 left-2 z-10 bg-white p-1 rounded-lg shadow-md flex gap-1">
                 <button onClick={() => setTransformMode('translate')} className={`p-2 rounded ${transformMode === 'translate' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}><Move size={16} /></button>
                 <button onClick={() => setTransformMode('rotate')} className={`p-2 rounded ${transformMode === 'rotate' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}><RotateCw size={16} /></button>
                 <button onClick={() => setTransformMode('scale')} className={`p-2 rounded ${transformMode === 'scale' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}><Scale size={16} /></button>
            </div>
            {/* Adicionado React.Suspense para aguardar o carregamento da textura da imagem 360 */}
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-gray-100"><p>Loading 360 View...</p></div>}>
              <CanvasView 
                  sceneObjects={sceneObjects} 
                  selectedObjectId={selectedObjectId}
                  setSelectedObjectId={setSelectedObjectId}
                  onUpdateObject={handleUpdateObject}
                  transformMode={transformMode}
              />
            </Suspense>
        </div>
        <InspectorPanel 
            sceneObjects={sceneObjects}
            selectedObject={selectedObjectId}
            onSelectObject={setSelectedObjectId}
            onUpdateObject={handleUpdateObject}
            onDeleteObject={handleDeleteObject}
        />
      </main>
    </div>
  );
}

