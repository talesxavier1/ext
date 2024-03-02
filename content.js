
const main = () => {
    let script = getScript();
    eval(script);
}

const getScript = () => {
    $.ajax({
        url: "https://raw.githubusercontent.com/talesxavier1/Json-Schema/main/jsonSchemaLib/js/JS_Main.js",
        type: "GET",
        success: function (response) {
            return response;
        },
        error: function (xhr, status, error) {
            return "(()=>{})()";
        }
    });
}

main();

