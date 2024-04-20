interface config {
  apiBaseUrl: string;
  googleClientId: string;
  googleClientSecret: string;
}

const Config: config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};

export default Config;
