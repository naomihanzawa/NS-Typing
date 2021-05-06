import React,{ useState, useEffect }  from 'react';
import Button from './Button.js';
import styled from 'styled-components'

//round=四捨五入しているという意味

function Result( {setScreen, beginTime, missCount} ) {

    const [endTime, setEndTime] = useState('');

    function handleClick(){
        setScreen('start');
    }

    useEffect(() => {
        let date= new Date();
        setEndTime(date)
    },[])

    let ms = endTime - beginTime 

    let min = Math.floor(ms / 60000);

    //秒数 = 60000ミリ秒で割り1000(ミリ秒なので1000で掛ける)
    let sec = Math.floor(ms % 60000 / 1000);

    //四捨五入されたミリ秒 = 135200ミリ秒を1000ミリ秒で割った数の余り
    let roundMs = ms % 1000;

    //表示の際の桁数を固定する 例）3 => 03、12 => 12
    min = ('0' + min).slice(-2); 
    sec = ('0' + sec).slice(-2);
    roundMs = ('0' + roundMs).slice(-2);

    let timer = min + ':' + sec + ':' + roundMs;

    //タイプスピード(１秒間にタイプできる数)＝ 10問を経過時間で割った数
    let typeSpeed = 10/sec
    let roundTypeSpeed = Math.round(typeSpeed*10)/10;

    //正確率 = 10問を、ミスタイプ数 + 正解数(10)で割り、100掛けて％表示
    let accuracyRate = (10/(missCount+10))*100;
    let roundAccuracyRate = Math.round(accuracyRate*10)/10;

   return(
    <div>
    <h1 data-testid="result"
        style={{
            color:"white", 
            fontSize:"50px", 
            fontWeight:"800",
            margin:"70px 0"
            }}>
            結果
    </h1>
    <ul data-testid="resultlist"
        style={{
        color:"white", 
        fontSize:"20px", 
        textAlign:"left", 
        margin:"30px 100px", 
        display:"inline-block"
        }}>
            <li>経過時間: <BlueText>{timer}</BlueText></li>
            <li>平均キータイプ数: <BlueText>{roundTypeSpeed}</BlueText>回/秒</li>
            <li>ミスタイプ数: <BlueText data-testid="missCount">{missCount}回</BlueText></li>
            <li>正確率: <BlueText>{roundAccuracyRate}</BlueText>%</li>
    </ul>
    <Button text="タイトルに戻る" onClick={handleClick}/>
</div>
    );
}

const BlueText = styled.span`
    color:#10639C;
    font-weight:800;
}`

export default Result;