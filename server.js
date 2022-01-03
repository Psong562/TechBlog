Skip to content
Why GitHub ?
  Team
Enterprise
Explore
Marketplace
Pricing
Search
Sign in
  Sign up
LohasOT
  /
  TechBlog
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
TechBlog / server.js /
@LohasOT
LohasOT getting assets
Latest commit f4f6357 yesterday
History
1 contributor
43 lines(32 sloc)  1.01 KB

require('dotenv').config()

const express = require('express')
const { join } = require('path')

const passport = require('passport')
const { User, Post, Note } = require('./models')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, async function ({ id }, cb) {
  try {
    const user = await User.findOne({ where: { id }, include: [Post, Note] })
    cb(null, user)
  } catch (err) {
    cb(err, null)
  }
}))

app.use(require('./routes'))

async function init() {
  await require('./db').sync()
  app.listen(process.env.PORT || 3000)
}

init()
