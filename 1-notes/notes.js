const fs = require('fs');
const chalk = require('chalk');

const fetchNotes = () => {
    try {
        const notesString = fs.readFileSync('note-data.json', { encoding: 'utf8', flag : 'as+'});
        const notes = JSON.parse(!!notesString ? notesString: '[]');
        if(!Array.isArray(notes)){
            saveNotes([]);
            return [];
        }
        return notes;
    } catch(e){
        console.error(e)
        return [];
    }
};

const saveNotes = (notes) => fs.writeFileSync('note-data.json', JSON.stringify(notes));

const findNote = (notes, title) => notes.find( (note) => note.title === title);

const logNote = (note, id ) => {
    console.log(`----     ${id}     ----`);
    console.log(chalk.blue("Title: "), note.title);
    console.log(chalk.blue("Body: "), note.body);
};

const addNote = (title, body) => {
    const note = {title, body};
    const notes = fetchNotes();
    if(!findNote(notes, title)){
        notes.push(note);
        saveNotes(notes);
        console.log(chalk.green(`----   "${title}" Note was saved    ----`));
    } else {
        console.log(chalk.yellow(`----   "${title}" Note already exists    ----`));
    }
};

const getAll = () => {
    fetchNotes().forEach((note, i) => {
        logNote(note, i);
    });
};

const getNote = (title) => {
    const note = findNote(fetchNotes(), title);
    if(note){
        logNote(note, "Note");
    } else {
        console.log(chalk.yellow(`----   "${title}" Note does not exit    ----`));
    }
};

const removeNote = (title) => {
    let notes = fetchNotes();
    const note = findNote(notes, title);
    if(note){
        notes = notes.filter( (n) => n.title !== title );
        saveNotes(notes);
        console.log(chalk.red(`----   "${title}" Note was removed    ----`));
    } else {
        console.log(chalk.yellow(`----   "${title}" Note does not exit    ----`));
    }
};


module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};