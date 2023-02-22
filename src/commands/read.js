import {spawn} from 'child_process';
import { COLORS } from '../colors.js';
import fs from 'fs';
import { print } from '../utilities.js';

export const read = () =>{
    const path = process.argv[3];
    if(path){
        fs.lstat(path, (err, stats) => {
            if(err){
                print(COLORS.errorColor("Something went wrong",err))
            }
            else{
                const command = spawn('tail', ["-f",path]);
    
                command.stdout.on('data', output => {
                    const arrayOfOutputs = output.toString().split('\n');
                    print(printPretty(arrayOfOutputs))
                });
            }
        });
    }else{
        print(COLORS.errorColor("Please provide a php error log file path"))
    }
  
}

function printPretty(arrayOfOutputs){
    let finalOutput = '';

    let n_errors =0;
    let n_warnings =0;
    let n_notices = 0;
    let n_traces = 0;

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
        let hasNotice = item.search(/notice/i);
        let hasTraces = item.search(/stack trace|#|thrown /i);


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

        if(hasNotice>=0) {
            let startingNoticeIndex = endingBracketIndex+2;
            let endingNoticeIndex = item.length;
            let finalNotice= item.substring(startingNoticeIndex, endingNoticeIndex);
            outputTemp+= COLORS.noticeColor(finalNotice)+"\n";
            n_notices+=1;
        }

        if(hasTraces>=0) {
            let startingTraceIndex = hasTraces;
            let endingTraceIndex = item.length;
            let finalTrace= item.substring(startingTraceIndex, endingTraceIndex);
            outputTemp+= COLORS.traceColor(finalTrace)+"\n";
            n_traces+=1;
        }

        if(hasError<0 && hasWarning<0 && hasNotice<0 && hasTraces<0){
            outputTemp+=COLORS.otherColor(item);
        }

        finalOutput+=outputTemp+"\n";
    }
    
    //** Error Records **
    let record = '';
    if(n_errors>0){
        record+=COLORS.bgErrorCount("Total Errors Founded:"+n_errors)+"\t";
    }
    if(n_warnings>0){
        record+=COLORS.bgWarningCount("Total Warnings Founded:"+n_warnings)+"\t";
    }
    if(n_notices>0){
        record+=COLORS.bgNoticesCount("Total Notices Founded:"+n_notices)+"\t";
    }
    if(n_traces>0){
        record+=COLORS.bgTraceCount("Total Traces Founded:"+n_traces)+"\t";
    }
    return finalOutput;

}