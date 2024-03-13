class Main {

    /**
     * Componentes que devem ser deletados no DOM.
     * {key:string}|{value:string}
     * @type {string}
     * @private
     */
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
    id|jsonformatter_sticky_footer-stylesheet;
    xpath|//html/head/script[contains(@src, 'pubfig.engine.js')];
    xpath|//html/head/script[contains(@src, 'pubfig.min.js')];
    xpath|//html/head/script[contains(@src, 'a.pub.network')];
    xpath|//html/head/link[contains(@href, 'a.pub.network')];
    xpath|html/iframe
    `;

    /**
     * Executa a limpeza dos campos no DOM.
     * @private
     * @returns {void}
     * @private
     */
    _clearOnLoadComponents = () => {
        let onLoadComponents = this._mountOnLoadCamponentsObject();
        for (let COMPONENT of onLoadComponents) {
            let findNodes = this._getElements(COMPONENT.key, COMPONENT.value);
            findNodes.forEach((VALUE) => this._tryDeleteNode(VALUE));
        }
    }

    /**
     * Monta um objeto na estrutura 'BaseComponentInfo'.
     * @typedef {Object} BaseComponentInfo
     * @property {"id"|"name"|"className"|"tagName"|"xpath"} key Tipo de campo.
     * @property {string} value - valor do campo.
     * @returns {BaseComponentInfo}
     * @private
     */
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

    /**
     * Busca um ou mais elementos no DOM usando o capo passado em By e o valor passado em Value.
     * @param {"id"|"name"|"className"|"tagName"|"xpath"} By 
     * @param {string} Value 
     * @returns {Node[]}
     * @private
     */
    _getElements = (By, Value) => {
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

    /**
     * Tenta remover o node passado do DOM.
     * @param {Node} node 
     * @returns {void}
     * @private
     */
    _tryDeleteNode = (node) => {
        try {
            node.remove();
        } catch (err) { }
    }

    /**
     * Função Callback do MutationObserver. Observa os novos eventos do HTML.
     * @param {MutationRecord[]} mutationsList 
     * @returns {void}
     * @private
     */
    _observe = (mutationsList) => {
        let nodes = (() => {
            let Partialresult = [];
            for (let MUTATION of mutationsList) {
                for (let ADDED_NODES of MUTATION.addedNodes) {
                    Partialresult.push(ADDED_NODES);
                }
            }
            return Partialresult;
        })();

        if (nodes.length == 0) { return }

        this._clearOnLoadComponents();
    }

    /**
     * Construtor da classe Main.
     * 
     * Executa o _clearOnLoadComponents, inicia o MutationObserver e monitora o window.setTimeout para bloquear agendamentos do a.pub.
     * @constructor
     * 
     */
    constructor() {
        this._clearOnLoadComponents();
        new MutationObserver(this._observe).observe(document.documentElement, { childList: true, subtree: true });

        const originalSetTimeout = window.setTimeout;
        window.setTimeout = (callback, delay, ...args) => {
            if (callback.toString().includes("Xr.adjust")) { return null }
            return originalSetTimeout(callback, delay, ...args);
        }
    }
}

new Main();