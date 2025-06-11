import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

function copy404Plugin() {
  return {
    name: "copy-index-to-404",
    closeBundle: () => {
      fs.copyFileSync("dist/index.html", "dist/404.html");
    },
  };
}

export default defineConfig({
  base: "/EasyForms/",
  plugins: [react(), tailwindcss(), copy404Plugin()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Replace with your backend server URL
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS
      },
    },
  },
});
