
// Find the form elements

const form = document.getElementById("pressure-form");

const input = document.getElementById("pressure-input");

const counter = document.getElementById("char-count");

const feedback = document.getElementById("feedback");


// Update the character counter

input.addEventListener("input", function() {

    counter.textContent = input.value.length;

});


// Handle form submission

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    feedback.textContent =
        "Your pressure has been released into the room.";

    input.value = "";

    counter.textContent = "0";

});
// JavaScript Document