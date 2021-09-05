import React from "react";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import SudokuPad from "../SudokuPad/SudokuPad";
import MagnifiedCell from "../MagnifiedCell/MagnifiedCell";
import getThisSudoku, { copySudoku, isBoardFull, isBoardValid } from "../helpers";
import './SudokuBoard.css';

const SudokuBoard = () => {
    const [selectedCell, setSelectedCell] = React.useState(null);
    const [invalidCell, setInvalidCell] = React.useState(null);
    const [valid, setValid] = React.useState(true);
    const orignialSudoku = React.useRef(getThisSudoku());
    const [sudoku, setSudoku] = React.useState(copySudoku(orignialSudoku.current));
    
    // for updating entire board from within child
    const [_, update] = React.useState(null);

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

    return (
        <div className='sudoku-board'>
            <div className='sudoku-board-sudoku-grid'>
                <SudokuGrid setSelectedCell={setSelectedCell} invalidCell={invalidCell} sudoku={sudoku} originalSudoku={orignialSudoku.current} />
            </div>
            <div className='sudoku-board-sudoku-pad'>
                <SudokuPad selectedCell={selectedCell} update={update} sudoku={sudoku} setSudoku={setSudoku} />
            </div>
            {selectedCell ? <div className='sudoku-board-magnified-cell'><MagnifiedCell selectedCell={selectedCell} /></div> : null}
            <div className='clearFloat'></div>
        </div>
    );


};




export default SudokuBoard;