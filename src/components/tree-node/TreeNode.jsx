import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import NameChangeModal from "../NameChangeModal";

const TreeNode = forwardRef(({ id, passedChildren, nextId, onClick}, ref) => {
    const [children, setChildren] = useState(passedChildren);
    const [showModal, setShowModal] = useState(false);
    const [nodeName, setNodeName] = useState("Node " + id);
    const nodeRef = useRef(null)

    function toggleModal() {
        setShowModal(!showModal);
    }

    function onSubmit(event) {
        event.preventDefault();
        setNodeName(event.target.name.value);
        toggleModal();
    }

    useImperativeHandle(ref, () => ({
        node: nodeRef.current,
        children: children,
        addChild: () => {
            const newChildId = nextId();
            const newChild = {
                id: newChildId,
                children: [],
                ref: React.createRef(),
            };
            setChildren(prevChildren => [...prevChildren, newChild]);
        },
        edit: () => {
            toggleModal();
        },
    }));

    function handleClick() {
        if (onClick) {
            onClick(ref);
        }
    }

    return (
        <ul>
            <li tabIndex='0' id={id} onClick={handleClick} ref={nodeRef}>{nodeName}</li>
            {children.map(child => (
                <TreeNode key={child.id} ref={child.ref} id={child.id} passedChildren={child.children} 
                    nextId={nextId} onClick={onClick} 
                />
            ))}
            <NameChangeModal baseName={nodeName} show={showModal} toggleModal={toggleModal}  onSubmit={onSubmit}/>
            
        </ul>
    );
});

export default TreeNode;


