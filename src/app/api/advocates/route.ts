import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(req: Request) {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "2", 10);
  const searchTerm = searchParams.get("term");

  const filteredAdvocates = advocateData.filter((advocate) => {
    const advocatePropertiesAsLowerCaseString = Object.values(advocate).map(
      (a) => a.toString().toLowerCase()
    );
    const searchTermAsLowerCaseString = searchTerm || "";
    if (!searchTerm) return true;

    return advocatePropertiesAsLowerCaseString.some((v) =>
      v?.includes(searchTermAsLowerCaseString)
    );
  });

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const totalPages = Math.ceil(filteredAdvocates.length / limit);

  const paginatedData = filteredAdvocates.slice(startIndex, endIndex);

  return Response.json({
    totalPages: totalPages,
    page: page,
    limit: limit,
    data: paginatedData,
  });
}
