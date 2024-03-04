"use server";

export async function getShout(type = 1, parent = null) {
  "use server";

  console.log("New COmment");

  return "newComment";
}

export async function addShout(comment) {
  "use server";
  
  console.log(comment);

  return "newComment";
}
