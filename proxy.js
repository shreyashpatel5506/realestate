import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function proxy(request) {
    console.log("🔥 Proxy running...");

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { success: false, message: "Token missing" },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded id:", decoded.id);
        console.log("Decoded role:", decoded.role);

        if (decoded.role !== "agent") {
            return NextResponse.json(
                { success: false, message: "Agents only" },
                { status: 403 }
            );
        }

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("agentId", decoded.id);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

    } catch (err) {
        console.log("JWT ERROR:", err);
        return NextResponse.json(
            { success: false, message: "Invalid or expired token" },
            { status: 401 }
        );
    }
}

export const config = {
    matcher: ["/api/property/createProperty"],
};
