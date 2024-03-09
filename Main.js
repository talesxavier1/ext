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
        {
            "desc": "Iframes",
            "key": "xpath",
            "value": "//*[@id='page-top']/iframe"
        },

    ];

    for (let COMPONENT of components) {
        let findComponent = _getFirstElements(COMPONENT.key, COMPONENT.value);
        findComponent.forEach(VALUE => VALUE ? VALUE.remove() : "");
    }
}

const main_componentsObserve = () => {
    debugger;
    new MutationObserver((mutationsList, observer) => {
        debugger;
        for (let MUTATION of mutationsList) {
            for (let ADDED_NODES of MUTATION.addedNodes) {
                if (ADDED_NODES.localName == "iframe") {
                    ADDED_NODES.remove();
                } else if (ADDED_NODES.className == "orp-player-wrapper") {
                    ADDED_NODES.remove();
                }
            }
        }
    }).observe(document.documentElement, { childList: true, subtree: true });

}

const _getFirstElements = (By, Value) => {
    if (["id", "name", "className", "tagName"].includes(By)) {
        let result;
        if (By == "id") {
            result = [document.getElementById(Value)];
        } else if (By == "name") {
            result = document.getElementsByName(Value);
        } else if (By == "tagName") {
            result = document.getElementsByTagName(Value);
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