// api.js
const baseURL = 'http://localhost:3001/api';

export async function getTotalPayment() {
  const response = await fetch(`${baseURL}/payment`);
  return response.json();
}
