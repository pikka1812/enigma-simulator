import React from "react";
import './EnigmaSimulator.css'

const KEYBOARD_1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const KEYBOARD_2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const KEYBOARD_3 = ["Z", "X", "C", "V", "B", "N", "M"];
                    
const ALPHABET = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const ROTOR_I = {
    rotor: [..."EKMFLGDQVZNTOWYHXUSPAIBRCJ"],
    notch: "Q",
};
const ROTOR_II = {
    rotor: [..."AJDKSIRUXBLHWTMCQGZNPYFVOE"],
    notch: "E",
};
const ROTOR_III = {
    rotor: [..."BDFHJLCPRTXVZNYEIWGAKMUSQO"],
    notch: "V",
};

const ROTOR_IV = {
    rotor: [..."ESOVPZJAYQUIRHXLNFTGKDCMWB"],
    notch: "J",
}

const ROTOR_V = {
    rotor: [..."VZBRGITYUPSDNHLXAWMJQOFECK"],
    notch: "Z",
}

const REFLECTOR_A = [..."EJMZALYXVBWFCRQUONTSPIKHGD"];
const REFLECTOR_B = [..."YRUHQSLDPXNGOKMIEBFZCWVJAT"];
const REFLECTOR_C = [..."FVPJIAOYEDRZXWGCTKUQSBNMHL"];

const ANIMATION_SPEED = 700;

export default class EnigmaSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rotor_1: {
                rotor : ROTOR_I.rotor,
                notch : ROTOR_I.notch,
                offset: 0,
            },
            rotor_2: {
                rotor : ROTOR_II.rotor,
                notch : ROTOR_II.notch,
                offset: 0,
            },
            rotor_3: {
                rotor : ROTOR_III.rotor,
                notch : ROTOR_III.notch,
                offset: 0,
            },
            reflector: REFLECTOR_B,
            pair: [],
            currInChar:[],
            currOutChar: [],
            processChar: [],
            history:  [],
        }
    }

    enigma(input) {
    
        const rotor_1 = this.state.rotor_1.rotor;
        const rotor_2 = this.state.rotor_2.rotor;
        const rotor_3 = this.state.rotor_3.rotor;
        const reflector = this.state.reflector;
        const history = this.state.history;
        let processChar = [];
        
        //before rotor 1
        processChar.push(input)
        const inputRotor_2 = rotor_1[ALPHABET.indexOf(input)];
        processChar.push(inputRotor_2);
        const inputRotor_3 = rotor_2[ALPHABET.indexOf(inputRotor_2)];
        processChar.push(inputRotor_3);
        const inputReflector = rotor_3[ALPHABET.indexOf(inputRotor_3)];
        processChar.push(inputReflector);
        const afterReflector = reflector[ALPHABET.indexOf(inputReflector)];
        processChar.push(afterReflector);
        const outputRotor_3 = ALPHABET[rotor_3.indexOf(afterReflector)];
        processChar.push(outputRotor_3);
        const outputRotor_2 = ALPHABET[rotor_2.indexOf(outputRotor_3)];
        processChar.push(outputRotor_2);
        const output = ALPHABET[rotor_1.indexOf(outputRotor_2)];
        processChar.push(output);


        history.push({
            input: input,
            output: output,
        })
        
        this.setState({processChar, history});
        
        return output;
    }
    
    processAnimation (){
        let currInChar = [];
        let currOutChar= [];
        const processChar = this.state.processChar;

        document.getElementById("input-rotor-1").innerHTML = processChar[0];
        //inside rotor 1
        setTimeout(()=> {
            document.getElementById("alphabet-rotor-1" + processChar[0]).classList.add("in-char");
            currInChar.push("alphabet-rotor-1"+processChar[0]);
            document.getElementById("rotor-1" + processChar[1]).classList.add("in-char");
            currInChar.push("rotor-1" + processChar[1]);
        }, ANIMATION_SPEED);
        
        //after rotor 1 or before rotor 2
        setTimeout(()=> {
            document.getElementById("input-rotor-2").innerHTML = processChar[1];
        }, ANIMATION_SPEED * 2);
        
        //inside rotor 2
        setTimeout(() => {
            document.getElementById("alphabet-rotor-2"+ processChar[1]).classList.add("in-char");
            currInChar.push("alphabet-rotor-2"+processChar[1]);
            document.getElementById("rotor-2" + processChar[2]).classList.add("in-char");
            currInChar.push("rotor-2" + processChar[2]);
        }, ANIMATION_SPEED * 3);
        
        //after rotor 2 or before rotor 3
        setTimeout(() => {
            document.getElementById("input-rotor-3").innerHTML = processChar[2];
        }, ANIMATION_SPEED * 4);
        
        //inside rotor 3
        setTimeout(() => {
            document.getElementById("alphabet-rotor-3"+processChar[2]).classList.add("in-char");
            currInChar.push("alphabet-rotor-3"+processChar[2]);
            document.getElementById("rotor-3" + processChar[3]).classList.add("in-char");
            currInChar.push("rotor-3" + processChar[3]);
        }, ANIMATION_SPEED * 5);
        
        //after rotor 3 or before reflector
        setTimeout(() => {
            document.getElementById("input-reflector").innerHTML = processChar[3];
        }, ANIMATION_SPEED * 6);
        
        //inside reflector
        setTimeout(() => {
            document.getElementById("alphabet-reflector" + processChar[3]).classList.add("in-char");
            currInChar.push("alphabet-reflector" + processChar[3]);
            document.getElementById("reflector" + processChar[4]).classList.add("out-char");
            currOutChar.push("reflector" + processChar[4]);
        }, ANIMATION_SPEED * 7);
        
        //after reflector or before go back to rotor 3
        
        setTimeout(() => {
            document.getElementById("output-reflector").innerHTML = processChar[4];
        }, ANIMATION_SPEED * 8);
        
        //inside rotor 3 (back)
        setTimeout(() => {
            document.getElementById("rotor-3" + processChar[4]).classList.add("out-char");
            currOutChar.push("rotor-3" + processChar[4]);
            document.getElementById("alphabet-rotor-3"+ processChar[5]).classList.add("out-char");
            currOutChar.push("alphabet-rotor-3" + processChar[5]);
        }, ANIMATION_SPEED * 9);
        
        //after rotor 3 (back)
        setTimeout(() => {
            document.getElementById("output-rotor-3").innerHTML = processChar[5];
        }, ANIMATION_SPEED * 10);
        
        //inside rotor 2 (back)
        setTimeout(() => {
            document.getElementById("rotor-2" + processChar[5]).classList.add("out-char");
            currOutChar.push("rotor-2" + processChar[5]);
            document.getElementById("alphabet-rotor-2"+processChar[6]).classList.add("out-char");
            currOutChar.push("alphabet-rotor-2"+processChar[6]);
        }, ANIMATION_SPEED * 11);
        
        //after rotor 2(back)
        setTimeout(() => {
            document.getElementById("output-rotor-2").innerHTML = processChar[6];
        }, ANIMATION_SPEED * 12);
        
        //inside rotor 1(back)
        setTimeout(()=>{
            document.getElementById("rotor-1" + processChar[6]).classList.add("out-char");
            currOutChar.push("rotor-1" + processChar[6]);
            document.getElementById("alphabet-rotor-1" + processChar[7]).classList.add("out-char");
            currOutChar.push("alphabet-rotor-1" +processChar[7]);
        }, ANIMATION_SPEED * 13);
        
        //after rotor 1 (back) == output
        setTimeout(() => {
            document.getElementById("output-rotor-1").innerHTML = processChar[7];
        }, ANIMATION_SPEED * 14);
        this.setState({currInChar,currOutChar});
    }

    showProcess() {
        document.getElementById("process").style.display = "flex";
        this.processAnimation();
    }

    closeProcess() {
        document.getElementById("process").style.display = "none";
    }

    changeOffset(rotorNum, operation) {
        const {rotor_1, rotor_2, rotor_3} = this.state;

        if (rotorNum === 1) {
            operation === "up" ? rotor_1.offset++: rotor_1.offset--;
            if(rotor_1.offset === ALPHABET.length) {
                rotor_1.offset = 0;
            }
            else if (rotor_1.offset < 0) {
                rotor_1.offset = ALPHABET.length - 1;
            }
            rotor_1.rotor = rotateRotor(rotor_1.rotor, operation);
        } else if ( rotorNum === 2) {
            operation === "up" ? rotor_2.offset++: rotor_2.offset--;
            if(rotor_2.offset === ALPHABET.length) {
                rotor_2.offset = 0;
            }
            else if (rotor_2.offset < 0) {
                rotor_2.offset = ALPHABET.length - 1;
            }
            rotor_2.rotor =  rotateRotor(rotor_2.rotor, operation);
        } else {
            operation === "up" ? rotor_3.offset++ : rotor_3.offset--;
            if(rotor_3.offset === ALPHABET.length) {
                rotor_3.offset = 0;
            }
            else if (rotor_3.offset < 0) {
                rotor_3.offset = ALPHABET.length - 1;
            }
            rotor_3.rotor = rotateRotor(rotor_3.rotor, operation);
        }

        this.setState({rotor_1, rotor_2, rotor_3});
    }
    advanceRotor() {
        let {rotor_1, rotor_2} = this.state;
        
        this.changeOffset(1, "up");
        //checking if rotor 2 is at notch ( mean there will be a double-stepping)
        if (rotor_2.offset === ALPHABET.indexOf(rotor_2.notch))
        {
            this.changeOffset(2, "up");
            this.changeOffset(3, "up");
        }
        else {
            //checking if rotor 1 is at notch (so rotor 2 will rotate 1 time)
            if (rotor_1.offset === ALPHABET.indexOf(rotor_1.notch) + 1) {
                this.changeOffset(2, "up");
            }
        }
    }

    handleInput(char) {
        // advance rotor before doing enigma
        this.advanceRotor();


        // remove the char that are highlight 
        const currInChar = this.state.currInChar;
        const currOutChar = this.state.currOutChar;

        if (document.getElementsByClassName("highlight")[0]) {
            document.getElementsByClassName("highlight")[0].classList.remove("highlight");   
        }
        for(let i = 0; i < currInChar.length; i++) {
            document.getElementById(currInChar[i]).classList.remove("in-char");
        }

        for (let i = 0; i < currOutChar.length; i++) {
            document.getElementById(currOutChar[i]).classList.remove("out-char");
        }


        const result = this.enigma(char);
        const resultElement = document.getElementById("result"+result);
        resultElement.classList.add("highlight");
    }

    handleRotorChange(id) {
        const selector = document.getElementById(id);
        var rotorNeed;
        switch (selector.value) {
            case "1": 
                rotorNeed = ROTOR_I; 
                break;
            case "2": 
                rotorNeed = ROTOR_II; 
                break;
            case "3": 
                rotorNeed = ROTOR_III; 
                break;
            case "4" :
                rotorNeed = ROTOR_IV;
                break;
            case "5":
                rotorNeed = ROTOR_V;
                break;
        }

        if (id === "rotor-3-choosen") {
            this.setState({
                rotor_3: {
                    rotor: rotorNeed.rotor,
                    notch: rotorNeed.notch,
                    offset: 0,
                }
            });
        }
        else if (id === "rotor-2-choosen") {
            this.setState({
                rotor_2: {
                    rotor: rotorNeed.rotor,
                    notch: rotorNeed.notch,
                    offset: 0,
                }
            })
        }
        else {
            this.setState({
                rotor_1: {
                    rotor: rotorNeed.rotor,
                    notch: rotorNeed.notch,
                    offset: 0,
                }
            })
        }
    }

    handleReflectorChange() {
        var reflector;
        const selector = document.getElementById("reflector-choosen");
        switch(selector.value) {
            case "1" : 
                reflector = REFLECTOR_A;
                break;
            case "2" : 
                reflector = REFLECTOR_B;
                break;
            case "3" : 
                reflector = REFLECTOR_C;
                break;
        }
        
        this.setState({reflector});
    }

    makePlugBoardPair(id) {
        const {pair}  = this.state;
        if(document.getElementById(id).classList.contains("pair-choosen")){
            document.getElementById(id).classList.remove("pair-choosen");
        } else {
            document.getElementById(id).classList.add("pair-choosen");
        }
        
        const plugboardPair = document.getElementsByClassName("pair-choosen");

        if(plugboardPair.length == 2) {
            pair.push({
                first_char: plugboardPair.item(0).innerHTML,
                second_char: plugboardPair.item(1).innerHTML,
            });
            this.setState({pair});
            for (let i = 0; i < 2; i++) {
                plugboardPair.item(0).classList.remove("pair-choosen");
                console.log(plugboardPair);     
            };
        }
    }
    
    render() {
        const resultKeyboard_1 = KEYBOARD_1.map((char, index) => {
            const id = "result" + char;
            return <div className = "keynode" key = {char} id = {id}>{char}</div>
        });
        const resultKeyboard_2 = KEYBOARD_2.map((char, index) => {
            const id = "result" + char;
            return <div className = "keynode" key = {char} id = {id}>{char}</div>
        });
        const resultKeyboard_3 = KEYBOARD_3.map((char, index) => {
            const id = "result" + char;
            return <div className = "keynode" key = {char} id = {id}>{char}</div>
        });

        const keyboard_1 = KEYBOARD_1.map((char, index) => {
            return <button onClick={()=> this.handleInput(char)} className= "keyboard-node" key = {char} id = {char}>{char}</button>
        });
        const keyboard_2 = KEYBOARD_2.map((char, index)=> {
            return <button onClick={()=> this.handleInput(char)} className= "keyboard-node" key = {char} id = {char}>{char}</button>
        });
        const keyboard_3 = KEYBOARD_3.map((char, index)=> {
            return <button onClick={()=> this.handleInput(char)} className= "keyboard-node" key = {char} id = {char}>{char}</button>
        });
        const {rotor_1, rotor_2, rotor_3, reflector, pair} = this.state;

        const alphabetRotor_1 = ALPHABET.map((char, index) => {
            const id = "alphabet-rotor-1"+char;
            return <div className="character" key = {char} id ={id}>{char}</div>
        });
        const alphabetRotor_2 = ALPHABET.map((char, index) => {
            const id = "alphabet-rotor-2"+char;
            return <div className="character" key = {char} id ={id}>{char}</div>
        });
        const alphabetRotor_3 = ALPHABET.map((char, index) => {
            const id = "alphabet-rotor-3"+char;
            return <div className="character" key = {char} id ={id}>{char}</div>
        });
        const alphabetReflector = ALPHABET.map((char, index) => {
            const id = "alphabet-reflector"+char;
            return <div className="character" key = {char} id ={id}>{char}</div>
        });
        const processRotor_1 = rotor_1.rotor.map((char, index) => {
            const id = "rotor-1" + char; 
            return <div className="character" key = {char} id={id}>{char}</div>
        });
        const processRotor_2 = rotor_2.rotor.map((char, index) => {
            const id = "rotor-2" + char;
            return <div className="character" key = {char} id={id}>{char}</div>
        });
        const processRotor_3 = rotor_3.rotor.map((char, index) => {
            const id = "rotor-3" + char;
            return <div className="character" key = {char} id ={id}>{char}</div>
        });
        const processReflector = reflector.map((char, index) => {
            const id = "reflector" + char;
            return <div className="character" key = {char} id = {id}>{char}</div>
        });

        const history = this.state.history.map((history, index) => {
            const a = history.input + "  -->  " + history.output
            return <div key = {index}>{a}</div> 
        });

        const plugboard = ALPHABET.map((char, index) => {
            const id = "plugboard" + char;
            return <button id={id} onClick={()=> this.makePlugBoardPair(id)} key = {index}>{char}</button>
        })
        
        return(
            <div className="container">
                <div className="machine">
                    <h1>Enigma Simulator</h1>
                    <div className="result">
                        <div className="keyboard-row">{resultKeyboard_1}</div>
                        <div className="keyboard-row">{resultKeyboard_2}</div>
                        <div className="keyboard-row">{resultKeyboard_3}</div>
                    </div>
                    <div className="middle-container">
                        <div className="utility">
                            <h3>Utility function</h3>
                            <button onClick={() => this.showProcess()}>View under process</button><br/>
                            <select name="reflector-selector"defaultValue="2" id="reflector-choosen" onChange={()=>this.handleReflectorChange()}>
                                <option value="1">Reflector A</option>
                                <option value="2">Reflector B</option>
                                <option value="3">Reflector C</option>
                            </select>
                            <hr />
                            <h3>Plugboard</h3>
                            <div>{plugboard}</div>
                        </div>
                        <div className="rotor">
                            <div>
                                <button className="lower" onClick={() => this.changeOffset(3, "down")}>&#60;</button>
                                <div id="rotor-3">{ALPHABET[rotor_3.offset]}</div>
                                <button className="greater" onClick={() => this.changeOffset(3, "up")}>&#62;</button>
                            </div>
                            <select defaultValue="3" id="rotor-3-choosen" onChange={()=>this.handleRotorChange("rotor-3-choosen")}>
                                <option value="1">Rotor I</option>
                                <option value="2">Rotor II</option>
                                <option value="3">Rotor III</option>
                                <option value="4">Rotor IV</option>
                                <option value="5">Rotor V</option>
                            </select>
                            <div>
                                <button className="lower" onClick={() => this.changeOffset(2, "down")}>&#60;</button>
                                <div id="rotor-2">{ALPHABET[rotor_2.offset]}</div>
                                <button className="greater" onClick={() => this.changeOffset(2, "up")}>&#62;</button>
                            </div>
                            <select defaultValue="2" id="rotor-2-choosen" onChange={()=>this.handleRotorChange("rotor-2-choosen")}>
                                <option value="1">Rotor I</option>
                                <option value="2">Rotor II</option>
                                <option value="3">Rotor III</option>
                                <option value="4">Rotor IV</option>
                                <option value="5">Rotor V</option>
                            </select>    
                            <div>
                                <button className="lower" onClick={() => this.changeOffset(1, "down")}>&#60;</button>
                                <div id="rotor-1">{ALPHABET[rotor_1.offset]}</div>
                                <button className="greater" onClick={() => this.changeOffset(1, "up")} >&#62;</button>
                            </div>
                            <select defaultValue="1" id="rotor-1-choosen" onChange={()=>this.handleRotorChange("rotor-1-choosen")}>
                                <option value="1">Rotor I</option>
                                <option value="2">Rotor II</option>
                                <option value="3">Rotor III</option>
                                <option value="4">Rotor IV</option>
                                <option value="5">Rotor V</option>
                            </select>
                        </div>
                        <div className="history">
                            <h3>History</h3>
                            <div>{history}</div>
                        </div>
                    </div>
                    <div className="keyboard-container">
                        <div className="keyboard-row">{keyboard_1}</div>
                        <div className="keyboard-row">{keyboard_2}</div>
                        <div className="keyboard-row">{keyboard_3}</div>
                    </div>    
                </div>
                <div id="process">
                    <div className="reflector">
                        <div className="alphabet">{processReflector}</div>
                        <div className="alphabet">{alphabetReflector}</div>
                    </div>
                    <div className="inout">
                        <div className="in">
                            <div>&#8593;</div>
                            <div id ="input-reflector"></div>
                            <div>&#8593;</div>
                        </div>
                        <div className="out">
                            <div>&#8595;</div>
                            <div id ="output-reflector"></div>
                            <div>&#8595;</div>
                        </div>
                    </div>
                    <div className="rotor-3-process">
                        <div className="alphabet">{processRotor_3}</div>
                        <div className="alphabet">{alphabetRotor_3}</div>
                    </div>
                    <div className="inout">
                        <div className="in">
                            <div>&#8593;</div>
                            <div id ="input-rotor-3"></div>
                            <div>&#8593;</div>
                        </div>
                        <div className="out">
                            <div>&#8595;</div>
                            <div id ="output-rotor-3"></div>
                            <div>&#8595;</div>
                        </div>
                    </div>
                    <div className="rotor-2-process">
                        <div className="alphabet">{processRotor_2}</div>
                        <div className="alphabet">{alphabetRotor_2}</div>
                    </div>
                    <div className="inout">
                        <div className="in">
                            <div>&#8593;</div>
                            <div id ="input-rotor-2"></div>
                            <div>&#8593;</div>
                        </div>
                        <div className="out">
                            <div>&#8595;</div>
                            <div id ="output-rotor-2"></div>
                            <div>&#8595;</div>
                        </div>
                    </div>
                    <div className="rotor-1-process">
                        <div className="alphabet">{processRotor_1}</div>
                        <div className="alphabet">{alphabetRotor_1}</div>
                    </div>
                    <div className="inout">
                        <div className="in">
                            <div>&#8593;</div>
                            <div id ="input-rotor-1"></div>
                        </div>
                        <div className="out">
                            <div>&#8595;</div>
                            <div id ="output-rotor-1"></div>
                        </div>
                    </div>

                    <button onClick={() => this.closeProcess()}>Close</button>
                </div>
            </div>
        );
    }
}

function rotateRotor(rotor, operation) {

    if (operation === "up") {
        rotor = rotor.rotate(1);
        for (let i =0; i < rotor.length; i++) {
            if (ALPHABET.indexOf(rotor[i]) === 0) {
                rotor[i] = ALPHABET[ALPHABET.length - 1];
            } else {
                rotor[i] = ALPHABET[ALPHABET.indexOf(rotor[i]) - 1];
            }
        }
        return rotor;
    }
    else {
        rotor = rotor.rotateBackward(1);
        for (let i = 0; i < rotor.length; i++) {
            if (ALPHABET.indexOf(rotor[i]) === ALPHABET.length - 1) {
                rotor[i] = ALPHABET[0];
            } else {
                rotor[i] = ALPHABET[ALPHABET.indexOf(rotor[i]) + 1];
            }
        }
        return rotor;
    }

}

//Rotate array (https://stackoverflow.com/questions/1985260/rotate-the-elements-in-an-array-in-javascript)
Array.prototype.rotate = function(n) {
    n = n % this.length;
    return this.slice(n, this.length).concat(this.slice(0,n));
}

//Rotate array backward ( by me lol )
Array.prototype.rotateBackward = function(n) {
    return this.slice(this.length-n).concat(this.slice(0, this.length - n));
}
