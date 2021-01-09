const listHelper = require('../utils/list_helper')
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0,
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
    },
]

const array1 = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
]

test('dummy returns one', () => {
    const blogit = []

    const result = listHelper.dummy(blogit)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty array is zero', () => {
        const arr = []
        const result = listHelper.totalLikes(arr)

        expect(result).toBe(0)
    })

    test('when list has only one blog equal the likes of that', () => {
        const result = listHelper.totalLikes(array1)

        expect(result).toBe(array1[0].likes)
    })
    test('of a bigger list is calculated correctly', () => {
        const arr = []
        const result = listHelper.totalLikes(blogs)

        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('when array is empty returns null', () => {
        expect(favoriteBlog([{}])).toBeNull()
    })

    test('when testing with all blogs is correct', () => {
        expect(favoriteBlog(blogs)).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        })
    })
    test('when using 1 blog is correct', () => {
        expect(favoriteBlog(array1)).toEqual({
            title: array1[0].title,
            author: array1[0].author,
            likes: array1[0].likes,
        })
    })
    test('MostBlogs return correct result with full array of blogs', () => {
        expect(mostBlogs(blogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3,
        })
    })
    test('MostBlogs return correct result with array of len 1', () => {
        expect(mostBlogs(array1)).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        })
    })
    test('MostBlogs: empty array returns array with empty object', () => {
        let a = []
        expect(mostBlogs(a)).toEqual([])
    })

    test('MostLikes return correct result with full array of blogs', () => {
        expect(mostLikes(blogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        })
    })
    test('MostLikes return correct result with array of len 1', () => {
        expect(mostLikes(array1)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })
    test('MostLikes: empty array returns array with empty object', () => {
        let a = []
        expect(mostLikes(a)).toEqual([])
    })
})
