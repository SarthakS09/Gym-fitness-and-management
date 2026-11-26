
// Titanium Fitness - Frontend JavaScript


// 1. Display current date and time
function showDate() {
    const dateElement = document.getElementById("live-date");

    if (!dateElement) return;

    function updateDate() {
        const date = new Date();

        dateElement.textContent = date.toLocaleString("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    updateDate();
    setInterval(updateDate, 60000);
}


// 2. Dark mode with localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem("titanium-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}

function changeTheme() {
    document.body.classList.toggle("dark-mode");

    const theme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";

    localStorage.setItem("titanium-theme", theme);
}


// 3. BMI Calculator
function calculateBMI() {
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const result = document.getElementById("bmi-result");

    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);

    if (
        !height ||
        !weight ||
        height < 50 ||
        height > 250 ||
        weight < 10 ||
        weight > 300
    ) {
        result.textContent =
            "Please enter a valid height (50–250 cm) and weight (10–300 kg).";
        return;
    }

    const heightInMetres = height / 100;

    const bmi = weight / (heightInMetres * heightInMetres);

    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 25) {
        category = "Normal range";
    } else if (bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obesity range";
    }

    result.textContent =
        `Your BMI is ${bmi.toFixed(1)} (${category}).`;
}


// 4. Reset BMI Calculator
function resetBMI() {
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("bmi-result").textContent = "";
}


// 5. Workout Generator
function showWorkout() {
    const category =
        document.getElementById("workout-category").value;

    const workouts = {
        chest:
            "Chest: Push-ups – 3 × 12, Bench Press – 3 × 10, Chest Fly – 3 × 12.",

        back:
            "Back: Lat Pulldown – 3 × 12, Seated Row – 3 × 10, Superman Hold – 3 × 20 sec.",

        legs:
            "Legs: Squats – 3 × 12, Lunges – 3 × 10, Calf Raises – 3 × 15.",

        cardio:
            "Cardio: Brisk Walk – 5 min, Jogging – 10 min, Cycling – 10 min."
    };

    document.getElementById("workout-result").textContent =
        workouts[category];
}


// 6. Contact Form Validation
function setupContactForm() {
    const form = document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name =
            document.getElementById("contact-name").value.trim();

        document.getElementById("contact-result").textContent =
            `Thanks, ${name}! Your message has been recorded for this demo.`;

        form.reset();
    });
}


// 7. Run functions when page loads
document.addEventListener("DOMContentLoaded", function() {
    showDate();
    loadTheme();
    setupContactForm();
});
