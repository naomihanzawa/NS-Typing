import React,{useState, useEffect } from 'react';
import Button from './Button.js';
import styled from 'styled-components'


function Questions({setBeginTime, setScreen, missCount, setMissCount}) {

    const [typingStrings, setTypingStrings] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
   
    function handleClick(){
        setScreen('start');
     }

    function goToResult(){
        setScreen('result');
    }

    useEffect(() => {

        let date= new Date();
        setBeginTime(date)
     
        let subjectsCandidate =
        ["0","1","2","3","4","5","6","7","8","9","!","#","$","%","'","(",")",
        "=","-","~",",",".","?","<",">","{","}",";",":","/","_","@","*"];
        let subjects= subjectsCandidate[Math.floor(Math.random())]; 

        //配列をランダムに並び替える
        subjects = subjectsCandidate.map(function(a){return [a, Math.random()]})
        .sort(function(a, b){return a[1] - b[1]})
        .map(function(a){return a[0]})
        .slice(0,10)

        setTypingStrings(subjects);

        console.log(setBeginTime,"setBeginTime");

    },[setBeginTime]);

    const handleKeyPress = (e) => {        
        const isTypeCorrect = e.key === typingStrings[currentIndex]
        if(isTypeCorrect){
            const nextIndex = currentIndex +1
            setCurrentIndex(nextIndex);

            if(nextIndex >=10){
                goToResult();
            }
        } else {
            setMissCount(missCount + 1)
        }
    }

   return(
            <div>
                <p data-testid="instruction" style={{color:"white", marginTop:"50px"}}>
                    表示された数字または記号のキーを押してください
                </p>
                <div onKeyPress={(e) => handleKeyPress(e)} tabIndex={0} data-testid="input">
                    <Question data-testid="question">{typingStrings[currentIndex]}</Question>
                </div>
                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                    <Content data-testid="questionNo">{currentIndex +1}問目</Content>
                    <Content data-testid="missCount">ミスタイプ: {missCount}回</Content>
                    <Button text="タイトルに戻る" onClick={handleClick}/>
                </div>
            </div>
        );
}

const Question = styled.h1`
    color: white;
    font-size:120px;
    font-weight:800;
    margin:80px 0;
}`


const Content = styled.p`
    color: white;
    font-size:20px;
    margin: 0;
}`




export default Questions;