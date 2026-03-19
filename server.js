const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/proveedores', (req, res) => {
    res.sendFile(__dirname + '/proveedores.html'); 
});

app.use(express.json());
app.use(cors());

// Configuración con Variables de Entorno (necesario para Vercel)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

db.connect(err => {
    if (err) console.error('Error de conexión:', err);
    else console.log('Conectado a la base de datos en la nube');
});

// --- RUTAS DE LA API ---

// 1. Catálogo de Conceptos
app.post('/api/conceptos', (req, res) => {
    const { clave, descripcion } = req.body;
    db.query('INSERT INTO conceptos (clave, descripcion) VALUES (?, ?)', [clave, descripcion], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Concepto guardado' });
    });
});

// 2. Catálogo de Destinos
app.post('/api/destinos', (req, res) => {
    const { clave, descripcion } = req.body;
    db.query('INSERT INTO destinos (clave, descripcion) VALUES (?, ?)', [clave, descripcion], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Destino guardado' });
    });
});

// 3. Catálogo de Unidades
app.post('/api/unidades', (req, res) => {
    const { clave, descripcion } = req.body;
    db.query('INSERT INTO unidades (clave, descripcion) VALUES (?, ?)', [clave, descripcion], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Unidad guardada' });
    });
});

// 4. Catálogo de Productos
app.post('/api/productos', (req, res) => {
    const { clave, precio, descripcion, unidad, proveedor } = req.body;
    const query = 'INSERT INTO productos (clave, precio, descripcion, unidad, proveedor) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [clave, precio, descripcion, unidad, proveedor], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Producto guardado' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
