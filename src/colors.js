import chalk from 'chalk';

export const COLORS = {
    dateColor:chalk.blue,
    errorColor:chalk.bold.red,
    warningColor:chalk.hex('#FFA500'),
    noticeColor:chalk.bold.magenta,
    traceColor:chalk.bold.red,
    otherColor:chalk.green,
    bgErrorCount:chalk.bold.bgRed,
    bgWarningCount:chalk.bold.bgYellowBright,
    bgNoticesCount:chalk.bold.bgMagentaBright,
    bgTraceCount:chalk.bold.bgRed,
};
