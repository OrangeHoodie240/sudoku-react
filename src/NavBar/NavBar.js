import React from "react";
import { flattenPuzzle } from "../helpers";
import './NavBar.css';


const NavBar = ({ puzzleInfo, setViewSavedPuzzles, isSavedPuzzleUsed, viewSavedPuzzles }) => {
    const [loginState, setLoginState] = React.useState({ email: '', password: '' });
    const [registerState, setRegisterState] = React.useState({ email: '', password: '' });
    const [loggedInStatus, setLoggedInStatus] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedInStatus(true);
        }
    }, []);

    async function submitLogin(evt) {
        evt.preventDefault();

        let email = evt.target.querySelector('input[name="email"]');
        let password = evt.target.querySelector('input[name="password"]');

        const url = 'https://steven-sudoku-api.herokuapp.com/authenticate/login';
        const obj = {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify({ password: password.value, email: email.value })
        };

        let resp = await fetch(url, obj)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error: Status', resp.status);
                }
                return resp.json();
            })
            .then(data => {
                return data;
            })
            .catch(err => console.error(err));

        if (resp && resp.success) {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('id', resp.id);
            email.value = '';
            password.value = '';
            document.getElementById('login-error').innerText = '';
            setLoggedInStatus(true);
        }
        else {
            document.getElementById('login-error').innerText = 'Invalid credentials';
        }
    }

    function updateLogin(evt) {
        const obj = {};
        let email = evt.target.parentElement.querySelector('input[name="email"]');
        let password = evt.target.parentElement.querySelector('input[name="password"]');
        obj.email = email.value;
        obj.password = password.value;
        setLoginState(obj);
    }

    async function submitRegister(evt) {
        evt.preventDefault();

        let email = evt.target.querySelector('input[name="email"]');
        let password = evt.target.querySelector('input[name="password"]');

        const url = 'https://steven-sudoku-api.herokuapp.com/authenticate/create-user';
        const obj = {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify({ password: password.value, email: email.value })
        };

        let resp = await fetch(url, obj)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error: Status', resp.status);
                }
                return resp.json();
            })
            .then(data => {
                return data;
            })
            .catch(err => console.error(err));

        if (resp && resp.success) {
            localStorage.setItem('token', resp.token);
            email.value = '';
            password.value = '';
            document.getElementById('register-error').innerText = '';
            setLoggedInStatus(true);
        }
        else {
            document.getElementById('register-error').innerText = 'Invalid credentials';
        }
    }

    function updateRegister(evt) {
        const obj = {};
        let email = evt.target.parentElement.querySelector('input[name="email"]');
        let password = evt.target.parentElement.querySelector('input[name="password"]');
        obj.email = email.value;
        obj.password = password.value;
        setRegisterState(obj);
    }

    function onLogOut(evt) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setLoggedInStatus(false);
    }

    async function onSavePuzzle(evt) {
        const puzzle = puzzleInfo.puzzle;
        const level = puzzleInfo.level;
        const puzzleId = puzzleInfo.puzzleId;
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const url = 'https://steven-sudoku-api.herokuapp.com/saved-puzzles';
        const obj = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ puzzle, level, puzzleId, token, id })
        };

        let resp = await fetch(url, obj)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error: Status', resp.status);
                }
                return resp.json();
            })
            .then(data => {
                return data;
            })
            .catch(err => console.error(err));

    }

    async function onUpdatePuzzle(evt) {
        const puzzle = puzzleInfo.puzzle;
        const level = puzzleInfo.level;
        const puzzleId = puzzleInfo.puzzleId;
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const url = 'https://steven-sudoku-api.herokuapp.com/saved-puzzles';
        const obj = {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify({ puzzle, level, puzzleId, token, id })
        };
        let resp = await fetch(url, obj)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error: Status', resp.status);
                }
                return resp.json();
            })
            .then(data => {
                return data;
            })
            .catch(err => console.error(err));

    }

    async function onViewSavedPuzzles(evt) {
        if(!viewSavedPuzzles){
           evt.target.innerText = 'Back To Puzzle';  
        }
        else{
            evt.target.innerText = 'View Saved Puzzles';
        }
        setViewSavedPuzzles(value => !value);
    }

    const logIn = <div id='login'>
        <form onSubmit={submitLogin}>
            <input type='text' placeholder='email' onChange={updateLogin} value={loginState.email} name='email' />
            <input type='password' placeholder='password' onChange={updateLogin} value={loginState.password} name='password' />
            <input type='submit' value='Log In' />
            <span id='login-error' className={'warning'}></span>
        </form>
    </div>;

    const register = <div id='register'>
        <form onSubmit={submitRegister}>
            <input type='text' placeholder='email' onChange={updateRegister} value={registerState.email} name='email' />
            <input type='password' placeholder='password' onChange={updateRegister} value={registerState.password} name='password' />
            <input type='submit' value='Register' />
            <span id='register-error' className={'warning'}></span>
        </form>
    </div>;

    const logOut = <button onClick={onLogOut}>Log Out</button>;
    const savePuzzle = <button id='save-puzzle' onClick={onSavePuzzle} >Save Puzzle</button>;
    const viewSavedPuzzlesButton = <button id='view-saved-puzzles' onClick={onViewSavedPuzzles}>View Saved Puzzles</button>;
    const updatePuzzle = <button id='update-puzzle' onClick={onUpdatePuzzle}>Update Puzzle</button>
    return (
        <nav>
            {(!loggedInStatus) ? logIn : logOut}
            {(!loggedInStatus) ? register : null}
            {(loggedInStatus && !isSavedPuzzleUsed) ? savePuzzle : null}
            {(loggedInStatus && isSavedPuzzleUsed) ? updatePuzzle : null}
            {(loggedInStatus) ? viewSavedPuzzlesButton : null}
            <button><a href='https://orangehoodie240.github.io/sudoku_tutorial/' target="_blank">Tutorial</a></button>
        </nav>
    );
};




export default NavBar;