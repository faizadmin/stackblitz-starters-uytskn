export function generateOrderId() {
  return `ORDER${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function updateStatus(statusDiv, type, message) {
  statusDiv.className = `status ${type}`;
  statusDiv.textContent = message;
}

export function validateForm(formData) {
  const errors = [];
  
  if (!formData.mobile.match(/^\d{10}$/)) {
    errors.push('Please enter a valid 10-digit mobile number');
  }
  
  if (formData.amount < 1) {
    errors.push('Amount must be at least ₹1');
  }
  
  if (!formData.name.trim()) {
    errors.push('Please enter your name');
  }
  
  return errors;
}