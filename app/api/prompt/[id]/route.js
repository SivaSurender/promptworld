import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (req, res) => {
  try {
    await connectToDB();
    // {} = all posts, populate = creator who created the post
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error } || "Prompt not found"), {
      status: 500,
    });
  }
};

// PATCH

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const updatedPrompt = await Prompt.findById(params.id);
    if (!updatedPrompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }
    updatedPrompt.prompt = prompt;
    updatedPrompt.tag = tag;
    await updatedPrompt.save();
    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error } || "Failed to update prompt"),
      { status: 500 }
    );
  }
};

// DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response(JSON.stringify({ message: "Prompt deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error } || "Failed to delete prompt"),
      { status: 500 }
    );
  }
};
