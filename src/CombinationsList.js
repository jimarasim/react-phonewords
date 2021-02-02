import './index.css';
import * as React from "react";

class CombinationsList extends React.Component {
    render() {
        let areaCodeList = Array(0);
        let prefixList = Array(0);
        let suffixList = Array(0);
        for(let i=0; i<this.props.area.length; i++){
            areaCodeList.push(<option>{this.props.area[i][0]}</option>);
        }
        for(let i=0; i<this.props.prefix.length; i++){
            prefixList.push(<option>{this.props.prefix[i][0]}</option>);
        }
        for(let i=0; i<this.props.suffix.length; i++){
            suffixList.push(<option>{this.props.suffix[i][0]}</option>);
        }
        return (<p><select>{areaCodeList}</select><select>{prefixList}</select><select>{suffixList}</select></p>);
    }
}

export default CombinationsList;
