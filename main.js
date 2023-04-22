song=""
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function setup() {

    canvas = createCanvas(650,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses)
}

function modelLoaded() {
console.log("posenet has loaded")
}

function gotPoses(results) {

    if (results.length > 0) {
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("Left Wrist X and Y= " + leftWristX + " " +  leftWristY );

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Right wrist X and Y = " + rightWristX + " " + rightWristY);    


    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log(scoreLeftWrist);

    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log(scoreRightWrist);
}

   
}

function draw() {
    image(video , 0 , 0 , 650 ,500)

    fill('red')
    stroke('red')

    if (scoreLeftWrist > 0.2) {
    circle(leftWristX , leftWristY , 20);
    NumberLeftWrist = Number(leftWristY);
    decimalremoved = floor(NumberLeftWrist);
    volume = decimalremoved/500;
    document.getElementById("volume_text").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }


    if (scoreRightWrist > 0.2){

        circle(rightWristX , rightWristY , 20);
        
        if (rightWristY > 0 && rightWristY <= 100) {

            song.rate(0.5);
            document.getElementById("speed_btn"),innerHTML = "Speed = 0.5x";
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("speed_btn").innerHTML = "Speed = 1x";
        }
        else if (rightWristY > 200 && rightWristY <=300) {
            song.rate(1.5);
            document.getElementById('speed_btn').innerHTML = "speed = 1.5x";

        }
        else if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("speed_btn").innerHTML = "speed = 2x";
        }
        else {
            song.rate(2.5);
            document.getElementById("speed_btn").innerHTML = "Speed = 2.5x";
        }
    }
}

function preload() {
   song =  loadSound("music.mp3");


}

function play() {
song.play();
song.rate(1);
song.setVolume(0.5)
}