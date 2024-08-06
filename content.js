
/**
 * Define se o script será carregado do raw.githubusercontent ou da página principal github.com.
 * 
 * Usado somente durante o desenvolvimento para contornar o cache do raw.githubusercontent.
 * 
 * github.com tem um tempo de carregamento maior por precisar de um CorsProxy
 * 
 * @constant
 * @type {boolean}
 */
const debugExe = false;

/**
 * Função Main. 
 * 
 * Busca e executa o script principal.
 * @returns {void}
 */
const main = async () => {
    let raw = await (async () => {
        if (debugExe) {
            return await getGitHubPage();
        } else {
            return await getGitHubRaw();
        }
    })();
    eval(raw);
};

/**
 * Busca o script na página principal do GitHub.
 * 
 * Utiliza um corsProxy.
 * 
 * Tempo de carregamento maior, mas sem cache.
 * @returns {string} JavaScript do código principal.
 */
const getGitHubPage = async () => {
    let raw = "(()=>{})()";
    await $.ajax({
        url: "https://lw001tallesandrade.ddns.net/corsProxy/",
        type: "GET",
        headers: {
            "URL_PROXY": "https://github.com/talesxavier1/ext/blob/dev/Main.js",
        },
        success: function (response) {
            try {
                let responseParse = JSON.parse(response);
                let rawArray = responseParse?.payload?.blob?.rawLines;
                if (Array.isArray(rawArray) && rawArray.length > 0) {
                    raw = rawArray.join("\n");
                }
            } catch (err) { }
        },
        error: function (xhr, status, error) {
        }
    });
    return raw;
};

/**
 * Busca o código que deve ser executado no raw.githubusercontent
 * 
 * 
 * @returns {string} JavaScript do código principal.
 */
const getGitHubRaw = async () => {
    let raw = "(()=>{})()";
    await $.ajax({
        url: "https://raw.githubusercontent.com/talesxavier1/ext/v1.5/Main.js",
        type: "GET",
        success: function (response) {
            raw = response;
        },
        error: function (xhr, status, error) {
        }
    });
    return raw;
};

main();




