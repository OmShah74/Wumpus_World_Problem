// Function to handle button click for going to the Wumpus World Problem page
document.getElementById("goButton").addEventListener("click", function() {
    window.location.href = 'wumpus_world.html'; // Redirect to the Wumpus World page
});

// Function to handle back button click
document.getElementById("backButton").addEventListener("click", function() {
    window.location.href = 'index.html'; // Redirect to the home page
});

// Ensure the back button is set up only when on the Wumpus World page
if (window.location.pathname.includes('wumpus_world.html')) {
    // Only run this if we are on the Wumpus World Problem page
    document.getElementById("backButton").addEventListener("click", function() {
        window.location.href = 'index.html'; // Redirect to the home page
    });
}
