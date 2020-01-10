let leftDoor;
let rightDoor;
let tapesDropping = false;
let tapeInterval;

$(document).ready(function() {
    CreateDoors();
    DropTheTapes();
    setTimeout(StopTheTapes, 40000);
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
    let tapeArea = viewboxWidth * 0.7;
    let intervalFrequency = 500;
    
    tapeInterval = setInterval(function() {

        let randAngle = Math.floor(Math.random() * 360);
        let theTape = $("<img class='tape' src='assets/images/wavy tape.png'>");
        theTape.css({
            position: "absolute",
            top: -100,
            left: (Math.floor(Math.random() * tapeArea)) + (viewboxWidth * 0.3),
            transform: `rotateZ(${randAngle}deg)`
        });
        $("#viewbox").append(theTape);

        theTape.animate({
            top: $("#viewbox")[0].getBoundingClientRect().height
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