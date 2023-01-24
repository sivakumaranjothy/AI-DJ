
song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;


function play(){

 song.play();
 song.setVolume(1);
 song.rate(1);  
 
}
function preload(){
    song= loadSound('music.mp3');
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
   
   video=createCapture(VIDEO);
   video.hide();

   poseNet=ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
     console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.Y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.Y;
        scoreleftWrist=results[0].pose.keypoints[9].score;
    }
}

function modelLoaded(){
    console.log('poseNet is initialized.') 
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red")
    
    if(scoreleftWrist>0.002){
      console.log(leftWristX,leftWristY);
      circle(leftWristX,leftWristY,20);
      IsNumberleftWristY=Number(leftWristY);
      remove_decimals=floor(IsNumberleftWristY);
      volume=remove_decimals/500;
      document.getElementById("volume").innerHTML="Volume:"+volume;
      song.setVolume(volume);
    }
    


}
