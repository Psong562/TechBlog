const router = require('express').Router()
const { Post, User, Note } = require('../models')
const passport = require('passport')

// GET all comment
router.get('/notes', passport.authenticate('jwt'), async function (req, res) {
  const notes = await Note.findAll({ include: [User, Post] })
  res.json(notes)
})


router.get('/notes/:id', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.findAll({ where: { pid: req.params.id }, include: [User] })
  res.json(note)
})

// POST one comment
router.post('/notes', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.create({
    body: req.body.body,
    pid: req.body.pid,
    uid: req.user.id
  })
  res.json(note)
})

// DELETE one comment
router.delete('/notes/:id', passport.authenticate('jwt'), async function (req, res) {
  await Note.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})

module.exports = router
