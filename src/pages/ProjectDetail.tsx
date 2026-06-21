import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

interface Material {
  id: string
  name: string
  quantity: number
  unit: string
  unit_cost: number
  total_cost: number
  supplier: string
}

interface Project {
  id: string
  name: string
  client_name: string
  category: string
  status: string
  total_cost: number
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [project, setProject] = useState<Project | null>(null)
  const [materials, setMaterials] = useState<Material[]>([])
  const [showAddMaterial, setShowAddMaterial] = useState(false)
  const [mat, setMat] = useState({ name: '', quantity: '', unit: '', unit_cost: '', supplier: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
    fetchMaterials()
  }, [])

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProject(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/${id}/materials`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMaterials(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddMaterial = async () => {
    if (!mat.name || !mat.quantity || !mat.unit_cost) return
    try {
      await axios.post(`http://localhost:5000/api/projects/${id}/materials`,
        { ...mat, quantity: Number(mat.quantity), unit_cost: Number(mat.unit_cost) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMat({ name: '', quantity: '', unit: '', unit_cost: '', supplier: '' })
      setShowAddMaterial(false)
      fetchMaterials()
      fetchProject()
    } catch (err) {
      console.error(err)
    }
  }

  const totalMaterials = materials.reduce((sum, m) => sum + Number(m.total_cost), 0)

  if (loading) return <div className="min-h-screen bg-[#111210] flex items-center justify-center"><p className="text-white/30 text-sm">Loading...</p></div>

  return (
    <div className="min-h-screen bg-[#111210] text-white">
      <nav className="flex justify-between items-center px-8 py-5 border-b border-white/[0.06]">
        <h1 className="text-lg font-medium tracking-widest cursor-pointer" onClick={() => navigate('/projects')}>
          COSTOR<span className="text-[#C67C3A]">A</span>Z
        </h1>
        <button onClick={() => navigate('/projects')} className="text-xs text-white/30 hover:text-white tracking-widest uppercase transition-colors">
          ← Projects
        </button>
      </nav>

      <div className="px-8 py-8 max-w-4xl">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-[#C67C3A] mb-2">{project?.category}</p>
          <h2 className="text-2xl font-medium mb-1">{project?.name}</h2>
          <p className="text-white/30 text-sm">{project?.client_name}</p>
        </div>

        {/* Cost Summary */}
        <div className="grid grid-cols-3 gap-1 mb-8 border border-white/[0.06] rounded-lg overflow-hidden">
          <div className="bg-[#1a1917] px-6 py-4">
            <p className="text-xs text-white/30 tracking-widest uppercase mb-2">Materials</p>
            <p className="text-xl font-medium text-[#C67C3A]">R {totalMaterials.toLocaleString()}</p>
          </div>
          <div className="bg-[#1a1917] px-6 py-4">
            <p className="text-xs text-white/30 tracking-widest uppercase mb-2">Labour</p>
            <p className="text-xl font-medium text-white/40">R 0</p>
          </div>
          <div className="bg-[#1a1917] px-6 py-4">
            <p className="text-xs text-white/30 tracking-widest uppercase mb-2">Total</p>
            <p className="text-xl font-medium text-white">R {totalMaterials.toLocaleString()}</p>
          </div>
        </div>

        {/* Materials Section */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-xs tracking-widest uppercase text-white/30">Materials</p>
          <button
            onClick={() => setShowAddMaterial(!showAddMaterial)}
            className="text-xs text-[#C67C3A] hover:text-[#d4893f] tracking-widest uppercase transition-colors"
          >
            + Add material
          </button>
        </div>

        {/* Add Material Form */}
        {showAddMaterial && (
          <div className="border border-white/[0.08] rounded-lg p-6 mb-4 bg-[#1a1917]">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Name *</label>
                <input value={mat.name} onChange={e => setMat({...mat, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-white outline-none focus:border-[#C67C3A] transition-colors"
                  placeholder="Cement bags" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Supplier</label>
                <input value={mat.supplier} onChange={e => setMat({...mat, supplier: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-white outline-none focus:border-[#C67C3A] transition-colors"
                  placeholder="BuildIt" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Quantity *</label>
                <input type="number" value={mat.quantity} onChange={e => setMat({...mat, quantity: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-white outline-none focus:border-[#C67C3A] transition-colors"
                  placeholder="10" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Unit</label>
                <select value={mat.unit} onChange={e => setMat({...mat, unit: e.target.value})}
                  className="w-full bg-[#111210] border border-white/10 rounded px-4 py-2.5 text-sm text-white outline-none focus:border-[#C67C3A] transition-colors">
                  <option value="">Select unit</option>
                  <option value="each">Each</option>
                  <option value="m">m</option>
                  <option value="m2">m²</option>
                  <option value="m3">m³</option>
                  <option value="kg">kg</option>
                  <option value="ton">ton</option>
                  <option value="liter">liter</option>
                  <option value="bag">bag</option>
                  <option value="sheet">sheet</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Unit cost (R) *</label>
                <input type="number" value={mat.unit_cost} onChange={e => setMat({...mat, unit_cost: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-white outline-none focus:border-[#C67C3A] transition-colors"
                  placeholder="85.00" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowAddMaterial(false)}
                className="flex-1 border border-white/10 text-white/40 text-xs py-2.5 rounded tracking-wide hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={handleAddMaterial}
                className="flex-1 bg-[#C67C3A] text-[#111210] text-xs font-medium py-2.5 rounded tracking-wide hover:bg-[#d4893f] transition-colors">
                Add material
              </button>
            </div>
          </div>
        )}

        {/* Materials List */}
        {materials.length === 0 ? (
          <div className="border border-white/[0.06] rounded-lg p-8 text-center">
            <p className="text-white/20 text-sm">No materials added yet</p>
          </div>
        ) : (
          <div className="border border-white/[0.06] rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 px-6 py-3 border-b border-white/[0.06]">
              <p className="text-xs text-white/30 tracking-widest uppercase col-span-2">Item</p>
              <p className="text-xs text-white/30 tracking-widest uppercase text-right">Qty</p>
              <p className="text-xs text-white/30 tracking-widest uppercase text-right">Unit cost</p>
              <p className="text-xs text-white/30 tracking-widest uppercase text-right">Total</p>
            </div>
            {materials.map(m => (
              <div key={m.id} className="grid grid-cols-5 px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.02]">
                <div className="col-span-2">
                  <p className="text-sm">{m.name}</p>
                  <p className="text-xs text-white/30">{m.supplier}</p>
                </div>
                <p className="text-sm text-right text-white/60">{m.quantity} {m.unit}</p>
                <p className="text-sm text-right text-white/60">R {Number(m.unit_cost).toLocaleString()}</p>
                <p className="text-sm text-right text-[#C67C3A]">R {Number(m.total_cost).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}