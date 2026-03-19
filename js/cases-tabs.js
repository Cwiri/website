document.addEventListener("DOMContentLoaded", function () {
    var caseTabs = document.querySelectorAll(".case-tab");

    caseTabs.forEach(function (tab) {
        tab.addEventListener("toggle", function () {
            if (!tab.open) {
                return;
            }

            caseTabs.forEach(function (otherTab) {
                if (otherTab !== tab) {
                    otherTab.open = false;
                }
            });
        });
    });
});
