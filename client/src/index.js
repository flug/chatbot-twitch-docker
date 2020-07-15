import {EventSourcePolyfill, NativeEventSource} from 'event-source-polyfill';

(function (document) {
    const EventSource = NativeEventSource || EventSourcePolyfill;

    const audio = document.createElement('audio');
    audio.controls = false;
    audio.autoplay = true;

    const image = document.createElement('img');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InN1YnNjcmliZSI6WyJmb28iLCJiYXIiXSwicHVibGlzaCI6WyJmb28iXX19.afLx2f2ut3YgNVFStCx95Zm_UND1mZJ69OenXaDuZL8';


    const url = new URL('https://localhost:1337/.well-known/mercure');
    url.searchParams.append('topic', '/interact');

    let event = new EventSource(url, {authorizationHeader: "Bearer " + token});


    event.onmessage = (e) => {

        let data = JSON.parse(e.data)
        audio.src = data.audio.path;
        image.src = data.image.path;


        document.getElementById('container').innerHTML = audio.outerHTML;
        document.getElementById('container').innerHTML += image.outerHTML;

        setTimeout(() => {
            document.getElementById('container').classList.add('transition');
            document.getElementById('container').innerText = '';
            audio.pause();
        }, data.duration)

    }

    console.log('ok');
})(document);





