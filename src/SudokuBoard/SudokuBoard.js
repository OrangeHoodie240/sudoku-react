import React from "react";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import SudokuPad from "../SudokuPad/SudokuPad";
import MagnifiedCell from "../MagnifiedCell/MagnifiedCell";
import getPuzzle, { copySudoku, isBoardFull, isBoardValid, flattenPuzzle } from "../helpers";
import './SudokuBoard.css';
import HintBox from "../HintBox/HintBox";

const SudokuBoard = () => {
    const [selectedCell, setSelectedCell] = React.useState(null);
    const [invalidCell, setInvalidCell] = React.useState(null);
    const [valid, setValid] = React.useState(true);
    const orignialSudoku = React.useRef(null);
    const [sudoku, setSudoku] = React.useState(null);
    const [hintCell, setHintCell] = React.useState(null);


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
    }, []);

    if(!sudoku) return '';

    return (
        <div className='sudoku-board'>
            
            <div className='sudoku-board-sudoku-grid'>
                <SudokuGrid setHintCell={setHintCell} hintCell={hintCell} setSelectedCell={setSelectedCell} invalidCell={invalidCell} sudoku={sudoku} originalSudoku={orignialSudoku.current} />
            </div>
            <label for='difficulty-selector'>Difficulty: </label>
            <select id='difficulty-selector' className='sudoku-board-select' onChange={selectPuzzle}>
                <option value='one'>Level One</option>
                <option value='two'>Level Two</option>
                <option value='three'>Level Three</option>
                <option value='four'>Level Four</option>
                <option value='five'>Level Five</option>
            </select>
            <div className='sudoku-board-sudoku-pad'>
                <SudokuPad selectedCell={selectedCell} update={update} sudoku={sudoku} setSudoku={setSudoku} />
            </div>
            {selectedCell ? <div className='sudoku-board-magnified-cell'><MagnifiedCell selectedCell={selectedCell} /></div> : null}
            <div className='clearFloat'></div>
            <HintBox sudoku={sudoku} selectedCell={selectedCell} hintCell={hintCell} setHintCell={setHintCell} setSelectedCell={setSelectedCell} resetBoard={resetBoard} />
        </div>
    );


};




export default SudokuBoard;