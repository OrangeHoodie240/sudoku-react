import React, { useEffect } from 'react';
import './SudokuCell.css';


const SudokuCell = ({cellRow, cellCol, value=5, given})=>{
    let outerCell = React.useRef(null);
    const notGiven = !given;
    

    React.useEffect(()=>{
        outerCell.current = document.getElementById('SudokuCell-' + cellRow + ',' + cellCol);
    }, []); 

    return (<>
                        <div id={'SudokuCell-' + cellRow + ',' + cellCol} data-row={cellRow} data-col={cellCol} className='outer-cell' data-not-given={notGiven}>
                            <div className='upper-cell'>{(notGiven) ? '' : value}</div>
                            <div className='lower-cell' data-notes=''></div>
                        </div>
                    
            </>);
}; 



export default SudokuCell;