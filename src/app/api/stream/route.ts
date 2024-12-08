// src/app/api/stream/route.ts
import { NextResponse } from 'next/server';
import { registerClient, unregisterClient } from '@/lib/sse';

export async function GET(req: Request) {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    // Register the client to start receiving events
    registerClient(writer);

    // Cleanup when the request is aborted or closed
    req.signal.addEventListener('abort', () => {
        unregisterClient(writer);
    });

    // Return the readable stream with appropriate headers for SSE
    return new NextResponse(readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Transfer-Encoding': 'chunked',
        },
    });
}
