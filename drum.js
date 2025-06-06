
var len=document.querySelectorAll("button").length;

for(var i=0;i<len;i++){
    document.querySelectorAll("button")[i].addEventListener("click",function(){

        var buttoninnerHTML=this.innerHTML;

        switch(buttoninnerHTML){
            case "W":
                var tom1=new Audio("sound1.mp3");
                audio.play();
                break;
            case "a":
                var tom2=new Audio("sound2.mp3");
                audio.play();
                break;
            default:
                console.log("error");
        }

    });
}