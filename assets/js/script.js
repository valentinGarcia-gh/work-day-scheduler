// Displays current date at header
const dateTime = moment().format("MMMM Do YYYY, h:mm:ss a");
$("#currentDay").html(dateTime);
// const placeTime = document.getElementById("currentDay");
// placeTime.innerText = dateTime;

function convert(input) {
  return moment(input, "h:mm a").format("HH:mm");
}
let hourMin = moment().format("hh:mm a");
let convertedHourMin = convert(hourMin);

//hour variables
let nineAm = "09:00";
let tenAm = "10:00";
let elevenAm = "11:00";
let noon = "12:00";
let onePm = "13:00";
let twoPm = "14:00";
let threePm = "15:00";
let fourPm = "16:00";
let fivePm = "17:00";

let timeArray = [
  nineAm,
  tenAm,
  elevenAm,
  noon,
  onePm,
  twoPm,
  threePm,
  fourPm,
  fivePm,
];

checkEOD();
checkCurrentTime();

// Local storage stuff
$(document).ready(function(){
    $('.saveBtn').click (function() {
        var time = $(this).parent().attr('id');
        var desc = $(this).siblings('.description').val();
        localStorage.setItem(time, desc);
        console.log("push my buttons pls");
    });
    
    function getSchedule() {
        var timeDesc = $('.row').toArray();
        $.each(timeDesc, function(){
            var time =$(this).attr('id')
            $('.description', this).prepend(localStorage.getItem(time))
        })
    }
    getSchedule();

});

//Checks time at end of day and resets colors
function checkEOD() {
  let id = 9;
  for (let i = 0; i < timeArray.length; i++) {
    if (convertedHourMin <= "08:00") {
      let storeID = document.getElementById(id);
      storeID.classList.remove("past");
      storeID.classList.add("future");
      id++;
      //   localStorage.clear();
    } else {
      timeBlockColor();
    }
  }
}

// Checks current time for present time
function checkCurrentTime() {
    var b = 1;
    var id = 9;
    for (let a = 0; a < timeArray.length; a++) {
      if (convertedHourMin > timeArray[a] && convertedHourMin < timeArray[b]) {
        var storeID = document.getElementById(id);
        storeID.classList.remove("future");
        storeID.classList.remove("past");
        storeID.classList.add("present");
      }
      id++;
      b++;
    }
  }

//Change Time Block Color
function timeBlockColor() {
  let id = 9;
  for (let i = 0; i < timeArray.length; i++) {
    if (convertedHourMin > timeArray[i]) {
      let storeID = document.getElementById(id);
      storeID.classList.remove("future");
      storeID.classList.add("past");
      id++;
    }
  }
}