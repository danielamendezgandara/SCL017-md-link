#!/usr/bin/env node
// Requires readline and create global variable menu
const readline = require('readline');
const inquirer = require('inquirer');
const mdLinks = require('./lib/md-links');

let menu;

const codeInput = {
   '1' : '',
   '2' : '--validate',
   '3' : '--stats',
   '4' : '--validate --stats',
}


const op = (input) => {
  const options = {
    validate: false,
    stats: false,
  };
  if (input === '--validate' || input === '2') {
    options.validate = true;
    options.stats = false;
  } else if (input === '--stats' || input === '3') {
    options.validate = false;
    options.stats = true;
  } else if (input === '--validate --stats' || input === 'stats --validate' || input === '4') {
    options.validate = true;
    options.stats = true;
  } else if (input === '1') {
    options.validate = false;
    options.stats = false;
  } else {
    console.log('\n\x1b[35m Importante : Ingresaste una opción que no está en el repertorio,pero en su defecto\x1b[0m');
    console.log('\x1b[35m devolveremos información básica de los links encontrados.\x1b[0m\n');
  }
  return options;
};

const help = () => {
  // Clear screen
  process.stdout.write('\x1Bc');
  // Check if there is already a menu active. If true, close it.
  if (menu) menu.close();
  console.log('\x1b[36m ===========================INFORMACIÓN==============================================\x1b[0m');
  console.log(`\nOnly \x1b[34m"<path>"\x1b[0m is required.\n`);
  console.log(`Opción: \x1b[34m "--validate"\x1b[0m:`);
  console.log('\x1b[36m - Revisa y valida todos los links en tus archivos con extensión .md con OK/FAIL\x1b[0m');
  console.log('\x1b[36m - Retorna la siguiente información de los links:href,text,path,line,status,HTTP status code');
  console.log('\x1b[36m   status message original y redirect href\x1b[0m\n');
  console.log(`Opción: \x1b[33m"--stats"\x1b[0m:`);
  console.log('\x1b[36m - Retorna estadísticas básicas de los links encontrados: totales(total) y únicos(unique)\x1b[0m\n');
  console.log('Ambas opciones \x1b[35m "--validate --stats/--stats --validate"\x1b[0m:');
  console.log('\x1b[36m - Retornará estadísticas accesorias a los links encontrados:rotos(broken),redireccionados(redirect)');
  console.log('\x1b[36m válidos(valid) y redireccionados rotos (brokenRedirect)\x1b[0m\n');
  console.log('\x1b[46m Si tiene algún problema no dude en notificarlo.\x1b[0m');
  console.log('\x1b[36m ====================================================================================\x1b[0m');
  inquirer.prompt([
    {
      type: 'input',
      name: 'response',
      message: '¿Deseas salir?(S/N):',
    }]).then((answer) => {
    switch (answer.response) {
      case 'N': showMain(); break;
      case 'S': console.log('\x1b[36m ¡Hasta pronto!\x1b[0m'); process.exit();
      default: help(); break; /* show menu again if input does not match */
    }
  }).catch((error) => console.log(error));
};
const automaticOptions = (value) => {
  // Clear screen
  process.stdout.write('\x1Bc');
  if (menu) menu.close();

  inquirer.prompt([
    {
      type: 'input',
      name: 'file_folder',
      message: 'Ingresa el archivo o directorio que quieres analizar :',
    }]).then((answer) => {
      console.log(`\n\x1b[36m Análisis de acuerdo a: mdlinks ${answer.file_folder} ${codeInput[value]}\x1b[0m`);
    mdLinks(answer.file_folder, op(value)).then((results) => {
      if (typeof results === 'object') {
        if (value === '3') {
          console.log('Tenemos las siguientes estadísticas para ti sobre los links encontrados:\n');
          console.log(`\x1b[32m\u2713\x1b[0m  Total : ${results.total}`);
          console.log(`\x1b[32m\u2713\x1b[0m  Unique : ${results.unique}\n`);
        } else if (value === '4') {
          console.log('Tenemos las siguientes estadísticas para ti sobre los links encontrados:\n');
          console.log(`\x1b[32m\u2713\x1b[0m Total : ${results.total}`);
          console.log(`\x1b[32m\u2713\x1b[0m Unique : ${results.unique}`);
          console.log(`\x1b[32m\u2713\x1b[0m Valid : ${results.valid}`);
          console.log(`\x1b[34m\u21BB\x1b[0m Redirect : ${results.redirect}`);
          console.log(`\x1b[31m\u2717\x1b[0m Broken : ${results.broken}`);
          console.log(`\x1b[31m\u2717\x1b[0m BrokenRedirect : ${results.brokenRedirect}\n`);
        } else if (value === '2') {
          console.log('\n Esta es la información detallada de los links encontrados :\n');
          results.forEach((result) => {
            const basicInfo = `
            Href : ${result.href} 
            Text : ${result.text}
            Path : ${result.file}
            Line : ${result.line}
            Status : ${result.message}
            HTTP Status Code: ${result.status}
            Status Message Original: ${result.statusMessage}`;
            if (result.redirect) {
              const redirectInfo = `
            Redirect href : ${result.hrefRedirect} \n`;
              console.log(`\x1b[33m ${basicInfo} + ${redirectInfo}`);
            } else if (result.status === 200) {
              console.log(`\x1b[34m ${basicInfo}`);
            } else if (result.status === 404) {
              console.log(`\x1b[35m ${basicInfo}`);
            }
          });
        } else if (value === '1') {
          console.log('Esta es la información básica de los links encontrados:\n');
          results.forEach((result) => {
            console.log(`\x1b[32m Href : ${result.href}\x1b[0m`);
            console.log(`\x1b[32m Text : ${result.text}\x1b[0m`);
            console.log(`\x1b[32m Path : ${result.file}\x1b[0m`);
            console.log(`\x1b[32m Line : ${result.line}\x1b[0m\n`);
          });
        }
      }
      inquirer.prompt([
        {
          type: 'input',
          name: 'response',
          message: '¿Deseas analizar otro archivo o directorio?(S/N):',
        }]).then((answer) => {
        switch (answer.response) {
          case 'S': showMain(); break;
          case 'N': console.log('\x1b[36m ¡Hasta pronto!\x1b[0m'); process.exit();
          default: showSubOptions(); break; /* show menu again if input does not match */
        }
      })
        .catch((error) => console.log(error));
    }).catch((error) => console.log(error.message));
  });
};

const manual = () => {
  process.stdout.write('\x1Bc');
  if (menu) menu.close();
  inquirer.prompt([
    {
      type: 'input',
      name: 'file_folder',
      message: 'Ingresa el archivo o directorio que quieres analizar :',
    }, {
      type: 'input',
      name: 'options',
      message: 'Ingresa las opciones:',
    }]).then((answer) => {
    console.log(`\n\x1b[36m Análisis de acuerdo a: mdlinks ${answer.file_folder} ${answer.options}\x1b[0m`);
    mdLinks(answer.file_folder, op(answer.options)).then((results) => {
      if (typeof results === 'object') {
        if (answer.options === '--stats') {
          console.log('Tenemos las siguientes estadísticas básicas para ti sobre los links encontrados:\n');
          console.log(`\x1b[32m\u2713\x1b[0m  Total : ${results.total}`);
          console.log(`\x1b[32m\u2713\x1b[0m  Unique : ${results.unique}\n`);
        } else if (answer.options === '--validate --stats' || answer.options === '--stats --validate') {
          console.log('Tenemos las siguientes estadísticas avanzadas para ti sobre los links encontrados:\n');
          console.log(`\x1b[32m\u2713\x1b[0m Total : ${results.total}`);
          console.log(`\x1b[32m\u2713\x1b[0m Unique : ${results.unique}`);
          console.log(`\x1b[32m\u2713\x1b[0m Valid : ${results.valid}`);
          console.log(`\x1b[34m\u21BB\x1b[0m Redirect : ${results.redirect}`);
          console.log(`\x1b[31m\u2717\x1b[0m Broken : ${results.broken}`);
          console.log(`\x1b[31m\u2717\x1b[0m BrokenRedirect : ${results.brokenRedirect}\n`);
        } else if (answer.options === '--validate') {
          console.log('\n Esta es la información detallada de los links encontrados :\n');
          results.forEach((result) => {
            const basicInfo = `
            Href : ${result.href} 
            Text : ${result.text}
            Path : ${result.file}
            Line : ${result.line}
            Status : ${result.message}
            HTTP Status Code: ${result.status}
            Status Message Original: ${result.statusMessage}`;
            if (result.redirect) {
              const redirectInfo = `
            Redirect href : ${result.hrefRedirect} \n`;
              console.log(`\x1b[33m ${basicInfo} + ${redirectInfo}`);
            } else if (result.status === 200) {
              console.log(`\x1b[34m ${basicInfo}`);
            } else if (result.status === 404) {
              console.log(`\x1b[35m ${basicInfo}`);
            }
          });
        } else {
          console.log('Esta es la información básica de los links encontrados:\n');
          results.forEach((result) => {
            console.log(`\x1b[32m Href : ${result.href}\x1b[0m`);
            console.log(`\x1b[32m Text : ${result.text}\x1b[0m`);
            console.log(`\x1b[32m Path : ${result.file}\x1b[0m`);
            console.log(`\x1b[32m Line : ${result.line}\x1b[0m\n`);
          });
        }
      }
      inquirer.prompt([
        {
          type: 'input',
          name: 'response',
          message: '¿Deseas analizar otro archivo o directorio?(S/N):',
        }]).then((answer) => {
        switch (answer.response) {
          case 'S': showMain(); break;
          case 'N': console.log('\x1b[36m ¡Hasta pronto!\x1b[0m'); process.exit();
          default: showSubOptions(); break; /* show menu again if input does not match */
        }
      })
        .catch((error) => console.log(error));
    })
      .catch((error) => console.log(error.message));
  });
};

// Sub
const showSub = () => {
// Clear screen
  process.stdout.write('\x1Bc');

  // Log the menu
  console.log(
    'Selecciona una opción\n\n'
    + '\x1b[36m 1 = Estadísticas manuales de tu archivo o directorio\x1b[0m\n'
    + '\x1b[32m 2 = Regresar al menú\x1b[0m',
  );

  // Check if there is already a menu active. If true, close it.
  if (menu) menu.close();

  // Creates a readline Interface instance
  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Ask question
  menu.question('\x1b[33m ¿Dónde quieres ir?:', (input) => {
    switch (input) {
      case '1': manual(); break;
      case '2': showMain(); break;
      default: showSub(); break; /* show menu again if input does not match */
    }
  });
};

const showSubOptions = () => {
  // Clear screen
  process.stdout.write('\x1Bc');

  // Log the menu
  console.log(
    'Selecciona una opción\n\n'
    + '\x1b[36m 1 = none\x1b[0m\n'
    + '\x1b[34m 2 = --validate\x1b[0m\n'
    + '\x1b[33m 3 = --stats\x1b[0m\n'
    + '\x1b[35m 4 = --validate --stats\x1b[0m\n'
    + '\x1b[32m 5 = Regresar al menú\x1b[0m',
  );

  // Check if there is already a menu active. If true, close it.
  if (menu) menu.close();

  // Creates a readline Interface instance
  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Ask question
  menu.question('¿Dónde quieres ir?:', (input) => {
    switch (input) {
      case '1': automaticOptions(input); break;
      case '2': automaticOptions(input); break;
      case '3': automaticOptions(input); break;
      case '4': automaticOptions(input); break;
      case '5': showMain(); break;
      default: showSubOptions(); break; /* show menu again if input does not match */
    }
  });
};

// Main
const showMain = () => {
  // Clear screen
  process.stdout.write('\x1Bc');

  // Check if there is already a menu active. If true, close it.
  if (menu) menu.close();
  // Log the menu
  console.log(
    '\x1b[36m Bienvenid@ a Md Links Extractor Validator\x1b[0m\n\n'
    + 'Si quieres analizar tu archivo o directorio de manera manual ingresa 2 \n'
    + 'por teclado o 1 si deseas ocupar las opciones ofrecidas.\n\n'
      + `\x1b[36m 1 = Opciones\n\x1b[0m`
      + `\x1b[33m 2 = Manual\n\x1b[0m`
      + `\x1b[35m 3 = Información\n\x1b[0m`
      + `\x1b[32m 4 = Salir\x1b[0m`,
  );
  // Creates a readline Interface instance
  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Ask question
  menu.question('\x1b[34m ¿Dónde quieres ir? :', (input) => {
    switch (input) {
      case '1': showSubOptions(); break;
      case '2': showSub(); break;
      case '3': help(); break;
      case '4': console.log('\x1b[36m ¡Hasta pronto!\x1b[0m'); process.exit();
      default: showMain(); break;/* show menu again if input does not match */
    }
  });
};

showMain();
