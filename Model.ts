
export class EventEmitter {
    _events;
    constructor() {
        this._events = {};
    }
    on(evt, listener) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }
    emit(evt, arg) {
        (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
    }
}
export var json = {
    "game_duration": 300,
    "initial_credits": 1984,
    "items": [
        "Dwimeryt",
        "Cynamon",
        "Nuka-Cola",
        "Z\u0142oto",
        "Unobtainium",
        "Protea\u0144skie dyski",
        "Ziemniaki",
        "Lyrium",
        "Murkwie",
        "Woda"
    ],
    "planets": {
        "Alderaan": {
            "available_items": {
                "Cynamon": {
                    "available": 74,
                    "buy_price": 6,
                    "sell_price": 6
                },
                "Dwimeryt": {
                    "available": 42,
                    "buy_price": 12,
                    "sell_price": 11
                },
                "Nuka-Cola": {
                    "available": 34,
                    "buy_price": 13,
                    "sell_price": 12
                },
                "Protea\u0144skie dyski": {
                    "available": 5,
                    "buy_price": 76,
                    "sell_price": 69
                },
                "Unobtainium": {
                    "available": 23,
                    "buy_price": 33,
                    "sell_price": 31
                },
                "Woda": {
                    "available": 22,
                    "buy_price": 19,
                    "sell_price": 18
                },
                "Ziemniaki": {
                    "available": 10,
                    "buy_price": 92,
                    "sell_price": 86
                },
                "Z\u0142oto": {
                    "available": 12,
                    "buy_price": 19,
                    "sell_price": 17
                }
            },
            "x": 15,
            "y": 32
        },
        "Argoland": {
            "available_items": {
                "Dwimeryt": {
                    "available": 23,
                    "buy_price": 10,
                    "sell_price": 10
                },
                "Lyrium": {
                    "available": 39,
                    "buy_price": 9,
                    "sell_price": 8
                },
                "Murkwie": {
                    "available": 5,
                    "buy_price": 73,
                    "sell_price": 64
                },
                "Nuka-Cola": {
                    "available": 25,
                    "buy_price": 22,
                    "sell_price": 19
                },
                "Protea\u0144skie dyski": {
                    "available": 10,
                    "buy_price": 75,
                    "sell_price": 65
                },
                "Ziemniaki": {
                    "available": 6,
                    "buy_price": 69,
                    "sell_price": 61
                },
                "Z\u0142oto": {
                    "available": 12,
                    "buy_price": 34,
                    "sell_price": 30
                }
            },
            "x": 59,
            "y": 44
        },
        "Arrakis": {
            "available_items": {
                "Cynamon": {
                    "available": 59,
                    "buy_price": 8,
                    "sell_price": 7
                },
                "Lyrium": {
                    "available": 53,
                    "buy_price": 10,
                    "sell_price": 8
                },
                "Murkwie": {
                    "available": 6,
                    "buy_price": 89,
                    "sell_price": 76
                },
                "Nuka-Cola": {
                    "available": 25,
                    "buy_price": 16,
                    "sell_price": 15
                },
                "Protea\u0144skie dyski": {
                    "available": 7,
                    "buy_price": 64,
                    "sell_price": 57
                },
                "Unobtainium": {
                    "available": 12,
                    "buy_price": 36,
                    "sell_price": 33
                },
                "Woda": {
                    "available": 12,
                    "buy_price": 25,
                    "sell_price": 21
                },
                "Ziemniaki": {
                    "available": 9,
                    "buy_price": 120,
                    "sell_price": 107
                },
                "Z\u0142oto": {
                    "available": 16,
                    "buy_price": 23,
                    "sell_price": 21
                }
            },
            "x": 81,
            "y": 34
        },
        "Corellia": {
            "available_items": {
                "Dwimeryt": {
                    "available": 38,
                    "buy_price": 8,
                    "sell_price": 8
                },
                "Lyrium": {
                    "available": 63,
                    "buy_price": 8,
                    "sell_price": 7
                },
                "Murkwie": {
                    "available": 6,
                    "buy_price": 91,
                    "sell_price": 84
                },
                "Protea\u0144skie dyski": {
                    "available": 10,
                    "buy_price": 74,
                    "sell_price": 66
                },
                "Unobtainium": {
                    "available": 11,
                    "buy_price": 30,
                    "sell_price": 26
                },
                "Ziemniaki": {
                    "available": 12,
                    "buy_price": 71,
                    "sell_price": 66
                },
                "Z\u0142oto": {
                    "available": 19,
                    "buy_price": 37,
                    "sell_price": 33
                }
            },
            "x": 43,
            "y": 69
        },
        "Encja": {
            "available_items": {
                "Cynamon": {
                    "available": 59,
                    "buy_price": 6,
                    "sell_price": 5
                },
                "Dwimeryt": {
                    "available": 56,
                    "buy_price": 10,
                    "sell_price": 10
                },
                "Lyrium": {
                    "available": 51,
                    "buy_price": 9,
                    "sell_price": 8
                },
                "Murkwie": {
                    "available": 6,
                    "buy_price": 88,
                    "sell_price": 76
                },
                "Nuka-Cola": {
                    "available": 35,
                    "buy_price": 17,
                    "sell_price": 16
                },
                "Protea\u0144skie dyski": {
                    "available": 9,
                    "buy_price": 103,
                    "sell_price": 90
                },
                "Unobtainium": {
                    "available": 13,
                    "buy_price": 39,
                    "sell_price": 37
                },
                "Woda": {
                    "available": 12,
                    "buy_price": 32,
                    "sell_price": 32
                },
                "Ziemniaki": {
                    "available": 6,
                    "buy_price": 60,
                    "sell_price": 57
                },
                "Z\u0142oto": {
                    "available": 26,
                    "buy_price": 40,
                    "sell_price": 35
                }
            },
            "x": 91,
            "y": 32
        },
        "Gaia": {
            "available_items": {
                "Cynamon": {
                    "available": 80,
                    "buy_price": 6,
                    "sell_price": 6
                },
                "Dwimeryt": {
                    "available": 85,
                    "buy_price": 8,
                    "sell_price": 7
                },
                "Lyrium": {
                    "available": 41,
                    "buy_price": 10,
                    "sell_price": 9
                },
                "Protea\u0144skie dyski": {
                    "available": 9,
                    "buy_price": 102,
                    "sell_price": 94
                },
                "Woda": {
                    "available": 25,
                    "buy_price": 43,
                    "sell_price": 39
                },
                "Ziemniaki": {
                    "available": 8,
                    "buy_price": 92,
                    "sell_price": 82
                },
                "Z\u0142oto": {
                    "available": 16,
                    "buy_price": 35,
                    "sell_price": 31
                }
            },
            "x": 75,
            "y": 76
        },
        "Ksi": {
            "available_items": {
                "Cynamon": {
                    "available": 33,
                    "buy_price": 11,
                    "sell_price": 10
                },
                "Dwimeryt": {
                    "available": 80,
                    "buy_price": 6,
                    "sell_price": 6
                },
                "Lyrium": {
                    "available": 64,
                    "buy_price": 8,
                    "sell_price": 7
                },
                "Murkwie": {
                    "available": 4,
                    "buy_price": 73,
                    "sell_price": 67
                },
                "Nuka-Cola": {
                    "available": 30,
                    "buy_price": 17,
                    "sell_price": 14
                },
                "Protea\u0144skie dyski": {
                    "available": 8,
                    "buy_price": 39,
                    "sell_price": 37
                },
                "Unobtainium": {
                    "available": 12,
                    "buy_price": 41,
                    "sell_price": 39
                },
                "Woda": {
                    "available": 15,
                    "buy_price": 30,
                    "sell_price": 28
                },
                "Ziemniaki": {
                    "available": 6,
                    "buy_price": 74,
                    "sell_price": 64
                },
                "Z\u0142oto": {
                    "available": 16,
                    "buy_price": 20,
                    "sell_price": 18
                }
            },
            "x": 91,
            "y": 71
        },
        "Leonida": {
            "available_items": {
                "Cynamon": {
                    "available": 36,
                    "buy_price": 12,
                    "sell_price": 11
                },
                "Dwimeryt": {
                    "available": 50,
                    "buy_price": 8,
                    "sell_price": 7
                },
                "Lyrium": {
                    "available": 60,
                    "buy_price": 9,
                    "sell_price": 9
                },
                "Murkwie": {
                    "available": 6,
                    "buy_price": 89,
                    "sell_price": 85
                },
                "Nuka-Cola": {
                    "available": 39,
                    "buy_price": 18,
                    "sell_price": 16
                },
                "Protea\u0144skie dyski": {
                    "available": 7,
                    "buy_price": 65,
                    "sell_price": 57
                },
                "Unobtainium": {
                    "available": 9,
                    "buy_price": 38,
                    "sell_price": 33
                },
                "Ziemniaki": {
                    "available": 5,
                    "buy_price": 121,
                    "sell_price": 112
                },
                "Z\u0142oto": {
                    "available": 11,
                    "buy_price": 45,
                    "sell_price": 41
                }
            },
            "x": 32,
            "y": 5
        },
        "NowWhat": {
            "available_items": {
                "Cynamon": {
                    "available": 62,
                    "buy_price": 8,
                    "sell_price": 7
                },
                "Dwimeryt": {
                    "available": 22,
                    "buy_price": 9,
                    "sell_price": 9
                },
                "Murkwie": {
                    "available": 9,
                    "buy_price": 67,
                    "sell_price": 66
                },
                "Nuka-Cola": {
                    "available": 27,
                    "buy_price": 18,
                    "sell_price": 16
                },
                "Protea\u0144skie dyski": {
                    "available": 9,
                    "buy_price": 82,
                    "sell_price": 71
                },
                "Ziemniaki": {
                    "available": 4,
                    "buy_price": 74,
                    "sell_price": 63
                },
                "Z\u0142oto": {
                    "available": 17,
                    "buy_price": 28,
                    "sell_price": 24
                }
            },
            "x": 35,
            "y": 41
        },
        "Sur'Kesh": {
            "available_items": {
                "Cynamon": {
                    "available": 55,
                    "buy_price": 9,
                    "sell_price": 8
                },
                "Lyrium": {
                    "available": 34,
                    "buy_price": 9,
                    "sell_price": 8
                },
                "Murkwie": {
                    "available": 10,
                    "buy_price": 73,
                    "sell_price": 66
                },
                "Nuka-Cola": {
                    "available": 30,
                    "buy_price": 19,
                    "sell_price": 17
                },
                "Protea\u0144skie dyski": {
                    "available": 5,
                    "buy_price": 85,
                    "sell_price": 79
                },
                "Unobtainium": {
                    "available": 19,
                    "buy_price": 34,
                    "sell_price": 31
                },
                "Woda": {
                    "available": 21,
                    "buy_price": 23,
                    "sell_price": 20
                },
                "Ziemniaki": {
                    "available": 8,
                    "buy_price": 99,
                    "sell_price": 95
                }
            },
            "x": 39,
            "y": 31
        },
        "Tairia": {
            "available_items": {
                "Cynamon": {
                    "available": 70,
                    "buy_price": 10,
                    "sell_price": 10
                },
                "Lyrium": {
                    "available": 43,
                    "buy_price": 6,
                    "sell_price": 5
                },
                "Murkwie": {
                    "available": 8,
                    "buy_price": 97,
                    "sell_price": 84
                },
                "Nuka-Cola": {
                    "available": 32,
                    "buy_price": 20,
                    "sell_price": 19
                },
                "Unobtainium": {
                    "available": 19,
                    "buy_price": 44,
                    "sell_price": 41
                },
                "Woda": {
                    "available": 12,
                    "buy_price": 29,
                    "sell_price": 25
                },
                "Ziemniaki": {
                    "available": 6,
                    "buy_price": 123,
                    "sell_price": 103
                },
                "Z\u0142oto": {
                    "available": 14,
                    "buy_price": 37,
                    "sell_price": 34
                }
            },
            "x": 36,
            "y": 84
        },
        "Tatooine": {
            "available_items": {
                "Cynamon": {
                    "available": 60,
                    "buy_price": 11,
                    "sell_price": 10
                },
                "Dwimeryt": {
                    "available": 64,
                    "buy_price": 10,
                    "sell_price": 9
                },
                "Lyrium": {
                    "available": 45,
                    "buy_price": 8,
                    "sell_price": 7
                },
                "Murkwie": {
                    "available": 6,
                    "buy_price": 81,
                    "sell_price": 71
                },
                "Nuka-Cola": {
                    "available": 39,
                    "buy_price": 15,
                    "sell_price": 13
                },
                "Protea\u0144skie dyski": {
                    "available": 7,
                    "buy_price": 89,
                    "sell_price": 84
                },
                "Unobtainium": {
                    "available": 13,
                    "buy_price": 37,
                    "sell_price": 32
                },
                "Woda": {
                    "available": 10,
                    "buy_price": 23,
                    "sell_price": 21
                },
                "Ziemniaki": {
                    "available": 7,
                    "buy_price": 95,
                    "sell_price": 87
                },
                "Z\u0142oto": {
                    "available": 19,
                    "buy_price": 35,
                    "sell_price": 32
                }
            },
            "x": 47,
            "y": 68
        },
        "Tuchanka": {
            "available_items": {
                "Cynamon": {
                    "available": 59,
                    "buy_price": 10,
                    "sell_price": 9
                },
                "Dwimeryt": {
                    "available": 51,
                    "buy_price": 7,
                    "sell_price": 6
                },
                "Lyrium": {
                    "available": 65,
                    "buy_price": 11,
                    "sell_price": 10
                },
                "Murkwie": {
                    "available": 9,
                    "buy_price": 90,
                    "sell_price": 82
                },
                "Nuka-Cola": {
                    "available": 46,
                    "buy_price": 18,
                    "sell_price": 16
                },
                "Protea\u0144skie dyski": {
                    "available": 10,
                    "buy_price": 71,
                    "sell_price": 65
                },
                "Unobtainium": {
                    "available": 8,
                    "buy_price": 39,
                    "sell_price": 37
                },
                "Woda": {
                    "available": 15,
                    "buy_price": 28,
                    "sell_price": 24
                },
                "Ziemniaki": {
                    "available": 10,
                    "buy_price": 61,
                    "sell_price": 57
                },
                "Z\u0142oto": {
                    "available": 12,
                    "buy_price": 46,
                    "sell_price": 40
                }
            },
            "x": 27,
            "y": 76
        },
        "Ziemia": {
            "available_items": {
                "Cynamon": {
                    "available": 58,
                    "buy_price": 8,
                    "sell_price": 7
                },
                "Dwimeryt": {
                    "available": 106,
                    "buy_price": 8,
                    "sell_price": 7
                },
                "Lyrium": {
                    "available": 31,
                    "buy_price": 9,
                    "sell_price": 8
                },
                "Murkwie": {
                    "available": 7,
                    "buy_price": 82,
                    "sell_price": 75
                },
                "Nuka-Cola": {
                    "available": 30,
                    "buy_price": 18,
                    "sell_price": 17
                },
                "Unobtainium": {
                    "available": 21,
                    "buy_price": 37,
                    "sell_price": 36
                },
                "Ziemniaki": {
                    "available": 6,
                    "buy_price": 77,
                    "sell_price": 69
                },
                "Z\u0142oto": {
                    "available": 13,
                    "buy_price": 38,
                    "sell_price": 32
                }
            },
            "x": 94,
            "y": 24
        }
    },
    "starships": {
        "Axiom": {
            "cargo_hold_size": 27,
            "position": "Tatooine"
        },
        "Enterprise": {
            "cargo_hold_size": 46,
            "position": "Corellia"
        },
        "Goliath": {
            "cargo_hold_size": 33,
            "position": "Sur'Kesh"
        },
        "Hermes": {
            "cargo_hold_size": 26,
            "position": "NowWhat"
        },
        "Millenium Falcon": {
            "cargo_hold_size": 35,
            "position": "Tatooine"
        },
        "Niezwyci\u0119\u017cony": {
            "cargo_hold_size": 60,
            "position": "Argoland"
        },
        "Normandy SR-2": {
            "cargo_hold_size": 40,
            "position": "Gaia"
        },
        "Nostromo": {
            "cargo_hold_size": 25,
            "position": "Arrakis"
        },
        "Rocinante": {
            "cargo_hold_size": 30,
            "position": "Alderaan"
        },
        "\u041a\u043e\u0441\u043c\u043e\u043d\u0430\u0432\u0442 \u0410\u043b\u0435\u043a\u0441\u0435\u0301\u0439 \u041b\u0435\u043e\u0301\u043d\u043e\u0432": {
            "cargo_hold_size": 35,
            "position": "Arrakis"
        }
    }
}
export class ItemAvailablity extends EventEmitter{
    item : string;
    buy_price : number;
    available : number;
    sell_price : number;
    constructor(item : string){
        super();
        this.item = item;
    }
    changeAvailablity(delta : number){
        this.available +=delta;
        this.emit('itemAvailablityChanged', this);
        return;
    }
    setBuyPrice(price : number) : ItemAvailablity{
        this.buy_price = price;
        return this;
    }
    setSellPrice(price : number) : ItemAvailablity{
        this.sell_price = price;
        return this;
    }
    setAvailablity(howMuch : number) : ItemAvailablity{
        this.available = howMuch;
        return this;
    }

}
export class Planet extends EventEmitter{
    name: string;
    items: Map<string, ItemAvailablity>;
    x: number;
    y: number;

    constructor(name: string) {
        super();
        this.items = new Map();
        this.name = name;

    }

    findItem(towar: string, delta: number) {
        console.log("Liczba roznych towarow: "+ this.items.size);
        for (let i of this.items.values()) {
            console.log("Aktualnie sprawdzany item: "+ i);
            if (towar === i.item) {
                i.changeAvailablity(delta);
                this.emit('itemsOnPlanetUpdated', Planet);
            }
        }
    }

    setX(x : number) : Planet {
        this.x = x;
        return this;
    }

    setY(y: number) : Planet {
        this.y = y;
        return this;
    }

    setItems(items, allitems : string[]) : Planet{
        for(let i = 0; i<allitems.length; i+=1){
            this.items.set(allitems[i],
                new ItemAvailablity(allitems[i])
                    .setSellPrice(0)
                    .setBuyPrice(0)
                    .setAvailablity(0));
        }
        let array = Object.keys(items).map(key => items[key]);
        let array2 = Object.keys(items);
        for(let i=0; i<array.length; i+=1) {
            let item = new ItemAvailablity(array2[i]);
            item.setAvailablity(array[i].available)
                .setBuyPrice(array[i].buy_price)
                .setSellPrice(array[i].sell_price);
            this.items.set(array2[i], item);
        }
        return this;
    }
}
export class Ship extends EventEmitter{
    name : string;
    capacity : number;
    modified : boolean;
    position : string;
    flightLength : number;
    items : Map<string, number>;
    constructor(name : string){
        super();
        this.name = name;
        this.items = new Map();
        this.flightLength = 0;
    }

    setCapacity(capacity : number) : Ship{
        this.capacity = capacity;
        return this;
    }

    setPosition(planet : string) : Ship{
        this.position = planet;
        return this;
    }
    setItems(items : string[]){
        for(let i=0; i<items.length; i+=1){
            this.items.set(items[i], 0);
        }

    }
    buyItem(game : Game, item : string, howMuch : number) : Ship{
            this.items.set(item, this.items.get(item) + howMuch);
            return this;
    }
    freeCapacity() : number{
        let taken : number = 0;
        for(let i of this.items.values()){
            taken +=i;
        }
        console.log(this.capacity - taken);
        return this.capacity - taken;

    }

    changePosition(Gra : Game, planet : Planet, id : number){
        if(planet.name !== this.position){
            for(let p of Gra.planets.values()){
                if(p.name === this.position){
                    //p - poczatkowa
                    // Planeta - cel
                    let dx = p.x - planet.x;
                    let dy = p.y - planet.y;
                    this.flightLength = Math.ceil(Math.sqrt(dx*dx + dy*dy));
                    this.position = planet.name;
                    this.modified = true;
                    Gra.emit('transportInProgress', id);
                    break;
                }
            }
        }
    }
}
export class Game extends EventEmitter{
    game_duration : number = 500;
    credits : number = 3000;
    items : string[] = ["Nic", "Niema"];
    ships : Map<string, Ship>;
    planets : Map<string, Planet>;
    constructor(){
        super();
        this.planets = new Map();
        this.ships = new Map();
    }

    updateTime(){
        this.game_duration -=1;
        if(this.game_duration === 0){
            this.emit('endGame', this.credits);
        }
        for(let ship of this.ships.values()){
            if(ship.flightLength > 0){
                ship.flightLength-=1;
                if(ship.flightLength === 0){
                    this.emit('transportEnded', ship);
                }
                this.emit('timePassed', ship);
            }
        }
        this.emit('changedTime', "");
        setTimeout(() => this.updateTime(), 1000);
    }

    transportShip(ship : Ship, destination: string, id : number){
        ship.changePosition(this, this.planets.get(destination), id);
    }
    getPlanet(name : string){
        return this.planets.get(name);
    }
    getShip(name : string){
        return this.ships.get(name);
    }
    setTime (starting_time : number) : Game{
        this.game_duration = starting_time;
        return this;
    }
    setPlanets(planets, allitems : string[]) : Game {
        let array2 = Object.keys(planets);
        let array = Object.keys(planets).map(key => planets[key]);
        for(let i=0; i<array.length; i+=1){
            let planet = new Planet(array2[i]);
            planet.setX(array[i].x).setY(array[i].y).setItems(array[i].available_items, allitems);
            this.planets.set(array2[i], planet);
        }
        return this;
    }
    setItems(items : string[]) : Game{
        this.items = items;
        return this;
    }
    setCredits(credits : number) : Game {
        this.credits = credits;
        this.emit('changedCredits', this.credits);
        return this;
    }
    setShips(starships, items : string[]) : Game {
        let array2 = Object.keys(starships);
        let array = Object.keys(starships).map(key => starships[key]);
        for(let i=0; i<array.length; i+=1){
            let starship = new Ship(array2[i]);
            starship.setItems(items);
        //    let name = this.planets.get(array[i].position);
            starship.setCapacity(array[i].cargo_hold_size)
                .setPosition(array[i].position);
            this.ships.set(array2[i], starship);
        }
        return this;
    }

    performTrade(planet : Planet, ship : Ship, type : string, amount : number, id : number){
        console.log(ship.position + " vs "+ planet.name);

        console.log(ship.freeCapacity() + " vs " + amount);
        console.log(planet.items.get(type).available +" vs "+ amount);
        console.log(ship.items.get(type) +" + " +amount);
        if(ship.position === planet.name //check if ship is on name
            && ship.freeCapacity() >= amount // check if he has enough free capacity
            && planet.items.get(type).available >= amount // check if name has enough items available
            && ship.items.get(type) + amount >= 0){ // check if he can sell this much (amount can be negative while selling)
                if(amount <0 || (amount >=0 && this.credits >= amount*planet.items.get(type).buy_price)) {
                    planet.findItem(type, -amount);
                    ship.buyItem(this, type, amount);
                    if(amount>=0){
                        this.credits -=amount*planet.items.get(type).buy_price;
                        this.emit('changedCredits', this.credits);
                    }
                    else{//amount < 0 means selling
                        this.credits -= amount*planet.items.get(type).sell_price;
                        this.emit('changedCredits', this.credits);
                    }
                }
        }
        this.emit('tradeDone', id);
    }
}


//export {json, ItemAvailablity, Planet, Ship, Game, EventEmitter};
export class xd{}