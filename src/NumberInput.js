import './index.css';
import * as React from "react";

function NumberInput ({id, action, length}) {
    return (
        <>
        <input type='search' id={id} onChange={action} maxLength={length} placeholder='Enter 10 Digits'/>
        </>
    );
}

export default NumberInput;
