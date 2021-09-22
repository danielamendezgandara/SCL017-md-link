#!/usr/bin/env node
const mdLinks = require ('./lib/md-links-extractor');
//const { validateMdLinksArray } = require('./lib/package-functions');

/*const options ={
    validate : false,
    stats :false,
}*/
const val = process.argv;
const op =(g)=>{
  let options ={
      validate :'',
      stats:'',
  }
  if(g.length===4){
    if(g[3]==='--stats'){
        options.validate= false;
        options.stats=true;
    }else if(g[3]==='--validate'){
        options.validate=true;
        options.stats=false;
    }
  }else if (g.length>4){
    options.validate=true;
    options.stats=true;
  }else if (g.length===3){
    options.validate=false;
    options.stats=false;
  }
  return options;
}

/*process.stdout.write('Bienvenida a md links extractor' +'\n');
var menu = require('console-menu');
menu([
    { hotkey: '1', title: 'One' },
    { hotkey: '2', title: 'Two', selected: true },
    { hotkey: '3', title: 'Three' },
    { separator: true },
    { hotkey: '?', title: 'Help' },
], {
    header: 'Example menu',
    border: true,
}).then(item => {
    if (item) {
        console.log('You chose: ' + JSON.stringify(item));
    } else {
        console.log('You cancelled the menu.');
    }
});*/
//process.stdout.write('¿Qué quieres saber de tus links?');
/*process.stdin.on('data',(data)=>{
    const name =data.toString();
    
    process.stdout.write(`Hola  ${name}`);
    process.exit();
});*/

mdLinks(process.argv[2],op(val)).then(result=>console.log(result))
.catch(error =>console.log(error.message));

/*const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "list",
      name: "prize",
      message: "Select a prize",
      choices: ["cake", "fries"]
    }
  ])
  .then((answers) => { 
    console.log(JSON.stringify(answers, null, "  "));
  });*/

  // Requires readline and create global variable menu
 