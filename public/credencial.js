document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nombre').value = localStorage.getItem('nombre') || '';
    document.getElementById('semestre').value = localStorage.getItem('semestre') || '';
    document.getElementById('especialidad').value = localStorage.getItem('especialidad') || '';
    document.getElementById('turno').value = localStorage.getItem('turno') || '';
    document.getElementById('matricula').value = localStorage.getItem('matricula') || '';
    
    document.getElementById('importar').addEventListener('change', importarJSON);
    const pfp = document.getElementById('pfp');
    const savedImage = localStorage.getItem('previewBackground');
    if (savedImage) {
        pfp.style.backgroundImage = `url(${savedImage})`;
    }
    const fileInput = document.getElementById('upload-pfp');
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const imgDataUrl = event.target.result;
            pfp.style.backgroundImage = `url(${imgDataUrl})`;
            localStorage.setItem('previewBackground', imgDataUrl);
            alert('Foto de perfil actualizada');
        };
        reader.readAsDataURL(file);
    });
});

document.getElementById('guardar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const semestre = document.getElementById('semestre').value;
    const especialidad = document.getElementById('especialidad').value;
    const turno = document.getElementById('turno').value;
    const matricula= document.getElementById('matricula').value;

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('semestre', semestre);
    localStorage.setItem('especialidad', especialidad);
    localStorage.setItem('turno', turno);
    localStorage.setItem('matricula', matricula);

    alert('Cambios guardados correctamente');
    window.location.href = './index.html';
})

function importarJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            localStorage.setItem('nombre', datos.nombre || '');
            localStorage.setItem('semestre', datos.semestre || '');
            localStorage.setItem('especialidad', datos.especialidad || '');
            localStorage.setItem('turno', datos.turno || '');
            localStorage.setItem('matricula', datos.matricula || '');

            alert("Datos importados correctamente");
            location.reload();
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
        turno: localStorage.getItem('turno')||'',
        matricula: localStorage.getItem('matricula')||''
    };

    const archivo = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "backup.json";
    enlace.click();
});

document.getElementById('changepfp').addEventListener('click', () => {
    const pfp = document.getElementById('pfp');

    window.addEventListener('load', () => {
        const savedImage = localStorage.getItem('previewBackground');
        if (savedImage) {
        pfp.style.backgroundImage = `url(${savedImage})`;
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
        const imgDataUrl = event.target.result;

        pfp.style.backgroundImage = `url(${imgDataUrl})`;

        localStorage.setItem('previewBackground', imgDataUrl);
        };
        reader.readAsDataURL(file);
    });
});