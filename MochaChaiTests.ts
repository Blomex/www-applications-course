import {Game}  from './Model.js';
import {expect} from "chai";
import {Builder, Capabilities} from 'selenium-webdriver';
import "mocha"
let items = [
    "item1",
    "item2"
];

let gameInfo = {
    "game_duration": 600,
    "initial_credits":1000
};

let ships =
    {
        "ship1":{
            "cargo_hold_size":99,
            "position": "Planet1"
        },
        "ship2":{
            "cargo_hold_size":105,
            "position":"Planet2"
        }
    };
let planets = {
    "Planet1": {
        "available_items":{
            "item1":{
                "available": 100,
                "buy_price": 3,
                "sell_price": 7
            }
        },
        "x": 99,
        "y": 15
    },
    "Planet2": {
        "available_items":{
            "item2":{
                "available": 100,
                "buy_price": 30,
                "sell_price": 70
            }
        },
        "x": 99,
        "y": 15
    }
};

describe("changingCredits", () => {
   let g : Game = new Game()
       .setCredits(gameInfo.initial_credits)
       .setShips(ships, items)
       .setPlanets(planets, items)
       .setItems(items)
       .setTime(gameInfo.game_duration);


    it("new game should have credits equal to initial credits", () => {
        expect(g.credits).to.equal(gameInfo.initial_credits);
    });

    //Arrange
    let planet1 = g.planets.get("Planet1");
    let planet2 = g.planets.get("Planet2");
    let ship1 = g.ships.get("ship1");
    let ship2 = g.ships.get("ship2");

    it("buying items while not having enough funds should fail", () =>{
        g.performTrade(planet2, ship2, "item2", 100, 1);
        expect(g.credits).to.equal(gameInfo.initial_credits);
    });
    it("you shouldnt be able to buy items from another planet", () =>{
        g.performTrade(planet1, ship2, "item1", 1, 1);
        expect(g.credits).to.equal(gameInfo.initial_credits);
        g.performTrade(planet2, ship1, "item2", 1, 0);
        expect(g.credits).to.equal(gameInfo.initial_credits);
        g.performTrade(planet1, ship2, "item2", 1, 1);
        expect(g.credits).to.equal(gameInfo.initial_credits);
        g.performTrade(planet2, ship1, "item1", 1, 0);
        expect(g.credits).to.equal(gameInfo.initial_credits);
    });
    it("you shouldn't be able to buy item on planet if availablity is 0", () => {
        expect(planet1.items.get("item2").available).to.equal(0);
        g.performTrade(planet1, ship1, "item2", 1, 0);
        expect(g.credits).to.equal(gameInfo.initial_credits);

        expect(planet2.items.get("item1").available).to.equal(0);
        g.performTrade(planet2, ship2, "item1", 1, 1);
        expect(g.credits).to.equal(gameInfo.initial_credits);
    });
    it("Cant sell item if you dont own it..", () => {
       expect(ship1.items.get("item1") === 0);
       g.performTrade(planet1, ship1, "item1", -1, 0);

    });
    it("You can buy items if you have money though :)", () => {
        g.performTrade(planet1, ship1, "item1", 1, 0);
        expect(g.credits).to.equal(gameInfo.initial_credits - planet1.items.get("item1").buy_price);

        //restore to default
        g.performTrade(planet1, ship1, "item1", -1, 0);
        g.credits = gameInfo.initial_credits;
    })
});
/*
*/