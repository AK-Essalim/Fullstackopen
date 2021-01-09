const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'started a new blog',
        author: 'Abdelkarim',
        url: 'http://AK-Essalim.com',
        likes: 11,
        user: '5ff94961b4df5c688597f090',
    },
    {
        title: 'Work in progress',
        author: 'Osama',
        url: 'HTTP://localohost:2222',
        likes: 4,
        user: '5ff94961b4df5c688597f090',
    },
    {
        title: 'Jaffa on Hyvää',
        author: 'Juice',
        url: 'www.jaffa.fi',
        likes: 543,
        user: '5ff94a9c2d041574cc938768',
    },
    {
        title: 'Got a new show with hubby',
        author: 'Wanda Maximoff',
        url: 'http://marvel.com',
        likes: 5,
        user: '5ff94a9c2d041574cc938768',
    },
    {
        title: 'Pizza, that\'s the title',
        author: 'Peter Parker',
        url: 'http://www.google.fi',
        likes: 87,
        user: '5ff94b05342bb27b9a2ba959',
    },
]

const initialUsers = [
    {
        username: 'spiderman',
        name: 'Peter Parker',
        passwordHash:
      '$2b$10$B6ejAHaem/4ysOtgJNI2Z.qnSQBzPUz4FwMtGIAkzN1HBn0Tdsmju',
    },
    {
        username: 'heroes',
        name: 'Peter Petrelli',
        passwordHash:
      '$2b$10$dm2OmkiiAUin0V3kDn/ifemrNRh/Hyq650zkCjg6gFo33z7TSvnsa',
    },
    {
        username: 'ironman',
        name: 'Tony Stark',
        passwordHash:
      '$2b$10$vYFmi7AgPsN1GBiyMP.vderGtXkTZ6.uiNmAPrXCnToqfNhkWEb2a',
    },
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethissoon',
        url: 'http://delete.com',
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map((user) => user.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
    initialUsers,
}
