
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
        punkty[i] = wynik;
        gracze[i] = gracz;
        Storage.prototype.setObj("wyniki", punkty);
        Storage.prototype.setObj("listaGraczy", gracze);
        printTopList();
    }
}


function printTopList(){
    let playerList = document.getElementsByClassName("PojedynczyGracz");
    //sprawdzenie ile wolnych miejsc w topliście
    let niePuste = 0;
    let gracze: string[] = ['Mistrz','Silny Gracz', 'Przeciętny Gracz', 'Słaby Gracz', 'AFKer'];
    let punkty: number[] = [1050, 504, 300, 105, 0];
    if(Storage.prototype.getObj("listaGraczy")=== "undefined" || Storage.prototype.getObj("punkty") === "undefined"){
        Storage.prototype.setObj("wyniki", punkty);
        Storage.prototype.setObj("listaGraczy", gracze);
    }
    else{
        gracze = Storage.prototype.getObj("listaGraczy");
        punkty = Storage.prototype.getObj("wyniki");
    }

    for(let i=0; i<gracze.length; i+=1){
        if(gracze[i]!= null && punkty[i] != null){
            playerList[i].innerHTML = gracze[i] + " - "+ punkty[i] + " ptk";
        }
    }
}

function printPossibleStarts() {
    fetch('http://localhost:3000/starts')
        .then(function(response){
            return response.json;
        })
        .then(function(json){
            console.log("wypelnijmy liste");
            document.getElementsByClassName("sytuacjePoczatkowe")[0]
                .innerHTML += `<select>
                        <option value="default">default</option>
                        <option value="xd">xd</option>
                              </select>`;
        })
}