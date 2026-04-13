import { Telegram } from "@twa-dev/types"; // Ensure you have the TWA SDK

const createOrder = async (cartItems) => {
  // 1. Configuration (Keep these in an .env file for 'best' practice)
  const BOT_TOKEN = "YOUR_BOT_TOKEN";
  const DELIVERY_CHAT_ID = "YOUR_DELIVERY_GROUP_ID";

  // 2. Data Retrieval from LocalStorage
  const userPhone = localStorage.getItem('user_phone') || "Not Provided";
  const userAddress = localStorage.getItem('user_address') || "Pick up at store";
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user?.username || "Guest";

  // 3. Format Message for the Delivery Man
  const message = `
🚀 *NEW ORDER RECEIVED*
-----------------------
👤 *Customer:* @${tgUser}
📞 *Phone:* ${userPhone}
📍 *Address:* ${userAddress}

🛒 *Items:*
${cartItems.map(item => `- ${item.name} x${item.quantity}`).join('\n')}

💰 *Total:* ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
  `;

  // 4. Direct Fetch to Telegram (The 'Ghost' Backend)
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: DELIVERY_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    if (response.ok) {
       window.Telegram?.WebApp?.showAlert("Order sent to delivery!");
    }
  } catch (error) {
    console.error("Order Failed:", error);
  }
};
