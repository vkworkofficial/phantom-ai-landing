import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const CORE_ENGINE_URL = process.env.CORE_ENGINE_URL || process.env.NEXT_PUBLIC_CORE_ENGINE_URL || 'http://127.0.0.1:8000';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const body = await req.json();

    // Map num_instances from dashboard to num_ghosts for core engine
    const payload = {
      ...body,
      num_ghosts: body.num_instances || body.num_ghosts || 50,
      organization_id: body.organization_id || (session?.user as any)?.organization_id || 'org-phantom-core'
    };

    const response = await fetch(`${CORE_ENGINE_URL}/api/v1/simulations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Simulation proxy error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const url = id 
      ? `${CORE_ENGINE_URL}/api/v1/simulations/${id}`
      : `${CORE_ENGINE_URL}/api/v1/simulations/`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Simulation fetch error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
