import express from 'express'
import user from './user'
import anime from './anime'

const server = express()

server.use('/webhook/user', user)
server.use('/anime', anime)

export default server