import { useEffect, useState } from "react";
import ActionButton from "../components/ActionButton";
import InputField from "../components/InputField";
import MessageBox from "../components/MessageBox";
import StructurePageLayout from "../components/StructurePageLayout";
import { listService } from "../services/listService";
import type { StructureData } from "../types/api";

interface ListPageProps {
  onStatsChange: () => Promise<void>;
}

export default function ListPage({ onStatsChange }: ListPageProps) {
  const [item, setItem] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [structure, setStructure] = useState<StructureData | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const loadStructure = async () => {
    try {
      const data = await listService.getAll();
      setStructure(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar a lista.");
    }
  };

  useEffect(() => {
    void loadStructure();
  }, []);

  const syncPage = async () => {
    await Promise.all([loadStructure(), onStatsChange()]);
  };

  const handleAction = async (action: () => Promise<string>) => {
    try {
      setError("");
      const nextMessage = await action();
      setMessage(nextMessage);
      await syncPage();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao executar a operacao.");
    }
  };

  const parseIndex = () => {
    const index = Number(indexValue);

    if (!Number.isInteger(index) || index < 0) {
      throw new Error("Indice invalido.");
    }

    return index;
  };

  const controls = (
    <>
      <div className="form-row dual">
        <InputField
          placeholder="Digite um item para a lista"
          value={item}
          onChange={(event) => setItem(event.target.value)}
        />
        <InputField
          placeholder="Digite um indice"
          value={indexValue}
          onChange={(event) => setIndexValue(event.target.value)}
        />
      </div>

      <div className="button-grid">
        <ActionButton
          onClick={() => {
            if (!item.trim()) {
              setError("Informe um item antes de adicionar.");
              return;
            }

            void handleAction(async () => {
              const response = await listService.add(item.trim());
              setItem("");
              return response.message;
            });
          }}
        >
          Adicionar item
        </ActionButton>

        <ActionButton variant="secondary" onClick={() => void handleAction(async () => (await listService.remove()).message)}>
          Remover ultimo
        </ActionButton>

        <ActionButton
          variant="secondary"
          onClick={async () => {
            try {
              setError("");
              const response = await listService.peek();
              setResult(`Ultimo item: ${response.ultimo}`);
              setMessage("Consulta realizada com sucesso.");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Erro ao consultar o ultimo item.");
            }
          }}
        >
          Consultar ultimo
        </ActionButton>

        <ActionButton
          variant="secondary"
          onClick={async () => {
            try {
              setError("");
              const index = parseIndex();
              const response = await listService.getAt(index);
              setResult(`Item no indice ${response.indice}: ${response.item}`);
              setMessage("Consulta por indice realizada com sucesso.");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Erro ao consultar por indice.");
            }
          }}
        >
          Buscar por indice
        </ActionButton>

        <ActionButton
          variant="danger"
          onClick={() => {
            try {
              const index = parseIndex();
              void handleAction(async () => {
                const response = await listService.removeAt(index);
                return `Item removido do indice ${response.indice}: ${response.removido}`;
              });
            } catch (err) {
              setError(err instanceof Error ? err.message : "Erro ao remover por indice.");
            }
          }}
        >
          Remover por indice
        </ActionButton>

        <ActionButton variant="danger" onClick={() => void handleAction(async () => (await listService.clear()).message)}>
          Limpar lista
        </ActionButton>
      </div>

      {message ? <MessageBox title="Sucesso" text={message} variant="success" /> : null}
      {error ? <MessageBox title="Erro" text={error} variant="error" /> : null}
      {result ? <div className="result-box">{result}</div> : null}
    </>
  );

  return (
    <StructurePageLayout
      title="Pagina da Lista"
      subtitle="Adicione itens, remova o ultimo elemento e consulte ou exclua valores por indice."
      structure={structure}
      controls={controls}
    />
  );
}
