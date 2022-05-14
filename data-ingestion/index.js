const fs = require('fs');
const sql = require('sql');
const csv = require('csv-parser')
const stripBomStream = require ('strip-bom-stream');

const {query} = require('../db/index.js')

const etl = (filePath, normalizeFunc, table) => {
    
    let arr = [];
        
    fs.createReadStream(filePath)
        .pipe(stripBomStream())
        .pipe(csv())
        .on('data', (row) => {
            
            arr.push(normalizeFunc(row));

            if (arr.length > process.env.ROWS) {
                upsert(arr.slice(), table);
                arr = [];
            }
        })
        .on('end', () => {
            
            upsert(arr.slice(), table);
            arr = [];
            console.log('finished to read file');
        })        
}

const insert = (jsonArr, table) => {
    
    let obj = sql.define({
        name: table,
        columns: Object.keys(jsonArr[0])
    });    

    let queryStr = obj.insert(jsonArr).toQuery();
    
    query(queryStr, (err, res) => {
        if(err) {
            console.log(err)
            return {status: 'failed', message: err.message, rowsAffected: 0}
        } else {
            console.log(res)
            return {status: 'succeeded', message: res.message, rowsAffected: res.rowCount}
        }
    })
}

const upsert = (jsonArr, table) => {
    
    let obj = sql.define({
        name: table,
        columns: Object.keys(jsonArr[0])
    });    

    let queryStr = obj.insert(jsonArr).toQuery();
    queryStr.text += ` ON CONFLICT ON CONSTRAINT ${table}_pkey DO NOTHING`;

    query(queryStr, (err, res) => {
        if(err) {
            console.log(err)
            return {status: 'failed', message: err.message, rowsAffected: 0}
        } else {
            console.log(res)
            return {status: 'succeeded', message: "succeeded", rowsAffected: res.rows.length}
        }
    })
}

module.exports = {
    etl
}