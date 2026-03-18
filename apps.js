const API_URL = '/api'; // En Vercel, se usa ruta relativa

// --- NAVEGACIÓN SPA ---
function navegar(id) {
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
    document.getElementById('vista-' + id).classList.add('activa');
}

// --- LÓGICA DE CATÁLOGOS (Conceptos, Destinos, Unidades) ---
function abrirCatalogo(nombre) {
    document.getElementById('titulo-catalogo').innerText = "Catálogo de " + nombre;
    document.getElementById('formCatalogo').reset();
    navegar('catalogos');
}

// Evento para guardar cualquier catálogo simple
document.getElementById('formCatalogo').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Identificar a qué tabla enviar según el título actual
    const titulo = document.getElementById('titulo-catalogo').innerText.toLowerCase();
    let endpoint = "";
    if (titulo.includes("conceptos")) endpoint = "conceptos";
    else if (titulo.includes("destinos")) endpoint = "destinos";
    else if (titulo.includes("unidades")) endpoint = "unidades";

    const datos = {
        clave: document.getElementById('cat-clave').value,
        descripcion: document.getElementById('cat-desc').value
    };

    try {
        // Petición POST al backend
        const respuesta = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            alert(`¡${endpoint.toUpperCase()} guardado correctamente!`);
            document.getElementById('formCatalogo').reset();
            navegar('inicio');
        }
    } catch (error) {
        alert("Error al conectar con el servidor");
    }
});

// --- LÓGICA DE PRODUCTOS ---
document.getElementById('formProductos').addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = {
        clave: document.getElementById('prod-clave').value,
        precio: document.getElementById('prod-precio').value,
        descripcion: document.getElementById('prod-desc').value,
        unidad: document.getElementById('prod-unidades').value,
        proveedor: document.getElementById('prod-proveedor').value
    };

    const respuesta = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });

    if (respuesta.ok) {
        alert("Producto guardado con éxito");
        navegar('inicio');
    }
});