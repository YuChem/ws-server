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
  fs.appendFile(fname, JSON.stringify(data),  (err) => {
    if (err) {
      console.error(err);
    }
  });

  res.status(200).send('OK');
});

app.get('/data/download', async (req, res) => {
  const days = req.query.days;
  console.log(`download request: ${days}d`);

  const archive = archiver("zip");

  res.attachment(`${new Date().toISOString().slice(0,13)}.zip`);
  archive.pipe(res);

  // add files to archive
  const date = new Date();
  for (let i = 0; i < days; i++) {
    const fname = `${date.toISOString().slice(0,10)}.json`;
    const fullFname = `${app.storage_folder}/${fname}`;

    if (fs.existsSync(fullFname)) {
      archive.append(fs.createReadStream(fullFname), { name: fname });
      console.log(`archiving: ${fullFname}`);
    } else {
      console.log(`archiving: could not find file ${fullFname}`);
    }
    // move date 1 day back
    date.setDate(date.getDate() - 1);
  }
  
  archive.finalize();

});

const server = app;

module.exports = server;
