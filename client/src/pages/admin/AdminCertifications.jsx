import { useEffect, useState } from 'react'
import adminApi from '../../utils/adminApi'

function AdminCertifications() {
  const [certs, setCerts] = useState([])
  const [form, setForm] = useState({
    name: '',
    issuer: '',
    date: '',
    credentialUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchCerts = async () => {
    const res = await adminApi.get('/api/admin/certifications')
    setCerts(res.data.data)
  }

  useEffect(() => {
    fetchCerts()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await adminApi.post('/api/admin/certifications', form)
      setForm({ name: '', issuer: '', date: '', credentialUrl: '' })
      setMsg('Certification added')
      fetchCerts()
    } catch {
      setMsg('Error adding certification')
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(''), 2000)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return
    await adminApi.delete(`/api/admin/certifications/${id}`)
    fetchCerts()
  }

  const inputClass =
    'bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-t1 placeholder-admin-t3 outline-none focus:border-admin-accent font-mono transition-colors'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LIST */}
      <div className="bg-admin-bg-card border border-admin-border rounded-xl p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-admin-t2 mb-4">
          Certifications ({certs.length})
        </div>
        <div className="flex flex-col gap-1 max-h-96 overflow-y-auto">
          {certs.length === 0 && (
            <p className="font-mono text-xs text-admin-t3">
              No certifications yet
            </p>
          )}
          {certs.map((cert) => (
            <div
              key={cert._id}
              className="flex items-center justify-between py-2 border-b border-admin-border last:border-b-0"
            >
              <div>
                <div className="text-sm text-admin-t1">{cert.name}</div>
                <div className="font-mono text-[10px] text-admin-t2">
                  {cert.issuer}
                </div>
              </div>
              <button
                onClick={() => handleDelete(cert._id)}
                className="font-mono text-[10px] text-admin-danger border border-admin-danger-dim rounded px-2 py-0.5 hover:bg-admin-danger-dim transition-colors"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ADD FORM */}
      <div className="bg-admin-bg-card border border-admin-border rounded-xl p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-admin-t2 mb-4">
          Add certification
        </div>
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Certification name"
            required
            className={inputClass}
          />
          <input
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
            placeholder="Issuer e.g. Google, Udemy"
            required
            className={inputClass}
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className={inputClass}
          />
          <input
            value={form.credentialUrl}
            onChange={(e) =>
              setForm({ ...form, credentialUrl: e.target.value })
            }
            placeholder="Credential URL (optional)"
            className={inputClass}
          />
          {msg && (
            <p
              className={`font-mono text-xs ${msg.startsWith('Error') ? 'text-admin-danger' : 'text-admin-success'}`}
            >
              {msg}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 font-mono"
          >
            {loading ? 'Adding...' : '+ Add certification'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminCertifications
