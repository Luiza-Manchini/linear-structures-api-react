import type { ReactNode } from "react";
import type { StructureData } from "../types/api";
import ItemList from "./ItemList";

interface StructurePageLayoutProps {
  title: string;
  subtitle: string;
  structure: StructureData | null;
  controls: ReactNode;
  sideContent?: ReactNode;
}

export default function StructurePageLayout({
  title,
  subtitle,
  structure,
  controls,
  sideContent,
}: StructurePageLayoutProps) {
  return (
    <section>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>

      <div className="page-grid">
        <div className="card">{controls}</div>

        <aside className="card">
          <h2>Estado atual</h2>
          <p>
            <strong>Nome:</strong> {structure?.nome ?? "-"}
          </p>
          <p>
            <strong>Tamanho:</strong> {structure?.tamanho ?? 0}
          </p>
          <ItemList items={structure?.itens ?? []} />
          {sideContent}
        </aside>
      </div>
    </section>
  );
}
