import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // adicione esta linha

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

export function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate(); // adicione esta linha

    return (
        <header className="navbar">
            <div>CarGas & Driving</div>
            <div className="navbar-actions">
                <button>
                    <SearchIcon />
                    <span>Buscar</span>
                </button>
                <button onClick={() => navigate("/cadastrar-carro")}>
                    <FilterIcon />
                    <span>Cadastrar carro</span>
                </button>
            </div>
            <button className="close" onClick={logout}>X</button>
        </header>
    );
}

