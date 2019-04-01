const express = require('express');
const os = require('os');
var log4js = require('log4js');
log4js.configure({
    appenders: { Main: { type: 'file', filename: 'logs/server/main.log' } },
    categories: { default: { appenders: ['Main'], level: 'error' } }
  });
var log = log4js.getLogger();
log.level = 'debug';


try{
    log.stil();
    const app = express();

    log.debug("App Starting");
    app.use(express.static('dist'));
    
    app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
    
    app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
    log.debug("App Running");
}
catch(e){
    console.log("error:"+e);
    log.fatal(e);
}
