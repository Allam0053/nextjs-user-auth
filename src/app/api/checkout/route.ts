import { get } from "lodash";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ hello: "Next.js" });
}
export async function POST(request: Request) {
  const formData: { data: { item_name: string; item_count: number }[] } =
    await request.json();
  const data = get(
    formData,
    "data",
    [] as { item_name: string; item_count: number }[]
  );
  const total = data.reduce(
    (prev, curr) => get(curr, "item_count", 0) + prev,
    0
  );
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          NextResponse.json({
            code: 200,
            message: `Bought ${total} items`,
          })
        ),
      1000
    );
  });
  // return
}
