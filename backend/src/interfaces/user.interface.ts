import { Auth } from "./auth.interface.js";

export interface User extends Auth {
  id?: number;
  name: string;
  imageSecureUrl?: string;
  imagePublicId?: string;
  phone?: string;
  address?: string;
  tokenMovil?: string;
}
