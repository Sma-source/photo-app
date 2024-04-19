import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Photo from "./Photo";

const fetchUserPhotos = async (user, supabaseServer) => {
  if (!user) return;
  const folderPath = `user_uploads/${user.id}/`;
  const { data, error } = await supabaseServer.storage
    .from("photos")
    .list(folderPath);

  if (error) {
    console.error("Error fetching photos", error);
    return;
  }
  return data;
};

const getPhotoUrls = async (photos, user, supabaseServer) => {
  return Promise.all(
    photos.map(async (photo) => {
      const { data, error } = await supabaseServer.storage
        .from("photos")
        .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60);
      if (error) {
        console.error("Error generating signed url", error);
        return null;
      }
      return { url: data.signedUrl, photoName: photo.name };
    })
  );
};
const PhotoGrid = async () => {
  const cookieStore = cookies();

  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  const photos = await fetchUserPhotos(user, supabaseServer);
  const photoObjects = await getPhotoUrls(photos, user, supabaseServer);
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {photoObjects.map((photo) => (
        <Photo
          key={photo.photoName}
          src={photo.url}
          alt={`Photo ${photo.photoName}`}
          width={200}
          height={200}
          photoName={photo.photoName}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
