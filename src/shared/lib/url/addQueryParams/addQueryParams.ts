export function addQueryParams(params: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
        if (value != undefined) {
            searchParams.set(key, value);
        }
    }
    );
    window.history.pushState(null, '', `?${searchParams.toString()}`);
}