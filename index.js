import {spawn} from 'child_process';
import chalk from 'chalk';

const log = console.log;

const COLORS = {
    dateColor:chalk.blue,
    errorColor:chalk.bold.red,
    warningColor:chalk.hex('#FFA500'),
    otherColor:chalk.green,


    bgErrorCount:chalk.bold.bgRed,

    bgWarningCount:chalk.bold.bgYellowBright,
};

const command = spawn('tail', ["-f","/Applications/MAMP/logs/php_error.log"]);


command.stdout.on('data', output => {
    log(output.toString());
    const arrayOfOutputs = output.toString().split('\n');

    const finalOutput = '';

    let n_errors =0;
    let n_warnings =0;
    for(let i=0;i<arrayOfOutputs.length;i++) {

        const item = COLORS.otherColor(arrayOfOutputs[i]);
        let outputTemp = '';

        //** color the date **
        let startingBracketIndex = item.search(/\[/i);
        let endingBracketIndex = item.search(/\]/i);
        if(startingBracketIndex>=0 && endingBracketIndex>=0){
            let finalSearchedDate = item.substring(startingBracketIndex, endingBracketIndex+1);
            outputTemp+=COLORS.dateColor(finalSearchedDate);
        }

        //** color the error **
        let hasError = item.search(/error/i);
        let hasWarning = item.search(/warning/i);

        if(hasError>=0) {
            let startingErrorIndex = endingBracketIndex+2;
            let endingErrorIndex = item.length;
            let finalError= item.substring(startingErrorIndex, endingErrorIndex);
            outputTemp+= COLORS.errorColor(finalError) +"\n";
            n_errors+=1;
        }

        //** color the warning */
        if(hasWarning>=0) {
            let startingWarningIndex = endingBracketIndex+2;
            let endingWarningIndex = item.length;
            let finalWarning= item.substring(startingWarningIndex, endingWarningIndex);
            outputTemp+= COLORS.warningColor(finalWarning)+"\n";
            n_warnings+=1;
        }

        if(hasError<0 && hasWarning<0){
            outputTemp+=COLORS.otherColor(item);
        }

        log(outputTemp);
    }
    
    //** Error Records **
    let record = '';
    if(n_errors>0){
        record+=COLORS.bgErrorCount("Total Errors Founded:"+n_errors)+"\t";
    }
    if(n_warnings>0){
        record+=COLORS.bgWarningCount("Total Warnings Founded:"+n_warnings)+"\t";
    }
    log(record);

});

