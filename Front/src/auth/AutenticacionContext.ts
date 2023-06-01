import React from "react";
import { claim } from "../Models/auth.model";

const AutenticacionContext = React.createContext<{
  claims: claim[];
  sucursalId: number;
  actualizar(claims: claim[]): void;
}>({ claims: [], actualizar: () => {}, sucursalId: 0 });

export default AutenticacionContext;
