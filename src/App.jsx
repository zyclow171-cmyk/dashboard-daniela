import { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const LEADS_MOCK = [
  { id: 1, nome: "PetPlus - Tudo para o seu pet", cidade: "Uberlândia", segmento: "pet_shop", classificacao: "QUENTE", score: 8.5, telefone: "(34) 3214-5678", produto: "Supreme", mensagem: "Olá PetPlus! Sou a Daniela da Quatree 🐾 Vi que vocês têm uma ótima avaliação em Uberlândia. Nossa linha Supreme tem conquistado pet shops premium como o de vocês. Posso enviar mais informações?", data: "2026-03-19", status: "Aguardando resposta" },
  { id: 2, nome: "Clínica Vet Saúde Animal", cidade: "Uberaba", segmento: "clinica_veterinaria", classificacao: "QUENTE", score: 9.0, telefone: "(34) 3322-1234", produto: "Life", mensagem: "Olá Clínica Saúde Animal! Sou a Daniela da Quatree. Nossa linha Life foi desenvolvida com foco em nutrição clínica de alta qualidade. Posso apresentar para vocês?", data: "2026-03-19", status: "Respondeu" },
  { id: 3, nome: "Agropecuária Central", cidade: "Araxá", segmento: "agropecuaria", classificacao: "MORNO", score: 6.5, telefone: "(34) 3661-9876", produto: "Select", mensagem: "", data: "2026-03-19", status: "Não contatado" },
  { id: 4, nome: "Pet Shop Amigo Fiel", cidade: "Ituiutaba", segmento: "pet_shop", classificacao: "QUENTE", score: 8.0, telefone: "(34) 3261-4321", produto: "Gourmet", mensagem: "Olá Amigo Fiel! Daniela da Quatree aqui 🐶 Vocês têm uma das melhores avaliações de Ituiutaba! Nossa linha Gourmet seria perfeita para seu público. Posso te mandar o catálogo?", data: "2026-03-20", status: "Aguardando resposta" },
  { id: 5, nome: "Distribuidora Pet Mineiro", cidade: "Uberlândia", segmento: "distribuidora", classificacao: "QUENTE", score: 9.2, telefone: "(34) 3215-8765", produto: "Supreme", mensagem: "", data: "2026-03-20", status: "Não contatado" },
  { id: 6, nome: "Vet Center Uberaba", cidade: "Uberaba", segmento: "clinica_veterinaria", classificacao: "MORNO", score: 5.5, telefone: "(34) 3333-5555", produto: "Life", mensagem: "", data: "2026-03-20", status: "Não contatado" },
  { id: 7, nome: "Casa do Pet Araxá", cidade: "Araxá", segmento: "pet_shop", classificacao: "FRIO", score: 3.5, telefone: "(34) 3662-1111", produto: "Quatree Carne", mensagem: "", data: "2026-03-20", status: "Não contatado" },
  { id: 8, nome: "Agro Triângulo", cidade: "Ituiutaba", segmento: "agropecuaria", classificacao: "MORNO", score: 6.8, telefone: "(34) 3262-7777", produto: "Select", mensagem: "", data: "2026-03-20", status: "Não contatado" },
];

const COR = { QUENTE: "#ff4e4e", MORNO: "#ffaa00", FRIO: "#4e9eff" };
const COR_SEG = { pet_shop: "#a78bfa", clinica_veterinaria: "#34d399", agropecuaria: "#fbbf24", distribuidora: "#60a5fa" };
const LABEL_SEG = { pet_shop: "Pet Shop", clinica_veterinaria: "Clínica Vet.", agropecuaria: "Agropecuária", distribuidora: "Distribuidora" };

export default function DashboardDaniela() {
  const [leads, setLeads] = useState(LEADS_MOCK);
  const [filtroClf, setFiltroClf] = useState("TODOS");
  const [filtroCidade, setFiltroCidade] = useState("TODAS");
  const [filtroSeg, setFiltroSeg] = useState("TODOS");
  const [leadSelecionado, setLeadSelecionado] = useState(null);
  const [aba, setAba] = useState("dashboard");
  const [busca, setBusca] = useState("");

  const cidades = [...new Set(leads.map(l => l.cidade))];
  const segmentos = [...new Set(leads.map(l => l.segmento))];

  const leadsFiltrados = leads.filter(l => {
    const matchClf = filtroClf === "TODOS" || l.classificacao === filtroClf;
    const matchCidade = filtroCidade === "TODAS" || l.cidade === filtroCidade;
    const matchSeg = filtroSeg === "TODOS" || l.segmento === filtroSeg;
    const matchBusca = l.nome.toLowerCase().includes(busca.toLowerCase()) || l.cidade.toLowerCase().includes(busca.toLowerCase());
    return matchClf && matchCidade && matchSeg && matchBusca;
  });

  const quentes = leads.filter(l => l.classificacao === "QUENTE").length;
  const mornos = leads.filter(l => l.classificacao === "MORNO").length;
  const frios = leads.filter(l => l.classificacao === "FRIO").length;
  const contatados = leads.filter(l => l.mensagem).length;

  const dadosCidade = cidades.map(c => ({
    cidade: c,
    QUENTE: leads.filter(l => l.cidade === c && l.classificacao === "QUENTE").length,
    MORNO: leads.filter(l => l.cidade === c && l.classificacao === "MORNO").length,
    FRIO: leads.filter(l => l.cidade === c && l.classificacao === "FRIO").length,
  }));

  const dadosSeg = segmentos.map(s => ({
    name: LABEL_SEG[s] || s,
    value: leads.filter(l => l.segmento === s).length,
    color: COR_SEG[s] || "#888",
  }));

  const mensagens = leads.filter(l => l.mensagem);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e6f0", fontFamily: "'DM Sans', sans-serif", padding: "0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .card { background: #13131a; border: 1px solid #1e1e2e; border-radius: 16px; }
        .btn { cursor: pointer; border: none; border-radius: 8px; font-family: inherit; font-size: 13px; font-weight: 500; transition: all 0.2s; }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .tag { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }
        .input { background: #1a1a25; border: 1px solid #2a2a3a; border-radius: 8px; color: #e8e6f0; font-family: inherit; font-size: 13px; padding: 8px 12px; outline: none; transition: border 0.2s; }
        .input:focus { border-color: #6c5ce7; }
        .row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .lead-row { display: grid; grid-template-columns: 1fr 100px 110px 80px 70px 90px; gap: 12px; align-items: center; padding: 14px 16px; border-bottom: 1px solid #1a1a25; cursor: pointer; transition: background 0.15s; font-size: 13px; }
        .lead-row:hover { background: #16161f; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(4px); }
        .modal { background: #13131a; border: 1px solid #2a2a3a; border-radius: 20px; padding: 28px; width: 560px; max-width: 95vw; max-height: 85vh; overflow-y: auto; }
        .nav-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; padding: 10px 20px; border-radius: 8px; transition: all 0.2s; color: #888; }
        .nav-btn.active { background: #1e1e2e; color: #e8e6f0; }
        .stat-card { flex: 1; min-width: 140px; padding: 20px; border-radius: 16px; background: #13131a; border: 1px solid #1e1e2e; }
        .mapa-cidade { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; transition: transform 0.2s; }
        .mapa-cidade:hover { transform: scale(1.1); }
        .mapa-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #0a0a0f; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "24px 32px", borderBottom: "1px solid #1e1e2e", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #6c5ce7, #fd79a8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🐾</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>Agente Daniela</div>
            <div style={{ fontSize: 12, color: "#666" }}>Prospecção Quatree · Triângulo Mineiro</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["dashboard", "leads", "mensagens"].map(a => (
            <button key={a} className={`nav-btn ${aba === a ? "active" : ""}`} onClick={() => setAba(a)}>
              {a === "dashboard" ? "📊 Dashboard" : a === "leads" ? "📋 Leads" : "💬 Mensagens"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00d68f", boxShadow: "0 0 8px #00d68f" }}></div>
          <span style={{ fontSize: 12, color: "#00d68f" }}>Ativo</span>
        </div>
      </div>

      <div style={{ padding: "28px 32px" }}>

        {/* DASHBOARD */}
        {aba === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Stats */}
            <div className="row">
              {[
                { label: "Total de Leads", valor: leads.length, cor: "#6c5ce7", emoji: "🎯" },
                { label: "Leads Quentes", valor: quentes, cor: "#ff4e4e", emoji: "🔥" },
                { label: "Leads Mornos", valor: mornos, cor: "#ffaa00", emoji: "🌡️" },
                { label: "Leads Frios", valor: frios, cor: "#4e9eff", emoji: "❄️" },
                { label: "Contatados", valor: contatados, cor: "#00d68f", emoji: "✅" },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
                  <div style={{ fontSize: 32, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: s.cor }}>{s.valor}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Gráficos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

              {/* Por cidade */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Leads por Cidade</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dadosCidade} barSize={18}>
                    <XAxis dataKey="cidade" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#1a1a25", border: "1px solid #2a2a3a", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="QUENTE" stackId="a" fill="#ff4e4e" radius={[0,0,0,0]} />
                    <Bar dataKey="MORNO" stackId="a" fill="#ffaa00" />
                    <Bar dataKey="FRIO" stackId="a" fill="#4e9eff" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Por segmento */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Leads por Segmento</div>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={dadosSeg} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                      {dadosSeg.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1a1a25", border: "1px solid #2a2a3a", borderRadius: 8, fontSize: 12 }} />
                    <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 12, color: "#aaa" }}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Mapa Triângulo Mineiro */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>📍 Mapa — Triângulo Mineiro</div>
              <div style={{ position: "relative", height: 240, background: "#0f0f1a", borderRadius: 12, overflow: "hidden" }}>
                <svg width="100%" height="100%" viewBox="0 0 600 240" style={{ position: "absolute", inset: 0 }}>
                  <polygon points="150,200 300,40 450,200" fill="none" stroke="#2a2a3a" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="300" y="228" textAnchor="middle" fill="#333" fontSize="11">Triângulo Mineiro — MG</text>
                </svg>
                {[
                  { cidade: "Uberlândia", x: "47%", y: "60%", leads: leads.filter(l => l.cidade === "Uberlândia") },
                  { cidade: "Uberaba", x: "30%", y: "70%", leads: leads.filter(l => l.cidade === "Uberaba") },
                  { cidade: "Araxá", x: "25%", y: "50%", leads: leads.filter(l => l.cidade === "Araxá") },
                  { cidade: "Ituiutaba", x: "35%", y: "40%", leads: leads.filter(l => l.cidade === "Ituiutaba") },
                  { cidade: "Patos de Minas", x: "55%", y: "30%", leads: [] },
                  { cidade: "Frutal", x: "60%", y: "55%", leads: [] },
                ].map(c => (
                  <div key={c.cidade} className="mapa-cidade" style={{ left: c.x, top: c.y }} onClick={() => setFiltroCidade(c.cidade)}>
                    <div style={{ position: "relative" }}>
                      <div className="mapa-dot" style={{ background: c.leads.length > 0 ? "#6c5ce7" : "#333", width: c.leads.length > 0 ? 14 : 10, height: c.leads.length > 0 ? 14 : 10 }}></div>
                      {c.leads.filter(l => l.classificacao === "QUENTE").length > 0 && (
                        <div style={{ position: "absolute", top: -4, right: -4, width: 8, height: 8, borderRadius: "50%", background: "#ff4e4e", border: "1px solid #0a0a0f" }}></div>
                      )}
                    </div>
                    <div style={{ fontSize: 10, color: c.leads.length > 0 ? "#aaa" : "#444", whiteSpace: "nowrap", background: "#0a0a0f88", padding: "2px 6px", borderRadius: 4 }}>
                      {c.cidade} {c.leads.length > 0 && <span style={{ color: "#6c5ce7" }}>({c.leads.length})</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: "#444", marginTop: 8 }}>Clique em uma cidade para filtrar os leads</div>
            </div>
          </div>
        )}

        {/* LEADS */}
        {aba === "leads" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="row">
              <input className="input" placeholder="🔍 Buscar lead..." value={busca} onChange={e => setBusca(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
              {["TODOS", "QUENTE", "MORNO", "FRIO"].map(c => (
                <button key={c} className="btn" onClick={() => setFiltroClf(c)} style={{ padding: "8px 16px", background: filtroClf === c ? (c === "TODOS" ? "#6c5ce7" : COR[c] || "#6c5ce7") : "#1a1a25", color: filtroClf === c ? "#fff" : "#888" }}>
                  {c === "TODOS" ? "Todos" : c === "QUENTE" ? "🔥 Quentes" : c === "MORNO" ? "🌡️ Mornos" : "❄️ Frios"}
                </button>
              ))}
              <select className="input" value={filtroCidade} onChange={e => setFiltroCidade(e.target.value)}>
                <option value="TODAS">Todas cidades</option>
                {cidades.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="input" value={filtroSeg} onChange={e => setFiltroSeg(e.target.value)}>
                <option value="TODOS">Todos segmentos</option>
                {segmentos.map(s => <option key={s} value={s}>{LABEL_SEG[s]}</option>)}
              </select>
            </div>

            <div className="card" style={{ overflow: "hidden" }}>
              <div className="lead-row" style={{ background: "#0f0f1a", fontSize: 11, color: "#555", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                <span>Empresa</span><span>Cidade</span><span>Segmento</span><span>Score</span><span>Status</span><span>Ação</span>
              </div>
              {leadsFiltrados.map(lead => (
                <div key={lead.id} className="lead-row" onClick={() => setLeadSelecionado(lead)}>
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: 2 }}>{lead.nome}</div>
                    <div style={{ fontSize: 11, color: "#555" }}>{lead.telefone}</div>
                  </div>
                  <span style={{ color: "#888" }}>{lead.cidade}</span>
                  <span><span className="tag" style={{ background: COR_SEG[lead.segmento] + "22", color: COR_SEG[lead.segmento] }}>{LABEL_SEG[lead.segmento]}</span></span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: lead.score >= 8 ? "#ff4e4e" : lead.score >= 6 ? "#ffaa00" : "#4e9eff" }}>{lead.score}</span>
                  <span><span className="tag" style={{ background: COR[lead.classificacao] + "22", color: COR[lead.classificacao] }}>{lead.classificacao}</span></span>
                  <button className="btn" style={{ padding: "6px 12px", background: "#1e1e2e", color: "#aaa" }} onClick={e => { e.stopPropagation(); setLeadSelecionado(lead); }}>Ver →</button>
                </div>
              ))}
              {leadsFiltrados.length === 0 && (
                <div style={{ padding: 40, textAlign: "center", color: "#444" }}>Nenhum lead encontrado</div>
              )}
            </div>
            <div style={{ fontSize: 12, color: "#444" }}>{leadsFiltrados.length} de {leads.length} leads</div>
          </div>
        )}

        {/* MENSAGENS */}
        {aba === "mensagens" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16 }}>💬 Histórico de Mensagens Enviadas</div>
            {mensagens.length === 0 && <div style={{ color: "#444", padding: 40, textAlign: "center" }}>Nenhuma mensagem enviada ainda</div>}
            {mensagens.map(lead => (
              <div key={lead.id} className="card" style={{ padding: 20 }}>
                <div className="row" style={{ marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>{lead.nome}</div>
                    <div style={{ fontSize: 12, color: "#555" }}>{lead.cidade} · {lead.telefone}</div>
                  </div>
                  <span className="tag" style={{ background: COR[lead.classificacao] + "22", color: COR[lead.classificacao] }}>{lead.classificacao}</span>
                  <span style={{ fontSize: 11, color: "#444" }}>{lead.data}</span>
                  <span className="tag" style={{ background: lead.status === "Respondeu" ? "#00d68f22" : "#1e1e2e", color: lead.status === "Respondeu" ? "#00d68f" : "#666" }}>{lead.status}</span>
                </div>
                <div style={{ background: "#0f0f1a", borderRadius: 10, padding: 14, fontSize: 13, color: "#bbb", lineHeight: 1.6, borderLeft: "3px solid #6c5ce7" }}>
                  {lead.mensagem}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Lead */}
      {leadSelecionado && (
        <div className="modal-overlay" onClick={() => setLeadSelecionado(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{leadSelecionado.nome}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{leadSelecionado.cidade} · {leadSelecionado.telefone}</div>
              </div>
              <button className="btn" onClick={() => setLeadSelecionado(null)} style={{ background: "#1e1e2e", color: "#888", padding: "6px 12px" }}>✕</button>
            </div>
            <div className="row" style={{ marginBottom: 20 }}>
              <span className="tag" style={{ background: COR[leadSelecionado.classificacao] + "22", color: COR[leadSelecionado.classificacao] }}>{leadSelecionado.classificacao}</span>
              <span className="tag" style={{ background: COR_SEG[leadSelecionado.segmento] + "22", color: COR_SEG[leadSelecionado.segmento] }}>{LABEL_SEG[leadSelecionado.segmento]}</span>
              <span style={{ fontSize: 13, color: "#888" }}>Score: <b style={{ color: "#e8e6f0" }}>{leadSelecionado.score}</b></span>
              <span style={{ fontSize: 13, color: "#888" }}>Produto: <b style={{ color: "#6c5ce7" }}>{leadSelecionado.produto}</b></span>
            </div>
            {leadSelecionado.mensagem ? (
              <div>
                <div style={{ fontSize: 12, color: "#555", marginBottom: 8, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>Mensagem Enviada</div>
                <div style={{ background: "#0f0f1a", borderRadius: 10, padding: 16, fontSize: 13, color: "#bbb", lineHeight: 1.7, borderLeft: "3px solid #6c5ce7" }}>
                  {leadSelecionado.mensagem}
                </div>
                <div style={{ marginTop: 12, fontSize: 12 }}>
                  <span className="tag" style={{ background: leadSelecionado.status === "Respondeu" ? "#00d68f22" : "#1e1e2e", color: leadSelecionado.status === "Respondeu" ? "#00d68f" : "#888" }}>{leadSelecionado.status}</span>
                </div>
              </div>
            ) : (
              <div style={{ background: "#0f0f1a", borderRadius: 10, padding: 16, textAlign: "center", color: "#444", fontSize: 13 }}>
                Mensagem ainda não gerada para este lead
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
