import { useEffect, useState } from "react";
import ActionButton from "../components/ActionButton";
import InputField from "../components/InputField";
import MessageBox from "../components/MessageBox";
import StructurePageLayout from "../components/StructurePageLayout";
import { stackService } from "../services/stackService";
import type { StructureData } from "../types/api";

interface StackPageProps {
  onStatsChange: () => Promise<void>;
}

export default function StackPage({ onStatsChange }: StackPageProps) {
  const [item, setItem] = useState("");
  const [structure, setStructure] = useState<StructureData | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const loadStructure = async () => {
    try {
      const data = await stackService.getAll();
      setStructure(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar a pilha.");
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
          placeholder="Digite um item para a pilha"
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
              const response = await stackService.add(item.trim());
              setItem("");
              return response.message;
            });
          }}
        >
          Adicionar item
        </ActionButton>

        <ActionButton variant="secondary" onClick={() => void handleAction(async () => (await stackService.remove()).message)}>
          Remover topo
        </ActionButton>

        <ActionButton
          variant="secondary"
          onClick={async () => {
            try {
              setError("");
              const response = await stackService.peek();
              setResult(`Topo atual: ${response.topo}`);
              setMessage("Consulta realizada com sucesso.");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Erro ao consultar o topo.");
            }
          }}
        >
          Consultar topo
        </ActionButton>

        <ActionButton variant="danger" onClick={() => void handleAction(async () => (await stackService.clear()).message)}>
          Limpar pilha
        </ActionButton>
      </div>

      {message ? <MessageBox title="Sucesso" text={message} variant="success" /> : null}
      {error ? <MessageBox title="Erro" text={error} variant="error" /> : null}
      {result ? <div className="result-box">{result}</div> : null}
    </>
  );

  return (
    <StructurePageLayout
      title="Pagina da Pilha"
      subtitle="Adicione, remova, consulte o topo e acompanhe a atualizacao da estrutura em tempo real."
      structure={structure}
      controls={controls}
    />
  );
}
