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
        console.log("Connected!");

        api.get(`/`, async (req, res) => {
            con.query("SELECT * FROM todos", function (err, result, fields) {
                if (err) console.log(err);
                return res.json(result);
            });
        });

        api.post(`/`, async (req, res) => {
            const sql = "INSERT INTO todos (label,idList) VALUE ('" + req.body.label + "','" + req.body.idList + "')";
            con.query(sql, function (err, result) {
                if (err) console.log(err);
                console.log("insert list ok - " + JSON.stringify(result));
                return res.json({
                    id: result.insertId,
                    label: req.body.label,
                    idList: req.body.idList,
                    isDone: 0
                });
            });
        });

        api.put(`/:id`, async (req, res) => {
            const sql = "UPDATE todos SET label='" + req.body.label + "',idList='" + req.body.idList + "',isDone='"+ req.body.isDone +"' WHERE id='"+ req.params.id +"'" ;
            con.query(sql, function (err, result) {
                if (err) console.log(err);
                console.log("insert list ok - " + JSON.stringify(result));
                return res.json({
                    id: req.params.id,
                    label: req.body.label,
                    idList: req.body.idList,
                    isDone: req.body.isDone
                });
            });
        });

        api.delete(`/:id`, async (req, res) => {
            const sql = "DELETE FROM todos WHERE id='" + req.params.id ;
            con.query(sql, function (err, result) {
                if (err) console.log(err);
                console.log("insert list ok - " + JSON.stringify(result));
                return res.json({
                    id: req.params.id
                });
            });
        });
    }
});

module.exports = api;