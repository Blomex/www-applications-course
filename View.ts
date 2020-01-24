//const EventEmitter = require('events');
// noinspection TypeScriptPreferShortImport
class EventEmitter {
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

class ItemAvailablity extends EventEmitter{
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
class Planet extends EventEmitter{
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
class Ship extends EventEmitter{
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
class Game extends EventEmitter{
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


Storage.prototype.setObj = function(key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj))
};

Storage.prototype.getObj = function(key) {
    return JSON.parse(localStorage.getItem(key))
};

class GameView extends EventEmitter {
    _model: Game;
    _elements;

    constructor(model, elements) {
        super();
        this._model = model;
        this._elements = elements;
        //tutaj powinny byc model listeners
        this._model.on('transportInProgress', e => this.showTransportInProgress(e));
        this._model.on('tradeDone', e => this.showShipPopup(e));
        this._model.on('changedCredits', e => {this.changeCredits(e);});
        this._model.on('changedTime', () => this.updateTime());
        this._model.on('transportEnded', e => this.transportEnded(e));
        this._model.on('timePassed', e => this.changeTimeOnPopup(e));
        this._model.on('endGame', e => this.endGame(e));
        //need to update credits on creation
        this._model.emit('changedCredits', this._model.credits);
        //tutaj mamy emitery na które reaguje kontroler
        elements.tradeButton.addEventListener('click', ()=> this.emit('tradeButtonClicked', ""));
        elements.transportButton.addEventListener('click',
            () => this.emit('transportButtonClicked', parseInt(this._elements.shipId, 10)));
        for(let i = 0; i<this._elements.ships.length; i+=1){
            elements.ships[i].addEventListener('click', () => this.emit('shipClicked', i));
        }
        for(let i = 0; i < this._elements.shipsOnPlanet.length; i+=1){
            elements.shipsOnPlanet[i].addEventListener('click', () => this.emit('shipOnPlanetClicked', i));
        }
        for(let i = 0; i< this._elements.planets.length; i+=1){
            elements.planets[i].addEventListener('click', () => this.emit('planetClicked', i));
        }
    }
    endGame(credits : number){
        if(credits !== this._model.credits){
            credits = this._model.credits;
        }
        let pseudonim = document.getElementById("pseudonim").innerText.replace(/Pseudonim: /, "");
        window.location.href = window.location.href.replace(/popup$/, "").replace(/main.html/, "EkranPoczatkowy.html");
        newResult(pseudonim, credits);
    }
    changeTimeOnPopup(ship : Ship){
        if(this._elements.shipNameNotOnPlanet.value === ship.name){
            this._elements.shipInfoNotOnPlanet.getElementsByTagName("LI")[0].innerHTML =
                `w podróży jeszcze przez ${ship.flightLength} sekund`;
        }
        this._model.emit('changedTime', "");
    }
    transportEnded(ship : Ship){
        let id = -1;
        for(let i = 0; i< this._elements.ships.length; i+=1){
            let shipElement = this._elements.ships[i];
            if(shipElement.getElementsByClassName("nazwaStatku")[0].innerHTML === ship.name){
                id = i;
                break;
            }
        }
        let shipElement = this._elements.ships[id];
        let planet = shipElement.getElementsByClassName("nazwaPlanety")[0];
        planet.innerHTML = ship.position;
        this.showShipPopup(id);
        window.location.href = window.location.href.replace(/popup4/, "popup3");
    }
    show() {
        let i = 0;
        for(let ship of this._model.ships.values()){
            this._elements.ships[i].innerHTML =
                `<div class="nazwaStatku">${ship.name}</div>
                <div class="nazwaPlanety">${ship.position}</div>`;
            i+=1;
        }

        //lista planet na popupie
        i = 0;
        let PlanetSelectlist = this._elements.transportSelectList;
        PlanetSelectlist.innerHTML = "";
        for(let planet of this._model.planets.values()){
            this._elements.planets[i].innerHTML =`${planet.name} [${planet.x}, ${planet.y}]`;
            this._elements.planets[i].value=`${planet.name}`;
            PlanetSelectlist.innerHTML += `<option value=${planet.name}>${planet.name}?[${planet.x}, ${planet.y}]</option>`;
            i+=1;
        }

        //lista towarów na popupie
        let SelectForItems = this._elements.tradeSelectList;
        SelectForItems.innerHTML="";
        for(let item of this._model.items){
            SelectForItems.innerHTML+= `<option value=${item}>${item}</option>`
        }
    }
    showTransportInProgress(id : number){
        let ship = this._elements.ships[id];
        ship.href = "#popup4";
        let planet = ship.getElementsByClassName("nazwaPlanety")[0];
        planet.innerHTML = "w podróży";
        this.showShipPopup(id);
        window.location.href = window.location.href.replace(/popup3/, "popup4");

    }
    changeCredits(e : number){
        this._elements.credits.innerHTML = e;
    }

    showShipPopup(id : number){
        let shipName = this._elements.ships[id].getElementsByClassName("nazwaStatku")[0].innerHTML;
        let ship = this._model.ships.get(shipName);
        if(ship.flightLength === 0){
            this._elements.ships[id].href = "#popup3";
            this._elements.shipId = `${id}`;
            this.showPopupOnPlanet(ship);
        }
        else{
            let shipId = document.getElementById("shipId2");
            shipId.dataset.id = `${id}`;
            this._elements.ships[id].href = "#popup4";
            this.showPopupNotOnPlanet(ship);
        }
    }
    showPopupOnPlanet(ship : Ship){
        this._elements.itemsListOnShipOnPlanet.innerHTML = "";
        for(let item of ship.items.keys()){
            //surowce na statku
            if(ship.items.get(item) > 0){
                let listItem =document.createElement("LI");
                listItem.innerHTML =
                    `<span class="typ">${item}</span>
                    <span class="ilość">${ship.items.get(item)}</span>`;
                this._elements.itemsListOnShipOnPlanet.appendChild(listItem);
            }
        }
        //nazwa statku
        this._elements.shipNameOnPlanet.innerHTML = `Statek: ${ship.name}`;
        this._elements.shipNameOnPlanet.value = ship.name;
        this._elements.shipInfoOnPlanet.innerHTML = "";
        //pozycja i ładowność statku
        let shipPosition = document.createElement("LI");
        let shipCapacity = document.createElement("LI");
        shipPosition.innerHTML = `pozycja: ${ship.position}`;
        shipCapacity.innerHTML = `ładowność: ${ship.capacity}`;
        this._elements.shipInfoOnPlanet.appendChild(shipPosition);
        this._elements.shipInfoOnPlanet.appendChild(shipCapacity);
    }
    showPopupNotOnPlanet(ship : Ship){
        this._elements.itemsListOnShipNotOnPlanet.innerHTML = "";
        for(let item of ship.items.keys()){
            //surowce na statku
            if(ship.items.get(item) > 0){
                let listItem = document.createElement("LI");
                listItem.innerHTML =
                    `<span class="typ">${item}</span>
                    <span class="ilość">${ship.items.get(item)}</span>`;
                this._elements.itemsListOnShipNotOnPlanet.appendChild(listItem);
            }
        }
        this._elements.shipNameNotOnPlanet.innerHTML = `Statek: ${ship.name}`;
        this._elements.shipNameNotOnPlanet.value = ship.name;
        this._elements.shipInfoNotOnPlanet.innerHTML = "";
        let shipPosition = document.createElement("LI");
        let shipCapacity = document.createElement("LI");
        let transportTime = document.createElement("LI");
        transportTime.innerHTML = `w podróży jeszcze przez ${ship.flightLength} sekund`;
        shipPosition.innerHTML = `podróżuje do: ${ship.position}`;
        shipCapacity.innerHTML = `ładowność: ${ship.capacity}`;

        this._elements.shipInfoNotOnPlanet.appendChild(transportTime);
        this._elements.shipInfoNotOnPlanet.appendChild(shipPosition);
        this._elements.shipInfoNotOnPlanet.appendChild(shipCapacity);
    }

    showPlanetPopup(planet: Planet){
        this._elements.planetName.innerHTML = planet.name;
        this._elements.planetPosition.innerHTML = `[${planet.x}, ${planet.y}]`;
        this.showShipsOnPlanet(planet);
        this.showItemsOnPlanet(planet);
    }
    showShipsOnPlanet(planet : Planet){
        let i = 0;
        for(let placeholder of this._elements.shipsOnPlanet){
            placeholder.innerHTML = "";
        }
        for(let ship of this._model.ships.values()){
            if(ship.position === planet.name && ship.flightLength === 0){
                this._elements.shipsOnPlanet[i].innerHTML = `<div class="nazwaStatku">${ship.name}</div>`;
                i++;
            }
        }
    }
    showItemsOnPlanet(planet : Planet){
        let i = 1;
        this._elements.itemsOnPlanet.innerHTML = `
                    <li class="surowiec">
                        <span class="typ">typ</span>
                        <span class="ilość">ilość</span>
                        <span class="cenaSprzedazy">cena sprzedaży</span>
                        <span class="cenaKupna">cena kupna</span>
                    </li>`;
        for(let item of planet.items.values()){
            if(item.available > 0){
                this._elements.itemsOnPlanet.innerHTML =
                    this._elements.itemsOnPlanet.innerHTML +
                    `<li class="surowiec">
                    <span class="typ">${item.item}</span>
                    <span class="ilość">${item.available}</span>
                    <span class="cenaSprzedazy">${item.sell_price}</span>
                    <span class="cenaKupna">${item.buy_price}</span>
                    </li>`;
                i+=1;
            }
        }
    }
    updateTime(){
        let seconds = this._model.game_duration%60 < 10 ? '0'+this._model.game_duration%60 : this._model.game_duration%60;
        this._elements.time.innerText=""+Math.floor(this._model.game_duration/60) + ":"+ seconds;
    }

}

class GameController{
    _model : Game;
    _view : GameView;
    constructor(model : Game, view : GameView){
        this._model = model;
        this._view = view;
        view.on('transportButtonClicked', e => { this.performTransport(e); });
        view.on('shipClicked', e => { this.setUpShip(e); });
        view.on('tradeButtonClicked', () => { this.performTrade(parseInt(this._view._elements.shipId, 10))} );
        view.on('planetClicked', e => { this.setUpPlanet(e);});
        this._view.on('shipOnPlanetClicked', e => this.shipOnPlanetClicked(e));
        this.updateTime();
    }
    shipOnPlanetClicked(idOnPlanet : number){
        let shipName = this._view._elements.shipsOnPlanet[idOnPlanet].getElementsByClassName("nazwaStatku")[0].innerHTML;
        let id = -1;
        //find ship id
        for(let i = 0; i < this._view._elements.ships.length; i+=1){
            if(shipName === this._view._elements.ships[i].getElementsByClassName("nazwaStatku")[0].innerHTML){
                id = i;
                break;
            }
        }
        // then show ship popup
        this.setUpShip(id);
    }
    performTransport(id : number){
        let transportList = this._view._elements.transportSelectList;
        if(transportList.selectedIndex<0){
            return;
        }
        let destination = transportList.getElementsByTagName("option")[transportList.selectedIndex].value;
        let shipName = this._view._elements.ships[id].getElementsByClassName("nazwaStatku")[0].innerHTML;
        let ship = this._model.ships.get(shipName);
        this._model.transportShip(ship, destination, id);
    }
    setUpPlanet(p_id : number){
        let planet = this._model.planets.get(this._view._elements.planets[p_id].value);
        this._view.showPlanetPopup(planet);
    }
    setUpShip(id : number){
        this._view.showShipPopup(id);
    }
    performTrade(id : number){
        let tradeList = this._view._elements.tradeSelectList;
        if(tradeList.selectedIndex<0)
            return;
        let itemTraded = tradeList.getElementsByTagName("option")[tradeList.selectedIndex].innerText;
        let howMuchSell = this._view._elements.sellField.value;
        let howMuchBuy = this._view._elements.buyField.value;
        let ship = this._model.ships.get(this._view._elements.shipNameOnPlanet.value as string);
        let planet = this._model.planets.get(ship.position);
        this._model.performTrade(planet, ship, itemTraded, howMuchBuy - howMuchSell, id);
    }
    updateTime(){
        this._model.updateTime();
    }

}

Storage.prototype.setObj = function(key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj))
};

Storage.prototype.getObj = function(key) {
    return JSON.parse(localStorage.getItem(key))
};

function newResult(gracz: string, wynik: number){
    let punkty = Storage.prototype.getObj("wyniki");
    let gracze = Storage.prototype.getObj("listaGraczy");
    let i : number = 0;
    while(i < 10 && punkty[i] !== "undefined" && punkty[i] > wynik){
        i+=1;
    }
    if(i === 10){
        //gorszy wynik niż wszystkie na liście
    }
    else{
        for(let a = 9; a >= i; a-=1){
            punkty[a] = punkty[a-1];
            gracze[a] = gracze[a-1];
        }
        console.log(i);
        punkty[i] = wynik;
        gracze[i] = gracz;
        Storage.prototype.setObj("wyniki", punkty);
        Storage.prototype.setObj("listaGraczy", gracze);
    }
}

window.addEventListener('load', () => {
    console.log("im loaded");
    // noinspection JSUnusedLocalSymbols
    fetch('http://localhost:3000/json/default')
        .then(function(response) {
            console.log("witam");
            return response.json();
        })
        .then(function(json) {
            console.log(JSON.stringify(json));
    const model = new Game()
            .setTime(json.game_duration)
            .setItems(json.items)
            .setCredits(json.initial_credits)
            .setPlanets(json.planets, json.items)
            .setShips(json.starships, json.items),
        view = new GameView(model, {
            'shipId': document.getElementById("shipId").dataset.Id,
            'planetName': document.getElementById("popup2").getElementsByTagName("h2")[0],
            'planetPosition': document.getElementById("popup2").getElementsByTagName("h2")[1],
            'credits': document.getElementById("stanKonta"),
            'planets': document.getElementById("listaPlanet").getElementsByClassName("Planeta"),
            'ships': document.getElementById("listaStatkow").getElementsByClassName("statek"),
            'itemsOnPlanet': document.getElementsByClassName("surowce")[0],
            'shipsOnPlanet': document.getElementById("listaStatkowNaPlanecie").getElementsByClassName("statek"),
            'itemsListOnShipOnPlanet': document.getElementsByClassName("listaSurowcow")[0],
            'itemsListOnShipNotOnPlanet': document.getElementsByClassName("listaSurowcow")[1],
            'shipInfoOnPlanet': document.getElementsByClassName("informacjeOStatku")[0],
            'shipInfoNotOnPlanet': document.getElementsByClassName("informacjeOStatku")[1],
            'shipNameNotOnPlanet': document.getElementById("popup4").getElementsByTagName("h2")[1],
            'shipNameOnPlanet': document.getElementById("popup3").getElementsByTagName("h2")[0],
            'tradeSelectList': document.getElementById("produkty"),
            'buyField': document.getElementById("kupno"),
            'sellField': document.getElementById("sprzedaz"),
            'tradeButton': document.getElementsByClassName("formularz")[0].getElementsByTagName("button")[0],
            'transportSelectList': document.getElementsByClassName("ZmianaPlanety")[0].getElementsByTagName("select")[0],
            'transportButton': document.getElementsByClassName("ZmianaPlanety")[0].getElementsByTagName("button")[0],
            'time': document.getElementById("timeLeft")
        }),
        controller = new GameController(model, view);


    view.show();
        });
});
