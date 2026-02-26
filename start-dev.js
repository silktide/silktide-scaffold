const net = require('net');
const { spawn } = require('child_process');

// Pick a random available port for the backend so multiple apps
// in the same container don't fight over port 4000.
const server = net.createServer();
server.listen(0, '127.0.0.1', () => {
  const backendPort = server.address().port;
  server.close(() => {
    const env = { ...process.env, BACKEND_PORT: String(backendPort) };
    const child = spawn(
      'sh',
      ['-c', 'npm run dev -w backend & npm run dev -w frontend & wait'],
      { stdio: 'inherit', env }
    );
    child.on('exit', (code) => process.exit(code || 0));
  });
});
