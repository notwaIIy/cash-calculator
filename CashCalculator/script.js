function calculateTotal() {
    // Get and validate the expected value
    const expectedValue = parseFloat(document.getElementById('expected-value').value) || 0;
    document.getElementById('expected-display').innerText = expectedValue.toFixed(2);

    // Function to round down and display an error if decimals are entered for cash
    function validateInput(value, id) {
        const roundedValue = Math.floor(value);
        if (value !== roundedValue) {
            alert(`Error: Please enter a whole number for ${id}. Decimal values will be rounded down.`);
            document.getElementById(id).value = roundedValue;  // Update the input field with the rounded value
        }
        return roundedValue;
    }

    // Cash Denominations
    const hundreds = validateInput(parseFloat(document.getElementById('hundreds').value) || 0, 'hundreds');
    const fifties = validateInput(parseFloat(document.getElementById('fifties').value) || 0, 'fifties');
    const twenties = validateInput(parseFloat(document.getElementById('twenties').value) || 0, 'twenties');
    const tens = validateInput(parseFloat(document.getElementById('tens').value) || 0, 'tens');
    const fives = validateInput(parseFloat(document.getElementById('fives').value) || 0, 'fives');
    const ones = validateInput(parseFloat(document.getElementById('ones').value) || 0, 'ones');

    // Calculate sums for each denomination
    const hundredsSum = hundreds * 100;
    const fiftiesSum = fifties * 50;
    const twentiesSum = twenties * 20;
    const tensSum = tens * 10;
    const fivesSum = fives * 5;
    const onesSum = ones * 1;

    // Display each sum
    document.getElementById('hundreds-sum').innerText = `$${hundredsSum.toFixed(2)}`;
    document.getElementById('fifties-sum').innerText = `$${fiftiesSum.toFixed(2)}`;
    document.getElementById('twenties-sum').innerText = `$${twentiesSum.toFixed(2)}`;
    document.getElementById('tens-sum').innerText = `$${tensSum.toFixed(2)}`;
    document.getElementById('fives-sum').innerText = `$${fivesSum.toFixed(2)}`;
    document.getElementById('ones-sum').innerText = `$${onesSum.toFixed(2)}`;

    // Total Coins Value
    const totalCoins = parseFloat(document.getElementById('total-coins').value) || 0;

    // Calculate total amount
    const total = hundredsSum + fiftiesSum + twentiesSum + tensSum + fivesSum + onesSum + totalCoins;

    // Display the total amount
    document.getElementById('total').innerText = total.toFixed(2);

    // Calculate and display the difference
    const difference = expectedValue - total;
    document.getElementById('difference').innerText = difference.toFixed(2);

    // Save the log to localStorage
    saveLog(expectedValue, total, difference);
}

function saveLog(expected, total, difference) {
    const log = {
        expected: expected.toFixed(2),
        total: total.toFixed(2),
        difference: difference.toFixed(2),
        timestamp: new Date().toLocaleString()
    };

    // Get existing logs from localStorage
    let logs = JSON.parse(localStorage.getItem('calculationLogs')) || [];
    
    // Add the new log
    logs.push(log);

    // Save logs back to localStorage
    localStorage.setItem('calculationLogs', JSON.stringify(logs));
}

function openLogs() {
    // Get logs from localStorage
    const logs = JSON.parse(localStorage.getItem('calculationLogs')) || [];

    // Display the logs section
    const logList = document.getElementById('logList');
    logList.innerHTML = '';

    // Add each log as a formatted list item with a divider
    logs.forEach(log => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="log-entry">
                <strong>${log.timestamp}</strong><br>
                <div><strong>Expected:</strong> $${log.expected}</div>
                <div><strong>Total:</strong> $${log.total}</div>
                <div><strong>Difference:</strong> $${log.difference}</div>
            </div>
            <hr class="log-divider">
        `;
        logList.appendChild(listItem);
    });
}

function clearLogs() {
    // Clear logs from localStorage
    localStorage.removeItem('calculationLogs');
    
    // Clear the log list display
    document.getElementById('logList').innerHTML = '';
}

// Tab functionality
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the active class from all tabs
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // If the Logs tab is opened, load the logs
    if (tabName === 'Logs') {
        openLogs();
    }
}

// Set default tab to open
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.tablink').click();
});
