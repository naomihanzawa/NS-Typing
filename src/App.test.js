import React, {useState} from 'react';
import { render, screen, getByTestId, fireEvent, cleanup, getAllByText, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {SwitchScreen} from './App.js';
import Start from './Start'
import Questions  from './Questions';
import handleKeyPress  from './Questions';
import Result from './Result';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';


//Visible Tests

it("App Visible", () => {
    render(<App/>)
        expect(screen.getByRole('banner')).toHaveTextContent('NS-TYPING')
});      

it("Start Visible", () => {
    const setScreen = jest.fn();
    render(<Start setScreen={setScreen}/>)
        expect(screen.getByRole('heading')).toHaveTextContent('NS-TYPING')
        expect(screen.getByTestId('theme')).toHaveTextContent('数字・記号専門のタイピングゲーム')
        expect(screen.getByRole('button')).toHaveTextContent('プレイする')
});
it("Questions Visible", () => {
    const setBeginTime = jest.fn();
    render(<Questions setBeginTime={setBeginTime}/>)
        expect(screen.getByTestId('instruction')).toHaveTextContent('表示された数字または記号のキーを押してください')
        expect(screen.getByTestId('question').innerHTML).toMatch(/[0-9!#$%'()=-~,.?<>{};:/_@*]/)
        expect(screen.getByTestId('questionNo')).toHaveTextContent('問目')
        expect(screen.getByRole('button')).toHaveTextContent('タイトルに戻る')
});    

it("Result Visible", () => {
    render(<Result/>)
        expect(screen.getByRole('heading')).toHaveTextContent('結果')
        expect(screen.getByTestId('resultlist')).toHaveTextContent('経過時間:'&&'平均キータイプ数:'&&'ミスタイプ数:'&&'正確率:')
        expect(screen.getByRole('button')).toHaveTextContent('タイトルに戻る')
});

//Switch Tests

it("Testing Start in Switch", () =>{
    const setScreen = jest.fn();
    render(<SwitchScreen setScreen={setScreen} screen='start'/>)

    expect(screen.getByRole('heading')).toHaveTextContent('NS-TYPING')
    expect(screen.getByTestId('theme')).toHaveTextContent('数字・記号専門のタイピングゲーム')
    expect(screen.getByRole('button')).toHaveTextContent('プレイする')
})

it("Testing Questions in Switch", () =>{
    const setScreen = jest.fn();
    render(<SwitchScreen setScreen={setScreen} screen='questions'/>)

    expect(screen.getByTestId('instruction')).toHaveTextContent('表示された数字または記号のキーを押してください')
    expect(screen.getByTestId('question').innerHTML).toMatch(/[0-9!#$%'()=-~,.?<>{};:/_@*]/)
    expect(screen.getByTestId('questionNo')).toHaveTextContent('問目')
    expect(screen.getByRole('button')).toHaveTextContent('タイトルに戻る')
})

it("Testing Result in Switch", () =>{
    const setScreen = jest.fn();
    render(<SwitchScreen setScreen={setScreen} screen='result'/>)

    expect(screen.getByRole('heading')).toHaveTextContent('結果')
    expect(screen.getByTestId('resultlist')).toHaveTextContent('経過時間:'&&'平均キータイプ数:'&&'ミスタイプ数:'&&'正確率:')
    expect(screen.getByRole('button')).toHaveTextContent('タイトルに戻る')
})

// System Tests

it("Go to next when typed correctly", async() => {
    const setBeginTime = jest.fn();
    render (<Questions setBeginTime={setBeginTime}/>)

    const questionNo = screen.getByTestId('questionNo')
    const question = screen.getByTestId('question').textContent
    const input= screen.getByTestId('input')

    expect(questionNo).toHaveTextContent('1問目')
    
    userEvent.click(input)
    userEvent.type(input,question)

    await waitFor(() => {
        expect(questionNo).toHaveTextContent('2問目')
    })
})

function handleKeyPress (callback,key){
    let missCount = 0        
    if(key === 'currentIndex'){
        callback(missCount)
    }else{
        callback(missCount+ 1)
    }

it('Typed correctly', (isTypeCorrect) => {
      const setBeginTime = jest.fn();
      const missCount = jest.fn();
      render(<handleKeyPress e={e}/>)
      Questions(missCount, isTypeCorrect);
      expect(missCount).toHaveBeenCalledWith(0);
});

it('Typed incorrectly', () => {
      const setBeginTime = jest.fn();
      const missCount = jest.fn();
      render(<Questions setBeginTime={setBeginTime} missCount={missCount}/>)
      handleKeyPress(missCount, 'otherIndex');
      expect(missCount).toHaveBeenCalledWith(1);
});

// it('Typed correctly', () => {
//     const missCount = jest.fn();
//     handleKeyPress(missCount, 'currentIndex');
//     expect(missCount).toHaveBeenCalledWith(0);
// });

// it('Typed incorrectly', () => {
//       const missCount = jest.fn();
//       handleKeyPress(missCount, 'otherIndex');
//       expect(missCount).toHaveBeenCalledWith(1);
// });



// it("Count misstype", async() => {
//         const setBeginTime = jest.fn();
//         const setMissCount = jest.fn();
//         render (<Questions setBeginTime={setBeginTime} setMissCount={setMissCount}/>)
        
//         const question = screen.getByTestId('question').textContent
//         const input= screen.getByTestId('input')
        
//         userEvent.click(input)
//         userEvent.type(input,!question)
    
//         await waitFor(() => {
//             // expect(screen.getByTestId('missCount')).toHaveBeenCalledWith(1);
//             expect(DummyQuestions).toHaveBeenCalledWith(1);
//     });
// });



