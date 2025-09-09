import net from 'net';

export default async function handler(req, res) {
  const client = new net.Socket();
  client.setTimeout(5000); // 5 seconds timeout

  client.connect(5432, 'db.zkessgtdajfbpoiwdpev.supabase.co', () => {
    client.destroy();
    res.status(200).json({ message: '✅ TCP Connection to Supabase succeeded!' });
  });

  client.on('error', (err) => {
    res.status(500).json({ message: '❌ TCP Connection failed', error: err.message });
  });

  client.on('timeout', () => {
    res.status(500).json({ message: '❌ TCP Connection timed out' });
    client.destroy();
  });
}
