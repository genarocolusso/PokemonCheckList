"use client";

import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Trophy, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface ChecklistStatsProps {
  total: number;
  caught: number;
}

export function ChecklistStats({ total, caught }: ChecklistStatsProps) {
  const percentage = total > 0 ? Math.round((caught / total) * 1000) / 10 : 0;
  const isComplete = total > 0 && caught === total;
  const prevCaughtRef = useRef(caught);

  // Trigger celebratory confetti when completing 100%
  useEffect(() => {
    if (isComplete && prevCaughtRef.current < total) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#EE1515", "#3B82F6", "#FBBF24", "#10B981"],
        });
      } catch (e) {
        // Ignored if confetti fails in some environments
      }
    }
    prevCaughtRef.current = caught;
  }, [caught, isComplete, total]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        {/* Left: Progress info */}
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl ${
              isComplete
                ? "bg-amber-100 dark:bg-amber-950/40 text-amber-500"
                : "bg-red-50 dark:bg-red-950/30 text-red-500"
            }`}
          >
            {isComplete ? (
              <Trophy className="w-6 h-6 animate-bounce" />
            ) : (
              <CheckCircle2 className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Progresso da Pokédex
              </h3>
              {isComplete && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-sm animate-pulse">
                  <Sparkles className="w-3 h-3" /> Completa!
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold">{caught}</strong> de{" "}
              <strong className="text-slate-900 dark:text-slate-100 font-semibold">{total}</strong> Pokémon capturados
            </p>
          </div>
        </div>

        {/* Right: Big Percentage */}
        <div className="flex items-baseline gap-1.5 self-end sm:self-auto">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            {percentage}%
          </span>
          <span className="text-xs font-semibold text-slate-400">
            concluído
          </span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${
            isComplete
              ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-sm shadow-amber-400/50"
              : "bg-gradient-to-r from-red-500 via-rose-500 to-emerald-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Quick stats pills */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {caught} Capturados
        </span>
        <span className="flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {Math.max(0, total - caught)} Restantes
        </span>
      </div>
    </div>
  );
}
