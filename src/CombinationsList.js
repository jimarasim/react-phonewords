import './index.css';
import * as React from "react";

class CombinationsList extends React.Component {
    render() {
        console.log("AREA:" + this.props.areaCodeWords);
        console.log("PREFIX:" + this.props.prefixWords);
        console.log("SUFFIX:" + this.props.suffixWords);
        let areaCodeList = Array(0);
        let prefixList = Array(0);
        let suffixList = Array(0);
        for(let i=0; i<this.props.areaCodeWords.length; i++){
            areaCodeList.push(<li>{this.props.areaCodeWords[i]}</li>);
        }
        for(let i=0; i<this.props.prefixWords.length; i++){
            prefixList.push(<li>{this.props.prefixWords[i]}</li>);
        }
        for(let i=0; i<this.props.suffixWords.length; i++){
            suffixList.push(<li>{this.props.suffixWords[i]}</li>);
        }
        return (<p><ul>{areaCodeList}</ul><ul>{prefixList}</ul><ul>{suffixList}</ul></p>);
    }
}

export default CombinationsList;
