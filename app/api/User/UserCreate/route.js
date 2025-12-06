import connectMongo from "@/app/db";
import { NextResponse } from "next/server";

const salt = bcrypt.genSaltSync(10);

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SCERET,
        { eexpiresIn: "7d" }
    )
}

export default async function POST(req, res) {
    try {
        await connectMongo()
        const { name, email, phoneNumber, role, password } = await req.json()


        if (!name || !email || !phoneNumber || !role || !password) {
            return NextResponse.json({
                success: false,
                message: "any feild is empty"
            }, { status: 203 })
        }

        const hashedPassword = bcrypt.hash('password', salt);

        if (phoneNumber.include(String)) {
            return NextResponse.json({
                success: false,
                message: " Phone number is wrong"
            }, { status: 203 })
        }
        const newUser = {
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        }
        const token = generateToken(newUser)

        const respone = {
            success: true,
            message: "User Created Succesfully",
            newUser,
            token
        }

        return NextResponse.json(respone, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error during to create a User",

        }, { status: 500 })
    }

}