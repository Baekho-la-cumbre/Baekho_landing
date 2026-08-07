import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../../pages/Landing";
import VideoPlayer from "@/pages/VideoPlayer";
import LogrosPage from "@/pages/LogrosPage";
import DeportistasPage from "@/pages/DeportistasPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/logros" element={<LogrosPage />} />
      <Route path="/deportistas" element={<DeportistasPage />} />
      <Route path="/video" element={<VideoPlayer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
