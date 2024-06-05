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
        console.log(currId)
        id.current++;
        const newChild = {
            id: id.current,
            children: [],
            name: 'Node ' + id.current,

        };
        const newNodes = [...nodes];
        const updateNodes = (newNodes, currId, newChild) => {
            return newNodes.map(node => {
                if (node.id === currId) {
                    return {
                        ...node,
                        children: [...node.children, newChild]
                    };
                } else if (node.children.length > 0) {
                    return {
                        ...node,
                        children: updateNodes(node.children, currId, newChild)
                    };
                }
                return node;
            });
        };

        setNodes(updateNodes(newNodes, currId, newChild));
    };

    const handleClick = (index) => {
        setCurrId(index);
    }

    // const editNode = () => {
    //   if (lastClickedNodeRef.current && lastClickedNodeRef.current.edit) {
    //       lastClickedNodeRef.current.edit();
    //   }
    // };  

    // const handleDeleteNode = (nodeRef) => {
    //     if (nodeRef) lastClickedNodeRef.current = nodeRef;
    //     if (lastClickedNodeRef.current) {
    //         const stack = [lastClickedNodeRef.current];
    
    //         while (stack.length > 0) {
    //             const currentNodeRef = stack.pop();
    //             const currentNode = currentNodeRef.node;
    
    //             if (currentNodeRef.children) {
    //                 for (const child of currentNodeRef.children) {
    //                     stack.push(child.ref.current);
    //                 }
    //             }
    //             if (currentNode && currentNode.remove) {
    //                 if (currentNode.id != rootNode.id) {
    //                     const parentNode = currentNode.parentNode;
    //                     if (parentNode && parentNode.remove) {
    //                         parentNode.remove(); 
    //                     }
    //                     currentNode.remove();
    //                 } 
    //             }
    //         }
  
    //         lastClickedNodeRef.current = null;
    //     }
    // };

    // const resetTree = () => {
    //     handleDeleteNode(rootNode.ref.current);

    //     idRef.current = 1;
    //     lastClickedNodeRef.current = null;
    // };
  
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
            //   removeNode={handleDeleteNode}
            //   resetTree={resetTree}
            />
        </>
    );
}

export default Tree;
