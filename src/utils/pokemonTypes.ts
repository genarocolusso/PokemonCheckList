import { PokemonType } from "@/types/pokemon";
import typesData from "./pokemon-types.json";

const typesMap = typesData as Record<string, string[]>;

export function getPokemonTypes(id: number): PokemonType[] {
  const types = typesMap[String(id)];
  if (!types || types.length === 0) {
    return ["normal"];
  }
  return types as PokemonType[];
}
