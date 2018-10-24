var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Funcionou');
        reject('Falhou');
    },2500);
    
});

somePromise.then((message) =>{
    console.log ('Sucesso: ',message);
}, (errorMensage) => {
    console.log('Erro:', errorMensage);
});