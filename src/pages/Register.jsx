import React, { useState } from "react";
import { Navbar, Logo2, Title, Input, Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { signUp, signIn } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        try {
            await signUp(name, email, senha);
            navigate("/login"); // Volta para tela de login após cadastro
        } catch (err) {
            setErro(err.message);
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto p-4">
                <div className="text-center">
                    <Logo2 />
                </div>

                <div className="pt-6 pb-4">
                    <Title title="Efetue seu cadastro" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="pb-4">
                        <Input
                            label="Nome"
                            placeholder="Digite seu nome..."
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="pb-4">
                        <Input
                            label="Email"
                            placeholder="Digite seu email..."
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="pb-4">
                        <Input
                            label="Senha"
                            placeholder="Digite sua senha..."
                            type="password"
                            required
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center gap-6 pb-4">
            <div
              className="rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl cursor-pointer"
              style={{ width: 60, height: 60 }}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-[30px] h-[30px]"
                style={{ width: 30, height: 30 }}
              />
            </div>
            <div
              className="rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl cursor-pointer"
              style={{ width: 60, height: 60 }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-[30px] h-[30px]"
                style={{ width: 30, height: 30 }}
              />
            </div>
          </div>

                    {erro && <p style={{ color: "red" }}>{erro}</p>}

                    <div className="text-center pt-4">
                        <Button type="submit">Cadastrar</Button>
                    </div>
                </form>

                <div className="text-center pt-8">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Já tem cadastro? <strong>Faça Login</strong>
                    </Link>
                </div>
            </div>
        </>
    );
}