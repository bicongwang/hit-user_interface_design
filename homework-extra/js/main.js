/**
 * Created by wangbicong on 2017/4/17.
 */
var currentFocus = 0;
var dragable1;
var inputs;
var count = 1;
var rDrag = {

    o: null,

    init: function (o) {
        o.onmousedown = this.start;
    },
    start: function (e) {
        var o;
        e = rDrag.fixEvent(e);
        e.preventDefault && e.preventDefault();
        rDrag.o = o = this;
        o.x = e.clientX - rDrag.o.offsetLeft;
        o.y = e.clientY - rDrag.o.offsetTop;
        document.onmousemove = rDrag.move;
        document.onmouseup = rDrag.end;

    },
    move: function (e) {
        e = rDrag.fixEvent(e);
        var oLeft, oTop;
        oLeft = e.clientX - rDrag.o.x;
        oTop = e.clientY - rDrag.o.y;
        rDrag.o.style.left = oLeft + 'px';
        rDrag.o.style.top = oTop + 'px';
    },
    end: function (e) {
        e = rDrag.fixEvent(e);
        inputs[rDrag.o.id[rDrag.o.id.length-1]-1].focus();
        rDrag.o = document.onmousemove = document.onmouseup = null;
    },
    fixEvent: function (e) {
        // if (!e) {
        //     e = window.event;
        //     e.target = e.srcElement;
        //     e.layerX = e.offsetX;
        //     e.layerY = e.offsetY;
        // }
        return e;
    }
}

function getyAbsTop(obj) {
    var top = obj.offsetTop;
    while (obj.offsetParent != null) {
        obj = obj.offsetParent;
        top += obj.offsetTop;
    }
    return top;
}

function getyAbsLeft(obj) {
    var l = obj.offsetLeft;
    while (obj.offsetParent != null) {
        obj = obj.offsetParent;
        l += obj.offsetLeft;
    }
    return l;
}

function sqr(val) {
    return val * val;
}

function findNextFocus(keyCode) {
    var lefts = new Array();
    var tops = new Array();
    for (var i = 0; i < count; i++) {
        lefts[i] = getyAbsLeft(inputs[i]);
        tops[i] = getyAbsTop(inputs[i]);
    }
    if (keyCode == 37) { //left
        // alert("left");
        var thisLeft = lefts[currentFocus];
        var nextFocus = currentFocus;
        var minDis = 0.0;
        var tmp;
        for (var i = 0; i < count; i++) {
            if (lefts[i] < thisLeft) {
                tmp = sqr(lefts[i] - lefts[currentFocus]) + sqr(tops[i] - tops[currentFocus]);
                if (minDis == 0.0 || minDis > tmp) {
                    minDis = tmp;
                    nextFocus = i;
                }
            }
        }
    } else if (keyCode == 38) {//up
        // alert("up");
        var nextFocus = currentFocus;
        var minDis = 0.0;
        var tmp;
        for (var i = 0; i < count; i++) {
            if (tops[i] < tops[currentFocus]) {
                tmp = sqr(lefts[i] - lefts[currentFocus]) + sqr(tops[i] - tops[currentFocus]);
                if (minDis == 0.0 || minDis > tmp) {
                    minDis = tmp;
                    nextFocus = i;
                }
            }
        }
    } else if (keyCode == 39) {//right
        // alert("right");
        var thisLeft = lefts[currentFocus];
        var nextFocus = currentFocus;
        var minDis = 0.0;
        var tmp;
        for (var i = 0; i < count; i++) {
            if (lefts[i] > thisLeft) {
                tmp = sqr(lefts[i] - lefts[currentFocus]) + sqr(tops[i] - tops[currentFocus]);
                if (minDis == 0.0 || minDis > tmp) {
                    minDis = tmp;
                    nextFocus = i;
                }
            }
        }
    } else if (keyCode == 40 || keyCode == 13) {//down or enter
        // alert("down or enter");
        var nextFocus = currentFocus;
        var minDis = 0.0;
        var tmp;
        for (var i = 0; i < count; i++) {
            if (tops[i] > tops[currentFocus]) {
                tmp = sqr(lefts[i] - lefts[currentFocus]) + sqr(tops[i] - tops[currentFocus]);
                if (minDis == 0.0 || minDis > tmp) {
                    minDis = tmp;
                    nextFocus = i;
                }
            }
        }
    }
    return nextFocus;
}

document.onkeydown = function (e) {
    if (e) {
        var nextFocus = findNextFocus(e.keyCode);
        inputs[nextFocus].focus();
        currentFocus = nextFocus;
    }
}

function addNewChild() {
    if (count <= 7){
        count += 1;
        var newId = "draggable" + count;
        var newId2 = "input" + count;
        var width = Math.random() * 200 + 70;
        // var width = 194;
        // var newChild = document.createElement("<div id='"+newId+"' style='position: absolute'></div>");
        var newChild = document.createElement("div");
        newChild.id = newId;
        newChild.style.position = "absolute";
        newChild.innerHTML = "<span>" + "表单" + newId2[newId2.length-1] + "</span><input id='" + newId2 + "' style='width:" + width + "px'/>";
        document.body.appendChild(newChild);
        rDrag.init(newChild);
        inputs[count - 1] = document.getElementById(newId2);
        return;
    }
    else{
        $('#nextModal').modal('toggle');
    }
}

window.onload = function () {
    dragable1 = document.getElementById('draggable1');
    // dragable2 = document.getElementById('draggable2');
    // dragable3 = document.getElementById('draggable3');
    // dragable4 = document.getElementById('draggable4');
    rDrag.init(dragable1);
    // rDrag.init(dragable2);
    // rDrag.init(dragable3);
    // rDrag.init(dragable4);
    inputs = new Array();
    inputs[0] = document.getElementById("input1");
    inputs[0].focus();
    // inputs[1] = document.getElementById("input2");
    // inputs[2] = document.getElementById("input3");
    // inputs[3] = document.getElementById("input4");
}