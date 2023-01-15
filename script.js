// start
var url = 
// "109.201.66.2"
"localhost"
;
var chars = ['a','b','c','d','e','f','g','h'];
var stompClient = null,cellTemp=null;
$(function () {
    $("#play").show();
    createBoard();
    connectWebSocket();
    reset();
    // $("#1a").html("<div class=figure>Фигура</div>");
});

function reset() {
    $(".figure").remove();
    chars.forEach(e=>{
        $(`#2${e}`).html("<img class=figure src='figure/wP.svg'>");
        $(`#7${e}`).html("<img class=figure src='figure/bP.svg'>");
    });
    $(`#1a`).html("<img class=figure src='figure/wR.svg'>");
    $(`#1h`).html("<img class=figure src='figure/wR.svg'>");
    $(`#8a`).html("<img class=figure src='figure/bR.svg'>");
    $(`#8h`).html("<img class=figure src='figure/bR.svg'>");

    $(`#1g`).html("<img class=figure src='figure/wN.svg'>");
    $(`#1b`).html("<img class=figure src='figure/wN.svg'>");
    $(`#8g`).html("<img class=figure src='figure/bN.svg'>");
    $(`#8b`).html("<img class=figure src='figure/bN.svg'>");

    $(`#1c`).html("<img class=figure src='figure/wB.svg'>");
    $(`#1f`).html("<img class=figure src='figure/wB.svg'>");
    $(`#8c`).html("<img class=figure src='figure/bB.svg'>");
    $(`#8f`).html("<img class=figure src='figure/bB.svg'>");

    $(`#1d`).html("<img class=figure src='figure/wQ.svg'>");
    $(`#8d`).html("<img class=figure src='figure/bQ.svg'>");

    $(`#1e`).html("<img class=figure src='figure/wK.svg'>");
    $(`#8e`).html("<img class=figure src='figure/bK.svg'>");
}

function createBoard() {
    let board = $("table");
    board.html("");
    let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let cell = true;
    for (x = 8; x>0; x--) {
        let line = $("<tr></tr>");
        let tempColor = cell ? false : true;
        for (y = 0; y < arr_en.length; y++) {
            $(`<th id=${x}${arr_en[y]} class=${tempColor?"black":"white"}></th>`).appendTo(line);
            tempColor = tempColor ? false : true;
        }
        cell = cell ? false : true;
        board.append(line);
    }
}
$("body").on("click","th",function () {
    if(!cellTemp){
        cellTemp = $(this).attr("id");
        $(this).addClass("select_cell");
    }
    else{
        block = $(`#${cellTemp}>.figure`);
        console.log(block);
        if($(this).html()=="")
        $(this).html(block);
        else return;
        $(`#${cellTemp}`).removeClass("select_cell");
        cellTemp=null;
    }
});
function connectWebSocket() {
    var socket = new SockJS(`http://${url}:8080/chat`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
    });
}