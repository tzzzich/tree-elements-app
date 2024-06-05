import React, { useEffect, useRef, useState } from "react";
import Controls from "../controls/Controls";
import RootNode from "../tree-node/RootNode";
import './tree.css'


const initialRootNodeState = {
    id: 0,
    children: [],
    ref: React.createRef()
};

function Tree() {
    const [rootNode, setRootNode] = useState({ ...initialRootNodeState });
    const lastClickedNodeRef = useRef(rootNode.ref);
    const idRef = useRef(1);

    const handleNodeClick = (nodeRef) => {
        lastClickedNodeRef.current = nodeRef.current;
    };

    const nextId = () => {
        return idRef.current++;
    };

    const addChild = () => {
        if (lastClickedNodeRef.current && lastClickedNodeRef.current.addChild) {
            lastClickedNodeRef.current.addChild();
        }
    };

    const editNode = () => {
      if (lastClickedNodeRef.current && lastClickedNodeRef.current.edit) {
          lastClickedNodeRef.current.edit();
      }
    };  

    const handleDeleteNode = (nodeRef) => {
        if (nodeRef) lastClickedNodeRef.current = nodeRef;
        if (lastClickedNodeRef.current) {
            const stack = [lastClickedNodeRef.current];
    
            while (stack.length > 0) {
                const currentNodeRef = stack.pop();
                const currentNode = currentNodeRef.node;
    
                if (currentNodeRef.children) {
                    for (const child of currentNodeRef.children) {
                        stack.push(child.ref.current);
                    }
                }
                if (currentNode && currentNode.remove) {
                    if (currentNode.id != rootNode.id) {
                        const parentNode = currentNode.parentNode;
                        if (parentNode && parentNode.remove) {
                            parentNode.remove(); 
                        }
                        currentNode.remove();
                    } 
                }
            }
  
            lastClickedNodeRef.current = null;
        }
    };

    const resetTree = () => {
        handleDeleteNode(rootNode.ref.current);

        idRef.current = 1;
        lastClickedNodeRef.current = null;
    };
  
    return (
        <>
            <RootNode 
                ref={rootNode.ref} 
                id={rootNode.id} 
                passedChildren={rootNode.children} 
                onClick={handleNodeClick} 
                nextId={nextId} 
            />
            <Controls 
              addChild={addChild}
              edit={editNode}
              removeNode={handleDeleteNode}
              resetTree={resetTree}
            />
        </>
    );
}

export default Tree;
