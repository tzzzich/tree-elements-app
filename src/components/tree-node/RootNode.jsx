import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import TreeNode from "./TreeNode";

const RootNode = forwardRef(({ id, passedChildren, nextId, onClick}, ref) => {
    const [children, setChildren] = useState(passedChildren);
    const [nodeName, setNodeName] = useState("Root");
    const nodeRef = useRef(null)

    useImperativeHandle(ref, () => ({
        node: nodeRef.current,
        children:children,
        addChild: () => {
            const newChildId = nextId();
            const newChild = {
                id: newChildId,
                children: [],
                ref: React.createRef(),
            };
            setChildren(prevChildren => [...prevChildren, newChild]);
        },
    }));

    function handleClick() {
        if (onClick) {
            onClick(ref);
        }
    }

    return (
        <ul>
            <li tabIndex='0' id={id} className='root' onClick={handleClick} ref={nodeRef}>{nodeName}</li>
            {children.map(child => (
                <TreeNode key={child.id} ref={child.ref} id={child.id} passedChildren={child.children} 
                    nextId={nextId} onClick={onClick} 
                />
            ))}
            
        </ul>
    );
});

export default RootNode;


