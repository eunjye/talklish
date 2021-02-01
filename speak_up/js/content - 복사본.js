window.addEventListener("load", hnInit);

var doc = document;

var stepIndex = 0;
var lineIndex = 0;

function hnInit() {
    console.log("init");
    // if (externalManager.isPlayer()) {
    //     playStep();
    // } else {
    //     doc.addEventListener("click", hnClickDoc);
    // }

    init();
}

function hnClickDoc() {
    doc.removeEventListener("click", hnClickDoc);
    playStep();
}

fnStartAnimation = function (lib) {
    stage.addChild(exportRoot);
    createjs.Ticker.framerate = lib.properties.fps;
    createjs.Ticker.addEventListener("tick", stage);

    exportRoot.mc_disable.visible = false;
    exportRoot.mc_ani.visible = false;
    exportRoot.mc_ani.gotoAndStop(0);

    var btnStart = doc.querySelector(".btn-start");
    btnStart.addEventListener("click", hnClickStart);

    // if (externalManager.isPlayer()) {
    //     playStep();
    // } else {
    //     doc.addEventListener("click", hnClickDoc);
    // }
};

function hnClickStart(e) {
    var btnStart = e.currentTarget;
    btnStart.removeEventListener("click", hnClickStart);
    btnStart.classList.add("remove");

    exportRoot.btn_start.gotoAndStop(0);
    exportRoot.btn_start.visible = false;

    var bgStart = doc.querySelector(".bg-start");
    bgStart.classList.add("remove");

    // setTimeout(function() {
        
    // }, 500);
}

function playStep() {
    var name = data.character.name;
    var direction = data.direction[stepIndex];
    var line = data.character.step[stepIndex][lineIndex].line;
    var audioUrl = data.character.step[stepIndex][lineIndex].audio;

    var userBalloon = doc.querySelector(".user-speech-balloon");
    var userProfile = doc.querySelector(".user-profile");
    var aiBalloon = doc.querySelector(".ai-speech-balloon");
    var nameBox = aiBalloon.querySelector(".name");
    var speechBox = aiBalloon.querySelector(".speech");

    var audio = new Audio;
    audio.src = audioUrl;

    var btnSilvy = doc.querySelector(".btn-silvy");
    btnSilvy.classList.remove("on");
    btnSilvy.innerHTML = direction;

    userBalloon.classList.add("hide");
    userProfile.classList.remove("on");
    aiBalloon.classList.remove("hide");
    aiBalloon.classList.remove("disable");

    // aiBalloon.classList.add("step-0" + (stepIndex + 1));
    nameBox.innerHTML = name;
    speechBox.innerHTML = line;

    audio.play();

    audio.addEventListener("ended", hnAudioEnd);

    var balloonRect = aiBalloon.getBoundingClientRect();
    var speechRect = speechBox.getBoundingClientRect();
    var boxH = speechRect.height + (speechRect.top - balloonRect.top);
    aiBalloon.style.height = (boxH + 15) + "px";

    exportRoot.mc_ani.gotoAndPlay(0);
    exportRoot.mc_ani.visible = true;
    exportRoot.mc_disable.visible = false;

    // var promise = audio.play(); 
    // if (promise !== undefined) { 
    //     promise.then(_ => { 
    //         // Autoplay started! 
    //         console.log("11");
    //     }).catch(error => { 
    //         // Autoplay was prevented. 
    //         // Show a "Play" button so that user can start playback. 
    //         console.log("22");
    //     }); 
    // }

}

function hnAudioEnd(e) {
    e.target.removeEventListener("ended", hnAudioEnd);
    console.log("end audio");

    // var steps = data.character.step;
    // if (stepIndex < steps.length - 1) {
    //     ++lineIndex;
    //     var stepData = data.character.step[stepIndex];
    //     if (lineIndex < stepData.length) {
    //         playStep();
    //     } else {
    //         var btnSelvy = doc.querySelector(".btn-selvy");
    //         btnSelvy.classList.add("on");
    //         btnSelvy.addEventListener("click", hnClickSelvy);
    //     }
    // } else {
    //     console.log("enddddd");
    // }

    exportRoot.mc_ani.gotoAndStop(0);

    ++lineIndex;
    var steps = data.character.step;
    var stepData = steps[stepIndex];
    if (lineIndex < stepData.length) {
        playStep();
    } else {
        if (stepIndex < steps.length - 1) {
            var btnSilvy = doc.querySelector(".btn-silvy");
            btnSilvy.classList.add("on");
            btnSilvy.addEventListener("click", hnClickSilvy);
        } else {
            console.log("완강");
        }
    }
}

function hnClickSilvy(e) {
    e.currentTarget.removeEventListener("click", hnClickSilvy);

    lineIndex = 0;

    if(externalManager.isPlayer()) {
        window.HybridApp.startSilvySTTMode(0);
        window.HybridApp.onResultSTTMode = function(str) {
            // externalManager.toast(str);
            setSilvyText(str);
        }
    } else {
        // setSilvyText("안녕 만나서 반가워~ 난 씩씩한 냥이라고 해. 안녕 만나서 반가워~ 난 씩씩한 냥이라고 해. 안녕 만나서 반가워~ 난 씩씩한 냥이라고 해.");
        setSilvyText("버리야 안녕 나는 씩씩한 냥이야. 도덕 공부를 하고 있어.");
    }
}

function setSilvyText(str) {
    var aiBalloon = doc.querySelector(".ai-speech-balloon");
    var userProfile = doc.querySelector(".user-profile");
    var balloon = doc.querySelector(".user-speech-balloon");
    var nameBox = balloon.querySelector(".name");
    var speechBox = balloon.querySelector(".speech");

    aiBalloon.classList.add("disable");
    exportRoot.mc_ani.visible = false;
    exportRoot.mc_disable.visible = true;

    // balloon.classList.add("step-0" + (stepIndex + 1));
    balloon.classList.remove("hide");
    userProfile.classList.add("on");
    nameBox.innerHTML = "씩씩한 냥이";
    speechBox.innerHTML = str;

    var balloonRect = balloon.getBoundingClientRect();
    var speechRect = speechBox.getBoundingClientRect();
    var boxH = speechRect.height + (speechRect.top - balloonRect.top);
    balloon.style.height = (boxH + 15) + "px";

    setTimeout(function() {
        ++stepIndex;
        playStep();
    }, 2000);
}

var data = {
    direction: [
        "버리에게 인사해 주세요.",
        "정직의 의미를 말해보세요.",
        "나의 생각을 말해보세요.",
        "정직하게 행동하기 위한 방법을 알려주세요.",
        "정직하게 행동하기 위한 방법을 알려주세요."
    ],
    character: {
        name: "버리",
        step: [
            [
                {
                    line: "안녕~ 씩씩한 냥이. 나는 버리라고 해.",
                    audio: "./audio/DDJ510101_H_01.mp3" 
                }
            ],
            [
                {
                    line: "만나서 반가워~",
                    audio: "./audio/DDJ510101_H_02_01.mp3" 
                },
                {
                    line: "우리 친구는 ‘정직’이 무슨 뜻인지 알고 있니?",
                    audio: "./audio/DDJ510101_H_02_02.mp3" 
                },
            ],
            [
                {
                    line: "그렇구나! 난 정직은 자기 자신과 남을 속이지 않는 것이라고 생각해.",
                    audio: "./audio/DDJ510101_H_03.mp3" 
                },
                {
                    line: "그렇다면, 일상생활에서 정직하게 행동하고 있다고 생각하니?",
                    audio: "./audio/DDJ510101_H_04.mp3" 
                },
            ],
            [
                {
                    line: "그렇구나! 사실은 나, 오늘 학교에서 선생님께 거짓말을 했어.",
                    audio: "./audio/DDJ510101_H_05.mp3" 
                },
                {
                    line: "그래서 나 스스로에게 떳떳하지 못한 느낌이 들어. 어떻게 하면 좋을까?",
                    audio: "./audio/DDJ510101_H_06.mp3" 
                },
            ],
            [
                {
                    line: "아하, 정말 고마워!",
                    audio: "./audio/DDJ510101_H_07.mp3" 
                },
                {
                    line: "그럼 다음 영상을 보고 의견을 나누어볼까?",
                    audio: "./audio/DDJ510101_H_08.mp3" 
                },
            ]
        ]
    }
}