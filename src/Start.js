import React from 'react';
import Button from './Button.js';

function Start({setScreen}) {

        function handleClick(){
            setScreen('questions');
        }

        return(
        <div>
        <h1 style={{
            color:"white", 
            fontSize:"40px", 
            fontWeight:"800",
            margin:"50px 0"
            }}>
            NS-TYPING
            </h1>
        <p data-testid="theme" style={{color:"white"}}>数字・記号専門のタイピングゲーム</p>
        <Button text="プレイする" onClick={handleClick}/>
        </div>
    );
}

export default Start;