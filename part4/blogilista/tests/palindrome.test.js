const palindrome = require('../utils/for_testing').palindrome
require('jest')

test('palindrome of a', () => {
    const a = palindrome('a')
    expect(a).toBe('a')
})

test('palindrome of react', () => {
    const a = palindrome('react')
    expect(a).toBe('tcaer')
})

test('palindrome of saippuakauppias', () => {
    const a = palindrome('saippuakauppias')
    expect(a).toBe('saippuakauppias')
})

const average = require('../utils/for_testing').average

describe('average', () => {
    test('of one value is the value itself', () => {
        expect(average([1])).toBe(1)
    })

    test('of many is calculated right', () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })

    test('of empty array is zero', () => {
        expect(average([])).toBe(0)
    })
})
