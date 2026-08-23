import { NextResponse } from 'next/server'

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://127.0.0.1:8000/api'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const res = await fetch(`${LARAVEL_API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const errText = await res.text()
      return NextResponse.json({ success: false, error: errText }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Upload Proxy Error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}
