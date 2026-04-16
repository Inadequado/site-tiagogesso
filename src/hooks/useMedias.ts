import { useState, useEffect } from "react";
import api from "../services/api";

export interface Media {
  id: string;
  url: string;
  tipo: string;
  exibirEm: string[];
  ordem: number;
  ativo: boolean;
}

export function useMedias(local: string) {
  const [medias, setMedias] = useState<Media[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get("/medias")
      .then((response) => {
        const filtradas = response.data
          .filter((m: Media) => m.ativo && m.exibirEm.includes(local))
          .sort((a: Media, b: Media) => a.ordem - b.ordem);
        setMedias(filtradas);
      })
      .finally(() => setCarregando(false));
  }, [local]);

  return { medias, carregando };
}
