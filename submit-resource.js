// Handle form submission for resource submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resource-submission-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
});

function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = new FormData(event.target);
    const resourceData = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        resourceData[key] = value.trim();
    }
    
    // Validate required fields
    const requiredFields = ['program-name', 'program-type', 'region', 'address', 'city', 'schedule'];
    const missingFields = requiredFields.filter(field => !resourceData[field]);
    
    if (missingFields.length > 0) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (in real implementation, this would send to a server)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showMessage('Thank you! Your resource submission has been received. We\'ll review it and add it to our directory within 3-5 business days.', 'success');
        
        // Clear form
        document.getElementById('resource-submission-form').reset();
        
        // Log submission data (for development - remove in production)
        console.log('Resource submitted:', resourceData);
        
    }, 2000); // Simulate 2-second processing time
}

function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of the form
    const form = document.getElementById('resource-submission-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-hide success messages after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 10000);
    }
}

// Form enhancement: Auto-format phone number
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }
});