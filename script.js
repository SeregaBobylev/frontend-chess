// start
var url = 
// "109.201.66.2"
"localhost"
;
var stompClient = null,cellTemp=null;
$(function () {
    $("#play").show();
    createBoard();
    connectWebSocket();
    $("#1a").html("<div class=figure>Фигура</div>");
});

function createBoard() {
    let board = $("table");
    board.html("");
    let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let cell = true;
    for (x = 1; x < 9; x++) {
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