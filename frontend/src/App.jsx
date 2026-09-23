import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import OAuthCallback from './pages/OAuthCallback'
import Dashboard from './pages/Dashboard'
import MyLinks from './pages/MyLinks'
import Analytics from './pages/Analytics'
import Integrations from './pages/Integrations'
import AppLayout from './components/AppLayout'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />

            <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate to="shorten" replace />} />
                <Route path="shorten" element={<Dashboard />} />
                <Route path="links" element={<MyLinks />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="analytics/:code" element={<Analytics />} />
                <Route path="integrations" element={<Integrations />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}