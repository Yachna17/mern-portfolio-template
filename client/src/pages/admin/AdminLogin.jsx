import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import adminApi from '../../utils/adminApi'

function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await adminApi.post('/api/admin/login', { password })
      // CUSTOMIZE: Must match your admin dashboard route in App.jsx
      // Pattern is always: /your-admin-route/dashboard
      navigate('/your-admin-route/dashboard')
    } catch {
      setError('Invalid password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-admin-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="font-mono text-lg text-admin-t1 mb-1">
            ⬡ admin panel
          </div>
          {/* CUSTOMIZE: Your domain — matches what you put in AdminDashboard */}
          <div className="font-mono text-xs text-admin-t2">YOUR_DOMAIN</div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-admin-bg-card border border-admin-border-mid rounded-xl p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-admin-t2">
              password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="bg-admin-bg border border-admin-border-mid rounded-lg px-4 py-3 text-sm text-admin-t1 placeholder-admin-t3 outline-none focus:border-admin-accent transition-colors duration-200 font-mono"
              autoFocus
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-admin-danger">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <p className="text-center font-mono text-[10px] text-admin-t3 mt-4">
          This page is not publicly linked.
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
