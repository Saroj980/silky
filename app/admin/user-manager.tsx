'use client'

import React, { useState, useEffect } from 'react'
import { Users, UserPlus, Shield, Key, Trash2, Edit3, Check, X, Search, Lock, Mail, User as UserIcon, ShieldAlert, Eye, EyeOff } from 'lucide-react'

export interface UserItem {
  id: string
  name: string
  username: string
  email: string
  role: 'Master Admin' | 'Admin' | 'Editor'
  status: 'Active' | 'Inactive'
  createdAt: string
  password?: string
}

const DEFAULT_USERS: UserItem[] = []

export const STORAGE_KEY_USERS = 'silky_admin_users'

export function getUserList(): UserItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY_USERS)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Discard legacy hardcoded mock users
        const cleaned = parsed.filter(u => u.email !== 'admin@silkytextiles.com' && u.email !== 'editor@silkytextiles.com')
        if (cleaned.length > 0) return cleaned
      }
    }
  } catch (e) {
    console.error('Error loading users from storage:', e)
  }
  return []
}

export function saveUserList(users: UserItem[]) {
  if (typeof window === 'undefined') return
  try {
    const sanitized = users.map(({ password, ...rest }) => rest)
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(sanitized))
    document.cookie = `${STORAGE_KEY_USERS}=${encodeURIComponent(JSON.stringify(sanitized))}; path=/; max-age=31536000; SameSite=Lax`
  } catch (e) {
    console.error('Error saving users to storage:', e)
  }
}

export function UserManager({ currentUserRole = 'Master Admin' }: { currentUserRole?: string }) {
  const [users, setUsers] = useState<UserItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('ALL')

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserItem | null>(null)
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null)
  const [showModalPassword, setShowModalPassword] = useState(false)
  const [showModalConfirmPassword, setShowModalConfirmPassword] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Admin' as 'Master Admin' | 'Admin' | 'Editor',
    status: 'Active' as 'Active' | 'Inactive',
    password: '',
    confirmPassword: '',
  })
  const [formError, setFormError] = useState('')

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const loadUsersFromDb = async () => {
    try {
      const res = await fetch('/api/users', { cache: 'no-store' })
      if (res.ok) {
        const apiUsers = await res.json()
        if (Array.isArray(apiUsers)) {
          setUsers(apiUsers)
          saveUserList(apiUsers)
          return
        }
      }
    } catch (err) {
      console.warn('API fetch failed, checking cache:', err)
    }
    const cached = getUserList()
    setUsers(cached)
  }

  useEffect(() => {
    // Purge legacy mock users from browser localStorage if present
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_USERS)
        if (stored && (stored.includes('admin@silkytextiles.com') || stored.includes('editor@silkytextiles.com'))) {
          localStorage.removeItem(STORAGE_KEY_USERS)
        }
      } catch (e) {}
    }
    loadUsersFromDb()
  }, [])

  const persistAndSetUsers = (updated: UserItem[]) => {
    setUsers(updated)
    saveUserList(updated)
  }

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      role: 'Admin',
      status: 'Active',
      password: '',
      confirmPassword: '',
    })
    setFormError('')
    setShowModalPassword(false)
    setShowModalConfirmPassword(false)
    setIsAddModalOpen(true)
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setFormError('Full Name is required.')
      return
    }
    if (!formData.email.trim()) {
      setFormError('Email address is required.')
      return
    }
    if (!formData.password.trim()) {
      setFormError('Password is required.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match.')
      return
    }

    const newEmail = formData.email.trim().toLowerCase()
    const generatedUsername = newEmail.split('@')[0] || 'user_' + Date.now()

    const exists = users.some(
      u => u.email && u.email.trim().toLowerCase() === newEmail
    )
    if (exists) {
      setFormError('A user with this email address already exists.')
      return
    }

    const newUser: UserItem = {
      id: 'usr_' + Date.now(),
      name: formData.name.trim(),
      username: generatedUsername,
      email: formData.email.trim(),
      role: formData.role || 'Admin',
      status: formData.status,
      createdAt: new Date().toISOString().split('T')[0],
    }

    const updated = [...users, newUser]
    persistAndSetUsers(updated)

    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newUser,
        password: formData.password.trim()
      })
    })
      .then(res => res.ok ? res.json() : null)
      .then(created => {
        if (created && created.id) {
          setUsers(prev => {
            const nextList = prev.map(u => (u.email.toLowerCase() === created.email.toLowerCase() ? created : u))
            saveUserList(nextList)
            return nextList
          })
        }
      })
      .catch(err => console.error('API create user error:', err))

    setIsAddModalOpen(false)
    showToast(`User "${newUser.name}" created successfully!`)
  }

  const handleOpenEdit = (user: UserItem) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      password: '',
      confirmPassword: '',
    })
    setFormError('')
    setShowModalPassword(false)
    setShowModalConfirmPassword(false)
  }

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    if (!formData.name.trim()) {
      setFormError('Full Name is required.')
      return
    }
    if (!formData.email.trim()) {
      setFormError('Email address is required.')
      return
    }
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match.')
        return
      }
    }

    const updated = users.map(u => {
      if (u.id === editingUser.id) {
        return {
          ...u,
          name: formData.name.trim(),
          email: formData.email.trim(),
          status: formData.status,
        }
      }
      return u
    })

    persistAndSetUsers(updated)

    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingUser.id,
        username: editingUser.username,
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        status: formData.status,
        password: formData.password.trim() || undefined
      })
    }).catch(err => console.error('API update user error:', err))

    setEditingUser(null)
    showToast(`User "${formData.name}" updated successfully!`)
  }

  const handleDeleteUser = () => {
    if (!deletingUser) return
    if (deletingUser.username === 'admin' || deletingUser.role === 'Master Admin') {
      const masterCount = users.filter(u => u.role === 'Master Admin').length
      if (masterCount <= 1) {
        showToast('Cannot delete the primary Master Admin account.', 'error')
        setDeletingUser(null)
        return
      }
    }

    const updated = users.filter(u => u.id !== deletingUser.id)
    persistAndSetUsers(updated)

    fetch(`/api/users?id=${encodeURIComponent(deletingUser.id)}`, {
      method: 'DELETE'
    }).catch(err => console.error('API delete user error:', err))

    setDeletingUser(null)
    showToast(`User "${deletingUser.name}" deleted successfully.`)
  }

  // Filtered users
  const filteredUsers = users.filter(u => {
    const sTerm = searchTerm.toLowerCase()
    const matchesSearch =
      (u.name && u.name.toLowerCase().includes(sTerm)) ||
      (u.username && u.username.toLowerCase().includes(sTerm)) ||
      (u.email && u.email.toLowerCase().includes(sTerm))

    const matchesRole = filterRole === 'ALL' || u.role === filterRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="w-full font-sans text-slate-900">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all font-bold text-sm ${
          toast.type === 'success' ? 'bg-slate-900 text-emerald-400 border border-emerald-500/30' : 'bg-red-950 text-red-200 border border-red-500/30'
        }`}>
          {toast.type === 'success' ? <Check className="w-4 h-4 text-emerald-400" /> : <ShieldAlert className="w-4 h-4 text-red-400" />}
          {toast.message}
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs mb-6">
        <div>
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#DE7B3D]/10 rounded-2xl border border-[#DE7B3D]/20">
              <Users className="w-6 h-6 text-[#DE7B3D]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Manage administrator accounts and security access control</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-[#DE7B3D]/20 active:scale-98 cursor-pointer"
        >
          <UserPlus className="w-4.5 h-4.5" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{users.length}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">Total System Users</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {users.filter(u => u.status === 'Active').length}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">Active Accounts</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs mb-6">
        <div className="relative w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search by name or email address..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]/30 focus:border-[#DE7B3D] transition-all"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                <th className="py-4 px-6">User Profile</th>
                <th className="py-4 px-6">Account Status</th>
                <th className="py-4 px-6">Created Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-14 text-center text-slate-400 font-semibold">
                    No users found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => {
                  const initials = user.name
                    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    : 'US'

                  return (
                    <tr key={`user-${user.id || idx}-${user.email || idx}`} className="hover:bg-slate-50/90 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DE7B3D] to-amber-600 flex items-center justify-center font-extrabold text-xs text-white shrink-0 shadow-xs">
                            {initials}
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 text-sm leading-tight">{user.name}</div>
                            <div className="text-xs text-slate-600 font-medium mt-0.5">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
                          user.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          <span className={`w-2 h-2 rounded-full shrink-0 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          {user.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-xs text-slate-600 font-bold">
                        {user.createdAt}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(user)}
                            className="p-2 text-slate-600 hover:text-[#DE7B3D] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                            title="Edit User"
                          >
                            <Edit3 className="w-4.5 h-4.5" />
                          </button>

                          <button
                            onClick={() => setDeletingUser(user)}
                            disabled={user.username === 'admin' && users.filter(u => u.role === 'Master Admin').length <= 1}
                            className={`p-2 rounded-xl transition-colors cursor-pointer ${
                              user.username === 'admin' && users.filter(u => u.role === 'Master Admin').length <= 1
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-500 hover:text-red-600 hover:bg-red-50'
                            }`}
                            title="Delete User"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE USER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-5 h-5 text-[#DE7B3D]" />
                <h2 className="text-lg font-bold text-slate-900">Add New System User</h2>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. System Admin"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 focus:border-[#DE7B3D] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. admin@silkytextiles.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 focus:border-[#DE7B3D] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2.5 text-xs font-bold text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 outline-none bg-white cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type={showModalPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter account password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 focus:border-[#DE7B3D] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalPassword(!showModalPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer z-10"
                    title={showModalPassword ? 'Hide password' : 'Show password'}
                  >
                    {showModalPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type={showModalConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Confirm account password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 focus:border-[#DE7B3D] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalConfirmPassword(!showModalConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer z-10"
                    title={showModalConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showModalConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#DE7B3D] hover:bg-[#c96a2e] text-white text-xs font-bold transition-all shadow-md"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-[#DE7B3D]" />
                <h2 className="text-lg font-bold text-slate-900">Edit System User</h2>
              </div>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2.5 text-xs font-bold text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 outline-none bg-white cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password (Leave blank to keep current)</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type={showModalPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalPassword(!showModalPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer z-10"
                    title={showModalPassword ? 'Hide password' : 'Show password'}
                  >
                    {showModalPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <input
                    type={showModalConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DE7B3D]/30 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalConfirmPassword(!showModalConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer z-10"
                    title={showModalConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showModalConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#DE7B3D] hover:bg-[#c96a2e] text-white text-xs font-bold transition-all shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Delete User Account</h3>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to delete <span className="font-bold text-slate-800">{deletingUser.name}</span> ({deletingUser.email})? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors w-full"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md w-full"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
