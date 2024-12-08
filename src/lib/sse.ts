// lib/sse.ts

let clients: Array<WritableStreamDefaultWriter> = [];

// Register a new client
export const registerClient = (writer: WritableStreamDefaultWriter) => {
    clients.push(writer);
};

// Unregister a client
export const unregisterClient = (writer: WritableStreamDefaultWriter) => {
    clients = clients.filter(client => client !== writer);
};

// Send an event to all clients
export const sendEvent = (eventType: string, data: any) => {
    for (const client of clients) {
        client.write(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`);
    }
};
