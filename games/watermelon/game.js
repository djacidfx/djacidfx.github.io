var FONT = "Arial";

function checkContentHeight(obj) {
    var stageHeight = $(window).height();
    var height = (stageHeight / 2) - (obj.height() / 2);
    return height;
}

function checkContentWidth(obj) {
    var stageWidth = $(window).width();
    var width = (stageWidth / 2) - (obj.width() / 2);
    return width;
}

function getDeviceVer() {
    var userAgent = navigator["userAgent"];
    var os_version;
    if (userAgent["match"](/(iPad|iPhone|iPod touch)/)) {
        userOS = "iOS";
        os_version = userAgent.indexOf("OS ")
    } else {
        if (userAgent["match"](/Android/)) {
            userOS = "Android";
            os_version = userAgent.indexOf("Android ")
        } else {
            userOS = "unknown"
        }
    };
    if (userOS === "iOS" && os_version > -1) {
        userOSver = userAgent["substr"](os_version + 3, 3).replace("_", ".")
    } else {
        if (userOS === "Android" && os_version > -1) {
            userOSver = userAgent["substr"](os_version + 8, 3)
        } else {
            userOSver = "unknown"
        }
    };
    return Number(userOSver)
}

function shuffle(obj) {
    var obj_len = obj.length,
		elem_a, elem_b;
    while (0 !== obj_len) {
        elem_b = Math.floor(Math.random() * obj_len);
        obj_len -= 1;
        elem_a = obj[obj_len];
        obj[obj_len] = obj[elem_b];
        obj[elem_b] = elem_a;
    };
    return obj;
}

function randomBoolean() {
    return Math.random() < 0.5;
}

function sortOnObject(obj, val, sort_desc) {
    if (sort_desc) {
        obj.sort(function(a, b) {
            var aa = a[val],
                bb = b[val];
            if (aa == bb) {
                return 0
            };
            return aa < bb ? 1 : -1
        })
    } else {
        obj.sort(function(a, b) {
            var aa = a[val],
                bb = b[val];
            if (aa == bb) {
                return 0
            };
            return aa > bb ? 1 : -1
        })
    };
    return obj;
}

function randomIntFromInterval(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function getDistance(a, b) {
    var aa = a.x - b.x;
    var bb = a.y - b.y;
    var d = Math.floor(Math.sqrt((aa * aa) + (bb * bb)));
    return d;
}

function getAnglePosition(x1, y1, x2, y2) {
    var pos = {
        x: 0,
        y: 0
    };
    pos.x = x1 + x2 * Math.cos(y2 * Math.PI / 180);
    pos.y = y1 + x2 * Math.sin(y2 * Math.PI / 180);
    return pos;
}

function getDirection(obj, pos) {
    var direction = Math.atan2(pos.y - obj.y, pos.x - obj.x);
    return direction * 180 / Math.PI;
}

function sortNumber(a, b) {
    return a - b;
}
var enableMobileSound = true;
var soundOn;

function playSound(music, state) {
    if (soundOn) {
        var initial;
        if (state) {
            initial = -1;
           createjs.Sound.stop();
            musicLoop =createjs.Sound.play(music,createjs.Sound.INTERRUPT_NONE, 0, 0, initial, 1);
            if (musicLoop == null || musicLoop.playState ==createjs.Sound.PLAY_FAILED) {
                return
            } else {
                musicLoop.removeAllEventListeners();
                musicLoop.addEventListener("complete", function(data) {});
            }
        } else {
            initial = 0;
           createjs.Sound.play(music);
        }
    }
}

function stopSound() {
   createjs.Sound.stop()
}
$.sound = {};

function playSoundLoop(music) {
    if (soundOn) {
        if ($.sound[music] == null) {
            $.sound[music] =createjs.Sound.play(music);
            $.sound[music].removeAllEventListeners();
            $.sound[music].addEventListener("complete", function() {
                $.sound[music].play()
            })
        }
    }
}

function stopSoundLoop(music) {
    if (soundOn) {
        if ($.sound[music] != null) {
            $.sound[music].stop();
            $.sound[music] = null
        }
    }
}

function setSoundVolume(music, volume) {
    if (soundOn) {
        if ($.sound[music] != null) {
            $.sound[music]["volume"] = volume;
        }
    }
}

function toggleMute(val) {
   createjs.Sound.setMute(val);
}
var stage;
var canvasW = 0;
var canvasH = 0;

function initGameCanvas(val_width, val_height) {
    var gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.width = val_width;
    gameCanvas.height = val_height;
    canvasW = val_width;
    canvasH = val_height;
    stage = new createjs.Stage("gameCanvas");
    createjs.Touch.enable(stage);
    stage.enableMouseOver(20);
    stage.mouseMoveOutside = true;
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", tick);
}
var guide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer;
var guideline, bg, logo, buttonStart, buttonExit, buttonMore, buttonPrivacy, buttonReplay, buttonHome, buttonShare, buttonFullscreen, buttonSoundOn, buttonSoundOff;

function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    shapeContainer = new createjs.Container();
    blockContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    backgroundWhite = new createjs.Bitmap(loader.getResult("backgroundWhite"));
    backgroundWhite.alpha = 0;
    bg = new createjs.Bitmap(loader.getResult("background"));
    logo = new createjs.Bitmap(loader.getResult("logo"));
    
	buttonStart = new createjs.Bitmap(loader.getResult("buttonStart"));
    centerReg(buttonStart);
    buttonStart.x = canvasW / 2;
    buttonStart.y = canvasH / 100 * 55 +20;
	
	buttonExit = new createjs.Bitmap(loader.getResult("buttonExit"));
    centerReg(buttonExit);
    buttonExit.x = buttonStart.x + 150;
    buttonExit.y = buttonStart.y + 170;
	
	buttonPrivacy = new createjs.Bitmap(loader.getResult("buttonPrivacy"));
    centerReg(buttonPrivacy);
    buttonPrivacy.x = buttonStart.x + 0;
    buttonPrivacy.y = buttonStart.y + 170;
	
	buttonMore = new createjs.Bitmap(loader.getResult("buttonMore"));
    centerReg(buttonMore);
    buttonMore.x = buttonStart.x - 150;
    buttonMore.y = buttonStart.y + 170;
	
    gradient = new createjs.Bitmap(loader.getResult("gradient"));
    itemHeadHit = new createjs.Bitmap(loader.getResult("itemHeadHit"));
    centerReg(itemHeadHit);
    itemHeadHit.x = -500;
    var _0xda06x56 = 39;
    var _0xda06x57 = 51;
    var _0xda06x58 = {
			"regX": 20,
			"regY": 33,
			"height": _0xda06x57,
			"count": 2,
			"width": _0xda06x56
		};
    var animations = {
        static: {
            frames: [0],
            speed: 1
        },
        power: {
            frames: [1],
            speed: 1
        }
    };
    itemHeadData = new createjs.SpriteSheet({
		"images": [loader.getResult("itemHead")["src"]],
		"frames": _0xda06x58,
		"animations": animations
	});
    itemHeadAnimate = new createjs.Sprite(itemHeadData, "static");
    itemHeadAnimate["framerate"] = 20;
    itemHeadAnimate.x = -100;
    itemTail1 = new createjs.Bitmap(loader.getResult("itemTail1"));
    centerReg(itemTail1);
    itemTail2 = new createjs.Bitmap(loader.getResult("itemTail2"));
    centerReg(itemTail2);
    itemTail3 = new createjs.Bitmap(loader.getResult("itemTail3"));
    centerReg(itemTail3);
    itemTail1.x = itemTail2.x = itemTail3.x = -500;
    itemBlockWhite = new createjs.Bitmap(loader.getResult("itemBlockWhite"));
    centerReg(itemBlockWhite);
    itemBlock1 = new createjs.Bitmap(loader.getResult("itemBlock1"));
    centerReg(itemBlock1);
    itemBlock2 = new createjs.Bitmap(loader.getResult("itemBlock2"));
    centerReg(itemBlock2);
    itemBlock3 = new createjs.Bitmap(loader.getResult("itemBlock3"));
    centerReg(itemBlock3);
    itemBlockWhite.x = itemBlock1.x = itemBlock2.x = itemBlock3.x = -500;
    itemDivider = new createjs.Bitmap(loader.getResult("itemDivider"));
    centerReg(itemDivider);
    iconShield = new createjs.Bitmap(loader.getResult("iconShield"));
    centerReg(iconShield);
    iconTail = new createjs.Bitmap(loader.getResult("iconTail"));
    centerReg(iconTail);
    iconExplode = new createjs.Bitmap(loader.getResult("iconExplode"));
    centerReg(iconExplode);
    iconMagnet = new createjs.Bitmap(loader.getResult("iconMagnet"));
    centerReg(iconMagnet);
    iconShield.x = iconTail.x = iconExplode.x = iconMagnet.x = -500;
    itemPowerShield = new createjs.Bitmap(loader.getResult("itemPowerShield"));
    centerReg(itemPowerShield);
    itemPowerMagnet = new createjs.Bitmap(loader.getResult("itemPowerMagnet"));
    centerReg(itemPowerMagnet);
    itemDivider.x = iconShield.x = iconTail.x = iconExplode.x = itemPowerShield.x = itemPowerMagnet.x = -500;
    itemSide = new createjs.Bitmap(loader.getResult("itemSide"));
    scoreTxt = new createjs.Text();
		scoreTxt.font = "45px "+FONT;
		scoreTxt.color = "#fff";
		scoreTxt.textAlign = "center";
		scoreTxt.textBaseline = "alphabetic";
		scoreTxt.text = "";
		scoreTxt.x = canvasW / 2;
    headScoreTxt = new createjs.Text();
		headScoreTxt.font = "35px "+FONT;
		headScoreTxt.color = "#fff";
		headScoreTxt.textAlign = "center";
		headScoreTxt.textBaseline = "alphabetic";
		headScoreTxt.text = "";
    resultTitleTxt = new createjs.Text();
		resultTitleTxt.font = "50px "+FONT;
		resultTitleTxt.color = "#fff";
		resultTitleTxt.textAlign = "center";
		resultTitleTxt.textBaseline = "alphabetic";
		resultTitleTxt.text = resultTitleText;
		resultTitleTxt.x = canvasW / 2;
		resultTitleTxt.y = canvasH / 100 * 32;
    resultScoreTxt = new createjs.Text();
		resultScoreTxt.font = "120px "+FONT;
		resultScoreTxt.color = "#51B9AD";
		resultScoreTxt.textAlign = "center";
		resultScoreTxt.textBaseline = "alphabetic";
		resultScoreTxt.text = resultScoreText;
		resultScoreTxt.x = canvasW / 2;
		resultScoreTxt.y = canvasH / 100 * 44;
    resultShareTxt = new createjs.Text();
		resultShareTxt.font = "25px "+FONT;
		resultShareTxt.color = "#DDDDDC";
		resultShareTxt.textAlign = "center";
		resultShareTxt.textBaseline = "alphabetic";
		resultShareTxt.text = gamenameText;
		resultShareTxt.x = canvasW / 2;
		resultShareTxt.y = canvasH / 100 * 65;
    buttonHome = new createjs.Bitmap(loader.getResult("buttonHome"));
    buttonShare = new createjs.Bitmap(loader.getResult("buttonShare"));
    centerReg(buttonHome);
    createHitarea(buttonHome);
    centerReg(buttonShare);
    createHitarea(buttonShare);
    buttonHome.x = canvasW / 100 * 35 -10;
    buttonShare.x = canvasW / 100 * 65 +10;
    buttonHome.y = buttonShare.y = canvasH / 100 * 72;
    buttonReplay = new createjs.Bitmap(loader.getResult("buttonReplay"));
    centerReg(buttonReplay);
    createHitarea(buttonReplay);
    buttonReplay.x = canvasW / 2;
    buttonReplay.y = canvasH / 100 * 55;
    buttonFullscreen = new createjs.Bitmap(loader.getResult("buttonFullscreen"));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs.Bitmap(loader.getResult("buttonSoundOn"));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader.getResult("buttonSoundOff"));
    centerReg(buttonSoundOff);
    buttonSoundOn.visible = false;
    if (guide) {
        guideline = new createjs.Shape();
        guideline["graphics"]["setStrokeStyle"](2)["beginStroke"]("red").drawRect((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH)
    };
    mainContainer.addChild(logo, buttonStart, buttonExit, buttonMore, buttonPrivacy);
    gameContainer.addChild(itemSide, itemHeadAnimate, itemHeadHit, itemTail1, itemTail2, itemTail3, itemBlock1, itemBlock2, itemBlock3, itemDivider, iconShield, iconTail, iconExplode, iconMagnet, blockContainer, shapeContainer, gradient, scoreTxt);
    resultContainer.addChild(resultTitleTxt, resultScoreTxt, buttonReplay);
    if (shareEnable) {
        resultContainer.addChild(resultShareTxt, buttonHome, buttonShare)
    };
    canvasContainer.addChild(bg, backgroundWhite, mainContainer, gameContainer, resultContainer, buttonFullscreen, buttonSoundOn, buttonSoundOff, guideline);
    stage.addChild(canvasContainer);
    resizeCanvas()
}

function resizeCanvas() {
    if (canvasContainer != undefined) {
        gradient.y = offset.y;
        scoreTxt.y = offset.y + 60;
        buttonSoundOn.x = buttonSoundOff.x = canvasW - offset.x -20;
        buttonSoundOn.y = buttonSoundOff.y = offset.y;
        buttonSoundOn.x = buttonSoundOff.x -= 40;
        buttonSoundOn.y = buttonSoundOff.y += 50;
        buttonFullscreen.x = buttonSoundOn.x - 50;
        buttonFullscreen.y = buttonSoundOn.y;
		buttonFullscreen.visible = false;
    }
}

function removeGameCanvas() {
    stage["autoClear"] = true;
    stage["removeAllChildren"]();
    stage["update"]();
    createjs.Ticker.removeEventListener("tick", tick);
    createjs.Ticker.removeEventListener("tick", stage)
}

function tick(_0xda06x5d) {
    updateGame();
    stage["update"](_0xda06x5d)
}

function centerReg(obj) {
    obj.regX = obj.image.naturalWidth / 2;
    obj.regY = obj.image.naturalHeight / 2
}

function createHitarea(obj) {
    obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}
var snakeHeadW = 22;
var snakeTailW = 14;
var dividerW = 5;
var blockW = 100;
var snakePositionY = 600;
var gameScoreText = "[NUMBER]";
var levelData = {
    number: 5,
    block_arr: [4, 5, 3, 2, 4, 5],
    divider_arr: [1, 2, 3, 1, 2],
    powerTimer: 15000,
    powerTimer_arr: [0, 5000, 0, 8000],
    gap_arr: [4, 3, 4, 3, 2],
    moveSpeed: gradle.speed,
    numberIncrease: 1,
    moveSpeedIncrease: 0.5,
    gridNextLevel: 10
};
var scoreData = {
    grid: 10,
    power: 30
};
var resultTitleText = gradle.text_over;
var resultScoreText = "[NUMBER]"+gradle.text_pts;
var shareEnable = true;
var gamenameText = gradle.text_title;
var shareTitle = "Highscore on Snake VS Block Game is [SCORE]PTS.";
var shareMessage = "[SCORE]PTS is mine new highscore on Snake VS Block Game! Try it now!";
var playerData = {
    score: 0
};
var gameData = {
    touch: false,
    distanceX: 0,
    stageX: 0,
    stageY: 0,
    body_arr: [],
    block_arr: [],
    divider_arr: [],
    power_arr: [],
    move: true,
    moveSpeed: 1,
    hit: false,
    powerShowTimer: 0,
    timer: 0,
    powerType: [0, 0, 0],
    powerTypeTimer: [0, 0, 0, 0],
    powerNum: 0,
    powerType_arr: [1, 2, 3],
    gridCount: 0,
    number: 0,
    tailCount: 0,
    create: false,
    startX: 0,
    startY: 0,
    curX: 0,
    curY: 0,
    blockSpaceX: 114,
    blockSpaceY: 114,
    dividerHeight: 120,
    blockNum: 0,
    lineNum: 0,
    gapNum: 0,
    gridNum: 0,
    gridY: 0,
    gridType: 1,
    desktop: true,
    paused: true
};
var collisionMethod = ndgmr["checkRectCollision"];
var shapeOffset = {
    x: 0,
    y: 0
};

function buildGameButton() {
    buttonStart.cursor = "pointer";
    buttonStart.addEventListener("click", function(ev) {
        playSound("soundCoin");
		gradle.event('btn_play');
        goPage("game")
    });
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(ev) {
        playSound("soundCoin");
        gradle.event('btn_exit_game');
    });
	buttonPrivacy.cursor = "pointer";
	buttonPrivacy.addEventListener("click", function(ev) {
        playSound("soundCoin");
        gradle.event('btn_privacy');
    });
	buttonMore.cursor = "pointer";
	buttonMore.addEventListener("click", function(ev) {
        playSound("soundCoin");
        gradle.event('btn_more');
    });
    buttonReplay.cursor = "pointer";
    buttonReplay.addEventListener("click", function(ev) {
        playSound("soundCoin");
		gradle.event('btn_replay');
        goPage("game");
    });
    buttonHome.cursor = "pointer";
    buttonHome.addEventListener("click", function(ev) {
        playSound("soundCoin");
        goPage("main");
    });
    buttonShare.cursor = "pointer";
    buttonShare.addEventListener("click", function(ev) {
        console.log('share');
    });
    buttonSoundOff.cursor = "pointer";
    buttonSoundOff.addEventListener("click", function(ev) {
        toggleGameMute(true)
    });
    buttonSoundOn.cursor = "pointer";
    buttonSoundOn.addEventListener("click", function(ev) {
        toggleGameMute(false)
    });
    buttonFullscreen.cursor = "pointer";
    buttonFullscreen.addEventListener("click", function(ev) {
        toggleFullScreen()
    })
}
var curPage = "";

function goPage(page) {
    curPage = page;
    mainContainer.visible = false;
    gameContainer.visible = false;
    resultContainer.visible = false;
    animateButton(buttonStart, false);
    animateButton(buttonReplay, false);
    stopSoundLoop("musicMain");
    TweenMax["killTweensOf"](resultScoreTxt);
    var music7 = null;
    switch (page) {
        case "main":
            music7 = mainContainer;
            animateButton(buttonStart, true);
            playSoundLoop("musicMain");
            break;
        case "game":
            music7 = gameContainer;
            startGame();
            break;
        case "result":
            music7 = resultContainer;
            resultScoreTxt.text = resultScoreText.replace("[NUMBER]", playerData.score);
            stopGame();
            animateButton(buttonReplay, true);
            playSound("soundFail");
            TweenMax.to(resultScoreTxt, 3.5, {
                overwrite: true,
                onComplete: function() {
                    playSoundLoop("musicMain")
                }
            });
            saveGame(playerData.score);
            break
    };
    if (music7 != null) {
        music7.visible = true;
        music7["alpha"] = 0;
        TweenMax.to(music7, 0.5, {
            alpha: 1,
            overwrite: true
        })
    }
}

function animateButton(obj, state, music9) {
    var speed = 1;
    if (state) {
        var st_alpha = 1;
        if (music9) {
            music9 = false;
            st_alpha = 0.7
        } else {
            music9 = true
        };
        TweenMax.to(obj, speed, {
            alpha: st_alpha,
            overwrite: true,
            onComplete: animateButton,
            onCompleteParams: [obj, state, music9]
        })
    } else {
        TweenMax.to(obj, speed, {
            alpha: 1,
            overwrite: true
        })
    }
}

function startGame() {
    gameData["paused"] = false;
    playerData.score = 0;
    backgroundWhite["alpha"] = 0;
    if (gameData["desktop"]) {
        gameData["touch"] = true;
    } else {
        gameData["touch"] = false;
    };
    gameData.body_arr = [];
    gameData.block_arr = [];
    gameData["divider_arr"] = [];
    gameData["power_arr"] = [];
    gameData["move"] = false;
    gameData["hit"] = false;
    gameData["powerShowTimer"] = 0;
    gameData["powerType"] = [0, 0, 0, 0];
    gameData["powerTypeTimer"] = [0, 0, 0, 0];
    gameData.tailCount = 1;
    gameData["create"] = false;
    gameData["gridType"] = 1;
    gameData["timer"] = new Date();
    gameData["moveSpeed"] = levelData["moveSpeed"];
    gameData["gridCount"] = 0;
    gameData["number"] = levelData["number"];
    blockContainer.y = shapeContainer.y = 0;
    shapeOffset.y = shapeContainer.y;
    resetPowerShowTimer();
    createSnakeHead();
    createSnakeTails(4);
    setupLevel();
    createLevelGrid();
}

function stopGame() {
    TweenMax["killAll"]();
    gameData["paused"] = true;
    backgroundWhite["alpha"] = 0;
    gameData["touch"] = false;
    gameData.body_arr = [];
    gameData.block_arr = [];
    gameData["divider_arr"] = [];
    gameData["power_arr"] = [];
    gameData["move"] = false;
    gameData["hit"] = false;
    gameData["powerShowTimer"] = 0;
    gameData["create"] = false;
    shapeContainer["removeAllChildren"]();
    blockContainer["removeAllChildren"]();
}

function saveGame(musicf) {}

function setupTouchEvents() {
    if ($["browser"].mobile || isTablet) {
        gameData["desktop"] = false
    };
    stage.on("stagemousedown", function(music3) {
        if (!gameData["desktop"]) {
            gameData["touch"] = true
        };
        gameData.stageX = music3.stageX;
        gameData.stageY = music3.stageY;
        gameData.stageX = gameData.stageX < canvasW / 100 * 15 ? canvasW / 100 * 15 : gameData.stageX;
        gameData.stageX = gameData.stageX > canvasW / 100 * 85 ? canvasW / 100 * 85 : gameData.stageX
    });
    stage.on("stagemousemove", function(music3) {
        if (gameData["touch"]) {
            gameData.stageX = music3.stageX;
            gameData.stageY = music3.stageY;
            gameData.stageX = gameData.stageX < canvasW / 100 * 15 ? canvasW / 100 * 15 : gameData.stageX;
            gameData.stageX = gameData.stageX > canvasW / 100 * 85 ? canvasW / 100 * 85 : gameData.stageX
        }
    });
    stage.on("stagemouseup", function(music3) {
        if (!gameData["desktop"]) {
            gameData["touch"] = false
        }
    })
}

function createSnakeHead() {
    var head = itemHeadHit.clone();
    head.x = gameData.stageX = gameData.distanceX = canvasW / 2;
    head.y = snakePositionY;
    head.visible = false;
    itemHeadAnimate.gotoAndStop("static");
    itemPowerShield.visible = false;
    itemPowerMagnet.visible = false;
    shapeContainer.addChild(head, itemHeadAnimate, itemPowerShield, itemPowerMagnet, headScoreTxt);
    gameData.body_arr.push(head);
}

function createSnakeTails(_0xda06x84) {
    var last_trail = gameData.body_arr[gameData.body_arr.length - 1];
    for (var i = 0; i < _0xda06x84; i++) {
        var new_trail;
        new_trail = this["itemTail" + gameData.tailCount].clone();
        new_trail.x = last_trail.x;
        new_trail.y = last_trail.y;
        shapeContainer.addChild(new_trail);
        gameData.body_arr.push(new_trail);
        gameData.tailCount++;
        gameData.tailCount = gameData.tailCount > 3 ? 1 : gameData.tailCount;
    };
    shapeContainer.setChildIndex(itemHeadAnimate, shapeContainer.numChildren - 1);
    shapeContainer.setChildIndex(itemPowerMagnet, shapeContainer.numChildren - 1);
    shapeContainer.setChildIndex(itemPowerShield, shapeContainer.numChildren - 1);
    shapeContainer.setChildIndex(headScoreTxt, shapeContainer.numChildren - 1)
}

function removeTails() {
    if (gameData.body_arr.length == 1) {
        goPage("result")
    } else {
        var last_trail = gameData.body_arr[gameData.body_arr.length - 1];
        shapeContainer.removeChild(last_trail);
        gameData.body_arr.splice(gameData.body_arr.length - 1, 1);
        gameData.tailCount--;
        gameData.tailCount = gameData.tailCount < 1 ? 3 : gameData.tailCount
    }
}

function createBlock(x, y, val) {
    var itemBlock;
    itemBlock = this["itemBlock3"].clone();
    if (val <= Math.floor(Number(gameData["number"]) / 2)) {
        itemBlock = this["itemBlock1"].clone()
    } else {
        if (val <= Number(gameData["number"])) {
            itemBlock = this["itemBlock2"].clone()
        }
    };
    itemBlock.x = x;
    itemBlock.y = y;
    itemBlock["hitNumber"] = val;
    var text = new createjs.Text();
		text.font = "50px "+FONT;
		text.color = "#fff";
		text.textAlign = "center";
		text.textBaseline = "alphabetic";
		text.text = val;
		text.x = x;
		text.y = y + 20;
    blockContainer.addChild(itemBlock, text);
	
    gameData.block_arr.push({
        obj: itemBlock,
        text: text,
        x: itemBlock.x,
        distance: 0
    });
}

function createDivider(x, y) {
    var separator = itemDivider.clone();
    separator.x = x;
    separator.y = y;
    blockContainer.addChild(separator);
    gameData["divider_arr"].push({
        obj: separator,
        x: separator.x
    })
}

function createPower(x, y, type, val) {
    if (randomBoolean()) {
        x -= 33
    } else {
        x += 33
    };
    var text = new createjs.Text();
    text.font = "25px "+FONT;
    text.color = "#fff";
    text.textAlign = "center";
    text.textBaseline = "alphabetic";
    text.text = val;
    text.x = x;
    text.y = y - 25;
    var icon;
    if (type == 0) {
        icon = iconTail.clone()
    } else {
        if (type == 1) {
            icon = iconShield.clone();
            text.visible = false
        } else {
            if (type == 2) {
                icon = iconExplode.clone();
                text.visible = false
            } else {
                if (type == 3) {
                    icon = iconMagnet.clone();
                    text.visible = false
                }
            }
        }
    };
    icon.x = x;
    icon.y = y;
    icon["hitNumber"] = val;
    animateButton(icon, true);
    blockContainer.addChild(icon, text);
    gameData["power_arr"].push({
        obj: icon,
        text: text,
        type: type
    })
}

function updateGame() {
    if (!gameData["paused"]) {
        gameData["timer"] = new Date();
        loopSnakeTails();
        scoreTxt.text = gameScoreText.replace("[NUMBER]", playerData.score);
        headScoreTxt.text = gameData.body_arr.length;
        if (gameData["move"]) {
            shapeContainer.y += gameData["moveSpeed"];
            blockContainer.y = shapeContainer.y;
            shapeOffset.y = shapeContainer.y;
        };
        checkPowerTimer();
        loopLevelScreen()
    }
}

function loopSnakeTails() {
    var _0xda06x96 = 0;
    var _0xda06x2a = 0;
    var _0xda06x97 = 0;
    var _0xda06x98 = Math.abs(gameData.distanceX - gameData.stageX);
    var _0xda06x99 = gameData.distanceX > gameData.stageX ? false : true;
    var _0xda06x9a = 50;
    if (_0xda06x98 < 50) {
        gameData.distanceX = gameData.stageX
    } else {
        if (_0xda06x99) {
            gameData.distanceX += _0xda06x9a
        } else {
            gameData.distanceX -= _0xda06x9a
        }
    };
    for (var i = 0; i < gameData.body_arr.length; i++) {
        var _0xda06x9b = gameData.body_arr[i];
        if (i == 0) {
            var _0xda06x9c = _0xda06x9b.x - gameData.distanceX;
            _0xda06x2a = _0xda06x9c / (canvasW / 2) * 60;
            itemHeadAnimate["rotation"] = -_0xda06x2a;
            detectObjectRange(_0xda06x9b, gameData.distanceX, snakeHeadW, true);
            detectBlockCollision(_0xda06x9b);
            detectPowerCollision(_0xda06x9b);
            itemHeadAnimate.x = itemPowerShield.x = itemPowerMagnet.x = headScoreTxt.x = _0xda06x9b.x;
            if (gameData["move"]) {
                _0xda06x9b.y = (snakePositionY) - shapeOffset.y;
                itemHeadAnimate.y = itemPowerShield.y = itemPowerMagnet.y = _0xda06x9b.y;
                headScoreTxt.y = _0xda06x9b.y - 45
            }
        } else {
            _0xda06x2a = getDirection(_0xda06x9b, _0xda06x96);
            if (i == 1) {
                _0xda06x97 = getAnglePosition(_0xda06x96.x, _0xda06x96.y, ((snakeHeadW - 5) * 2), _0xda06x2a + 180)
            } else {
                _0xda06x97 = getAnglePosition(_0xda06x96.x, _0xda06x96.y, (snakeTailW * 2), _0xda06x2a + 180)
            };
            detectObjectRange(_0xda06x9b, _0xda06x97.x, snakeTailW);
            _0xda06x9b.y = _0xda06x97.y;
            _0xda06x9b["rotation"] = _0xda06x2a + 90
        };
        _0xda06x96 = _0xda06x9b
    }
}

function detectBlockCollision(obj) {
    var collision = false;
    for (var i = 0; i < gameData.block_arr.length; i++) {
        var obj_i = gameData.block_arr[i]["obj"];
        gameData.block_arr[i]["distance"] = getDistance(obj, obj_i);
    };
    sortOnObject(gameData.block_arr, "distance", false);
    for (var i = 0; i < gameData.block_arr.length; i++) {
        var obj_i = gameData.block_arr[i]["obj"];
        var _0xda06xa0 = collisionMethod(obj, obj_i);
        var obj_i_y = getObjY(obj_i.y);
        var obj_y   = getObjY(obj.y);
        var spaces = (gameData["blockSpaceY"] / 3) + (snakeHeadW / 2);
        if (_0xda06xa0 && obj_i.visible && obj_y <= (obj_i_y - spaces)) {
            collision = true;
            gameData["move"] = false;
            startHitBlockAnimation(i)
        }
    };
    if (!collision) {
        gameData["move"] = true
    }
}

function detectPowerCollision(obj) {
    for (var i = 0; i < gameData["power_arr"].length; i++) {
        var _0xda06xa5 = gameData["power_arr"][i]["obj"];
        var _0xda06xa6 = gameData["power_arr"][i].text;
        var _0xda06xa0 = collisionMethod(obj, _0xda06xa5);
        if (_0xda06xa5.visible) {
            if (_0xda06xa0) {
                _0xda06xa5.visible = _0xda06xa6.visible = false;
                startHitPowerAnimation(i)
            } else {
                if (gameData["powerType"][3] == 1) {
                    var _0xda06xa7 = getDistance(obj, _0xda06xa5);
                    if (_0xda06xa7 < 200) {
                        var musica = 0.2;
                        if (gameData["moveSpeed"] < 5) {
                            musica = 0.4
                        };
                        TweenMax.to(_0xda06xa5, musica, {
                            x: obj.x,
                            y: obj.y,
                            overwrite: true,
                            onComplete: function() {}
                        })
                    } else {
                        TweenMax["killTweensOf"](_0xda06xa5);
                        animateButton(_0xda06xa5, true)
                    }
                }
            }
        }
    }
}

function startHitPowerAnimation(_0xda06xa9) {
    var _0xda06xa5 = gameData["power_arr"][_0xda06xa9]["obj"];
    var _0xda06xaa = gameData["power_arr"][_0xda06xa9]["type"];
    _0xda06xa5.visible = false;
    playerData.score += scoreData["power"];
    gameData["powerType"][_0xda06xaa] = 1;
    playSound("soundCoin");
    gameData["powerTypeTimer"][_0xda06xaa] = new Date();
    if (_0xda06xaa == 0) {
        createSnakeTails(_0xda06xa5["hitNumber"])
    } else {
        if (_0xda06xaa == 1) {
            itemHeadAnimate.gotoAndStop("power");
            itemPowerShield.visible = true;
            playSound("soundPower")
        } else {
            if (_0xda06xaa == 2) {
                playSound("soundClear");
                backgroundWhite["alpha"] = 1;
                TweenMax.to(backgroundWhite, 0.2, {
                    alpha: 0,
                    overwrite: true,
                    onComplete: function() {}
                })
            } else {
                if (_0xda06xaa == 3) {
                    playSound("soundPower");
                    itemPowerMagnet.visible = true
                }
            }
        }
    }
}

function checkPowerTimer() {
    if (gameData["powerType"][1] == 1) {
        var _0xda06xac = (gameData["timer"]["getTime"]() - gameData["powerTypeTimer"][1]["getTime"]());
        if (_0xda06xac >= levelData["powerTimer_arr"][1]) {
            itemHeadAnimate.gotoAndStop("static");
            itemPowerShield.visible = false;
            gameData["powerType"][1] = 0
        } else {
            itemPowerShield["rotation"]++
        }
    } else {
        if (gameData["powerType"][3] == 1) {
            var _0xda06xac = (gameData["timer"]["getTime"]() - gameData["powerTypeTimer"][3]["getTime"]());
            if (_0xda06xac >= levelData["powerTimer_arr"][3]) {
                itemPowerMagnet.visible = false;
                gameData["powerType"][3] = 0
            } else {
                itemPowerMagnet["rotation"]++
            }
        }
    }
}

function resetPowerShowTimer() {
    gameData["powerShowTimer"] = new Date()
}

function startHitBlockAnimation(_0xda06xa9) {
    if (!gameData["hit"]) {
        gameData["hit"] = true;
        var _0xda06x9f = gameData.block_arr[_0xda06xa9]["obj"];
        var _0xda06xa6 = gameData.block_arr[_0xda06xa9].text;
        var _0xda06xaf = Number(_0xda06x9f["hitNumber"]);
        blockContainer.addChild(itemBlockWhite);
        itemBlockWhite.x = _0xda06x9f.x;
        itemBlockWhite.y = _0xda06x9f.y;
        itemBlockWhite["alpha"] = 1;
        playSound("soundHit");
        if (gameData["powerType"][1] == 1) {
            _0xda06x9f.visible = _0xda06xa6.visible = false;
            gameData["hit"] = false;
            gameData["move"] = true;
            TweenMax.to(itemBlockWhite, 0.2, {
                alpha: 0,
                overwrite: true
            })
        } else {
            _0xda06xaf--;
            if (_0xda06xaf >= 0) {
                removeTails();
                _0xda06xa6.text = _0xda06xaf;
                _0xda06x9f["hitNumber"] = _0xda06xaf;
                if (_0xda06xaf <= 0) {
                    _0xda06x9f.visible = _0xda06xa6.visible = false;
                    gameData["hit"] = false;
                    gameData["move"] = true;
                    TweenMax.to(itemBlockWhite, 0.2, {
                        alpha: 0,
                        overwrite: true
                    })
                } else {
                    TweenMax.to(itemBlockWhite, 0.2, {
                        alpha: 0,
                        overwrite: true,
                        onComplete: function() {
                            gameData["hit"] = false
                        }
                    })
                }
            }
        }
    }
}

function detectObjectRange(obj, _0xda06xb1, _0xda06xb2, _0xda06x3d) {
    var _0xda06x9e = false;
    for (var i = 0; i < gameData.block_arr.length; i++) {
        var _0xda06x9f = gameData.block_arr[i]["obj"];
        var _0xda06xa1 = getObjY(_0xda06x9f.y);
        var _0xda06xa2 = getObjY(obj.y);
        var _0xda06xa3 = (gameData["blockSpaceY"] / 2) + (_0xda06xb2 / 2);
        if (_0xda06xa2 >= (_0xda06xa1 - _0xda06xa3) && _0xda06xa2 <= (_0xda06xa1 + _0xda06xa3)) {
            if (obj.x <= _0xda06x9f.x - (_0xda06xb2 + (blockW / 2)) && _0xda06xb1 >= _0xda06x9f.x - (_0xda06xb2 + (blockW / 2))) {
                i = gameData.block_arr.length;
                _0xda06x9e = true;
                obj.x = _0xda06x9f.x - (_0xda06xb2 + (blockW / 2));
                if (_0xda06x3d) {
                    gameData.distanceX = obj.x
                }
            };
            if (obj.x >= _0xda06x9f.x + (_0xda06xb2 + (blockW / 2)) && _0xda06xb1 <= _0xda06x9f.x + (_0xda06xb2 + (blockW / 2))) {
                i = gameData.block_arr.length;
                _0xda06x9e = true;
                obj.x = _0xda06x9f.x + (_0xda06xb2 + (blockW / 2));
                if (_0xda06x3d) {
                    gameData.distanceX = obj.x
                }
            }
        }
    };
    for (var i = 0; i < gameData["divider_arr"].length; i++) {
        var _0xda06xb3 = gameData["divider_arr"][i]["obj"];
        var _0xda06xb4 = getObjY(_0xda06xb3.y);
        var _0xda06xa2 = getObjY(obj.y);
        var _0xda06xa3 = (gameData["dividerHeight"] / 2) + (_0xda06xb2 / 2);
        if (_0xda06xa2 >= (_0xda06xb4 - _0xda06xa3) && _0xda06xa2 <= (_0xda06xb4 + _0xda06xa3)) {
            if (obj.x <= _0xda06xb3.x - (_0xda06xb2 + dividerW) && _0xda06xb1 >= _0xda06xb3.x - (_0xda06xb2 + dividerW)) {
                i = gameData["divider_arr"].length;
                _0xda06x9e = true;
                obj.x = _0xda06xb3.x - (_0xda06xb2 + dividerW);
                if (_0xda06x3d) {
                    gameData.distanceX = obj.x
                }
            };
            if (obj.x >= _0xda06xb3.x + (_0xda06xb2 + dividerW) && _0xda06xb1 <= _0xda06xb3.x + (_0xda06xb2 + dividerW)) {
                i = gameData["divider_arr"].length;
                _0xda06x9e = true;
                obj.x = _0xda06xb3.x + (_0xda06xb2 + dividerW);
                if (_0xda06x3d) {
                    gameData.distanceX = obj.x
                }
            };
            var _0xda06x9c = obj.x - _0xda06xb3.x;
            if (Math.abs(_0xda06x9c) < (_0xda06xb2 + dividerW)) {
                i = gameData["divider_arr"].length;
                _0xda06x9e = true;
                if (_0xda06x9c >= 0) {
                    obj.x = _0xda06xb3.x + (_0xda06xb2 + dividerW)
                } else {
                    obj.x = _0xda06xb3.x - (_0xda06xb2 + dividerW)
                };
                if (_0xda06x3d) {
                    gameData.distanceX = obj.x
                }
            }
        }
    };
    if (!_0xda06x9e) {
        obj.x = _0xda06xb1
    }
}

function setupLevel() {
    gameData["create"] = false;
    gameData["startX"] = canvasW / 100 * 20.5;
    gameData["startY"] = canvasH / 100 * 10;
    levelData["curX"] = gameData["startX"];
    gameData["curY"] = gameData["startY"];
    gameData["blockNum"] = 0;
    shuffle(levelData.block_arr);
    gameData["gapNum"] = 0;
    shuffle(levelData["gap_arr"]);
    gameData["lineNum"] = 0;
    shuffle(levelData["divider_arr"]);
    gameData["powerNum"] = 0;
    shuffle(gameData["powerType_arr"]);
    gameData["gridNum"] = 0
}

function loopLevelScreen() {
    if (getObjY(gameData["gridY"]) <= 1000) {
        if (gameData["create"]) {
            createLevelGrid()
        }
    };
    var _0xda06xb7 = -100;
    if (gameData["powerType"][2] == 1) {
        _0xda06xb7 = 850;
        gameData["powerType"][2] = 0
    };
    var _0xda06xb8 = 0;
    var _0xda06xb9 = 10;
    for (var _0xda06xba = 0; _0xda06xba < _0xda06xb9; _0xda06xba++) {
        _0xda06xb8 = 0;
        for (var i = 0; i < gameData.block_arr.length; i++) {
            var _0xda06x9f = gameData.block_arr[i]["obj"];
            var _0xda06xa6 = gameData.block_arr[i].text;
            if (getObjY(_0xda06x9f.y) <= _0xda06xb7) {
                blockContainer.removeChild(_0xda06x9f);
                blockContainer.removeChild(_0xda06xa6);
                gameData.block_arr.splice(i, 1);
                _0xda06xb8++
            }
        };
        for (var i = 0; i < gameData["divider_arr"].length; i++) {
            var _0xda06xb3 = gameData["divider_arr"][i]["obj"];
            if (getObjY(_0xda06xb3.y) <= _0xda06xb7) {
                blockContainer.removeChild(_0xda06xb3);
                gameData["divider_arr"].splice(i, 1);
                _0xda06xb8++
            }
        };
        for (var i = 0; i < gameData["power_arr"].length; i++) {
            var _0xda06xa5 = gameData["power_arr"][i]["obj"];
            var _0xda06xa6 = gameData["power_arr"][i].text;
            if (getObjY(_0xda06xa5.y) <= _0xda06xb7) {
                TweenMax["killTweensOf"](_0xda06xa5);
                blockContainer.removeChild(_0xda06xa5);
                blockContainer.removeChild(_0xda06xa6);
                gameData["power_arr"].splice(i, 1);
                _0xda06xb8++
            }
        };
        if (_0xda06xb8 == 0) {
            _0xda06xba = _0xda06xb9
        }
    }
}

function createLevelGrid() {
    if (gameData["gridType"] == 0) {
        createLevelBlocks();
        gameData["gridType"] = 1
    } else {
        createLevelSpacing();
        gameData["gridType"] = 0
    };
    gameData["gridNum"]++;
    gameData["gridCount"]++;
    gameData["create"] = true;
    if (gameData["gridNum"] > 0) {
        playerData.score += scoreData["grid"]
    };
    if (gameData["gridCount"] >= levelData["gridNextLevel"]) {
        gameData["gridCount"] = 0;
        gameData["moveSpeed"] += levelData["moveSpeedIncrease"];
        gameData["number"] += levelData["numberIncrease"]
    }
}

function createLevelBlocks() {
    var _0xda06xbd = [];
    var _0xda06xbe = [];
    var _0xda06xbf = gameData["number"];
    for (var i = 0; i < 5; i++) {
        if (i == 0 && randomBoolean()) {
            _0xda06xbe.push(Math.floor(Math.random() * (_0xda06xbf * 2)) + 1)
        } else {
            _0xda06xbe.push(Math.floor(Math.random() * _0xda06xbf) + 1)
        };
        if (gameData["gridNum"] == 1) {
            if (i < Math.floor(Math.random() * 3) + 1) {
                _0xda06xbd.push(1)
            }
        } else {
            if (i < levelData.block_arr[gameData["blockNum"]]) {
                _0xda06xbd.push(1)
            } else {
                _0xda06xbd.push(0)
            }
        }
    };
    shuffle(_0xda06xbe);
    shuffle(_0xda06xbd);
    var _0xda06xc0 = 1;
    for (var i = 0; i < 5; i++) {
        if (_0xda06xbd[i] == 1) {
            createBlock(levelData["curX"], gameData["curY"], Number(_0xda06xbe[i]))
        };
        levelData["curX"] += gameData["blockSpaceX"];
        _0xda06xc0++;
        if (_0xda06xc0 > 5) {
            _0xda06xc0 = 1;
            levelData["curX"] = gameData["startX"];
            gameData["curY"] -= gameData["blockSpaceX"];
            gameData["gridY"] = gameData["curY"]
        }
    };
    gameData["blockNum"]++;
    if (gameData["blockNum"] > levelData.block_arr.length - 1) {
        gameData["blockNum"] = 0;
        shuffle(levelData.block_arr)
    }
}

function createLevelSpacing() {
    var _0xda06xc2 = [];
    var _0xda06xc3 = Math.floor(Math.random() * levelData["gap_arr"][gameData["gapNum"]]);
    for (var i = 0; i < 5; i++) {
        if (i < levelData["divider_arr"][gameData["lineNum"]]) {
            _0xda06xc2.push(1)
        } else {
            _0xda06xc2.push(0)
        }
    };
    shuffle(_0xda06xc2);
    var _0xda06xc4 = 0;
    var _0xda06xc0 = 1;
    var _0xda06x84 = 1 * levelData["gap_arr"][gameData["gapNum"]];
    _0xda06x84 = _0xda06x84 * 5;
    var _0xda06xc5 = Math.floor(Math.random() * 3);
    var _0xda06xc6 = 0;
    var _0xda06xac = (gameData["timer"]["getTime"]() - gameData["powerShowTimer"]["getTime"]());
    if (_0xda06xac >= levelData["powerTimer"]) {
        _0xda06xc6 = 1;
        resetPowerShowTimer()
    };
    if (gameData["gridNum"] == 0) {
        _0xda06xc5 = 2
    };
    var _0xda06xc7 = _0xda06xc5 + _0xda06xc6;
    var _0xda06xc8 = [];
    var _0xda06xc9 = 0;
    for (var i = 0; i < _0xda06xc7; i++) {
        if (i < _0xda06xc5) {
            _0xda06xc8.push(0)
        } else {
            _0xda06xc8.push(gameData["powerType_arr"][gameData["powerNum"]]);
            gameData["powerNum"]++
        }
    };
    var _0xda06xca = [];
    for (var i = 0; i < _0xda06x84; i++) {
        _0xda06xca.push(i)
    };
    shuffle(_0xda06xca);
    _0xda06xca.splice(_0xda06xc7, _0xda06xca.length - _0xda06xc7);
    _0xda06xca.sort(sortNumber);
    for (var i = 0; i < _0xda06x84; i++) {
        if (_0xda06xc2[_0xda06xc0 - 1] == 1 && _0xda06xc4 >= 1) {
            createDivider(levelData["curX"], gameData["curY"])
        } else {
            if (randomBoolean() && _0xda06xc3 > 0 && _0xda06xc4 >= 1) {
                _0xda06xc3--;
                createDivider(levelData["curX"], gameData["curY"])
            }
        };
        if (i == Number(_0xda06xca[_0xda06xc9])) {
            var _0xda06xcb = Math.floor(Math.random() * (levelData["number"] / 2)) + 1;
            createPower(levelData["curX"], gameData["curY"], _0xda06xc8[_0xda06xc9], _0xda06xcb);
            _0xda06xc9++
        };
        levelData["curX"] += gameData["blockSpaceX"];
        _0xda06xc0++;
        if (_0xda06xc0 > 5) {
            _0xda06xc0 = 1;
            levelData["curX"] = gameData["startX"];
            gameData["curY"] -= gameData["blockSpaceX"];
            gameData["gridY"] = gameData["curY"];
            _0xda06xc4++
        }
    };
    gameData["lineNum"]++;
    if (gameData["lineNum"] > levelData["divider_arr"].length - 1) {
        gameData["lineNum"] = 0;
        shuffle(levelData["divider_arr"])
    };
    if (gameData["powerNum"] > gameData["powerType_arr"].length - 1) {
        console.log("shuffle");
        gameData["powerNum"] = 0;
        shuffle(gameData["powerType_arr"])
    };
    gameData["gapNum"]++;
    if (gameData["gapNum"] > levelData["gap_arr"].length - 1) {
        gameData["gapNum"] = 0;
        shuffle(levelData["gap_arr"])
    }
}

function getObjY(_0xda06xcd) {
    return canvasH - (shapeOffset.y + _0xda06xcd)
}

function toggleGameMute(_0xda06x3d) {
    buttonSoundOff.visible = false;
    buttonSoundOn.visible = false;
    toggleMute(_0xda06x3d);
    if (_0xda06x3d) {
        buttonSoundOn.visible = true
    } else {
        buttonSoundOff.visible = true
    }
}

function toggleFullScreen() {
    if (!document["fullscreenElement"] && !document["mozFullScreenElement"] && !document["webkitFullscreenElement"] && !document["msFullscreenElement"]) {
        if (document.documentElement["requestFullscreen"]) {
            document.documentElement["requestFullscreen"]()
        } else {
            if (document.documentElement["msRequestFullscreen"]) {
                document.documentElement["msRequestFullscreen"]()
            } else {
                if (document.documentElement["mozRequestFullScreen"]) {
                    document.documentElement["mozRequestFullScreen"]()
                } else {
                    if (document.documentElement["webkitRequestFullscreen"]) {
                        document.documentElement["webkitRequestFullscreen"](Element.ALLOW_KEYBOARD_INPUT)
                    }
                }
            }
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else {
            if (document["msExitFullscreen"]) {
                document["msExitFullscreen"]()
            } else {
                if (document["mozCancelFullScreen"]) {
                    document["mozCancelFullScreen"]()
                } else {
                    if (document["webkitExitFullscreen"]) {
                        document["webkitExitFullscreen"]()
                    }
                }
            }
        }
    }
}

function share(_0xda06xd1) {
    var _0xda06xd2 = location["href"];
    _0xda06xd2 = _0xda06xd2["substring"](0, _0xda06xd2["lastIndexOf"]("/") + 1);
    var _0xda06xd3 = "";
    var _0xda06xd4 = "";
    _0xda06xd3 = shareTitle.replace("[SCORE]", playerData.score);
    _0xda06xd4 = shareMessage.replace("[SCORE]", playerData.score);
    var _0xda06xd5 = "";
    if (_0xda06xd1 == "twitter") {
        _0xda06xd5 = "https://twitter.com/intent/tweet?url=" + _0xda06xd2 + "&text=" + _0xda06xd4
    } else {
        if (_0xda06xd1 == "facebook") {
            _0xda06xd5 = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(_0xda06xd2 + "share.php?desc=" + _0xda06xd4 + "&title=" + _0xda06xd3 + "&url=" + _0xda06xd2 + "&thumb=" + _0xda06xd2 + "share.jpg&width=590&height=300")
        } else {
            if (_0xda06xd1 == "google") {
                _0xda06xd5 = "https://plus.google.com/share?url=" + _0xda06xd2
            }
        }
    };
    window["open"](_0xda06xd5)
}
var stageW = 768;
var stageH = 1024;
var contentW = 576;
var contentH = 900;

function initMain() {
    if (!$["browser"].mobile || !isTablet) {
        $("#canvasHolder")["show"]()
    };
    initGameCanvas(stageW, stageH);
    buildGameCanvas();
    buildGameButton();
    setupTouchEvents();
    goPage("main");
    resizeCanvas();
}

var windowW = windowH = 0;
var scalePercent = 0;
var offset = {
    x: 0,
    y: 0,
    left: 0,
    top: 0
};

function resizeGameFunc() {
    setTimeout(function() {
        $(".mobileRotate")["css"]("left", checkContentWidth($(".mobileRotate")));
        $(".mobileRotate")["css"]("top", checkContentHeight($(".mobileRotate")));
        var _0xda06xdf = !!navigator["userAgent"]["match"](/Version\/[\d\.]+.*Safari/);
        var _0xda06xe0 = 0;
        windowW = $(window).width();
        windowH = $(window).height();
        if (_0xda06xdf) {
            windowW = window["innerWidth"];
            windowH = window["innerHeight"];
            _0xda06xe0 = $(window).height() - window["innerHeight"]
        };
        scalePercent = windowW / contentW;
        if ((contentH * scalePercent) > windowH) {
            scalePercent = windowH / contentH
        };
        scalePercent = scalePercent > 1 ? 1 : scalePercent;
        if (windowW > stageW && windowH > stageH) {
            if (windowW > stageW) {
                scalePercent = windowW / stageW;
                if ((stageH * scalePercent) > windowH) {
                    scalePercent = windowH / stageH
                }
            }
        };
        var _0xda06xe1 = (stageW * scalePercent);
        var _0xda06xe2 = (stageH * scalePercent);
        offset["left"] = 0;
        offset["top"] = 0;
        if (_0xda06xe1 > windowW) {
            offset["left"] = -((_0xda06xe1) - windowW)
        } else {
            offset["left"] = windowW - (_0xda06xe1)
        };
        if (_0xda06xe2 > windowH) {
            offset["top"] = -((_0xda06xe2) - windowH)
        } else {
            offset["top"] = windowH - (_0xda06xe2)
        };
        offset.x = 0;
        offset.y = 0;
        if (offset["left"] < 0) {
            offset.x = Math.abs((offset["left"] / scalePercent) / 2)
        };
        if (offset["top"] < 0) {
            offset.y = Math.abs((offset["top"] / scalePercent) / 2)
        };
        $("canvas")["css"]("width", _0xda06xe1);
        $("canvas")["css"]("height", _0xda06xe2);
        $("canvas")["css"]("left", (offset["left"] / 2));
        $("canvas")["css"]("top", (offset["top"] / 2));
        if (_0xda06xdf) {
            $(window)["scrollTop"](1000);
        };
        resizeCanvas()
    }, 100);
}
var rotateInstruction = true;
var forPortrait = true;

function checkMobileEvent() {
    if ($["browser"].mobile || isTablet) {
        if (!rotateInstruction) {
            $("#canvasHolder")["show"]();
            $("#rotateHolder")["hide"]();
            return
        };
        $(window)["off"]("orientationchange").on("orientationchange", function(_0xda06x5d) {
            $("#canvasHolder")["hide"]();
            $("#rotateHolder")["hide"]();
            setTimeout(function() {
                checkMobileOrientation()
            }, 1000)
        });
        checkMobileOrientation()
    }
}

function checkMobileOrientation() {
    var _0xda06xe7 = window["orientation"];
    var _0xda06xe8 = false;
    if (window["innerWidth"] > window["innerHeight"]) {
        _0xda06xe8 = true
    };
    var _0xda06xe9 = false;
    if (!_0xda06xe8) {
        if (forPortrait) {
            _0xda06xe9 = true
        }
    } else {
        if (!forPortrait) {
            _0xda06xe9 = true
        }
    };
    if (!_0xda06xe9) {
        toggleRotate(true)
    } else {
        toggleRotate(false);
        $("#canvasHolder")["show"]()
    }
}

function toggleRotate(_0xda06x3d) {
    if (_0xda06x3d) {
        $("#rotateHolder").fadeIn()
    } else {
        $("#rotateHolder").fadeOut()
    }
}

function initPreload() {
    toggleLoader(true);
    checkMobileEvent();
    $(window)["resize"](function() {
        resizeGameFunc()
    });
    resizeGameFunc();
    loader = new createjs.LoadQueue(false);
    manifest = [{
        src: "images/bg_game.jpg",
        id: "background"
    }, {
        src: "images/background_white.png",
        id: "backgroundWhite"
    }, {
        src: "images/logo.png",
        id: "logo"
    }, {
        src: "images/btn_play.png",
        id: "buttonStart"
    },{
        src: "images/btn_more.png",
        id: "buttonMore"
    }, {
        src: "images/btn_exit_game.png",
        id: "buttonExit"
    }, {
        src: "images/btn_privacy.png",
        id: "buttonPrivacy"
    }, {
        src: "images/side_line.png",
        id: "itemSide"
    }, {
        src: "images/item_head.png",
        id: "itemHead"
    }, {
        src: "images/item_head_hit.png",
        id: "itemHeadHit"
    }, {
        src: "images/item_tail1.png",
        id: "itemTail1"
    }, {
        src: "images/item_tail2.png",
        id: "itemTail2"
    }, {
        src: "images/item_tail3.png",
        id: "itemTail3"
    }, {
        src: "images/item_block1.png",
        id: "itemBlock1"
    }, {
        src: "images/item_block2.png",
        id: "itemBlock2"
    }, {
        src: "images/item_block3.png",
        id: "itemBlock3"
    }, {
        src: "images/item_block_white.png",
        id: "itemBlockWhite"
    }, {
        src: "images/item_divider.png",
        id: "itemDivider"
    }, {
        src: "images/item_power_shield.png",
        id: "itemPowerShield"
    }, {
        src: "images/item_power_magnet.png",
        id: "itemPowerMagnet"
    }, {
        src: "images/icon_shield.png",
        id: "iconShield"
    }, {
        src: "images/icon_tail.png",
        id: "iconTail"
    }, {
        src: "images/icon_explode.png",
        id: "iconExplode"
    }, {
        src: "images/icon_magnet.png",
        id: "iconMagnet"
    }, {
        src: "images/gradient.png",
        id: "gradient"
    }, {
        src: "images/btn_restart.png",
        id: "buttonReplay"
    }, {
        src: "images/btn_home.png",
        id: "buttonHome"
    }, {
        src: "images/btn_share.png",
        id: "buttonShare"
    }, {
        src: "images/btn_fullscreen.png",
        id: "buttonFullscreen"
    }, {
        src: "images/btn_sound_off.png",
        id: "buttonSoundOn"
    }, {
        src: "images/btn_sound_on.png",
        id: "buttonSoundOff"
    }];
    soundOn = true;

    if (soundOn) {
        manifest.push({
            src: "sounds/music.ogg",
            id: "musicMain"
        });
        manifest.push({
            src: "sounds/clear.ogg",
            id: "soundClear"
        });
        manifest.push({
            src: "sounds/hit.ogg",
            id: "soundHit"
        });
        manifest.push({
            src: "sounds/coin.ogg",
            id: "soundCoin"
        });
        manifest.push({
            src: "sounds/power.ogg",
            id: "soundPower"
        });
        manifest.push({
            src: "sounds/fail.ogg",
            id: "soundFail"
        });
       createjs.Sound["alternateExtensions"] = ["mp3"];
        loader["installPlugin"](createjs.Sound)
    };
    loader.addEventListener("complete", handleComplete);
    loader.addEventListener("fileload", fileComplete);
    loader.addEventListener("error", handleFileError);
    loader.on("progress", handleProgress, this);
    loader["loadManifest"](manifest);
}

function fileComplete(obj) {
    var item = obj["item"];
}

function handleFileError(obj) {
    console.log("error ", obj);
}

function handleProgress() {
    $("#mainLoader span").html(Math.round(loader["progress"] / 1 * 100) + "%");
}

function handleComplete() {
    toggleLoader(false);
    initMain()
}

function toggleLoader(val) {
    if (val) {
        $("#mainLoader")["show"]()
    } else {
        $("#mainLoader")["hide"]()
    }
}
var stageWidth, stageHeight = 0;
var isLoaded = false;
$(function() {
    /*var WebAudioSnd = function() {
        try {
			console.log(createjs.WebAudioPlugin.context);
            if (createjs.WebAudioPlugin.context["state"] === "suspended") {
                createjs.WebAudioPlugin.context["resume"]();
                window.removeEventListener("click", _0xda06xf3)
            }
        } catch (e) {
            console["error"]("There was an error while trying to resume the SoundJS Web Audio context...");
            console["error"](e)
        }
    };
    window.addEventListener("click", WebAudioSnd);
    */
    $(window)["resize"](function() {
        resizeLoaderFunc()
    });
    resizeLoaderFunc();
    checkBrowser()
});

function resizeLoaderFunc() {
    stageWidth = $(window).width();
    stageHeight = $(window).height();
    $("#mainLoader")["css"]("left", checkContentWidth($("#mainLoader")));
    $("#mainLoader")["css"]("top", checkContentHeight($("#mainLoader")))
}
var browserSupport = false;
var isTablet;

function checkBrowser() {
    isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i ["test"](navigator["userAgent"]["toLowerCase"]()));
    deviceVer = getDeviceVer();
    var _0xda06xf8 = document["createElement"]("canvas");
    if (_0xda06xf8["getContext"]) {
        browserSupport = true
    };
    if (browserSupport) {
        if (!isLoaded) {
            isLoaded = true;
            initPreload()
        }
    }
}