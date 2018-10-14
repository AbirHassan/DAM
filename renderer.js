var ById = function (id) {
    return document.getElementById(id);
};

(function () {
    const remote = require('electron').remote;

    var closeBtn = ById('close-btn');
    console.log(closeBtn);

    function closeDAM() {
        const window = remote.getCurrentWindow();
        window.close();
    }

    closeBtn.addEventListener("click", closeDAM);
    
})();