var createPraiseAnimation = function (spec) {
    var exporter = _.extend(baseModule());
    var box;
    var button;
    var canvas;
    var aniModule;
    var type;

    exporter.name = spec.moduleName;

    init();

    function init() {
        box = spec.box;
        button = amt.get(".praise-button", box);
        canvas = amt.get("canvas", box);
        type = parseInt(spec.type);

        var src = "../common/images/ani/praise0" + (type + 1) + ".png";
        var data = window["praise0" + (type + 1)];

        aniModule = canvasAnimation({
            canvas: canvas,
            imageSrc: src,
            data: data,
            autoPlay: false,
            usePoster: false,
            loop: false,
        }).init();

        button.addEventListener(amt.mouseTouchEvent.click, hnClickButton);
        canvas.addEventListener("CANVAS_ANIMATION_ENDED", hnAniEnd);
    }

    function hnClickButton(e) {
        // audioManager.play("click");
        // amt.sendMessage(document, "DOC_EVENT", {
        //     message: "RESET_CONTENTS",
        //     callback: play
        // });
        amt.sendMessage(document, "DOC_EVENT", {
            message: "RESET_ANIMATION",
            module: exporter,
            callback: play,
        });
        // play();
    }

    function hnAniEnd(e) {}

    function play() {
        aniModule.playAni();
        if (type === 0 || type === 1) {
            audioManager.play("praise_boy");
        } else if (type === 2 || type === 3) {
            audioManager.play("praise_girl");
        }
    }

    exporter.start = function () {
        console.log("start :: ", exporter.name);
    };

    exporter.reset = function () {
        aniModule.stopAni();
        audioManager.stop("praise_boy");
        audioManager.stop("praise_girl");
    };

    return exporter;
};

var praiseBoxes = amt.getAll(".praise-box", page);
  if (praiseBoxes.length > 0) {
      for (var i = 0; i < praiseBoxes.length; ++i) {
          var box = praiseBoxes[i];
          var type = box.dataset.type;
          module = createPraiseAnimation({
              moduleName: "PRAISE_ANIMATION",
              box: box,
              type: type
          })
          module.start();
          modules.push(module);
      }
  }