os.loadAPI("json")
local ws, err = http.websocket("ws://83.212.82.182:6969/soket")

function stripmine()
    turtle.dig()
    turtle.digUp()
    turtle.digDown()
end

function report(msg)
    if ws then
        ws.send(msg)
    end
end

function eval(str)
    obj = json.decode(str)

    local func, err = loadstring(obj["command"])
    if func then
        func()
    else
        print("Error: ", err)
    end
end

function eval_directives(str)
    obj = json.decode(str)

    if obj["directive"] == "stripmine" then
        stripmine()
    end
end

function getInv()
    local mainJson = {}
    local lastSlot = turtle.getSelectedSlot()
    for i=1, 16, 1 do
        turtle.select(i)
        mainJson[tostring(i)] = turtle.getItemDetail()
    end
    turtle.select(lastSlot)
    do return mainJson end
end

function getFuelLevel() 
    do return turtle.getFuelLevel() end
end

function getData() 
    local invJson = getInv()
    local returnObj = {}
    returnObj["fuel"] = getFuelLevel()
    returnObj["inventory"] = invJson
    returnObj["id"] = os.getComputerID()
    returnObj["selectedSlot"] = turtle.getSelectedSlot()
    --[[ 
    {
        fuel: 0,
        inventory: {1: {item, count}}
    } 
    ]]
    report(json.encode(returnObj))
end

if ws then
    while true do
        ws, err = http.websocket("ws://83.212.82.182:6969/soket")
        wsthingy = ws.receive()
        dec = json.decode(wsthingy)
        if dec.id == os.getComputerID() then
            eval(wsthingy)
            eval_directives(wsthingy)
            getData()
        end
        ws.close()
    end
end