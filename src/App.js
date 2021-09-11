import './App.css';
import React from 'react';
import SudokuBoard from './SudokuBoard/SudokuBoard.js';
import NavBar from './NavBar/NavBar';
import SavedPuzzles from './SavedPuzzles/SavedPuzzles';

function App() {
  const [puzzleInfo, setPuzzleInfo] = React.useState(null); 
  const [viewSavedPuzzles, setViewSavedPuzzles] = React.useState(false);
  const [isSavedPuzzleUsed, setIsSavedPuzzleUsed] = React.useState(false);

  return (<>
            <NavBar viewSavedPuzzles={viewSavedPuzzles} isSavedPuzzleUsed={isSavedPuzzleUsed} puzzleInfo={puzzleInfo} setViewSavedPuzzles={setViewSavedPuzzles} />
            <div id='message-div'></div>
            
            {(!viewSavedPuzzles) ?  <SudokuBoard setIsSavedPuzzleUsed={setIsSavedPuzzleUsed} setPuzzleInfo={setPuzzleInfo} puzzleInfo={puzzleInfo} /> : <SavedPuzzles setIsSavedPuzzleUsed={setIsSavedPuzzleUsed} setPuzzleInfo={setPuzzleInfo} setViewSavedPuzzles={setViewSavedPuzzles} />}
  </>);
}

export default App;
