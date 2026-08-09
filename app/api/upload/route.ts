import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure the filename is safe and unique
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    const filepath = path.join(uploadDir, filename)

    // Write the file to the public directory
    await writeFile(filepath, buffer)

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    })
  } catch (error) {
    console.error('Upload Error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}
