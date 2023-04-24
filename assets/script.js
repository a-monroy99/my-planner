var eventsData;
var timeDisplayEl = $("#currentDay")

function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}

function setHourColors() {
    var now = dayjs();
    for (var i = 9; i < 18; i++) {
        $("#hour-" + i + " textarea").removeClass("future")
        if (i < now.hour()) {
             $("#hour-" + i + " textarea").addClass("past");
        } else if (i == now.hour()) {
             $("#hour-" + i + " textarea").addClass("present");
        } else if (i > now.hour()) {
            $("#hour-" + i + " textarea").addClass("future")
        }
    }
}

function loadStoredData() {
    eventsData = JSON.parse(localStorage.getItem("calenderEvents"));
    console.log(eventsData)
    if (!eventsData) {
        eventsData = {
            hour9: "",
            hour10: "",
            hour11: "",
            hour12: "",
            hour13: "",
            hour14: "",
            hour15: "",
            hour16: "",
            hour17: "",
        }
    }
    var schedulerEl = $("#scheduler");
    var hourDataArr = Object.values(eventsData);
    console.log(hourDataArr + " this works");
    for (let i = 0; i < hourDataArr.length; i++) {
        var timeBlockEl = schedulerEl.children().eq(i).children("textarea");
        timeBlockEl.text(hourDataArr[i]);
    }
}


function handleSaveClick(event) {
    //grab data from HTML
    var hourBlock = $(event.target).parent();
    var value = hourBlock.children("textarea").val();
    var hour = hourBlock.attr("id").split("-")[1];
    eventsData["hour" + hour] = value;

    // store in local storage
    localStorage.setItem("calenderEvents", JSON.stringify(eventsData))
}


$(".saveBtn").on("click", handleSaveClick);

$(function() {
    loadStoredData();
    setHourColors();
});

setInterval(displayTime, 1000);