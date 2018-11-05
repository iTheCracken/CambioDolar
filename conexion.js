const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/cambios.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos Cambios');
});

let sql = `SELECT valor FROM dolar
           ORDER BY valor`;
 
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.valor);
  });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conexión Finalizada');
});

function select() {
    let sql = `SELECT valor FROM dolar
           ORDER BY valor`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.name);
        });
    });
}
