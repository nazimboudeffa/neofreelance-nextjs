import { connect } from "@/utils/config/db";
import Job from "@/utils/models/Job";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {

    const body = await request.json();
    console.log(body);
    const job = await Job.findOne({ ...body });
    console.log(job);
    return NextResponse.json({ job }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }