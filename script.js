let selectedMeasurements = [];
let measurements = {};
let actualHeight;

function selectMeasurement(measurement) {
    if (!selectedMeasurements.includes(measurement)) {
        selectedMeasurements.push(measurement);
        updateSelectedMeasurements();
    }
}

function updateSelectedMeasurements() {
    document.getElementById('selected-measurements').innerHTML = 
        "Selected measurements: " + selectedMeasurements.join(", ");
}

function getMeasurements() {
    if (selectedMeasurements.length === 0) {
        alert("Please select at least one measurement.");
        return;
    }

    measurements = {
        distance: Math.floor(Math.random() * 20) + 10,
        angle: Math.floor(Math.random() * 60) + 30,
        eyeHeight: (Math.random() * 0.5 + 1.5).toFixed(2)
    };

    let measurementText = "Measurements:\n";
    selectedMeasurements.forEach(m => {
        measurementText += `${m}: ${measurements[m]}${m === 'angle' ? '°' : 'm'}\n`;
    });

    alert(measurementText);

    actualHeight = measurements.distance * Math.tan(measurements.angle * Math.PI / 180) + parseFloat(measurements.eyeHeight);
    document.getElementById('calculation-panel').style.display = 'block';
}

function checkHeight() {
    const playerHeight = parseFloat(document.getElementById('height-input').value);
    if (isNaN(playerHeight)) {
        alert("Please enter a valid number for the height.");
        return;
    }

    const difference = Math.abs(playerHeight - actualHeight);
    let message;

    if (difference < 0.1) {
        message = "Excellent! Your calculation is spot on!";
    } else if (difference < 0.5) {
        message = "Very close! Just a small difference.";
    } else if (difference < 1) {
        message = "Not bad, but there's room for improvement.";
    } else {
        message = "Your calculation is off. Try again!";
    }

    document.getElementById('result').innerHTML = `${message}<br>The actual height is ${actualHeight.toFixed(2)}m.`;
}

function calculate() {
    const expression = document.getElementById('calc-input').value;
    try {
        // Replace trig function names with Math.functionName
        const mathExpression = expression.replace(/(sin|cos|tan)\(/g, 'Math.$1(');
        // Convert degrees to radians for trig functions
        const radianExpression = mathExpression.replace(/(Math\.(?:sin|cos|tan))\((\d+(\.\d+)?)\)/g, 
            (match, func, angle) => `${func}(${angle} * Math.PI / 180)`);
        const result = eval(radianExpression);
        document.getElementById('calc-result').innerHTML = `Result: ${result}`;
    } catch (error) {
        document.getElementById('calc-result').innerHTML = "Invalid expression";
    }
}

function showInstructions() {
    alert("Welcome to Height Detective!\n\n" +
          "1. Select the measurements you think you need to calculate the height.\n" +
          "2. Click 'Get Measurements' to receive the selected measurements.\n" +
          "3. Use the calculator to help with your calculations:\n" +
          "   - For basic math: 2 + 2, 5 * 3, etc.\n" +
          "   - For trig functions: sin(30), cos(45), tan(60), etc. (use degrees)\n" +
          "4. Calculate the height of the tall object.\n" +
          "5. Enter your calculated height and click 'Check Answer'.\n" +
          "6. See how close your calculation is to the actual height!\n\n" +
          "Remember: You might not need all measurements. Think carefully!\n\n" +
          "Good luck, detective!");
}