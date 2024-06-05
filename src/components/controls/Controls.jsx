import React from 'react';
import './controls.css';

const Controls = ({ addChild, edit, removeNode, resetTree}) => {
    return (
        <footer>
            <button onClick={() => addChild()}>Add</button>
            <button onClick={() => removeNode()}>Remove</button>
            <button onClick={()=> edit()}>Edit</button>
            <button onClick={() => resetTree()}>Reset</button>
        </footer>
    );
};

export default Controls;
