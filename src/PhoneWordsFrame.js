import './index.css';
import * as React from "react";
import NumberInput from './NumberInput';
import SelectionDisplay from './SelectionDisplay';
import CombinationsList from './CombinationsList';


class PhoneWordsFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: Array(10).fill(""),
            areaCodeWords: Array(Array(2)),
            prefixWords: Array(Array(2)),
            suffixWords: Array(Array(2)),
        };
    }

    render() {
        const formattedPhoneWordString = " ( " +
            "{" +
            this.state.phoneNumber[0] +
            "}" +
            "{" +
            this.state.phoneNumber[1] +
            "}" +
            "{" +
            this.state.phoneNumber[2] +
            "}" +
            " ) " +
            "{" +
            this.state.phoneNumber[3] +
            "}" +
            "{" +
            this.state.phoneNumber[4] +
            "}" +
            "{" +
            this.state.phoneNumber[5] +
            "}" +
            " - " +
            "{" +
            this.state.phoneNumber[6] +
            "}" +
            "{" +
            this.state.phoneNumber[7] +
            "}" +
            "{" +
            this.state.phoneNumber[8] +
            "}" +
            "{" +
            this.state.phoneNumber[9] +
            "}";
        return (
            <div className='main'>
                <NumberInput id='phonenumber' length='10' action={(element) => this.handleKeyUp(element)}/>
                <SelectionDisplay displayText={formattedPhoneWordString}/>
                <CombinationsList area={this.state.areaCodeWords} prefix={this.state.prefixWords} suffix={this.state.suffixWords}/>
            </div>
        );
    }

    handleKeyUp(element) {
        const keyLetters = ["0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
        console.log(element);
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
            [newAreaCodeWords, newPrefixWords, newSuffixWords] = this.getWordCombinations(newPhoneNumber);
        }
        this.setState({
            phoneNumber: newPhoneNumber,
            areaCodeWords: newAreaCodeWords,
            prefixWords: newPrefixWords,
            suffixWords: newSuffixWords,
        });
    }

    getWordCombinations(phoneNumberCombinationData) {
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
}

export default PhoneWordsFrame;
