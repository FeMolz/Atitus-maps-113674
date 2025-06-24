import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";

// Exemplos de SVG inline para os ícones
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <rect x="1" y="1" width="22" height="22" rx="2" stroke="none" fill="none"/>
  </svg>
);

const ListIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="4" cy="6" r="2" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="4" cy="18" r="2" />
  </svg>
);

export function Navbar() {
    const { logout } = useAuth();

    return (
        <header className="navbar">
            <div>CarGas & Driving</div>
            <div className="navbar-actions">
                <button>
                    <SearchIcon />
                    <span>Buscar</span>
                </button>
                <button>
                    <FilterIcon />
                    <span>Filtrar</span>
                </button>
                <button>
                    <ListIcon />
                    <span>Listar</span>
                </button>
            </div>
            <button className="close" onClick={logout}>X</button>
        </header>
    );
}

