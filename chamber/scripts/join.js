// --- Logic for join.html (Sets the timestamp before submission) ---
// This logic assumes a form element and an input with name='timestamp' exist.
const joinForm = document.querySelector("form");
if (joinForm) {
    
    joinForm.addEventListener("submit", function() {
        const timestampInput = this.querySelector("input[name='timestamp']");
        if (timestampInput) {
             
             timestampInput.value = new Date().toISOString();
        }
    });
}


// --- Logic for thankyou.html (Reads and displays URL parameters) ---
//check if the element with ID 'out-firstName' exists before executing, 

const outputElement = document.getElementById("out-firstName");

if (outputElement) {
    // Get query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    
    // Function to format the timestamp
    function formatTimestamp(isoString) {
        try {
            const date = new Date(isoString);
            return date.toLocaleString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            });
        } catch (e) {
            return isoString; // Return raw string if parsing fails
        }
    }

    // Populate the fields
    document.getElementById("out-firstName").textContent = params.get("firstName") || "Not provided";
    document.getElementById("out-lastName").textContent = params.get("lastName") || "Not provided";
    document.getElementById("out-email").textContent = params.get("email") || "Not provided";
    document.getElementById("out-mobile").textContent = params.get("mobile") || "Not provided";
    document.getElementById("out-organization").textContent = params.get("organization") || "Not provided";
    
    // We can add a fallback for membership level to display the full name
    let membershipLevel = params.get("membership");
    if (membershipLevel === 'np') membershipLevel = 'Non Profit Membership';
    if (membershipLevel === 'bronze') membershipLevel = 'Bronze Membership';
    if (membershipLevel === 'silver') membershipLevel = 'Silver Membership';
    if (membershipLevel === 'gold') membershipLevel = 'Gold Membership';

    document.getElementById("out-membership").textContent = membershipLevel || "Not provided";
    
    // Handle the timestamp formatting
    const rawTimestamp = params.get("timestamp");
    document.getElementById("out-timestamp").textContent = rawTimestamp ? formatTimestamp(rawTimestamp) : "Not provided";
}
