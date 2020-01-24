import {EventEmitter, Game, ItemAvailablity, json, Planet, Ship} from "./Model.js";

function assertEquals(a, b){

    if(typeof a !== typeof b|| a !== b ){
        console.log("Test failed. Expected: ");
        console.log(a);
        console.log(" got instead: ");
        console.log(b);
    }
}

function testGameModel(){
    let game = new Game();
    game.setTime(json.game_duration)
        .setItems(json.items)
        .setPlanets(json.planets, json.items)
        .setCredits(json.initial_credits)
        .setShips(json.starships, json.items);

    assertEquals(json.initial_credits, game.credits);
    assertEquals(json.game_duration, game.game_duration);
    assertEquals(json.items.length, game.items.length);
    for(let i = 0; i< json.items.length; i+=1){
        assertEquals(json.items[i], game.items[i]);
    }
}

function testPlanetModel(){
    let planet = new Planet("Pname");
    planet.setY(87).setX(12);
    assertEquals(87, planet.y);
    assertEquals(12, planet.x);
    assertEquals("Pname", planet.name);
}

function testStarshipModel(){
    let ship = new Ship("crazyShip");
    ship.setPosition("Ziemia").setCapacity(651);
    assertEquals("Ziemia", ship.position);
    assertEquals(651, ship.capacity);
}

function testItemAvaliblityModel(){
    let itemAv = new ItemAvailablity("nazwa").setAvailablity(200).setBuyPrice(60).setSellPrice(33);
    assertEquals(200, itemAv.available);
    assertEquals(60, itemAv.buy_price);
    assertEquals(33, itemAv.sell_price);
}

testGameModel();