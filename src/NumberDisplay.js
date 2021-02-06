import './index.css';
import * as React from "react";

function NumberDisplay ({phoneNumber}) {
    return(
        phoneNumber.map((value, index) =>
            <>{value} </>
        )
    );
}

export default NumberDisplay;