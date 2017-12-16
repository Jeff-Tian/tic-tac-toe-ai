import React from 'react';
import Computer from '../Game/Computer';

function testBoardScore(squares, weights, score, message) {
    test(message || (score), () => {
        expect(Computer.getBoardScore(squares, weights)).toEqual(score);
    });
}

function testBoardAvailableSpots(squares, spots, message) {
    test('', () => {
        expect(Computer.getSpots(squares)).toEqual(spots);
    });
}

function testGetNewBoards(initialSquares, spots, newBoards) {
    test('', () => {
        expect(Computer.getNewBoardsBySpots(initialSquares, spots)).toEqual(newBoards);
    })
}

const weights = [0, 1, 1, 1, 1, 1, 1, 1, 1];

testBoardScore([
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
], weights, 0);

testBoardScore([
    -1, 0, 0,
    0, 0, 0,
    0, 0, 0
], weights, -3);

testBoardScore([
    -1, 1, 0,
    0, 0, 0,
    0, 0, 0
], weights, -1);

testBoardScore([
    -1, 0, 0,
    0, 1, 0,
    0, 0, 0
], weights, 1);

testBoardScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, -1
], weights, -8, 'lost');

testBoardScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, 0
], weights, -5, 'almost lost');

testBoardScore([
    0, 0, -1,
    0, 0, -1,
    0, 0, 1
], weights, -1, 'fair');

testBoardScore([
    0, 0, 1,
    0, 0, 1,
    0, 0, 0
], weights, 5, 'almost win');

testBoardScore([
    1, -1, 1,
    -1, 1, -1,
    1, -1, 0
], weights, 5, 'win');

testBoardScore([
    1, -1, 1,
    -1, 1, -1,
    1, -1, 1
], weights, 6, 'win');

testBoardAvailableSpots([
    1, 0, 1,
    0, 1, 0,
    0, 0, 0
], [1, 3, 5, 6, 7, 8]);

testGetNewBoards([
    1, 0, 1,
    -1, -1, 0,
    0, 0, -1
], [1, 5, 6, 7], [
    [
        1, 1, 1,
        -1, -1, 0,
        0, 0, -1
    ],
    [
        1, 0, 1,
        -1, -1, 1,
        0, 0, -1
    ],
    [
        1, 0, 1,
        -1, -1, 0,
        1, 0, -1
    ],
    [
        1, 0, 1,
        -1, -1, 0,
        0, 1, -1
    ]
]);