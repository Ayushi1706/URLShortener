import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function AppLayout() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <Navbar onNewLink={() => navigate('/app/shorten')} />
      <Outlet />
    </div>
  )
}
