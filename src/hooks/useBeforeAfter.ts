import { useState, useEffect } from "react";
import api from "../services/api";

export interface BeforeAfterItem {
  id: string;
  titulo: string;
  descricao: string;
  beforeUrl: string;
  afterUrl: string;
  ativo: boolean;
  ordem: number;
}

export function useBeforeAfter() {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get("/before-after")
      .then((response) => {
        const ativos = response.data
          .filter((i: BeforeAfterItem) => i.ativo)
          .sort((a: BeforeAfterItem, b: BeforeAfterItem) => a.ordem - b.ordem);
        setItems(ativos);
      })
      .finally(() => setCarregando(false));
  }, []);

  return { items, carregando };
}
