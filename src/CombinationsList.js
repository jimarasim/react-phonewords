import './index.css';
import * as React from "react";

class CombinationsList extends React.Component {
    render() {
        let areaCodeList = Array(0);
        let prefixList = Array(0);
        let suffixList = Array(0);
        for(let i=0; i<this.props.area.length; i++){
            const areaid = "area" + i;
            areaCodeList.push(<option key={areaid} id={areaid}>{this.props.area[i][0]}</option>);
            this.fetchWord(areaid, this.props.area[i][0]);
        }
        for(let i=0; i<this.props.prefix.length; i++){
            const prefixid = "prefix" + i;
            prefixList.push(<option key={prefixid} id={prefixid}>{this.props.prefix[i][0]}</option>);
            this.fetchWord(prefixid, this.props.prefix[i][0]);
        }
        for(let i=0; i<this.props.suffix.length; i++){
            const suffixid = "suffix" + i;
            suffixList.push(<option key={suffixid} id={suffixid}>{this.props.suffix[i][0]}</option>);
            this.fetchWord(suffixid, this.props.suffix[i][0]);
        }
        if(areaCodeList.length > 1)
        {
            return (<><select id='area'>{areaCodeList}</select><br /><select id='prefix'>{prefixList}</select><br /><select id='suffix'>{suffixList}</select></>)
        }
        else {
            return(<></>);
        }
    }

    fetchWord(optionId, word) {
        if (word) {
            word = word.replace("1", "i").replace("0", "o");
            // fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=84b88140-44b3-4a35-bfbb-203d307ad99e')
            //     .then(res => res.json())
            //     .then(res => {
            //         //find the first non-undefined definition
            //         const numDefs = Object.keys(res).length;
            //         let i = 0;
            //         for(i=0; i<numDefs;i++){
            //             if(res[i].shortdef[0] !== undefined){
            //                 break;
            //             }
            //         }
            //         document.getElementById(optionId).innerText = document.getElementById(optionId).innerText + " - " + res[i].shortdef[0];
            //     })
            //     .catch(console.error);
            fetch('http://api.urbandictionary.com/v0/define?term=' + word)
                .then(res => res.json())
                .then(res => {
                    //find most thumbs up definition
                    const numDefs = Object.keys(res.list).length;
                    let bestThumbsUp = 0;
                    let bestIndex = 0;
                    for(let i=0; i<numDefs; i++){
                        if(res.list[i].thumbs_up > bestThumbsUp) {
                            bestThumbsUp = res.list[i].thumbs_up;
                            bestIndex = i;
                        }
                    }
                    document.getElementById(optionId).innerText = document.getElementById(optionId).innerText + " - " + res.list[bestIndex].definition;
                })
                .catch(console.error);
        }
    }
}

export default CombinationsList;
