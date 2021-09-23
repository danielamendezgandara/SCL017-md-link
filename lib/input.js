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
