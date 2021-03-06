let fs = require('fs');

let lines = fs.readFileSync('words.csv', 'utf-8').split('\r\n');

let words = lines.map(line => {
    if(line.includes('\"')){
        // console.log('==================== ');
        // console.log('line ', line);
        let firstQuote = line.indexOf('\"');
        let lastQuote = line.indexOf('\"', firstQuote + 1);
        while(firstQuote !== -1){
            let tmp = line.substring(firstQuote + 1, lastQuote);
            let subStr = tmp.replace(/,/g, ';');
            line = line.replace(tmp, subStr);
            firstQuote = line.indexOf('\"', lastQuote +1);
            lastQuote = line.indexOf('\"', firstQuote + 1);
        }
        // console.log('line ', line);        
    }
    let sections = line.split(',');
    let word = sections[0].trim();
    let type = sections[1].trim();
    let pronounce = sections[2].trim();
    let meaning = sections[sections.length - 1].replace(/\"/g,'').trim();

    return {
        word, type, pronounce, meaning
    };
});

fs.writeFileSync('words.json', JSON.stringify(words));