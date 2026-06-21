import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#111210] text-white p-8">
      <div className="flex justify-between items-center mb-10 border-b border-white/08 pb-6">
        <h1 className="text-xl font-medium tracking-widest">
          COSTOR<span className="text-[#C67C3A]">A</span>Z
        </h1>
        <button
          onClick={handleLogout}
          className="text-xs text-white/30 hover:text-white tracking-widest uppercase transition-colors"
        >
          Sign out
        </button>
      </div>

      <div className="max-w-2xl">
        <p className="text-xs tracking-widest uppercase text-[#C67C3A] mb-4">Dashboard</p>
        <h2 className="text-3xl font-medium mb-2">
          Welcome, {user.first_name}
        </h2>
        <p className="text-white/40 text-sm">Your workspace is ready.</p>
      </div>
    </div>
  )
}