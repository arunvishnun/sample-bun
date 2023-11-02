"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _fastify = /*#__PURE__*/ _interop_require_default(require("fastify"));
const _static = /*#__PURE__*/ _interop_require_default(require("@fastify/static"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _url = require("url");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// __dirname is not defined in ES modules, so we need to create it
const __filename1 = (0, _url.fileURLToPath)(require("url").pathToFileURL(__filename).toString());
const dirName = _path.default.dirname(__filename1);
const server = (0, _fastify.default)({
    logger: true
});
// Register the fastify-static plugin to serve static files from the 'dist' directory
server.register(_static.default, {
    root: _path.default.join(dirName, '../../dist'),
    prefix: '/'
});
// Catch-all route for handling SPA routing - serve index.html
server.setNotFoundHandler((request, reply)=>{
    // Only serve index.html for GET requests
    if (request.method === 'GET') {
        const indexPath = _path.default.join(dirName, '../../dist', 'index.html');
        reply.type('text/html').sendFile(indexPath);
    } else {
        reply.status(405).send('Method Not Allowed');
    }
});
// Start the server
const start = async ()=>{
    try {
        // Listen on all network interfaces on port 3000
        await server.listen({
            port: 3000,
            host: '0.0.0.0'
        });
        console.log(`Server listening on ${server.server.address().port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
