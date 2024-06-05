import React, { useEffect, useRef, useState } from "react";
import Controls from "./controls/Controls";
import TreeNode from "./tree-node/TreeNode";


function Tree() {

    const [currId, setCurrId] = useState(0);
    const id = useRef(0);

    const BaseNode = {
            key:0,
            id:0,
            name:'Root',
            children:[]
        }

    const [nodes, setNodes] = useState([BaseNode])

    const addChild = () => {
        id.current++;
        const newChild = {
            id: id.current,
            children: [],
            name: 'Node ' + id.current,

        };
        const newNodes = [...nodes];
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

        setNodes(updateNodes(newNodes));
    };

    const handleClick = (index) => {
        setCurrId(index);
    }

    // const editNode = () => {
    //   if (lastClickedNodeRef.current && lastClickedNodeRef.current.edit) {
    //       lastClickedNodeRef.current.edit();
    //   }
    // };  

    const handleDeleteNode = () => {
        const newNodes = [...nodes];
        const updateNodes = (nodes) => {
            return nodes
                .filter(node => node.id !== currId)
                .map(node => ({
                    ...node,
                    children: updateNodes(node.children)
                }));
        };
        setNodes(updateNodes(newNodes));
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
            //   edit={editNode}
               removeNode={handleDeleteNode}
               resetTree={resetTree}
            />
        </>
    );
}

export default Tree;
