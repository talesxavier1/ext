const main = () => {
    debugger;
    let components = [
        {
            "desc": " AD Header",
            "key": "id",
            "value": "jsonformatter_leaderboard_atf"
        },
        {
            "desc": " AD meio",
            "key": "id",
            "value": "jsonformatter_medrec_middle"
        },
        {
            "desc": "AD Baixo",
            "key": "xpath",
            "value": "//*[@id='page-top']/section[@class = 'ads']"
        },
    ]


    for (let COMPONENT of components) {
        let findComponent = getFirstElement(COMPONENT.key, COMPONENT.value);
        if (findComponent) {
            findComponent.remove();
        }
        debugger;
    }

}

/**
 * @param {"xpath"|"id"|"name"|"className"} By Tipo de busca.
 * @param {string} Value Valor da busca.
 * @returns {object | null} Resultado da busca. 
 */
const getFirstElement = (By, Value) => {
    if (["id", "name", "className"].includes(By)) {
        let result;
        if (By == "id") {
            result = [document.getElementById(Value)];
        } else if (By == "name") {
            result = document.getElementsByName(Value);
        } else {
            result = document.getElementsByClassName(Value);
        }

        if (!Array.isArray(result) && !(result.length > 0)) { return null; }
        return result[0];
    }

    if (By == "xpath") {
        let result = _xpath(Value);
        debugger;
    }

    return null;
}

/**
 * @param {"xpath"|"id"|"name"|"className"} By Tipo de busca.
 * @param {string} Value Valor da busca.
 * @returns {Object[] | null} Resultado da busca. 
 */
const getAllElement = (By, Value) => {

}

const _xpath = function (xpathToExecute) {
    var result = [];
    var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        result.push(nodesSnapshot.snapshotItem(i));
    }
    return result;
}




// $(() => {
//     debugger;
//     let del01 = xpath("//body//script[contains(@src, 'googletagmanager')]");
//     if (del01.length > 0) {
//         del01[0].remove();
//     }
//     debugger;
// });

// var xpath = function (xpathToExecute) {
//     var result = [];
//     var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//     for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
//         result.push(nodesSnapshot.snapshotItem(i));
//     }
//     return result;
// }

// window.addEventListener("load", async () => {
//     eval("debugger;")
//     let del01 = document.getElementsByName("jsonformatter_leaderboard_atf");
//     if (del01.length > 0) {
//         del01[0].remove();
//     }

//     let del02 = document.getElementsByName("jsonformatter_medrec_middle");
//     if (del02.length > 0) {
//         del02[0].remove();
//     }

//     let del3 = $("//*[@id='page-top']/section[@class='ads']");
//     if (del3.length > 0) {
//         del3[0].remove();
//     }

//     while (true) {
//         let iframes = document.getElementsByTagName("iframe");
//         for (let FRAMEa of iframes) {
//             FRAME.remove();
//         }
//         await timer(1);
//     }
// });

// function timer(seconds) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Timer de ${seconds} segundos concluído.`);
//         }, seconds * 1000);
//     });
// }

// window.addEventListener("load", async () => {
//     await 
// });

// document.addEventListener("DOMContentLoaded", async (event) => {
//     await main();
// });

main();