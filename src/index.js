const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  register() {},
  bootstrap({ strapi }) {
    const server = strapi.server.httpServer;
    if (!server) {
      console.error("HTTP server is not available.");
      return;
    }

    const wss = new WebSocket.Server({ server });
    const clients = new Map();

    wss.on("connection", (ws) => {
      const socketId = uuidv4();
      clients.set(socketId, ws);

      console.log(`New WebSocket connection established. socketId=${socketId}`);

      ws.send(JSON.stringify({ type: "connection", socketId }));

      ws.on("message", (message) => {
        try {
          const data = JSON.parse(message);

          if (data.type === "auth") {
            console.log(`Authentication token received for socketId=${socketId}:`, data.token);

          } else if (data.type === "chat") {
            console.log(`Received chat message from socketId=${socketId}:`, data.message);

            const clientSocket = clients.get(socketId);
            if (clientSocket && clientSocket.readyState === WebSocket.OPEN) {
              clientSocket.send(
                JSON.stringify({
                  type: "chat",
                  socketId,
                  message: data.message,
                })
              );
            }
          }
        } catch (error) {
          console.error("Invalid message format:", error);
        }
      });

      ws.on("close", (code, reason) => {
        console.log(`WebSocket closed: socketId=${socketId}, code=${code}, reason=${reason}`);
        clients.delete(socketId);
      });

      ws.on("error", (error) => {
        console.error(`WebSocket error for socketId=${socketId}:`, error);
        clients.delete(socketId);
      });
    });

    console.log("WebSocket server is running...");
  },
};
