import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(req) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Token missing",
                }),
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "agent") {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Access denied: Agents only",
                }),
                { status: 403 }
            );
        }

        // ⭐ Add agentId to headers
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("agentId", decoded.id);

        // ⭐ MUST pass updated headers
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: "Invalid or expired token",
            }),
            { status: 500 }
        );
    }
}

export const config = {
    matcher: ["/api/property/createProperty"],
};
