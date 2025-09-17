
  
        // Function to calculate windchill factor
        // Formula for Fahrenheit: Wind Chill (°F) = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)
        // Constraints: Temperature <= 50°F, Wind Speed >= 3 mph
        // If constraints are not met, windchill is equal to temperature.
        function calculateWindChill(temperature, windSpeed) {
            if (temperature <= 50 && windSpeed >= 3) {
                // Using Math.pow for V^0.16
                return (35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16))).toFixed(1);
            } else {
                return temperature.toFixed(1); // Return temperature if conditions not met
            }
        }

        // Event listener to run when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Define static variables for temperature and wind speed
            const staticTemperature = 40; // Fahrenheit
            const staticWindSpeed = 10;   // mph

            // Update the displayed static values (optional, but good for consistency)
            document.getElementById('display-temp').textContent = staticTemperature;
            document.getElementById('display-temp2').textContent = staticTemperature;
            document.getElementById('display-wind-speed').textContent = staticWindSpeed;

            // Calculate the windchill factor
            const windchill = calculateWindChill(staticTemperature, staticWindSpeed);

            // Display the windchill factor on the page
            document.getElementById('windchill-display').textContent = `${windchill}°F`;
        });
   
