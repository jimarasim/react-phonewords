import './index.css';
import * as React from "react";

function CopyButton ({buttonText, id}) {
    return <><span className="copyButton">Copy:</span><button id={id} className="copyButton" onClick={(event)=>copyButtonTextToClipBoard(event)}>{buttonText}</button></>
}

function copyButtonTextToClipBoard(event){
    console.log(event.target.innerText);
    navigator.clipboard.writeText(event.target.innerText)
        .then(() => {
            alert('copied ' + event.target.innerText + ' to clipboard');
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
}

export default CopyButton;
