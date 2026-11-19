
// ==========================================
// 1. Connect to Supabase
// ==========================================

// Replace these with your own Supabase information
const SUPABASE_URL = "https://seqbdiekbxkbsqsxcmzg.supabase.co";
const SUPABASE_KEY = "sb_publishable_VC_c8Ief4UyxF5g1fKIAWw_P_cLvQQ5";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// 2. Find the form elements
// ==========================================

const form = document.getElementById("pressure-form");
const input = document.getElementById("pressure-input");
const counter = document.getElementById("char-count");
const feedback = document.getElementById("feedback");
const submitButton = form.querySelector('button[type="submit"]');


// ==========================================
// 3. Update the character counter
// ==========================================

input.addEventListener("input", function() {
    counter.textContent = input.value.length;
});


// ==========================================
// 4. Handle form submission
// ==========================================


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Prevent multiple submissions
    submitButton.disabled = true;
    feedback.textContent = "Sending your pressure...";

    // Send message to Supabase
    supabaseClient
        .from("messages")
        .insert({
            content: message
        })

        .then(function(result) {

            if (result.error) {
                throw result.error;
            }

            // Show success message
            feedback.textContent =
                "Your pressure has been released into the room.";

            // Clear input
            input.value = "";
            counter.textContent = "0";

        })

.catch(function() {

    feedback.textContent =
        "Something went wrong. Please try again.";

})

        .then(function() {

            // Allow another submission
            submitButton.disabled = false;

        });

});
