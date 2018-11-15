let fs = require('fs');

fs.readFile('abc','utf-8',(err,data)=>{
    if(err){
        console.log(err+'   error');
        throw err;
    }
    console.log(data)
});

try{
    let data = fs.readFileSync('./abc','utf-8');
    console.log('abs file is '+data)
}catch(e){
    console.log('catch ',e);
    throw e;
}

fs.writeFile('abc','hello node',(error)=>{
    if(error){
        throw error;
    }

})


fs.stat('abc',(err,states)=>{
    if(err){
        throw err;
    }
    console.log(states)
})