import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {
    console.log("🔥 Middleware running...");

    const url = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { success: false, message: "Token missing" },
            { status: 401 }
        );
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Invalid or expired token" },
            { status: 401 }
        );
    }

    const agentOnlyRoutes = [
        "/api/property/createProperty",
        "/api/property/updatepropertysatus",
        "/api/property/deleteProperty",
        "/api/booking/statusbokkingchanged"
    ];

    const userRoutes = [
        "/api/favourite/addFavourite",
        "/api/favourite/deleteFavourite",
        "/api/favourite/getFavourite",
        "/api/User/getProfile",
        "/api/rating/addrating",
        "/api/booking/addbooking/",
        "/api/booking/deletebooking"
    ];

    if (agentOnlyRoutes.some(route => url.startsWith(route))) {
        if (decoded.role !== "agent") {
            return NextResponse.json(
                { success: false, message: "Agents only" },
                { status: 403 }
            );
        }
    }

    if (userRoutes.some(route => url.startsWith(route))) {
        // logged in → allowed
    }

    const newHeaders = new Headers(request.headers);
    newHeaders.set("userId", decoded.id);
    newHeaders.set("role", decoded.role);

    return NextResponse.next({
        request: {
            headers: newHeaders,
        },
    });
}

export const config = {
    matcher: [
        "/api/property/:path*",
        "/api/favourite/:path*",
        "/api/rating/addrating/:path*",
        "/api/booking/:path*"
    ]
};
