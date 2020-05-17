const express = require(`express`);
const api = express.Router();
const mysql = require(`mysql`);

const con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "1234",
    database: "lpdip"
});

con.connect(function(err) {
    if (err) {
        console.log(err);
    }else{
        console.log("Connected!!");

        api.get(`/`, async (req, res) => {
            con.query("SELECT * FROM lists", function (err, result, fields) {
                if (err) console.log(err);
                return res.json(result);
            });
        });

        api.post(`/`, async (req, res) => {
            const sql = "INSERT INTO lists (label,description) VALUE ('" + req.body.label + "','" + req.body.description + "')";
            con.query(sql, function (err, result) {
                if (err) console.log(err);
                console.log("insert list ok - " + JSON.stringify(result));
                return res.json({
                    id: result.insertId,
                    label: req.body.label,
                    description: req.body.description
                });
            });
        });

        api.put(`/:id`, async (req, res) => {
            const sql = "UPDATE lists SET label='" + req.body.label + "',description='" + req.body.description + "' WHERE id='"+ req.params.id +"'" ;
            con.query(sql, function (err, result) {
                if (err) console.log(err);
                console.log("insert list ok - " + JSON.stringify(result));
                return res.json({
                    id: req.params.id,
                    label: req.body.label,
                    description: req.body.description
                });
            });
        });
    }
});

module.exports = api;