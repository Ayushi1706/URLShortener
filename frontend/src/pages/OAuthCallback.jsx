import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function OAuthCallback() {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const token = searchParams.get('token')

        if (token) {
            // Store JWT token in localStorage
            localStorage.setItem('authToken', token)

            // Redirect to dashboard
            navigate('/app/shorten')
        } else {
            setError('Authentication failed. No token received.')
            setTimeout(() => navigate('/login'), 2000)
        }
    }, [searchParams, navigate])

    return (
        <div className="min-h-screen bg-[#0A0E1F] flex items-center justify-center">
            <div className="text-center text-white">
                <p className="text-lg">Redirecting...</p>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    )
}