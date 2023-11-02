import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname is not defined in ES modules, so we need to create it
const __filename = fileURLToPath(import.meta.url);
const dirName = path.dirname(__filename);

const server = Fastify({ logger: true });

// Register the fastify-static plugin to serve static files from the 'dist' directory
server.register(fastifyStatic, {
  root: path.join(dirName, '../../dist'), // Adjust if your directory structure is different
  prefix: '/', // Serve static assets at root
});

// Catch-all route for handling SPA routing - serve index.html
server.setNotFoundHandler((request, reply) => {
  // Only serve index.html for GET requests
  if (request.method === 'GET') {
    const indexPath = path.join(dirName, '../../dist', 'index.html');
    reply.type('text/html').sendFile(indexPath);
  } else {
    reply.status(405).send('Method Not Allowed');
  }
});

// Start the server
const start = async () => {
  try {
    // Listen on all network interfaces on port 3000
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server listening on ${server.server.address().port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
