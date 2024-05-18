import React, { useCallback } from "react";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Edge,
    Node,
    Connection,
    BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
    { id: "1", type: "input", data: { label: "Input Node" }, position: { x: 250, y: 5 } },
    { id: "2", data: { label: "Default Node" }, position: { x: 100, y: 100 } },
    { id: "3", data: { label: "Output Node" }, type: "output", position: { x: 250, y: 200 } },
];

const initialEdges: Edge[] = [];

const FlowEditor: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{ width: "90vw", height: "90vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};

export default FlowEditor;
