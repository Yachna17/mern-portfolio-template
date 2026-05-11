import { useEffect, useState } from 'react'
import adminApi from '../../utils/adminApi'

// CUSTOMIZE: Must exactly match the categories array in Skills.jsx
// These populate the dropdown when adding a skill via the admin panel.
// If you changed categories in Skills.jsx, copy that same array here.
// Keeping both in sync is important — a skill added with a category
// that doesn't exist in Skills.jsx simply won't show up in any column.

const categories = [
  'CATEGORY_1',
  'CATEGORY_2',
  'CATEGORY_3',
  'CATEGORY_4',
  'CATEGORY_5',
  'CATEGORY_6',
]

function AdminSkills() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ name: '', icon: '', category: 'Frontend' })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchSkills = async () => {
    const res = await adminApi.get('/api/skills')
    setSkills(res.data.data)
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await adminApi.post('/api/admin/skills', form)
      setForm({ name: '', icon: '', category: 'Frontend' })
      setMsg('Skill added')
      fetchSkills()
    } catch {
      setMsg('Error adding skill')
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(''), 2000)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    await adminApi.delete(`/api/admin/skills/${id}`)
    fetchSkills()
  }

  const inputClass =
    'bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-t1 placeholder-admin-t3 outline-none focus:border-admin-accent font-mono transition-colors'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* CURRENT SKILLS */}
      <div className="bg-admin-bg-card border border-admin-border rounded-xl p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-admin-t2 mb-4">
          Current skills ({skills.length})
        </div>
        <div className="flex flex-col gap-1 max-h-96 overflow-y-auto">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center justify-between py-2 border-b border-admin-border last:border-b-0"
            >
              <span className="text-sm text-admin-t1">
                {skill.name}
                <span className="text-admin-t2 ml-2 text-xs">
                  · {skill.category}
                </span>
              </span>
              <button
                onClick={() => handleDelete(skill._id)}
                className="font-mono text-[10px] text-admin-danger border border-admin-danger-dim rounded px-2 py-0.5 hover:bg-admin-danger-dim transition-colors"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ADD SKILL */}
      <div className="bg-admin-bg-card border border-admin-border rounded-xl p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-admin-t2 mb-4">
          Add skill
        </div>
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Skill name e.g. Docker"
            required
            className={inputClass}
          />
          <input
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            placeholder="Devicon class e.g. devicon-docker-plain colored"
            required
            className={inputClass}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClass}
          >
            {categories.map((c) => (
              <option
                key={c}
                value={c}
                className="bg-admin-bg-card text-admin-t1"
              >
                {c}
              </option>
            ))}
          </select>
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
            {loading ? 'Adding...' : '+ Add skill'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminSkills
