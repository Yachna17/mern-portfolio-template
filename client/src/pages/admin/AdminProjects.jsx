import { useEffect, useState } from 'react'
import adminApi from '../../utils/adminApi'

function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    githubUrl: '',
    imageurl: '',
    featured: false,
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchProjects = async () => {
    const res = await adminApi.get('/api/projects')
    setProjects(res.data.data)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        image: form.imageUrl,
        techStack: form.techStack
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }
      await adminApi.post('/api/admin/projects', payload)
      setForm({
        title: '',
        description: '',
        techStack: '',
        liveUrl: '',
        githubUrl: '',
        featured: false,
      })
      setMsg('Project added')
      fetchProjects()
    } catch {
      setMsg('Error adding project')
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(''), 2000)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await adminApi.delete(`/api/admin/projects/${id}`)
    fetchProjects()
  }

  const toggleFeatured = async (project) => {
    await adminApi.put(`/api/admin/projects/${project._id}`, {
      ...project,
      featured: !project.featured,
    })
    fetchProjects()
  }

  const inputClass =
    'bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-t1 placeholder-admin-t3 outline-none focus:border-admin-accent font-mono transition-colors'

  return (
    <div className="flex flex-col gap-6">
      {/* LIST */}
      <div className="bg-admin-bg-card border border-admin-border rounded-xl p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-admin-t2 mb-4">
          Projects ({projects.length})
        </div>
        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-center justify-between py-2 border-b border-admin-border last:border-b-0"
            >
              <div>
                <span className="text-sm text-admin-t1">{project.title}</span>
                {project.featured && (
                  <span className="ml-2 font-mono text-[10px] text-accent border border-admin-accent-dim rounded px-1.5 py-0.5">
                    featured
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFeatured(project)}
                  className="font-mono text-[10px] text-admin-accent border border-admin-accent-dim rounded px-2 py-0.5 hover:bg-admin-accent-dim transition-colors"
                >
                  {project.featured ? 'unfeature' : 'feature'}
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="font-mono text-[10px] text-admin-danger border border-admin-danger-dim rounded px-2 py-0.5 hover:bg-admin-danger-dim transition-colors"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD FORM */}
      <div className="bg-admin-bg-card border border-admin-border rounded-xl p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-admin-t2 mb-4">
          Add project
        </div>
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Project title"
            required
            className={inputClass}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            rows={3}
            required
            className={`${inputClass} resize-none`}
          />
          <input
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
            placeholder="Tech stack (comma separated) e.g. React, Node.js"
            className={inputClass}
          />
          <input
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            placeholder="Live URL (optional)"
            className={inputClass}
          />
          <input
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            placeholder="GitHub URL (optional)"
            className={inputClass}
          />
          <input
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            placeholder="Image URL (optional) — paste Cloudinary or imgur link"
            className={inputClass}
          />
          <label className="flex items-center gap-2 font-mono text-xs text-admin-t1 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4"
            />
            Featured project (shows full width)
          </label>
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
            {loading ? 'Adding...' : '+ Add project'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminProjects
