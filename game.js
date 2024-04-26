var arrButtonClicked = [];
$(document).ready(() => {
    let x = 0;
    $(".back").on("click", function () {
        var but = arrButtonClicked[arrButtonClicked.length-1];
        console.log(but);
        $("button[class^=" + but +"]").css("background", "white")
        $("button[class^=" + but+"]").css("border-color", "black")
        $("button[class^=" + but+"]").text("")
        nextFocus(but.substring(7,8))

        arrButtonClicked.pop()
    })

    $(".tic-tac button").on("click", function () {

        $(this).css("background", "none")
        $(this).css("border-color", "transparent")



        console.log($(this).attr("class"));

        arrButtonClicked.push($(this).attr("class"))
        console.log(arrButtonClicked);
        x++;
        if (x % 2) {
            //$(this).css("background-image", "url('resources/cruz.png'")
            $(this).text("X")
            $(this).css("color", "red")

            $(this).off('click');
        }
        else {
            //$(this).css("background-image", "url('resources/bola.png'")
            $(this).html("O")
            $(this).css("color", "green")
            $(this).off('click');
        }

        let numOfSquare = $(this).attr("class").substring(7, 8)
        verifyLines(numOfSquare);

        let numOfButton = $(this).attr("class").substring(9, 10);
        nextFocus(numOfButton);


    })

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
}

