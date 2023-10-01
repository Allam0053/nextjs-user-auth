import { get } from "lodash";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ hello: "Next.js" });
}
export async function POST(request: Request) {
  const formData = await request.json();
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          NextResponse.json({
            code: 200,
            message: `Added ${get(formData, "item_name", "-")} ${get(
              formData,
              "item_count",
              0
            )} Cart`,
          })
        ),
      1000
    );
  });
  // return
}
