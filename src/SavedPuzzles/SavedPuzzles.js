import React, { useEffect } from "react";
import { convertTo2DArray } from "../helpers";

const SavedPuzzles = ({ setPuzzleInfo, setViewSavedPuzzles, setIsSavedPuzzleUsed }) => {
    const [savedPuzzles, setSavedPuzzles] = React.useState([]);



    React.useEffect(() => {
        async function loadSavedPuzzles() {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            const url = 'https://steven-sudoku-api.herokuapp.com/saved-puzzles/' + id + '?token=' + token;

            let resp = await fetch(url)
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Error Status', resp.status);
                    }
                    return resp.json();
                })
                .then(data => data)
                .catch(err => console.error(err));
            setSavedPuzzles(resp.puzzles);
        }
        loadSavedPuzzles();
    }, []);


    async function onLoadPuzzle({ target }) {
        target = target.parentElement;
        const level = target.getAttribute('data-level');
        let puzzle = target.getAttribute('data-puzzle');
        puzzle = convertTo2DArray(puzzle);
        const puzzleId = target.getAttribute('data-puzzle-id');
        setPuzzleInfo({ level, puzzle, puzzleId });
        setViewSavedPuzzles(val => !val);
        setIsSavedPuzzleUsed(true);
    }


    async function onDeletePuzzle({ target }) {
        target = target.parentElement;
        const level = target.getAttribute('data-level');
        const puzzleId = target.getAttribute('data-puzzle-id');

        const url = 'https://steven-sudoku-api.herokuapp.com/saved-puzzles';
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        const settings = {
            method: 'DELETE',
            body: JSON.stringify({ token, id, level, puzzleId }),
            headers: { 'Content-Type': 'application/json' }
        };

        await fetch(url, settings)
            .then(resp => {
                if (!resp.ok()) {
                    throw new Error("Error Status: ", resp.status);
                }
                return resp.json();
            })
            .then(data => data)
            .catch(err => console.error(err));


        let resp = await fetch(url + '/' + id + '?token=' + token)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error Status', resp.status);
                }
                return resp.json();
            })
            .then(data => data)
            .catch(err => console.error(err));
        setSavedPuzzles(resp.puzzles);
    }


    const puzzleList = savedPuzzles.map(puzzle => {
        return <li data-level={puzzle.level} data-puzzle={puzzle.puzzle} data-puzzle-id={puzzle.puzzle_id}>Puzzle Level {puzzle.level} <button onClick={onLoadPuzzle}>Load</button> <button onClick={onDeletePuzzle}>Delete</button></li>;
    });

    return (<div id='saved-puzzles'>
        <h2>Saved Puzzles</h2>
        {(savedPuzzles) ? <ul>{puzzleList}</ul> : <p>No puzzles saved</p>}
    </div>);
};


export default SavedPuzzles;