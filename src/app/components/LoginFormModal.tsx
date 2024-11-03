import { Dialog } from "@mui/material";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

type LoginModalForm = {
  isOpen: boolean,
  onHandleLogin: (username: string, password: string) => void,
  onClose: () => void,
}

const LoginFormModal = ({ isOpen, onHandleLogin, onClose }: LoginModalForm) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return <Dialog open={isOpen} onClose={onClose}>
    <h2>Prijava</h2>
    <Input
      type="text"
      placeholder="Korisničko ime"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <Input
      type="password"
      placeholder="Lozinka"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Button onClick={() => onHandleLogin(username, password)} title="Prijavi se" />
  </Dialog>
}

export default LoginFormModal;