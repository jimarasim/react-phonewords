import './index.css';
import * as React from "react";

class DefinitionList extends React.Component {
    render() {
        return (<div className="definitionList"><ul id={this.props.id}></ul></div>);
    }
}

export default DefinitionList;
