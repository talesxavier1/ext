
const main = async () => {
    let gitHubPageGet = await getScript();
    debugger;
    eval(script);
}

const getScript = async () => {
    let _response = "(()=>{})()";
    await $.ajax({
        url: "https://raw.githubusercontent.com/talesxavier1/ext/dev/Main.js",
        type: "GET",
        headers: {
            "Accept": "*/*",
        },
        success: function (response) {
            _response = response;
        },
        error: function (xhr, status, error) {
        }
    });
    return _response
}

main();

