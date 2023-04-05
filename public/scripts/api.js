class Api {
    static getUrl(endpoint = '') {
        const domain = window.location.hostname;

        let url = `http://api.numma-teat.online/currency_exchange/${endpoint}`;

        return url
    }
}
