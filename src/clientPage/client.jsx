import "./client.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Client() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

        fetch(`${API_BASE_URL}/clients`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setClients(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-screen">Error: {error}</div>;

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">Client Overview</h1>
            <pre className="bg-gray-100 p-4 rounded text-black">
                {JSON.stringify(clients, null, 2)}
            </pre>
        </div>
    );
}

export default Client;
