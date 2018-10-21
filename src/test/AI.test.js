import React from 'react';
import AI from '../Game/AI';

test('AI can set weights', () => {
    let currentWeights = [0, 1, 1, 1];

    let ai = new AI(false);
    ai.setWeights(currentWeights);
    expect(ai.getWeights()).toEqual(currentWeights);
});

test('AI can update weights by itself', () => {
    let lastSquares = [
        -1, 0, 1,
        -1, 0, 0,
        0, 0, 0
    ];
    let currentSquares = [
        -1, 0, 1,
        -1, 1, 0,
        -1, 0, 0
    ];

    let ai = new AI(false);
    ai.setWeights([0, 1, 1, 0, 0]);
    ai.learn(lastSquares, currentSquares);
    expect(ai.getWeights()).toEqual([-10.3, -9.3, -19.6, 0, 0]);
});

test('AI can get latest factors', () => {
    let ai = new AI(false);

    expect(ai.getFactors()).toBeDefined();
});

test.skip('AI can choose the best move', () => {
    let ai = new AI(false);
    ai.setWeights([-230.53, -141.38, 16.38, -254.83, -37.76])
    let squares = [
        -1, 0, -1,
        0, 1, 0,
        1, -1, 0
    ];
    let nextMove = AI.nextMove(squares, ai.getWeights(), false, true);
    expect(nextMove).toEqual(1);
});