// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Load notes from the JSON file
let notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));

// Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  };

  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));

  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteIdToRemove = req.params.id;

  notes = notes.filter(note => note.id !== noteIdToRemove);
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));

  res.send("Note deleted.");
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Start the server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
