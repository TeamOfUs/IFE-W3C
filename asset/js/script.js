/**
 * Created by llissery on 2016/3/31.
 */

(function () {
    "use strict";

    /**
     * 渲染task内容
     * @param jsonObject jsonObject
     */
    function render(jsonObject) {
        var outerHTML = "",
            stageName,
            placeholder = document.getElementById("placeholder");

        for (stageName in jsonObject) {

            outerHTML += getStageSection(stageName);
            outerHTML += getTaskSection(jsonObject[stageName]);

        }

        placeholder.outerHTML = outerHTML;

    }

    /**
     * 生成stage的section标签
     * @param stageName
     * @returns {string}
     */
    function getStageSection(stageName) {

        return "<section class=\"text-center section-padding stage\"><div class='container'><div class='row'>" +
            "<div class='col-md-8 col-md-offset-2 stage-1'><h1>" + stageName +
            "</h1></div></div></div></section>";
    }


    /**
     * 生成task的section标签
     * @param stage
     * @returns {string}
     */
    function getTaskSection(stage) {
        var taskSection = "<section class='dark-bg text-center section-padding contact-wrap'>" +
                "<div class='container'><div class='row contact-details'>",
            taskName, task, taskStr;

        for (taskName in stage) {
            task = stage[taskName];

            taskStr = "<div class='col-md-4'><div class='light-box box-hover'><h2>" +
                taskName + "</h2><p>" + task.title + "</p><p>" + task.content +
                "</p><div class='link'><ul class='link-buttons'><li><a target='_blank' href='" +
                task.introduction + "' class='link-btn'>任务</a></li><li><a target='_blank' href='" +
                task.demo + "' class='link-btn'>demo</a></li><li><a target='_blank' href='" +
                task.source + "' class='link-btn'>源码</a></li></ul></div></div></div>";

            taskSection += taskStr;
        }

        taskSection += "</div></div></section>";

        return taskSection;

    }


    /**
     * 初始化页面
     */
    function init() {

        var responseTextJson, xhr;

        if (typeof XMLHttpRequest == "undefined") {

            throw new Error("XMLHttpRequest not support.");

        } else {

            xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {

                if (xhr.readyState == 4 && xhr.status == 200) {

                    responseTextJson = JSON.parse(xhr.responseText);
                    render(responseTextJson);

                }
            };

            xhr.open("GET", "asset/task.json", true);
            xhr.send();

        }

    }

    init();

})();
