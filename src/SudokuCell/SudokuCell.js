import React, { useEffect } from 'react';
import './SudokuCell.css';


const SudokuCell = ({cellRow, cellCol, value=5, given})=>{
    let outerCell = React.useRef(null);
    const notGiven = !given;
    const upperCellClasses = (given) ? 'upper-cell given' : 'upper-cell';     

    React.useEffect(()=>{
        outerCell.current = document.getElementById('sudoku-cell-' + cellRow + '-' + cellCol);
    }, []); 

    return (<>
                        <div id={'sudoku-cell-' + cellRow + '-' + cellCol} data-row={cellRow} data-col={cellCol} className='outer-cell' data-not-given={notGiven}>
                            <div className={upperCellClasses}>{(notGiven) ? '' : value}</div>
                            <div className='lower-cell' data-notes=''></div>
                        </div>
                    
            </>);
}; 



export default SudokuCell;