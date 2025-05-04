import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image?.name?.replaceAll(
    "/",
    ""
  )}`;
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // For create
  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  }

  // For edit
  if (id) {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  if (hasImagePath) {
    return data;
  }
  // Upload image to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  // Delete the cabin if the image upload fails
  if (uploadError) {
    console.error(uploadError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and cabin could not be created."
    );
  }
  return data;
}
