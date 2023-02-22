#!/usr/bin/env node
import { COLORS } from './src/colors.js';
import { help } from './src/commands/help.js';
import { read } from './src/commands/read.js';
import { print } from './src/utilities.js';

const command = process.argv[2];

switch(command){
    case "help":
        help();
        break;
    case "read":
        read();
        break;
    default:
        print( COLORS.errorColor("❌ Please right correct command,or use help for more information"))
}