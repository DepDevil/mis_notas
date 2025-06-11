const lista = document.getElementById('listaNotas');

function guardarNota() {
  const materia = document.getElementById('materia').value;
  const nota = document.getElementById('nota').value;
  if (!materia || !nota) return;

  const notas = JSON.parse(localStorage.getItem('notas')) || [];
  notas.push({ materia, nota });
  localStorage.setItem('notas', JSON.stringify(notas));

  mostrarNotas();
  enviarNotificacion(materia, nota);
}

function mostrarNotas() {
  lista.innerHTML = '';
  const notas = JSON.parse(localStorage.getItem('notas')) || [];
  notas.forEach(n => {
    const li = document.createElement('li');
    li.textContent = `${n.materia}: ${n.nota}`;
    lista.appendChild(li);
  });
}

function enviarNotificacion(materia, nota) {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification("Nota registrada", {
        body: `${materia}: ${nota}`
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification("Nota registrada", {
            body: `${materia}: ${nota}`
          });
        }
      });
    }
  }
}

mostrarNotas();

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(err => console.error('Error al registrar SW:', err));
} 