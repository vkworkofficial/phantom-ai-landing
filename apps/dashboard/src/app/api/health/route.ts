import { NextResponse } from 'next/server';

export async function GET() {
  const startTime = Date.now();
  
  // Check core engine connectivity
  let engineStatus = 'unreachable';
  let engineLatency = -1;
  
  try {
    const engineUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const engineStart = Date.now();
    const res = await fetch(`${engineUrl}/health`, { 
      signal: AbortSignal.timeout(3000),
      cache: 'no-store' 
    });
    engineLatency = Date.now() - engineStart;
    
    if (res.ok) {
      const data = await res.json();
      engineStatus = data.status || 'ok';
    } else {
      engineStatus = `error_${res.status}`;
    }
  } catch (e) {
    engineStatus = 'unreachable';
  }

  return NextResponse.json({
    status: 'ok',
    service: 'Phantom Dashboard',
    version: process.env.npm_package_version || '0.1.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime_ms: Date.now() - startTime,
    dependencies: {
      core_engine: {
        status: engineStatus,
        latency_ms: engineLatency,
      },
      auth: {
        provider: 'next-auth',
        configured: !!(process.env.NEXTAUTH_SECRET),
      },
      database: {
        configured: !!(process.env.DATABASE_URL),
      },
    },
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
