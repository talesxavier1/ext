const main_componentsDOM = () => {
    let components = [
        {
            "desc": " AD",
            "key": "id",
            "value": "jsonformatter_leaderboard_atf"
        },
        {
            "desc": " AD",
            "key": "id",
            "value": "jsonformatter_medrec_middle"
        },
        {
            "desc": "AD",
            "key": "xpath",
            "value": "//*[@id='page-top']/section[@class = 'ads']"
        },
        {
            "desc": "Conteudo sobre",
            "key": "id",
            "value": "about"
        },
        {
            "desc": "Conteudo faq",
            "key": "id",
            "value": "faq"
        },
        {
            "desc": " AD",
            "key": "id",
            "value": "jsonformatter_incontent_3"
        },
        {
            "desc": " AD",
            "key": "id",
            "value": "jsonformatter_Leaderboard_btf"
        },
        {
            "desc": " AD",
            "key": "id",
            "value": "jsonformatter_incontent_4"
        },
        {
            "desc": " AD",
            "key": "id",
            "value": "esg_atica"
        },
        {
            "desc": " AD",
            "key": "xpath",
            "value": "//div[contains(@class, 'orp-player-wrapper')]"
        },
    ];

    for (let COMPONENT of components) {
        let findComponent = _getFirstElements(COMPONENT.key, COMPONENT.value);
        findComponent.forEach(VALUE => VALUE.remove());
    }
}

const main_componentsObserve = () => {
    new MutationObserver((mutationsList, observer) => {
        debugger

        for (let MUTATION of mutationsList) {
            for (let NODE of MUTATION.addedNodes) {
                debugger
            }
        }

        debugger;
    }).observe(document.getElementById("page-top"), { childList: true });
}

const _getFirstElements = (By, Value) => {
    if (["id", "name", "className"].includes(By)) {
        let result;
        if (By == "id") {
            result = [document.getElementById(Value)];
        } else if (By == "name") {
            result = document.getElementsByName(Value);
        } else {
            result = document.getElementsByClassName(Value);
        }

        if (!Array.isArray(result)) { return []; }
        return result;
    }

    if (By == "xpath") {
        let result = _xpath(Value);
        if (!Array.isArray(result)) { return []; }
        return result;
    }

    return [];
}

const _xpath = function (xpathToExecute) {
    var result = [];
    var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        result.push(nodesSnapshot.snapshotItem(i));
    }
    return result;
}

function _timer(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Timer de ${seconds} segundos concluído.`);
        }, seconds * 1000);
    });
}

main_componentsDOM();
main_componentsObserve();


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





// document.addEventListener("DOMContentLoaded", async (event) => {
//     await main();
// });
