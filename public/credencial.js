document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nombre').value = localStorage.getItem('nombre') || '';
    document.getElementById('semestre').value = localStorage.getItem('semestre') || '';
    document.getElementById('especialidad').value = localStorage.getItem('especialidad') || '';
    document.getElementById('turno').value = localStorage.getItem('turno') || '';
    
    document.getElementById('importar').addEventListener('change', importarJSON);

    // Si tienes botón exportar, pon aquí el listener
    // document.getElementById('btnExportar').addEventListener('click', exportarJSON);
});

function guardarDatosEnLocalStorage(datos) {
    localStorage.setItem('nombre', datos.nombre || '');
    localStorage.setItem('semestre', datos.semestre || '');
    localStorage.setItem('especialidad', datos.especialidad || '');
    localStorage.setItem('turno', datos.turno || '');
}

function importarJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            guardarDatosEnLocalStorage(datos);
            alert("Datos importados correctamente");
            location.reload(); // Recarga para actualizar inputs con los datos
        } catch (err) {
            alert("El archivo no es válido");
        }
    };
    reader.readAsText(file);
}

document.getElementById('btnExportar').addEventListener('click', () => {
    const datos = {
        nombre: localStorage.getItem('nombre') || '',
        semestre: localStorage.getItem('semestre') || '',
        especialidad: localStorage.getItem('especialidad') || '',
        turno: localStorage.getItem('turno')||''
    };

    const archivo = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "backup.json";
    enlace.click();
});
