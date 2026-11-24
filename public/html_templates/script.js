
// Show the current date and time
function showDate() {
    let date = new Date();

    document.getElementById("live-date").innerHTML =
        date.toLocaleString("en-IN");
}

showDate();


// Calculate BMI
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


// Show workout
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


// Change website theme
function changeTheme() {
    document.body.classList.toggle("dark-mode");
}