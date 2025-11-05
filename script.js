// Tab switching functionality
function openTab(event, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName('tab-content');
    Array.from(tabContents).forEach(tab => tab.classList.remove('active'));

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    Array.from(tabButtons).forEach(button => button.classList.remove('active'));

    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');

    // Add active class to the clicked button
    event.currentTarget.classList.add('active');
}
