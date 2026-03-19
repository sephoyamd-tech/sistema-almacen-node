const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// --- RUTA PRINCIPAL ---
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// --- CONFIGURACIÓN DE BASE DE DATOS ---
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 4000,
    ssl: { rejectUnauthorized: true }
});

// --- RUTAS PARA GUARDAR (POST) ---

app.post('/api/conceptos', (req, res) => {
    const { clave, descripcion } = req.body;
    db.query('INSERT INTO conceptos (clave, descripcion) VALUES (?, ?)', [clave, descripcion], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Concepto guardado' });
    });
});

app.post('/api/destinos', (req, res) => {
    const { clave, descripcion } = req.body;
    db.query('INSERT INTO destinos (clave, descripcion) VALUES (?, ?)', [clave, descripcion], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Destino guardado' });
    });
});

app.post('/api/unidades', (req, res) => {
    const { clave, descripcion } = req.body;
    db.query('INSERT INTO unidades (clave, descripcion) VALUES (?, ?)', [clave, descripcion], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Unidad guardada' });
    });
});

app.post('/api/productos', (req, res) => {
    const { clave, precio, descripcion, unidad, proveedor } = req.body;
    const query = 'INSERT INTO productos (clave, precio, descripcion, unidad, proveedor) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [clave, precio, descripcion, unidad, proveedor], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Producto guardado' });
    });
});

app.post('/api/proveedores', (req, res) => {
    const { clave, rfc, razon, domicilio, correo, telefono } = req.body;
    const query = 'INSERT INTO proveedores (clave, rfc, razon_social, domicilio, correo, telefono) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [clave, rfc, razon, domicilio, correo, telefono], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Proveedor guardado' });
    });
});

app.post('/api/documentos', (req, res) => {
    const { numero, fecha, tipo, entidad, concepto } = req.body;
    const queryDoc = 'INSERT INTO documentos (numero, fecha, tipo, entidad, concepto) VALUES (?, ?, ?, ?, ?)';
    db.query(queryDoc, [numero, fecha, tipo, entidad, concepto], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: `Documento de ${tipo} guardado con éxito.` });
    });
});

// --- RUTAS PARA LEER (GET) - Esto permite la PERSISTENCIA VISUAL ---

app.get('/api/conceptos', (req, res) => {
    db.query('SELECT * FROM conceptos', (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

app.get('/api/destinos', (req, res) => {
    db.query('SELECT * FROM destinos', (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

app.get('/api/unidades', (req, res) => {
    db.query('SELECT * FROM unidades', (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

app.get('/api/proveedores', (req, res) => {
    db.query('SELECT * FROM proveedores', (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

module.exports = app;
