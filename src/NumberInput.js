import './index.css';
import * as React from "react";

class NumberInput extends React.Component {
    render() {
        return (<input type='text' id={this.props.id} onKeyUp={this.props.action} maxLength={this.props.length} />);
    }
}

export default NumberInput;
