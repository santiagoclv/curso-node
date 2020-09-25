const yargs = require('yargs');
const chalk = require('chalk');
const { version } = require('./package.json');
const os = require('os');
const notes = require('./notes.js');

console.log = console.log.bind(this, chalk.blue.bold.inverse("Note App"))

//console.log("module.filename",module.filename);
//console.log("globals.Buffer",global.Buffer);
//console.log("process.pid",process.pid);
//console.log("process.env",process.env);
//console.log("process.env",process.env);
const { username } = os.userInfo();
console.log(chalk.green(`Hola ${ username }!`));


yargs.version(version)

yargs.command({
    command: 'version',
    desciption: 'Notes app version',
    handler: () =>  {
        console.log(process.version, version)
    }
});

yargs.command('add','',{
    command: 'add',
    desciption: 'Add a new note',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string',
            alias: 't'
        },
        body: {
            describe: 'Body of note',
            demandOption: false,
            type: 'string',
            default: "",
            alias: 'b'
        }
    },
    handler: (argv) =>  {
        notes.addNote(argv.title, argv.body);
    }
});
yargs.command({
    command: 'read',
    desciption: 'Read a note by title',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string',
            alias: 't'
        },
    },
    handler: (argv) =>  {
        notes.getNote(argv.title);
    }
});
yargs.command({
    command: 'remove',
    desciption: 'Remove a note by title',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string',
            alias: 't'
        },
    },
    handler: (argv) =>  {
        notes.removeNote(argv.title);
    }
});
yargs.command({
    command: 'list',
    desciption: 'List all the existent notes',
    handler: () =>  {
        notes.getAll();
    }
});

yargs.parse()