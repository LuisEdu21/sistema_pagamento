import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dadosGrafico = [
  { mes: 'Jan', valor: 500 },
  { mes: 'Fev', valor: 720 },
  { mes: 'Mar', valor: 610 },
  { mes: 'Abr', valor: 830 },
  { mes: 'Mai', valor: 450 }
];

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState("dashboard");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#5E60CE] text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">💳 TaPago</h1>
        <nav className="space-y-2">
          <button onClick={() => setAbaAtiva("dashboard")} className="block w-full text-left">Dashboard</button>
          <button onClick={() => setAbaAtiva("historico")} className="block w-full text-left">Histórico de Pagamento</button>
          <button onClick={() => setAbaAtiva("metodos")} className="block w-full text-left">Métodos de Pagamento</button>
          <button onClick={() => setAbaAtiva("pagar")} className="block w-full text-left">Realizar Pagamento</button>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10 bg-gray-50 overflow-y-auto">
        {abaAtiva === "dashboard" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#5E60CE]">Resumo Financeiro</h2>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-4 rounded-2xl shadow">
                <p className="text-gray-500">Total Pago no Mês</p>
                <h3 className="text-xl font-bold">R$ 1.250,00</h3>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow">
                <p className="text-gray-500">Pagamentos Realizados</p>
                <h3 className="text-xl font-bold">8</h3>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow">
                <p className="text-gray-500">Forma Mais Usada</p>
                <h3 className="text-xl font-bold">Cartão de Crédito</h3>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow">
                <p className="text-gray-500">Último Pagamento</p>
                <h3 className="text-xl font-bold">R$ 150,00</h3>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mb-2">Pagamentos por Mês</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#5E60CE" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
        )}

        {abaAtiva !== "dashboard" && (
          <div className="text-gray-500 text-center mt-40">
            <p>⚠️ Essa funcionalidade será carregada em outra etapa do desenvolvimento.</p>
          </div>
        )}
      </main>
    </div>
  );
}
