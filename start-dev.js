const net = require('net');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const ROOT = __dirname;

function setup() {
  const envPath = path.join(ROOT, '.env');
  const envExamplePath = path.join(ROOT, '.env.example');

  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('[setup] Created .env from .env.example');
  }

  const prismaOutputDir = path.join(ROOT, 'backend', 'src', 'generated', 'prisma');
  if (!fs.existsSync(prismaOutputDir)) {
    console.log('[setup] Generating Prisma client...');
    execSync('pnpm --filter backend db:generate', { stdio: 'inherit', cwd: ROOT });
  }
}

setup();

// Pick a random available port for the backend so multiple apps
// in the same container don't fight over port 4000.
const server = net.createServer();
server.listen(0, '127.0.0.1', () => {
  const backendPort = server.address().port;
  server.close(() => {
    const env = { ...process.env, BACKEND_PORT: String(backendPort) };
    const child = spawn(
      'sh',
      ['-c', 'pnpm --filter backend dev & pnpm --filter frontend dev & wait'],
      { stdio: 'inherit', env }
    );
    child.on('exit', (code) => process.exit(code || 0));
  });
});
