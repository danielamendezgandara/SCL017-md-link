// Random number
const insertNum = (numUser) => {
  const numRandom = Math.floor(Math.random() * (7 - 1) + 1);

  return new Promise((resolve, reject) => {
    if (isNaN(numUser)) {
      reject(new Error('Tipo de entrada incorrecta'));
    } else if (numUser === numRandom) {
      const result = {
        points: 2,
        numR: numRandom,
      };
      resolve(result);
    } else if (Math.abs(numUser - numRandom) === 1) {
      const result = {
        points: 1,
        numR: numRandom,
      };
      resolve(result);
    } else {
      const result = {
        points: 0,
        numR: numRandom,
      };
      resolve(result);
    }
  });
};

insertNum(5).then((result) => console.log(`Dado ${result.numR}: obtuviste ${result.points} puntos`))
  .catch((error) => console.log(error));

// Cake birthday promise
const healhty = true;

const eatCake = (cake) => new Promise((resolve, reject) => {
  const message = `Comeré un pastel de   ${cake.flavor}${cake.size}`;
  resolve(message);
});

const willGetMyCakeBirthdary = new Promise((resolve, reject) => {
  if (healhty) {
    const status = 'Estoy feliz';
    const cake = {
      message: status,
      flavor: 'chocolate',
      size: 'de tamaño mediano',
    };
    resolve(cake);
  } else {
    reject(new Error('Estoy triste.No puedo comer pastel'));
  }
});

willGetMyCakeBirthdary
  .then(eatCake)
  .then((result) => { console.log(result); })
  .catch((error) => console.log(error.message));

// Odd or even number

const oddOrEvenNumber = (data) => new Promise((resolve, reject) => {
  if (isNaN(data)) {
    reject('error');
  } else if (data % 2 !== 0) {
    setTimeout(resolve, 1000, 'odd');
  } else {
    setTimeout(reject, 2000, 'even');
  }
});

oddOrEvenNumber(2)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
