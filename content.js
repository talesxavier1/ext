
const debugExe = true;;

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

const getGitHubRaw = async () => {
    let raw = "(()=>{})()";
    await $.ajax({
        url: "https://raw.githubusercontent.com/talesxavier1/ext/dev/Main.js",
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




