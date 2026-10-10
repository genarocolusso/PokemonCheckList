import { GameInfo, PokemonType } from "@/types/pokemon";

export const GAMES: GameInfo[] = [
  // Generation I
  {
    id: "red-blue",
    name: "Red & Blue",
    generation: 1,
    generationRoman: "Gen I",
    region: "Kanto",
    pokedexId: "2", // kanto
    releaseYear: 1996,
    platform: "Game Boy",
    color: {
      from: "#EF4444",
      to: "#3B82F6",
      badge: "bg-gradient-to-r from-red-600 to-blue-600 text-white",
      border: "hover:border-red-500",
    },
    coverPokemon: [6, 9], // Charizard, Blastoise
  },
  {
    id: "yellow",
    name: "Yellow: Special Pikachu Edition",
    generation: 1,
    generationRoman: "Gen I",
    region: "Kanto",
    pokedexId: "2",
    releaseYear: 1998,
    platform: "Game Boy Color",
    color: {
      from: "#FBBF24",
      to: "#EAB308",
      badge: "bg-amber-500 text-slate-900",
      border: "hover:border-yellow-500",
    },
    coverPokemon: [25], // Pikachu
  },

  // Generation II
  {
    id: "gold-silver",
    name: "Gold & Silver",
    generation: 2,
    generationRoman: "Gen II",
    region: "Johto",
    pokedexId: "3", // original-johto
    releaseYear: 1999,
    platform: "Game Boy Color",
    color: {
      from: "#F59E0B",
      to: "#94A3B8",
      badge: "bg-gradient-to-r from-amber-500 to-slate-400 text-slate-900",
      border: "hover:border-amber-400",
    },
    coverPokemon: [250, 249], // Ho-Oh, Lugia
  },
  {
    id: "crystal",
    name: "Crystal",
    generation: 2,
    generationRoman: "Gen II",
    region: "Johto",
    pokedexId: "3",
    releaseYear: 2000,
    platform: "Game Boy Color",
    color: {
      from: "#06B6D4",
      to: "#3B82F6",
      badge: "bg-cyan-500 text-white",
      border: "hover:border-cyan-400",
    },
    coverPokemon: [245], // Suicune
  },

  // Generation III
  {
    id: "ruby-sapphire",
    name: "Ruby & Sapphire",
    generation: 3,
    generationRoman: "Gen III",
    region: "Hoenn",
    pokedexId: "4", // hoenn
    releaseYear: 2002,
    platform: "Game Boy Advance",
    color: {
      from: "#DC2626",
      to: "#2563EB",
      badge: "bg-gradient-to-r from-red-600 to-blue-700 text-white",
      border: "hover:border-red-600",
    },
    coverPokemon: [383, 382], // Groudon, Kyogre
  },
  {
    id: "emerald",
    name: "Emerald",
    generation: 3,
    generationRoman: "Gen III",
    region: "Hoenn",
    pokedexId: "4",
    releaseYear: 2004,
    platform: "Game Boy Advance",
    color: {
      from: "#059669",
      to: "#10B981",
      badge: "bg-emerald-600 text-white",
      border: "hover:border-emerald-500",
    },
    coverPokemon: [384], // Rayquaza
  },
  {
    id: "firered-leafgreen",
    name: "FireRed & LeafGreen",
    generation: 3,
    generationRoman: "Gen III",
    region: "Kanto",
    pokedexId: "2",
    releaseYear: 2004,
    platform: "Game Boy Advance",
    color: {
      from: "#EA580C",
      to: "#16A34A",
      badge: "bg-gradient-to-r from-orange-600 to-green-600 text-white",
      border: "hover:border-orange-500",
    },
    coverPokemon: [6, 3], // Charizard, Venusaur
  },

  // Generation IV
  {
    id: "diamond-pearl",
    name: "Diamond & Pearl",
    generation: 4,
    generationRoman: "Gen IV",
    region: "Sinnoh",
    pokedexId: "5", // original-sinnoh
    releaseYear: 2006,
    platform: "Nintendo DS",
    color: {
      from: "#0284C7",
      to: "#EC4899",
      badge: "bg-gradient-to-r from-sky-600 to-pink-500 text-white",
      border: "hover:border-sky-500",
    },
    coverPokemon: [483, 484], // Dialga, Palkia
  },
  {
    id: "platinum",
    name: "Platinum",
    generation: 4,
    generationRoman: "Gen IV",
    region: "Sinnoh",
    pokedexId: "6", // extended-sinnoh
    releaseYear: 2008,
    platform: "Nintendo DS",
    color: {
      from: "#64748B",
      to: "#DC2626",
      badge: "bg-gradient-to-r from-slate-600 to-red-600 text-white",
      border: "hover:border-slate-500",
    },
    coverPokemon: [487], // Giratina
  },
  {
    id: "heartgold-soulsilver",
    name: "HeartGold & SoulSilver",
    generation: 4,
    generationRoman: "Gen IV",
    region: "Johto",
    pokedexId: "7", // updated-johto
    releaseYear: 2009,
    platform: "Nintendo DS",
    color: {
      from: "#D97706",
      to: "#94A3B8",
      badge: "bg-gradient-to-r from-amber-600 to-slate-400 text-white",
      border: "hover:border-amber-500",
    },
    coverPokemon: [250, 249],
  },

  // Generation V
  {
    id: "black-white",
    name: "Black & White",
    generation: 5,
    generationRoman: "Gen V",
    region: "Unova",
    pokedexId: "8", // original-unova
    releaseYear: 2010,
    platform: "Nintendo DS",
    color: {
      from: "#18181B",
      to: "#E4E4E7",
      badge: "bg-gradient-to-r from-zinc-900 to-zinc-400 text-white",
      border: "hover:border-zinc-400",
    },
    coverPokemon: [644, 643], // Zekrom, Reshiram
  },
  {
    id: "black-2-white-2",
    name: "Black 2 & White 2",
    generation: 5,
    generationRoman: "Gen V",
    region: "Unova",
    pokedexId: "9", // updated-unova
    releaseYear: 2012,
    platform: "Nintendo DS",
    color: {
      from: "#09090B",
      to: "#38BDF8",
      badge: "bg-gradient-to-r from-zinc-900 to-sky-500 text-white",
      border: "hover:border-sky-400",
    },
    coverPokemon: [646], // Kyurem
  },

  // Generation VI
  {
    id: "x-y",
    name: "X & Y",
    generation: 6,
    generationRoman: "Gen VI",
    region: "Kalos",
    pokedexId: "12", // kalos-central
    releaseYear: 2013,
    platform: "Nintendo 3DS",
    color: {
      from: "#2563EB",
      to: "#DC2626",
      badge: "bg-gradient-to-r from-blue-600 to-red-600 text-white",
      border: "hover:border-blue-500",
    },
    coverPokemon: [716, 717], // Xerneas, Yveltal
  },
  {
    id: "omega-ruby-alpha-sapphire",
    name: "Omega Ruby & Alpha Sapphire",
    generation: 6,
    generationRoman: "Gen VI",
    region: "Hoenn",
    pokedexId: "15", // updated-hoenn
    releaseYear: 2014,
    platform: "Nintendo 3DS",
    color: {
      from: "#B91C1C",
      to: "#1D4ED8",
      badge: "bg-gradient-to-r from-red-700 to-blue-700 text-white",
      border: "hover:border-red-600",
    },
    coverPokemon: [383, 382],
  },

  // Generation VII
  {
    id: "sun-moon",
    name: "Sun & Moon",
    generation: 7,
    generationRoman: "Gen VII",
    region: "Alola",
    pokedexId: "16", // original-alola
    releaseYear: 2016,
    platform: "Nintendo 3DS",
    color: {
      from: "#EA580C",
      to: "#7C3AED",
      badge: "bg-gradient-to-r from-orange-600 to-violet-600 text-white",
      border: "hover:border-orange-500",
    },
    coverPokemon: [791, 792], // Solgaleo, Lunala
  },
  {
    id: "ultra-sun-ultra-moon",
    name: "Ultra Sun & Ultra Moon",
    generation: 7,
    generationRoman: "Gen VII",
    region: "Alola",
    pokedexId: "21", // updated-alola
    releaseYear: 2017,
    platform: "Nintendo 3DS",
    color: {
      from: "#F97316",
      to: "#8B5CF6",
      badge: "bg-gradient-to-r from-orange-500 to-purple-600 text-white",
      border: "hover:border-orange-400",
    },
    coverPokemon: [800], // Necrozma
  },
  {
    id: "lets-go",
    name: "Let's Go, Pikachu! & Eevee!",
    generation: 7,
    generationRoman: "Gen VII",
    region: "Kanto",
    pokedexId: "26", // letsgo-kanto
    releaseYear: 2018,
    platform: "Nintendo Switch",
    color: {
      from: "#EAB308",
      to: "#B45309",
      badge: "bg-gradient-to-r from-yellow-500 to-amber-700 text-white",
      border: "hover:border-yellow-400",
    },
    coverPokemon: [25, 133], // Pikachu, Eevee
  },

  // Generation VIII
  {
    id: "sword-shield",
    name: "Sword & Shield",
    generation: 8,
    generationRoman: "Gen VIII",
    region: "Galar",
    pokedexId: "27", // galar
    releaseYear: 2019,
    platform: "Nintendo Switch",
    color: {
      from: "#0284C7",
      to: "#E11D48",
      badge: "bg-gradient-to-r from-sky-600 to-rose-600 text-white",
      border: "hover:border-sky-500",
    },
    coverPokemon: [888, 889], // Zacian, Zamazenta
  },
  {
    id: "legends-arceus",
    name: "Pokémon Legends: Arceus",
    generation: 8,
    generationRoman: "Gen VIII",
    region: "Hisui",
    pokedexId: "30", // hisui
    releaseYear: 2022,
    platform: "Nintendo Switch",
    color: {
      from: "#0F766E",
      to: "#D97706",
      badge: "bg-gradient-to-r from-teal-700 to-amber-600 text-white",
      border: "hover:border-teal-500",
    },
    coverPokemon: [493], // Arceus
  },

  // Generation IX
  {
    id: "scarlet-violet",
    name: "Scarlet & Violet",
    generation: 9,
    generationRoman: "Gen IX",
    region: "Paldea",
    pokedexId: "31", // paldea
    releaseYear: 2022,
    platform: "Nintendo Switch",
    color: {
      from: "#DC2626",
      to: "#7C3AED",
      badge: "bg-gradient-to-r from-red-600 to-purple-600 text-white",
      border: "hover:border-red-500",
    },
    coverPokemon: [1007, 1008], // Koraidon, Miraidon
  },

  // Special: National Dex
  {
    id: "national",
    name: "National Pokédex",
    generation: 0,
    generationRoman: "All Gens",
    region: "National",
    pokedexId: "1", // national
    releaseYear: 2024,
    platform: "All Platforms",
    color: {
      from: "#EF4444",
      to: "#3B82F6",
      badge: "bg-gradient-to-r from-red-500 via-amber-500 to-blue-500 text-white font-bold",
      border: "hover:border-amber-400",
    },
    coverPokemon: [25, 150, 384], // Pikachu, Mewtwo, Rayquaza
  },
];

export interface TypeInfo {
  namePt: string;
  bgHex: string;
  textHex: string;
  borderHex: string;
}

export const TYPE_COLORS: Record<PokemonType, TypeInfo> = {
  normal: { namePt: "Normal", bgHex: "#9FA19F", textHex: "#FFFFFF", borderHex: "#828482" },
  fire: { namePt: "Fogo", bgHex: "#E62829", textHex: "#FFFFFF", borderHex: "#B81F20" },
  water: { namePt: "Água", bgHex: "#2980EF", textHex: "#FFFFFF", borderHex: "#1B5DB3" },
  grass: { namePt: "Planta", bgHex: "#3FA129", textHex: "#FFFFFF", borderHex: "#2B731B" },
  electric: { namePt: "Elétrico", bgHex: "#FAC000", textHex: "#1C1917", borderHex: "#C79900" },
  ice: { namePt: "Gelo", bgHex: "#3DCEF3", textHex: "#0F172A", borderHex: "#229FBD" },
  fighting: { namePt: "Lutador", bgHex: "#FF8000", textHex: "#FFFFFF", borderHex: "#C76400" },
  poison: { namePt: "Veneno", bgHex: "#9141CB", textHex: "#FFFFFF", borderHex: "#6D2C9B" },
  ground: { namePt: "Terra", bgHex: "#915121", textHex: "#FFFFFF", borderHex: "#6E3C17" },
  flying: { namePt: "Voador", bgHex: "#81B9EF", textHex: "#0F172A", borderHex: "#548EC9" },
  psychic: { namePt: "Psíquico", bgHex: "#EF4179", textHex: "#FFFFFF", borderHex: "#BD2857" },
  bug: { namePt: "Inseto", bgHex: "#91A119", textHex: "#FFFFFF", borderHex: "#6C7A0F" },
  rock: { namePt: "Pedra", bgHex: "#AFA981", textHex: "#FFFFFF", borderHex: "#857F5D" },
  ghost: { namePt: "Fantasma", bgHex: "#704170", textHex: "#FFFFFF", borderHex: "#4F2B4F" },
  dragon: { namePt: "Dragão", bgHex: "#5060E1", textHex: "#FFFFFF", borderHex: "#3542B0" },
  dark: { namePt: "Sombrio", bgHex: "#50413F", textHex: "#FFFFFF", borderHex: "#362B2A" },
  steel: { namePt: "Aço", bgHex: "#60A1B8", textHex: "#FFFFFF", borderHex: "#457788" },
  fairy: { namePt: "Fada", bgHex: "#EF70EF", textHex: "#1C1917", borderHex: "#BA4BBA" },
};

export const ALL_TYPES: PokemonType[] = [
  "normal", "fire", "water", "grass", "electric", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];
