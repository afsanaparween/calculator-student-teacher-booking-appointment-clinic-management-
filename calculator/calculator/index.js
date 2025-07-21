var result = document.getElementById("result")

function display(number){
    result.value += number;
}
function calculate(){
    var fiinal_number = result.value;
    var final_result = eval(fiinal_number)
    result.value = final_result;
}

function clrs(){
    result.value = "";
}
function dle(){
    result.value =result.value.slice(0, -1);
}