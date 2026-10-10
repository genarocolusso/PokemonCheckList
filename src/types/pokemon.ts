export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export interface GameInfo {
  id: string; // e.g. "red-blue"
  name: string; // "Red & Blue"
  generation: number; // 1
  generationRoman: string; // "Gen I"
  region: string; // "Kanto"
  pokedexId: string | number; // "kanto" or 2
  color: {
    from: string;
    to: string;
    badge: string;
    border: string;
  };
  releaseYear: number;
  platform: string;
  coverPokemon?: number[]; // IDs of mascot Pokémon (e.g. Charizard 6, Blastoise 9)
}

export interface PokemonListItem {
  entryNumber: number; // Regional number
  nationalId: number; // National Dex ID
  name: string;
  displayName: string;
  types: PokemonType[];
  spriteUrl: string;
  shinySpriteUrl: string;
  artworkUrl: string;
  shinyArtworkUrl: string;
  homeUrl: string;
  shinyHomeUrl: string;
}

export interface PokedexResponse {
  id: number;
  name: string;
  pokemon_entries: Array<{
    entry_number: number;
    pokemon_species: {
      name: string;
      url: string;
    };
  }>;
}

export type FilterStatus = "all" | "caught" | "uncaught";
export type SpriteMode = "artwork" | "home" | "pixel";
