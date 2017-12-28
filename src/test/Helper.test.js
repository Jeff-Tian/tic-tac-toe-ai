import React from 'react';
import ArrayHelper from '../Helpers/ArrayHelper';

let a = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

test('array helper index = 0', () => {
    expect(ArrayHelper.getPositionByIndex(a, 0)).toEqual({col: 1, row: 1});
});

test('array helper index = 1', () => {
    expect(ArrayHelper.getPositionByIndex(a, 1)).toEqual({col: 2, row: 1});
});
test('array helper index = 2', () => {
    expect(ArrayHelper.getPositionByIndex(a, 2)).toEqual({col: 3, row: 1});
});

test('array helper index = 3', () => {
    expect(ArrayHelper.getPositionByIndex(a, 3)).toEqual({col: 1, row: 2});
});

test('array helper index = 4', () => {
    expect(ArrayHelper.getPositionByIndex(a, 4)).toEqual({col: 2, row: 2});
});

test('array helper index = 5', () => {
    expect(ArrayHelper.getPositionByIndex(a, 5)).toEqual({col: 3, row: 2});
});

test('array helper index = 6', () => {
    expect(ArrayHelper.getPositionByIndex(a, 6)).toEqual({col: 1, row: 3});
});

test('array helper index = 7', () => {
    expect(ArrayHelper.getPositionByIndex(a, 7)).toEqual({col: 2, row: 3});
});

test('array helper index = 8', () => {
    expect(ArrayHelper.getPositionByIndex(a, 8)).toEqual({col: 3, row: 3});
});

test('find index of max', () => {
    expect(ArrayHelper.findIndexOfMax([1, 2, 3, 4, 5])).toEqual(4);
})