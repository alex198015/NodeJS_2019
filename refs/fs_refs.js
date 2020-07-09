const fs = require('fs')
const path = require('path')

fs.mkdir(path.join(__dirname, 'views'), err => {
    if(err) throw new Error(err)

    console.log('Папка была создана');
    
})

fs.writeFile(path.join(__dirname, 'views', 'mynotes.txt'), 'Hello world', err => {
    if(err) throw new Error(err)

    console.log('File was created');
    
})

fs.appendFile(path.join(__dirname, 'views', 'mynotes.txt'), ' Hi is ok', err => {
    if(err) throw new Error(err)

    console.log('File was changed');

    fs.readFile(path.join(__dirname, 'views', 'mynotes.txt'), 'utf-8', (err, data) => {
        if(err) throw new Error(err)
    
        // console.log(Buffer.from(data).toString());
        console.log(data);
        
    })

})

fs.rename(path.join(__dirname, 'views' , 'notes.txt'), 
            path.join(__dirname, 'views' , 'isnotes.txt'), err => {
                if(err) throw new Error(err)

                console.log('File is changed');
                
            })
