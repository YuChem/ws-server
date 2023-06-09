const express = require('express');
const morgan = require('morgan');
const { parse } = require('querystring');
const fs = require('fs');
const archiver = require('archiver');

const app = express();
app.use(morgan('dev'));
app.use(express.static('static'));

if (process.env.NODE_ENV === 'test') {
  // supress automatic error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
  });
}

app.get('/data/report/:data', (req, res) => {
  const data = parse(req.params.data);
  const fname = app.storage_folder + "/" + data.dateutc.split(" ")[0] + ".json"

  //drop line into a file named by date
  fs.appendFile(fname, JSON.stringify(data) + "\n",  (err) => {
    if (err) {
      console.error(err);
    }
  });

  res.status(200).send('OK');
});

app.get('/data/download', (req, res) => {
  const days = req.query.days;
  console.log(`download request: ${days}d`);

  const archive = archiver("zip");

  res.attachment(`${new Date().toISOString().slice(0,13)}.zip`);
  archive.pipe(res);

  // list files to pack into zip file
  let files = fs.readdirSync(app.storage_folder);
  if (days > 0) {
    const lastDate = new Date()
    lastDate.setDate(lastDate.getDate() - days);
    const fName = lastDate.toISOString().slice(0,10);

    // only files 
    files = files.filter(f => f.split(".")[0] > fName);
  }

  files.forEach(fname => {
    const fullFname = `${app.storage_folder}/${fname}`;
    archive.append(fs.createReadStream(fullFname), { name: fname });
  })
  
  archive.finalize();

});

const server = app;

module.exports = server;
