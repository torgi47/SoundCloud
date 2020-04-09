let leftDoor;
let rightDoor;
let tapeInterval;

let halfDisplay = $("#display")[0].getBoundingClientRect().width / 2;

$(document).ready(function () {
    ConfigureButtons();
})

function DoThis() {
    ThrowUpTheName();
}

function ConfigureButtons() {

    document.onkeydown = function(event) {
        switch(event.code) {
            case "Space":
                    DoThis();
                break;
        }
    }

}

function StopIntervals() {
}

function ThrowUpTheName() {

    let prophetTop = $("#text")[0].getBoundingClientRect().height * 0.7;
    prophetTop = -100;

    $("#prophet").fadeIn();
    $("#prophet").animate({
        top: prophetTop
    }, {
        duration: 15000,
        complete: function() {
            $("#prophet").css({top: "100%", display: "none"});
        }
    })

}