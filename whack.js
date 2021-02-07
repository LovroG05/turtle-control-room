var socket = new WebSocket("ws://83.212.82.182:6969/soket");

var current_turtle_id = 0;

var inventory_0;
var inventory_24;

var fuel_0;
var fuel_24;

var patt = /[a-z]+:/


/* function log(data) {
    let p = document.createElement("p");
    p.classList.add("text-white");
    p.textContent = JSON.stringify(data);
    document.getElementById("logSub").appendChild(p);
} */

function submit() {
    command = document.getElementById("command").value;

    jsonobj = {"command": command, "id": current_turtle_id};

    console.log(jsonobj)
    socket.send(JSON.stringify(jsonobj));
}

function submitPD() {
    command = document.getElementById("directive").value;

    jsonobj = {"command": "", "directive": command, "id": current_turtle_id};

    console.log(jsonobj)
    socket.send(JSON.stringify(jsonobj));
}

function submitParam(command="", directive="") {
    console.log(current_turtle_id);
    jsonobj = {"command": command, "directive": directive, "id": current_turtle_id};

    console.log(jsonobj)
    socket.send(JSON.stringify(jsonobj));
}

function select() {
    command = document.getElementById("slot").value;
    str = "turtle.select(" + command + ")";
    submitParam(command=str);
}

function goForward() {
    submitParam(command="turtle.forward()");
}

function goUp() {
    submitParam(command="turtle.up()");
}

function goDown() {
    submitParam(command="turtle.down()");
}

function turnLeft() {
    submitParam(command="turtle.turnLeft()");
}

function turnRight() {
    submitParam(command="turtle.turnRight()");
}

function refuel() {
    submitParam(command="turtle.refuel()");
}

function digUp() {
    submitParam(command="turtle.digUp()");
}

function dig() {
    submitParam(command="turtle.dig()");
}

function digDown() {
    submitParam(command="turtle.digDown()");
}

function placeUp() {
    submitParam(command="turtle.placeUp()");
}

function place() {
    submitParam(command="turtle.place()");
}

function placeDown() {
    submitParam(command="turtle.placeDown()");
}

function stripMine() {
    submitParam(command="", directive="stripmine")
}

function setFuel() {
    if (current_turtle_id == 0) {
        if (fuel_0) {
            document.getElementById("fuel").innerHTML = fuel_0;
        }
        else {
            document.getElementById("fuel").innerHTML = "?";
        }
    }
    else if (current_turtle_id == 24) {
        if (fuel_24) {
            document.getElementById("fuel").innerHTML = fuel_24;
        }
        else {
            document.getElementById("fuel").innerHTML = "?";
        }
    }
}

function setInventory(inventory) {
    if (inventory["1"]) {
        document.getElementById("i1").innerHTML = inventory["1"].count;
        str = inventory["1"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t1").innerHTML = str1;
    }
    else {
        document.getElementById("i1").innerHTML = 0;
        document.getElementById("t1").innerHTML = "";
    }

    if (inventory["2"]) {
        document.getElementById("i2").innerHTML = inventory["2"].count;
        str = inventory["2"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t2").innerHTML = str1;
    }
    else {
        document.getElementById("i2").innerHTML = 0;
        document.getElementById("t2").innerHTML = "";
    }

    if (inventory["3"]) {
        document.getElementById("i3").innerHTML = inventory["3"].count;
        str = inventory["3"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t3").innerHTML = str1;
    }
    else {
        document.getElementById("i3").innerHTML = 0;
        document.getElementById("t3").innerHTML = "";
    }

    if (inventory["4"]) {
        document.getElementById("i4").innerHTML = inventory["4"].count;
        str = inventory["4"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t4").innerHTML = str1;
    }
    else {
        document.getElementById("i4").innerHTML = 0;
        document.getElementById("t4").innerHTML = "";
    }

    if (inventory["5"]) {
        document.getElementById("i5").innerHTML = inventory["5"].count;
        str = inventory["5"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t5").innerHTML = str1;
    }
    else {
        document.getElementById("i5").innerHTML = 0;
        document.getElementById("t5").innerHTML = "";
    }

    if (inventory["6"]) {
        document.getElementById("i6").innerHTML = inventory["6"].count;
        str = inventory["6"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t6").innerHTML = str1;
    }
    else {
        document.getElementById("i6").innerHTML = 0;
        document.getElementById("t6").innerHTML = "";
    }

    if (inventory["7"]) {
        document.getElementById("i7").innerHTML = inventory["7"].count;
        str = inventory["7"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t7").innerHTML = str1;
    }
    else {
        document.getElementById("i7").innerHTML = 0;
        document.getElementById("t7").innerHTML = "";
    }

    if (inventory["8"]) {
        document.getElementById("i8").innerHTML = inventory["8"].count;
        str = inventory["8"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t8").innerHTML = str1;
    }
    else {
        document.getElementById("i8").innerHTML = 0;
        document.getElementById("t8").innerHTML = "";
    }

    if (inventory["9"]) {
        document.getElementById("i9").innerHTML = inventory["9"].count;
        str = inventory["9"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t9").innerHTML = str1;
    }
    else {
        document.getElementById("i9").innerHTML = 0;
        document.getElementById("t9").innerHTML = "";
    }

    if (inventory["10"]) {
        document.getElementById("i10").innerHTML = inventory["10"].count;
        str = inventory["10"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t10").innerHTML = str1;
    }
    else {
        document.getElementById("i10").innerHTML = 0;
        document.getElementById("t10").innerHTML = "";
    }

    if (inventory["11"]) {
        document.getElementById("i11").innerHTML = inventory["11"].count;
        str = inventory["11"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t11").innerHTML = str1;
    }
    else {
        document.getElementById("i11").innerHTML = 0;
        document.getElementById("t11").innerHTML = "";
    }

    if (inventory["12"]) {
        document.getElementById("i12").innerHTML = inventory["12"].count;
        str = inventory["12"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t12").innerHTML = str1;
    }
    else {
        document.getElementById("i12").innerHTML = 0;
        document.getElementById("t12").innerHTML = "";
    }

    if (inventory["13"]) {
        document.getElementById("i13").innerHTML = inventory["13"].count;
        str = inventory["13"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t13").innerHTML = str1;
    }
    else {
        document.getElementById("i13").innerHTML = 0;
        document.getElementById("t13").innerHTML = "";
    }

    if (inventory["14"]) {
        document.getElementById("i14").innerHTML = inventory["14"].count;
        str = inventory["14"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t14").innerHTML = str1;
    }
    else {
        document.getElementById("i14").innerHTML = 0;
        document.getElementById("t14").innerHTML = "";
    }

    if (inventory["15"]) {
        document.getElementById("i15").innerHTML = inventory["15"].count;
        str = inventory["15"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t15").innerHTML = str1;
    }
    else {
        document.getElementById("i15").innerHTML = 0;
        document.getElementById("t15").innerHTML = "";
    }

    if (inventory["16"]) {
        document.getElementById("i16").innerHTML = inventory["16"].count;
        str = inventory["16"].name;
        str1 = str.replace(patt, "")
        document.getElementById("t16").innerHTML = str1;
    }
    else {
        document.getElementById("i16").innerHTML = 0;
        document.getElementById("t16").innerHTML = "";
    }

    setFuel();
}

function setCurrentIdLabel() {
    document.getElementById("turtleID").innerHTML = current_turtle_id;
}

function changeTurtleZero() {
    current_turtle_id = 0;
    submitParam(command="print('Getting Turtle Data...')");
    setCurrentIdLabel();
}

function changeTurtleTwentyFour() {
    current_turtle_id = 24;
    submitParam(command="print('Getting Turtle Data...')");
    setCurrentIdLabel();
}

function updateInv() {
    submitParam(command="print('Getting Turtle Data...')");
}

function onLoad() {
    console.log(socket);
    setCurrentIdLabel();

    socket.onmessage = function(event) {
        console.log(`[message] Data received from server: ${event.data}`);
        obj = JSON.parse(event.data);
        //log(obj);
        if (obj.inventory) {
            //setInventory(obj.inventory);
            if (obj.id == 0) {
                inventory_0 = obj.inventory;
                fuel_0 = obj.fuel;
                setInventory(inventory_0);
            }
            else if (obj.id == 24) {
                inventory_24 = obj.inventory;
                fuel_24 = obj.inventory;
                setInventory(inventory_24);
            }
        }
    };
      
    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            console.log('[close] Connection died');
        }
    };
      
    socket.onerror = function(error) {
        console.log(`[error] ${error.message}`);
    };
}