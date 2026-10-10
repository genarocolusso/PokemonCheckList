"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { PokemonListItem } from "@/types/pokemon";
import { TYPE_COLORS } from "@/utils/constants";
import { useChecklistStore } from "@/store/useChecklistStore";

interface PokemonCardProps {
  pokemon: PokemonListItem;
  isCaught: boolean;
  onToggle: (id: number) => void;
}

export function PokemonCard({ pokemon, isCaught, onToggle }: PokemonCardProps) {
  const isShiny = useChecklistStore((state) => state.isShiny);
  const spriteMode = useChecklistStore((state) => state.spriteMode);
  const [imageError, setImageError] = useState(false);

  // Reset image error state when spriteMode or shiny status changes
  React.useEffect(() => {
    setImageError(false);
  }, [spriteMode, isShiny]);

  // Determine current image URL based on mode and shiny status
  let currentImageUrl = pokemon.artworkUrl;
  if (isShiny) {
    if (spriteMode === "home") {
      currentImageUrl = pokemon.shinyHomeUrl;
    } else if (spriteMode === "pixel") {
      currentImageUrl = pokemon.shinySpriteUrl;
    } else {
      currentImageUrl = pokemon.shinyArtworkUrl;
    }
  } else {
    if (spriteMode === "home") {
      currentImageUrl = pokemon.homeUrl;
    } else if (spriteMode === "pixel") {
      currentImageUrl = pokemon.spriteUrl;
    } else {
      currentImageUrl = pokemon.artworkUrl;
    }
  }

  // If selected image fails, fall back to default pixel sprite
  if (imageError) {
    currentImageUrl = isShiny ? pokemon.shinySpriteUrl : pokemon.spriteUrl;
  }

  const formattedEntry = String(pokemon.entryNumber).padStart(3, "0");

  return (
    <div
      onClick={() => onToggle(pokemon.nationalId)}
      role="checkbox"
      aria-checked={isCaught}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggle(pokemon.nationalId);
        }
      }}
      className={`group relative flex flex-col items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 select-none cursor-pointer ${
        isCaught
          ? "bg-emerald-50/70 dark:bg-emerald-950/25 border-emerald-500/80 shadow-sm shadow-emerald-500/10 ring-1 ring-emerald-500/30"
          : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {/* Top Header: Dex # and Checkbox indicator */}
      <div className="w-full flex items-center justify-between mb-1">
        <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
          #{formattedEntry}
        </span>

        {/* Checkbox badge */}
        <div
          className={`flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200 border ${
            isCaught
              ? "bg-emerald-500 border-emerald-600 text-white shadow-sm scale-105 animate-catch"
              : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-transparent group-hover:border-slate-400"
          }`}
          title={isCaught ? "Marcado como capturado" : "Clique para marcar como capturado"}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      </div>

      {/* Pokemon Image Area */}
      <div className="relative w-28 h-28 my-1 flex items-center justify-center">
        {/* Shiny Sparkle Indicator */}
        {isShiny && (
          <div className="absolute top-0 right-0 p-1 bg-amber-400/20 text-amber-500 rounded-full animate-shiny">
            <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
          </div>
        )}

        {/* Catch Watermark / Subtle Pokeball glow */}
        {isCaught && (
          <div className="absolute inset-0 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-xl" />
        )}

        <img
          src={currentImageUrl}
          alt={pokemon.displayName}
          loading="lazy"
          onError={() => setImageError(true)}
          className={`relative max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm ${
            !isCaught ? "opacity-90 contrast-95 group-hover:opacity-100" : ""
          }`}
        />
      </div>

      {/* Pokemon Name */}
      <div className="w-full text-center mt-1">
        <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate">
          {pokemon.displayName}
        </h4>

        {/* Optional national dex subtitle if different from entryNumber */}
        {pokemon.entryNumber !== pokemon.nationalId && (
          <span className="text-[10px] text-slate-400 font-mono">
            (Nat #{String(pokemon.nationalId).padStart(3, "0")})
          </span>
        )}
      </div>

      {/* Type Badges */}
      <div className="flex items-center justify-center gap-1.5 mt-2 flex-wrap">
        {pokemon.types.map((type) => {
          const color = TYPE_COLORS[type] || TYPE_COLORS.normal;
          return (
            <span
              key={type}
              style={{
                backgroundColor: color.bgHex,
                color: color.textHex,
                borderColor: color.borderHex,
              }}
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-2xs"
            >
              {color.namePt}
            </span>
          );
        })}
      </div>
    </div>
  );
}
