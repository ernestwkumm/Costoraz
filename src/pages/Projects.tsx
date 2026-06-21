import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NewProjectModal from '../components/NewProjectModal'

interface Project {
  id: string
  name: string
  client_name: string
  category: string
  status: string
  total_cost: number
  created_at: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchProjects()
  }, [])

const fetchProjects = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setProjects(res.data)
  } catch (err: any) {
    if (err.response?.status === 401) {
      localStorage.clear()
      navigate('/login')
    }
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-[#111210] text-white">
      <nav className="flex justify-between items-center px-8 py-5 border-b border-white/[0.06]">
        <h1 className="text-lg font-medium tracking-widest">
          COSTOR<span className="text-[#C67C3A]">A</span>Z
        </h1>
        <button
          onClick={() => { localStorage.clear(); navigate('/login') }}
          className="text-xs text-white/30 hover:text-white tracking-widest uppercase transition-colors"
        >
          Sign out
        </button>
      </nav>

      <div className="px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#C67C3A] mb-2">Projects</p>
            <h2 className="text-2xl font-medium">Your costing projects</h2>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#C67C3A] text-[#111210] text-xs font-medium px-5 py-2.5 rounded tracking-wide hover:bg-[#d4893f] transition-colors">
            + New project
          </button>
        </div>

        {loading ? (
          <p className="text-white/30 text-sm">Loading...</p>
        ) : projects.length === 0 ? (
          <div className="border border-white/[0.06] rounded-lg p-12 text-center">
            <p className="text-white/30 text-sm mb-2">No projects yet</p>
            <p className="text-white/20 text-xs">Create your first costing project to get started</p>
          </div>
        ) : (
          <div className="grid gap-1 border border-white/[0.06] rounded-lg overflow-hidden">
            {projects.map(project => (
            <div key={project.id} onClick={() => navigate(`/projects/${project.id}`)} className="bg-[#111210] px-6 py-4 flex justify-between items-center hover:bg-white/[0.02] transition-colors cursor-pointer border-b border-white/[0.04]">
                <div>
                  <p className="text-sm font-medium">{project.name}</p>
                  <p className="text-xs text-white/30 mt-0.5">{project.client_name} · {project.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#C67C3A]">R {Number(project.total_cost || 0).toFixed(2)}</p>
                  <p className="text-xs text-white/30 mt-0.5 capitalize">{project.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <NewProjectModal
          onClose={() => setShowModal(false)}
          onCreated={fetchProjects}
        />
      )}
    </div>
  )
}