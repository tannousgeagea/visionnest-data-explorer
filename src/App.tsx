
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import DataLake from "./pages/DataLake";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ImageDetail from "./pages/ImageDetail";
import NotFound from "./pages/NotFound";
import ModelsList from "./pages/models/ModelsList";
import ModelDetail from "./pages/models/ModelDetail";
import ModelTraining from "./pages/models/ModelTraining";
import CreateProject from "./pages/CreateProject";
import Search from "./pages/Search";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="data-lake" element={<DataLake />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/new" element={<CreateProject />} />
            <Route path="projects/:projectId" element={<ProjectDetail />} />
            <Route path="projects/:projectId/models" element={<ModelsList />} />
            <Route path="projects/:projectId/models/:modelId" element={<ModelDetail />} />
            <Route path="projects/:projectId/models/:modelId/train" element={<ModelTraining />} />
            <Route path="search" element={<Search />} />
          </Route>
          <Route path="/projects/:projectId/images/:imageId" element={<ImageDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
