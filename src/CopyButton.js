import './index.css';
import * as React from "react";

function CopyButton ({buttonText, id}) {
    return <button id={id}>{buttonText}</button>
}

export default CopyButton;
