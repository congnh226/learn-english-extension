let fs = require('fs');

let lines = fs.readFileSync('words.csv', 'utf-8').split('\r\n');

let words = lines.map(line => {
    let sections;
    let meaning;    
    if(!line.includes('\"\/') && line.includes('\"')){
        sections = line.split('\"');
        if(sections.length > 3){
            let word = sections[0].substring(0, sections[0].indexOf(',')).trimEnd();
            let type = sections[1];
            let pronounce = sections[2].replace(/,/g, '');
            let meaning = sections[3];
            return {
                word, type, pronounce, meaning
            };
        }
        
        meaning = sections[1];    
        sections = sections[0].split(',');        
    }else{
        sections = line.split(',');        
        meaning = sections[sections.length - 1].replace('"','');
    }   

    let word = sections[0];
    let type = sections[1];
    let pronounce = sections[2];

    return {
        word, type, pronounce, meaning
    };
});

fs.writeFileSync('words.json', JSON.stringify(words));