
const main = async () => {
    let gitHubPageGet = await getScript();
    let rawArray = gitHubPageGet?.payload?.blob?.rawLines;
    if (Array.isArray(rawArray) && rawArray.length > 0) {
        let raw = rawArray.join("\n");
        eval(raw);
    }
}

const getScript = async () => {
    let _response = {};
    await $.ajax({
        url: "https://lw001tallesandrade.ddns.net/corsProxy/",
        type: "GET",
        headers: {
            "URL_PROXY": "https://github.com/talesxavier1/ext/blob/dev/Main.js",
        },
        success: function (response) {
            try {
                _response = JSON.parse(response);
            } catch (err) { }
        },
        error: function (xhr, status, error) {
            debugger;
        }
    });
    return _response
}
main();




