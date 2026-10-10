"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Download, Upload, X, Check } from "lucide-react";
import { useChecklistStore } from "@/store/useChecklistStore";

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataBackupModal({ isOpen, onClose }: DataBackupModalProps) {
  const caughtPokemon = useChecklistStore((state) => state.caughtPokemon);
  const importCaughtData = useChecklistStore((state) => state.importCaughtData);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(caughtPokemon, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `pokemon-checklist-backup-${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (typeof json === "object" && json !== null) {
          importCaughtData(json);
          setImportStatus("Dados importados com sucesso!");
          setTimeout(() => {
            setImportStatus(null);
            onClose();
          }, 1500);
        } else {
          setImportStatus("Formato de arquivo inválido.");
        }
      } catch (err) {
        setImportStatus("Erro ao ler o arquivo JSON.");
      }
    };
    reader.readAsText(file);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Backup & Exportação
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-5">
          Seus dados são salvos automaticamente no navegador. Use esta opção para transferir seu progresso para outro dispositivo ou criar cópias de segurança.
        </p>

        <div className="space-y-3">
          {/* Export Button */}
          <button
            onClick={handleExport}
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold text-sm transition shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Baixar Backup (JSON)
          </button>

          {/* Import Button */}
          <label className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition cursor-pointer">
            <Upload className="w-4 h-4" />
            Restaurar de Arquivo JSON
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
        </div>

        {importStatus && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <Check className="w-4 h-4" />
            {importStatus}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
