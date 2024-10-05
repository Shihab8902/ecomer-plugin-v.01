import "framer-plugin/framer.css"
import "../index.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import AuthProvider from "./context/AuthProvider"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();


const root = document.getElementById("root")
if (!root) throw new Error("Root element not found")

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
