import React, { useState } from "react";
import { flattenPuzzle } from "../helpers";
import './HintBox.css';

const HintBox = ({ setSelectedCell, setHintCell, selectedCell, hintCell, sudoku, resetBoard }) => {
    const [hintMessage, setHintMessage] = useState(null);
    const [hintValue, setHintValue] = useState(null);
    
    async function getHint(evt) {
        const flatPuzzle = flattenPuzzle(sudoku);
        const url = 'https://steven-sudoku-api.herokuapp.com/sudoku/analysis?puzzle=' + flatPuzzle;
        const { position, value, solveWith } = await fetch(url)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error! Status:', resp.status);
                }
                return resp.json();
            })
            .then(data => {
                return data.data;
            })
            .catch(err => console.error(err));

        const cellId = '#sudoku-cell-' + (position[0] - 1) + '-' + (position[1] - 1);
        const cell = document.querySelector(cellId);

        if (hintCell) {
            hintCell.classList.remove('hintCell');
            setHintCell(null);
            return;
        }

        cell.classList.add('hintCell');
        setHintCell(cell);
        if (selectedCell) {
            selectedCell.classList.remove('selected-cell');
        }
        setSelectedCell(cell);

        document.querySelector('#sudoku-pad-values').focus();
        
        let message = 'The green cell can be solved with ' + solveWith; 
        setHintMessage(message);
        setHintValue(value);
    }

    function viewSolution(evt){
        const solution = document.querySelector('#solution');   
        solution.innerText = hintValue;
    }

    return (
        <div>
            <button onClick={getHint} id='hint-button'>Hint</button>
            <div className='hint-message'>
                {(hintCell) ? hintMessage : ''}
                {(hintCell) ? <button onClick={viewSolution} className='solution-button'>See Solution</button> : ''}
                {(hintCell) ? <div id='solution'></div> : ''}
            </div>
        </div>
        );

};










export default HintBox;