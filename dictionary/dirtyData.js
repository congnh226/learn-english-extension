let fs = require('fs');

let lines = fs.readFileSync('words.csv', 'utf-8').split('\r\n');

let words = lines.map(line => {
    if(line.includes('\"')){
        console.log('==================== ');
        console.log('line ', line);
        let firstQuote = line.indexOf('\"');
        let lastQuote = line.indexOf('\"', firstQuote + 1);
        while(firstQuote !== -1){
            let tmp = line.substring(firstQuote + 1, lastQuote);
            let subStr = tmp.replace(/,/g, ';');
            line = line.replace(tmp, subStr);
            firstQuote = line.indexOf('\"', lastQuote +1);
            lastQuote = line.indexOf('\"', firstQuote + 1);
        }
        console.log('line ', line);
        return line + '\n';
    }
    return line;
    
});

fs.writeFileSync('words-new.csv', words);