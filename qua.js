// Import the external JavaScript files as modules
import "quacode.js";
import "quadio.js";

// Declare a global variable
let i__;

// Function to run the quantum code
function run() {
  i__ = document.getElementById('compile').value; // Get value from input field
  document.getElementById('output').innerText = "Output: " + i__; // Display the input value in a paragraph
  console.log("Saved text: ", i__); // Log the saved text in the console
  executeQuantumCode(i__); // Call the quantum execution function (assuming it's defined in one of the imported files)
}

// Initialize the variable
i__ = `
`;

// Optionally, you can run the function directly
executeQuantumCode(i__);
