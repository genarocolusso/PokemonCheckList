import { PokedexResponse, PokemonListItem } from "@/types/pokemon";
import { getPokemonTypes } from "@/utils/pokemonTypes";

function formatPokemonName(name: string): string {
  if (name === "nidoran-f") return "Nidoran ♀";
  if (name === "nidoran-m") return "Nidoran ♂";
  if (name === "mr-mime") return "Mr. Mime";
  if (name === "ho-oh") return "Ho-Oh";
  if (name === "mime-jr") return "Mime Jr.";
  if (name === "porygon-z") return "Porygon-Z";
  if (name === "type-null") return "Type: Null";
  if (name === "jangmo-o") return "Jangmo-o";
  if (name === "hakamo-o") return "Hakamo-o";
  if (name === "kommo-o") return "Kommo-o";
  if (name === "tapu-koko") return "Tapu Koko";
  if (name === "tapu-lele") return "Tapu Lele";
  if (name === "tapu-bulu") return "Tapu Bulu";
  if (name === "tapu-fini") return "Tapu Fini";
  if (name === "mr-rime") return "Mr. Rime";
  if (name === "great-tusk") return "Great Tusk";
  if (name === "scream-tail") return "Scream Tail";
  if (name === "brute-bonnet") return "Brute Bonnet";
  if (name === "flutter-mane") return "Flutter Mane";
  if (name === "slither-wing") return "Slither Wing";
  if (name === "sandy-shocks") return "Sandy Shocks";
  if (name === "iron-treads") return "Iron Treads";
  if (name === "iron-bundle") return "Iron Bundle";
  if (name === "iron-hands") return "Iron Hands";
  if (name === "iron-jugulis") return "Iron Jugulis";
  if (name === "iron-moth") return "Iron Moth";
  if (name === "iron-thorns") return "Iron Thorns";
  if (name === "roaring-moon") return "Roaring Moon";
  if (name === "iron-valiant") return "Iron Valiant";
  if (name === "walking-wake") return "Walking Wake";
  if (name === "iron-leaves") return "Iron Leaves";
  if (name === "gouging-fire") return "Gouging Fire";
  if (name === "raging-bolt") return "Raging Bolt";
  if (name === "iron-boulder") return "Iron Boulder";
  if (name === "iron-crown") return "Iron Crown";

  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function extractIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

export async function fetchPokedex(pokedexId: string | number): Promise<PokemonListItem[]> {
  const url = `https://pokeapi.co/api/v2/pokedex/${pokedexId}/`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokédex ${pokedexId}: ${res.statusText}`);
  }

  const data: PokedexResponse = await res.json();

  return data.pokemon_entries.map((entry) => {
    const nationalId = extractIdFromUrl(entry.pokemon_species.url);
    const types = getPokemonTypes(nationalId);

    return {
      entryNumber: entry.entry_number,
      nationalId,
      name: entry.pokemon_species.name,
      displayName: formatPokemonName(entry.pokemon_species.name),
      types,
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nationalId}.png`,
      shinySpriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${nationalId}.png`,
      artworkUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nationalId}.png`,
      shinyArtworkUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${nationalId}.png`,
      homeUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${nationalId}.png`,
      shinyHomeUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${nationalId}.png`,
    };
  });
}
