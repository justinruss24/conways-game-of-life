import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import "../App.css";



const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
];



const Game = () => {
    const [dimension, setDimension] = useState(25)
    const numRows = dimension;
    const numCols = numRows;
    const [gen, setGen] = useState(0);
    const [run, setRun] = useState(false);
    const emptyGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        }
        setGen(0)
        return rows;
    }
    const [grid, setGrid] = useState(() => {
        return emptyGrid()
    });
    const runRef = useRef();
    runRef.current = run

    const runGame = useCallback(() => {
        if (!runRef.current) {
            return;
        }
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newK = k + y;
                            // checking the bounds of the grid
                            // if we have a live call = 1, it adds one to the neighbors
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbors += g[newI][newK]
                            }
                        })
                        // determines what happens to the cells
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0;
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1;
                        }
                    }
                }
            })
        })
        setGen(prevState => prevState + 1)
        setTimeout(runGame, 500);
    }, []);

    return (
        <>
        <button className="btn"
            onClick={() => {
                setRun(!run);
                // set runRef current to true in case the state does not update in time
                if (!run) {
                    runRef.current = true;
                    runGame();}}}>
            {run ? "STOP" : "START"}
        </button>
        <button className="btn" onClick={() => {setGrid(emptyGrid())}}>
            CLEAR
        </button>
        <button className="btn" onClick={() => {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)))}
                setGrid(rows)}}>
            RANDOM
        </button>
            <div>
                <h2>Generation Count: {gen}</h2>
            </div>
            <div className="gridContainer">
                <div className="gameGrid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${numCols}, 20px)`,
                    }}
                >
                    {grid.map((rows, i) =>
                        rows.map((col, k) => (
                            <div
                                key={`${i}-${k}`}
                                onClick={() => {
                                    const newGrid = produce(grid, (gridCopy) => {
                                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                    });
                                    setGrid(newGrid);
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: grid[i][k] ? "black" : undefined,
                                    border: "1px solid black",
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
            
        </>
    )
}

export default Game;