import './index.css';
import * as React from "react";

class CombinationsList extends React.Component {
    render() {
        let areaCodeList = Array(0);
        let prefixList = Array(0);
        let suffixList = Array(0);
        for(let i=0; i<this.props.areaCodeWords.length; i++){
            areaCodeList.push(<option>{this.props.areaCodeWords[i]}</option>);
        }
        for(let i=0; i<this.props.prefixWords.length; i++){
            prefixList.push(<option>{this.props.prefixWords[i]}</option>);
        }
        for(let i=0; i<this.props.suffixWords.length; i++){
            suffixList.push(<option>{this.props.suffixWords[i]}</option>);
        }
        return (<p><select>{areaCodeList}</select><select>{prefixList}</select><select>{suffixList}</select></p>);
    }
}

export default CombinationsList;
