import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  FilterStatus,
  PokemonListItem,
  PokemonType,
  ShinyCollectionEntry,
  SpriteMode,
} from "@/types/pokemon";

interface ChecklistState {
  selectedGame: string;
  isShiny: boolean;
  isDarkMode: boolean;
  spriteMode: SpriteMode;
  encounterStep: number;
  searchQuery: string;
  filterStatus: FilterStatus;
  selectedType: PokemonType | null;
  caughtPokemon: Record<string, number[]>; // gameId -> array of nationalIds
  shinyCollection: ShinyCollectionEntry[];
  soundEnabled: boolean;

  // Actions
  setGame: (game: string) => void;
  toggleShiny: () => void;
  toggleTheme: () => void;
  setSpriteMode: (mode: SpriteMode) => void;
  setEncounterStep: (step: number) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: FilterStatus) => void;
  setSelectedType: (type: PokemonType | null) => void;
  toggleSound: () => void;

  // Checklist Actions
  toggleCaught: (game: string, pokemonId: number) => void;
  markAll: (game: string, pokemonIds: number[]) => void;
  clearAll: (game: string) => void;
  importCaughtData: (data: Record<string, number[]>) => void;

  // Shiny Collection Actions
  addShinyHunt: (gameId: string, pokemon: PokemonListItem) => void;
  incrementEncounter: (entryId: string, amount?: number) => void;
  resetEncounters: (entryId: string) => void;
  markShinyFound: (entryId: string) => void;
  removeShinyHunt: (entryId: string) => void;
}

export const EMPTY_CAUGHT_LIST: number[] = [];

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      selectedGame: "red-blue",
      isShiny: false,
      isDarkMode: false,
      spriteMode: "artwork",
      encounterStep: 1,
      searchQuery: "",
      filterStatus: "all",
      selectedType: null,
      caughtPokemon: {},
      shinyCollection: [],
      soundEnabled: true,

      setGame: (game) => set({ selectedGame: game, searchQuery: "", filterStatus: "all", selectedType: null }),
      toggleShiny: () => set((state) => ({ isShiny: !state.isShiny })),
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setSpriteMode: (spriteMode) => set({ spriteMode }),
      setEncounterStep: (encounterStep) =>
        set({ encounterStep: Math.min(50, Math.max(1, Math.round(encounterStep))) }),
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

      addShinyHunt: (gameId, pokemon) => {
        const now = new Date().toISOString();
        const entry: ShinyCollectionEntry = {
          id: `${gameId}-${pokemon.nationalId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          gameId,
          pokemonId: pokemon.nationalId,
          pokemonName: pokemon.name,
          displayName: pokemon.displayName,
          spriteUrl: pokemon.spriteUrl,
          shinySpriteUrl: pokemon.shinySpriteUrl,
          artworkUrl: pokemon.artworkUrl,
          shinyArtworkUrl: pokemon.shinyArtworkUrl,
          encounterCount: 0,
          shinyFound: false,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          shinyCollection: [entry, ...state.shinyCollection],
        }));
      },

      incrementEncounter: (entryId, amount = 1) => {
        const now = new Date().toISOString();
        const safeAmount = Math.min(50, Math.max(1, Math.round(amount)));
        set((state) => ({
          shinyCollection: state.shinyCollection.map((entry) =>
            entry.id === entryId
              ? {
                  ...entry,
                  encounterCount: entry.encounterCount + safeAmount,
                  updatedAt: now,
                }
              : entry
          ),
        }));
      },

      resetEncounters: (entryId) => {
        const now = new Date().toISOString();
        set((state) => ({
          shinyCollection: state.shinyCollection.map((entry) =>
            entry.id === entryId
              ? {
                  ...entry,
                  encounterCount: 0,
                  updatedAt: now,
                }
              : entry
          ),
        }));
      },

      markShinyFound: (entryId) => {
        const now = new Date().toISOString();
        set((state) => ({
          shinyCollection: state.shinyCollection.map((entry) =>
            entry.id === entryId
              ? {
                  ...entry,
                  shinyFound: !entry.shinyFound,
                  foundAt: entry.shinyFound ? undefined : now,
                  updatedAt: now,
                }
              : entry
          ),
        }));
      },

      removeShinyHunt: (entryId) => {
        set((state) => ({
          shinyCollection: state.shinyCollection.filter((entry) => entry.id !== entryId),
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
        encounterStep: state.encounterStep,
        caughtPokemon: state.caughtPokemon,
        shinyCollection: state.shinyCollection,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
