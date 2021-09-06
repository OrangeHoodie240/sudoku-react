import React from "react";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import SudokuPad from "../SudokuPad/SudokuPad";
import MagnifiedCell from "../MagnifiedCell/MagnifiedCell";
import getPuzzle, { copySudoku, isBoardFull, isBoardValid, flattenPuzzle } from "../helpers";
import './SudokuBoard.css';

const SudokuBoard = () => {
    const [selectedCell, setSelectedCell] = React.useState(null);
    const [invalidCell, setInvalidCell] = React.useState(null);
    const [valid, setValid] = React.useState(true);
    const orignialSudoku = React.useRef(null);
    const [sudoku, setSudoku] = React.useState(null);
    const [hintCell, setHintCell] = React.useState(null);

    // hint & Select will change
    const hintButton = React.useRef(null);
    const select = React.useRef(null);

    // for updating entire board from within child
    const [_, update] = React.useState(null);

    if (sudoku) {
        const testIfInvalid = isBoardValid(sudoku);
        if (valid && !testIfInvalid) {
            selectedCell.classList.add('invalid-cell');
            setValid(false);
            setInvalidCell(selectedCell);
        }
        else if (!valid && testIfInvalid) {
            invalidCell.classList.remove('invalid-cell');
            setValid(true);
            setInvalidCell(null);
        }

        if (isBoardFull(sudoku) && valid) {
            alert('you win!');
        }
    }

    function resetBoard(){
        // reset grid
        const gridDiv =  document.querySelector('#grid-div');
        let children  = gridDiv.children; 
        let cellLength = children.length;
        for(let i = 0; i < cellLength; i++){
            const cell = children[i]; 
            cell.children[0].innerText = ''; 
            cell.children[1].innerText = ''; 
        } 

        // reset selectedCell
        if(selectedCell){
            selectedCell.classList.remove('selected-cell');
            setSelectedCell(null);
        }

        // reset hintCell 
        if(hintCell){
            hintCell.classList.remove('hintCell');
            setHintCell(null); 
        }

        // reset magnified cell
        const magnifiedCell = document.getElementById('magnified-cell');
        if(magnifiedCell){
            magnifiedCell.children[0].innerText = '';
            magnifiedCell.children[1].innerText = '';
        }

    }

    async function getHint(evt){
        const flatPuzzle = flattenPuzzle(sudoku); 
        const url = 'https://steven-sudoku-api.herokuapp.com/sudoku/analysis?puzzle=' + flatPuzzle;
        const {position, value, solveWith} = await fetch(url)
            .then(resp => {
                if(!resp.ok){
                    throw new Error('Error! Status:', resp.status); 
                }
                return resp.json(); 
            })
            .then(data =>{ 
                return data.data;
            })
            .catch(err => console.error(err));

        const cellId = '#sudoku-cell-' + (position[0] - 1) + '-' + (position[1] - 1);
        const cell = document.querySelector(cellId);
        
        if(hintCell){
            hintCell.classList.remove('hintCell'); 
            setHintCell(null);
            return;
        }

        cell.classList.add('hintCell');
        setHintCell(cell);
        if(selectedCell){
            selectedCell.classList.remove('selected-cell');
        }
        setSelectedCell(cell);
        
        document.querySelector('#sudoku-pad-values').focus();
        let hint = 'row: ' + position[0] +' col: ' + position[1] + ' can be solved with: ' + solveWith + ' to value: ' + value;
        alert(hint); 
    }

    async function selectPuzzle(evt){
        let level = evt.target.value; 
        const puzzle = await getPuzzle(level); 
        orignialSudoku.current = puzzle;
        resetBoard(); 
        setSudoku(copySudoku(puzzle));
    }


    React.useEffect(()=>{
        async function loadPuzzle(){
            const puzzle = await getPuzzle('one');
            orignialSudoku.current = puzzle; 
            setSudoku(copySudoku(puzzle));
        }
        loadPuzzle();
        hintButton.current = document.getElementById('hint-button'); 
    }, []);

    if(!sudoku) return '';

    return (
        <div className='sudoku-board'>
            <div className='sudoku-board-sudoku-grid'>
                <SudokuGrid setHintCell={setHintCell} hintCell={hintCell} setSelectedCell={setSelectedCell} invalidCell={invalidCell} sudoku={sudoku} originalSudoku={orignialSudoku.current} />
            </div>
            <div className='sudoku-board-sudoku-pad'>
                <SudokuPad selectedCell={selectedCell} update={update} sudoku={sudoku} setSudoku={setSudoku} />
            </div>
            {selectedCell ? <div className='sudoku-board-magnified-cell'><MagnifiedCell selectedCell={selectedCell} /></div> : null}
            <div className='clearFloat'></div>

            <div><button onClick={getHint} id='hint-button'>Get Hint</button></div>
            <select onChange={selectPuzzle}>
                <option value='one'>Level One</option>
                <option value='two'>Level Two</option>
                <option value='three'>Level Three</option>
                <option value='four'>Level Four</option>
                <option value='five'>Level Five</option>
            </select>
        </div>
    );


};




export default SudokuBoard;