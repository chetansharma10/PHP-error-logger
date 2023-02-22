import boxen from 'boxen';
import { COLORS } from '../colors.js';
import { print } from '../utilities.js';
export const help = ()=>{

    const helpText = `
        This is a tool for pretty printing the error logs from php apache server using tail command.You just have to 
        specify the path of error logs like
        ${COLORS.noticeColor("/Applications/MAMP/logs/php_error.log ")},
        just run ${COLORS.noticeColor("pretty-print [YOUR PATH OF ERROR LOG FILE]")}
    `;

    print(
        COLORS.otherColor(
            boxen(helpText, 
            {
                title: 'Help',
                titleAlignment: 'center',
                padding:1,
            }
        ))
    );
}