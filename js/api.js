const API_CONFIG = {
  USER_TOKEN: '6ec2df9eb3879d64d1b4b3a020604a37',
  BASE_URL: '/api'
};

export async function createOrder(orderData) {
  const formData = new URLSearchParams();
  formData.append('customer_mobile', orderData.mobile);
  formData.append('user_token', API_CONFIG.USER_TOKEN);
  formData.append('amount', orderData.amount);
  formData.append('order_id', orderData.orderId);
  formData.append('redirect_url', window.location.href);
  formData.append('remark1', orderData.name);
  formData.append('remark2', 'Portal Payment');

  const response = await fetch(`${API_CONFIG.BASE_URL}/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function checkOrderStatus(orderId) {
  const formData = new URLSearchParams();
  formData.append('user_token', API_CONFIG.USER_TOKEN);
  formData.append('order_id', orderId);

  const response = await fetch(`${API_CONFIG.BASE_URL}/check-order-status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}