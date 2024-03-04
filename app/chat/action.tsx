"use server";
import { revalidatePath } from "next/cache";
// import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
// import { getServerSession } from "next-auth";
import { addShout } from "./_lib/process";
export type FormState = {
  text: string;
  errors: {
    text: string | undefined;
  };
};

export async function createTodoAction(
  previousState: FormState,
  formData: FormData,
) {
  const text = formData.get("comment") as string;
  const type = formData.get("type");
  const parent = formData.get("id");

  if (text) {
    await addShout("Adding " + text);
  }
  if (text == "test") {
    return {
      text,
      errors: {
        text: "Please actually make a comment!",
      },
    };
  }
  revalidatePath("/");
  return {
    text: "Thanks for the comment ",
    errors: {
      text: undefined,
    },
  };
}
