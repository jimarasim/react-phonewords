import './index.css';
import * as React from "react";
import DefinitionList from './DefinitionList';

function CombinationDropdowns({areaCodeWords, prefixWords, suffixWords, showCopyButtons, setShowCopyButtons}){
    let areaCodeList = Array(0);
    let prefixList = Array(0);
    let suffixList = Array(0);
    for(let i=0; i<areaCodeWords.length; i++){
        const areaid = "area" + i;
        const areaOptionValue = areaCodeWords[i][0];
        areaCodeList.push(<option key={areaid} id={areaid} value={areaOptionValue}>{areaOptionValue}</option>);
        fetchWordFromMerriam(areaid, areaCodeWords[i][0], "areaDefinitions");
    }
    for(let i=0; i<prefixWords.length; i++){
        const prefixid = "prefix" + i;
        const prefixOptionValue = prefixWords[i][0];
        prefixList.push(<option key={prefixid} id={prefixid} value={prefixOptionValue}>{prefixOptionValue}</option>);
        fetchWordFromMerriam(prefixid, prefixWords[i][0], "prefixDefinitions");
    }
    for(let i=0; i<suffixWords.length; i++){
        const suffixid = "suffix" + i;
        const suffixOptionValue = suffixWords[i][0];
        suffixList.push(<option key={suffixid} id={suffixid} value={suffixOptionValue}>{suffixOptionValue}</option>);
        fetchWordFromMerriam(suffixid, suffixWords[i][0], "suffixDefinitions");
    }
    return (<>
        <select id='area' defaultValue={'DEFAULT'} onChange={() => setCorrectCopyButtonState(showCopyButtons, setShowCopyButtons)}><option value="DEFAULT">Choose Area Code...</option>{areaCodeList}</select>
        <br />
        <select id='prefix' defaultValue={'DEFAULT'} onChange={() => setCorrectCopyButtonState(showCopyButtons, setShowCopyButtons)}><option value="DEFAULT">Choose Prefix...</option>{prefixList}</select>
        <br />
        <select id='suffix' defaultValue={'DEFAULT'} onChange={() => setCorrectCopyButtonState(showCopyButtons, setShowCopyButtons)}><option value="DEFAULT">Choose Suffix...</option>{suffixList}</select>
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



function setCorrectCopyButtonState(showCopyButtons, setShowCopyButtons){
    if( document.getElementById("area").selectedIndex > 0 &&
        document.getElementById("prefix").selectedIndex > 0 &&
        document.getElementById("suffix").selectedIndex > 0 && showCopyButtons) {
        document.getElementById("parenFormatButton").innerText = "(" + document.getElementById("area").options[document.getElementById("area").selectedIndex].value + ")" +
            document.getElementById("prefix").options[document.getElementById("prefix").selectedIndex].value + "-" +
            document.getElementById("suffix").options[document.getElementById("suffix").selectedIndex].value;
        document.getElementById("dashFormatButton").innerText = document.getElementById("area").options[document.getElementById("area").selectedIndex].value + "-" +
            document.getElementById("prefix").options[document.getElementById("prefix").selectedIndex].value + "-" +
            document.getElementById("suffix").options[document.getElementById("suffix").selectedIndex].value;
        document.getElementById("plainFormatButton").innerText = document.getElementById("area").options[document.getElementById("area").selectedIndex].value +
            document.getElementById("prefix").options[document.getElementById("prefix").selectedIndex].value +
            document.getElementById("suffix").options[document.getElementById("suffix").selectedIndex].value;
    } else if( document.getElementById("area").selectedIndex > 0 &&
        document.getElementById("prefix").selectedIndex > 0 &&
        document.getElementById("suffix").selectedIndex > 0){
        setShowCopyButtons(true);
    } else{
        setShowCopyButtons(false);
    }
}

function fetchWordFromMerriam(optionId, word, definitionListId) {
    if (word) {
        word = word.replace("1", "i").replace("0", "o");
        //MERRIAM WEBSTER
        fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=84b88140-44b3-4a35-bfbb-203d307ad99e')
            .then(res => res.json())
            .then(res => {
                if (!res[0].hasOwnProperty('shortdef')) throw new Error("NO MERRIAM WEBSTER DEFINITION" + JSON.stringify(res));
                //find the first non-undefined definition
                const numDefs = Object.keys(res).length;
                let i;
                for (let i = 0; i < numDefs; i++) {
                    if (res[i].shortdef[0]) {
                        break;
                    }
                }
                const wordDashDefinition = document.getElementById(optionId).innerText + " - " + res[i].shortdef[0] + " (MERRIAMWEBSTER)";
                document.getElementById(optionId).innerText = wordDashDefinition;
                let li = document.createElement("li");
                li.innerText = wordDashDefinition;
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
    word = word.replace("1", "i").replace("0", "o");
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
                if(res.list[bestIndex] === undefined) throw new Error("NO URBAN DICTIONARY DEFINITION:" + JSON.stringify(res));
                let bestDefinition = res.list[bestIndex].definition;
                const wordDashDefinition = document.getElementById(optionId).innerText + " - " + bestDefinition + " (URBANDICTIONARY)";
                document.getElementById(optionId).innerText = wordDashDefinition;
                let li = document.createElement("li");
                li.innerText = wordDashDefinition;
                document.getElementById(definitionListId).appendChild(li);
            })
            .catch((message) => {
                    console.warn(message);
                }
            );
    }
}



export default CombinationDropdowns;
