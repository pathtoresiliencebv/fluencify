
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { userEmail, userName } = await req.json();

    try {
        const result = await db.select().from(usersTable)
            .where(eq(usersTable.email, userEmail));

        if (result?.length == 0) {
            const result: any = await db.insert(usersTable).values({
                name: userName,
                email: userEmail,
                credits: 0,
            }).returning(usersTable);

            return NextResponse.json(result[0]);
        }
        return NextResponse.json(result[0]);
    } catch (e) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}