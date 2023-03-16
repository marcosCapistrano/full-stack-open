import { Router, response } from "express";
import jwt from 'jsonwebtoken';
import Note from '../models/note.js';
import User from '../models/user.js';

const getTokenFrom = request => {
  const auth = request.get('authorization')

  if(auth && auth.startsWith('Bearer')) {
    return auth.replace('Bearer ', '');
  }

  return null;
}

const router = Router();

router.get("/", async (req, res) => {
  const notes = await Note.find({}).populate('user', {username: 1, name: 1});
  res.json(notes);
});

router.get("/:id", async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note) res.json(note);
    else res.status(404).end();
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if(!decodedToken.id)
    return response.status(401).json({error: 'token invalid'})
  const user = await User.findById(decodedToken.id);

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  });

  const savedNote = await note.save();
  console.log(savedNote)

  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  res.json(savedNote);
});

router.delete("/:id", async (request, response, next) => {
  try {
    const deleted = await Note.findByIdAndDelete(request.params.id);

    response.status(204).end();
  } catch(err) {
    next(err);
  }
});

router.put("/:id", async (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important
  }

  try {
    const edited = await Note.findByIdAndUpdate(request.params.id, note, {new: true});
    response.json(edited);
  } catch(err) {
    next(err);
  }
})

export default router;