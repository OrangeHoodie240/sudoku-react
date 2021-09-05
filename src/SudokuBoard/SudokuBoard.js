import React from "react";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import SudokuPad from "../SudokuPad/SudokuPad";
import getThisSudoku, { copySudoku, isBoardFull, isBoardValid } from "../helpers";


const SudokuBoard = () => {
    const [selectedCell, setSelectedCell] = React.useState(null);
    const [invalidCell, setInvalidCell] = React.useState(null);
    const [valid, setValid] = React.useState(true); 
    const orignialSudoku = React.useRef(getThisSudoku());
    const [sudoku, setSudoku] = React.useState(copySudoku(orignialSudoku.current));

    const testIfInvalid = isBoardValid(sudoku);
    if(valid && !testIfInvalid){
        selectedCell.classList.add('invalid-cell');
        setValid(false);
        setInvalidCell(selectedCell);
    }
    else if(!valid && testIfInvalid){
        invalidCell.classList.remove('invalid-cell');
        setValid(true);
        setInvalidCell(null);
    }

    if (isBoardFull(sudoku) && valid) {
        alert('you win!');
    }

    return (<>
        <SudokuGrid setSelectedCell={setSelectedCell} invalidCell={invalidCell} sudoku={sudoku} originalSudoku={orignialSudoku.current} />
        <br />
        <SudokuPad selectedCell={selectedCell} sudoku={sudoku} setSudoku={setSudoku} />
    </>);


};




export default SudokuBoard;