import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../../pages/Landing";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Landing pública */}
      <Route path="/" element={<Landing />} />

      {/* Fallback a la raíz */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
