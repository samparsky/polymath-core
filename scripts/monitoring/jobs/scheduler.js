import { timeConverter } from '../utils/helper.js';
const cron = require('node-cron');
const shell = require('shelljs');
let logger = require('../utils/logger.js').logger;
var spawn = require('child_process').spawn;

var job = cron.schedule('* */3 * * *', async() => {
    var grep  = spawn('grep', ['npm run oracle-scheduling:local']);
    if (grep.pid) {
        logger.info(`Shutting down the current process id: ${grep.pid}`);
        grep.stdin.end();
    }
    logger.info(`Calling the script in every 3 hours, current time is: ${timeConverter(Math.floor(Date.now()/1000))}`);
    shell.exec(`npm run oracle-scheduling:local`);
},false);

job.start();