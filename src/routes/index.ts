import express from 'express'
import user from './user'

const server = express()

server.use('/user', user)

export default server