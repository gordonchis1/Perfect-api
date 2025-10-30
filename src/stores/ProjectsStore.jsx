import { create } from "zustand";
import { renameProject } from "../utils/renameProject";
import { deleteProject } from "../utils/deleteProject";
import { updateProjectsFile } from "../utils/updateProjectsFile";
import { createNewProject } from "../utils/createNewProject";

export const useProjectsStore = create((set, get) => ({
  projects: undefined,
  filters: {
    all: true,
    favorites: false,
    recent: false,
    search: "",
  },

  initProjects: (projects) => {
    set({ projects });
  },
  renameProject: async ({ id, newName }) => {
    try {
      const updatedProject = await renameProject(id, newName);
      set((state) => {
        const updatedProjects = [...state.projects];

        const renameIdx = updatedProjects.findIndex(
          (project) => project.id === id
        );

        updatedProjects[renameIdx] = updatedProject;
        return { projects: updatedProjects };
      });
    } catch (error) {
      set((state) => {
        return {
          projects: state.projects,
        };
      });
      throw Error(error);
    }
  },
  deleteProject: (id) => {
    set((state) => {
      const updatedProjects = [...state.projects];

      const delatedIndex = updatedProjects.findIndex((pro) => pro.id === id);
      updatedProjects.splice(delatedIndex, 1);
      deleteProject(id);

      return { projects: updatedProjects };
    });
  },
  addProjectToFavorite: async (id) => {
    const state = get();
    const updatedProjects = [...state.projects];
    const projectIdx = updatedProjects.findIndex((pro) => pro.id === id);

    updatedProjects[projectIdx].isFavorite =
      !updatedProjects[projectIdx].isFavorite;

    set({ projects: updatedProjects });

    await updateProjectsFile(
      updatedProjects[projectIdx].id,
      updatedProjects[projectIdx]
    );
  },
  addProject: async (name) => {
    try {
      const newProject = await createNewProject(name);
      set((state) => {
        return { projects: [...state.projects, newProject] };
      });
    } catch (error) {
      throw Error(error);
    }
  },
  filterFavorite: () => {
    set((state) => {
      return {
        filters: {
          ...state.filters,
          all: false,
          recent: false,
          favorites: true,
        },
      };
    });
  },
  filterAll: () => {
    set((state) => {
      return {
        filters: {
          ...state.filters,
          all: true,
          recent: false,
          favorites: false,
        },
      };
    });
  },
  filterRecent: () => {
    set((state) => {
      return {
        filters: {
          ...state.filters,
          all: false,
          recent: true,
          favorites: false,
        },
      };
    });
  },
  filterSearch: (input) => {
    set((state) => {
      return { filters: { ...state.filters, search: input } };
    });
  },
  updateProjects: (newProjects) => {
    set({ projects: newProjects });
  },
}));
