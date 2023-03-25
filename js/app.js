// VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// EVENT LISTENERS
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
}

// FUNCIONES
function agregarTweet(e){
    e.preventDefault();

    // textArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación...
    if(tweet === ''){
        mostrarError('Un msj no puede ir vacío');

        return; // Evita que se ejecuten más lineas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }

    // Añadir al Arreglo de Tweets
    tweets = [...tweets, tweetObj];

    // Y una vez agregado vamos a crear el HTML
    crearHTML();

    // Reiniciar el Formulario
    formulario.reset();
}

// Mostrar msj de Error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta después de 3 seg.
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los Tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach(tweet => {
            // Crear el HTML
            const li = document.createElement('li');

            // Añadir el texto
            li.textContent = tweet.tweet;

            // Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los TWeets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}