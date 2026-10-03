import type {IEvent} from '../types/IEvent.ts';

// The provider is optional. No request is made without explicit browser-key configuration.
export function mountEventMap(options: {
    document: Document; getProvider: () => any; key?: string; events: IEvent[];
    container: HTMLElement; onError: () => void;
}): () => void {
    const {document, getProvider, key, events, container, onError} = options;
    if (!key) return () => {};
    let disposed = false;
    let map: any = null;
    const script = document.createElement('script');
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const cleanup = () => {
        if (disposed) return;
        disposed = true;
        clearTimeout(timeout);
        script.onload = null;
        script.onerror = null;
        script.remove();
        if (map) {
            try { map.destroy(); } catch { /* Provider teardown must not block unmount. */ }
            map = null;
        }
    };
    const fail = () => { if (!disposed) { cleanup(); onError(); } };
    script.async = true;
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(key)}&lang=ru_RU`;
    script.onerror = fail;
    script.onload = () => {
        if (disposed) return;
        const provider = getProvider();
        if (!provider?.ready || !provider.Map || !provider.Placemark) { fail(); return; }
        try {
            provider.ready(() => {
                if (disposed || map) return;
                try {
                    map = new provider.Map(container, {center: [58.048640, 38.855711], zoom: 14});
                    for (const event of events) {
                        map.geoObjects.add(new provider.Placemark([event.lat, event.lng], {
                            hintContent: event.title,
                            balloonContent: `<b>${event.title}</b><br/>${event.description ?? ''}`
                        }, {preset: 'islands#blueCircleDotIconWithCaption'}));
                    }
                    clearTimeout(timeout);
                } catch { fail(); }
            });
        } catch { fail(); }
    };
    timeout = setTimeout(fail, 15000);
    document.head.appendChild(script);
    return cleanup;
}
