import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const apiUrl = 'https://api.shaebscakes.com/image-library-urls';
    const response = await fetch(apiUrl);
        
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
        
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching image library:', error);
    return NextResponse.json({ error: 'Failed to fetch image library' }, { status: 500 });
  }
}