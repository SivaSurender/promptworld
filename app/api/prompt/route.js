import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    // {} = all posts, populate = creator who created the post
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error } || "Failed to fetch prompts"),
      { status: 500 }
    );
  }
};
