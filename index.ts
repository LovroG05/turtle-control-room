// GLOBAL VARIABLES
let socket: WebSocket = new WebSocket("ws://83.212.82.182:6969/soket");
let current_turtle: Turtle;
let patt: RegExp = /[a-z]+:/;

let turtleList = [];
// \\

class Turtle {
    id: number;
    fuel: number;
    inventory;
    slotSelected: number = 1;

    constructor(id: number) {
        this.id = id;
    }

    setInventory(inventory: any) {
        this.inventory = inventory;
    }

    setInvSlot(num: number) {
        this.slotSelected = num;
    }

    setFuel(fuel: number) {
        this.fuel = fuel;
    }
    
    submitPD(directive: string) {
        let jsonobj = {"command": "", "directive": directive, "id": this.id};
    
        console.log(jsonobj)
        socket.send(JSON.stringify(jsonobj));
    }
    
    submitParam(command: string="", directive: string="") {
        let jsonobj = {"command": command, "directive": directive, "id": this.id};
    
        console.log(jsonobj)
        socket.send(JSON.stringify(jsonobj));
    }

    sendUpdater() {
        this.submitParam("print('Getting Turtle Data...')");
    }

    select(slotNum: number) {
        let str: string = "turtle.select(" + slotNum + ")";
        this.submitParam(str);
    }

    goForward() {
        this.submitParam("turtle.forward()");
    }

    goUp() {
        this.submitParam("turtle.up()");
    }

    goDown() {
        this.submitParam("turtle.down()");
    }

    turnLeft() {
        this.submitParam("turtle.turnLeft()");
    }

    turnRight() {
        this.submitParam("turtle.turnRight()");
    }

    refuel() {
        this.submitParam("turtle.refuel()");
    }

    digUp() {
        this.submitParam("turtle.digUp()");
    }

    dig() {
        this.submitParam("turtle.dig()");
    }
    
    digDown() {
        this.submitParam("turtle.digDown()");
    }
    
    placeUp() {
        this.submitParam("turtle.placeUp()");
    }
    
    place() {
        this.submitParam("turtle.place()");
    }
    
    placeDown() {
        this.submitParam("turtle.placeDown()");
    }

    placeSignUp(text: string) {
        this.submitParam("turtle.placeUp('"+ text + "')")
    }

    placeSign(text: string) {
        //split string every 15chars and add a newline char
        let newText: string = updateSignText(text, 15).toString();
        let cmd: string = "turtle.place("+ "'" + newText + "'" + ")";
        console.log(cmd)
        this.submitParam(cmd);
    }

    placeSignDown(text: string) {
        this.submitParam("turtle.placeDown('"+ text + "')")
    }
    
    stripMine() {
        this.submitParam("", "stripmine")
    }
}

function updateSignText(str: string, n: number) {
    var ret = [];
    var i;
    var len;

    for(i = 0, len = str.length; i < len; i += n) {
       ret.push(str.substr(i, n));
    }

    return ret.join("\\n");
};

function submitParam(command: string="", directive: string="") {
    current_turtle.submitParam(command, directive);
}

function select() {
    let slot: number = parseInt((<HTMLInputElement>document.getElementById("slot")).value);
    current_turtle.select(slot);
}

function selectParam(num: number) {
    current_turtle.select(num);
}

function goForward() {
    current_turtle.goForward();
}

function goUp() {
    current_turtle.goUp();
}

function goDown() {
    current_turtle.goDown();
}

function turnLeft() {
    current_turtle.turnLeft();
}

function turnRight() {
    current_turtle.turnRight();
}

function refuel() {
    current_turtle.refuel();
}

function digUp() {
    current_turtle.digUp();
}

function dig() {
    current_turtle.dig();
}

function digDown() {
    current_turtle.digDown();
}

function placeUp() {
    if (current_turtle.inventory[current_turtle.slotSelected.toString()].name == "minecraft:sign") {
        let signtext: string = prompt("Sign text (for newline write \\n):");
        current_turtle.placeSignUp(signtext);
    }
    else {
        current_turtle.placeUp();
    }
}

function place() {
    if (current_turtle.inventory[current_turtle.slotSelected.toString()].name == "minecraft:sign") {
        let signtext: string = prompt("Sign text (for newline write \\n):");
        current_turtle.placeSign(signtext);
    }
    else {
        current_turtle.place();
    }
}

function placeDown() {
    if (current_turtle.inventory[current_turtle.slotSelected.toString()].name == "minecraft:sign") {
        let signtext: string = prompt("Sign text (for newline write \\n):");
        current_turtle.placeSignDown(signtext);
    }
    else {
        current_turtle.placeDown();
    }
}

function stripMine() {
    current_turtle.stripMine();
}

function updateInv() {
    current_turtle.sendUpdater();
}

function setSelectedSlot() {
    //remove all selected classes
    document.getElementById("d1").classList.remove("selected");
    document.getElementById("d2").classList.remove("selected");
    document.getElementById("d3").classList.remove("selected");
    document.getElementById("d4").classList.remove("selected");
    document.getElementById("d5").classList.remove("selected");
    document.getElementById("d6").classList.remove("selected");
    document.getElementById("d7").classList.remove("selected");
    document.getElementById("d8").classList.remove("selected");
    document.getElementById("d9").classList.remove("selected");
    document.getElementById("d10").classList.remove("selected");
    document.getElementById("d11").classList.remove("selected");
    document.getElementById("d12").classList.remove("selected");
    document.getElementById("d13").classList.remove("selected");
    document.getElementById("d14").classList.remove("selected");
    document.getElementById("d15").classList.remove("selected");
    document.getElementById("d16").classList.remove("selected");

    //add the selected class
    document.getElementById("d" + current_turtle.slotSelected.toString()).classList.add("selected");
}

function setFuel() {
    console.log(current_turtle.fuel);
    document.getElementById("fuel-progress-bar").innerHTML = current_turtle.fuel.toString();
    document.getElementById("fuel-progress-bar").style.width = (current_turtle.fuel / 5120) * 100 + "%";
    document.getElementById("fuel-progress-bar").setAttribute("aria-valuenow", current_turtle.fuel.toString());
}

function setInventory() {
    if (current_turtle.inventory["1"]) {
        document.getElementById("i1").innerHTML = current_turtle.inventory["1"].count;
        let str: string = current_turtle.inventory["1"].name;
        document.getElementById("i1").setAttribute("title", str);
    }
    else {
        document.getElementById("i1").innerHTML = "0";
    }

    if (current_turtle.inventory["2"]) {
        document.getElementById("i2").innerHTML = current_turtle.inventory["2"].count;
        let str: string = current_turtle.inventory["2"].name;
        document.getElementById("i2").setAttribute("title", str);
    }
    else {
        document.getElementById("i2").innerHTML = "0";
    }

    if (current_turtle.inventory["3"]) {
        document.getElementById("i3").innerHTML = current_turtle.inventory["3"].count;
        let str: string = current_turtle.inventory["3"].name;
        document.getElementById("i3").setAttribute("title", str);
    }
    else {
        document.getElementById("i3").innerHTML = "0";
    }

    if (current_turtle.inventory["4"]) {
        document.getElementById("i4").innerHTML = current_turtle.inventory["4"].count;
        let str: string = current_turtle.inventory["4"].name;
        document.getElementById("i4").setAttribute("title", str);
    }
    else {
        document.getElementById("i4").innerHTML = "0";
    }

    if (current_turtle.inventory["5"]) {
        document.getElementById("i5").innerHTML = current_turtle.inventory["5"].count;
        let str: string = current_turtle.inventory["5"].name;
        document.getElementById("i5").setAttribute("title", str);
    }
    else {
        document.getElementById("i5").innerHTML = "0";
    }

    if (current_turtle.inventory["6"]) {
        document.getElementById("i6").innerHTML = current_turtle.inventory["6"].count;
        let str: string = current_turtle.inventory["6"].name;
        document.getElementById("i6").setAttribute("title", str);
    }
    else {
        document.getElementById("i6").innerHTML = "0";
    }

    if (current_turtle.inventory["7"]) {
        document.getElementById("i7").innerHTML = current_turtle.inventory["7"].count;
        let str: string = current_turtle.inventory["7"].name;
        document.getElementById("i7").setAttribute("title", str);
    }
    else {
        document.getElementById("i7").innerHTML = "0";
    }

    if (current_turtle.inventory["8"]) {
        document.getElementById("i8").innerHTML = current_turtle.inventory["8"].count;
        let str: string = current_turtle.inventory["8"].name;
        document.getElementById("i8").setAttribute("title", str);
    }
    else {
        document.getElementById("i8").innerHTML = "0";
    }

    if (current_turtle.inventory["9"]) {
        document.getElementById("i9").innerHTML = current_turtle.inventory["9"].count;
        let str: string = current_turtle.inventory["9"].name;
        document.getElementById("i9").setAttribute("title", str);
    }
    else {
        document.getElementById("i9").innerHTML = "0";
    }

    if (current_turtle.inventory["10"]) {
        document.getElementById("i10").innerHTML = current_turtle.inventory["10"].count;
        let str: string = current_turtle.inventory["10"].name;
        document.getElementById("i10").setAttribute("title", str);
    }
    else {
        document.getElementById("i10").innerHTML = "0";
    }

    if (current_turtle.inventory["11"]) {
        document.getElementById("i11").innerHTML = current_turtle.inventory["11"].count;
        let str: string = current_turtle.inventory["11"].name;
        document.getElementById("i11").setAttribute("title", str);
    }
    else {
        document.getElementById("i11").innerHTML = "0";
    }

    if (current_turtle.inventory["12"]) {
        document.getElementById("i12").innerHTML = current_turtle.inventory["12"].count;
        let str: string = current_turtle.inventory["12"].name;
        document.getElementById("i12").setAttribute("title", str);
    }
    else {
        document.getElementById("i12").innerHTML = "0";
    }

    if (current_turtle.inventory["13"]) {
        document.getElementById("i13").innerHTML = current_turtle.inventory["13"].count;
        let str: string = current_turtle.inventory["13"].name;
        document.getElementById("i13").setAttribute("title", str);
    }
    else {
        document.getElementById("i13").innerHTML = "0";
    }

    if (current_turtle.inventory["14"]) {
        document.getElementById("i14").innerHTML = current_turtle.inventory["14"].count;
        let str: string = current_turtle.inventory["14"].name;
        document.getElementById("i14").setAttribute("title", str);
    }
    else {
        document.getElementById("i14").innerHTML = "0";
    }

    if (current_turtle.inventory["15"]) {
        document.getElementById("i15").innerHTML = current_turtle.inventory["15"].count;
        let str: string = current_turtle.inventory["15"].name;
        document.getElementById("i15").setAttribute("title", str);
    }
    else {
        document.getElementById("i15").innerHTML = "0";
    }

    if (current_turtle.inventory["16"]) {
        document.getElementById("i16").innerHTML = current_turtle.inventory["16"].count;
        let str: string = current_turtle.inventory["16"].name;
        document.getElementById("i16").setAttribute("title", str);
    }
    else {
        document.getElementById("i16").innerHTML = "0";
    }

    setSelectedSlot();

    setFuel();
}

function setCurrentIdLabel() {
    document.getElementById("turtleID").innerHTML = current_turtle.id.toString();
}

function setTurtle(onListId: number) {
    current_turtle = turtleList[onListId];
    setCurrentIdLabel();
}

function changeTurtle(onListId: number) {
    current_turtle = turtleList[onListId];
    setCurrentIdLabel();
    current_turtle.sendUpdater();
}

function onLoad() {
    console.log(socket);

    turtleList.push(new Turtle(0));
    turtleList.push(new Turtle(24));
    turtleList.push(new Turtle(46));

    setTurtle(0);

    socket.onmessage = function(event) {
        console.log(`[message] Data received from server: ${event.data}`);
        let obj: any = JSON.parse(event.data);
        //log(obj);
        // {"inventory":{"1":{"count":1,"name":"rgb:rgbpickaxe","damage":6825}},"fuel":4156,"id":0}
        console.log(current_turtle.id)
        console.log(obj.id)
        if (obj.id == current_turtle.id) {
            console.log("crackhead");
            current_turtle.setInventory(obj.inventory);
            current_turtle.setInvSlot(obj.selectedSlot);
            current_turtle.setFuel(obj.fuel);
            setInventory();
        }
        // TODO: add a handler for turtles sending while not selected
    };
      
    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            console.log('[close] Connection died');
        }
    };
      
    socket.onerror = function(error: any) {
        console.log(`[error] ${error.message}`);
    };
}