let leftDoor;
let rightDoor;
let tapeInterval;
let waveInterval;
let running = false;
let theTune = new Audio("assets/audio/city.mp3"); 

let halfDisplay = $("#display")[0].getBoundingClientRect().width / 2;

$(document).ready(function () {
    ConfigureButtons();
    CreateDoors();
})

function RunThePromo() {
    running = true;
    theTune.play();
    OpenDoors();
    MakeWaves();
    setTimeout(DropTheTapes, 5000);
    setTimeout(ThrowUpTheName, 20000);
    setTimeout(StopIntervals, 30000);
}

function ConfigureButtons() {

    document.onkeydown = function(event) {
        switch(event.code) {
            case "Space":
                if (!running) {
                    RunThePromo();
                }
                break;
        }
    }

}

function MakeWaves() {

    let intervalFrequency = 300;

    waveInterval = setInterval(function () {

        let randLeft = 0;
        let maxRight = $("#viewbox")[0].getBoundingClientRect().width;
        let randTop = Math.floor(Math.random() * $("#viewbox")[0].getBoundingClientRect().height);
        let randNum = Math.floor(Math.random() * 2);

        if (randNum === 1) {
            randLeft = maxRight;
        };

        let wave = $("<h1 class='wave'>");
        wave.text("~");
        wave.css({
            position: "absolute",
            color: "black",
            display: "none",
            top: randTop,
            left: randLeft
        });

        $("#viewbox").append(wave);

        switch (randLeft) {
            case 0:
                wave.fadeIn(500);
                wave.animate({
                    left: maxRight
                }, {
                    easing: "linear",
                    duration: 5000,
                    complete: function () {
                        wave.fadeOut(500, function () {
                            wave.remove();
                        });
                    }
                });
                break;

            case maxRight:
                wave.fadeIn(500);
                wave.animate({
                    left: -10
                }, {
                    easing: "linear",
                    duration: 5000,
                    complete: function () {
                        wave.fadeOut(500, function () {
                            wave.remove();
                        });
                    }
                });
                break;
        }

    }, intervalFrequency);

}

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

}

function OpenDoors() {
    leftDoor.animate({
        left: 0 - (halfDisplay * 1)
    }, {
        easing: "linear",
        duration: 20000,
        complete: function() {
            leftDoor.animate({
                left: 0
            }, {
                duration: 10000
            });
        }
    });

    rightDoor.animate({
        left: parseInt(rightDoor.css("width"), 10) + (halfDisplay * 1)
    }, {
        easing: "linear",
        duration: 20000,
        complete: function() {
            rightDoor.animate({
                left: halfDisplay                
            }, {
                duration: 10000
            });
        }
    });
}

function DropTheTapes() {
    let viewboxWidth = $("#viewbox")[0].getBoundingClientRect().width;
    let tapeArea = viewboxWidth * 0.6;
    let intervalFrequency = 500;

    tapeInterval = setInterval(function () {

        let randAngle = Math.floor(Math.random() * 360);
        let randNum = Math.floor(Math.random() * 2);
        if (randNum === 0) { randAngle *= -1; }

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
            complete: function () {
                theTape.fadeOut(500, function () {
                    theTape.remove();
                });
            }
        });
    }, intervalFrequency);
}

function StopIntervals() {
    clearInterval(tapeInterval);
    clearInterval(waveInterval);
    theTune.pause();
    theTune.currentTime = 0;
    running = false;
}

function ThrowUpTheName() {

    let prophetTop = $("#viewbox")[0].getBoundingClientRect().height * 0.7;
    prophetTop = -100;

    $("#prophet").animate({
        top: prophetTop
    }, {
        duration: 15000,
        complete: function() {
            $("#prophet").css({top: "100%"});
        }
    })

}