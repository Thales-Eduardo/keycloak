/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { keycloak } from "../../service/keycloak";

interface AuthContextData {
  user: any;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const updateToken = async (refresh = false) => {
      if (refresh) {
        try {
          const info = await keycloak.updateToken(70);
          if (info) {
            const userInfo = await keycloak.loadUserInfo();
            const obj = {
              token: keycloak.token,
              ...userInfo,
            };
            setUser(obj);
            console.log("updateToken");
          }
        } catch (error) {
          console.log("erro updateToken", error);
        }
      }
    };

    keycloak.onTokenExpired = () => {
      updateToken(true);
    };

    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          //Com o "login-required", o Keycloak protege todas as rotas/pages, dessa forma somente usuários com token têm acesso.
          //Com o "check-sso", todas as rotas/pages ficam desprotegidas, então você vai criar um método para definir quais rotas/pages que serão privadas ou não.
          //Se usar "check-sso", você terá que criar as páginas de login/registro.
          onLoad: "login-required",
          checkLoginIframe: false,
        });
        if (authenticated) {
          const userInfo = await keycloak.loadUserInfo();
          const obj = {
            token: keycloak.token,
            ...userInfo,
          };
          setUser(obj);
        }
      } catch (error) {
        console.error("Keycloak initialization error", error);
      }
    };

    initKeycloak();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
