import { MotionProvider } from "./components/MotionProvider";
import { Routes,Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServicePage } from "./pages/ServicePage";
import { BarbersPage } from "./pages/BarbersPage";
import { BarberPage } from "./pages/BarberPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
export function App() {
  return <MotionProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={"om-oss"} element={<AboutPage />} />
        <Route path={"tjanster"} element={<ServicesPage />} />
        <Route path={"tjanster/:slug"} element={<ServicePage />} />
        <Route path={"barberare"} element={<BarbersPage />} />
        <Route path={"barberare/:slug"} element={<BarberPage />} />
        <Route path={"galleri"} element={<GalleryPage />} />
        <Route path={"recensioner"} element={<ReviewsPage />} />
        <Route path={"kontakt"} element={<ContactPage />} />
        <Route path={"integritet"} element={<PrivacyPage />} />
        <Route path={"404"} element={<NotFoundPage />} />
        <Route path={"/404"} element={<NotFoundPage />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Route>
    </Routes>
  </MotionProvider>;
}
