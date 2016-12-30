document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");

    var interval;
    var colorOrder = ["blue", "green", "red", "white", "yellow"];
    var wiresToCut = [];
    var time = 30;

    for (var i = 0; i < 5; i++) {
        wiresToCut.push({
            color: colorOrder[i],
            cut: Math.random() > 1 / 2
        });
    }

    interval = setInterval(tick, 10);

    var box = document.getElementById("box");
    for (var i = 0; i < box.children.length; i++) {
        box.children[i].addEventListener("click", clickWire);
    }

    function doneCuttingWires() {
        for (var i = 0; i < wiresToCut.length; i++) {
            if (wiresToCut[i].cut === true) {
                return false;
            }
        }
        return true;
    }

    function wireIsGood(color) {
        for (var i = 0; i < wiresToCut.length; i++) {
            if (color == wiresToCut[i].color) {
                if (wiresToCut[i].cut === true) {
                    wiresToCut[i].cut = false;
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    function clickWire() {
        this.src = "img/cut-" + this.id + "-wire.png";
        document.getElementById("electricity").play();
        if (wireIsGood(this.id)) {
            this.removeEventListener("click", clickWire);
        } else {
            setTimeout(youLose, 750);
        }
    }

    function tick() {
        time -= 1 / 100;
        document.getElementById("timer").textContent = time.toFixed(3);
        if (time <= 0) {
            youLose();
        }
        if (doneCuttingWires()) {
            document.getElementById('siren').muted = true;
            var cheers = document.getElementById("cheers");
            cheers.addEventListener("ended", function() {
                var success = document.getElementById("success");
                success.play();
            });
            cheers.play();
            clearInterval(interval);
            document.getElementById("timer").textContent = "Yay you saved the town!!!";
            for (var i = 0; i < box.children.length; i++) {
                box.children[i].removeEventListener("click", clickWire);
            }
        }
    }

    function youLose() {
        document.getElementById('siren').muted = true;
        document.getElementById("explode").play();
        clearInterval(interval);
        document.body.style.background = "url('img/explosion.jpg')";
        document.getElementById("timer").textContent = "Whoops, You let the town blow up!!!";
        for (var i = 0; i < box.children.length; i++) {
            box.children[i].removeEventListener("click", clickWire);
        }
    }

    resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", reset);

    function reset() {
        window.location.reload();
    }
});
