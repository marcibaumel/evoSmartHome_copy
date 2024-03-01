import { NextRequest, NextResponse } from "next/server";

const updateSession = async (request : NextRequest) => {
    const session = request.cookies.get('jwt_token')?.value;
    if(!session) return;

    return NextResponse.next();
}

export default updateSession;