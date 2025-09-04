import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Changed from react-swc

export default defineConfig({
  plugins: [react()],
});
