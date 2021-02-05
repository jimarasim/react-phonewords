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
            <span>Enter 10 digit Phone Number:</span>
            <br />
            <NumberInput id='phonenumber' length='10' action={(element) => handleKeyUp(element, setPhoneNumber,setAreaCodeWords, setPrefixWords, setSuffixWords)}/>
            <br />
            {
                phoneNumber.map(
                    value =>
                        "{" + value + "}"
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
    let newPhoneNumber = Array(10).fill("");
    for (let i = 0; i < element.target.value.length; i++) {
        if (parseInt(element.target.value[i]) >= 0 && parseInt(element.target.value[i]) <= 9) {
            newPhoneNumber[i] = keyLetters[parseInt(element.target.value[i])];
        } else {
            newPhoneNumber[i] = element.target.value[i];
        }
    }
    let newAreaCodeWords = Array(Array(2));
    let newPrefixWords = Array(Array(2));
    let newSuffixWords = Array(Array(2));
    if (element.target.value.length === 10) {
        [newAreaCodeWords, newPrefixWords, newSuffixWords] = getWordCombinations(newPhoneNumber);
    }
    setPhoneNumber(newPhoneNumber);
    setAreaCodeWords(newAreaCodeWords);
    setPrefixWords(newPrefixWords);
    setSuffixWords(newSuffixWords);
}

function getWordCombinations(phoneNumberCombinationData) {
    let newAreaCodeWords = Array(Array(2));
    let newPrefixWords = Array(Array(2));
    let newSuffixWords = Array(Array(2));
    //AREA
    for (let i = 0; i < phoneNumberCombinationData[0].length; i++) {
        for (let j = 0; j < phoneNumberCombinationData[1].length; j++) {
            for (let k = 0; k < phoneNumberCombinationData[2].length; k++) {
                newAreaCodeWords.push([phoneNumberCombinationData[0][i] + phoneNumberCombinationData[1][j] + phoneNumberCombinationData[2][k], ""]);
            }
        }
    }
    for (let i = 0; i < phoneNumberCombinationData[3].length; i++) {
        for (let j = 0; j < phoneNumberCombinationData[4].length; j++) {
            for (let k = 0; k < phoneNumberCombinationData[5].length; k++) {
                newPrefixWords.push([phoneNumberCombinationData[3][i] + phoneNumberCombinationData[4][j] + phoneNumberCombinationData[5][k], ""]);
            }
        }
    }
    for (let i = 0; i < phoneNumberCombinationData[6].length; i++) {
        for (let j = 0; j < phoneNumberCombinationData[7].length; j++) {
            for (let k = 0; k < phoneNumberCombinationData[8].length; k++) {
                for (let l = 0; l < phoneNumberCombinationData[9].length; l++) {
                    newSuffixWords.push([phoneNumberCombinationData[6][i] + phoneNumberCombinationData[7][j] + phoneNumberCombinationData[8][k] + phoneNumberCombinationData[9][l], ""]);
                }
            }
        }
    }
    return ([newAreaCodeWords, newPrefixWords, newSuffixWords]);
}

export default PhoneWordsFrame;
