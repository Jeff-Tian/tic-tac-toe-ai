import React from 'react';
import ComputerExpert from '../Game/ComputerExpert';

test('computer expert', () => {
    expect(ComputerExpert.findIndexOfMax([1, 2, 3, 4, 5])).toEqual(4);
});


test('next move', () => {
    let initialBoard = [
        -1, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];

    expect(ComputerExpert.nextMove(initialBoard)).toEqual(4);

    initialBoard = [
        1, 0, 0,
        -1, -1, 0,
        0, 0, 0
    ];

    // expect(ComputerExpert.nextMove(initialBoard)).toEqual(5);
});