import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../../pages/Landing";
import VideoPlayer from "@/pages/VideoPlayer";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Landing pública */}
      <Route path="/" element={<Landing />} />

      {/* Fallback a la raíz */}
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* Reproductor de video por URL */}
      <Route path="/video" element={<VideoPlayer />} />
    </Routes>
  );
};

export default AppRouter;
