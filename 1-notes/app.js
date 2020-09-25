const yargs = require('yargs');
const chalk = require('chalk');
const validator = require('validator');
const { version } = require('./package.json');
const os = require('os');
const notes = require('./notes.js');

//console.log("module.filename",module.filename);
//console.log("globals.Buffer",global.Buffer);
//console.log("process.pid",process.pid);
//console.log("process.env",process.env);
//console.log("process.env",process.env);
const { username } = os.userInfo();
console.log(chalk.green(`Bienvenido ${ username }, tu block de notas espera.`));
console.log = console.log.bind(this, chalk.blue.bold.inverse("Note App: "))

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
            default: "Robertitooooo",
            alias: 'b'
        }
    },
    handler: ({title, body}) =>  {
        if(validator.isEmpty(title) || validator.isEmpty(body)){
            console.log(chalk.red.inverse("Title and body must not be empty"))
            return 1;
        }
        notes.addNote(title, body);
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
    handler: ({title}) =>  {
        if(validator.isEmpty(title)){
            console.log(chalk.red.inverse("Title must not be empty"))
            return 1;
        }
        notes.getNote(title);
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
    handler: ({title}) =>  {
        if(validator.isEmpty(title)){
            console.log(chalk.red.inverse("Title must not be empty"))
            return 1;
        }
        notes.removeNote(title);
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