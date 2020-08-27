import React from 'react';

const Rules = () => {
    return (
        <div className="rulesContainer">
            <h2>Rules</h2>
            <h4>The Game of Life is a cellular automaton where each cell in a typically two-dimensional grid can have two different states, "alive" or "dead". Each cell's behavior is based on it's eight surrounding neighbors, and each generation of the grid is a pure function of the previous grid state.</h4>
            <p>For each generation, the grid transitions based on the following rules:</p>
            <ul>
                <li >If a cell is dead and has less than 2 live neighbors, it dies, as if by underpopulation.</li>
                <li>If a cell is dead and has exactly 3 live neighbors, it becomes alive, as if by reproduction.</li>
                <li>If a cell is alive and has more than 3 live neighbors, it dies, as if by overpopulation.</li>
                <li>If a cell is alive and has 2 or 3 live neighbors, it remains alive.</li>
            </ul>
        </div>
    )
}

export default Rules;