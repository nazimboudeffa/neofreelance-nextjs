import { connectDB } from "@/lib/db";
import Job from "@/utils/models/Job";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const { page = 1, jobsPerPage = 10, ...filters } = body;

    // Calculer les valeurs pour la pagination
    const skip = (page - 1) * jobsPerPage;

    // Rechercher les jobs avec pagination
    const jobs = await Job.find({ ...filters })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(jobsPerPage);

    // Obtenir le nombre total de jobs correspondant aux filtres
    const totalJobs = await Job.countDocuments({ ...filters });

    // Retourner les résultats avec les métadonnées de pagination
    return NextResponse.json(
      { jobs, total: totalJobs },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}