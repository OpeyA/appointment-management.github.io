'use strict';
//document.addEventListener('DOMContentLoaded', function () {
const appointment1 = {
  // id: 1,
  type: 'Dentist',
  date: new Date(),
  time: '2:00:00 PM',
  location: '432 S Dearborn Ave Chicago,IL 60627',
};

const appointment2 = {
  //id: 2,
  type: 'Gynaecologist',
  date: new Date(),
  time: '1:00:00 PM',
  location: '1234 S Drexel Ave Chicago,IL 60637',
};

const appointments = [appointment1, appointment2];
// const appointments = [];

//Select DOM elements
const apptContainer = document.querySelector('.appointments');
const rows = document.querySelectorAll('.appointments-row');
const deleteBtns = document.querySelectorAll('.delete');
const edit = document.querySelectorAll('.appointments-btn-edit');
const apptSubmit = document.querySelector('.form-btn');
const apptType = document.querySelector('.form-input-type');
const apptDate = document.querySelector('.form-input-date');
const apptTime = document.querySelector('.form-input-time');
const apptLocation = document.querySelector('.form-input-location');
const dayCount = document.querySelector('.days');
const sortBtn = document.querySelector('.sort-btn');
const datePicker = document.querySelector('.form-input-date');
const popup = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlayBG = document.querySelector('.overlay');
const deleteMsg = document.querySelector('.deleteMsg');

//Display Appointments from objects
const displayAppts = function (appt, sort = false) {
  //emtpy out the comtainer
  apptContainer.innerHTML = '';

  appt.forEach(function (el, i) {
    const html = ` <div class="appointments-row">
          <button data-id="${i + 1}" class="delete"> ❌ </button>
          <!---- <button class="appointments-btn-edit">✏️</button> --->
          <div class="appointments-type">${el.type}</div>
          <div class="appointments-date">${el.date.toLocaleDateString()}</div>
          <div class="appointments-time">${el.time} </div>
          <div class="appointments-location">
          ${el.location}
          </div>`;
    //input html into container
    apptContainer.insertAdjacentHTML('afterbegin', html);
  });
};


const today = new Date();
// console.log(today.toISOString());
// console.log(today.toISOString().slice(0,16));
//Setting the date pickerminimum date
datePicker.setAttribute('min', today.toISOString().slice(0, 16));
// datePicker.setAttribute("max", "2024-03-31T00:00");

const calcDaysPassed = (date1, date2) =>
  Math.round((date2 - date1) / (1000 * 60 * 60 * 24));

const setTimer = function () {
  let days = [];

  appointments.forEach((appt, i, arr) =>
    days.push(calcDaysPassed(today, appt.date))
  );
  console.log(days);
  let closest = days[0];
  days.forEach((day, i, arr) => {
    if (day < closest) {
      closest = day;
    }
  });

  //IF THERE ARE APPOINTMENTS THEN SET the day count IF NOT THEN PUT 0
  if (appointments.length > 0) {
    dayCount.textContent = closest;
  } else {
    dayCount.textContent = 0;
  }
  console.log(dayCount.textContent);
};

//Update UI
const updateUI = function (appts) {
  displayAppts(appts);
  setTimer();
  // console.log(appointments);
};

updateUI(appointments);
//Function to add an new appointment
const addAppt = function () {
  ///Formating the date
  const date = new Date(apptDate.value);
  const newAppt = {
    // id: appointments.lastIndexOf
    type: apptType.value,
    //.toLocalString() - takes the date and time and sets to string
    date: date,
    time: date.toLocaleTimeString(),
    location: apptLocation.value,
    // deleted: false,
  };
  appointments.push(newAppt);
  updateUI(appointments);
  //console.log(apptContainer);
};

const deleteAppt = function (id) {
  //console.log('Deleted index:', id);
  // appointments = appointments.filter(appt => {
  //   return appt.id !== id;
  // });
  appointments.forEach((appt, i, arr) => {
    if (i + 1 === id) {
     // console.log('test cond', i);
      appointments.splice(i, 1);
      // console.log(id);
      // console.log(i);
      deleteMsg.innerHTML =  `<p> You successfully deleted your ${appt.type} appointment for ${appt.date.toDateString()} at ${appt.time} </p>`;
    }
  });
  //console.log(appointments);
  updateUI(appointments);
  //console.log(apptContainer);
};

apptSubmit.addEventListener('click', function (e) {
  //alert('List will be unsorted');
  e.preventDefault();
  //console.log('button clicked', e.target.closest('.form-btn'));
  addAppt();
  // console.log(appointments);
  apptDate.value = '';
  apptLocation.value = '';
  apptType.value = '';
  updateUI(appointments);
});

//
// console.log(appointments);
// Because we can not add an event listener to all the delete button elements
//We add the event listen to the general container and look to see if what is clicked has the name of the class we want
apptContainer.addEventListener('click', function (e) {
  //if the class list of the lciked element has delete
  if (e.target.classList.contains('delete')) {
    //print our for error check! and getting teh id attribute associated with the click
    console.log(
      'this  id was clicked and deleted',
      e.target.getAttribute('data-id')
    );
    popup.classList.remove('hidden');
    overlayBG.classList.remove('hidden');
  }


  ///If modal window is closed
  closeModal.addEventListener('click', function (e) {
    popup.classList.add('hidden');
    overlayBG.classList.add('hidden');
})

  //get the id
  let id = parseInt(e.target.getAttribute('data-id'));
  //put that id in the deleteAppt tag
  deleteAppt(id);
});
let sortedAppts = [];
// let sorted = false;
const sortAppts = function () {
  // sortedAppts = appointments.slice().sort((a, b) => b.date - a.date);
  appointments.sort((a, b) => b.date - a.date);
  updateUI(appointments);
  displayAppts(appointments);
};

sortBtn.addEventListener('click', function (e) {
  e.preventDefault();
  sortAppts();
});


// appointments.forEach((appt, i, arr) => {
//   if (calcDaysPassed(today, appt.date) <= 0) {
//     deleteAppt(i);
//     updateUI(appointments);
//     console.log('thats an old appt');
//   }
// });