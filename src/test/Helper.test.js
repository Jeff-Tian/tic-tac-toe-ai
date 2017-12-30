import React from 'react';
import ArrayHelper from '../Helpers/ArrayHelper';

let a = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

test('array helper index = 0', () => {
    expect(ArrayHelper.getRowColumnByIndex(a, 0)).toEqual({col: 1, row: 1});
});

test('array helper index = 1', () => {
    expect(ArrayHelper.getRowColumnByIndex(a, 1)).toEqual({col: 2, row: 1});
});
test('array helper index = 2', () => {
    expect(ArrayHelper.getRowColumnByIndex(a, 2)).toEqual({col: 3, row: 1});
});

test('array helper index = 3', () => {
    expect(ArrayHelper.getRowColumnByIndex(a, 3)).toEqual({col: 1, row: 2});
});

test('array helper index = 4', () => {
    expect(ArrayHelper.getRowColumnByIndex(a, 4)).toEqual({col: 2, row: 2});
});

test('array helper index = 5', () => {
    expect(ArrayHelper.getRowColumnByIndex(a, 5)).toEqual({col: 3, row: 2});
});

test('array helper index = 6', () => {
    expect(ArrayHelper.getRowColumnByIndex(a, 6)).toEqual({col: 1, row: 3});
});

test('array helper index = 7', () => {
    expect(ArrayHelper.getRowColumnByIndex(a, 7)).toEqual({col: 2, row: 3});
});

test('array helper index = 8', () => {
    expect(ArrayHelper.getRowColumnByIndex(a, 8)).toEqual({col: 3, row: 3});
});

test('array helper index = 8 for 1 dimension array', () => {
    expect(ArrayHelper.getRowColumnByIndex([1, 1, 1, 2, 2, 2, 3, 3, 3], 8)).toEqual({col: 3, row: 3});
})

test('find index of max', () => {
    expect(ArrayHelper.findIndexOfMax([1, 2, 3, 4, 5])).toEqual(4);
})

test('find index of max for reversed array', () => {
    expect(ArrayHelper.findIndexOfMax([5, 4, 3, 2, 1])).toEqual(0);
})