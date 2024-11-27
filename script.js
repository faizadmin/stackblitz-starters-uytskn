import { createOrder, checkOrderStatus } from './js/api.js';
import { generateOrderId, updateStatus, validateForm } from './js/utils.js';

document.getElementById('rechargeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const statusDiv = document.getElementById('status');
  const submitBtn = document.querySelector('.submit-btn');
  
  try {
    const formData = {
      name: document.getElementById('name').value,
      mobile: document.getElementById('mobile').value,
      amount: document.getElementById('amount').value,
      orderId: generateOrderId()
    };

    const errors = validateForm(formData);
    if (errors.length > 0) {
      updateStatus(statusDiv, 'error', errors.join('\n'));
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    updateStatus(statusDiv, 'info', 'Creating order...');

    const data = await createOrder(formData);

    if (data.status === true) {
      updateStatus(statusDiv, 'success', 'Order created! Redirecting to payment page...');
      localStorage.setItem('lastOrderId', formData.orderId);
      setTimeout(() => {
        window.location.href = data.result.payment_url;
      }, 1500);
    } else {
      throw new Error(data.message || 'Failed to create order');
    }
  } catch (error) {
    console.error('Payment Error:', error);
    updateStatus(statusDiv, 'error', `Error: ${error.message}. Please try again.`);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Pay Now';
  }
});

window.addEventListener('load', async () => {
  const lastOrderId = localStorage.getItem('lastOrderId');
  const statusDiv = document.getElementById('status');
  
  if (lastOrderId) {
    try {
      updateStatus(statusDiv, 'info', 'Checking payment status...');

      const data = await checkOrderStatus(lastOrderId);

      if (data.status === 'COMPLETED') {
        updateStatus(statusDiv, 'success', `Payment Successful! UTR: ${data.result.utr}`);
      } else {
        updateStatus(statusDiv, 'error', data.message || 'Payment status: Pending/Failed');
      }
    } catch (error) {
      console.error('Status Check Error:', error);
      updateStatus(statusDiv, 'error', `Error checking status: ${error.message}`);
    } finally {
      localStorage.removeItem('lastOrderId');
    }
  }
});