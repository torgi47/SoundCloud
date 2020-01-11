let leftDoor;
let rightDoor;
let tapesDropping = false;
let tapeInterval;

$(document).ready(function() {
    CreateDoors();
    DropTheTapes();
    ThrowUpTheName();
    setTimeout(StopTheTapes, 40000);
    // setTimeout(ThrowUpTheName, 20000);
})

let halfDisplay = $("#display")[0].getBoundingClientRect().width / 2;

function CreateDoors() {
    leftDoor = $("<div id='leftDoor'>");
    leftDoor.css({
        position: "absolute",
        left: 0,
        width: halfDisplay,
        height: "100%",
        "background-color": "black",
        "border-right": "1px solid black"
    });

    $("#display").append(leftDoor);


    rightDoor = $("<div id='rightDoor'>");
    rightDoor.css({
        position: "absolute",
        left: halfDisplay,
        width: halfDisplay,
        height: "100%",
        "background-color": "black",
        "border-left": "1px solid black"
    });

    $("#display").append(rightDoor);

    OpenDoors();

}

function OpenDoors() {
    leftDoor.animate({
        left: 0 - (halfDisplay * 0.9)
    }, {
        easing: "linear",
        duration: 20000
    });

    rightDoor.animate({
        left: parseInt(rightDoor.css("width"), 10) + (halfDisplay * 0.9)
    }, {
        easing: "linear",
        duration: 20000
    });
}

function DropTheTapes() {
    tapesDropping = true;
    let viewboxWidth = $("#viewbox")[0].getBoundingClientRect().width;
    let tapeArea = viewboxWidth * 0.6;
    let intervalFrequency = 500;
    
    tapeInterval = setInterval(function() {

        let randAngle = Math.floor(Math.random() * 360);
        let randNum = Math.floor(Math.random() * 2);
        if (randNum === 0) {randAngle *= -1;}

        let theTape = $("<img class='tape' src='assets/images/wavy tape.png'>");
        theTape.css({
            position: "absolute",
            top: -100,
            left: (Math.floor(Math.random() * tapeArea)) + ((viewboxWidth - tapeArea) / 2),
            transform: `rotateZ(${randAngle}deg)`
        });
        $("#viewbox").append(theTape);

        if (randNum === 0) {
            theTape.css("animation-direction", "reverse");
        }

        theTape.animate({
            top: $("#viewbox")[0].getBoundingClientRect().height + 100
        }, {
            easing: "linear",
            duration: 3000,
            complete: function() {
                theTape.fadeOut(500, function() {
                    theTape.remove();
                });
            }
        });
    }, intervalFrequency);
}

function StopTheTapes() {
    clearInterval(tapeInterval);
    tapesDropping = false;
}

function ThrowUpTheName() {

    let prophetTop = $("#viewbox")[0].getBoundingClientRect().height * 0.7;
    prophetTop = -100;

    $("#prophet").animate({
        top: prophetTop
    }, {
        duration: 15000
    })

}