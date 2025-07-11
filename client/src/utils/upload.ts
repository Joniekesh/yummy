import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const upload = async (file: any) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);

  const res: any = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data
  );
  const { url } = res.data;
  return url;
};
export default upload;
