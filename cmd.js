const yargs = require('yargs');
const fs = require('fs');

yargs.command({
    command: 'list',
    describe: 'Liste toutes mes notes',
    handler: () => {
        fs.readFile("data.json", "utf-8", (err, dataStr)=>{
            if(err) console.log(err)
            else{
                const notes = JSON.parse(dataStr);
                notes.forEach(note =>{
                    console.log(`La note ${note.id} à pour titre ${note.title}`)
                })
            }
        })
    },
}).command({
    command: 'add',
    describe: "Ajoute une note",
    builder:{
        title:{
            describe:'ajouter un titre',
            demandOption : true,
            type: 'string'
        },
        message: {
            describe : 'ajouter un message',
            demandOption : false,
            type: 'string'
        }
    },
    handler: (argv) => {
        const newNote = [{
            id: argv.id,
            title: argv.title,
            message: argv.message
        }]
        
        fs.readFile("data.json","utf-8", (err, dataStr)=>{
            if(err) console.log(err)
            else{
                const notes = JSON.parse(dataStr)
                notes.push(newNote)
                const newNoteJSON = JSON.stringify(notes);
                fs.writeFile("data.json", newNoteJSON, (err)=>{
                    if(err) console.log(err)
                    else{
                        console.log("La note à bien été sauvergardée")
                    }
                })
                
            }
        })
        
    }
}).command({
    command: 'remove',
    describe: "Supprime une note",
    handler: () => {
        fs.readFile("data.json","utf-8", (err, dataStr)=>{
            if(err) console.log(err)
            else{
                const notes = JSON.parse(dataStr)
                notes.pop()
                const resultJSON = JSON.stringify(notes);
                fs.writeFile("data.json", resultJSON, (err)=>{
                    if(err) console.log(err)
                    else{
                        console.log("La note à bien été supprimée");
                    }
                })
                
            }
        })
        
    }
}).command({
    command: 'read',
    describe: "Affiche le détail d'une note",
    handler: () => {
        fs.readFile("data.json", "utf-8", (err,dataStr) =>{
            if(err) console.log(err)
            else{
                const notes = JSON.parse(dataStr);
                notes.forEach(note =>{
                    console.log(`${note.id}.${note.title} a pour message ${note.message}`);
                })
            }
        })
    }
}).argv;