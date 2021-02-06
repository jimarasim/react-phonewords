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
        fetchWordFromMerriam(areaid, area[i][0], "areaDefinitions");
    }
    for(let i=0; i<prefix.length; i++){
        const prefixid = "prefix" + i;
        prefixList.push(<option key={prefixid} id={prefixid}>{prefix[i][0]}</option>);
        fetchWordFromMerriam(prefixid, prefix[i][0], "prefixDefinitions");
    }
    for(let i=0; i<suffix.length; i++){
        const suffixid = "suffix" + i;
        suffixList.push(<option key={suffixid} id={suffixid}>{suffix[i][0]}</option>);
        fetchWordFromMerriam(suffixid, suffix[i][0], "suffixDefinitions");
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

function fetchWordFromMerriam(optionId, word, definitionListId) {
    if (word) {
        word = word.replace("1", "i").replace("0", "o");
        //MERRIAM WEBSTER
        fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=84b88140-44b3-4a35-bfbb-203d307ad99e')
            .then(res => res.json())
            .then(res => {
                if (!res[0].hasOwnProperty('shortdef')) throw new Error("NODEFINITION" + res);
                //find the first non-undefined definition
                const numDefs = Object.keys(res).length;
                let i = 0;
                for (i = 0; i < numDefs; i++) {
                    if (res[i].shortdef[0]) {
                        break;
                    }
                }
                const definition = document.getElementById(optionId).innerText + " - " + res[i].shortdef[0] + " (MERRIAMWEBSTER)";
                document.getElementById(optionId).innerText = definition;
                let li = document.createElement("li");
                li.innerText = definition;
                document.getElementById(definitionListId).appendChild(li);
            })
            .catch((message) => {
                    console.warn(message);
                    fetchWordFromUrban(optionId, word, definitionListId);
                }
            );
    }
}

function fetchWordFromUrban(optionId, word, definitionListId) {
    if(word){
        //URBAN DICTIONARY
        fetch("https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + word, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "1c2eed9801msh9a03da88e676433p16db88jsncfe81277ff23",
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then (res => {
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
                let bestDefinition = res.list[bestIndex].definition;
                const definition = document.getElementById(optionId).innerText + " - " + bestDefinition + " (URBANDICTIONARY)";
                document.getElementById(optionId).innerText = definition;
                let li = document.createElement("li");
                li.innerText = definition;
                document.getElementById(definitionListId).appendChild(li);
            })
            .catch(console.warn);
    }
}



export default CombinationsList;
