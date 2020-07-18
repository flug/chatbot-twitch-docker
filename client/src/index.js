import {EventSourcePolyfill, NativeEventSource} from 'event-source-polyfill';
import setting from './config'

(function (document) {
    const EventSource = NativeEventSource || EventSourcePolyfill;
    const audio = document.createElement('audio');
    const image = document.createElement('img');
    const container = document.getElementById('container');
    const DEFAULT_TIMEOUT_FOR_CLEANING_CONTAINER = 10000;
    const token = setting.MERCURE_TOKEN;


    audio.addEventListener('createAudio', (e) => {
        audio.src = e.detail.path;
        audio.controls = false;
        audio.autoplay = true;
        container.append(audio)
    })

    image.addEventListener('createImage', (e) => {
        image.src = e.detail.path
        container.append(image)
    })
    container.addEventListener('clear', (e) => {
        let duration = e.detail.duration;
        container.classList.add('transition');
        setTimeout((e) => {
            container.classList.remove('transition');
            container.innerHTML = '';
            audio.pause()
        }, duration || DEFAULT_TIMEOUT_FOR_CLEANING_CONTAINER)
    })


    const url = new URL(setting.MERCURE_URL);
    url.searchParams.append('topic', '/interact');

    let event = new EventSource(url, {authorizationHeader: "Bearer " + token});

    event.onmessage = (e) => {

        let data = JSON.parse(e.data)
        console.log(data.audio.path);
        if (data.hasOwnProperty('audio')) {
            let ev = new CustomEvent("createAudio", {
                detail: {
                    path: data.audio.path,
                }
            });
            audio.dispatchEvent(ev);
        }
        if (data.hasOwnProperty('image')) {
            let ev = new CustomEvent("createImage", {
                detail: {
                    path: data.image.path,
                }
            });
            image.dispatchEvent(ev);
        }

        container.dispatchEvent(new CustomEvent('clear', {
            detail: {
                duration: data.duration.time
            }
        }))
    }

})(document);





