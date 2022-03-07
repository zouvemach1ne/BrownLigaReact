import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  updateEdge,
  ControlButton,
} from 'react-flow-renderer';

import { nodeTypes } from './custom_nodes/CustomNodesMap';

import Sidebar from './custom_nodes/SideBarDnd';
import './custom_nodes/dnd.css';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function FlowChartCanvas(){
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onEdgeUpdate = (oldEdge, newConnection) => {
    setElements((els) => updateEdge(oldEdge, newConnection, els))
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const label = event.dataTransfer.getData("label");
    const name = event.dataTransfer.getData("name");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: label, name: name },
    };

    setElements((es) => es.concat(newNode));
  };

  return (
    <div >
      <ReactFlowProvider>
        <div className="dndflow" style={{ height: '100vh', width:'100vw', display:'flex', flexDirection:'row'}}>
          <div>
              <Sidebar />
          </div>
          <div ref={reactFlowWrapper} style={{ height: '100vh', width:'100vw'}}>
              <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onEdgeUpdate={onEdgeUpdate}
              nodeTypes={nodeTypes}
              >
              <Controls>
                <ControlButton onClick={() => console.log('action')}>
                  <span>aff</span>
                </ControlButton>
              </Controls>
              </ReactFlow>
          </div>
        </div>
            
        
        
        
      </ReactFlowProvider>
    </div>
  );
};




