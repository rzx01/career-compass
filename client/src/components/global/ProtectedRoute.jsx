// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); 
    const token = localStorage.getItem("token");

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users/verify-token", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(data.isValid);
                } else {
                    setIsAuthenticated(false); 
                }
            } catch (error) {
                setIsAuthenticated(false); 
            }
        };

        if (token) {
            verifyToken();
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/authenticate" replace />;
};

export default ProtectedRoute;
