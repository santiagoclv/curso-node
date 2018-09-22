const yargs = require('yargs');
const os = require('os');
const notes = require('./notes.js');

console.log('Starting app.js');

const COMMANDS = {
    read: "read",
    add: "add",
    remove: "remove",
    list: "list"
}

const argv = yargs
    .command('add','Add a new note',{
        title: {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        },
        body: {
            describe: 'Body of note',
            demand: false,
            default: "",
            alias: 'b'
        }
    })
    .command('read','Read a note by title',{
        title: {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        }
    })
    .command('remove','Remove a note by title',{
        title: {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        }
    })
    .command('list','List all the existent notes',{ })
    .help()
    .argv;

//console.log("module.filename",module.filename);
//console.log("globals.Buffer",global.Buffer);
//console.log("process.pid",process.pid);
//console.log("process.env",process.env);
const userData = os.userInfo();
console.log(`Hola ${userData.username}!`);



switch (argv._[0]) {
    case COMMANDS.add:
        notes.addNote(argv.title, argv.body);
        break;
    case COMMANDS.list:
        notes.getAll();
        break;
    case COMMANDS.read:
        notes.getNote(argv.title);
        break;
    case COMMANDS.remove:
        notes.removeNote(argv.title);
        break;
    default:
        console.log("Command Error: ", argv._[0]);
        break;
}

// return 0;
