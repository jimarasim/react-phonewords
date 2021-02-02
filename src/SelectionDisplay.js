import './index.css';
import * as React from "react";

class SelectionDisplay extends React.Component {
    render() {
        return (<p id='selectionDisplay'>{this.props.displayText}</p>);
    }
}

export default SelectionDisplay;
