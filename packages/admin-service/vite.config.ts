import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

const { STAGE } = process.env;

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: "client-dist",
  },
  base: STAGE ?? "/dev/" + "services/admin/",
});
