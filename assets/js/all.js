var resultbtn = document.querySelector('#btn');
var list = document.querySelector('#list');
var result = document.querySelector('.result');
var delbtn = document.querySelector('.delbtn');
var data = JSON.parse(localStorage.getItem('datalist')) || [];
var judgevalue;
// 執行
updateList(data);
resultbtn.addEventListener('click', calBMI, false);
delbtn.addEventListener('click', datadele, false);
//計算BMI
function calBMI(e) {
    e.preventDefault();
    var htxt = document.querySelector('#height').value;
    var wtxt = document.querySelector('#weight').value;
    if (isNaN(wtxt) || wtxt == '' || isNaN(htxt) || htxt == '') {
        alert('請填入數字');
        return;
    }
    if (wtxt == '0' || htxt == '0' || wtxt < 0 || htxt < 0) {
        alert('請填入有效數值');
        return;
    }

    var htsmall = htxt / 100;
    var bminum = wtxt / (htsmall * htsmall);
    var bminum = bminum.toFixed(2);

    if (bminum > 40) {
        judgevalue = '重度肥胖'
    } else if (bminum > 35) {
        judgevalue = '中度肥胖'
    } else if (bminum > 30) {
        judgevalue = '輕度肥胖'
    } else if (bminum > 25) {
        judgevalue = '過重'
    } else if (bminum > 18.5) {
        judgevalue = '理想'
    } else {
        judgevalue = '過輕'
    }

    //取得今天日期
    var Today = new Date();
    var time = Today.getDate() + '-' + (Today.getMonth() + 1) + '-' + Today.getFullYear();

    var record = {
        height: htxt,
        weight: wtxt,
        BMI: bminum,
        judge: judgevalue,
        time: time
    }
    data.push(record);
    localStorage.setItem('datalist', JSON.stringify(data));
    updateList(data);
    changeBtn(data);
}

//更新畫面
function updateList(items) {
    var Len = items.length;
    var str = '';
    var judgecolor;


    for (var i = (Len - 1); i >= 0; i--) {
        if (items[i].judge == '重度肥胖') {
            judgecolor = 'colorred'
        } else if (items[i].judge == '理想') {
            judgecolor = 'colorgreen'
        } else if (items[i].judge == '過輕') {
            judgecolor = 'colorblue'
        } else if (items[i].judge == '過重') {
            judgecolor = 'colororg'
        } else {
            judgecolor = 'colororgdeep'
        }
        str += '<li class="' + judgecolor + '"><table><tr><td>' + items[i].judge + '</td><td><span>BMI</span> ' + items[i].BMI + '</td><td><span>weight</span> ' + items[i].weight + '</td><td><span>height</span> ' + items[i].height + '</td><td><span> ' + items[i].time + '</span></td></tr></table></li>'
    }
    list.innerHTML = str;
}

function changeBtn(items) {
    var Len = items.length - 1;
    var bordercolor;
    var txtcolor;
    var bgcolor;
    var judgement = items[Len].judge;
    switch (judgement) {
        case '理想':
            bordercolor = 'colorgreen';
            txtcolor = 'txtcolorgreen';
            bgcolor = 'bgcolorgreen';
            break;
        case '重度肥胖':
            bordercolor = 'colorred';
            txtcolor = 'txtcolorred';
            bgcolor = 'bgcolorred';
            break;
        case '過輕':
            bordercolor = 'colorblue';
            txtcolor = 'txtcolorblue';
            bgcolor = 'bgcolorblue';
            break;
        case '過重':
            bordercolor = 'colororg';
            txtcolor = 'txtcolororg';
            bgcolor = 'bgcolororg';
            break;


        default:
            bordercolor = 'colororgdeep';
            txtcolor = 'txtcolororgdeep';
            bgcolor = 'bgcolororgdeep';
            break;
    }
    var strBtn = '<div class="newbtn ' + bordercolor + ' ' + txtcolor + '"><div class="text">' + items[Len].BMI + '<h4>BMI</h4></div><a class="resetbtn ' + bgcolor + '" href="#"><img src="./assets/img/icons_loop.png" alt=""></a><div class="judgetxt">' + items[Len].judge + '</div></div>'
    result.innerHTML = strBtn;


    var resetbtn = document.querySelector('.resetbtn');
    resetbtn.addEventListener('click',resetaction,false);
    function resetaction(e) {
        e.preventDefault();
        window.location.reload();

    }
}

function datadele(e) {
    e.preventDefault();
    localStorage.removeItem('datalist');
    data = [];
    updateList(data);
}

