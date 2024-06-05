import React, { useState, useEffect } from "react";

const TreeNode = ({ id, passedChildren, onClick, name }) => {
    const [children, setChildren] = useState(passedChildren);
    const [nodeName, setNodeName] = useState(name);

    useEffect(() => {
        setChildren(passedChildren);
        setNodeName(name);
    }, [passedChildren, name]);
    
    return (
        <ul>
            <li tabIndex='0' id={id} onClick={() => onClick(id)}>{nodeName}</li>
            {children.map(child => (
                <TreeNode 
                    key={child.id} 
                    id={child.id} 
                    passedChildren={child.children}
                    onClick={onClick}
                    name={child.name}
                />
            ))}
        </ul>
    );
};

export default TreeNode;
