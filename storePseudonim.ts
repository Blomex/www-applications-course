function store() {
 let inputId = document.getElementById("pseudonim") as HTMLInputElement;
    localStorage.setItem("pseudonim", inputId.value.replace(/</, ""));
}

function setPseudonim() {
    if (typeof (Storage) !== "undefined" && localStorage.getItem("pseudonim") !== null) {
        document.getElementById("pseudonim").innerHTML = "Pseudonim: " + localStorage.getItem("pseudonim");
    } else {
        //need name to play the game
        location.replace("EkranPoczatkowy.html#popup1");
    }
}

