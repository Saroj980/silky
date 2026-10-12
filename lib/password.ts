/**
 * Password Hashing & Verification Utilities
 * Uses SHA-256 (64-character hexadecimal digest) for password hashing in MySQL database.
 * Supports legacy PBKDF2 and plaintext fallback with auto-upgrade.
 */

/**
 * Computes standard SHA-256 hex digest of a string
 */
export async function sha256Hex(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Hashes a plaintext password using standard SHA-256.
 * Returns 64-character hexadecimal string stored in DB.
 */
export async function hashPassword(password: string): Promise<string> {
  return sha256Hex(password.trim())
}

/**
 * Checks whether a given stored password string is already formatted as a hash (SHA-256 or PBKDF2).
 */
export function isHashedPassword(storedValue: string): boolean {
  if (!storedValue || typeof storedValue !== 'string') return false
  const trimmed = storedValue.trim()
  // Standard SHA-256 (64 hex characters)
  if (/^[a-f0-9]{64}$/i.test(trimmed)) return true
  // Legacy PBKDF2 format (32 hex salt : 64 hex hash)
  const parts = trimmed.split(':')
  if (parts.length === 2 && parts[0].length === 32 && parts[1].length === 64) return true
  return false
}

/**
 * Verifies a plaintext password against a stored SHA-256 hash, PBKDF2, or legacy plaintext.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash || !password) return false

  const pTrim = password.trim()
  const sTrim = storedHash.trim()

  // 1. Direct SHA-256 match
  if (/^[a-f0-9]{64}$/i.test(sTrim)) {
    const computed = await sha256Hex(pTrim)
    return computed.toLowerCase() === sTrim.toLowerCase()
  }

  // 2. Legacy PBKDF2 format
  if (sTrim.includes(':')) {
    try {
      const [saltHex, originalHashHex] = sTrim.split(':')
      const saltMatch = saltHex.match(/.{1,2}/g)
      if (saltMatch && originalHashHex) {
        const salt = new Uint8Array(saltMatch.map(byte => parseInt(byte, 16)))
        const encoder = new TextEncoder()
        const keyMaterial = await crypto.subtle.importKey(
          'raw',
          encoder.encode(pTrim),
          { name: 'PBKDF2' },
          false,
          ['deriveBits']
        )
        const derivedBits = await crypto.subtle.deriveBits(
          {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
          },
          keyMaterial,
          32 * 8
        )
        const hashHex = Array.from(new Uint8Array(derivedBits)).map(b => b.toString(16).padStart(2, '0')).join('')
        if (hashHex === originalHashHex) return true
      }
    } catch (err) {
      console.warn('PBKDF2 verification check fallback:', err)
    }
  }

  // 3. Fallback plaintext comparison (for legacy records before encryption)
  return pTrim === sTrim
}
