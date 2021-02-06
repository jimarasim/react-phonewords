import './index.css';
import * as React from "react";
import DefinitionList from './DefinitionList';

function CombinationsList({area, prefix, suffix}){
    let areaCodeList = Array(0);
    let prefixList = Array(0);
    let suffixList = Array(0);
    for(let i=0; i<area.length; i++){
        const areaid = "area" + i;
        areaCodeList.push(<option key={areaid} id={areaid}>{area[i][0]}</option>);
        fetchWord(areaid, area[i][0], "areaDefinitions");
    }
    for(let i=0; i<prefix.length; i++){
        const prefixid = "prefix" + i;
        prefixList.push(<option key={prefixid} id={prefixid}>{prefix[i][0]}</option>);
        fetchWord(prefixid, prefix[i][0], "prefixDefinitions");
    }
    for(let i=0; i<suffix.length; i++){
        const suffixid = "suffix" + i;
        suffixList.push(<option key={suffixid} id={suffixid}>{suffix[i][0]}</option>);
        fetchWord(suffixid, suffix[i][0], "suffixDefinitions");
    }
    if(areaCodeList.length > 1)
    {
        return (<>
            <select id='area'>{areaCodeList}</select>
            <br />
            <select id='prefix'>{prefixList}</select>
            <br />
            <select id='suffix'>{suffixList}</select>
            <hr />
            <h1><u>AREA</u></h1>
            <DefinitionList id="areaDefinitions" />
            <hr />
            <h1><u>PREFIX</u></h1>
            <DefinitionList id="prefixDefinitions" />
            <hr />
            <h1><u>SUFFIX</u></h1>
            <DefinitionList id="suffixDefinitions" />
        </>)
    }
    else {
        return(<></>);
    }

}

function fetchWord(optionId, word, definitionListId) {
    if (word) {
        word = word.replace("1", "i").replace("0", "o");
        fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=84b88140-44b3-4a35-bfbb-203d307ad99e')
            .then(res => res.json())
            .then(res => {
                if(!res[0].hasOwnProperty('shortdef')) throw new Error("UNEXPECTED JSON:" + res);
                //find the first non-undefined definition
                const numDefs = Object.keys(res).length;
                let i = 0;
                for(i=0; i<numDefs;i++){
                    if(res[i].shortdef[0]){
                        break;
                    }
                };
                document.getElementById(optionId).innerText = document.getElementById(optionId).innerText + " - " + res[i].shortdef[0];
                let li = document.createElement("li");
                li.innerText = document.getElementById(optionId).innerText + " - " + res[i].shortdef[0];
                document.getElementById(definitionListId).appendChild(li);
            })
            .catch(console.warn);
        // fetch('http://api.urbandictionary.com/v0/define?term=' + word, {mode: 'cors'})
        //     .then(res => res.json())
        //     .then (res => {
        //         //find most thumbs up definition
        //         const numDefs = Object.keys(res.list).length;
        //         let bestThumbsUp = 0;
        //         let bestIndex = 0;
        //         for(let i=0; i<numDefs; i++){
        //             if(res.list[i].thumbs_up > bestThumbsUp) {
        //                 bestThumbsUp = res.list[i].thumbs_up;
        //                 bestIndex = i;
        //             }
        //         }
        //         let bestDefinition = res.list[bestIndex].definition;
        //         document.getElementById(optionId).innerText = document.getElementById(optionId).innerText + " - " + bestDefinition;
        //
        //         let li = document.createElement("li");
        //         li.innerText = document.getElementById(optionId).innerText + " - " + bestDefinition;
        //         document.getElementById(definitionListId).appendChild(li);
        //     })
        //     .catch(console.warn);
    }
}


export default CombinationsList;
