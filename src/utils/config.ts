interface config {
  apiBaseUrl: string;
}

const Config: config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
};

export default Config;
