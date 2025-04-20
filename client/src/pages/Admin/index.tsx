/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { api } from "../../service/api";

export function Admin() {
  const { user } = useAuth();

  const [data, setData] = useState();

  useEffect(() => {
    const data = async () => {
      try {
        const response = await api.get("/admin", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setData(response.data);
      } catch (error: any) {
        alert(error.message);
      }
    };
    if (user.token) data();
  }, [user]);

  return (
    <>
      <h1>Admin</h1>
      <h2>{data}</h2>
    </>
  );
}
