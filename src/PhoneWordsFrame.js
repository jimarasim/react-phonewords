import './index.css';
// import React from 'react';
import React, {useState} from 'react';
import NumberInput from './NumberInput';
import CombinationsList from './CombinationsList';

function PhoneWordsFrame (){
    const [phoneNumber, setPhoneNumber] = useState(Array(10).fill("   "));
    const [areaCodeWords, setAreaCodeWords] = useState(Array(Array(2)));
    const [prefixWords, setPrefixWords] = useState(Array(Array(2)));
    const [suffixWords, setSuffixWords] = useState(Array(Array(2)));
    return(
        <>
        <div className='main'>
            <NumberInput id='phonenumber' length='10' action={(element) => handleKeyUp(element, setPhoneNumber,setAreaCodeWords, setPrefixWords, setSuffixWords)}/>
            <br />
            {
                phoneNumber.map(
                    value =>
                        "[" + value + "]"
                )
            }
            <br />
            <CombinationsList area={areaCodeWords} prefix={prefixWords} suffix={suffixWords}/>
        </div>
        </>
    );
}

function handleKeyUp(element, setPhoneNumber, setAreaCodeWords, setPrefixWords, setSuffixWords) {
    const keyLetters = ["0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    let newCodedPhoneNumberArray = Array(10).fill("");
    for (let i = 0; i < element.target.value.length; i++) {
        if (parseInt(element.target.value[i]) >= 0 && parseInt(element.target.value[i]) <= 9) {
            newCodedPhoneNumberArray[i] = keyLetters[parseInt(element.target.value[i])];
        } else {
            newCodedPhoneNumberArray[i] = element.target.value[i];
        }
    }
    let newAreaCodeWords = Array(Array(2));
    let newPrefixWords = Array(Array(2));
    let newSuffixWords = Array(Array(2));
    if (element.target.value.length === 10) {
        [newAreaCodeWords, newPrefixWords, newSuffixWords] = getWordCombinations(newCodedPhoneNumberArray);
    }
    setPhoneNumber(newCodedPhoneNumberArray);
    setAreaCodeWords(newAreaCodeWords);
    setPrefixWords(newPrefixWords);
    setSuffixWords(newSuffixWords);
}

function getWordCombinations(newCodedPhoneNumberArray) {
    let newAreaCodeWords = Array(Array(2));
    let newPrefixWords = Array(Array(2));
    let newSuffixWords = Array(Array(2));
    //AREA
    for (let i = 0; i < newCodedPhoneNumberArray[0].length; i++) {
        for (let j = 0; j < newCodedPhoneNumberArray[1].length; j++) {
            for (let k = 0; k < newCodedPhoneNumberArray[2].length; k++) {
                newAreaCodeWords.push([newCodedPhoneNumberArray[0][i] + newCodedPhoneNumberArray[1][j] + newCodedPhoneNumberArray[2][k], ""]);
            }
        }
    }
    for (let i = 0; i < newCodedPhoneNumberArray[3].length; i++) {
        for (let j = 0; j < newCodedPhoneNumberArray[4].length; j++) {
            for (let k = 0; k < newCodedPhoneNumberArray[5].length; k++) {
                newPrefixWords.push([newCodedPhoneNumberArray[3][i] + newCodedPhoneNumberArray[4][j] + newCodedPhoneNumberArray[5][k], ""]);
            }
        }
    }
    for (let i = 0; i < newCodedPhoneNumberArray[6].length; i++) {
        for (let j = 0; j < newCodedPhoneNumberArray[7].length; j++) {
            for (let k = 0; k < newCodedPhoneNumberArray[8].length; k++) {
                for (let l = 0; l < newCodedPhoneNumberArray[9].length; l++) {
                    newSuffixWords.push([newCodedPhoneNumberArray[6][i] + newCodedPhoneNumberArray[7][j] + newCodedPhoneNumberArray[8][k] + newCodedPhoneNumberArray[9][l], ""]);
                }
            }
        }
    }
    return ([newAreaCodeWords, newPrefixWords, newSuffixWords]);
}

export default PhoneWordsFrame;
