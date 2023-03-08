var objects = [];
var status = "";
var alert;

function preload(){
    alert = loadSound('AlarmSound.mp3');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("COCOSSD", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("modelLoaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error.message);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(var i=0; i<objects.length; i++){
            if(objects[i].label=="person"){
                document.getElementById("status").innerHTML = "Baby is detected";
                alert.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Baby is not detected";
                alert.play();
            }
            if(objects.length<=0){
                document.getElementById("status").innerHTML = "Baby is not detected";
                alert.play();
            }
            // document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: " + objects.length;
            // fill(r,g,b);
            // percent = floor(objects[i].confidence*100);
            // text(objects[i].label + " " + percent + "%", objects[i].x+15,objects[i].y+15);
            // noFill();
            // stroke(r,g,b);
            // rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}