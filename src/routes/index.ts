import express from 'express'
import user from './user'
import anime from './anime'
import category from './category'
import character from './character'
import opening from './opening'
import season from './season'

const server = express()

server.use('/user', user)
server.use('/anime', anime)
server.use('/category', category)
server.use('/character', character)
server.use('/opening', opening)
server.use('/season', season)

export default server