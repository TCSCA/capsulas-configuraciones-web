"use client";

import { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";

interface Transaction {
  idTransaction: number;
  transaction: string;
  status: boolean;
  idProfile: number;
  url: string;
}

export function ConfigTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://172.16.90.148:8086/api/transactions");
        if (!res.ok) throw new Error("Error al obtener transacciones");
        const data: Transaction[] = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const toggleTransaction = async (t: Transaction, checked: boolean) => {
    const prevStatus = t.status;

    // Actualizar solo la transacción correcta (idTransaction + idProfile)
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.idTransaction === t.idTransaction && tx.idProfile === t.idProfile
          ? { ...tx, status: checked }
          : tx
      )
    );

    try {
      const url = checked
        ? "http://172.16.90.148:8086/api/transactions/enable"
        : "http://172.16.90.148:8086/api/transactions/disable";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction: t.transaction,
          idProfile: t.idProfile,
        }),
      });

      if (!res.ok) throw new Error("Error al actualizar transacción");
    } catch (error) {
      console.error(error);
      // Revertir si hubo error
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.idTransaction === t.idTransaction && tx.idProfile === t.idProfile
            ? { ...tx, status: prevStatus }
            : tx
        )
      );
      alert("Error al actualizar la transacción");
    }
  };

  if (isLoading) {
    return <p className="text-center py-8">Cargando transacciones...</p>;
  }

  return (
    <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm w-full">
      {/* Card Header */}
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold">Configuración de Transacciones</h2>
      </div>

      {/* Card Content */}
      <div className="px-6 py-4 space-y-4">
        {transactions.map((t) => (
          <div
            key={`${t.idTransaction}-${t.idProfile}`}
            className="flex items-center justify-between border border-border rounded-lg p-3"
          >
            <div>
              <p className="font-medium">{t.transaction}</p>
              <p className="text-sm text-muted-foreground">{t.url}</p>
              <p className="text-xs text-muted-foreground">
                Perfil: {t.idProfile}
              </p>
            </div>

            <Switch.Root
              className={`w-11 h-6 rounded-full border border-border relative
                          ${t.status ? "bg-primary" : "bg-muted"} 
                          focus:outline-none focus:ring-2 focus:ring-primary`}
              checked={t.status}
              onCheckedChange={(checked) => toggleTransaction(t, checked)}
            >
              <Switch.Thumb
                className={`block w-5 h-5 bg-card rounded-full shadow-md
                            transition-transform duration-200
                            ${t.status ? "translate-x-5" : "translate-x-0"}`}
              />
            </Switch.Root>
          </div>
        ))}
      </div>
    </div>
  );
}
