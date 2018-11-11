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
        ai.setWeights([0, 1, 1]);
    ai.learn(lastSquares, currentSquares);
    expect(ai.getWeights()).toEqual([-0.15707963267948966, 0.8429203673205103, 1.1570796326794897]);
})
