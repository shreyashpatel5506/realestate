export async function GET(req) {
    try {
        await connectMongo();

        const { searchParams } = new URL(req.url);
        const AgentId = searchParams.get("aid");

        if (!AgentId) {
            return NextResponse.json(
                { success: false, message: "AgentId missing" },
                { status: 400 }
            );
        }

        const ratings = await Ratings.find({ Agent: AgentId })
            .populate("user", "name email") // populate user info
            .lean();

        return NextResponse.json(
            {
                success: true,
                message: "Ratings fetched successfully",
                ratings,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error during retrieve rating",
            },
            { status: 500 }
        );
    }
}
