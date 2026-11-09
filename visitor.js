
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

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Prevent multiple submissions
    submitButton.disabled = true;
    feedback.textContent = "Sending your pressure...";

    try {

        // Send the message to Supabase
        const { error } = await supabaseClient
            .from("messages")
            .insert({
                content: message
            });

        if (error) {
            throw error;
        }

        // Only show success if the database saved the message
        feedback.textContent =
            "Your pressure has been released into the room.";

        // Clear the input after successful submission
        input.value = "";
        counter.textContent = "0";

    } catch (error) {

        console.error("Submission error:", error);

        feedback.textContent =
            "Something went wrong. Please try again.";

    } finally {

        // Allow another submission
        submitButton.disabled = false;

    }

});
