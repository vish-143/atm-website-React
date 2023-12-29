export function changeLanguage(value) {
    let loc = window.location.href;
    loc=loc.split('?lng=')[0]
    window.location.replace(
        loc + "?lng=" + value
    );
}