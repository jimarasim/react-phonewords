import './index.css';
import * as React from "react";

function NumberInput ({id, action, length}) {
    return (
        <>
        <input type='text' id={id} onKeyUp={action} maxLength={length} placeholder='Enter 10 Digits'/>
        </>
    );
}

export default NumberInput;
