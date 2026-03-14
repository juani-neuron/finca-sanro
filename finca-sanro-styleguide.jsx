import { useState, useEffect } from "react";

// ============================================
// FINCA SANRO — EQUESTRIAN LUXURY DESIGN SYSTEM
// Style Guide + Dashboard Preview
// Reference artifact for Claude Code
// ============================================

// COLOR TOKENS
const C = {
  // Core
  bg: "#0A0A0A",
  bgCard: "#141414",
  bgCardHover: "#1A1A1A",
  bgElevated: "#1E1E1E",
  bgSubtle: "#111111",
  
  // Gold
  gold: "#C8A04A",
  goldLight: "#D4B86A",
  goldMuted: "rgba(200, 160, 74, 0.15)",
  goldBorder: "rgba(200, 160, 74, 0.25)",
  goldGlow: "rgba(200, 160, 74, 0.08)",
  
  // Text
  textPrimary: "#FAFAFA",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",
  textGold: "#C8A04A",
  
  // Status
  emerald: "#10B981",
  emeraldBg: "rgba(16, 185, 129, 0.12)",
  amber: "#F59E0B",
  amberBg: "rgba(245, 158, 11, 0.12)",
  red: "#EF4444",
  redBg: "rgba(239, 68, 68, 0.12)",
  blue: "#3B82F6",
  blueBg: "rgba(59, 130, 246, 0.12)",
  purple: "#8B5CF6",
  purpleBg: "rgba(139, 92, 246, 0.12)",
  
  // Borders
  border: "rgba(255, 255, 255, 0.06)",
  borderLight: "rgba(255, 255, 255, 0.10)",
};

// SAMPLE DATA — Real Finca Sanro stallions
const HORSES = [
  {
    id: 1,
    name: "Dedmer 519",
    kfps: "519",
    sire: "Alwin 469",
    dam: "Teeuwis 389",
    status: "Maquila Activa",
    statusColor: C.emerald,
    statusBg: C.emeraldBg,
    predicate: "Sport AAA",
    role: "Semental Aprobado",
    trainer: "Carlos Méndez",
    caretaker: "Javier Ruiz",
    age: 8,
    keuringScore: 82,
    activeMares: 4,
    foals2024: 6,
    fertility: 78,
    nextEvent: "Herrado — 18 Mar",
  },
  {
    id: 2,
    name: "Rommert 498",
    kfps: "498",
    sire: "Norbert 444",
    dam: "Jasper 366",
    status: "En Entrenamiento",
    statusColor: C.blue,
    statusBg: C.blueBg,
    predicate: "Aprobado Permanente",
    role: "Semental Aprobado",
    trainer: "Carlos Méndez",
    caretaker: "Miguel Ángel Torres",
    age: 11,
    keuringScore: 85,
    activeMares: 2,
    foals2024: 8,
    fertility: 76,
    nextEvent: "Veterinario — 20 Mar",
  },
  {
    id: 3,
    name: "Beant 517",
    kfps: "517",
    sire: "Hessel 480",
    dam: "Tsjalle 454",
    status: "En Descanso",
    statusColor: C.purple,
    statusBg: C.purpleBg,
    predicate: "Sport AAA",
    role: "Semental Aprobado",
    trainer: "Ana Lucía Vega",
    caretaker: "Javier Ruiz",
    age: 7,
    keuringScore: 88,
    activeMares: 0,
    foals2024: 5,
    fertility: 82,
    nextEvent: "Keuring — 15 Abr",
  },
  {
    id: 4,
    name: "Wibout 511",
    kfps: "511",
    sire: "Thorben 466",
    dam: "Doeke 287",
    status: "Preparación Show",
    statusColor: C.amber,
    statusBg: C.amberBg,
    predicate: "Sport Elite AAA",
    role: "Semental Aprobado Permanente",
    trainer: "Carlos Méndez",
    caretaker: "Ramón Espinoza",
    age: 9,
    keuringScore: 91,
    activeMares: 3,
    foals2024: 7,
    fertility: 80,
    nextEvent: "Show Sanro — 3 May",
  },
];

const CALENDAR_EVENTS = [
  { day: "LUN 17", items: [{ text: "Entrenamiento Dedmer", color: C.blue }, { text: "Veterinario — Yeguas", color: C.emerald }] },
  { day: "MAR 18", items: [{ text: "Herrado — Dedmer, Beant", color: C.amber }, { text: "Inseminación Yegua #12", color: C.purple }] },
  { day: "MIÉ 19", items: [{ text: "Entrenamiento Wibout", color: C.blue }, { text: "Revisión potros 2025", color: C.emerald }] },
  { day: "JUE 20", items: [{ text: "Veterinario — Rommert", color: C.red }, { text: "Entrenamiento Beant", color: C.blue }] },
  { day: "VIE 21", items: [{ text: "Vacunación grupal", color: C.red }, { text: "Preparación show", color: C.amber }] },
];

const ALERTS = [
  { text: "Vacuna vencida — Yegua Maud van Lutken", level: "urgent", time: "Hace 2 días" },
  { text: "Herrado pendiente — Beant 517", level: "warning", time: "En 3 días" },
  { text: "Seguimiento gestación — Famke fan Galinga", level: "info", time: "Mañana" },
];

// ============================================
// REUSABLE COMPONENTS
// ============================================

function GoldDivider({ style }) {
  return (
    <div style={{ height: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)`, opacity: 0.3, ...style }} />
  );
}

function StatusBadge({ text, color, bg }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", borderRadius: 20,
      backgroundColor: bg, color: color,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color }} />
      {text}
    </span>
  );
}

function PredicateBadge({ text }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 8px", borderRadius: 4,
      border: `1px solid ${C.goldBorder}`, color: C.gold,
      fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase",
    }}>
      {text}
    </span>
  );
}

function MetricCard({ label, value, sub, icon, trend }) {
  return (
    <div style={{
      backgroundColor: C.bgCard, borderRadius: 12,
      border: `1px solid ${C.border}`, padding: "20px 18px",
      position: "relative", overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${C.gold}, transparent)`,
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
            {label}
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.textPrimary, lineHeight: 1, fontFamily: "'Playfair Display', Georgia, serif" }}>
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
              {trend && (
                <span style={{ color: trend === "up" ? C.emerald : C.red, fontSize: 11, fontWeight: 700 }}>
                  {trend === "up" ? "▲" : "▼"}
                </span>
              )}
              {sub}
            </div>
          )}
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 10, backgroundColor: C.goldMuted,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function HorseCard({ horse, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? C.bgCardHover : C.bgCard,
        borderRadius: 12, border: `1px solid ${hover ? C.goldBorder : C.border}`,
        padding: 18, cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Gold top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: hover ? "100%" : "30%", height: 2,
        background: `linear-gradient(90deg, ${C.gold}, transparent)`,
        transition: "width 0.5s ease",
      }} />
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: C.textPrimary, fontFamily: "'Playfair Display', Georgia, serif" }}>
              {horse.name}
            </span>
            <PredicateBadge text={horse.predicate} />
          </div>
          <div style={{ fontSize: 12, color: C.textSecondary }}>
            {horse.sire} × {horse.dam} · {horse.age} años
          </div>
        </div>
        <StatusBadge text={horse.status} color={horse.statusColor} bg={horse.statusBg} />
      </div>

      {/* Assignees */}
      <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 0.5, textTransform: "uppercase" }}>Entrenador</div>
          <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>{horse.trainer}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 0.5, textTransform: "uppercase" }}>Cuidador</div>
          <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>{horse.caretaker}</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
        {[
          { label: "Keuring", value: horse.keuringScore, unit: "/100" },
          { label: "Yeguas", value: horse.activeMares, unit: "activas" },
          { label: "Potros '24", value: horse.foals2024, unit: "nacidos" },
          { label: "Fertilidad", value: `${horse.fertility}%`, unit: "" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.gold, fontFamily: "'Playfair Display', Georgia, serif" }}>
              {s.value}
            </div>
            <div style={{ fontSize: 9, color: C.textMuted, marginTop: 2, letterSpacing: 0.5, textTransform: "uppercase" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Next event */}
      <div style={{
        marginTop: 12, padding: "8px 12px", borderRadius: 6,
        backgroundColor: C.goldGlow, borderLeft: `2px solid ${C.gold}`,
        fontSize: 12, color: C.textSecondary,
      }}>
        <span style={{ color: C.gold, fontWeight: 700, marginRight: 6 }}>Próximo:</span>
        {horse.nextEvent}
      </div>
    </div>
  );
}

// ============================================
// VIEWS
// ============================================

function DashboardView({ onHorseClick }) {
  return (
    <div>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <MetricCard label="Total Caballos" value="24" sub="6 sementales · 12 yeguas · 6 potros" icon="🐎" />
        <MetricCard label="Maquilas Activas" value="9" sub="+3 vs. mes anterior" trend="up" icon="🧬" />
        <MetricCard label="Potros 2025" value="4" sub="8 gestaciones en curso" icon="⭐" />
        <MetricCard label="Valor Estimado" value="$14.2M" sub="MXN · +8% este año" trend="up" icon="💰" />
      </div>

      {/* Two column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Calendar */}
        <div style={{
          backgroundColor: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`,
          padding: 20, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
            Calendario Semanal
          </div>
          {CALENDAR_EVENTS.map(day => (
            <div key={day.day} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: 0.5, marginBottom: 6 }}>{day.day}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {day.items.map((item, i) => (
                  <div key={i} style={{
                    padding: "6px 10px", borderRadius: 6, backgroundColor: C.bgElevated,
                    borderLeft: `2px solid ${item.color}`, fontSize: 12, color: C.textSecondary,
                  }}>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div style={{
          backgroundColor: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`,
          padding: 20, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
            Requiere Atención
          </div>
          {ALERTS.map((a, i) => (
            <div key={i} style={{
              padding: "12px 14px", borderRadius: 8, marginBottom: 8,
              backgroundColor: a.level === "urgent" ? C.redBg : a.level === "warning" ? C.amberBg : C.blueBg,
              borderLeft: `3px solid ${a.level === "urgent" ? C.red : a.level === "warning" ? C.amber : C.blue}`,
            }}>
              <div style={{ fontSize: 13, color: C.textPrimary, fontWeight: 500 }}>{a.text}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{a.time}</div>
            </div>
          ))}

          <GoldDivider style={{ margin: "16px 0" }} />

          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
            Staff Asignado Hoy
          </div>
          {[
            { name: "Carlos Méndez", role: "Entrenador Principal", horses: 3 },
            { name: "Javier Ruiz", role: "Caballerizo", horses: 5 },
            { name: "Dr. Arturo Sánchez", role: "Veterinario", horses: 2 },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
            }}>
              <div>
                <div style={{ fontSize: 13, color: C.textPrimary, fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{s.role}</div>
              </div>
              <div style={{
                padding: "3px 8px", borderRadius: 12, backgroundColor: C.goldMuted,
                fontSize: 11, fontWeight: 700, color: C.gold,
              }}>
                {s.horses} caballos
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sementales Grid */}
      <div style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2, textTransform: "uppercase" }}>
            Sementales Aprobados KFPS
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, cursor: "pointer" }}>
            Ver todos los caballos →
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {HORSES.map(h => (
            <HorseCard key={h.id} horse={h} onClick={() => onHorseClick(h)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HorseProfileView({ horse, onBack }) {
  const tabs = ["General", "KFPS", "Salud", "Reproducción", "Entrenamiento", "Cuidado", "Financiero", "Docs"];
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div>
      {/* Back button */}
      <button onClick={onBack} style={{
        background: "none", border: "none", color: C.textSecondary, cursor: "pointer",
        fontSize: 13, marginBottom: 16, padding: 0, display: "flex", alignItems: "center", gap: 6,
      }}>
        ← Regresar al Dashboard
      </button>

      {/* Horse header */}
      <div style={{
        backgroundColor: C.bgCard, borderRadius: 16, border: `1px solid ${C.border}`,
        padding: 24, marginBottom: 20, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight}, transparent)`,
        }} />
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16, backgroundColor: C.goldMuted,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `2px solid ${C.goldBorder}`, fontSize: 30,
              }}>
                🐴
              </div>
              <div>
                <h1 style={{
                  fontSize: 28, fontWeight: 800, color: C.textPrimary, margin: 0,
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}>
                  {horse.name}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <PredicateBadge text={horse.predicate} />
                  <span style={{ fontSize: 13, color: C.textSecondary }}>·</span>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{horse.role}</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.textSecondary, marginTop: 8, marginLeft: 76 }}>
              {horse.sire} × {horse.dam} · {horse.age} años · KFPS #{horse.kfps}
            </div>
          </div>
          <StatusBadge text={horse.status} color={horse.statusColor} bg={horse.statusBg} />
        </div>

        {/* Quick stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16,
          marginTop: 24, padding: "16px 0 0",
          borderTop: `1px solid ${C.border}`,
        }}>
          {[
            { label: "Puntuación Keuring", value: horse.keuringScore, unit: "/100" },
            { label: "Yeguas Activas", value: horse.activeMares },
            { label: "Potros 2024", value: horse.foals2024 },
            { label: "Tasa Fertilidad", value: `${horse.fertility}%` },
            { label: "Próximo Evento", value: horse.nextEvent.split("—")[0], sub: horse.nextEvent.split("—")[1] },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.gold, fontFamily: "'Playfair Display', Georgia, serif" }}>
                {s.value}
              </div>
              {s.unit && <div style={{ fontSize: 11, color: C.textMuted }}>{s.unit}</div>}
              {s.sub && <div style={{ fontSize: 11, color: C.textSecondary }}>{s.sub}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 0, marginBottom: 20,
        borderBottom: `1px solid ${C.border}`,
        overflowX: "auto",
      }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: "10px 18px", background: "none", border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: activeTab === t ? 700 : 400,
            color: activeTab === t ? C.gold : C.textMuted,
            borderBottom: activeTab === t ? `2px solid ${C.gold}` : "2px solid transparent",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content — General */}
      {activeTab === "General" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Pedigree */}
          <div style={{
            backgroundColor: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`, padding: 20,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
              Pedigree
            </div>
            
            {/* Simple pedigree tree */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Horse */}
              <div style={{
                padding: "12px 16px", borderRadius: 8, backgroundColor: C.goldMuted,
                border: `1px solid ${C.goldBorder}`, textAlign: "center",
              }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.gold, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {horse.name}
                </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: 1, height: 16, backgroundColor: C.goldBorder }} />
              </div>
              
              {/* Parents */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{
                  padding: "10px 14px", borderRadius: 8, backgroundColor: C.bgElevated,
                  border: `1px solid ${C.border}`, textAlign: "center",
                }}>
                  <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Padre</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {horse.sire}
                  </div>
                </div>
                <div style={{
                  padding: "10px 14px", borderRadius: 8, backgroundColor: C.bgElevated,
                  border: `1px solid ${C.border}`, textAlign: "center",
                }}>
                  <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Madre</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {horse.dam}
                  </div>
                </div>
              </div>
              
              {/* Grandparents placeholder */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
                {["Ab. Pat. ♂", "Ab. Pat. ♀", "Ab. Mat. ♂", "Ab. Mat. ♀"].map(label => (
                  <div key={label} style={{
                    padding: "8px 6px", borderRadius: 6, backgroundColor: C.bgSubtle,
                    border: `1px solid ${C.border}`, textAlign: "center",
                  }}>
                    <div style={{ fontSize: 8, color: C.textMuted, letterSpacing: 0.5, marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 11, color: C.textSecondary }}>—</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div style={{
            backgroundColor: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`, padding: 20,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
              Timeline Reciente
            </div>
            
            {[
              { date: "Mar 2025", text: "Preparación para Show Sanro", icon: "🏆" },
              { date: "Feb 2025", text: "Evaluación veterinaria — sin hallazgos", icon: "🩺" },
              { date: "Ene 2025", text: "Inicio temporada de maquila 2025", icon: "🧬" },
              { date: "Nov 2024", text: "Keuring AMCAF — Puntuación 1er Premium", icon: "⭐" },
              { date: "Oct 2024", text: "Herrado deportivo — herradura especial", icon: "🔨" },
              { date: "Sep 2024", text: "Competencia Dressage nivel Z — 3er lugar", icon: "🎯" },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, backgroundColor: C.goldMuted,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                    border: `1px solid ${C.goldBorder}`,
                  }}>
                    {e.icon}
                  </div>
                  {i < 5 && <div style={{ width: 1, flex: 1, backgroundColor: C.border, marginTop: 4 }} />}
                </div>
                <div style={{ paddingBottom: 4 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 0.5 }}>{e.date}</div>
                  <div style={{ fontSize: 13, color: C.textSecondary, marginTop: 2 }}>{e.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== "General" && (
        <div style={{
          backgroundColor: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`,
          padding: 40, textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏗️</div>
          <div style={{ fontSize: 15, color: C.textSecondary }}>
            Módulo <span style={{ color: C.gold, fontWeight: 700 }}>{activeTab}</span> — Se implementará en producción
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>
            La estructura y datos están definidos en el plan.md
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN APP SHELL
// ============================================

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "horses", label: "Caballos", icon: "🐎" },
    { id: "maquila", label: "Maquila", icon: "🧬" },
    { id: "calendar", label: "Calendario", icon: "📅" },
    { id: "staff", label: "Personal", icon: "👥" },
    { id: "competitions", label: "Competencias", icon: "🏆" },
    { id: "finances", label: "Financiero", icon: "💰" },
    { id: "settings", label: "Configuración", icon: "⚙️" },
  ];

  return (
    <div style={{
      display: "flex", height: "100vh", backgroundColor: C.bg,
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: C.textPrimary,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.goldBorder}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.gold}; }
      `}</style>

      {/* Sidebar */}
      <div style={{
        width: sidebarCollapsed ? 64 : 220, flexShrink: 0,
        backgroundColor: C.bgCard, borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}>
        {/* Logo area */}
        <div style={{
          padding: sidebarCollapsed ? "20px 12px" : "20px 18px", borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", gap: 10,
          cursor: "pointer",
        }}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10, backgroundColor: C.goldMuted,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${C.goldBorder}`, flexShrink: 0,
          }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: C.gold, fontFamily: "'Playfair Display', Georgia, serif" }}>FS</span>
          </div>
          {!sidebarCollapsed && (
            <div>
              <div style={{
                fontSize: 13, fontWeight: 800, color: C.gold, letterSpacing: 2,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}>
                FINCA SANRO
              </div>
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1.5, marginTop: 1 }}>
                GESTIÓN ECUESTRE
              </div>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav style={{ padding: "12px 8px", flex: 1 }}>
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button key={item.id} onClick={() => { setCurrentView(item.id); setSelectedHorse(null); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: sidebarCollapsed ? "10px 12px" : "10px 12px",
                borderRadius: 8, border: "none", cursor: "pointer",
                backgroundColor: isActive ? C.goldMuted : "transparent",
                color: isActive ? C.gold : C.textSecondary,
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                transition: "all 0.2s", marginBottom: 2,
                justifyContent: sidebarCollapsed ? "center" : "flex-start",
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                {!sidebarCollapsed && item.label}
              </button>
            );
          })}
        </nav>

        {/* User */}
        {!sidebarCollapsed && (
          <div style={{ padding: "14px 18px", borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, backgroundColor: C.goldMuted,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${C.goldBorder}`, fontSize: 14,
              }}>
                👑
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>Super Admin</div>
                <div style={{ fontSize: 10, color: C.textMuted }}>Propietario</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{
          padding: "14px 28px", borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          backgroundColor: C.bgCard,
        }}>
          <div>
            <h2 style={{
              fontSize: 20, fontWeight: 800, color: C.textPrimary, margin: 0,
              fontFamily: selectedHorse ? "'Playfair Display', Georgia, serif" : "'DM Sans', sans-serif",
            }}>
              {selectedHorse ? selectedHorse.name : currentView === "dashboard" ? "Dashboard" : navItems.find(n => n.id === currentView)?.label}
            </h2>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
              {selectedHorse ? "Expediente del Caballo" : "Finca Sanro · Estado de México"}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Search */}
            <div style={{
              padding: "8px 14px", borderRadius: 8, backgroundColor: C.bgElevated,
              border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 14, color: C.textMuted }}>🔍</span>
              <span style={{ fontSize: 12, color: C.textMuted }}>Buscar caballo...</span>
            </div>
            {/* Notifications */}
            <div style={{
              width: 36, height: 36, borderRadius: 8, backgroundColor: C.bgElevated,
              border: `1px solid ${C.border}`, display: "flex", alignItems: "center",
              justifyContent: "center", position: "relative", cursor: "pointer",
            }}>
              <span style={{ fontSize: 16 }}>🔔</span>
              <span style={{
                position: "absolute", top: -2, right: -2, width: 16, height: 16,
                borderRadius: "50%", backgroundColor: C.red, fontSize: 9,
                fontWeight: 700, color: "white", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>3</span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
          {selectedHorse ? (
            <HorseProfileView horse={selectedHorse} onBack={() => setSelectedHorse(null)} />
          ) : currentView === "dashboard" ? (
            <DashboardView onHorseClick={(h) => setSelectedHorse(h)} />
          ) : (
            <div style={{
              backgroundColor: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`,
              padding: 48, textAlign: "center",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary }}>
                Módulo {navItems.find(n => n.id === currentView)?.label}
              </div>
              <div style={{ fontSize: 13, color: C.textSecondary, marginTop: 8, maxWidth: 400, margin: "8px auto 0" }}>
                Este módulo se implementará en la versión de producción.
                La estructura completa está definida en el plan.md
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
