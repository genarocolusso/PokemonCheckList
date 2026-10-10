"use client";

import React from "react";
import { GameInfo } from "@/types/pokemon";
import { Gamepad2, Calendar } from "lucide-react";

interface GameBadgeProps {
  game: GameInfo;
  onClick?: () => void;
}

export function GameBadge({ game, onClick }: GameBadgeProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm backdrop-blur transition-all ${
        onClick ? "cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 hover:shadow" : ""
      }`}
    >
      <div
        className="w-3.5 h-3.5 rounded-full shadow-inner ring-2 ring-white/50 dark:ring-black/50"
        style={{
          background: `linear-gradient(135deg, ${game.color.from}, ${game.color.to})`,
        }}
      />
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight">
            {game.name}
          </span>
          <span
            className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${game.color.badge}`}
          >
            {game.generationRoman}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-0.5">
            <Gamepad2 className="w-3 h-3" />
            {game.platform}
          </span>
          <span>•</span>
          <span className="flex items-center gap-0.5">
            <Calendar className="w-3 h-3" />
            {game.releaseYear}
          </span>
          <span>•</span>
          <span className="text-red-500 font-semibold">{game.region}</span>
        </div>
      </div>
    </div>
  );
}
