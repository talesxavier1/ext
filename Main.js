

class Main {

    _onLoadComponents = `
    id|jsonformatter_leaderboard_atf;
    id|jsonformatter_medrec_middle;
    xpath|//*[@id='page-top']/section[@class = 'ads'];
    id|about;
    id|faq;
    id|jsonformatter_incontent_3;
    id|jsonformatter_Leaderboard_btf;
    id|esg_atica;
    id|jsonformatter_incontent_4;
    id|fs-sticky-footer;
    xpath|//div[contains(@class, 'orp-player-wrapper')];
    xpath|//*[@id='page-top']/iframe;
    tagName|iframe;
    `;

    _clearOnLoadComponents = () => {
        let onLoadComponents = this._mountOnLoadCamponentsObject();
        for (let COMPONENT of onLoadComponents) {
            let findNodes = this._getFirstElements(COMPONENT.key, COMPONENT.value);
            findNodes.forEach((VALUE) => this._tryDeleteNode(VALUE));
        }
    }

    _mountOnLoadCamponentsObject = () => {
        let strComponents = this._onLoadComponents;
        let splitComponents = strComponents.split(";");
        return splitComponents.map(VALUE => {
            let component = VALUE.replace("\n", "").split("|");
            return {
                "key": component[0].trim(),
                "value": component[1],
            }
        });
    }

    _getFirstElements = (By, Value) => {
        let result;
        switch (By) {
            case "id":
                result = [document.getElementById(Value)];
                break;
            case "name":
                result = document.getElementsByName(Value);
                break;
            case "className":
                result = document.getElementsByClassName(Value);
                break;
            case "tagName":
                result = document.getElementsByTagName(Value);
                break;
            case "xpath":
                let Partialresult = [];
                let nodesSnapshot = document.evaluate(Value, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
                    Partialresult.push(nodesSnapshot.snapshotItem(i));
                }
                result = Partialresult;
                break;
        }

        if (!Array.isArray(result)) { return []; }
        return result;
    }

    _tryDeleteNode = (node) => {
        try {
            node.remove();
        } catch (err) { console.log("err") }
    }

    _observe = (mutationsList) => {
        debugger;
        let nodes = mutationsList.map(VALUE => VALUE.addedNodes);
        nodes = nodes.flat();
        for (let NODE of nodes) {
            if (NODE.localName == "iframe") {
                this._tryDeleteNode(NODE);
            } else if (NODE.className == "orp-player-wrapper") {
                this._tryDeleteNode(NODE);
            }
        }
    }

    constructor() {
        this._clearOnLoadComponents();
        new MutationObserver(this._observe).observe(document.documentElement, { childList: true, subtree: true });
    }

}

new Main();






/*
const main_componentsDOM = () => {

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
*/