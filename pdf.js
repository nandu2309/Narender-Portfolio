
// Simulated content of pdf.js - this would be the actual pdf.js content in real setup
window.pdfjsLib = window.pdfjsLib || {};
pdfjsLib.getDocument = function () {
    return {
        promise: Promise.resolve({
            getPage: (n) => Promise.resolve({
                getViewport: () => ({ width: 600, height: 800 }),
                render: () => ({ promise: Promise.resolve() })
            })
        })
    };
};
