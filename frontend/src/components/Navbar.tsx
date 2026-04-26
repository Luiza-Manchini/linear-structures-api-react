import { NavLink } from "react-router-dom";
import type { StatsResponse } from "../types/api";
import MessageBox from "./MessageBox";

interface NavbarProps {
  stats: StatsResponse | null;
  error: string;
}

export default function Navbar({ stats, error }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div>
          <div className="navbar__brand">Estruturas Lineares</div>
          <nav className="navbar__links">
            <NavLink to="/pilha">Pilha</NavLink>
            <NavLink to="/fila">Fila</NavLink>
            <NavLink to="/lista">Lista</NavLink>
          </nav>
        </div>

        {stats ? (
          <div className="stats-bar">
            <div className="stats-card">
              <strong>Total</strong>
              <span>{stats.totalEstruturasCriadas}</span>
            </div>
            <div className="stats-card">
              <strong>Pilha</strong>
              <span>{stats.estruturas.pilha.tamanho} itens</span>
            </div>
            <div className="stats-card">
              <strong>Fila</strong>
              <span>{stats.estruturas.fila.tamanho} itens</span>
            </div>
            <div className="stats-card">
              <strong>Lista</strong>
              <span>{stats.estruturas.lista.tamanho} itens</span>
            </div>
          </div>
        ) : null}
      </div>
      {error ? <div className="navbar__inner"><MessageBox title="Erro da API" text={error} variant="error" /></div> : null}
    </header>
  );
}
