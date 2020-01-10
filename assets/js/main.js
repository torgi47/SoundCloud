let leftDoor;
let rightDoor;

$(document).ready(function() {
    CreateDoors();
    OpenDoors();
})

let halfDisplay = $("#display")[0].getBoundingClientRect().width / 2;

function CreateDoors() {
    leftDoor = $("<div id='leftDoor'>");
    leftDoor.css({
        position: "absolute",
        left: 0,
        width: halfDisplay,
        height: "100%",
        "background-color": "red",
        "border-right": "1px solid black"
    });

    $("#display").append(leftDoor);


    rightDoor = $("<div id='rightDoor'>");
    rightDoor.css({
        position: "absolute",
        left: halfDisplay,
        width: halfDisplay,
        height: "100%",
        "background-color": "blue",
        "border-left": "1px solid grey"
    });

    $("#display").append(rightDoor);

}