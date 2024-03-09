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
    id|headerDiv;
    id|jsonformatter_sticky_footer-stylesheet;
    xpath|//html/head/script[contains(@src, 'pubfig.engine.js')];
    xpath|//html/head/script[contains(@src, 'pubfig.min.js')];
    xpath|//html/head/script[contains(@src, 'a.pub.network')];
    xpath|//html/head/link[contains(@href, 'a.pub.network')];
    xpath|html/iframe
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
        let nodes = (() => {
            let Partialresult = [];
            for (let MUTATION of mutationsList) {
                for (let ADDED_NODES of MUTATION.addedNodes) {
                    Partialresult.push(ADDED_NODES);
                }
            }
            return Partialresult;
        });


        // ().filter(VALUE => {
        //     if (VALUE.id == "jsonformatter_sticky_footer-stylesheet") {
        //         this._tryDeleteNode(VALUE);
        //         console.log(window.Xr?.adjust)
        //         return false;
        //     }
        //     return true;
        // });

        if (nodes.length == 0) { return }

        this._clearOnLoadComponents();
        console.log("_observe");
    }

    _originalSetTimeout;
    // _bypassSetTimeout 

    constructor() {
        this._clearOnLoadComponents();
        new MutationObserver(this._observe).observe(document.documentElement, { childList: true, subtree: true });

        const originalSetTimeout = window.setTimeout;
        window.setTimeout = (callback, delay, ...args) => {
            const id = originalSetTimeout(callback, delay, ...args);
            debugger;
            return id;
        }
    }
}

new Main();