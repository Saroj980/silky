import React, { useRef, useState } from 'react'
import { ImageIcon, Plus, Trash2, Settings, Layout, UploadCloud, Star } from 'lucide-react'

export function CategoryShowcaseEditor({ data, onChange, onUpload }: any) {
  const defaultCategories = [
    {
      title: 'Executive & Corporate Suiting',
      category: 'Corporate Identity',
      subtitle: 'Corporate Identity',
      description: 'Bespoke executive suits, blazers, dress shirts, and tailored corporate attire designed for boardrooms, luxury fleets, and financial institutions.',
      image: '/images/hero_luxury_uniforms.png',
      badge: 'Super 150s Wool',
    },
    {
      title: 'Hospitality & 5-Star Hotel Wear',
      category: 'Luxury Hotels & Resorts',
      subtitle: 'Luxury Hotels & Resorts',
      description: 'Ergonomic chef coats, aprons, front-desk waistcoats, and housekeeping uniforms crafted for premier UAE hotels & fine dining.',
      image: '/images/category_hospitality.png',
      badge: 'Hot Sector',
    },
    {
      title: 'Healthcare & Clinical Wear',
      category: 'Medical & Wellness',
      subtitle: 'Medical & Wellness',
      description: 'Antimicrobial medical scrubs, lab coats, and clinic staff uniforms engineered for durability, comfort, and professional hygiene.',
      image: '/images/sector_healthcare.png',
      badge: 'Antimicrobial',
    },
    {
      title: 'Fine Textiles & In-House Embroidery',
      category: 'Bespoke Fabric Sourcing',
      subtitle: 'Bespoke Fabric Sourcing',
      description: 'Direct importer of Italian Super wool blends, 100% Egyptian cottons, linen blends, and 3D high-density brand logo embroidery.',
      image: '/images/hero_textile_sourcing.png',
      badge: 'Mill Direct',
    },
  ]

  const rawCats = (data.categories && Array.isArray(data.categories) && data.categories.length > 0)
    ? data.categories
    : (data.items && Array.isArray(data.items) && data.items.length > 0)
    ? data.items
    : null

  const categories = rawCats || defaultCategories

  const updateCategory = (idx: number, key: string, value: any) => {
    const newCats = [...categories]
    newCats[idx] = { ...newCats[idx], [key]: value }
    if (key === 'subtitle') {
      newCats[idx].category = value
    }
    if (key === 'category') {
      newCats[idx].subtitle = value
    }
    onChange('categories', newCats)
    onChange('items', newCats)
  }

  const addCategory = () => {
    const newCats = [...categories, { title: 'New Service', subtitle: '', description: '', image: '' }]
    onChange('categories', newCats)
    onChange('items', newCats)
  }

  const removeCategory = (idx: number) => {
    const newCats = categories.filter((_: any, i: number) => i !== idx)
    onChange('categories', newCats)
    onChange('items', newCats)
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
          <button onClick={addCategory} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
        
        {categories.map((cat: any, idx: number) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
             <button onClick={() => removeCategory(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer">
               <Trash2 className="w-4 h-4" />
             </button>
             <h4 className="font-bold text-slate-800">Service {idx + 1}</h4>
             
             <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-48 h-32 rounded-xl bg-slate-100 border border-gray-200 overflow-hidden flex items-center justify-center relative shrink-0">
                  {cat.image ? <img src={cat.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-300" />}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                     <label className="cursor-pointer text-white text-xs font-bold bg-[#DE7B3D] hover:bg-[#C96A30] px-3 py-1.5 rounded flex items-center gap-1">
                       <UploadCloud className="w-3.5 h-3.5" /> Upload Image
                       <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Button Text (Optional)</label>
                      <input type="text" value={cat.btnText || ''} onChange={(e) => updateCategory(idx, 'btnText', e.target.value)} placeholder="Request Sector Quote" className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Button Link / URL (Optional)</label>
                      <input type="text" value={cat.btnHref || cat.link || ''} onChange={(e) => { updateCategory(idx, 'btnHref', e.target.value); updateCategory(idx, 'link', e.target.value); }} placeholder="Leave blank for Modal, or /products/..." className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-mono text-slate-700" />
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
  const defaultUniforms = [
    { title: 'Corporate Executives', desc: 'Crisp white & sky blue formal shirts for boardrooms, banks, and DIFC firms.', image: '/homepage-image/Homepage (9).jpg', iconName: 'Briefcase' },
    { title: 'Luxury Hotel Front-Desk', desc: 'Elegant front-desk concierge and waiter shirts for 5-star Dubai resorts.', image: '/homepage-image/Homepage (11).jpg', iconName: 'Hotel' },
    { title: 'Medical Scrubs & Wellness', desc: 'Antimicrobial doctor coats, nursing scrubs, lab gowns, and surgical headwear for UAE clinics.', image: '/homepage-image/Homepage (8).jpg', iconName: 'Stethoscope' },
    { title: 'Construction & Safety Workwear', desc: 'High-visibility safety jackets, heavy-duty coveralls, flame-retardant vests, and site trousers.', image: '/homepage-image/Homepage (6).jpg', iconName: 'HardHat' },
  ]

  const rawList = (data.uniforms && Array.isArray(data.uniforms) && data.uniforms.length > 0)
    ? data.uniforms
    : (data.items && Array.isArray(data.items) && data.items.length > 0)
    ? data.items
    : null

  const uniforms = rawList || defaultUniforms

  const updateUniform = (idx: number, key: string, value: any) => {
    const newUnifs = [...uniforms]
    newUnifs[idx] = { ...newUnifs[idx], [key]: value }
    onChange('uniforms', newUnifs)
    onChange('items', newUnifs)
  }

  const addUniform = () => {
    const newUnifs = [...uniforms, { title: 'New Uniform Sector', desc: '', image: '', iconName: 'Briefcase' }]
    onChange('uniforms', newUnifs)
    onChange('items', newUnifs)
  }

  const removeUniform = (idx: number) => {
    const newUnifs = uniforms.filter((_: any, i: number) => i !== idx)
    onChange('uniforms', newUnifs)
    onChange('items', newUnifs)
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
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Description</label>
          <textarea value={data.description || ''} onChange={(e) => onChange('description', e.target.value)} rows={3} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Silky Textiles manufactures and supplies bespoke commercial uniform collections..." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Header Button Text</label>
            <input type="text" value={data.btnText || ''} onChange={(e) => onChange('btnText', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold" placeholder="Request Bulk Pricing" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Header Button Link / URL</label>
            <input type="text" value={data.btnHref || ''} onChange={(e) => onChange('btnHref', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-slate-700" placeholder="e.g. #contact or /contact" />
          </div>
        </div>
      </div>

      {/* Cards per Screen Selector - Clean & Compact */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-3.5 flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-slate-800">Cards per Screen</span>
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
          {[
            { id: 'auto', label: 'Auto' },
            { id: '3', label: '3 Cards' },
            { id: '4', label: '4 Cards' },
            { id: '5', label: '5 Cards' },
          ].map((opt) => {
            const current = data.columns || data.cardsPerRow || 'auto'
            const isSelected = String(current) === opt.id || (!data.columns && !data.cardsPerRow && opt.id === 'auto')
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange('columns', opt.id)
                  onChange('cardsPerRow', opt.id)
                }}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D97A42] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Uniform Categories List</h3>
          <button onClick={addUniform} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
            <Plus className="w-4 h-4" /> Add Uniform
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uniforms.map((unif: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
               <button onClick={() => removeUniform(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg z-10 cursor-pointer">
                 <Trash2 className="w-4 h-4" />
               </button>
               
               <div className="w-full h-36 rounded-xl bg-slate-100 border border-gray-200 overflow-hidden flex items-center justify-center relative">
                 {unif.image ? <img src={unif.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-300" />}
                 <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <label className="cursor-pointer text-white text-xs font-bold bg-[#DE7B3D] hover:bg-[#C96A30] px-3 py-2 rounded-lg flex items-center gap-1.5 shadow">
                      <UploadCloud className="w-4 h-4" /> Upload Image
                      <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
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
                 <label className="block text-xs font-bold text-slate-500 mb-1">Item Link / URL (Optional)</label>
                 <input type="text" value={unif.link || unif.btnHref || ''} onChange={(e) => { updateUniform(idx, 'link', e.target.value); updateUniform(idx, 'btnHref', e.target.value); }} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-mono text-slate-700" placeholder="e.g. #contact or /products" />
               </div>
               
               {/* Custom Local Vector / Image Icon Upload */}
               <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Custom Icon</label>
                 <div className="flex items-center gap-2">
                   {unif.iconImage ? (
                     <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
                       <img src={unif.iconImage} alt="Icon" className="w-5 h-5 object-contain" />
                       <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">Custom Icon</span>
                       <button type="button" onClick={() => updateUniform(idx, 'iconImage', '')} className="text-red-500 hover:text-red-700 font-bold ml-1">×</button>
                     </div>
                   ) : (
                     <label className="cursor-pointer text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold inline-flex items-center gap-1.5">
                       <UploadCloud className="w-3.5 h-3.5 text-[#D97A42]" />
                       <span>Upload Icon</span>
                       <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
                         if (e.target.files?.[0]) {
                           const url = await onUpload(e.target.files[0])
                           if (url) updateUniform(idx, 'iconImage', url)
                         }
                       }} />
                     </label>
                   )}
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function OurWorkEditor({ data, onChange, onUpload }: any) {
  const defaultProjects = [
    { client: 'DIFC Financial Group', title: 'Corporate Executive Shirting', category: 'Corporate Uniforms', image: '/images/hero_corporate_uniforms.png', caption: 'Custom combed cotton dress shirts with monogrammed cuffs' },
    { client: 'Jumeirah Resort Dubai', title: 'Luxury Hospitality Uniforms', category: 'Hospitality', image: '/images/hotel_uniform_luxury.png', caption: 'Bespoke concierge suits and front-desk waistcoats' },
    { client: 'Emirates Aviation Logistics', title: 'Fleet Workwear & Coveralls', category: 'Workwear', image: '/images/textile_fabric_rolls.png', caption: 'High-durability cotton uniform suits for ground crew' },
  ]

  const rawProjs = (data.projects && Array.isArray(data.projects) && data.projects.length > 0)
    ? data.projects
    : (data.images && Array.isArray(data.images) && data.images.length > 0)
    ? data.images
    : null

  const projects = rawProjs || defaultProjects

  const updateProject = (idx: number, key: string, value: any) => {
    const newProjs = [...projects]
    newProjs[idx] = { ...newProjs[idx], [key]: value }
    onChange('projects', newProjs)
    onChange('images', newProjs)
  }

  const addProject = () => {
    const newProjs = [...projects, { client: 'Client Name', title: 'Project Title', category: 'Category', image: '', caption: '' }]
    onChange('projects', newProjs)
    onChange('images', newProjs)
  }

  const removeProject = (idx: number) => {
    const newProjs = projects.filter((_: any, i: number) => i !== idx)
    onChange('projects', newProjs)
    onChange('images', newProjs)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Header Button Text</label>
            <input type="text" value={data.btnText || ''} onChange={(e) => onChange('btnText', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none font-bold" placeholder="View All Projects" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Header Button Link / URL</label>
            <input type="text" value={data.btnHref || ''} onChange={(e) => onChange('btnHref', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none font-mono text-slate-700" placeholder="e.g. #contact or /projects" />
          </div>
        </div>
      </div>

      {/* Cards per Screen Selector - Clean & Compact */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-3.5 flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-slate-800">Cards per Screen</span>
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
          {[
            { id: 'auto', label: 'Auto' },
            { id: '2', label: '2 Cards' },
            { id: '3', label: '3 Cards' },
            { id: '4', label: '4 Cards' },
          ].map((opt) => {
            const current = data.columns || data.cardsPerRow || 'auto'
            const isSelected = String(current) === opt.id || (!data.columns && !data.cardsPerRow && opt.id === 'auto')
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange('columns', opt.id)
                  onChange('cardsPerRow', opt.id)
                }}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D97A42] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Portfolio Projects List</h3>
          <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
               <button onClick={() => removeProject(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg z-10 cursor-pointer">
                 <Trash2 className="w-4 h-4" />
               </button>
               
               <div className="w-full h-40 rounded-xl bg-slate-100 border border-gray-200 overflow-hidden flex items-center justify-center relative group">
                 {(proj.image || proj.url) ? <img src={proj.image || proj.url} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-300" />}
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <label className="cursor-pointer text-white text-xs font-bold bg-[#DE7B3D] hover:bg-[#C96A30] px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4" /> Upload Image
                      <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
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

export function WhySilkyEditor({ data, onChange, onUpload }: any) {
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
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header & Media</h3>
        
        {/* Main Left Image */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Left Section Image</label>
          <div className="flex items-center gap-6">
            <div className="w-36 h-28 rounded-xl bg-slate-100 border border-gray-200 overflow-hidden flex items-center justify-center relative group shrink-0">
              {data.image ? <img src={data.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-300" />}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <label className="cursor-pointer text-white text-xs font-bold bg-[#DE7B3D] hover:bg-[#C96A30] px-3 py-1.5 rounded flex items-center gap-1 shadow">
                  <UploadCloud className="w-3.5 h-3.5" /> Upload Image
                  <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const url = await onUpload(e.target.files[0])
                      onChange('image', url)
                    }
                  }} />
                </label>
              </div>
            </div>
            <div className="flex-1">
              <input type="text" value={data.image || ''} onChange={(e) => onChange('image', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="/images/craftsmanship_tailoring.png" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Label (Orange text)</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="DUBAI TAILORING & UNIFORM ADVANTAGE" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Why Leading UAE Businesses Choose Silky" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Sub Heading / Narrative Description</label>
          <textarea value={data.description || ''} onChange={(e) => onChange('description', e.target.value)} rows={3} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Since our founding in Dubai in 1963, Silky Textiles has combined..." />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Key Advantages List</h3>
          <button onClick={addPoint} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
            <Plus className="w-4 h-4" /> Add Advantage
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((pt: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removePoint(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer">
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
              
              {/* Custom Icon/Image Upload */}
              {onUpload && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Custom Icon</label>
                  <div className="flex items-center gap-2">
                    {pt.iconImage ? (
                      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
                        <img src={pt.iconImage} alt="Icon" className="w-5 h-5 object-contain" />
                        <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">Uploaded Graphic</span>
                        <button type="button" onClick={() => updatePoint(idx, 'iconImage', '')} className="text-red-500 hover:text-red-700 font-bold ml-1">×</button>
                      </div>
                    ) : (
                      <label className="cursor-pointer text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold inline-flex items-center gap-1.5">
                        <UploadCloud className="w-3.5 h-3.5 text-[#D97A42]" />
                        <span>Upload Image</span>
                        <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
                          if (e.target.files?.[0]) {
                            const url = await onUpload(e.target.files[0])
                            if (url) updatePoint(idx, 'iconImage', url)
                          }
                        }} />
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProcessEditor({ data, onChange, onUpload }: any) {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Section Label</label>
            <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="HOW WE WORK" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Button Text</label>
            <input type="text" value={data.ctaText || data.btnText || ''} onChange={(e) => { onChange('ctaText', e.target.value); onChange('btnText', e.target.value); }} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold" placeholder="Request Consultation" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Button Link / URL</label>
            <input type="text" value={data.ctaHref || data.btnHref || ''} onChange={(e) => { onChange('ctaHref', e.target.value); onChange('btnHref', e.target.value); }} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-slate-700" placeholder="e.g. #contact or /contact" />
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
          <button onClick={addStep} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
            <Plus className="w-4 h-4" /> Add Step
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((st: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeStep(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer">
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
              
              {/* Local Icon/Graphic Upload */}
              {onUpload && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Step Icon</label>
                  <div className="flex items-center gap-2">
                    {st.iconImage ? (
                      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
                        <img src={st.iconImage} alt="Icon" className="w-5 h-5 object-contain" />
                        <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">Custom Icon</span>
                        <button type="button" onClick={() => updateStep(idx, 'iconImage', '')} className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer">×</button>
                      </div>
                    ) : (
                      <label className="cursor-pointer text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold inline-flex items-center gap-1.5">
                        <UploadCloud className="w-3.5 h-3.5 text-[#D97A42]" />
                        <span>Upload Image</span>
                        <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
                          if (e.target.files?.[0]) {
                            const url = await onUpload(e.target.files[0])
                            if (url) updateStep(idx, 'iconImage', url)
                          }
                        }} />
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsEditor({ data, onChange, onUpload }: any) {
  const defaultReviews = [
    {
      quote: "Silky Textiles supplied over 400 executive cotton shirts for our DIFC office staff. The fit and embroidery accuracy exceeded expectations.",
      author: "Tariq Al-Mansoor",
      role: "Corporate Operations Director, DIFC Bank",
      location: "Dubai, UAE",
      rating: 5,
    },
    {
      quote: "The breathability of their 100% Egyptian cotton shirts is unmatched for Dubai's climate. Our hotel front-desk team looks impeccably sharp every day.",
      author: "Elena Rostova",
      role: "Procurement Manager, 5-Star Resort",
      location: "Palm Jumeirah, Dubai",
      rating: 5,
    },
    {
      quote: "Fast turnarounds, excellent stitching, and personalized monogrammed cuffs. We order all our fleet uniforms directly from their Dubai atelier.",
      author: "Khalid Al-Hassani",
      role: "General Manager, Executive Aviation Lounge",
      location: "Abu Dhabi, UAE",
      rating: 5,
    },
    {
      quote: "Durability is key for our valet staff. Even after 100+ industrial washes, the fabric keeps its crisp collar structure without shrinking.",
      author: "Marcus Vance",
      role: "Fleet Operations Manager, Valet Services UAE",
      location: "Dubai & Sharjah",
      rating: 5,
    },
    {
      quote: "Complimentary fabric swatches delivered right to our office, followed by an on-site trial fitting session. Supreme B2B customer service.",
      author: "Sarah Al-Zahra",
      role: "Executive Director, DIFC Wealth Management",
      location: "DIFC, Dubai",
      rating: 5,
    },
  ]

  const testimonials = (data.testimonials && data.testimonials.length > 0)
    ? data.testimonials
    : (data.reviews && data.reviews.length > 0)
    ? data.reviews
    : defaultReviews

  const updateTestimonial = (idx: number, key: string, value: any) => {
    const newTestimonials = [...testimonials]
    newTestimonials[idx] = { ...newTestimonials[idx], [key]: value }
    onChange('testimonials', newTestimonials)
  }

  const addTestimonial = () => {
    onChange('testimonials', [...testimonials, { quote: 'New review quote...', author: 'Client Name', role: 'Role / Designation', location: 'Dubai, UAE', rating: 5 }])
  }

  const removeTestimonial = (idx: number) => {
    onChange('testimonials', testimonials.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="VERIFIED B2B CLIENT REVIEWS" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white font-serif font-bold text-lg" placeholder="Trusted by Corporate & Hotel Fleets Across UAE" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Subtitle / Instruction</label>
          <input type="text" value={data.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="Scroll horizontally or hover to pause the continuous client testimonial ticker." />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Testimonials & Client Reviews ({testimonials.length})</h3>
          <button onClick={addTestimonial} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-[#D97A42]/10 text-[#D97A42] hover:bg-[#D97A42]/20 border border-[#D97A42]/30 transition-all cursor-pointer">
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative flex flex-col justify-between">
              <button onClick={() => removeTestimonial(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-500">Quote / Review</label>
                <textarea value={t.quote || ''} onChange={(e) => updateTestimonial(idx, 'quote', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white italic leading-relaxed" placeholder="Enter review quote..." />
              </div>
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Author Name</label>
                    <input type="text" value={t.author || ''} onChange={(e) => updateTestimonial(idx, 'author', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                      <span>Rating</span>
                    </label>
                    <div className="flex items-center gap-1 bg-slate-50 border border-gray-200 rounded-lg p-1.5 justify-between">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => updateTestimonial(idx, 'rating', star)}
                          className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                          title={`Set rating to ${star} stars`}
                        >
                          <Star 
                            className={`w-4 h-4 ${
                              star <= (t.rating || 5) 
                                ? 'text-amber-400 fill-amber-400' 
                                : 'text-slate-300 fill-slate-100'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Role / Designation</label>
                  <input type="text" value={t.role || ''} onChange={(e) => updateTestimonial(idx, 'role', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Location / City</label>
                  <input type="text" value={t.location || ''} onChange={(e) => updateTestimonial(idx, 'location', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="Dubai, UAE" />
                </div>
                {onUpload && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Author Avatar</label>
                    <div className="flex items-center gap-2">
                      {t.avatar ? (
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
                          <img src={t.avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[100px]">Avatar</span>
                          <button type="button" onClick={() => updateTestimonial(idx, 'avatar', '')} className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer">×</button>
                        </div>
                      ) : (
                        <label className="cursor-pointer text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold inline-flex items-center gap-1.5">
                          <UploadCloud className="w-3.5 h-3.5 text-[#D97A42]" />
                          <span>Upload Avatar Image</span>
                          <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
                            if (e.target.files?.[0]) {
                              const url = await onUpload(e.target.files[0])
                              if (url) updateTestimonial(idx, 'avatar', url)
                            }
                          }} />
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ContactBandEditor({ data, onChange, onUpload }: any) {
  const label = data.label || data.rightTag || data.tagline || ''
  const title = data.title || data.rightTitle || ''
  const description = data.description || data.rightSubtitle || data.subtitle || ''
  const buildingName = data.buildingName || data.addressTitle || ''
  const address = data.address || data.addressDetail || ''
  const phone = data.phone || ''
  const email = data.email || ''
  const whatsapp = data.whatsapp || ''

  const handleUpdate = (field: string, val: string) => {
    onChange(field, val)
    if (field === 'label') {
      onChange('rightTag', val)
      onChange('tagline', val)
    }
    if (field === 'title') {
      onChange('rightTitle', val)
    }
    if (field === 'description') {
      onChange('rightSubtitle', val)
      onChange('subtitle', val)
    }
    if (field === 'buildingName') {
      onChange('addressTitle', val)
    }
    if (field === 'address') {
      onChange('addressDetail', val)
    }
  }

  return (
    <div className="space-y-8">
      {/* Section Overview Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Section Header & Overview</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Label (Orange text)</label>
          <input
            type="text"
            value={label}
            onChange={(e) => handleUpdate('label', e.target.value)}
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="DUBAI SHOWROOM & ATELIER HEADQUARTERS"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleUpdate('title', e.target.value)}
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-serif font-bold text-lg"
            placeholder="Elevate Your Corporate Identity Today"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Description</label>
          <textarea
            value={description}
            onChange={(e) => handleUpdate('description', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed"
            placeholder="Get custom fabric swatches, volume pricing, and personalized design consultation directly from our Dubai master tailoring specialists."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Quote Button Text</label>
            <input
              type="text"
              value={data.quoteBtnText || data.btnText || ''}
              onChange={(e) => { onChange('quoteBtnText', e.target.value); onChange('btnText', e.target.value); }}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
              placeholder="Request Custom Quote & Swatches"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Quote Button Link / URL</label>
            <input
              type="text"
              value={data.quoteBtnHref || data.btnHref || ''}
              onChange={(e) => { onChange('quoteBtnHref', e.target.value); onChange('btnHref', e.target.value); }}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-slate-700"
              placeholder="Leave blank for Quote Modal or e.g. #contact"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Leave blank to open Quote popup modal, or enter page/anchor link</span>
          </div>
        </div>
      </div>

      {/* Showroom & Location Contact Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Showroom & Location Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Building / Atelier Name</label>
            <input
              type="text"
              value={buildingName}
              onChange={(e) => handleUpdate('buildingName', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
              placeholder="Showroom No. 1, Al Zarooni Building"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Address Location</label>
            <input
              type="text"
              value={address}
              onChange={(e) => handleUpdate('address', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Direct Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
              placeholder="+971 4 355 8453"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sales Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
              placeholder="sales@silky.ae"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">WhatsApp Concierge Number</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => onChange('whatsapp', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-green-700 font-bold"
              placeholder="+971 4 226 1050"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Product Page Specific Editors
export function SpecsMatrixEditor({ data, onChange, onUpload }: any) {
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
          <button onClick={addSpec} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
            <Plus className="w-4 h-4" /> Add Spec Card
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specs.map((spec: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeSpec(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer">
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

                {/* Local Custom Icon Upload */}
                {onUpload && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Custom Icon</label>
                    <div className="flex items-center gap-2">
                      {spec.iconImage ? (
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
                          <img src={spec.iconImage} alt="Icon" className="w-5 h-5 object-contain" />
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">Uploaded Icon</span>
                          <button type="button" onClick={() => updateSpec(idx, 'iconImage', '')} className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer">×</button>
                        </div>
                      ) : (
                        <label className="cursor-pointer text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold inline-flex items-center gap-1.5">
                          <UploadCloud className="w-3.5 h-3.5 text-[#D97A42]" />
                          <span>Upload Image</span>
                          <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
                            if (e.target.files?.[0]) {
                              const url = await onUpload(e.target.files[0])
                              if (url) updateSpec(idx, 'iconImage', url)
                            }
                          }} />
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FaqEditor({ data, onChange }: any) {
  const defaultFaqs = [
    { q: 'What is the Minimum Order Quantity (MOQ) for custom cotton shirts?', a: 'Our standard MOQ starts from 25 pieces for custom embroidered shirts, with flexible bulk tiers for larger corporate fleets.' },
    { q: 'Can you deliver physical fabric swatches before placing an order?', a: 'Yes! We provide complimentary physical swatch cards and sample shirts directly to your office across Dubai and the UAE.' },
    { q: 'Do you offer on-site employee trial fittings?', a: 'Our master tailors provide on-site sizing fittings at your office or hotel headquarters to ensure 100% perfect fit for every staff member.' },
    { q: 'What is the standard lead time for bespoke uniform orders in Dubai?', a: 'Standard production & delivery is 5-7 business days across the UAE, with express 48-hour rush orders available for urgent corporate events.' },
  ]
  const faqs = (data.faqs && data.faqs.length > 0) ? data.faqs : defaultFaqs

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
          <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeFaq(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer">
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

export function FabricSwatchesEditor({ data, onChange, onUpload }: any) {
  const defaultSwatches = [
    { name: 'Executive White', color: '#FFFFFF', desc: 'Standard Corporate Combed Cotton' },
    { name: 'Sky Blue', color: '#E0F2FE', desc: 'Popular DIFC Choice' },
    { name: 'Navy Blue', color: '#1E3A8A', desc: 'Executive Management' },
    { name: 'Soft Pink', color: '#FCE7F3', desc: 'Hospitality Concierge' },
    { name: 'Charcoal Gray', color: '#334155', desc: 'Modern Uniform Fleet' },
  ]

  const rawSwatches = (data.swatches && Array.isArray(data.swatches) && data.swatches.length > 0)
    ? data.swatches
    : null

  const swatches = rawSwatches || defaultSwatches

  const updateSwatch = (idx: number, key: string, value: any) => {
    const newSwatches = [...swatches]
    newSwatches[idx] = { ...newSwatches[idx], [key]: value }
    onChange('swatches', newSwatches)
  }

  const addSwatch = () => {
    const newSwatches = [...swatches, { name: 'New Color Swatch', color: '#DE7B3D', desc: '100% Cotton Color Swatch' }]
    onChange('swatches', newSwatches)
  }

  const removeSwatch = (idx: number) => {
    const newSwatches = swatches.filter((_: any, i: number) => i !== idx)
    onChange('swatches', newSwatches)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Sample Request Button Text</label>
            <input type="text" value={data.swatchBtnText || data.btnText || ''} onChange={(e) => { onChange('swatchBtnText', e.target.value); onChange('btnText', e.target.value); }} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white font-bold" placeholder="Request Sample Swatch" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Sample Request Button Link / URL</label>
            <input type="text" value={data.swatchBtnHref || data.btnHref || ''} onChange={(e) => { onChange('swatchBtnHref', e.target.value); onChange('btnHref', e.target.value); }} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white font-mono text-slate-700" placeholder="Leave blank for Quote Modal or enter URL" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Color Swatches List ({swatches.length})</h3>
          <button onClick={addSwatch} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
            <Plus className="w-4 h-4" /> Add Swatch
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {swatches.map((swatch: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeSwatch(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer">
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

                {/* Local Fabric Swatch Image Upload */}
                {onUpload && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Swatch Image</label>
                    <div className="flex items-center gap-2">
                      {swatch.image ? (
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
                          <img src={swatch.image} alt="Swatch" className="w-6 h-6 object-cover rounded" />
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">Fabric Image</span>
                          <button type="button" onClick={() => updateSwatch(idx, 'image', '')} className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer">×</button>
                        </div>
                      ) : (
                        <label className="cursor-pointer text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold inline-flex items-center gap-1.5">
                          <UploadCloud className="w-3.5 h-3.5 text-[#D97A42]" />
                          <span>Upload Local Fabric File</span>
                          <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
                            if (e.target.files?.[0]) {
                              const url = await onUpload(e.target.files[0])
                              if (url) updateSwatch(idx, 'image', url)
                            }
                          }} />
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function QualityControlEditor({ data, onChange, onUpload }: any) {
  const defaultSteps = [
    {
      num: '01',
      step: 1,
      title: 'Combed Egyptian Yarn Sourcing',
      shortDesc: 'Extra-long staple cotton yarn from certified spinning mills.',
      fullDesc: 'Hand-picked extra-long staple combed cotton yarn imported directly from certified Egyptian spinning mills, ensuring maximum tensile strength and silk-soft hand-feel.',
      metric: '100% Extra-Long Staple',
      image: '/images/textile_fabric_rolls.png',
      badge: 'STILL YARN SOURCING',
      points: [
        'Zero synthetic blending',
        'High-density 120/2 ply yarn structure',
        'Certified OEKO-TEX STANDARD 100',
      ],
    },
    {
      num: '02',
      step: 2,
      title: 'Pre-Shrinkage & Mercerization',
      shortDesc: 'Double mercerized bath treatment with < 1% shrinkage.',
      fullDesc: 'Sodium hydroxide bath treatment under tension (double mercerization) locks in vibrant dye fastness, enhances natural fabric lustre, and guarantees less than 1% shrinkage after 100+ commercial laundry cycles.',
      metric: '< 1% Residual Shrinkage',
      image: '/images/custom_embroidery_shirt.png',
      badge: 'MERCERIZATION BATH',
      points: [
        'Tested for 100+ industrial washes',
        'Wrinkle-resistant easy iron finish',
        'Vibrant color retention guaranteed',
      ],
    },
    {
      num: '03',
      step: 3,
      title: '18-Stitch High-Density Sewing',
      shortDesc: 'Precision single-needle stitching at 18 stitches per inch.',
      fullDesc: 'Master tailors execute single-needle lockstitching at 18 stitches per inch with reinforced armhole seam taping, mother-of-pearl buttons, and rigid collar stays.',
      metric: '18 Stitches / Inch',
      image: '/images/shirt_collar_detail.png',
      badge: 'HIGH-DENSITY CRAFT',
      points: [
        'Reinforced armholes & side gussets',
        'Custom monogrammed cuffs & initial embroidery',
        'Non-curl collar stays built-in',
      ],
    },
    {
      num: '04',
      step: 4,
      title: 'Final Inspection in Dubai',
      shortDesc: '100% manual quality audit at Deira atelier before dispatch.',
      fullDesc: 'Every garment undergoes a 12-point manual inspection at our Deira Creek headquarters including button tension tests, thread trimming, steam pressing, and custom polybag sealing.',
      metric: '100% Manual Audit',
      image: '/images/hotel_uniform_luxury.png',
      badge: 'DEIRA ATELIER AUDIT',
      points: [
        '12-point individual garment inspection',
        'Professional steam pressing & folding',
        'Express dispatch across Dubai & 7 Emirates',
      ],
    },
  ]

  const rawSteps = (data.steps && Array.isArray(data.steps) && data.steps.length > 0)
    ? data.steps
    : (data.points && Array.isArray(data.points) && data.points.length > 0)
    ? data.points
    : defaultSteps

  const steps = rawSteps

  const updateStep = (idx: number, key: string, value: any) => {
    const newSteps = [...steps]
    newSteps[idx] = { ...newSteps[idx], [key]: value }
    onChange('steps', newSteps)
  }

  const addStep = () => {
    const newStepNum = String(steps.length + 1).padStart(2, '0')
    onChange('steps', [...steps, {
      num: newStepNum,
      step: steps.length + 1,
      title: 'New Quality Stage',
      shortDesc: 'Short summary of quality stage...',
      fullDesc: 'Detailed quality inspection protocol description...',
      metric: '100% Verified',
      badge: 'QUALITY STAGE',
      image: '/images/hotel_uniform_luxury.png',
      points: ['Quality inspection point 1', 'Quality inspection point 2'],
    }])
  }

  const removeStep = (idx: number) => {
    onChange('steps', steps.filter((_: any, i: number) => i !== idx))
  }

  const updateSubPoint = (stepIdx: number, pointIdx: number, val: string) => {
    const newSteps = [...steps]
    const curPoints = [...(newSteps[stepIdx].points || [])]
    curPoints[pointIdx] = val
    newSteps[stepIdx] = { ...newSteps[stepIdx], points: curPoints }
    onChange('steps', newSteps)
  }

  const addSubPoint = (stepIdx: number) => {
    const newSteps = [...steps]
    const curPoints = [...(newSteps[stepIdx].points || [])]
    curPoints.push('New inspection requirement')
    newSteps[stepIdx] = { ...newSteps[stepIdx], points: curPoints }
    onChange('steps', newSteps)
  }

  const removeSubPoint = (stepIdx: number, pointIdx: number) => {
    const newSteps = [...steps]
    const curPoints = (newSteps[stepIdx].points || []).filter((_: any, pI: number) => pI !== pointIdx)
    newSteps[stepIdx] = { ...newSteps[stepIdx], points: curPoints }
    onChange('steps', newSteps)
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Quality Process Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="ISO 9001:2015 CERTIFIED MANUFACTURING" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white font-serif font-bold text-lg" placeholder="4-Step Quality Assurance Process" />
        </div>
      </div>

      {/* Stages List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Process Stages ({steps.length})</h3>
          <button onClick={addStep} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-[#1C7A4C]/10 text-[#1C7A4C] hover:bg-[#1C7A4C]/20 border border-[#1C7A4C]/30 transition-all cursor-pointer">
            <Plus className="w-4 h-4" /> Add Stage
          </button>
        </div>

        <div className="space-y-6">
          {steps.map((st: any, idx: number) => {
            const pointsList = st.points || []

            return (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
                <button onClick={() => removeStep(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer z-10">
                  <Trash2 className="w-4 h-4" />
                </button>
                <h4 className="font-bold text-slate-800 text-sm">Stage #{idx + 1}: {st.title || 'Untitled'}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Stage Title</label>
                    <input type="text" value={st.title || ''} onChange={(e) => updateStep(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Badge Tag</label>
                    <input type="text" value={st.badge || ''} onChange={(e) => updateStep(idx, 'badge', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold text-[#1C7A4C]" placeholder="QUALITY STAGE" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Metric Callout</label>
                    <input type="text" value={st.metric || ''} onChange={(e) => updateStep(idx, 'metric', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white text-green-700 font-bold" placeholder="e.g. < 1% Residual Shrinkage" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Short Summary</label>
                  <input type="text" value={st.shortDesc || ''} onChange={(e) => updateStep(idx, 'shortDesc', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Full Detailed Inspection Description</label>
                  <textarea value={st.fullDesc || ''} onChange={(e) => updateStep(idx, 'fullDesc', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white leading-relaxed" />
                </div>

                {/* Sub-points checklist */}
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Sub-Points & Inspection Checks ({pointsList.length})</label>
                    <button type="button" onClick={() => addSubPoint(idx)} className="text-[10px] font-bold text-[#1C7A4C] hover:underline cursor-pointer">
                      + Add Checkpoint
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {pointsList.map((pt: string, pIdx: number) => (
                      <div key={pIdx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={pt}
                          onChange={(e) => updateSubPoint(idx, pIdx, e.target.value)}
                          className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-gray-200 rounded-md focus:bg-white font-medium"
                        />
                        <button type="button" onClick={() => removeSubPoint(idx, pIdx)} className="text-red-500 hover:text-red-700 font-bold text-xs p-1 cursor-pointer">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Stage Local Image Upload */}
                {onUpload && (
                  <div className="pt-2 border-t border-gray-100">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Inspection Image</label>
                    <div className="flex items-center gap-2">
                      {st.image ? (
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
                          <img src={st.image} alt="Stage" className="w-8 h-8 object-cover rounded" />
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">Inspection Image</span>
                          <button type="button" onClick={() => updateStep(idx, 'image', '')} className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer">×</button>
                        </div>
                      ) : (
                        <label className="cursor-pointer text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold inline-flex items-center gap-1.5">
                          <UploadCloud className="w-3.5 h-3.5 text-[#D97A42]" />
                          <span>Upload Local Inspection Image</span>
                          <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
                            if (e.target.files?.[0]) {
                              const url = await onUpload(e.target.files[0])
                              if (url) updateStep(idx, 'image', url)
                            }
                          }} />
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function BulkPricingEditor({ data, onChange }: any) {
  const defaultTiers = [
    {
      title: 'Sample & Pilot Fleet',
      range: '25 – 50 Pieces',
      priceNote: 'Standard Wholesale Rate',
      desc: 'Ideal for small executive teams, initial trial orders, and quality verification.',
      badge: 'PILOT TIER',
      highlight: false,
      features: [
        'Complimentary Logo Digitizing Setup',
        'Physical Fabric Swatch Box Delivery',
        'Standard 5-7 Business Day UAE Dispatch',
        'Flexible Size Ratio Selection',
      ],
    },
    {
      title: 'Corporate Fleet Tier',
      range: '50 – 250 Pieces',
      priceNote: 'Most Popular • 15% Volume Discount',
      desc: 'Includes complimentary logo embroidery and free physical swatch delivery to your office.',
      badge: 'MOST POPULAR',
      highlight: true,
      features: [
        'Free 3D High-Definition Logo Embroidery',
        'On-Site Staff Sizing Trial Fittings',
        'Express 48-Hour Rush Order Option',
        'Dedicated Dubai Account Manager',
        'Complimentary Insured Shipping Across UAE',
      ],
    },
    {
      title: 'Wholesale Enterprise',
      range: '500+ Pieces',
      priceNote: 'Best Value • 25% Volume Discount',
      desc: 'Dedicated Dubai account director, custom pantone dye, and priority dispatch for regional chains.',
      badge: 'BEST VALUE',
      highlight: false,
      features: [
        'Custom Pantone Yarn & Fabric Dyeing',
        '25% Tier Wholesale Volume Discount',
        'Dedicated Senior Sales Director',
        'Priority Atelier Production Allocation',
        'Custom Woven Brand & Care Labels',
      ],
    },
  ]
  const tiers = (data.tiers && data.tiers.length > 0) ? data.tiers : defaultTiers

  const updateTier = (idx: number, key: string, value: any) => {
    const newTiers = [...tiers]
    newTiers[idx] = { ...newTiers[idx], [key]: value }
    onChange('tiers', newTiers)
  }

  const addTier = () => {
    onChange('tiers', [...tiers, {
      title: 'New Tier',
      range: '100 - 299 Pcs',
      priceNote: '15% Volume Discount',
      badge: '15% OFF',
      desc: 'Bulk discount tier description...',
      highlight: false,
      features: ['Complimentary Logo Embroidery', 'Express Delivery Option'],
    }])
  }

  const removeTier = (idx: number) => {
    onChange('tiers', tiers.filter((_: any, i: number) => i !== idx))
  }

  const updateFeature = (tierIdx: number, featureIdx: number, val: string) => {
    const newTiers = [...tiers]
    const curFeatures = [...(newTiers[tierIdx].features || [])]
    curFeatures[featureIdx] = val
    newTiers[tierIdx] = { ...newTiers[tierIdx], features: curFeatures }
    onChange('tiers', newTiers)
  }

  const addFeature = (tierIdx: number) => {
    const newTiers = [...tiers]
    const curFeatures = [...(newTiers[tierIdx].features || [])]
    curFeatures.push('New Included Perk')
    newTiers[tierIdx] = { ...newTiers[tierIdx], features: curFeatures }
    onChange('tiers', newTiers)
  }

  const removeFeature = (tierIdx: number, featureIdx: number) => {
    const newTiers = [...tiers]
    const curFeatures = (newTiers[tierIdx].features || []).filter((_: any, fI: number) => fI !== featureIdx)
    newTiers[tierIdx] = { ...newTiers[tierIdx], features: curFeatures }
    onChange('tiers', newTiers)
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Wholesale Tiers Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="WHOLESALE & BULK DISCOUNTS" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white font-serif font-bold text-lg" placeholder="Wholesale Volume Discount Tiers" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Subtitle / Header Description</label>
          <textarea value={data.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} rows={2} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white leading-relaxed" placeholder="Transparent volume tier pricing with complimentary logo embroidery..." />
        </div>
      </div>

      {/* Pricing Tiers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Volume Discount Tiers ({tiers.length})</h3>
          <button onClick={addTier} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-[#D97A42]/10 text-[#D97A42] hover:bg-[#D97A42]/20 border border-[#D97A42]/30 transition-all cursor-pointer">
            <Plus className="w-4 h-4" /> Add Pricing Tier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier: any, idx: number) => {
            const features = tier.features || (idx === 0 ? defaultTiers[0].features : idx === 1 ? defaultTiers[1].features : defaultTiers[2].features)

            return (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative flex flex-col justify-between">
                <button onClick={() => removeTier(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer z-10">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-between pr-8">
                  <h4 className="font-bold text-slate-800 text-sm">Tier #{idx + 1}</h4>
                  <button
                    type="button"
                    onClick={() => updateTier(idx, 'highlight', !tier.highlight)}
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded cursor-pointer transition-colors ${
                      tier.highlight ? 'bg-[#D97A42] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tier.highlight ? '⭐ Highlighted' : 'Normal Card'}
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Tier Name</label>
                    <input type="text" value={tier.title || ''} onChange={(e) => updateTier(idx, 'title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Quantity Range</label>
                    <input type="text" value={tier.range || ''} onChange={(e) => updateTier(idx, 'range', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold text-[#D97A42]" placeholder="50 - 199 Pcs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Price / Discount Note</label>
                    <input type="text" value={tier.priceNote || ''} onChange={(e) => updateTier(idx, 'priceNote', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white text-green-700 font-bold" placeholder="15% Volume Discount" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Badge Tag</label>
                    <input type="text" value={tier.badge || ''} onChange={(e) => updateTier(idx, 'badge', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="STANDARD BULK" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                    <textarea value={tier.desc || ''} onChange={(e) => updateTier(idx, 'desc', e.target.value)} rows={2} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white leading-relaxed" />
                  </div>

                  {/* Included Services Checklist Bullet Points */}
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Included Perks ({features.length})</label>
                      <button type="button" onClick={() => addFeature(idx)} className="text-[10px] font-bold text-[#D97A42] hover:underline cursor-pointer">
                        + Add Perk
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {features.map((f: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={f}
                            onChange={(e) => updateFeature(idx, fIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-gray-200 rounded-md focus:bg-white"
                          />
                          <button type="button" onClick={() => removeFeature(idx, fIdx)} className="text-red-500 hover:text-red-700 font-bold text-xs p-1 cursor-pointer">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Wholesale Banner Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Bottom Wholesale Callout Banner</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Banner Title</label>
          <input type="text" value={data.calloutTitle || ''} onChange={(e) => onChange('calloutTitle', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white font-serif font-bold" placeholder="Need Custom Volume Above 1,000 Pieces?" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Banner Description</label>
          <textarea value={data.calloutDesc || ''} onChange={(e) => onChange('calloutDesc', e.target.value)} rows={2} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white leading-relaxed" placeholder="Our Dubai manufacturing atelier produces over 50,000 corporate shirts annually..." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Button Action Text</label>
            <input type="text" value={data.calloutBtnText || ''} onChange={(e) => onChange('calloutBtnText', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white font-bold" placeholder="Contact Wholesale Director" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Button Link / URL</label>
            <input type="text" value={data.calloutBtnHref || ''} onChange={(e) => onChange('calloutBtnHref', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white font-mono text-slate-700" placeholder="Leave blank for Quote Modal or e.g. #contact" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function LogisticsEditor({ data, onChange, onUpload }: any) {
  const defaultRoutes = [
    { hub: 'Dubai Atelier & DIFC Direct', status: 'Same-Day Dispatch', time: 'Under 6 Hours', badge: 'EXPRESS VAN' },
    { hub: 'Abu Dhabi, Sharjah & Al Ain', status: '24-Hour Capital Courier', time: 'Next Morning', badge: 'DAILY FREIGHT' },
    { hub: 'GCC Region (KSA, Oman, Qatar, Kuwait)', status: '48-Hour Air & Overland', time: '2-3 Business Days', badge: 'AIR & LAND' },
  ]
  const routes = (data.routes && data.routes.length > 0) ? data.routes : defaultRoutes

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
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Logistics Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Eyebrow Label</label>
          <input type="text" value={data.label || ''} onChange={(e) => onChange('label', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="EXPRESS LOGISTICS & GCC DISPATCH" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input type="text" value={data.title || ''} onChange={(e) => onChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white font-serif font-bold text-lg" placeholder="Nationwide UAE & Regional Delivery Telemetry" />
        </div>
      </div>

      {/* Left Telemetry Card Details */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Left Hub Telemetry Card</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Hub Title</label>
            <input type="text" value={data.leftCardTitle || ''} onChange={(e) => onChange('leftCardTitle', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="Deira Direct Dispatch" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bottom Guarantee Note</label>
            <input type="text" value={data.leftCardNote || ''} onChange={(e) => onChange('leftCardNote', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white" placeholder="Complimentary insured shipping on all orders over 50 pieces." />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Metric 1 Label</label>
            <input type="text" value={data.metric1Label || ''} onChange={(e) => onChange('metric1Label', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="Dispatch Guarantee" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Metric 1 Value</label>
            <input type="text" value={data.metric1Value || ''} onChange={(e) => onChange('metric1Value', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold text-green-700" placeholder="100% On-Time" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Metric 2 Label</label>
            <input type="text" value={data.metric2Label || ''} onChange={(e) => onChange('metric2Label', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white" placeholder="Coverage Hubs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Metric 2 Value</label>
            <input type="text" value={data.metric2Value || ''} onChange={(e) => onChange('metric2Value', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold text-[#D97A42]" placeholder="All 7 Emirates" />
          </div>
        </div>
      </div>

      {/* Dispatch Routes List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Dispatch Hubs & Routes ({routes.length})</h3>
          <button onClick={addRoute} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-[#D97A42]/10 text-[#D97A42] hover:bg-[#D97A42]/20 border border-[#D97A42]/30 transition-all cursor-pointer">
            <Plus className="w-4 h-4" /> Add Logistics Route
          </button>
        </div>

        <div className="space-y-4">
          {routes.map((rt: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button onClick={() => removeRoute(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg cursor-pointer">
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

              {/* Local Logistics Custom Icon Upload */}
              {onUpload && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Route Icon</label>
                  <div className="flex items-center gap-2">
                    {rt.iconImage ? (
                      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
                        <img src={rt.iconImage} alt="Icon" className="w-5 h-5 object-contain" />
                        <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">Route Icon</span>
                        <button type="button" onClick={() => updateRoute(idx, 'iconImage', '')} className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer">×</button>
                      </div>
                    ) : (
                      <label className="cursor-pointer text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold inline-flex items-center gap-1.5">
                        <UploadCloud className="w-3.5 h-3.5 text-[#D97A42]" />
                        <span>Upload Route Graphic</span>
                        <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg,.webp,image/*" onChange={async (e) => {
                          if (e.target.files?.[0]) {
                            const url = await onUpload(e.target.files[0])
                            if (url) updateRoute(idx, 'iconImage', url)
                          }
                        }} />
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductHeroEditor({ data, onChange, onUpload }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const badges = data.badges || [
    { label: '100% Pure Egyptian Cotton' },
    { label: 'Dubai Direct Manufacturer' },
  ]

  const updateBadge = (idx: number, label: string) => {
    const newBadges = [...badges]
    newBadges[idx] = { label }
    onChange('badges', newBadges)
  }

  const addBadge = () => {
    onChange('badges', [...badges, { label: 'New Highlight Badge' }])
  }

  const removeBadge = (idx: number) => {
    onChange('badges', badges.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      {/* Product Hero Content Form */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 text-lg border-b border-gray-100 pb-4">
          Product Hero Section Header & Text
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Breadcrumb Path
            </label>
            <input
              type="text"
              value={data.breadcrumb || ''}
              onChange={(e) => onChange('breadcrumb', e.target.value)}
              placeholder="Home / Products / Corporate Shirting"
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Eyebrow Tagline (Orange Caps)
            </label>
            <input
              type="text"
              value={data.tagline || ''}
              onChange={(e) => onChange('tagline', e.target.value)}
              placeholder="100% EGYPTIAN COTTON • DUBAI EST. 1963"
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Main Product Page Headline
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Pure Cotton Shirts Supplier in UAE"
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-serif font-bold text-lg text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Product Subtitle / Description
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            rows={3}
            placeholder="Handcrafted 100% combed cotton dress shirts and corporate uniforms..."
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Primary Button Text (Request Quote)
              </label>
              <input
                type="text"
                value={data.primaryBtnText || ''}
                onChange={(e) => onChange('primaryBtnText', e.target.value)}
                placeholder="Request Bulk Quote"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Primary Button Link / URL
              </label>
              <input
                type="text"
                value={data.primaryBtnHref || ''}
                onChange={(e) => onChange('primaryBtnHref', e.target.value)}
                placeholder="e.g. #contact, /contact, or leave blank for Modal"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-slate-700"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Leave empty to open Quote Modal popup, or enter a URL/anchor</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Secondary Button Text (View Specs)
              </label>
              <input
                type="text"
                value={data.secondaryBtnText || ''}
                onChange={(e) => onChange('secondaryBtnText', e.target.value)}
                placeholder="View Specifications"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Secondary Button Link / URL
              </label>
              <input
                type="text"
                value={data.secondaryBtnHref || ''}
                onChange={(e) => onChange('secondaryBtnHref', e.target.value)}
                placeholder="e.g. #specs, /products, or #details"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-slate-700"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Destination anchor (e.g. #specs) or page URL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Featured Image */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-slate-800 text-lg border-b border-gray-100 pb-4">
          Display Image
        </h3>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-full sm:w-64 h-48 rounded-2xl bg-slate-100 border border-gray-200 overflow-hidden flex items-center justify-center relative shadow-inner shrink-0">
            {data.heroImage ? (
              <img src={data.heroImage} alt="Hero Display" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-10 h-10 text-slate-300" />
            )}
          </div>
          <div className="flex-1 space-y-4 w-full">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Image Source URL
              </label>
              <input
                type="text"
                value={data.heroImage || ''}
                onChange={(e) => onChange('heroImage', e.target.value)}
                placeholder="/images/textile_fabric_rolls.png"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-slate-600"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-xl transition-all border border-slate-300 cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-[#D97A42]" /> Upload Image
              </button>
              {data.heroImage && (
                <button
                  type="button"
                  onClick={() => onChange('heroImage', '')}
                  className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-all border border-red-200 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".png,.jpg,.jpeg,.svg,.webp,image/*"
                onChange={async (e) => {
                  if (e.target.files?.[0]) {
                    const url = await onUpload(e.target.files[0])
                    if (url) onChange('heroImage', url)
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Feature Badges */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="font-bold text-slate-800 text-lg">Feature Badges / Highlights</h3>
          <button
            type="button"
            onClick={addBadge}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#D97A42]/10 text-[#D97A42] hover:bg-[#D97A42]/20 border border-[#D97A42]/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Badge
          </button>
        </div>

        <div className="space-y-3">
          {badges.map((b: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                type="text"
                value={b.label || ''}
                onChange={(e) => updateBadge(idx, e.target.value)}
                placeholder="e.g. 100% Pure Egyptian Cotton"
                className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
              />
              <button
                type="button"
                onClick={() => removeBadge(idx)}
                className="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2.5 rounded-xl border border-gray-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CustomizationEditor({ data, onChange, onUpload }: any) {
  const defaultOptions = [
    {
      id: 0,
      title: '3D High-Definition Logo Embroidery',
      badge: '3D Chest & Collar Logos',
      desc: 'Precision computerized embroidery using gold, silver, or pantone-matched threads on chest pockets, collar tips, or sleeves.',
      image: '/images/shirt_collar_detail.png',
      tag: 'DUBAI STUDIO DIRECT',
    },
    {
      id: 1,
      title: 'Personalized Monogrammed Cuffs',
      badge: 'Executive Monograms',
      desc: 'Custom embroidered employee initials on french cuffs or barrel cuffs for executive brand elegance.',
      image: '/images/shirt_cuff_monogram.png',
      tag: 'BESPOKE TAILORING',
    },
    {
      id: 2,
      title: 'Pearlized Buttons & Fused Collar Stays',
      badge: 'Reinforced Construction',
      desc: 'Heat-resistant mother-of-pearl buttons with fused collar stays to preserve crisp collar structure for 100+ washes.',
      image: '/images/custom_embroidery_shirt.png',
      tag: 'CRAFTSMANSHIP DETAIL',
    },
    {
      id: 3,
      title: 'Executive Made-to-Measure Sizing',
      badge: 'Precision Fleet Fitting',
      desc: 'Tailored slim-fit, executive regular fit, and bespoke sizing charts tailored for entire corporate fleets.',
      image: '/images/hotel_uniform_luxury.png',
      tag: 'ON-SITE FITTING',
    },
  ]

  const options = (data.options && data.options.length > 0) ? data.options : defaultOptions

  const updateOption = (idx: number, key: string, value: any) => {
    const newOptions = [...options]
    newOptions[idx] = { ...newOptions[idx], [key]: value }
    onChange('options', newOptions)
  }

  const addOption = () => {
    onChange('options', [...options, {
      id: Date.now(),
      title: 'New Custom Service',
      badge: 'Custom Badge',
      desc: 'Service description details...',
      image: '/images/textile_fabric_rolls.png',
      tag: 'CUSTOM OPTION',
    }])
  }

  const removeOption = (idx: number) => {
    onChange('options', options.filter((_: any, i: number) => i !== idx))
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4">Customization Section Header</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Section Eyebrow Label</label>
          <input
            type="text"
            value={data.label || 'CUSTOM LOGO EMBROIDERY & TAILORING'}
            onChange={(e) => onChange('label', e.target.value)}
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
          <input
            type="text"
            value={data.title || 'Bespoke Logo Embroidery & Fitting Options'}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none font-serif font-bold text-lg"
          />
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Customization Services ({options.length})</h3>
          <button
            onClick={addOption}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-[#D97A42]/10 text-[#D97A42] hover:bg-[#D97A42]/20 border border-[#D97A42]/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Customization Service
          </button>
        </div>

        <div className="space-y-6">
          {options.map((opt: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 relative">
              <button
                onClick={() => removeOption(idx)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2.5 rounded-xl border border-gray-200 transition-colors z-10 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Image Preview & Upload */}
                <div className="w-full sm:w-56 h-36 rounded-xl bg-slate-100 border border-gray-200 overflow-hidden flex items-center justify-center relative group shrink-0 shadow-inner">
                  {opt.image ? (
                    <img src={opt.image} alt={opt.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <label className="cursor-pointer text-white text-xs font-bold bg-[#D97A42] hover:bg-[#c46833] px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                      <UploadCloud className="w-3.5 h-3.5" /> Upload
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files?.[0]) {
                            const url = await onUpload(e.target.files[0])
                            if (url) updateOption(idx, 'image', url)
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={opt.title || ''}
                        onChange={(e) => updateOption(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Service Icon
                      </label>
                      <div className="space-y-2">
                        <select
                          value={opt.iconName || (typeof opt.icon === 'string' ? opt.icon : '') || (idx === 0 ? 'Scissors' : idx === 1 ? 'UserCheck' : idx === 2 ? 'Award' : 'Ruler')}
                          onChange={(e) => updateOption(idx, 'iconName', e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white font-semibold cursor-pointer"
                        >
                          <option value="Scissors">✂️ Scissors (Tailoring & Embroidery)</option>
                          <option value="UserCheck">👤 User Check (Monograms & Fitting)</option>
                          <option value="Award">🏆 Award (Buttons & Construction)</option>
                          <option value="Ruler">📐 Ruler (Made-to-Measure Sizing)</option>
                          <option value="ShieldCheck">🛡️ Shield Check (Quality Guarantee)</option>
                          <option value="Shirt">👔 Shirt (Custom Shirting & Apparel)</option>
                          <option value="Layers">🥞 Layers (Fabric Weave)</option>
                          <option value="Building2">🏢 Building (Corporate Fleet)</option>
                          <option value="Truck">🚚 Truck (Express Logistics)</option>
                          <option value="Box">📦 Box (Wholesale Packaging)</option>
                          <option value="PhoneCall">📞 Phone (Direct Concierge)</option>
                        </select>

                        {/* Custom Icon Upload */}
                        <div className="flex items-center gap-2">
                          {opt.iconImage ? (
                            <div className="flex items-center gap-2 bg-slate-100 p-1.5 px-3 rounded-lg border border-slate-300">
                              <img src={opt.iconImage} alt="Custom Icon" className="w-5 h-5 object-contain" />
                              <span className="text-[10px] font-bold text-slate-700 truncate max-w-[100px]">Custom Icon</span>
                              <button
                                type="button"
                                onClick={() => updateOption(idx, 'iconImage', '')}
                                className="text-red-500 hover:text-red-700 text-xs font-bold ml-1 cursor-pointer"
                                title="Remove Icon"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <label className="cursor-pointer text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold inline-flex items-center gap-1.5 transition-all">
                              <UploadCloud className="w-3.5 h-3.5 text-[#D97A42]" />
                              <span>Upload Image</span>
                              <input
                                type="file"
                                className="hidden"
                                accept=".png,.jpg,.jpeg,.svg,.webp"
                                onChange={async (e) => {
                                  if (e.target.files?.[0]) {
                                    const url = await onUpload(e.target.files[0])
                                    if (url) updateOption(idx, 'iconImage', url)
                                  }
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Badge
                      </label>
                      <input
                        type="text"
                        value={opt.badge || ''}
                        onChange={(e) => updateOption(idx, 'badge', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Description
                    </label>
                    <textarea
                      value={opt.desc || ''}
                      onChange={(e) => updateOption(idx, 'desc', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

