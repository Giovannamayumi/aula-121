function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier=ml5.imageClassifier("MobileNet",uploadc);

  }
  function draw(){
    image(video,0,0,300,300);
    classifier.classify(video,resultado);
  }
  function uploadc(){
    console.log("modelo carregado");
  }
  pr=" ";
  function resultado(error,results){
   
    if(error){
      console.error(error);
    }
    else{
      if(results[0].cofidence>0.5 && pr != results[0].label ){
        console.log(results);
        pr=results[0].label;
        var apifala=window.speechSynthesis;
        texto="o objeto detectado é: "+results[0].label;
        var converter=new SpeechSynthesisUtterance(texto);
        apifala.speak(converter);
        document.getElementById("nome").innerHTML=results[0].label;
        document.getElementById("precisao").innerHTML=(results[0].confidence.toFixed(2) * 100) + "%";
      }
    }
  }
  
  