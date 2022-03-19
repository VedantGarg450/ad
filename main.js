var leftWrist_Score= 0
var song= ""
var leftWristX= ""
var leftWristY= ""
var rightWristX= ""
var rightWristY= ""
var RWS= 0

function preload(){
    song= loadSound("music.mp3")
}
function setup(){
    canvas= createCanvas(700, 700)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    posenet= ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotPoses)
}
function gotPoses(result){
    if(result.length>0){
        console.log(result)
        leftWristX= result[0].pose.leftWrist.x
        console.log(leftWristX)
        leftWristY= result[0].pose.leftWrist.y
        console.log(leftWristY)
        rightWristX= result[0].pose.rightWrist.x
        console.log(rightWristX)
        rightWristY= result[0].pose.rightWrist.y
        console.log(rightWristY)
        leftWrist_Score= result[0].pose.keypoints[9].score
        RWS= result[0].pose.keypoints[10].score   
    }
}
function modelLoaded(){
    console.log('Model Loaded Successfuly!')
}
function draw(){
    image(video, 0, 0, 700, 700)
        fill("#00aeff")
        stroke("#00aeff")
        circle(leftWristX, leftWristY, 30)
        convert_number= Number(leftWristY)
        remove_decimal= floor(convert_number) 
        console.log(remove_decimal)
        volume= remove_decimal/500
        console.log(volume)
        document.getElementById("vol").innerHTML= "Volume: "+volume
        song.setVolume(volume)
        fill("#00aeff")
        stroke("#00aeff")
        circle(rightWristX, rightWristY, 30) 
        if(rightWristY>=0 && rightWristY<100){
            song.rate(0.5)
            document.getElementById("speed").innerHTML= "Speed: 0.5x"
        }
        if(rightWristY>=100 && rightWristY<200){
            song.rate(1)
            document.getElementById("speed").innerHTML= "Speed: 1x"
        }
        if(rightWristY>=200 && rightWristY<300){
            song.rate(1.5)
            document.getElementById("speed").innerHTML= "Speed: 1.5x"
        }
        if(rightWristY>=300 && rightWristY<400){
            song.rate(2)
            document.getElementById("speed").innerHTML= "Speed: 2x"
        }
        if(rightWristY>=400 && rightWristY<500){
            song.rate(2.5)
            document.getElementById("speed").innerHTML= "Speed: 2.5x"
    }
}
function PLAY(){
    song.setVolume(1)
    song.rate(1)
    song.play()
}
function STOP(){
    song.pause()
}