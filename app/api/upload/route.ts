import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://127.0.0.1:8000/api'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = (formData.get('file') || formData.get('image')) as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    // 1. Try Laravel API Upload if available
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const res = await fetch(`${LARAVEL_API_URL}/upload`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (res.ok) {
        const data = await res.json()
        if (data && (data.url || data.path)) {
          return NextResponse.json({
            success: true,
            url: data.url || data.path,
          })
        }
      }
    } catch (laravelErr) {
      console.warn('Laravel upload unreachable or failed, switching to local disk storage fallback.')
    }

    // 2. Reliable Local Disk Storage Fallback (public/uploads/)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const fileExt = path.extname(file.name) || '.png'
    const cleanBase = path.basename(file.name, fileExt).replace(/[^a-zA-Z0-9_-]/g, '_')
    const fileName = `upload_${Date.now()}_${cleanBase}${fileExt}`
    const filePath = path.join(uploadsDir, fileName)

    await fs.promises.writeFile(filePath, buffer)

    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({
      success: true,
      url: fileUrl,
      path: fileUrl,
    })
  } catch (error: any) {
    console.error('Upload Error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Upload failed' }, { status: 500 })
  }
}
