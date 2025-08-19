import {create} from "zustand";
import {Project} from "@/types";

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  selectedProject: Project | null;
}

interface ProjectActions {
  fetchProjects: (status?: Project["status"]) => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  setSelectedProject: (project: Project | null) => void;
  clearError: () => void;
}

type ProjectStore = ProjectState & ProjectActions;

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  selectedProject: null,

  fetchProjects: async (status?: Project["status"]) => {
    set({loading: true, error: null});

    try {
      const url = status ? `/api/projects?status=${status}` : "/api/projects";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        set({projects: result.data, loading: false});
      } else {
        throw new Error(result.error || "Failed to fetch projects");
      }
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  },

  fetchProjectById: async (id: string) => {
    set({loading: true, error: null});

    try {
      const response = await fetch(`/api/projects/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        set({selectedProject: result.data, loading: false});
      } else {
        throw new Error(result.error || "Failed to fetch project");
      }
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  },

  setSelectedProject: (project: Project | null) => {
    set({selectedProject: project});
  },

  clearError: () => {
    set({error: null});
  },
}));

// Selector hooks for better performance
export const useProjects = () => useProjectStore((state) => state.projects);
export const useProjectsLoading = () =>
  useProjectStore((state) => state.loading);
export const useProjectsError = () => useProjectStore((state) => state.error);
export const useSelectedProject = () =>
  useProjectStore((state) => state.selectedProject);
