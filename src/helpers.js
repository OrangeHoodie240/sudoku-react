


function getThisSudoku() {
    return [
        [
            '0', '2', '3',
            '0', '5', '6',
            '7', '8', '0'
        ],
        [
            '0', '0', '7',
            '2', '0', '0',
            '1', '0', '0'
        ],
        [
            '9', '0', '8',
            '1', '0', '0',
            '0', '0', '0'
        ],
        [
            '0', '0', '0',
            '5', '0', '4',
            '8', '6', '7'
        ],
        [
            '0', '0', '0',
            '0', '7', '0',
            '0', '0', '0'
        ],
        [
            '0', '0', '0',
            '0', '2', '0',
            '5', '0', '4'
        ],
        [
            '0', '0', '0',
            '0', '0', '0',
            '0', '7', '0'
        ],
        [
            '4', '0', '2',
            '0', '0', '0',
            '0', '0', '0'
        ],
        [
            '7', '1', '0',
            '0', '0', '2',
            '0', '0', '3'
        ]
    ];
}

function copySudoku(sudoku) {
    const copy = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(sudoku[i][j]);
        }
        copy.push(row);
    }
    return copy;
}

function isBoardFull(sudoku) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] === '0') return false;
        }
    }
    return true;
}

function isBoardValid(sudoku) {
    // check by rows
    for (let i = 0; i < 9; i++) {
        let row = sudoku[i];

        // test if any duplicates occur
        const count = row.reduce((a, b) => {
            if (b === '0') return a;
            if (a[b]) {
                a.areDuplicates = true;
            }
            else {
                a[b] = 1;
            }
            return a;
        }, {});

        if (count.areDuplicates) {
            return false;
        }
    }


    for (let i = 0; i < 9; i++) {
        // get columns
        let col = [];
        for (let j = 0; j < 9; j++) {
            col.push(sudoku[j][i]);
        }

        // test if any duplicates occur
        const count = col.reduce((a, b) => {
            if (b === '0') return a;
            if (a[b]) {
                a.areDuplicates = true;
            }
            else {
                a[b] = 1;
            }
            return a;
        }, {});

        if (count.areDuplicates) {
            return false;
        }
    }

    for (let i = 0; i < 9; i += 3) {
        // get boxes
        let boxes = [[], [], []];
        for (let j = 0; j < 3; j++) {
            const rowA = [];
            const rowB = [];
            const rowC = [];
            for (let k = 0; k < 3; k++) {
                rowA.push(sudoku[j + i][k]);
                rowB.push(sudoku[j + i][k + 3]);
                rowC.push(sudoku[j + i][k + 6]);

            }
            boxes[0].push(...rowA);
            boxes[1].push(...rowB);
            boxes[2].push(...rowC);
        }
        for (let box of boxes) {
            //test if any duplicates occur 
            // test if any duplicates occur
            const count = box.reduce((a, b) => {
                if (b === '0') return a;
                if (a[b]) {
                    a.areDuplicates = true;
                }
                else {
                    a[b] = 1;
                }
                return a;
            }, {});

            if (count.areDuplicates) {
                return false;
            }
        }
    }
    return true;
}

export default getThisSudoku;
export { copySudoku, isBoardFull, isBoardValid };