"use client";

import React from "react";
import { GameInfo, PokemonListItem } from "@/types/pokemon";
import { useChecklistStore, EMPTY_CAUGHT_LIST } from "@/store/useChecklistStore";

interface PrintLayoutProps {
  game: GameInfo;
  pokemonList: PokemonListItem[];
}

export function PrintLayout({ game, pokemonList }: PrintLayoutProps) {
  const isShiny = useChecklistStore((state) => state.isShiny);
  const caughtPokemon = useChecklistStore((state) => state.caughtPokemon);
  const caughtList = caughtPokemon[game.id] ?? EMPTY_CAUGHT_LIST;

  const total = pokemonList.length;
  const caught = caughtList.filter((id) =>
    pokemonList.some((p) => p.nationalId === id)
  ).length;
  const percentage = total > 0 ? Math.round((caught / total) * 100) : 0;
  const currentDate = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="print-only w-full bg-white text-black p-4">
      {/* Header for Printed Document */}
      <div className="border-b-2 border-black pb-3 mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black uppercase tracking-wider">
            Checklist Pokémon: {game.name}
          </h1>
          <p className="text-xs text-gray-700">
            Região: {game.region} • {game.generationRoman} ({game.platform}, {game.releaseYear})
          </p>
        </div>

        <div className="text-right">
          <div className="text-base font-bold">
            {caught} / {total} ({percentage}%)
          </div>
          <div className="text-[10px] text-gray-500">
            Impresso em: {currentDate} {isShiny ? "• [Versão Shiny]" : ""}
          </div>
        </div>
      </div>

      {/* Grid: 6 columns on A4 paper */}
      <div className="grid grid-cols-6 gap-2">
        {pokemonList.map((pokemon) => {
          const isCaught = caughtList.includes(pokemon.nationalId);
          const formattedEntry = String(pokemon.entryNumber).padStart(3, "0");
          const sprite = isShiny ? pokemon.shinySpriteUrl : pokemon.spriteUrl;

          return (
            <div
              key={`print-${pokemon.nationalId}`}
              className="print-avoid-break flex flex-col items-center justify-between p-2 border border-gray-400 rounded text-center h-28"
            >
              {/* Header inside card: number and checkbox */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono font-bold">
                <span>#{formattedEntry}</span>
                <span
                  className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${
                    isCaught ? "bg-black text-white font-bold" : "bg-white"
                  }`}
                >
                  {isCaught ? "✓" : ""}
                </span>
              </div>

              {/* Sprite */}
              <img
                src={sprite}
                alt={pokemon.displayName}
                className="w-12 h-12 object-contain"
              />

              {/* Name */}
              <span className="text-[10px] font-semibold truncate w-full text-black">
                {pokemon.displayName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
