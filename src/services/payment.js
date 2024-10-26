import axios from 'axios';

export const getAuthToken = async () => {
    try {
        const response = await axios.post('https://accept.paymob.com/api/auth/tokens', {
            api_key: process.env.PAYMOB_API_KEY
        });
        return response.data.token; // Store this token to use in other requests
    } catch (error) {
        console.error("Error fetching Paymob token: ", error);
    }
};

export const createOrder = async (authToken, userId, amount) => {
    try {
        const response = await axios.post('https://accept.paymob.com/api/ecommerce/orders', {
            amount_cents: amount,
            currency: "EGP",
            items: []
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data.id;
    } catch (error) {
        console.error("Error creating order: ", error.response?.data || error.message);
        throw new Error("Failed to create order");
    }
};

export const getPaymentKey = async (authToken, orderId, amount, billingData) => {
    try {
        const response = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
            amount_cents: amount,
            currency: "EGP",
            order_id: orderId,
            integration_id: process.env.PAYMOB_INTEGRATION_ID,
            billing_data: billingData
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data.token;
    } catch (error) {
        console.error("Error fetching payment key: ", error.response?.data || error.message);
        throw new Error("Failed to fetch payment key");
    }
};