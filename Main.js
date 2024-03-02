const main = () => {

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
//         for (let FRAME of iframes) {
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


main();