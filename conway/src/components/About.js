import React from 'react';

const About = () => {
    return (
        <div className="aboutContainer">
            <h3>About this Algorithm</h3>
            <p >Conway's Game of Life ("Life") is a cellular automaton created by the British mathematician John Conway in 1970. The game is a cellular automaton where each grid state relies on the previous grid state. Life's universe, or grid, is theoretically infinite, and  the game is able to express logic through different complex patterns created from specific cell arrangements. These characteristics make Life Turing-complete.</p>
            <h3>Implementation and Optimization</h3>
            <p>The above implementation of Life utilizes a 2D array and an inner loop to check neighboring cells. The inner loop uses the count of live neighboring cells to determine whether each cell will be alive or dead in the following grid state. The entire grid state is updated in a new 2D array before replacing the previous grid. This implementation is sufficient for a smaller grid size, but is far from optimized, and the simulation becomes slower as the grid grows. The fastest and most famous optimization for Life is Bill Gosper's Hashlife algorithm, which utilizes memoization and a quad-tree data structure.</p>
        </div>
    )
}

export default About;