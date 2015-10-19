const LOG_PREFIX = "WEB: ";

var dotenv = require('dotenv');
dotenv.load();

require('newrelic');
var fs = require('fs');
var tgtutil = require('./lib/tgtutil');
var path = require('path');
var express = require('express');
var thisPackage = require('./package');

var mailGunDomain = tgtutil.getEnvVariable('MAILGUN_API_DOMAIN');
var awesomeDomain = tgtutil.getEnvVariable('AWESOME_DOMAIN');

var mailgun = require('mailgun-js')({apiKey: tgtutil.getEnvVariable('MAILGUN_API_KEY'), domain: mailGunDomain});

var app = express();
app.use(express.logger());
app.use(express.bodyParser());

app.get('/version', function (req, res) {
    res.type('text/plain');
    res.send("Target Pinewood Derby, version " + thisPackage.version);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/target/derbys', function(req, res) {
    res.sendfile('./public/target/derbys.html');
});

var useNginx = (/^(true|1)$/i).test(process.env['TGTRAD_USE_NGINX_PROXY']) | false;
if (useNginx) {
    // listen on the nginx socket
    app.listen('/tmp/nginx.socket', function() {
        console.log(LOG_PREFIX + "Listening on UNIX socket");
    });

    // write nginx app initialized and ready for traffic
    fs.writeFile("/tmp/app-initialized", "Ready to launch nginx", function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(LOG_PREFIX + "Signaled NGINX to start");
        }
    });

} else {
    // listen on heroku port or use something local
    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        console.log(LOG_PREFIX + "Listening on " + port);
    });
}


