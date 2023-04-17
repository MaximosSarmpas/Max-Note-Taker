// Dependencies
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


// Convert callback-based functions to Promise-based functions
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

// Define a class called Save
class Save {
    
    // Define a method called write that writes the note object to the 'db/db.json' file
    write(note) {
        return writeNote("db/db.json", JSON.stringify(note));
    }

    read() {
        return readNote("db/db.json", "utf8");
    }

    retrieveNotes(){
        return this.read().then(notes => {
            let parsedNotes;
            try{
                parsedNotes = [].concat(JSON.parse(notes));
            }
            catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(note) {
        
         // Validate that the note object has both a title and text property
        const { title, text } = note;
        if(!title || !text) {
            throw new Error('Both title and text can not be blank');
        }

        //Use UUID package to add unique IDs
        const newNote = { title, text, id: uuidv4() };

         // Retrieve the existing notes, add the new note object, and write the updated array of notes to the 'db/db.json' file
        return this.retrieveNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }
        // Define a method called deleteNote that removes a note object with the specified ID from the 'db/db.json' file 
    deleteNote(id) {
        
          // Retrieve the existing notes, filter out the note with the specified ID, and write the updated array of notes to the 'db/db.json' file
        return this.retrieveNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Save();
