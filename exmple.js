const fs = require('fs');

const creatFile = (fileName, content) =>{
    fs.writeFile(fileName, content, (err)=>{
        if (err){
            console.log(err);
            return;

        }
        console.log('file created successfully')
    });
}

creatFile('exmpel.txt', 'this is an exampel')