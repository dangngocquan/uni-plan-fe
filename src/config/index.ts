import dotenv from "dotenv";

dotenv.config();

export const googleConfig = {
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};

export const apiConfig = {
  ROOT_API: process.env.NEXT_PUBLIC_ROOT_API,
};
