import React, { useRef, useState } from 'react'
import { ImageIcon, Plus, Trash2, Settings, Layout, UploadCloud } from 'lucide-react'

export function CategoryShowcaseEditor({ data, onChange, onUpload }: any) {
  const categories = data.categories || []

  const updateCategory = (idx: number, key: string, value: any) => {
    const newCats = [...categories]
    newCats[idx] = { ...newCats[idx], [key]: value }
    onChange('categories', newCats)
  }

  const addCategory = () => {
    onChange('categories', [...categories, { title: 'New Service', subtitle: '', description: '', image: '' }])
  }

  const removeCategory = (idx: number) => {
    onChange('categories', categories.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Label (Orange text)</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
      </div>

      {/* Array Editor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Services List</h3>
          <button onClick={addCategory} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
        
        {categories.map((cat: any, idx: number) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
             <button onClick={() => removeCategory(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
               <Trash2 className="w-4 h-4" />
             </button>
             <h4 className="font-bold text-slate-800">Service {idx + 1}</h4>
             
             <div className="flex gap-6">
                <div className="w-48 h-32 rounded-xl bg-slate-100 border border-gray-200 overflow-hidden flex items-center justify-center relative">
                  {cat.image ? <img src={cat.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-300" />}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                     <label className="cursor-pointer text-white text-xs font-bold bg-slate-900/50 px-3 py-1.5 rounded">
                       Upload
                       <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                         if(e.target.files?.[0]) {
                           const url = await onUpload(e.target.files[0])
                           updateCategory(idx, 'image', url)
                         }
                       }} />
                     </label>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                      <input type="text" value={cat.title || ''} onChange={(e) => updateCategory(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Subtitle</label>
                      <input type="text" value={cat.subtitle || ''} onChange={(e) => updateCategory(idx, 'subtitle', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                    <textarea value={cat.description || ''} onChange={(e) => updateCategory(idx, 'description', e.target.value)} rows={2} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                  </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function UniformSolutionsEditor({ data, onChange, onUpload }: any) {
  const uniforms = data.uniforms || []

  const updateUniform = (idx: number, key: string, value: any) => {
    const newUnifs = [...uniforms]
    newUnifs[idx] = { ...newUnifs[idx], [key]: value }
    onChange('uniforms', newUnifs)
  }

  const addUniform = () => {
    onChange('uniforms', [...uniforms, { title: 'New Uniform', desc: '', image: '', iconName: '' }])
  }

  const removeUniform = (idx: number) => {
    onChange('uniforms', uniforms.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Label (Orange text)</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Uniform Categories List</h3>
          <button onClick={addUniform} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Uniform
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {uniforms.map((unif: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
               <button onClick={() => removeUniform(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg z-10">
                 <Trash2 className="w-4 h-4" />
               </button>
               
               <div className="w-full h-32 rounded-xl bg-slate-100 border border-gray-200 overflow-hidden flex items-center justify-center relative">
                 {unif.image ? <img src={unif.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-300" />}
                 <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <label className="cursor-pointer text-white text-xs font-bold bg-slate-900/50 px-3 py-1.5 rounded">
                      Upload Image
                      <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                        if(e.target.files?.[0]) {
                          const url = await onUpload(e.target.files[0])
                          updateUniform(idx, 'image', url)
                        }
                      }} />
                    </label>
                 </div>
               </div>
               
               <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                 <input type="text" value={unif.title || ''} onChange={(e) => updateUniform(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                 <textarea value={unif.desc || ''} onChange={(e) => updateUniform(idx, 'desc', e.target.value)} rows={2} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Icon Identifier (e.g. Briefcase)</label>
                 <input type="text" value={unif.iconName || ''} onChange={(e) => updateUniform(idx, 'iconName', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function OurWorkEditor({ data, onChange, onUpload }: any) {
  const projects = data.projects || data.images || []

  const updateProject = (idx: number, key: string, value: any) => {
    const newProjs = [...projects]
    newProjs[idx] = { ...newProjs[idx], [key]: value }
    onChange('projects', newProjs)
  }

  const addProject = () => {
    onChange('projects', [...projects, { client: 'Client Name', title: 'Project Title', category: 'Category', image: '', caption: '' }])
  }

  const removeProject = (idx: number) => {
    onChange('projects', projects.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Portfolio Projects List</h3>
          <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
               <button onClick={() => removeProject(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg z-10">
                 <Trash2 className="w-4 h-4" />
               </button>
               
               <div className="w-full h-40 rounded-xl bg-slate-100 border border-gray-200 overflow-hidden flex items-center justify-center relative group">
                 {(proj.image || proj.url) ? <img src={proj.image || proj.url} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-300" />}
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <label className="cursor-pointer text-white text-xs font-bold bg-[#DE7B3D] hover:bg-[#C96A30] px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4" /> Upload Image File
                      <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                        if(e.target.files?.[0]) {
                          const url = await onUpload(e.target.files[0])
                          updateProject(idx, 'image', url)
                        }
                      }} />
                    </label>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Client Name</label>
                   <input type="text" value={proj.client || ''} onChange={(e) => updateProject(idx, 'client', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="Sharaf DG" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                   <input type="text" value={proj.category || ''} onChange={(e) => updateProject(idx, 'category', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="Corporate Uniforms" />
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Project Title</label>
                 <input type="text" value={proj.title || ''} onChange={(e) => updateProject(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="Retail Staff Uniforms" />
               </div>

               <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Caption / Description</label>
                 <input type="text" value={proj.caption || ''} onChange={(e) => updateProject(idx, 'caption', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WhySilkyEditor({ data, onChange }: any) {
  const points = data.points || [
    { title: 'Established in 1963', desc: 'Over six decades of master tailoring heritage in Dubai, specializing in custom suiting and enterprise textile supply.' },
    { title: '24-Hour Express Service', desc: 'Rapid express suiting and garment alterations for urgent corporate events, summits, and tight deadlines.' },
    { title: 'Bulk Uniform Production', desc: 'In-house embroidery and garment production facilities capable of delivering large corporate uniform orders across the UAE.' },
    { title: 'Deira Creek Showroom', desc: 'Visit our physical showroom on Baniyas Road in Deira Creek to view fabric swatches and meet our master tailors.' }
  ]

  const updatePoint = (idx: number, key: string, value: any) => {
    const newPoints = [...points]
    newPoints[idx] = { ...newPoints[idx], [key]: value }
    onChange('points', newPoints)
  }

  const addPoint = () => {
    onChange('points', [...points, { title: 'New Advantage', desc: '' }])
  }

  const removePoint = (idx: number) => {
    onChange('points', points.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Label (Orange text)</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="DUBAI TAILORING & UNIFORM ADVANTAGE" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Why Leading UAE Businesses Choose Silky" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Key Advantages List</h3>
          <button onClick={addPoint} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Advantage
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((pt: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removePoint(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-slate-800">Advantage {idx + 1}</h4>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                <input type="text" value={pt.title || ''} onChange={(e) => updatePoint(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                <textarea value={pt.desc || ''} onChange={(e) => updatePoint(idx, 'desc', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProcessEditor({ data, onChange }: any) {
  const steps = data.steps || [
    { step: '01', title: 'Consultation & Fabrics', desc: 'Fabric selection from Italian wools & Egyptian cottons, clear specification, and transparent quotation.' },
    { step: '02', title: 'Measurement & Design', desc: 'On-site measurement fitting by master tailors, pattern cutting, and sample approval.' },
    { step: '03', title: 'Production & Embroidery', desc: 'Precision cutting, expert hand-stitching, and high-density computer logo embroidery.' },
    { step: '04', title: 'Inspection & Delivery', desc: 'Quality control, steam pressing, and doorstep delivery across Dubai and all UAE Emirates.' }
  ]

  const updateStep = (idx: number, key: string, value: any) => {
    const newSteps = [...steps]
    newSteps[idx] = { ...newSteps[idx], [key]: value }
    onChange('steps', newSteps)
  }

  const addStep = () => {
    const nextStepNum = String(steps.length + 1).padStart(2, '0')
    onChange('steps', [...steps, { step: nextStepNum, title: 'New Process Step', desc: '' }])
  }

  const removeStep = (idx: number) => {
    onChange('steps', steps.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header & CTA</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Section Label</label>
            <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="HOW WE WORK" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Button Text</label>
            <input type="text" value={data.ctaText || ''} onChange={(e) => onChange('ctaText', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Request Consultation" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Our Four-Step Tailoring & Order Process" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Process Steps List</h3>
          <button onClick={addStep} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Step
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((st: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeStep(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold bg-amber-50 text-[#DE7B3D] px-2.5 py-1 rounded-md border border-[#DE7B3D]/20">Step {st.step || `0${idx + 1}`}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Step No.</label>
                  <input type="text" value={st.step || ''} onChange={(e) => updateStep(idx, 'step', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-mono" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                  <input type="text" value={st.title || ''} onChange={(e) => updateStep(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                <textarea value={st.desc || ''} onChange={(e) => updateStep(idx, 'desc', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsEditor({ data, onChange }: any) {
  const testimonials = data.testimonials || [
    { quote: "Reliable supplier for our hotel uniform requirements in Dubai. Timely delivery and durable fabric stitching.", role: "Procurement Director", company: "Luxury Hospitality Group, Dubai" },
    { quote: "Express tailoring team completed 40 custom executive suits within 48 hours for our summit delegation.", role: "Operations Manager", company: "Corporate Enterprise, DIFC Dubai" },
    { quote: "High-visibility safety vests and high-quality cotton coveralls supplied with precise logo embroidery.", role: "Safety & HSE Lead", company: "Construction & Engineering Firm, UAE" }
  ]

  const updateTestimonial = (idx: number, key: string, value: any) => {
    const newTestimonials = [...testimonials]
    newTestimonials[idx] = { ...newTestimonials[idx], [key]: value }
    onChange('testimonials', newTestimonials)
  }

  const addTestimonial = () => {
    onChange('testimonials', [...testimonials, { quote: '', role: 'Client', company: 'Company' }])
  }

  const removeTestimonial = (idx: number) => {
    onChange('testimonials', testimonials.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="CLIENT FEEDBACK" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="What Our B2B & Corporate Partners Say" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Testimonials List</h3>
          <button onClick={addTestimonial} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative flex flex-col justify-between">
              <button onClick={() => removeTestimonial(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-500">Quote / Review</label>
                <textarea value={t.quote || ''} onChange={(e) => updateTestimonial(idx, 'quote', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white italic" placeholder="Enter review quote..." />
              </div>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Role / Designation</label>
                  <input type="text" value={t.role || ''} onChange={(e) => updateTestimonial(idx, 'role', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Company / Organization</label>
                  <input type="text" value={t.company || ''} onChange={(e) => updateTestimonial(idx, 'company', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ContactBandEditor({ data, onChange }: any) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Showroom Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="DUBAI SHOWROOM & HEADQUARTERS" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Visit Our Deira Creek Showroom" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Address & Contact Information</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Showroom Building Title</label>
          <input type="text" value={data.addressTitle || ''} onChange={(e) => onChange('addressTitle', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Showroom No. 1, Al Zarooni Building" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Full Address Detail</label>
          <input type="text" value={data.addressDetail || ''} onChange={(e) => onChange('addressDetail', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Phone Numbers</label>
            <input type="text" value={data.phone || ''} onChange={(e) => onChange('phone', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono" placeholder="+971 4 226 1050 / +971 4 294 6754" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Sales Email Address</label>
            <input type="email" value={data.email || ''} onChange={(e) => onChange('email', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono" placeholder="sales@silky.ae" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Product Page Specific Editors
export function SpecsMatrixEditor({ data, onChange }: any) {
  const specs = data.specs || []

  const updateSpec = (idx: number, key: string, value: any) => {
    const newSpecs = [...specs]
    newSpecs[idx] = { ...newSpecs[idx], [key]: value }
    onChange('specs', newSpecs)
  }

  const addSpec = () => {
    onChange('specs', [...specs, { title: 'New Feature', value: 'Value Detail', desc: 'Description of benefit...' }])
  }

  const removeSpec = (idx: number) => {
    onChange('specs', specs.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="WHY CHOOSE OUR PURE COTTON SHIRTS?" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="Key Fabric Features & Benefits" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Subtitle</label>
          <textarea value={data.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} rows={2} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="Section subtitle description..." />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Technical Specifications Matrix ({specs.length})</h3>
          <button onClick={addSpec} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Spec Card
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specs.map((spec: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeSpec(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-slate-800 text-sm">Spec #{idx + 1}</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Feature Title</label>
                  <input type="text" value={spec.title || ''} onChange={(e) => updateSpec(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Value / Metric Callout</label>
                  <input type="text" value={spec.value || ''} onChange={(e) => updateSpec(idx, 'value', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                  <textarea value={spec.desc || ''} onChange={(e) => updateSpec(idx, 'desc', e.target.value)} rows={2} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FaqEditor({ data, onChange }: any) {
  const faqs = data.faqs || []

  const updateFaq = (idx: number, key: string, value: any) => {
    const newFaqs = [...faqs]
    newFaqs[idx] = { ...newFaqs[idx], [key]: value }
    onChange('faqs', newFaqs)
  }

  const addFaq = () => {
    onChange('faqs', [...faqs, { q: 'New Frequently Asked Question?', a: 'Detailed answer response...' }])
  }

  const removeFaq = (idx: number) => {
    onChange('faqs', faqs.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">FAQ Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="FREQUENTLY ASKED QUESTIONS" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="Frequently Asked Questions" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">FAQ Accordion Items ({faqs.length})</h3>
          <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeFaq(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-slate-800 text-sm">FAQ #{idx + 1}</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Question</label>
                  <input type="text" value={faq.q || ''} onChange={(e) => updateFaq(idx, 'q', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Answer</label>
                  <textarea value={faq.a || ''} onChange={(e) => updateFaq(idx, 'a', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FabricSwatchesEditor({ data, onChange }: any) {
  const swatches = data.swatches || []

  const updateSwatch = (idx: number, key: string, value: any) => {
    const newSwatches = [...swatches]
    newSwatches[idx] = { ...newSwatches[idx], [key]: value }
    onChange('swatches', newSwatches)
  }

  const addSwatch = () => {
    onChange('swatches', [...swatches, { name: 'New Color Swatch', color: '#DE7B3D', desc: '100% Cotton Color Swatch' }])
  }

  const removeSwatch = (idx: number) => {
    onChange('swatches', swatches.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="FABRIC WEAVES & COLOR SELECTION" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="Explore Available Colors & Weaves" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Color Swatches List ({swatches.length})</h3>
          <button onClick={addSwatch} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Swatch
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {swatches.map((swatch: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeSwatch(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-slate-800 text-sm">Swatch #{idx + 1}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="color" value={swatch.color || '#DE7B3D'} onChange={(e) => updateSwatch(idx, 'color', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0 shadow-sm" />
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Color Name</label>
                    <input type="text" value={swatch.name || ''} onChange={(e) => updateSwatch(idx, 'name', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Description / Composition</label>
                  <input type="text" value={swatch.desc || ''} onChange={(e) => updateSwatch(idx, 'desc', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function QualityControlEditor({ data, onChange, onUpload }: any) {
  const steps = data.steps || []

  const updateStep = (idx: number, key: string, value: any) => {
    const newSteps = [...steps]
    newSteps[idx] = { ...newSteps[idx], [key]: value }
    onChange('steps', newSteps)
  }

  const addStep = () => {
    onChange('steps', [...steps, { step: steps.length + 1, title: 'New Quality Stage', shortDesc: 'Short summary...', fullDesc: 'Detailed inspection protocol...', metric: '100% Verified', image: '/images/hotel_uniform_luxury.png' }])
  }

  const removeStep = (idx: number) => {
    onChange('steps', steps.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Quality Process Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="ISO 9001:2015 CERTIFIED MANUFACTURING" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="4-Step Quality Assurance Process" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Process Stages ({steps.length})</h3>
          <button onClick={addStep} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Stage
          </button>
        </div>

        <div className="space-y-6">
          {steps.map((st: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeStep(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-slate-800 text-sm">Stage {idx + 1}: {st.title || 'Untitled'}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Stage Title</label>
                  <input type="text" value={st.title || ''} onChange={(e) => updateStep(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Metric Callout</label>
                  <input type="text" value={st.metric || ''} onChange={(e) => updateStep(idx, 'metric', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="e.g. < 1% Residual Shrinkage" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Short Description</label>
                <input type="text" value={st.shortDesc || ''} onChange={(e) => updateStep(idx, 'shortDesc', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Full Detailed Protocol Description</label>
                <textarea value={st.fullDesc || ''} onChange={(e) => updateStep(idx, 'fullDesc', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BulkPricingEditor({ data, onChange }: any) {
  const tiers = data.tiers || []

  const updateTier = (idx: number, key: string, value: any) => {
    const newTiers = [...tiers]
    newTiers[idx] = { ...newTiers[idx], [key]: value }
    onChange('tiers', newTiers)
  }

  const addTier = () => {
    onChange('tiers', [...tiers, { title: 'New Tier', range: '100 - 299 Pcs', badge: '15% OFF', desc: 'Bulk discount tier description...', highlighted: false }])
  }

  const removeTier = (idx: number) => {
    onChange('tiers', tiers.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Wholesale Tiers Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="WHOLESALE & BULK DISCOUNTS" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="Wholesale Volume Discount Tiers" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Volume Discount Tiers ({tiers.length})</h3>
          <button onClick={addTier} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Pricing Tier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative flex flex-col justify-between">
              <button onClick={() => removeTier(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-slate-800 text-sm">Tier #{idx + 1}</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Tier Name</label>
                  <input type="text" value={tier.title || ''} onChange={(e) => updateTier(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Quantity Range</label>
                  <input type="text" value={tier.range || ''} onChange={(e) => updateTier(idx, 'range', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="50 - 199 Pcs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Discount Badge</label>
                  <input type="text" value={tier.badge || ''} onChange={(e) => updateTier(idx, 'badge', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="STANDARD BULK" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                  <textarea value={tier.desc || ''} onChange={(e) => updateTier(idx, 'desc', e.target.value)} rows={2} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LogisticsEditor({ data, onChange }: any) {
  const routes = data.routes || []

  const updateRoute = (idx: number, key: string, value: any) => {
    const newRoutes = [...routes]
    newRoutes[idx] = { ...newRoutes[idx], [key]: value }
    onChange('routes', newRoutes)
  }

  const addRoute = () => {
    onChange('routes', [...routes, { hub: 'New Logistics Hub', status: 'Express Delivery Available', time: '24-48 Hours', badge: 'EXPRESS' }])
  }

  const removeRoute = (idx: number) => {
    onChange('routes', routes.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Logistics Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="EXPRESS LOGISTICS & UAE COVERAGE" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="Rapid Delivery Across All 7 Emirates" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Dispatch Hubs & Routes ({routes.length})</h3>
          <button onClick={addRoute} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
            <Plus className="w-4 h-4" /> Add Logistics Route
          </button>
        </div>

        <div className="space-y-4">
          {routes.map((rt: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeRoute(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-slate-800 text-sm">Route #{idx + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Hub Name</label>
                  <input type="text" value={rt.hub || ''} onChange={(e) => updateRoute(idx, 'hub', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Transit Time Window</label>
                  <input type="text" value={rt.time || ''} onChange={(e) => updateRoute(idx, 'time', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Badge Tag</label>
                  <input type="text" value={rt.badge || ''} onChange={(e) => updateRoute(idx, 'badge', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

