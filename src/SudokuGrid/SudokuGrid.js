import React from "react";
import SudokuCell from "../SudokuCell/SudokuCell";
import './SudokuGrid.css';


const SudokuGrid = ({setSelectedCell, sudoku, originalSudoku, invalidCell}) => {
    const gridDiv = React.useRef(null);


    function onClick({ target }) {
        if (target !== gridDiv) {
            target = target.parentElement;

            if(target.getAttribute('data-not-given') === 'false') return;
            
            if(invalidCell && target !== invalidCell){
                invalidCell.classList.remove('selected-cell');
                return;
            }

            const children = gridDiv.current.children;
            const childrenLength = children.length;
            let selectedCell = null;
            for (let i = 0; i < childrenLength; i++) {
                const child = children[i];
                if (child === target) {
                    child.classList.add('selected-cell');
                    selectedCell = child;     
                }
                else {
                    child.classList.remove('selected-cell');
                }

            }
            setSelectedCell(selectedCell);
            document.querySelector('.sudoku-pad-values').focus();
        }
    }


    const gridArray = [];
    for (let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++){
            let given = (originalSudoku[i][j] !== '0') ? true : false; 
            gridArray.push(<SudokuCell cellRow={i} cellCol={j} value={sudoku[i][j]} given={given}/>);
        }
    }

    React.useEffect(() => {
        gridDiv.current = document.getElementById('grid-div');
    }, []);


    return (
        <div className='grid-div' id='grid-div' onClick={onClick}>
            {gridArray}
        </div>
    );
};


export default SudokuGrid;