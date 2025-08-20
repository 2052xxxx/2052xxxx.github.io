// $.fn.myFunction = function(){
//     $("#includedContent").load("browser_window.html"); 
// };

$(document).ready(function() {
    $('#myButton').on('click', function() {
        console.log('Button was clicked!');
        $("#includedContent").load("browser_window.html"); 

    });
});