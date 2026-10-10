import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilterStatus, PokemonType, SpriteMode } from "@/types/pokemon";

interface ChecklistState {
  selectedGame: string;
  isShiny: boolean;
  isDarkMode: boolean;
  spriteMode: SpriteMode;
  searchQuery: string;
  filterStatus: FilterStatus;
  selectedType: PokemonType | null;
  caughtPokemon: Record<string, number[]>; // gameId -> array of nationalIds
  soundEnabled: boolean;

  // Actions
  setGame: (game: string) => void;
  toggleShiny: () => void;
  toggleTheme: () => void;
  setSpriteMode: (mode: SpriteMode) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: FilterStatus) => void;
  setSelectedType: (type: PokemonType | null) => void;
  toggleSound: () => void;

  // Checklist Actions
  toggleCaught: (game: string, pokemonId: number) => void;
  markAll: (game: string, pokemonIds: number[]) => void;
  clearAll: (game: string) => void;
  importCaughtData: (data: Record<string, number[]>) => void;
}

export const EMPTY_CAUGHT_LIST: number[] = [];

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      selectedGame: "red-blue",
      isShiny: false,
      isDarkMode: false,
      spriteMode: "artwork",
      searchQuery: "",
      filterStatus: "all",
      selectedType: null,
      caughtPokemon: {},
      soundEnabled: true,

      setGame: (game) => set({ selectedGame: game, searchQuery: "", filterStatus: "all", selectedType: null }),
      toggleShiny: () => set((state) => ({ isShiny: !state.isShiny })),
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setSpriteMode: (spriteMode) => set({ spriteMode }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterStatus: (filterStatus) => set({ filterStatus }),
      setSelectedType: (selectedType) => set({ selectedType }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      toggleCaught: (game, pokemonId) => {
        set((state) => {
          const currentGameCaught = state.caughtPokemon[game] || [];
          const isAlreadyCaught = currentGameCaught.includes(pokemonId);

          const updatedList = isAlreadyCaught
            ? currentGameCaught.filter((id) => id !== pokemonId)
            : [...currentGameCaught, pokemonId];

          return {
            caughtPokemon: {
              ...state.caughtPokemon,
              [game]: updatedList,
            },
          };
        });
      },

      markAll: (game, pokemonIds) => {
        set((state) => ({
          caughtPokemon: {
            ...state.caughtPokemon,
            [game]: Array.from(new Set([...(state.caughtPokemon[game] || []), ...pokemonIds])),
          },
        }));
      },

      clearAll: (game) => {
        set((state) => ({
          caughtPokemon: {
            ...state.caughtPokemon,
            [game]: [],
          },
        }));
      },

      importCaughtData: (data) => {
        set((state) => ({
          caughtPokemon: {
            ...state.caughtPokemon,
            ...data,
          },
        }));
      },
    }),
    {
      name: "pokemon-checklist-storage",
      partialize: (state) => ({
        selectedGame: state.selectedGame,
        isShiny: state.isShiny,
        isDarkMode: state.isDarkMode,
        spriteMode: state.spriteMode,
        caughtPokemon: state.caughtPokemon,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
