import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

async function handler() {
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true });
}

export { handler as POST, handler as GET };
