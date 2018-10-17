var ById = function (id) {
    return document.getElementById(id);
};

(function () {
    const remote = require('electron').remote;

    var closeBtn = ById('close-btn');
    var submitBtn = ById('submit');
    console.log(closeBtn);
    console.log(submitBtn);

    function closeDAM() {
        const window = remote.getCurrentWindow();
        window.close();
    }

    function submit() {
        var field = document.getElementById();
        
    }

    closeBtn.addEventListener("click", closeDAM);
    
})();