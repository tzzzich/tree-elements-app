import React, { useRef, useState } from "react";
import Controls from "./controls/Controls";
import NameChangeModal from "./NameChangeModal";
import TreeNode from "./tree-node/TreeNode";


const findNodeById = (nodeId, nodes) => {
    for (const node of nodes) {
        if (node.id === nodeId) {
            return node;
        }
        if (node.children.length > 0) {
            const foundNode = findNodeById(nodeId, node.children);
            if (foundNode) {
                return foundNode; 
            }
        }
    }
    return null; 
};

const BaseNode = {
    key:0,
    id:0,
    name:'Root',
    children:[]
}

function Tree() {
    const [nodes, setNodes] = useState([BaseNode])
    const [currId, setCurrId] = useState(0);
    const id = useRef(0);
    const [showModal, setShowModal] = useState(false);
    const [nodeName, setNodeName] = useState("");

    const handleClick = (index) => {
        setCurrId(index);
    }

    function toggleModal() {
        setShowModal(!showModal);
    }

    function onSubmit(event) {
        event.preventDefault();

        const newName = event.target.name.value;
        const updateNodes = (nodes) => {
            return nodes.map(node => {
                if (node.id === currId) {
                    return {
                        ...node,
                        name: newName
                    };
                } else if (node.children.length > 0) {
                    return {
                        ...node,
                        children: updateNodes(node.children)
                    };
                }
                return node;
            });
        };
        setNodes(updateNodes([...nodes]));

        toggleModal();
    }

    const addChild = () => {
        id.current++;
        const newChild = {
            id: id.current,
            children: [],
            name: 'Node ' + id.current,

        };
        const updateNodes = (nodes) => {
            return nodes.map(node => {
                if (node.id === currId) {
                    return {
                        ...node,
                        children: [...node.children, newChild]
                    };
                } else if (node.children.length > 0) {
                    return {
                        ...node,
                        children: updateNodes(node.children)
                    };
                }
                return node;
            });
        };

        setNodes(updateNodes([...nodes]));
    };

    const editNode = () => {
        const node = findNodeById(currId, nodes);
        setNodeName(node.name);
        toggleModal();
    };  

    const handleDeleteNode = () => {
        const updateNodes = (nodes) => {
            return nodes
                .filter(node => node.id !== currId || node.id ==0)
                .map(node => ({
                    ...node,
                    children: updateNodes(node.children)
                }));
        };
        setNodes(updateNodes([...nodes]));
    };

    const resetTree = () => {
        setNodes([BaseNode]);

        id.current = 0;
    };
  
    return (
        <>
            {nodes.map(child =>
                (
                    <TreeNode 
                        id={child.id} 
                        key={child.id} 
                        name={child.name} 
                        passedChildren={child.children}
                        onClick={handleClick}
                    />
                ))}
            <Controls 
               addChild={addChild}
               edit={editNode}
               removeNode={handleDeleteNode}
               resetTree={resetTree}
            />
            <NameChangeModal baseName={nodeName} show={showModal} toggleModal={toggleModal}  onSubmit={onSubmit}/>
        </>
    );
}

export default Tree;
