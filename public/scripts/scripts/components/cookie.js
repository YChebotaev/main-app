/**
 * Получение куки.
 *
 * @param name
 * @returns {string|null}
 */
export function getCookie(name)
{
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : null;
}

/**
 * Установка куки.
 *
 * @param name
 * @param value
 * @param options
 */
export function setCookie(name, value, options)
{
    options = options || {};

    let expires = options.expires;

    if (typeof expires == 'number' && expires) {
        let date = new Date();

        date.setTime(date.getTime() + (expires * 1000));
        expires = options.expires = date;
    }

    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let propName in options) {

        updatedCookie += '; ' + propName;
        let propValue = options[propName];

        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
}
