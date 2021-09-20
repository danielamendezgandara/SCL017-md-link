//const name ;
process.stdout.write('Dime tu nombre:');
process.stdin.on('data',(data)=>{
    const name =data.toString();
    process.stdout.write(`Hola  ${name}`);
    process.exit();
})