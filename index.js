const { create, Client } = require('@open-wa/wa-automate');

// Fungsi untuk memulai bot WhatsApp
const startBot = async () => {
  try {
    const client = await create({
      // Konfigurasi bot
      sessionId: 'whatsapp-bot-session',
      authTimeout: 60, // Durasi autentikasi dalam detik, default: 60
      qrTimeout: 0, // Tidak ada timeout untuk QR code
      blockCrashLogs: true, // Menonaktifkan logging crash
      headless: true // Menjalankan headless (tanpa UI browser)
    });

    // Event ketika bot berhasil terhubung
    client.onStateChanged((state) => {
      console.log('State changed:', state);
      if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus();
    });

    // Event ketika bot menerima pesan baru
    client.onMessage(async (message) => {
      console.log('Pesan baru diterima:', message.body);

      // Tangani perintah /start
      if (message.body.toLowerCase() === '/start') {
        await client.sendText(message.from, 'Halo! Terima kasih telah memulai percakapan dengan bot ini.');
      }

      // Handle pesan sesuai kebutuhan Anda
    });

    console.log('Bot WhatsApp siap digunakan.');

  } catch (error) {
    console.error('Error:', error);
  }
};

// Jalankan fungsi untuk memulai bot
startBot();
