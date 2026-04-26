import { useEffect, useState } from "react";
import ActionButton from "../components/ActionButton";
import InputField from "../components/InputField";
import MessageBox from "../components/MessageBox";
import StructurePageLayout from "../components/StructurePageLayout";
import { queueService } from "../services/queueService";
import type { StructureData } from "../types/api";

interface QueuePageProps {
  onStatsChange: () => Promise<void>;
}

export default function QueuePage({ onStatsChange }: QueuePageProps) {
  const [item, setItem] = useState("");
  const [structure, setStructure] = useState<StructureData | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const loadStructure = async () => {
    try {
      const data = await queueService.getAll();
      setStructure(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar a fila.");
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

  const controls = (
    <>
      <div className="form-row">
        <InputField
          placeholder="Digite um item para a fila"
          value={item}
          onChange={(event) => setItem(event.target.value)}
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
              const response = await queueService.add(item.trim());
              setItem("");
              return response.message;
            });
          }}
        >
          Adicionar item
        </ActionButton>

        <ActionButton variant="secondary" onClick={() => void handleAction(async () => (await queueService.remove()).message)}>
          Remover frente
        </ActionButton>

        <ActionButton
          variant="secondary"
          onClick={async () => {
            try {
              setError("");
              const response = await queueService.peek();
              setResult(`Frente atual: ${response.frente}`);
              setMessage("Consulta realizada com sucesso.");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Erro ao consultar a frente.");
            }
          }}
        >
          Consultar frente
        </ActionButton>

        <ActionButton variant="danger" onClick={() => void handleAction(async () => (await queueService.clear()).message)}>
          Limpar fila
        </ActionButton>
      </div>

      {message ? <MessageBox title="Sucesso" text={message} variant="success" /> : null}
      {error ? <MessageBox title="Erro" text={error} variant="error" /> : null}
      {result ? <div className="result-box">{result}</div> : null}
    </>
  );

  return (
    <StructurePageLayout
      title="Pagina da Fila"
      subtitle="Gerencie entradas, remocoes e consultas da fila conectada diretamente a API REST."
      structure={structure}
      controls={controls}
    />
  );
}
