const sqlite3 = require('sqlite3').verbose();
var casual = require ('casual');

let db = new sqlite3.Database('./db/pruebas.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    // console.log('Conectado a la base de datos Pruebas');
});

if (count() < 10) {
    select();
} else {
    insertar();
}

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    // console.log('Conexión Finalizada');
});

function select() {
    let sql = `SELECT * FROM alumnos`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.nombre);
        });
    });
}

function count() {
    var x = 1;
    const sql = `SELECT count(*) as total FROM alumnos`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            x = row.total;
            console.log(row.total);
        });
    });
    return x;
}

function crearTabla() {
    db.run('CREATE TABLE alumnos(matricula varchar, nombre text, edad int)');
}

async function insertar() {
    db.run(`INSERT INTO alumnos(matricula, nombre, edad) VALUES(?,?,?)`, [`150${casual.letter}00${casual.integer(from = 0, to = 99)}`, `${casual.name}`, `${casual.integer(from = 18, to = 30)}`], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
    await count();
}
