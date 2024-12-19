// Fungsi untuk membuka/menutup jendela live chat
function toggleChatWindow() {
    const chatWindow = document.getElementById('chat-window');
    const livechatButton = document.getElementById('livechat-button');
    
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
      chatWindow.style.display = 'flex';
      livechatButton.style.display = 'none'; // Sembunyikan tombol Livechat saat chat terbuka
    } else {
      chatWindow.style.display = 'none';
      livechatButton.style.display = 'block'; // Tampilkan tombol Livechat saat chat ditutup
    }
  }
  
  // Fungsi untuk menangani input pengguna
  function handleInput(event) {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
  
    // Jika pengguna menekan enter, kirim pesan
    if (event.key === 'Enter' && message) {
      sendMessage();
    }
  }
  
  // Fungsi untuk mengirim pesan dari pengguna
  function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
  
    if (!message) return;
  
    // Menampilkan pesan pengguna
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user');
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
  
    // Mengirim balasan otomatis dari bot
    setTimeout(() => {
      const botMessage = document.createElement('div');
      botMessage.classList.add('chat-message', 'bot');
      botMessage.textContent = "Thank you for your message. How can I help you further?";
      chatMessages.appendChild(botMessage);
      
      // Scroll ke bawah setelah pesan baru
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  
    // Kosongkan input setelah mengirim pesan
    inputField.value = '';
    inputField.focus();
  
    // Scroll ke bawah setelah pesan baru
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  