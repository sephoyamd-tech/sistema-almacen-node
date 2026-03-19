const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// --- MIDDLEWARES (Siempre van arriba) ---
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON
app.use(express.static(__dirname));

// --- RUTA PRINCIPAL ---
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// --- CONFIGURACIÓN DE BASE DE DATOS (Pool es mejor para Vercel) ---
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 4000, // TiDB suele usar el puerto 4000
    ssl: {
        rejectUnauthorized: true // TiDB en la nube requiere SSL
    }
});

// --- RUTAS DE LA API (Para guardar datos) ---

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

// 5. Catálogo de Proveedores (¡Nueva!)
app.post('/api/proveedores', (req, res) => {
    const { clave, rfc, razon, domicilio, correo, telefono } = req.body;
    const query = 'INSERT INTO proveedores (clave, rfc, razon_social, domicilio, correo, telefono) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [clave, rfc, razon, domicilio, correo, telefono], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Proveedor guardado' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

module.exports = app; // Exportar la app es necesario para que Vercel la lea correctamente
