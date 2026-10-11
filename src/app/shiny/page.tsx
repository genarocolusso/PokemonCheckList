"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Plus, RotateCcw, Search, Sparkles, Trash2 } from "lucide-react";
import { GameBadge } from "@/components/game/GameBadge";
import { GameSelectorModal } from "@/components/game/GameSelector";
import { useChecklistStore } from "@/store/useChecklistStore";
import { fetchPokedex } from "@/services/pokeApi";
import { GAMES } from "@/utils/constants";

export default function ShinyCollectionPage() {
  const [query, setQuery] = useState("");
  const [isGameSelectorOpen, setIsGameSelectorOpen] = useState(false);

  const selectedGameId = useChecklistStore((state) => state.selectedGame);
  const encounterStep = useChecklistStore((state) => state.encounterStep);
  const shinyCollection = useChecklistStore((state) => state.shinyCollection);
  const setEncounterStep = useChecklistStore((state) => state.setEncounterStep);
  const addShinyHunt = useChecklistStore((state) => state.addShinyHunt);
  const incrementEncounter = useChecklistStore((state) => state.incrementEncounter);
  const resetEncounters = useChecklistStore((state) => state.resetEncounters);
  const markShinyFound = useChecklistStore((state) => state.markShinyFound);
  const removeShinyHunt = useChecklistStore((state) => state.removeShinyHunt);

  const selectedGame = GAMES.find((game) => game.id === selectedGameId) || GAMES[0];

  const { data: pokemonList = [], isLoading } = useQuery({
    queryKey: ["pokedex", selectedGame.pokedexId],
    queryFn: () => fetchPokedex(selectedGame.pokedexId),
  });

  const filteredPokemon = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return pokemonList.slice(0, 12);

    return pokemonList
      .filter((pokemon) => {
        return (
          pokemon.displayName.toLowerCase().includes(normalizedQuery) ||
          pokemon.name.includes(normalizedQuery) ||
          String(pokemon.entryNumber).includes(normalizedQuery) ||
          String(pokemon.nationalId).includes(normalizedQuery)
        );
      })
      .slice(0, 12);
  }, [pokemonList, query]);

  const totalEncounters = shinyCollection.reduce(
    (sum, entry) => sum + entry.encounterCount,
    0
  );
  const foundCount = shinyCollection.filter((entry) => entry.shinyFound).length;

  return (
    <main className="no-print min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-red-500 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para checklist
          </Link>
          <div className="flex items-center gap-2 mt-2 text-amber-500">
            <Sparkles className="w-5 h-5 fill-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Shiny Collection
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
            Caçadas e encontros
          </h1>
        </div>

        <GameBadge
          game={selectedGame}
          onClick={() => setIsGameSelectorOpen(true)}
        />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <span className="text-xs text-slate-500 dark:text-slate-400">Caçadas</span>
          <strong className="block text-2xl text-slate-900 dark:text-slate-50">
            {shinyCollection.length}
          </strong>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <span className="text-xs text-slate-500 dark:text-slate-400">Shinies encontrados</span>
          <strong className="block text-2xl text-amber-600 dark:text-amber-300">
            {foundCount}
          </strong>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <span className="text-xs text-slate-500 dark:text-slate-400">Encontros totais</span>
          <strong className="block text-2xl text-slate-900 dark:text-slate-50">
            {totalEncounters}
          </strong>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-black text-slate-900 dark:text-slate-50">
              Incremento por clique
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Cada clique em uma caçada adiciona {encounterStep} encontro{encounterStep === 1 ? "" : "s"}.
            </p>
          </div>
          <div className="flex w-full items-center gap-3 sm:w-96">
            <input
              type="range"
              min="1"
              max="50"
              value={encounterStep}
              onChange={(event) => setEncounterStep(Number(event.target.value))}
              className="h-2 flex-1 cursor-pointer accent-amber-500"
              aria-label="Incremento de encontros"
            />
            <input
              type="number"
              min="1"
              max="50"
              value={encounterStep}
              onChange={(event) => setEncounterStep(Number(event.target.value))}
              className="w-16 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2 py-2 text-center text-sm font-bold text-slate-900 dark:text-slate-100 outline-none focus:border-amber-400"
              aria-label="Valor do incremento de encontros"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="font-black text-slate-900 dark:text-slate-50">
              Nova caçada
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Escolha o jogo acima, pesquise o Pokémon e crie uma entrada separada para cada shiny.
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome ou número"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-amber-400 dark:focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-36 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
                />
              ))
            : filteredPokemon.map((pokemon) => (
                <button
                  key={`${selectedGame.id}-${pokemon.nationalId}-${pokemon.entryNumber}`}
                  type="button"
                  onClick={() => addShinyHunt(selectedGame.id, pokemon)}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 text-center hover:border-amber-400 dark:hover:border-amber-400 transition"
                >
                  <img
                    src={pokemon.shinyArtworkUrl || pokemon.shinySpriteUrl}
                    alt={pokemon.displayName}
                    className="h-20 w-20 object-contain transition group-hover:scale-110"
                  />
                  <span className="w-full truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                    {pokemon.displayName}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300">
                    <Plus className="w-3 h-3" />
                    Adicionar
                  </span>
                </button>
              ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shinyCollection.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center">
            <Sparkles className="mx-auto mb-3 w-8 h-8 text-amber-400" />
            <h2 className="font-black text-slate-900 dark:text-slate-50">
              Nenhuma caçada ainda
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Adicione um Pokémon acima para começar a contar encontros.
            </p>
          </div>
        ) : (
          shinyCollection.map((entry) => {
            const game = GAMES.find((item) => item.id === entry.gameId);

            return (
              <article
                key={entry.id}
                className={`rounded-2xl border p-4 transition ${
                  entry.shinyFound
                    ? "border-amber-400 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-400/70"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
              >
                <button
                  type="button"
                  onClick={() => incrementEncounter(entry.id, encounterStep)}
                  className="w-full flex items-center gap-4 text-left"
                  title="Clique para adicionar um encontro"
                >
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-950">
                    {entry.shinyFound && (
                      <Sparkles className="absolute right-2 top-2 w-4 h-4 fill-amber-400 text-amber-400" />
                    )}
                    <img
                      src={entry.shinyArtworkUrl || entry.shinySpriteUrl}
                      alt={entry.displayName}
                      className="h-20 w-20 object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {game?.name || entry.gameId}
                    </span>
                    <h2 className="truncate text-lg font-black text-slate-900 dark:text-slate-50">
                      {entry.displayName}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Clique no card para adicionar +{encounterStep}.
                    </p>
                  </div>
                </button>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Encounter Count
                    </span>
                    <strong className="block text-3xl text-slate-900 dark:text-slate-50">
                      {entry.encounterCount}
                    </strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => markShinyFound(entry.id)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                        entry.shinyFound
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-400"
                      }`}
                      title={entry.shinyFound ? "Shiny encontrado" : "Marcar shiny encontrado"}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => resetEncounters(entry.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-400 hover:text-amber-500 transition"
                      title="Resetar encontros"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeShinyHunt(entry.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-rose-400 hover:text-rose-500 transition"
                      title="Remover caçada"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      <GameSelectorModal
        isOpen={isGameSelectorOpen}
        onClose={() => setIsGameSelectorOpen(false)}
      />
    </main>
  );
}
