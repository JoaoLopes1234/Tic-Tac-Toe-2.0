var arrButtonClicked = [];
let x = 0;
let clickback = 0;
$(document).ready(() => {


    $(".player1Name").html(getInfoUrl('player1') + " < X >")
    $(".player2Name").html(getInfoUrl('player2') + " < O >")
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
        $("#img" + num).attr("src", "resources/RedCross.png")
        line = true
    }

    if ((first === "O" && second === "O" && third === "O") || (first === "O" && fourth === "O" && seventh === "O") || (third === "O" && sixth === "O" && ninth === "O") ||
        (first === "O" && fifth === "O" && ninth === "O") || (third === "O" && fifth === "O" && seventh === "O") || (second === "O" && fifth === "O" && eighth === "O") ||
        (fourth === "O" && fifth === "O" && sixth === "O") || (seventh === "O" && eighth === "O" && ninth === "O")) {
        $("#img" + num).attr("src", "resources/GreenBall.png")
        line = true
    }


    if (line) {
        buttonsArray.forEach(button => {

            if (!button.prop("disabled")) {
                button.prop("disabled", true);
                button.hide()
            }
        });

        $("#square" + num).css("padding", "0px");
        $("." + num).hide()
        $("#img" + num).show()
        $("#success")[0].play()
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

    x++;
    XorO($(this).attr("class"))
    let numOfSquare = $(this).attr("class").substring(7, 8)
    verifyLines(numOfSquare);

    lastClick()

    let numOfButton = $(this).attr("class").substring(9, 10);
    nextFocus(numOfButton);

    $("#click")[0].play()
    shadow()
    backOnOrOff()
    endGame()
}

function backClick() {
    x--;
    var button = arrButtonClicked[arrButtonClicked.length - 1];
    var but = button.substring(7, 8)
    console.log(button.substring(7, 8));
    var buttonsArray = []
    for (var i = 1; i <= 9; i++) {
        buttonsArray.push($(".button-" + but + "-" + i));
    }
    if (verifyLines(but)) {

        buttonsArray.forEach(button => {
            button.show()
        })

        
        var larguraTela = $(window).width();

        // Determinar o valor do padding com base na largura da tela
        var paddingValue;
        if (larguraTela < 600) {
            paddingValue = "5px";
        } else if (larguraTela < 1200) {
            paddingValue = "10px";
        } else {
            paddingValue = "12px";
        }

        $("#square" + but).css("padding", paddingValue);
        $("." + but).show()
        $("#img" + but).hide()
        $("#img" + but).removeAttr("src");

    }
    $("button[class^=" + button + "]").css("background", "white")
    $("button[class^=" + button + "]").css("border-color", "black")
    $("button[class^=" + button + "]").text("")
    $("button[class^=" + button + "]").on('click', click);
    var classbutton = arrButtonClicked[arrButtonClicked.length - 2]
    $("button[class^=" + classbutton + "]").css("text-decoration-line", "underline")
    arrButtonClicked.pop()
    nextFocus(but)
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
        $("button[class^=" + num + "]").each(function () {
            if ($(this).text() === '') {
                $(this).text("O");
                $(this).css("color", "green")
            }
        });


        $("button[class^=" + num + "]").off('click');
    }
}
function getInfoUrl(nome) {
    // Obtém o valor do parâmetro especificado na URL
    return new URLSearchParams(window.location.search).get(nome);
}

function lastClick() {
    var classbutton = arrButtonClicked[arrButtonClicked.length - 2]
    $("button[class^=" + classbutton + "]").css("text-decoration-line", "none")
}

function shadow() {
    if (x % 2) {
        $(".shadowGreen").css("filter", "drop-shadow(5px 5px 5px black)")
        $(".shadowRed").css("filter", "drop-shadow(0px 0px 0px red)")
    }
    else {
        $(".shadowRed").css("filter", "drop-shadow(5px 5px 5px black)")
        $(".shadowGreen").css("filter", "drop-shadow(0px 0px 0px green)")
    }
}

function endGame() {
    let img1 = $("#img1").attr("src");
    let img2 = $("#img2").attr("src");
    let img3 = $("#img3").attr("src");
    let img4 = $("#img4").attr("src");
    let img5 = $("#img5").attr("src");
    let img6 = $("#img6").attr("src");
    let img7 = $("#img7").attr("src");
    let img8 = $("#img8").attr("src");
    let img9 = $("#img9").attr("src");

    let query = window.location.search;
    let params = new URLSearchParams(query);



    if ((img1 === "resources/GreenBall.png" && img2 === "resources/GreenBall.png" && img3 === "resources/GreenBall.png") ||
        (img1 === "resources/GreenBall.png" && img4 === "resources/GreenBall.png" && img7 === "resources/GreenBall.png") ||
        (img7 === "resources/GreenBall.png" && img8 === "resources/GreenBall.png" && img9 === "resources/GreenBall.png") ||
        (img3 === "resources/GreenBall.png" && img6 === "resources/GreenBall.png" && img9 === "resources/GreenBall.png") ||
        (img1 === "resources/GreenBall.png" && img5 === "resources/GreenBall.png" && img9 === "resources/GreenBall.png") ||
        (img3 === "resources/GreenBall.png" && img5 === "resources/GreenBall.png" && img7 === "resources/GreenBall.png") ||
        (img2 === "resources/GreenBall.png" && img5 === "resources/GreenBall.png" && img8 === "resources/GreenBall.png") ||
        (img4 === "resources/GreenBall.png" && img5 === "resources/GreenBall.png" && img6 === "resources/GreenBall.png")) {

        window.location.href = 'Winner.html?player2=' + params.get('player2');
    }
    if ((img1 === "resources/RedCross.png" && img2 === "resources/RedCross.png" && img3 === "resources/RedCross.png") ||
        (img1 === "resources/RedCross.png" && img4 === "resources/RedCross.png" && img7 === "resources/RedCross.png") ||
        (img7 === "resources/RedCross.png" && img8 === "resources/RedCross.png" && img9 === "resources/RedCross.png") ||
        (img3 === "resources/RedCross.png" && img6 === "resources/RedCross.png" && img9 === "resources/RedCross.png") ||
        (img1 === "resources/RedCross.png" && img5 === "resources/RedCross.png" && img9 === "resources/RedCross.png") ||
        (img3 === "resources/RedCross.png" && img5 === "resources/RedCross.png" && img7 === "resources/RedCross.png") ||
        (img2 === "resources/RedCross.png" && img5 === "resources/RedCross.png" && img8 === "resources/RedCross.png") ||
        (img4 === "resources/RedCross.png" && img5 === "resources/RedCross.png" && img6 === "resources/RedCross.png")) {

        window.location.href = 'Winner.html?player1=' + params.get('player1');
    }


}
