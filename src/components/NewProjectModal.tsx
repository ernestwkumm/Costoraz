import { useState } from 'react'
import axios from 'axios'

interface Props {
  onClose: () => void
  onCreated: () => void
}

export default function NewProjectModal({ onClose, onCreated }: Props) {
  const [name, setName] = useState('')
  const [client, setClient] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')

  const handleCreate = async () => {
    if (!name) return
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/projects',
        { name, client_name: client, category },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      onCreated()
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#1a1917] border border-white/[0.08] rounded-lg w-full max-w-md p-8">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-[#C67C3A] mb-2">New project</p>
          <h2 className="text-xl font-medium">Create a costing project</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Project name *</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#C67C3A] transition-colors"
              placeholder="Kitchen renovation"
            />
          </div>

          <div>
            <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Client name</label>
            <input
              value={client}
              onChange={e => setClient(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#C67C3A] transition-colors"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white outline-none focus:border-[#C67C3A] transition-colors"
            >
              <option value="" className="bg-[#1a1917]">Select category</option>
              <option value="Construction" className="bg-[#1a1917]">Construction</option>
              <option value="Manufacturing" className="bg-[#1a1917]">Manufacturing</option>
              <option value="Cabinetry" className="bg-[#1a1917]">Cabinetry</option>
              <option value="Furniture" className="bg-[#1a1917]">Furniture</option>
              <option value="Electrical" className="bg-[#1a1917]">Electrical</option>
              <option value="Plumbing" className="bg-[#1a1917]">Plumbing</option>
              <option value="Food Recipe" className="bg-[#1a1917]">Food Recipe</option>
              <option value="Household" className="bg-[#1a1917]">Household</option>
              <option value="Other" className="bg-[#1a1917]">Other</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 border border-white/10 text-white/40 text-xs font-medium py-3 rounded tracking-wide hover:text-white hover:border-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading || !name}
            className="flex-1 bg-[#C67C3A] text-[#111210] text-xs font-medium py-3 rounded tracking-wide hover:bg-[#d4893f] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create project'}
          </button>
        </div>
      </div>
    </div>
  )
}
