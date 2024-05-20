import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('_id');
  if (!id) {
    return new Response('Missing _id parameter', { status: 400 });
  }
  try {
    const client = await clientPromise;
    const db = client.db('ccbin');
    const result = await db
      .collection('pastes')
      .findOne({ _id: new ObjectId(id) });
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  if (!payload) {
    return new Response('Missing content', { status: 400 });
  }
  try {
    const client = await clientPromise;
    const db = client.db('ccbin');
    const document = {
      ...payload,
      expiryDate: payload.expiryDate
        ? new Date(payload.expiryDate)
        : new Date(Date.now() + 1 * (60 * 60 * 1000)), // Convert user-provided expiry date to Date object
    };
    const result = await db.collection('pastes').insertOne(document);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
