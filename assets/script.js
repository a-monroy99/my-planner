var eventsData;
var timeDisplayEl = $("#currentDay")

// This will help display the current date and time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}

// This for loop helps display the proper background color on the text area to see what hour
// it currently is gy displaying red, the hours that have past by displaying grey and the future
// by displaying green
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

// this helps access the striing inside the property eventsData. If there is no saved text inside local
// stotrage then it will retturn an emtpy string
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
    // Retun the values of object eventsData into and array 
    // which allows us to access the values in a for loop and display the text in its corresponding
    // textarea
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

// added an event listener to each button
$(".saveBtn").on("click", handleSaveClick);

// When the page loads it will run these functions
$(function() {
    loadStoredData();
    setHourColors();
});

// properly displays the time
setInterval(displayTime, 1000);