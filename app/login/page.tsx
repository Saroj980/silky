'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User as UserIcon, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'
import { getUserList } from '@/app/admin/user-manager'
import { verifyPassword } from '@/lib/password'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      let authenticatedUser: any = null
      const uInput = username.trim().toLowerCase()
      const enteredPassword = password.trim()

      // 1. Try server API login (check /api/auth/login first, fallback to /api/login if route not found)
      try {
        let res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: uInput,
            password: enteredPassword
          })
        })

        if (res.status === 404) {
          // If /api/auth/login is not registered, try /api/login
          res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: uInput,
              password: enteredPassword
            })
          })
        }

        if (res.ok) {
          const data = await res.json()
          if (data.success && data.user) {
            authenticatedUser = data.user
          }
        } else if (res.status === 401 || res.status === 400 || res.status === 403) {
          const errData = await res.json().catch(() => ({}))
          setError(errData.error || errData.message || 'Invalid username or password. Please try again.')
          setIsLoading(false)
          return
        }
      } catch (apiErr) {
        // Ignored on static hosting offline
      }

      // 2. Client-side SHA-256 verification fallback for offline / static hosting only
      if (!authenticatedUser) {
        const users = getUserList()
        const foundUser = users.find(
          u => (
            (u.username && u.username.trim().toLowerCase() === uInput) ||
            (u.email && u.email.trim().toLowerCase() === uInput) ||
            (u.name && u.name.trim().toLowerCase() === uInput)
          ) && (!u.status || u.status.toLowerCase() === 'active')
        )

        if (foundUser && foundUser.password) {
          const isValid = await verifyPassword(enteredPassword, foundUser.password)
          if (isValid) {
            authenticatedUser = {
              id: foundUser.id,
              name: foundUser.name,
              username: foundUser.username,
              email: foundUser.email,
              role: foundUser.role
            }
          }
        }
      }

      if (!authenticatedUser) {
        setError('Invalid username or password. Please try again.')
        setIsLoading(false)
        return
      }

      const sessionUser = {
        ...authenticatedUser,
        loggedInAt: new Date().toISOString()
      }

      localStorage.setItem('silky_admin_user', JSON.stringify(sessionUser))
      router.push('/admin')
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080C14] flex items-center justify-center p-4 sm:p-6 relative font-inter overflow-hidden">
      
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DE7B3D]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0F172A]/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative z-10">
        
        {/* Brand Header with Silky Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <img
              src="/silky-logo.png"
              alt="Silky Textiles Logo"
              className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Bespoke Tailoring & Enterprise Uniform Management</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-400 text-xs font-bold text-center animate-in fade-in duration-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* USERNAME FIELD */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Username or Email *</label>
            <div className="flex items-center bg-[#1E293B] border border-slate-700/80 rounded-2xl overflow-hidden focus-within:border-[#DE7B3D] focus-within:ring-2 focus-within:ring-[#DE7B3D]/30 transition-all shadow-inner">
              <div className="w-12 h-12 flex items-center justify-center text-[#DE7B3D] bg-slate-800/40 border-r border-slate-700/50 shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                placeholder="Enter admin username or email"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="flex-1 h-12 bg-transparent px-4 text-sm font-semibold text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Password *</label>
            <div className="flex items-center bg-[#1E293B] border border-slate-700/80 rounded-2xl overflow-hidden focus-within:border-[#DE7B3D] focus-within:ring-2 focus-within:ring-[#DE7B3D]/30 transition-all shadow-inner">
              <div className="w-12 h-12 flex items-center justify-center text-[#DE7B3D] bg-slate-800/40 border-r border-slate-700/50 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="flex-1 h-12 bg-transparent px-4 text-sm font-semibold text-white placeholder-slate-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/40 transition-colors cursor-pointer shrink-0"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* SIGN IN BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#DE7B3D] to-amber-600 hover:from-[#c96a2e] hover:to-amber-700 text-white rounded-2xl font-bold text-sm tracking-wide transition-all shadow-xl shadow-[#DE7B3D]/25 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/90" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-800/80 pt-5">
          <p className="text-[11px] font-medium text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#DE7B3D]" />
            Silky Textiles & Garments LLC • Dubai, UAE
          </p>
        </div>
      </div>
    </div>
  )
}
