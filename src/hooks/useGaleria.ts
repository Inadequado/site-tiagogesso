import { useState, useEffect } from "react";
import api from "../services/api";

export interface GaleriaItem {
  id: string;
  url: string;
  tipo: string;
  ordem: number;
  ativo: boolean;
  exibirEm: string;
}

export function useGaleria() {
  const [items, setItems] = useState<GaleriaItem[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get("/medias")
      .then((response) => {
        const filtrados = response.data
          .filter(
            (m: GaleriaItem) => m.ativo && m.exibirEm?.includes("galeria"),
          )
          .sort((a: GaleriaItem, b: GaleriaItem) => a.ordem - b.ordem);
        setItems(filtrados);
      })
      .finally(() => setCarregando(false));
  }, []);

  return { items, carregando };
}
