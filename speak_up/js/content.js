window.addEventListener("load", hnInit);

var doc = document;

var stepIndex = 0;
var lineIndex = 0;

var userName = "";

function initCornerButton() {
    var btnBox = document.querySelector(".btn-corner-container");
    var btnPrev = btnBox.querySelector(".prev .icon");
    var btnNext = btnBox.querySelector(".next .icon");

    btnBox.classList.remove("hide");
    btnNext.style.opacity = 0.5;
    btnNext.style.pointerEvents = "none";

    btnPrev.addEventListener("click", hnClickPrev);
    btnNext.addEventListener("click", hnClickNext);

    function hnClickPrev(e) {
        externalManager.prevMenu();
    }

    function hnClickNext(e) {
        externalManager.nextMenu();
    }

    var status = externalManager.getNowStatus();
    //externalManager.toast("status :: " + status);
    //0 : 미진행 / 1 : 진행중 / 2 : 진행완료
    if (status === 2) {
        // 이미 완강된 컨텐츠면 다음 버튼 활성화
        btnNext.style.opacity = 1;
        btnNext.style.pointerEvents = "auto";
    }
}

function completeCornerStudy() {
    var btnBox = document.querySelector(".btn-corner-container");
    var btnNext = btnBox.querySelector(".next .icon");
    var effect = btnBox.querySelector(".next .effect");

    btnNext.style.pointerEvents = "auto";
    effect.style.display = "block";
    effect.style.pointerEvents = "none";
    effect.classList.add("induce-next-corner");
}

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

    var intro = doc.querySelector(".intro");
    intro.classList.add("remove");

    startProfile();
}

function startProfile() {
    var profileBox = doc.querySelector(".profile");
    var btnCamera = profileBox.querySelector(".btn-camera");
    var captureCameraBox = profileBox.querySelector(".capture-camera-box");
    var captureEffectBox = profileBox.querySelector(".capture-effect-box");
    var captureCharacterBox = profileBox.querySelector(".capture-character-box");
    var btnComplete = profileBox.querySelector(".btn-complete");

    var slideIndex = 0;
    var slideBox = doc.querySelector(".slide");
    var pages = slideBox.querySelectorAll(".page");
    var btnPrev = slideBox.querySelector(".btn-prev");
    var btnNext = slideBox.querySelector(".btn-next");
    var btnEffects = slideBox.querySelectorAll(".effect");

    var characterBox = doc.querySelector(".character-box");
    var btnCharacters = characterBox.querySelectorAll(".char");

    var captureEffects = captureEffectBox.querySelectorAll(".img");
    var captureCharacters = captureCharacterBox.querySelectorAll(".img");

    var isComplete = false;

    init();

    function init() {
        profileBox.classList.remove("hide");

        btnComplete.addEventListener("click", hnClickBtnComplete);

        initCornerButton();
        setupCam();
        setupSlide();
    }

    function setupCam() {
        hideCaptureEffects();
        hideCaptureCharacters();

        if (externalManager.isPlayer()) {
            // 16 : 9 비율, height에 맞췄음
            externalManager.startCameraPreview("front", -100, 172, 640, 360);
        }

        btnCamera.addEventListener("click", hnClickBtnCamera);
    }

    function hnClickBtnComplete(e) {
        if (isComplete) return;
        isComplete = true;
        if (externalManager.isPlayer()) {
            externalManager.captureToClipboard(function (str) {
                var img = new Image();
                img.src = "data:image/png;base64," + str;
                img.addEventListener("load", function () {
                    var canvas = doc.createElement("canvas");
                    var context = canvas.getContext("2d");

                    var ratio = window.devicePixelRatio;

                    var sx = 100;
                    var sy = 183;
                    var sw = 350;
                    var sh = 350;

                    var dx = 0;
                    var dy = 0;
                    var dw = 350;
                    var dh = 350;

                    canvas.width = dw;
                    canvas.height = dh;
                    context.drawImage(img, sx * ratio, sy * ratio, sw * ratio, sh * ratio, dx, dy, dw, dh);

                    // var temp = new Image;
                    // temp.src = canvas.toDataURL("image/png");

                    // var debug = doc.querySelector(".debug-capture");
                    // debug.appendChild(canvas);
                    // debug.appendChild(img);
                    // debug.appendChild(temp);

                    // externalManager.toast(img.width + ", " + img.height);

                    externalManager.setInstantData(canvas.toDataURL("image/png"));

                    profileBox.classList.add("hide");
                    startProfileName();
                });
            });
        } else {
            profileBox.classList.add("hide");
            startProfileName();
        }
    }

    function hnClickBtnCamera(e) {
        if (isComplete) return;
        if (btnCamera.classList.contains("on")) {
            btnCamera.classList.remove("on");
            resetProfile();
        } else {
            activateBtnComplete();
            btnCamera.classList.add("on");
            if (externalManager.isPlayer()) {
                externalManager.captureSave(callbackCapture);
            }
        }
    }

    function callbackCapture(str) {
        var img = new Image();
        img.src = str;
        captureCameraBox.appendChild(img);
    }

    function hideCaptureEffects() {
        for (var i = 0; i < captureEffects.length; ++i) {
            captureEffects[i].classList.add("hide");
        }
    }

    function hideCaptureCharacters() {
        for (var i = 0; i < captureCharacters.length; ++i) {
            captureCharacters[i].classList.add("hide");
        }
    }

    function disableBtnEffects() {
        for (var i = 0; i < btnEffects.length; ++i) {
            btnEffects[i].classList.add("disable");
        }
    }

    function enableBtnEffects() {
        for (var i = 0; i < btnEffects.length; ++i) {
            btnEffects[i].classList.remove("disable");
        }
    }

    function setupSlide() {
        updateSlide(slideIndex);
        btnPrev.addEventListener("click", hnClickBtnSlide);
        btnNext.addEventListener("click", hnClickBtnSlide);
        slideBox.addEventListener("click", hnClickSlideBox);
        characterBox.addEventListener("click", hnClickCharacterBox);
    }

    function updateSlide(index) {
        if (index < 0) {
            return;
        }
        if (index > pages.length - 1) {
            return;
        }

        for (var i = 0; i < pages.length; ++i) {
            pages[i].classList.add("hide");
        }
        btnPrev.classList.remove("disable");
        btnNext.classList.remove("disable");

        pages[index].classList.remove("hide");

        if (index === 0) {
            btnPrev.classList.add("disable");
        } else if (index === pages.length - 1) {
            btnNext.classList.add("disable");
        }
    }

    function hnClickBtnSlide(e) {
        var target = e.currentTarget;
        switch (target) {
            case btnPrev:
                updateSlide(--slideIndex);
                break;
            case btnNext:
                updateSlide(++slideIndex);
                break;
        }
    }

    function hnClickSlideBox(e) {
        if (isComplete) return;
        var target = e.target;
        var index = Array.prototype.indexOf.call(btnEffects, target);
        if (index > -1) {
            hideCaptureEffects();
            resetBtnEffects();
            captureEffects[index].classList.remove("hide");
            target.classList.add("on");
        }
    }

    function hnClickCharacterBox(e) {
        if (isComplete) return;
        var target = e.target;
        var index = Array.prototype.indexOf.call(btnCharacters, target);
        if (index > -1) {
            hideCaptureCharacters();
            hideCaptureEffects();
            resetBtnEffects();
            disableBtnEffects();
            resetBtnCharacters();
            btnCamera.classList.add("on");
            captureCharacters[index].classList.remove("hide");
            target.classList.add("on");
            activateBtnComplete();
        }
    }

    function resetSlide() {
        slideIndex = 0;
        updateSlide(slideIndex);
    }

    function resetBtnEffects() {
        for (var i = 0; i < btnEffects.length; ++i) {
            btnEffects[i].classList.remove("on");
        }
    }

    function resetBtnCharacters() {
        for (var i = 0; i < btnCharacters.length; ++i) {
            btnCharacters[i].classList.remove("on");
        }
    }

    function resetCaptureCameraBox() {
        while(captureCameraBox.firstChild) {
            captureCameraBox.removeChild(captureCameraBox.firstChild);
        }
    }

    function activateBtnComplete() {
        btnComplete.classList.add("active");
    }

    function deactivateBtnComplete() {
        btnComplete.classList.remove("active");
    }

    function resetProfile() {
        resetSlide();
        enableBtnEffects();
        hideCaptureEffects();
        hideCaptureCharacters();
        resetBtnCharacters();
        resetBtnEffects();
        resetCaptureCameraBox();
        deactivateBtnComplete();
    }
}

function startProfileName() {
    var profileBox = doc.querySelector(".profile-name");
    var profilePic = profileBox.querySelector(".pic");
    var btnComplete = profileBox.querySelector(".btn-complete");
    var input = profileBox.querySelector("input");

    var isComplete = false;

    init();

    function init() {
        profileBox.classList.remove("hide");

        if (externalManager.isPlayer()) {
            var img = new Image();
            img.src = externalManager.getInstantData();
            profilePic.appendChild(img);
        }

        input.addEventListener("input", function () {
            var len = input.value.length;
            if (len > 0) {
                btnComplete.classList.add("active");
            } else {
                btnComplete.classList.remove("active");
            }
        });

        btnComplete.addEventListener("click", hnClickBtnComplete);
    }

    function hnClickBtnComplete(e) {
        if (isComplete) return;
        isComplete = true;
        userName = input.value;
        profileBox.classList.add("hide");
        startChat();
        // if(externalManager.isPlayer()) {
        // } else {
        // }
    }
}

function startChat() {
    var chatBox = doc.querySelector(".chat");
    var profileBox = chatBox.querySelector(".user-profile");
    var profilePic = profileBox.querySelector(".pic");

    init();

    function init() {
        chatBox.classList.remove("hide");

        if (externalManager.isPlayer()) {
            var img = new Image();
            img.src = externalManager.getInstantData();
            profilePic.appendChild(img);
        }

        playStep();
    }

    function playStep() {
        var name = data.character.name;
        var direction = data.direction[stepIndex];
        var line = data.character.step[stepIndex][lineIndex].line;
        var audioUrl = data.character.step[stepIndex][lineIndex].audio;

        var userBalloon = doc.querySelector(".user-speech-balloon");
        var aiBalloon = doc.querySelector(".ai-speech-balloon");
        var nameBox = aiBalloon.querySelector(".name");
        var speechBox = aiBalloon.querySelector(".speech");

        var audio = new Audio();
        audio.src = audioUrl;

        var btnSilvy = doc.querySelector(".btn-silvy");
        btnSilvy.classList.remove("on");
        btnSilvy.innerHTML = direction;

        userBalloon.classList.add("hide");
        profileBox.classList.remove("on");
        aiBalloon.classList.remove("hide");
        aiBalloon.classList.remove("disable");

        // aiBalloon.classList.add("step-0" + (stepIndex + 1));
        nameBox.innerHTML = name;
        // 대사에서 유저 이름 적용
        if (line.indexOf("userName")) {
            speechBox.innerHTML = line.replace(/userName/gi, userName);
        } else {
            speechBox.innerHTML = line;
        }

        audio.play();

        audio.addEventListener("ended", hnAudioEnd);

        var balloonRect = aiBalloon.getBoundingClientRect();
        var speechRect = speechBox.getBoundingClientRect();
        var boxH = speechRect.height + (speechRect.top - balloonRect.top);
        aiBalloon.style.height = boxH + 15 + "px";

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
                completeCornerStudy();
            }
        }
    }

    function hnClickSilvy(e) {
        e.currentTarget.removeEventListener("click", hnClickSilvy);

        lineIndex = 0;

        if (externalManager.isPlayer()) {
            window.HybridApp.startSilvySTTMode(0);
            window.HybridApp.onResultSTTMode = function (str) {
                // externalManager.toast(str);
                setSilvyText(str);
            };
        } else {
            // setSilvyText("안녕 만나서 반가워~ 난 씩씩한 냥이라고 해. 안녕 만나서 반가워~ 난 씩씩한 냥이라고 해. 안녕 만나서 반가워~ 난 씩씩한 냥이라고 해.");
            setSilvyText("버리야 안녕 나는 씩씩한 냥이야. 도덕 공부를 하고 있어.");
        }
    }

    function setSilvyText(str) {
        var aiBalloon = doc.querySelector(".ai-speech-balloon");
        var balloon = doc.querySelector(".user-speech-balloon");
        var nameBox = balloon.querySelector(".name");
        var speechBox = balloon.querySelector(".speech");

        aiBalloon.classList.add("disable");
        exportRoot.mc_ani.visible = false;
        exportRoot.mc_disable.visible = true;

        // balloon.classList.add("step-0" + (stepIndex + 1));
        balloon.classList.remove("hide");
        profileBox.classList.add("on");
        nameBox.innerHTML = userName;
        speechBox.innerHTML = str;

        var balloonRect = balloon.getBoundingClientRect();
        var speechRect = speechBox.getBoundingClientRect();
        var boxH = speechRect.height + (speechRect.top - balloonRect.top);
        balloon.style.height = boxH + 15 + "px";

        setTimeout(function () {
            ++stepIndex;
            playStep();
        }, 2000);
    }
}

var data = {
    direction: ["버리에게 인사해 주세요.", "정직의 의미를 말해보세요.", "나의 생각을 말해보세요.", "정직하게 행동하기 위한 방법을 알려주세요.", "정직하게 행동하기 위한 방법을 알려주세요."],
    character: {
        name: "버리",
        step: [
            [
                {
                    line: "안녕~ userName. 나는 버리라고 해.",
                    audio: "./audio/DDJ510101_H_01.mp3",
                },
            ],
            [
                {
                    line: "만나서 반가워~",
                    audio: "./audio/DDJ510101_H_02_01.mp3",
                },
                {
                    line: "우리 친구는 ‘정직’이 무슨 뜻인지 알고 있니?",
                    audio: "./audio/DDJ510101_H_02_02.mp3",
                },
            ],
            [
                {
                    line: "그렇구나! 난 정직은 자기 자신과 남을 속이지 않는 것이라고 생각해.",
                    audio: "./audio/DDJ510101_H_03.mp3",
                },
                {
                    line: "그렇다면, 일상생활에서 정직하게 행동하고 있다고 생각하니?",
                    audio: "./audio/DDJ510101_H_04.mp3",
                },
            ],
            [
                {
                    line: "그렇구나! 사실은 나, 오늘 학교에서 선생님께 거짓말을 했어.",
                    audio: "./audio/DDJ510101_H_05.mp3",
                },
                {
                    line: "그래서 나 스스로에게 떳떳하지 못한 느낌이 들어. 어떻게 하면 좋을까?",
                    audio: "./audio/DDJ510101_H_06.mp3",
                },
            ],
            [
                {
                    line: "아하, 정말 고마워!",
                    audio: "./audio/DDJ510101_H_07.mp3",
                },
                {
                    line: "그럼 다음 영상을 보고 의견을 나누어볼까?",
                    audio: "./audio/DDJ510101_H_08.mp3",
                },
            ],
        ],
    },
};
