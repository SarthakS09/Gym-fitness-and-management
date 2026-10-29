
function showDate() {
    let date = new Date();

    document.getElementById("live-date").innerHTML =
        date.toLocaleString("en-IN");
}

showDate();


function calculateBMI() {
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let result = document.getElementById("bmi-result");

    if (height <= 0 || weight <= 0 || height == "" || weight == "") {
        result.innerHTML = "Please enter valid height and weight.";
        return;
    }

    height = height / 100;

    let bmi = weight / (height * height);

    result.innerHTML = "Your BMI is " + bmi.toFixed(2);
}


function showWorkout() {
    document.getElementById("workout-result").innerHTML =
        "Today's workout: 10 squats, 10 push-ups and a 20-second plank.";
}


function changeTheme() {
    document.body.classList.toggle("dark-mode");
}
