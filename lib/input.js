// const name ;
/* process.stdout.write('Dime tu nombre:');
process.stdin.on('data',(data)=>{
    const name =data.toString();
    process.stdout.write(`Hola  ${name}`);
    process.exit();
}) */

// Requires readline and create global variable menu
/* var readline = require('readline'),
    menu; */

// Main
/* function showMain() {
    // Clear screen
    //process.stdout.write('\033c');

    // Log the menu
    console.log(
        'Main menu\n\n' +
        '1 = Go to sub\n' +
        '2 = Can be another sub... For now same as option 1\n' +
        '3 = Exit'
        );

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    //Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask question
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': showSub(); break;
            case '2': showSub(); break;
            case '3': process.exit(); break;
            default: showMain() /* show menu again if input does not match */
/* }
    });
}

// Sub
function showSub() {
    // Clear screen
    process.stdout.write('\033c');

    // Log the menu
    console.log(
        'Sub menu\n\n' +
        '1 = Another sub blabla...\n' +
        '2 = Go back to main'
        );

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask question
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': console.log('Another sub blabla...'); break;
            case '2': showMain(); break;
            default: showSub() /* show menu again if input does not match */
/* }
    });
}

showMain(); */

/* var menuHandler;

// Initialize
function initialize() {
    showMain();
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', checkMenu);

    function checkMenu() {
        var input = process.stdin.read();
        if(input !== null) {
            menuHandler(input.trim());
        }
    }
}

// Main
function showMain() {
    console.log(
        '1 = Show sub' + '\n' +
        '2 = Show other sub blabla...'  + '\n' +
        '3 = Exit'  + '\n\n' +
        'Choose number, then press ENTER:'
        );

    menuHandler = function(input){
        switch(input) {
            case '1': showSub(); break;
            case '2': showOtherSubBlaBla; break;
            case '3': process.exit(); break;
            default: showMain();
        }
    };
}

// Sub
function showSub() {
    console.log(
        '1 = Do something bla bla' + '\n' +
        '2 = Go back to main'  + '\n\n' +
        'Choose number, then press ENTER:'
        );

    menuHandler = function(input){
        switch(input) {
            case '1': doSomethingBlaBla(); break;
            case '2': showMain(); break;
            default: showSub();
        }
    };
}

initialize(); */

/* const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "list",
      name: "prize",
      message: "Select a prize",
      choices: ["--validate", "--stats","--validate --stats"]
    }
  ])
  .then((answers) => {
    console.log(answers.prize);
  }); */
// process.exit();
/* 'use strict';
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'What do you want to do?',
      choices: [
        'Order a pizza',
        'Make a reservation',
        new inquirer.Separator(),
        'Ask for opening hours',
        {
          name: 'Contact support',
          disabled: 'Unavailable at this time',
        },
        'Talk to the receptionist',
      ],
    },
    {
      type: 'list',
      name: 'size',
      message: 'What size do you need?',
      choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
      filter(val) {
        return val.toLowerCase();
      },
    },
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
  }); */

// Requires readline and create global variable menu

// Requires readline and create global variable menu
/* const inquirer = require("inquirer");
var readline = require("readline");

function mimi(){

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
    });

}

// Main
function showMain() {
    // Clear screen
    process.stdout.write('\033c');

    // Log the menu
    console.log(
        'Main menu\n\n' +
        '1 = Go to sub\n' +
        '2 = Can be another sub... For now same as option 1\n' +
        '3 =holi \n'+
        '4 = Exit'
        );

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    //Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask question
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': showSub(); break;
            case '2': showSub(); break;
            case '3' : mimi() ;break;
            case '4': process.exit(); break;
            default: showMain() /* show menu again if input does not match */
/* }
    });
}

// Sub
function showSub() {
    // Clear screen
    process.stdout.write('\033c');

    // Log the menu
    console.log(
        'Sub menu\n\n' +
        '1 = Another sub blabla...\n' +
        '2 = Go back to main'
        );

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask question
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': console.log('Another sub blabla...'); break;
            case '2': showMain(); break;
            default: showSub() /* show menu again if input does not match */
/* }
    });
}

showMain(); */

/* var menu = require('console-menu');
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
}); */

/* 'use strict';
const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');

const questions = [
  {
    type: 'input',
    name: 'first_name',
    message: "What's your first name",
  },
  {
    type: 'input',
    name: 'last_name',
    message: "What's your last name",
    default() {
      return 'Doe';
    },
  },
  {
    type: 'input',
    name: 'fav_color',
    message: "What's your favorite color",
    transformer(color, answers, flags) {
      const text = chalkPipe(color)(color);
      if (flags.isFinal) {
        return text + '!';
      }

      return text;
    },
  },
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number",
    validate(value) {
      const pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid phone number';
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, '  '));
}); */

const inquirer = require("inquirer");

inquirer.prompt([
  {
    type: "list",
    name: "exampleInput",
    message: "Does this work for you?",
    choices: [
      "Yes",
      "No",
      "I can't tell!",
    ],
  },
], (answers) => {
  console.log("Done!");
});
