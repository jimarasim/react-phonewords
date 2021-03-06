import './index.css';
import React, {useState, useEffect} from 'react';
import NumberInput from './NumberInput';
import CombinationDropdowns from './CombinationDropdowns';
import NumberDisplay from './NumberDisplay';
import CopyButton from './CopyButton';

function PhoneWordsFrame() {
    const [phoneNumber, setPhoneNumber] = useState(Array(10).fill(""));
    const [areaCodeWords, setAreaCodeWords] = useState(Array([]));
    const [prefixWords, setPrefixWords] = useState(Array([]));
    const [suffixWords, setSuffixWords] = useState(Array([]));
    const [showCopyButtons, setShowCopyButtons] = useState(false);
    useEffect(() => {
        let newAreaCodeWords = Array([]);
        let newPrefixWords = Array([]);
        let newSuffixWords = Array([]);
        if (phoneNumber[9]) {
            [newAreaCodeWords, newPrefixWords, newSuffixWords] = getWordCombinations(phoneNumber);
            setAreaCodeWords(newAreaCodeWords);
            setPrefixWords(newPrefixWords);
            setSuffixWords(newSuffixWords);
        } else{
            setShowCopyButtons(false);
        }
    }, [phoneNumber]);
    return (
        <>
            <div className='main'>
                <NumberInput id='phonenumber' length='10'
                             action={(element) => handleNumberInputChange(element, setPhoneNumber)}/>
                <NumberDisplay phoneNumber={phoneNumber}/>
                {showCopyButtons ?
                    <>
                        <br />
                        <CopyButton id="parenFormatButton" buttonText={"(" + document.getElementById("area").options[document.getElementById("area").selectedIndex].value + ")" +
                        document.getElementById("prefix").options[document.getElementById("prefix").selectedIndex].value + "-" +
                        document.getElementById("suffix").options[document.getElementById("suffix").selectedIndex].value} />
                        <br />
                        <CopyButton id="dashFormatButton" buttonText={document.getElementById("area").options[document.getElementById("area").selectedIndex].value + "-" +
                        document.getElementById("prefix").options[document.getElementById("prefix").selectedIndex].value + "-" +
                        document.getElementById("suffix").options[document.getElementById("suffix").selectedIndex].value} />
                        <br />
                        <CopyButton id="plainFormatButton" buttonText={document.getElementById("area").options[document.getElementById("area").selectedIndex].value +
                        document.getElementById("prefix").options[document.getElementById("prefix").selectedIndex].value +
                        document.getElementById("suffix").options[document.getElementById("suffix").selectedIndex].value} />
                    </> : ""}
                {phoneNumber[9] ?
                    <CombinationDropdowns areaCodeWords={areaCodeWords} prefixWords={prefixWords}
                                          suffixWords={suffixWords} showCopyButtons={showCopyButtons}
                                          setShowCopyButtons={setShowCopyButtons}/> : ""
                }
            </div>
        </>
    );
}

function handleNumberInputChange(element, setPhoneNumber) {
    const keyLetters = ["0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    let newCodedPhoneNumberArray = Array(10).fill("");
    for (let i = 0; i < element.target.value.length; i++) {
        if (parseInt(element.target.value[i]) >= 0 && parseInt(element.target.value[i]) <= 9) {
            newCodedPhoneNumberArray[i] = keyLetters[parseInt(element.target.value[i])];
        } else {
            newCodedPhoneNumberArray[i] = element.target.value[i];
        }
    }
    setPhoneNumber(newCodedPhoneNumberArray);
}

function getWordCombinations(newCodedPhoneNumberArray) {
    let newAreaCodeWords = Array([]);
    let newPrefixWords = Array([]);
    let newSuffixWords = Array([]);
    //AREA
    for (let i = 0; i < newCodedPhoneNumberArray[0].length; i++) {
        for (let j = 0; j < newCodedPhoneNumberArray[1].length; j++) {
            for (let k = 0; k < newCodedPhoneNumberArray[2].length; k++) {
                newAreaCodeWords.push([newCodedPhoneNumberArray[0][i] + newCodedPhoneNumberArray[1][j] + newCodedPhoneNumberArray[2][k]]);
            }
        }
    }
    for (let i = 0; i < newCodedPhoneNumberArray[3].length; i++) {
        for (let j = 0; j < newCodedPhoneNumberArray[4].length; j++) {
            for (let k = 0; k < newCodedPhoneNumberArray[5].length; k++) {
                newPrefixWords.push([newCodedPhoneNumberArray[3][i] + newCodedPhoneNumberArray[4][j] + newCodedPhoneNumberArray[5][k]]);
            }
        }
    }
    for (let i = 0; i < newCodedPhoneNumberArray[6].length; i++) {
        for (let j = 0; j < newCodedPhoneNumberArray[7].length; j++) {
            for (let k = 0; k < newCodedPhoneNumberArray[8].length; k++) {
                for (let l = 0; l < newCodedPhoneNumberArray[9].length; l++) {
                    newSuffixWords.push([newCodedPhoneNumberArray[6][i] + newCodedPhoneNumberArray[7][j] + newCodedPhoneNumberArray[8][k] + newCodedPhoneNumberArray[9][l]]);
                }
            }
        }
    }
    return ([newAreaCodeWords, newPrefixWords, newSuffixWords]);
}

export default PhoneWordsFrame;
