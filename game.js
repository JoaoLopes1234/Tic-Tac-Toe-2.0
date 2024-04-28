var arrButtonClicked = [];
let x = 0;
let clickback = 0;
$(document).ready(() => {

    $(".player1Name").html(obterParametro('player1'))
    $(".player2Name").html(obterParametro('player2'))
    backOnOrOff()
    $(".back").on("click", backClick)
    $(".restart").on("click", restartClick)
    $(".tic-tac button").on("click", click)
    shadow()
})

function verifyLines(num) {
    var line = false;
    var first = $(".button-" + num + "-1").text()
    var second = $(".button-" + num + "-2").text()
    var third = $(".button-" + num + "-3").text()
    var fourth = $(".button-" + num + "-4").text()
    var fifth = $(".button-" + num + "-5").text()
    var sixth = $(".button-" + num + "-6").text()
    var seventh = $(".button-" + num + "-7").text()
    var eighth = $(".button-" + num + "-8").text()
    var ninth = $(".button-" + num + "-9").text()
    var buttonsArray = [];
    for (var i = 1; i <= 9; i++) {
        buttonsArray.push($(".button-" + num + "-" + i));
    }
    if ($("#img" + num).attr("src") !== undefined) {
        return true;
    }


    if ((first === "X" && second === "X" && third === "X") || (first === "X" && fourth === "X" && seventh === "X") || (seventh === "X" && eighth === "X" && ninth === "X") ||
        (third === "X" && sixth === "X" && ninth === "X") || (first === "X" && fifth === "X" && ninth === "X") || (third === "X" && fifth === "X" && seventh === "X") ||
        (second === "X" && fifth === "X" && eighth === "X") || (fourth === "X" && fifth === "X" && sixth === "X")) {
        $("#img" + num).attr("src", "resources/cruzMaior.png")
        line = true
    }

    if ((first === "O" && second === "O" && third === "O") || (first === "O" && fourth === "O" && seventh === "O") || (third === "O" && sixth === "O" && ninth === "O") ||
        (first === "O" && fifth === "O" && ninth === "O") || (third === "O" && fifth === "O" && seventh === "O") || (second === "O" && fifth === "O" && eighth === "O") ||
        (fourth === "O" && fifth === "O" && sixth === "O") || (seventh === "O" && eighth === "O" && ninth === "O")) {
        $("#img" + num).attr("src", "resources/bolaMaior.png")
        line = true
    }


    if (line) {
        buttonsArray.forEach(button => {

            if (!button.prop("disabled")) {
                button.prop("disabled", true);
                button.hide()
                $("#square" + num).css("padding", "0px");
                $("." + num).remove()
                $("#img" + num).show()
            }
        });
        return true;
    }
}

function nextFocus(num) {

    if (verifyLines(num)) {
        $(".tic-tac").find("button").prop("disabled", false);
        $(".tic-tac").find("button[class^='button-" + num + "-']").filter(() => verifyLines(num)).prop("disabled", true);
    }
    else {
        $(".tic-tac").find("button").prop("disabled", true);
        $(".tic-tac").find("button[class^='button-" + num + "-']").prop("disabled", false);
    }
    if (x === 0) {
        $(".tic-tac").find("button").prop("disabled", false);
    }

}

function backOnOrOff() {
    if (arrButtonClicked.length === 0) {
        $(".back").prop("disabled", true)
    }
    else {
        $(".back").prop("disabled", false)
    }
}

function click() {
    $(this).css("background", "none")
    $(this).css("border-color", "transparent")
    $(this).css("text-decoration-line", "underline")

    console.log($(this).attr("class"));
    arrButtonClicked.push($(this).attr("class"))

    lastClick()
    x++;
    backOnOrOff()

    XorO($(this).attr("class"))
    let numOfSquare = $(this).attr("class").substring(7, 8)
    verifyLines(numOfSquare);

    let numOfButton = $(this).attr("class").substring(9, 10);
    nextFocus(numOfButton);
    console.log("Cliques: " + x);
    shadow()
}

function backClick() {
    x--;
    var but = arrButtonClicked[arrButtonClicked.length - 1];
    console.log(but);
    $("button[class^=" + but + "]").css("background", "white")
    $("button[class^=" + but + "]").css("border-color", "black")
    $("button[class^=" + but + "]").text("")
    $("button[class^=" + but + "]").on('click', click);
    nextFocus(but.substring(7, 8))

    var classbutton = arrButtonClicked[arrButtonClicked.length - 2]
    $("button[class^=" + classbutton + "]").css("text-decoration-line", "underline")
    arrButtonClicked.pop()
    backOnOrOff()
}

function restartClick() {
    confirm("Are you sure you want to upgrade. You will lose the game process")
    location.reload();
}

function XorO(num) {
    if (x % 2) {
        //$(this).css("background-image", "url('resources/cruz.png'")
        $("button[class^=" + num + "]").text("X")
        $("button[class^=" + num + "]").css("color", "red")

        $("button[class^=" + num + "]").off('click');
    }
    else {
        //$(this).css("background-image", "url('resources/bola.png'")
        $("button[class^=" + num + "]").html("O")
        $("button[class^=" + num + "]").css("color", "green")
        $("button[class^=" + num + "]").off('click');
    }
}
function obterParametro(nome) {
    // Obtém o valor do parâmetro especificado na URL
    return new URLSearchParams(window.location.search).get(nome);
}

function lastClick() {
    var classbutton = arrButtonClicked[arrButtonClicked.length - 2]
    $("button[class^=" + classbutton + "]").css("text-decoration-line", "none")
}

function shadow() {
    if (x % 2) {
        console.log("certerza");
        $(".shadowGreen").css("filter", "drop-shadow(5px 5px 5px black)")
        $(".shadowRed").css("filter", "drop-shadow(0px 0px 0px red)")
    }
    else {
        $(".shadowRed").css("filter", "drop-shadow(5px 5px 5px black)")
        $(".shadowGreen").css("filter", "drop-shadow(0px 0px 0px green)")
    }
}
