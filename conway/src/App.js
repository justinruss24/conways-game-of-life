import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';

const numRows = 50;
const numCols = 50;

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

const emptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
}



function App() {

  const [grid, setGrid] = useState(() => {
    return emptyGrid()
  });
  // const toggleBox = () => {
  //   const newGrid = produce(grid, (gridCopy) => {
  //     gridCopy[i][k] = 1;
  //   });
  //   setGrid(newGrid);
  // };
  const [run, setRun] = useState(false);
  // const randomGrid = () => {
  //   const rows = [];
  //   for (let i = 0; i < numRows; i++) {
  //     rows.push(
  //       Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
  //     );
  //   }
  //   setGrid(rows);
  // };

  const runRef = useRef();
  runRef.current = run

  const runGame = useCallback(() => {
    if (!runRef.current) {
      return;
    }
    setGrid(g => {
      return produce(g, gridCopy => {
        for(let i = 0; i < numRows; i++){
          for(let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              // checking the bounds of the grid
              // if we have a live call = 1, it adds one to the neighbors
              if(newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
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
    
    setTimeout(runGame, 1000); 
  }, []);
  
  return (
    <>
      <button
        onClick={() => {
          setRun(!run);
          // set runRef current to true in case the state does not update in time
          if (!run) {
            runRef.current = true;
            runGame();
          }
        }}
      >
        {run ? "STOP" : "START"}
      </button>
      <button
        onClick={() => {
          setGrid(emptyGrid());
        }}
      >
        CLEAR
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }
          setGrid(rows);
        }}
      >
        RANDOM
      </button>
      <div
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
    </>
  );
}

export default App;
