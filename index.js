const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const { etl } = require('./data-ingestion');
const { sourceToFunc } = require('./data-ingestion/normalization');

const app = express();
app.use(bodyParser.json());

app.post('/ingest', async (req, res) => {

    const {data_source, type} = req.body;

    console.log(`recieved ${type} ingestion request`);

    if(type === 'patients') {
        etl(__dirname + '/data/hospital_1_Patient.csv', sourceToFunc[data_source][type], 'patients')
    } else if(type === 'treatments') {
        etl(__dirname + '/data/hospital_1_Treatment.csv', sourceToFunc[data_source][type], 'treatments')
    }

    res.send({message: 'proccessing'});
})

app.get('/isAlive', (req, res) => {
    res.sendStatus(200)
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
})
