import './index.css';
// import * as React from "react";

function NumberDisplay ({phoneNumber}) {
    return(
        <span id="numberDisplay">
        {phoneNumber.map((value, index) => {
                return numberFormat(value, index);
            }
        )}
        </span>
    );
}

function numberFormat(value, index) {
    if (index === 0)
        return "(" + value + " ";
    else if(index === 2)
        return value + ") ";
    else if (index === 5)
        return value + " - ";
    else
        return value + " ";
}

export default NumberDisplay;