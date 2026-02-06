"use client";

import { useEffect, useState } from "react";
import { http } from "@/lib/api/http";

export default function HomePage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [health, setHealth] = useState("not tested");
    const [profileStatus, setProfileStatus] = useState("not tested");

    useEffect(() => {
        let cancelled = false;

        // 1) basic reachability check
        http
            .get("/actuator/health")
            .then(() => {
                if (!cancelled) setHealth("backend reachable ");
            })
            .catch(() => {
                if (!cancelled) setHealth("backend not reachable (URL/CORS) ");
            });

        // 2) cookie auth check
        http
            .get("/api/v1/profile")
            .then(() => {
                if (!cancelled) setProfileStatus("cookie auth works (profile 200) ");
            })
            .catch((e) => {
                if (cancelled) return;

                if (e?.response?.status === 401) {
                    setProfileStatus("not logged in yet (profile 401) ✅");
                } else {
                    setProfileStatus("profile call failed (CORS?) ");
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main style={{ padding: 24 }}>
            <h1>Dicestore Frontend</h1>
            <p>API URL: {baseUrl}</p>
            <p>Health: {health}</p>
            <p>Auth check: {profileStatus}</p>
        </main>
    );
}
