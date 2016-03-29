/**
 * Created by llissery on 2016/3/23.
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById("aqi-city-input");
var aqiInput = document.getElementById("aqi-value-input");
var aqiTable = document.getElementById("aqi-table");

/**
 * 验证函数
 */
function validate(city, aqi) {
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("输入的城市名必须为中英文字符！")
        return false;
    } else if(!aqi.match(/^\d+$/)) {
        alert("输入的空气质量指数必须为整数！")
        return false;
    } else {
        return true;
    }
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

    var city = cityInput.value.trim();
    var aqi = aqiInput.value.trim();

    if (validate(city, aqi)) {

        aqiData[city] = aqi;
    }


}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

    if (!aqiTable) return false;

    var chart = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>",
        city;


    for(city in aqiData){
        chart += "<tr><td>" + city + "</td>" +
            "<td>" + aqiData[city] + "</td>" +
            "<td><button>删除</button></td></tr>"
    }

    aqiTable.innerHTML = aqiData.length ? "" : chart;

    cityInput.value = "";
    aqiInput.value = "";

    cityInput.focus();

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    // do sth.

    var city = event.target.parentNode.parentNode.firstChild.textContent;

    delete aqiData[city];

    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    var addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click", addBtnHandle);

    //给cityInput绑定一个键盘事件，点击Enter时触发将焦点移到aqiInput
    cityInput.addEventListener("keydown", function (event) {
        if (13 === event.keyCode) {
            aqiInput.focus();
        }
    });

    //给aqiInput绑定一个键盘事件，点击Enter时触发addBtnHandle函数
    aqiInput.addEventListener("keydown", function (event) {
        if (13 === event.keyCode) {
            addBtnHandle();
        }
    });


    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

    aqiTable.addEventListener("click", delBtnHandle);

}

init();