import {NextApiRequest, NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server";
import {db} from "@/db";
import {playedGames} from "@/db/schema";


export async function POST(req: NextRequest, res: NextResponse) {
const data = await req.json()
    // const data = await db.insert(playedGames).values({
    //     userId:
    // })

    console.log(data)
    return NextResponse.json(data)
}