import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Activity, TrendingUp, Mountain, Zap, Filter, Brain, RefreshCw, Heart, Timer, Target, Flame } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine
} from "recharts";

const RAW_DATA = [{"id":"18362912244","date":"2026-05-03","name":"Maratón de Mendoza 🚀 PR ✨","dist_km":42.16,"moving_time_s":13350,"pace":5.278,"elev":152.8,"avg_hr":165.0,"calories":2060.0,"year":2026,"week":"2026-W17","dow":6,"month":"2026-05"},{"id":"18346274535","date":"2026-05-02","name":"Shake out ✨","dist_km":6.03,"moving_time_s":1811,"pace":5.002,"elev":30.9,"avg_hr":163.0,"calories":300.0,"year":2026,"week":"2026-W17","dow":5,"month":"2026-05"},{"id":"18314208298","date":"2026-04-30","name":"Tempo 20' + 2 x 1000m","dist_km":8.99,"moving_time_s":2625,"pace":4.864,"elev":2.8,"avg_hr":150.0,"calories":372.0,"year":2026,"week":"2026-W17","dow":3,"month":"2026-04"},{"id":"18265846448","date":"2026-04-26","name":"The last dance","dist_km":15.01,"moving_time_s":4874,"pace":5.413,"elev":9.6,"avg_hr":153.0,"calories":732.0,"year":2026,"week":"2026-W16","dow":6,"month":"2026-04"},{"id":"18233785949","date":"2026-04-24","name":"30' continuos","dist_km":6.01,"moving_time_s":1867,"pace":5.182,"elev":0.0,"avg_hr":145.0,"calories":265.0,"year":2026,"week":"2026-W16","dow":4,"month":"2026-04"},{"id":"18196736066","date":"2026-04-21","name":"8K zona umbral","dist_km":8.05,"moving_time_s":2559,"pace":5.299,"elev":4.6,"avg_hr":152.0,"calories":384.0,"year":2026,"week":"2026-W16","dow":1,"month":"2026-04"},{"id":"17988482113","date":"2026-04-05","name":"Fondito de 22k","dist_km":22.01,"moving_time_s":7746,"pace":5.864,"elev":16.5,"avg_hr":138.0,"calories":860.0,"year":2026,"week":"2026-W13","dow":6,"month":"2026-04"},{"id":"17731440956","date":"2026-03-15","name":"30k Peak training","dist_km":30.01,"moving_time_s":10079,"pace":5.598,"elev":16.0,"avg_hr":0,"calories":1517.0,"year":2026,"week":"2026-W10","dow":6,"month":"2026-03"},{"id":"17565627489","date":"2026-03-01","name":"Reaching Peak 28k","dist_km":28.02,"moving_time_s":9204,"pace":5.475,"elev":20.4,"avg_hr":0,"calories":1336.0,"year":2026,"week":"2026-W08","dow":6,"month":"2026-03"},{"id":"17484167571","date":"2026-02-22","name":"Fondito de domingo","dist_km":26.01,"moving_time_s":8926,"pace":5.72,"elev":18.1,"avg_hr":0,"calories":1139.0,"year":2026,"week":"2026-W07","dow":6,"month":"2026-02"},{"id":"17406324930","date":"2026-02-15","name":"Fondito Mendocino","dist_km":24.01,"moving_time_s":8073,"pace":5.604,"elev":120.0,"avg_hr":0,"calories":1119.0,"year":2026,"week":"2026-W06","dow":6,"month":"2026-02"},{"id":"17328467911","date":"2026-02-08","name":"Fondito querido","dist_km":22.01,"moving_time_s":7207,"pace":5.458,"elev":19.5,"avg_hr":0,"calories":1070.0,"year":2026,"week":"2026-W05","dow":6,"month":"2026-02"},{"id":"17250883947","date":"2026-02-01","name":"Sunday Fondito","dist_km":20.01,"moving_time_s":6633,"pace":5.526,"elev":19.5,"avg_hr":0,"calories":1011.0,"year":2026,"week":"2026-W04","dow":6,"month":"2026-02"},{"id":"17092845662","date":"2026-01-18","name":"Sunday-Runday","dist_km":16.02,"moving_time_s":5680,"pace":5.91,"elev":13.4,"avg_hr":0,"calories":727.0,"year":2026,"week":"2026-W02","dow":6,"month":"2026-01"},{"id":"17012314335","date":"2026-01-11","name":"18k","dist_km":18.01,"moving_time_s":6178,"pace":5.717,"elev":13.2,"avg_hr":0,"calories":933.0,"year":2026,"week":"2026-W01","dow":6,"month":"2026-01"},{"id":"15888873335","date":"2025-09-21","name":"42k Maraton BsAs","dist_km":43.11,"moving_time_s":14058,"pace":5.435,"elev":162.3,"avg_hr":0,"calories":2079.0,"year":2025,"week":"2025-W37","dow":6,"month":"2025-09"},{"id":"15733638235","date":"2025-09-07","name":"Afternoon Run","dist_km":26.03,"moving_time_s":8448,"pace":5.41,"elev":18.4,"avg_hr":0,"calories":1285.0,"year":2025,"week":"2025-W35","dow":6,"month":"2025-09"},{"id":"15643317354","date":"2025-08-30","name":"Evening Run","dist_km":30.01,"moving_time_s":9791,"pace":5.438,"elev":46.2,"avg_hr":0,"calories":1455.0,"year":2025,"week":"2025-W34","dow":5,"month":"2025-08"},{"id":"15100934828","date":"2025-07-13","name":"Morning Run","dist_km":30.04,"moving_time_s":9528,"pace":5.287,"elev":15.0,"avg_hr":0,"calories":1554.0,"year":2025,"week":"2025-W27","dow":6,"month":"2025-07"},{"id":"14662762747","date":"2025-06-01","name":"Morning Run","dist_km":24.03,"moving_time_s":8186,"pace":5.678,"elev":7.7,"avg_hr":0,"calories":1270.0,"year":2025,"week":"2025-W21","dow":6,"month":"2025-06"},{"id":"14446560781","date":"2025-05-11","name":"Morning Run","dist_km":21.04,"moving_time_s":6753,"pace":5.35,"elev":35.6,"avg_hr":0,"calories":1083.0,"year":2025,"week":"2025-W18","dow":6,"month":"2025-05"},{"id":"14043922354","date":"2025-03-31","name":"Evening Run","dist_km":18.02,"moving_time_s":6086,"pace":5.63,"elev":25.2,"avg_hr":0,"calories":913.0,"year":2025,"week":"2025-W13","dow":0,"month":"2025-03"},{"id":"13953651526","date":"2025-03-22","name":"Morning Run","dist_km":21.01,"moving_time_s":7277,"pace":5.772,"elev":14.9,"avg_hr":0,"calories":1106.0,"year":2025,"week":"2025-W11","dow":5,"month":"2025-03"},{"id":"12868199078","date":"2024-11-10","name":"Morning Run","dist_km":21.01,"moving_time_s":6819,"pace":5.408,"elev":68.8,"avg_hr":0,"calories":1130.0,"year":2024,"week":"2024-W45","dow":6,"month":"2024-11"},{"id":"12239664975","date":"2024-08-25","name":"Morning Run","dist_km":21.03,"moving_time_s":6576,"pace":5.212,"elev":84.7,"avg_hr":0,"calories":1017.0,"year":2024,"week":"2024-W34","dow":6,"month":"2024-08"},{"id":"11830271008","date":"2024-07-07","name":"Morning Run","dist_km":30.11,"moving_time_s":10019,"pace":5.546,"elev":15.3,"avg_hr":0,"calories":1395.0,"year":2024,"week":"2024-W27","dow":6,"month":"2024-07"},{"id":"11720431873","date":"2024-06-23","name":"Morning Run","dist_km":22.03,"moving_time_s":7525,"pace":5.692,"elev":26.2,"avg_hr":0,"calories":1050.0,"year":2024,"week":"2024-W25","dow":6,"month":"2024-06"},{"id":"11283305028","date":"2024-04-28","name":"Morning Run","dist_km":21.05,"moving_time_s":6625,"pace":5.245,"elev":66.1,"avg_hr":0,"calories":1066.0,"year":2024,"week":"2024-W17","dow":6,"month":"2024-04"},{"id":"11129267138","date":"2024-04-07","name":"Morning Run","dist_km":21.18,"moving_time_s":7049,"pace":5.547,"elev":11.5,"avg_hr":0,"calories":1134.0,"year":2024,"week":"2024-W14","dow":6,"month":"2024-04"},{"id":"10929880820","date":"2024-02-02","name":"Morning Run","dist_km":10.77,"moving_time_s":3604,"pace":5.576,"elev":41.7,"avg_hr":0,"calories":500.0,"year":2024,"week":"2024-W05","dow":4,"month":"2024-02"}];

const ORANGE = "#C6F135";
const LIME = "#C6F135";
const VIOLET = "#BF5FFF";
const DARK_BG = "#0d0d0d";
const CARD_BG = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT_PRIMARY = "#ffffff";
const TEXT_MUTED = "#777";
const fmtPace = (p) => { if (!p || p <= 0) return "—"; const min = Math.floor(p); const sec = Math.round((p - min) * 60); return `${min}:${sec.toString().padStart(2,"0")}`; };
const fmtDist = (km, imperial) => imperial ? `${(km * 0.621371).toFixed(1)} mi` : `${km.toFixed(1)} km`;
const PRESETS = [{ label:"7 días", days:7 }, { label:"30 días", days:30 }, { label:"3 meses", days:91 }, { label:"6 meses", days:182 }, { label:"1 año", days:365 }, { label:"Todo", days:null }];
const TODAY = "2026-05-14";
const EARLIEST = RAW_DATA[RAW_DATA.length - 1].date;
const RACE_DISTANCES = [
  { label:"5k", value:5 }, { label:"10k", value:10 }, { label:"15k", value:15 },
  { label:"21k — Media Maratón", value:21.0975 }, { label:"25k", value:25 }, { label:"30k", value:30 },
  { label:"42k — Maratón", value:42.195 }, { label:"Otra", value:0 },
];
const HR_ZONES = [
  { zone:"Z1", name:"Recuperación", pct:[0.50,0.60], color:"#4a9eff", desc:"Trote muy suave, conversación fluida" },
  { zone:"Z2", name:"Aeróbico base", pct:[0.60,0.70], color:"#4caf50", desc:"Base aeróbica, fondos largos" },
  { zone:"Z3", name:"Tempo", pct:[0.70,0.80], color:"#d4c017", desc:"Ritmo de carrera, esfuerzo moderado" },
  { zone:"Z4", name:"Umbral", pct:[0.80,0.90], color:"#e88600", desc:"Intervalos, zona de lactato" },
  { zone:"Z5", name:"VO₂ máx", pct:[0.90,1.00], color:"#e84800", desc:"Sprints, máximo esfuerzo" },
];
const RIEGEL_EXP = 1.06;

export default function RunningDashboard() {
  const [csvData, setCsvData] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [homeForm, setHomeForm] = useState({ userName:"", raceName:"Maratón de Buenos Aires", raceDate:"2026-09-27", raceDist:42.195, fcMax:181, age:"", sex:"F" });
  const [csvError, setCsvError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({ userName:"", raceName:"Maratón de Buenos Aires", raceDate:"2026-09-27", raceDist:42.195, fcMax:181, age:34, sex:"F" });
  const [configDraft, setConfigDraft] = useState(null);
  const [dateFrom, setDateFrom] = useState(EARLIEST);
  const [dateTo, setDateTo] = useState(TODAY);
  const [activePreset, setActivePreset] = useState(null);
  const [imperial, setImperial] = useState(false);
  const [insight, setInsight] = useState("");
  const [insightLoading, setInsightLoading] = useState(false);
  const [insightError, setInsightError] = useState(false);
  const insightKey = useRef("");
  const [recs, setRecs] = useState([]);
  const [recsLoading, setRecsLoading] = useState(false);
  const [recsError, setRecsError] = useState(false);
  const recsKey = useRef("");
  const [vo2Insight, setVo2Insight] = useState("");
  const [vo2Loading, setVo2Loading] = useState(false);
  const vo2Loaded = useRef(false);
  const [vo2Actions, setVo2Actions] = useState([]);
  const [vo2ActLoading, setVo2ActLoading] = useState(false);
  const vo2ActLoaded = useRef(false);
  const [countdown, setCountdown] = useState({ days:0, hours:0, mins:0, secs:0 });
  const [compA, setCompA] = useState(null);
  const [compB, setCompB] = useState(null);
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const applyPreset = (days) => {
    if (days === null) { setDateFrom(EARLIEST); setDateTo(TODAY); setActivePreset(null); }
    else {
      const from = new Date(TODAY); from.setDate(from.getDate() - days + 1);
      setDateFrom(from.toISOString().slice(0,10)); setDateTo(TODAY); setActivePreset(days);
    }
  };

  const parseCSV = (text) => {
    try {
      const lines = text.trim().split("\n");
      const header = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g,"").replace(/\r/g,""));
      const isGarmin = header.includes("Avg Pace") || header.includes("Avg HR");
      const isStrava = header.includes("Activity Date");
      if (!isGarmin && !isStrava) { setCsvError("No se encontraron columnas de fecha o distancia. Verificá que sea el CSV de Strava o Garmin."); return null; }
      const dateIdx = isGarmin ? header.indexOf("Date") : header.indexOf("Activity Date");
      const distIdx = header.indexOf("Distance");
      const nameIdx = isGarmin ? header.indexOf("Title") : header.indexOf("Activity Name");
      const elevIdx = isGarmin ? header.indexOf("Total Ascent") : header.indexOf("Elevation Gain");
      const hrIdx = isGarmin ? header.indexOf("Avg HR") : header.indexOf("Average Heart Rate");
      const calIdx = header.indexOf("Calories");
      const movingIdx = header.indexOf("Moving Time");
      const paceIdx = isGarmin ? header.indexOf("Avg Pace") : -1;
      const calcWeek = (dt) => {
        const d = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const wk = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return `${d.getUTCFullYear()}-W${String(wk).padStart(2,"0")}`;
      };
      const parsed = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map(c => c.replace(/\r/g,"").trim());
        const clean = (idx) => idx >= 0 ? (row[idx] || "").replace(/^"|"$/g,"").replace(/^\s+|\s+$/g,"") : "";
        const dateStr = clean(dateIdx); if (!dateStr) continue;
        let dt; try { dt = new Date(dateStr); } catch { continue; } if (isNaN(dt)) continue;
        const distRaw = parseFloat(clean(distIdx)) || 0;
        const distKm = isGarmin ? distRaw : (distRaw > 500 ? distRaw / 1000 : distRaw);
        if (distKm < 0.5) continue;
        let movingS = 0, pace = 0;
        if (isGarmin && paceIdx >= 0) { const parts = clean(paceIdx).split(":"); if (parts.length === 2) pace = parseInt(parts[0]) + parseInt(parts[1]) / 60; movingS = Math.round(pace * 60 * distKm); }
        else if (movingIdx >= 0) { const tStr = clean(movingIdx); const parts = tStr.split(":").map(Number); if (parts.length === 3) movingS = parts[0]*3600+parts[1]*60+parts[2]; else if (parts.length === 2) movingS = parts[0]*60+parts[1]; else movingS = parseFloat(tStr)||0; pace = movingS > 0 && distKm > 0 ? (movingS/60)/distKm : 0; }
        if (pace > 0 && (pace < 2 || pace > 15)) continue;
        parsed.push({ id:String(i), date:dt.toISOString().slice(0,10), name:clean(nameIdx)||"Run", dist_km:Math.round(distKm*100)/100, moving_time_s:Math.round(movingS), pace:Math.round(pace*1000)/1000, elev:Math.round((parseFloat(clean(elevIdx))||0)*10)/10, avg_hr:parseFloat(clean(hrIdx))||0, calories:parseFloat(clean(calIdx).replace(/,/g,""))||0, year:dt.getFullYear(), week:calcWeek(dt), dow:(dt.getDay()+6)%7, month:dt.toISOString().slice(0,7) });
      }
      if (parsed.length === 0) { setCsvError("No se encontraron actividades válidas."); return null; }
      setCsvError(""); return parsed.sort((a,b) => b.date.localeCompare(a.date));
    } catch { setCsvError("Error al procesar el archivo."); return null; }
  };

  useEffect(() => {
    if (csvData && csvData.length) { setDateFrom(csvData[csvData.length-1].date); setDateTo(csvData[0].date); }
    else if (showDemo) { setDateFrom(EARLIEST); setDateTo(TODAY); }
  }, [csvData, showDemo]);

  const activeData = csvData || RAW_DATA;
  const dynamicEarliest = activeData && activeData.length ? activeData[activeData.length-1].date : EARLIEST;

  const filtered = useMemo(() => activeData.filter(a => a.date >= dateFrom && a.date <= dateTo), [dateFrom, dateTo, activeData]);

  const kpis = useMemo(() => {
    const totalKm = filtered.reduce((s,a) => s+a.dist_km, 0);
    const validPaces = filtered.filter(a => a.pace > 2 && a.pace < 12);
    const avgPace = validPaces.length ? validPaces.reduce((s,a) => s+a.pace,0)/validPaces.length : 0;
    return { totalKm, count:filtered.length, avgPace };
  }, [filtered]);

  const weeklyData = useMemo(() => {
    const map = {};
    filtered.forEach(a => { if (!map[a.week]) map[a.week] = { week:a.week, km:0 }; map[a.week].km += a.dist_km; });
    const weeks = Object.values(map).sort((a,b) => a.week.localeCompare(b.week));
    const display = weeks.length > 26 ? weeks.slice(-26) : weeks;
    return display.map(w => {
      const [year, weekNum] = w.week.split("-W");
      const jan4 = new Date(parseInt(year), 0, 4);
      const sow = new Date(jan4); sow.setDate(jan4.getDate() - ((jan4.getDay()+6)%7));
      const ws = new Date(sow); ws.setDate(sow.getDate()+(parseInt(weekNum)-1)*7);
      const we = new Date(ws); we.setDate(ws.getDate()+6);
      const fmt = (d) => `${d.getDate()}/${d.getMonth()+1}`;
      return { ...w, label:`${fmt(ws)}–${fmt(we)}`, km:imperial ? parseFloat((w.km*0.621371).toFixed(1)) : parseFloat(w.km.toFixed(1)) };
    });
  }, [filtered, imperial]);

  const inputStyle = { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:TEXT_PRIMARY, borderRadius:8, padding:"6px 12px", fontSize:13, cursor:"pointer" };
  const cardStyle = { background:"rgba(255,255,255,0.04)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"20px 24px" };

  const fetchInsight = useCallback(async () => {
    if (!filtered.length) return;
    const key = `${dateFrom}|${dateTo}`;
    if (insightKey.current === key && insight) return;
    insightKey.current = key; setInsightLoading(true); setInsightError(false); setInsight("");
    const validPaces = filtered.filter(a => a.pace > 3 && a.pace < 9);
    const avgPace = validPaces.length ? validPaces.reduce((s,a) => s+a.pace,0)/validPaces.length : 0;
    const totalKm = filtered.reduce((s,a) => s+a.dist_km,0);
    const fmtP = (p) => { const m=Math.floor(p); const s=Math.round((p-m)*60); return `${m}:${s.toString().padStart(2,"0")}`; };
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:200, stream:true, messages:[{ role:"user", content:`Sos coach de running. 2 oraciones en español: destacá lo más llamativo y dá una sugerencia concreta. Sin introducciones.\n\nPeríodo: ${dateFrom} al ${dateTo}\nActividades: ${filtered.length}, Km: ${totalKm.toFixed(1)}, Ritmo: ${fmtP(avgPace)}/km` }] }) });
      const reader = res.body.getReader(); const decoder = new TextDecoder(); let buffer = "";
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        buffer += decoder.decode(value, { stream:true });
        const lines = buffer.split("\n"); buffer = lines.pop();
        for (const line of lines) { if (!line.startsWith("data: ")) continue; const json = line.slice(6).trim(); if (json === "[DONE]") continue; try { const ev = JSON.parse(json); if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") setInsight(prev => prev + ev.delta.text); } catch {} }
      }
    } catch { setInsightError(true); } finally { setInsightLoading(false); }
  }, [filtered, dateFrom, dateTo, insight]);

  useEffect(() => { const t = setTimeout(() => fetchInsight(), 600); return () => clearTimeout(t); }, [dateFrom, dateTo]);

  const fetchVo2Insight = useCallback(async () => {
    if (vo2Loaded.current) return; vo2Loaded.current = true; setVo2Loading(true); setVo2Insight("");
    const fcMax = config.fcMax || 181;
    const z4Lo = Math.round(fcMax * 0.80);
    const z4Hi = Math.round(fcMax * 0.90);
    const z4Acts = filtered.filter(a => a.avg_hr >= z4Lo && a.avg_hr < z4Hi && a.pace > 2 && a.pace < 12);
    const thresholdPace = z4Acts.length > 0 ? z4Acts.reduce((s,a) => s+a.pace,0)/z4Acts.length : kpis.avgPace * 0.93;
    const thresholdFcLow = Math.round(fcMax * 0.85);
    const thresholdFcHigh = Math.round(fcMax * 0.90);
    const fmtP2 = (p) => { const m=Math.floor(p); const s=Math.round((p-m)*60); return `${m}:${s.toString().padStart(2,"0")}`; };
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:200, stream:true, messages:[{ role:"user", content:`Sos coach de running. 2 oraciones en español: explicá qué significa tener un ritmo umbral de ${fmtP2(thresholdPace)}/km (FC umbral ${thresholdFcLow}-${thresholdFcHigh} bpm, FC máx ${fcMax} bpm) y dá una implicancia práctica de entrenamiento. Sin introducciones, directo.` }] }) });
      const reader = res.body.getReader(); const decoder = new TextDecoder(); let buffer = "";
      while (true) { const { done, value } = await reader.read(); if (done) break; buffer += decoder.decode(value,{stream:true}); const lines = buffer.split("\n"); buffer = lines.pop(); for (const line of lines) { if (!line.startsWith("data: ")) continue; const json = line.slice(6).trim(); if (json === "[DONE]") continue; try { const ev = JSON.parse(json); if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") setVo2Insight(prev => prev + ev.delta.text); } catch {} } }
    } catch { setVo2Insight("No se pudo cargar la interpretación."); } finally { setVo2Loading(false); }
  }, [vo2DisplayData]);

  useEffect(() => { { vo2Loaded.current = false; fetchVo2Insight(); } }, [showDemo, filtered]);

  const fetchVo2Actions = useCallback(async () => {
    if (vo2ActLoaded.current) return; vo2ActLoaded.current = true; setVo2ActLoading(true);
    const fcMax2 = config.fcMax || 181;
    const z4Lo2 = Math.round(fcMax2 * 0.80);
    const z4Hi2 = Math.round(fcMax2 * 0.90);
    const z4Acts2 = filtered.filter(a => a.avg_hr >= z4Lo2 && a.avg_hr < z4Hi2 && a.pace > 2 && a.pace < 12);
    const tPace = z4Acts2.length > 0 ? z4Acts2.reduce((s,a) => s+a.pace,0)/z4Acts2.length : (kpis.avgPace||5.3) * 0.93;
    const fmtP3 = (p) => { const m=Math.floor(p); const s=Math.round((p-m)*60); return `${m}:${s.toString().padStart(2,"0")}`; };
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:600, messages:[{ role:"user", content:`Coach de running. Array JSON con 4 objetos {"titulo":"3-5 palabras","detalle":"1 oración con números concretos"}. Enfocate en entrenamientos específicos para mejorar el umbral de lactato de un corredor con ritmo umbral ${fmtP3(tPace)}/km y FC máx ${fcMax2} bpm. Solo JSON, sin markdown, sin texto extra.` }] }) });
      const data = await res.json(); const raw = data.content?.find(b => b.type === "text")?.text || "[]"; const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim()); setVo2Actions(Array.isArray(parsed) ? parsed : []);
    } catch { setVo2Actions([]); } finally { setVo2ActLoading(false); }
  }, [vo2DisplayData]);

  useEffect(() => { { vo2ActLoaded.current = false; fetchVo2Actions(); } }, [showDemo, filtered]);

  const fetchRecs = useCallback(async () => {
    if (!filtered.length) return; const key = `${dateFrom}|${dateTo}`; if (recsKey.current === key && recs.length) return;
    recsKey.current = key; setRecsLoading(true); setRecsError(false); setRecs([]);
    const validPaces = filtered.filter(a => a.pace > 3 && a.pace < 9); const avgPace = validPaces.length ? validPaces.reduce((s,a) => s+a.pace,0)/validPaces.length : 0;
    const totalKm = filtered.reduce((s,a) => s+a.dist_km,0); const weeks = {}; filtered.forEach(a => { weeks[a.week]=(weeks[a.week]||0)+a.dist_km; }); const weekVals = Object.values(weeks); const avgWeekKm = weekVals.length ? weekVals.reduce((s,v)=>s+v,0)/weekVals.length : 0;
    const fmtP = (p) => { const m=Math.floor(p); const s=Math.round((p-m)*60); return `${m}:${s.toString().padStart(2,"0")}`; };
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:500, messages:[{ role:"user", content:`Coach de running. Array JSON con 4 objetos {"titulo":"3-5 palabras","detalle":"1 oración con números"}. ${filtered.length} actividades, ${totalKm.toFixed(1)} km, ritmo ${fmtP(avgPace)}/km, promedio semanal ${avgWeekKm.toFixed(1)} km. Solo JSON.` }] }) });
      const data = await res.json(); const raw = data.content?.find(b => b.type === "text")?.text || "[]"; const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim()); setRecs(Array.isArray(parsed) ? parsed : []);
    } catch { setRecsError(true); } finally { setRecsLoading(false); }
  }, [filtered, dateFrom, dateTo, recs]);

  useEffect(() => { const t = setTimeout(() => fetchRecs(), 800); return () => clearTimeout(t); }, [dateFrom, dateTo]);
  const sendMessage = useCallback(async (msg) => {
    if (!msg.trim() || chatLoading) return;
    const userMsg = { role:"user", content:msg.trim() };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    // Build context from user's data
    const validPaces = filtered.filter(a => a.pace > 2 && a.pace < 12);
    const avgPace = validPaces.length ? validPaces.reduce((s,a) => s+a.pace,0)/validPaces.length : 0;
    const totalKm = filtered.reduce((s,a) => s+a.dist_km,0);
    const weeks = {}; filtered.forEach(a => { weeks[a.week]=(weeks[a.week]||0)+a.dist_km; });
    const weekVals = Object.values(weeks);
    const avgWeekKm = weekVals.length ? weekVals.reduce((s,v)=>s+v,0)/weekVals.length : 0;
    const maxWeekKm = weekVals.length ? Math.max(...weekVals) : 0;
    const fcMax = config.fcMax || 181;
    const z4Lo = Math.round(fcMax * 0.80); const z4Hi = Math.round(fcMax * 0.90);
    const z4Acts = filtered.filter(a => a.avg_hr >= z4Lo && a.avg_hr < z4Hi && a.pace > 2 && a.pace < 12);
    const thresholdPace = z4Acts.length > 0 ? z4Acts.reduce((s,a) => s+a.pace,0)/z4Acts.length : avgPace * 0.93;
    const fmtP = (p) => { const m=Math.floor(p); const s=Math.round((p-m)*60); return `${m}:${s.toString().padStart(2,"0")}`; };
    const longestRun = [...filtered].sort((a,b) => b.dist_km-a.dist_km)[0];
    const raceName = config.raceName; const raceDate = config.raceDate; const raceDist = config.raceDist;
    const daysToRace = Math.round((new Date(raceDate+"T00:00:00") - new Date()) / 86400000);

    const systemPrompt = `Sos Eliud, un coach de running experto con el conocimiento de Eliud Kipchoge. Respondés en español, de forma directa, empática y motivadora. Máximo 3 párrafos por respuesta. Nunca repetís información que el usuario ya tiene en su dashboard.

Datos del corredor (período ${dateFrom} al ${dateTo}):
- Total actividades: ${filtered.length} | Total km: ${totalKm.toFixed(1)} km
- Ritmo promedio: ${fmtP(avgPace)}/km
- Promedio semanal: ${avgWeekKm.toFixed(1)} km | Semana pico: ${maxWeekKm.toFixed(1)} km
- FC máxima: ${fcMax} bpm | Zona umbral FC: ${Math.round(fcMax*0.85)}-${Math.round(fcMax*0.90)} bpm
- Ritmo umbral estimado: ${fmtP(thresholdPace)}/km (basado en ${z4Acts.length} actividades en Z4)
- Salida más larga: ${longestRun ? longestRun.dist_km.toFixed(1)+"km el "+longestRun.date : "—"}
- Próxima carrera: ${raceName} (${raceDist}km) el ${raceDate} — faltan ${daysToRace} días
- Nombre del corredor: ${config.userName || "no especificado"}
- Sexo: ${config.sex} | Edad: ${config.age || "no especificado"}`;

    const history = chatMessages.map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:400, stream:true,
          system: systemPrompt,
          messages: [...history, { role:"user", content:msg.trim() }],
        }),
      });
      let assistantText = "";
      setChatMessages(prev => [...prev, { role:"assistant", content:"" }]);
      const reader = res.body.getReader(); const decoder = new TextDecoder(); let buffer = "";
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        buffer += decoder.decode(value,{stream:true});
        const lines = buffer.split("\n"); buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue; const json = line.slice(6).trim(); if (json === "[DONE]") continue;
          try { const ev = JSON.parse(json); if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") {
            assistantText += ev.delta.text;
            setChatMessages(prev => { const msgs = [...prev]; msgs[msgs.length-1] = { role:"assistant", content:assistantText }; return msgs; });
          }} catch {}
        }
      }
    } catch { setChatMessages(prev => [...prev, { role:"assistant", content:"Lo siento, no pude conectarme. Intentá de nuevo." }]); }
    finally { setChatLoading(false); }
  }, [filtered, config, dateFrom, dateTo, chatMessages, chatLoading]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chatMessages]);



  useEffect(() => {
    const tick = () => { const rd = new Date(config.raceDate+"T00:00:00"); const diff = rd - new Date(); if (diff <= 0) { setCountdown({days:0,hours:0,mins:0,secs:0}); return; } setCountdown({days:Math.floor(diff/86400000),hours:Math.floor((diff%86400000)/3600000),mins:Math.floor((diff%3600000)/60000),secs:Math.floor((diff%60000)/1000)}); };
    tick(); const id = setInterval(tick,1000); return () => clearInterval(id);
  }, [config.raceDate]);

  const MapBg = () => (
    <>
      <svg style={{ position:"fixed", inset:0, width:"100%", height:"100%", opacity:0.12, zIndex:0, pointerEvents:"none" }} viewBox="0 0 680 620" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <rect width="680" height="620" fill="#0d0d0d"/>
        <g stroke="#4a4a4a" strokeWidth="1.2" fill="none">
          <path d="M0,180 Q80,160 160,200 T340,180 T520,200 T680,170"/><path d="M0,280 Q100,260 200,300 T400,270 T600,290 T680,270"/><path d="M0,390 Q120,370 240,400 T480,380 T680,400"/>
          <path d="M100,0 Q120,80 100,160 T110,320 T95,480 T110,620"/><path d="M220,0 Q240,100 220,200 T230,360 T215,500 T225,620"/><path d="M380,0 Q400,90 380,180 T390,340 T375,480 T385,620"/><path d="M530,0 Q550,110 530,220 T540,380 T525,520 T535,620"/>
          <path d="M0,0 Q170,140 340,310 T680,620" stroke="#2e2e2e"/><path d="M680,0 Q510,140 340,310 T0,620" stroke="#2e2e2e"/>
          <circle cx="340" cy="310" r="40" stroke="#333" strokeWidth="0.8"/>
        </g>
        <g stroke="#666" strokeWidth="2.5" fill="none"><path d="M0,230 Q170,210 340,250 T680,230"/><path d="M170,0 Q190,200 170,400 T180,620"/><path d="M450,0 Q470,180 450,360 T460,620"/></g>
        <path d="M80,520 Q120,480 160,440 T240,370 T300,310 T360,250 T420,200 T480,160 T540,130" stroke="#C6F135" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9"/>
        <circle cx="80" cy="520" r="5" fill="#C6F135" opacity="0.9"/><circle cx="540" cy="130" r="5" fill="#C6F135" opacity="0.9"/>
      </svg>
      <div style={{ position:"fixed", inset:0, background:"linear-gradient(to bottom, rgba(13,13,13,0.4) 0%, rgba(13,13,13,0.6) 50%, rgba(13,13,13,0.85) 100%)", zIndex:0, pointerEvents:"none" }} />
      <div style={{ position:"fixed", top:"5%", left:0, width:300, height:300, borderRadius:"50%", background:"rgba(198,241,53,0.04)", filter:"blur(100px)", zIndex:0, pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:"5%", right:0, width:250, height:250, borderRadius:"50%", background:"rgba(191,95,255,0.04)", filter:"blur(90px)", zIndex:0, pointerEvents:"none" }} />
    </>
  );

  return (
    <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'); * { font-family: 'Inter', system-ui, sans-serif !important; }`}</style>
    <div style={{ background:DARK_BG, minHeight:"100vh", color:TEXT_PRIMARY }}>

      {/* WELCOME SCREEN */}
      {!csvData && !showDemo && (
        <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", position:"relative", overflow:"hidden", background:"#0a0a0a" }}>
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.35 }} viewBox="0 0 680 620" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <rect width="680" height="620" fill="#0d0d0d"/>
            <g stroke="#4a4a4a" strokeWidth="1.2" fill="none"><path d="M0,180 Q80,160 160,200 T340,180 T520,200 T680,170"/><path d="M0,280 Q100,260 200,300 T400,270 T600,290 T680,270"/><path d="M0,390 Q120,370 240,400 T480,380 T680,400"/><path d="M100,0 Q120,80 100,160 T110,320 T95,480 T110,620"/><path d="M220,0 Q240,100 220,200 T230,360 T215,500 T225,620"/><path d="M380,0 Q400,90 380,180 T390,340 T375,480 T385,620"/><path d="M530,0 Q550,110 530,220 T540,380 T525,520 T535,620"/><path d="M0,0 Q170,140 340,310 T680,620" stroke="#2e2e2e"/><path d="M680,0 Q510,140 340,310 T0,620" stroke="#2e2e2e"/><circle cx="340" cy="310" r="40" stroke="#333" strokeWidth="0.8"/></g>
            <g stroke="#666" strokeWidth="2.5" fill="none"><path d="M0,230 Q170,210 340,250 T680,230"/><path d="M170,0 Q190,200 170,400 T180,620"/><path d="M450,0 Q470,180 450,360 T460,620"/></g>
            <path d="M80,520 Q120,480 160,440 T240,370 T300,310 T360,250 T420,200 T480,160 T540,130" stroke="#C6F135" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9"/>
            <circle cx="80" cy="520" r="5" fill="#C6F135" opacity="0.9"/><circle cx="540" cy="130" r="5" fill="#C6F135" opacity="0.9"/>
          </svg>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(13,13,13,0.15) 0%, rgba(13,13,13,0.35) 50%, rgba(13,13,13,0.75) 100%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"10%", left:"5%", width:300, height:300, borderRadius:"50%", background:"rgba(198,241,53,0.06)", filter:"blur(90px)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"10%", right:"5%", width:250, height:250, borderRadius:"50%", background:"rgba(191,95,255,0.06)", filter:"blur(80px)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", width:"100%", maxWidth:500 }}>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:12, marginBottom:16 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:"rgba(198,241,53,0.12)", border:"1px solid rgba(198,241,53,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}><Activity size={24} color={LIME} /></div>
                <span style={{ fontSize:42, fontWeight:900, letterSpacing:-2, color:TEXT_PRIMARY }}>Runalyze</span>
              </div>
              <p style={{ fontSize:16, color:LIME, maxWidth:340, lineHeight:1.7, margin:"0 auto" }}>¡Bienvenido a tu dashboard personal de running!<br/><span style={{ color:TEXT_MUTED }}>Cargá tus datos para comenzar.</span></p>
            </div>

            <div style={{ width:"100%", maxWidth:460, background:"rgba(255,255,255,0.03)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"20px", marginBottom:14 }}>
              {[{ label:"Tu nombre", key:"userName", type:"text", placeholder:"" }, { label:"Próxima carrera", key:"raceName", type:"text", placeholder:"ej: Maratón de Buenos Aires" }].map(f => (
                <div key={f.key} style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:TEXT_MUTED, textTransform:"uppercase", letterSpacing:1, display:"block", marginBottom:6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={homeForm[f.key]} onChange={e => setHomeForm(hf => ({ ...hf, [f.key]: e.target.value }))} style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:TEXT_PRIMARY, borderRadius:10, padding:"10px 14px", fontSize:14, outline:"none", colorScheme:"dark" }} />
                </div>
              ))}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11, fontWeight:700, color:TEXT_MUTED, textTransform:"uppercase", letterSpacing:1, display:"block", marginBottom:6 }}>Fecha y distancia</label>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <input type="date" value={homeForm.raceDate} onChange={e => setHomeForm(f => ({ ...f, raceDate:e.target.value }))} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:TEXT_PRIMARY, borderRadius:10, padding:"10px 14px", fontSize:13, outline:"none", colorScheme:"dark", width:"100%" }} />
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:4 }}>
                    {RACE_DISTANCES.map(d => { const active = d.value === 0 ? homeForm.raceDist === 0 : Math.abs(homeForm.raceDist - d.value) < 0.1; return (<button key={d.value} onClick={() => setHomeForm(f => ({ ...f, raceDist:d.value }))} style={{ background:active ? LIME:"rgba(255,255,255,0.05)", border:`1px solid ${active ? LIME:"rgba(255,255,255,0.08)"}`, color:active ? "#000":TEXT_MUTED, borderRadius:8, padding:"10px 0", fontSize:11, fontWeight:active ? 700:400, cursor:"pointer" }}>{d.label.split(" ")[0]}</button>); })}
                    {homeForm.raceDist === 0 && <input type="number" placeholder="km" autoFocus onChange={e => setHomeForm(f => ({ ...f, raceDist:parseFloat(e.target.value)||0 }))} style={{ gridColumn:"1/-1", background:"rgba(255,255,255,0.06)", border:`1px solid ${LIME}`, color:TEXT_PRIMARY, borderRadius:8, padding:"8px 12px", fontSize:13, outline:"none", colorScheme:"dark", marginTop:4 }} />}
                  </div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                {[{ label:"FC Máxima (bpm)", key:"fcMax", placeholder:"ej: 181" }, { label:"Edad", key:"age", placeholder:"ej: 34" }].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize:11, fontWeight:700, color:TEXT_MUTED, textTransform:"uppercase", letterSpacing:1, display:"block", marginBottom:6 }}>{f.label}</label>
                    <input type="number" placeholder={f.placeholder} value={homeForm[f.key]} onChange={e => setHomeForm(hf => ({ ...hf, [f.key]:parseFloat(e.target.value)||0 }))} style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:TEXT_PRIMARY, borderRadius:10, padding:"10px 14px", fontSize:14, outline:"none", colorScheme:"dark" }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:TEXT_MUTED, textTransform:"uppercase", letterSpacing:1, display:"block", marginBottom:6 }}>Sexo biológico</label>
                <div style={{ display:"flex", gap:8 }}>
                  {[{label:"Femenino",val:"F"},{label:"Masculino",val:"M"}].map(s => (<button key={s.val} onClick={() => setHomeForm(f => ({ ...f, sex:s.val }))} style={{ flex:1, background:homeForm.sex===s.val ? LIME:"rgba(255,255,255,0.05)", border:`1px solid ${homeForm.sex===s.val ? LIME:"rgba(255,255,255,0.08)"}`, color:homeForm.sex===s.val ? "#000":TEXT_MUTED, borderRadius:10, padding:"10px 0", fontSize:13, fontWeight:homeForm.sex===s.val ? 700:400, cursor:"pointer" }}>{s.label}</button>))}
                </div>
              </div>
            </div>


            <input id="csv-input" type="file" accept=".csv" style={{ display:"none" }} onChange={e => { setConfig(c => ({ ...c, ...homeForm })); handleFile(e.target.files[0]); }} />
            <div style={{ width:"100%", maxWidth:460, marginBottom:16 }}>
              <button onClick={() => document.getElementById("csv-input").click()} style={{ background:LIME, border:"none", color:"#000", borderRadius:14, padding:"14px 0", fontSize:15, fontWeight:800, cursor:"pointer", width:"100%" }}>Cargar mi CSV</button>
              <p style={{ fontSize:12, color:TEXT_MUTED, textAlign:"center", marginTop:8 }}>Compatible con Strava y Garmin</p>
            </div>
            {csvError && <p style={{ fontSize:12, color:"#ff5555", marginBottom:12, background:"rgba(255,85,85,0.1)", padding:"8px 14px", borderRadius:8, width:"100%", maxWidth:460, textAlign:"center" }}>{csvError}</p>}

            <div style={{ width:"100%", maxWidth:460, background:"rgba(255,255,255,0.03)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"16px 20px", marginBottom:20 }}>
              <p style={{ fontSize:11, fontWeight:700, color:TEXT_MUTED, marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>¿Cómo exportar tu CSV?</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[{ name:"Strava", steps:"Configuración → Mis datos → Exportar → activities.csv", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 15L14 7L18 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 15h4" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> }, { name:"Garmin Connect", steps:"Actividades → Exportar → CSV", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2"/><path d="M12 8V12L15 14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> }].map(p => (
                  <div key={p.name} style={{ display:"flex", gap:12, alignItems:"center", background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"10px 12px" }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{p.icon}</div>
                    <div><p style={{ fontSize:13, fontWeight:700, color:TEXT_PRIMARY, margin:0 }}>{p.name}</p><p style={{ fontSize:12, color:TEXT_MUTED, margin:"2px 0 0" }}>{p.steps}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => { setConfig(c => ({ ...c, ...homeForm })); setShowDemo(true); }} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.1)", color:TEXT_MUTED, borderRadius:12, padding:"11px 32px", fontSize:13, cursor:"pointer" }}>Ver demo con datos de ejemplo</button>
          </div>
        </div>
      )}

      {/* MAIN DASHBOARD */}
      {(csvData || showDemo) && (
        <div style={{ padding:"24px 20px", position:"relative", minHeight:"100vh" }}>
          <MapBg />
          <div style={{ position:"relative", zIndex:1 }}>

            {config.userName && (
              <div style={{ marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                <h1 style={{ fontSize:30, fontWeight:900, letterSpacing:-0.5, color:TEXT_PRIMARY, margin:0, display:"flex", alignItems:"center", gap:8 }}>
                  ¡Hola, <span style={{ color:LIME }}>{config.userName}</span>!
                  <span style={{ fontSize:13, color:TEXT_MUTED, fontWeight:400, marginLeft:4 }}>· {filtered.length} actividades</span>
                </h1>
              </div>
            )}

            {showConfig && (
              <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowConfig(false)}>
                <div style={{ background:"rgba(20,20,20,0.95)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"28px", width:380, maxWidth:"90vw" }} onClick={e => e.stopPropagation()}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
                    <span style={{ fontSize:15, fontWeight:700, color:TEXT_PRIMARY }}>Editá tu próxima carrera</span>
                    <button onClick={() => setShowConfig(false)} style={{ background:"transparent", border:"none", color:TEXT_MUTED, cursor:"pointer", fontSize:20 }}>✕</button>
                  </div>
                  {[{ label:"Nombre de la carrera", key:"raceName", type:"text", placeholder:"ej: Maratón de Buenos Aires" }, { label:"Fecha", key:"raceDate", type:"date" }].map(f => (
                    <div key={f.key} style={{ marginBottom:14 }}>
                      <label style={{ fontSize:11, fontWeight:700, color:TEXT_MUTED, textTransform:"uppercase", letterSpacing:1, display:"block", marginBottom:6 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} value={configDraft ? configDraft[f.key] : config[f.key]} onChange={e => setConfigDraft(prev => ({ ...(prev||config), [f.key]:e.target.value }))} style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:TEXT_PRIMARY, borderRadius:10, padding:"10px 14px", fontSize:13, colorScheme:"dark", outline:"none" }} />
                    </div>
                  ))}
                  <div style={{ marginBottom:22 }}>
                    <label style={{ fontSize:11, fontWeight:700, color:TEXT_MUTED, textTransform:"uppercase", letterSpacing:1, display:"block", marginBottom:8 }}>Distancia</label>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
                      {RACE_DISTANCES.map(d => { const cur = configDraft ? configDraft.raceDist : config.raceDist; const active = Math.abs(cur-d.value) < 0.1; return (<button key={d.value} onClick={() => setConfigDraft(prev => ({ ...(prev||config), raceDist:d.value }))} style={{ background:active ? LIME:"rgba(255,255,255,0.05)", border:`1px solid ${active ? LIME:"rgba(255,255,255,0.08)"}`, color:active ? "#000":TEXT_MUTED, borderRadius:8, padding:"9px 0", fontSize:12, cursor:"pointer", fontWeight:active ? 700:400 }}>{d.label.split(" ")[0]}</button>); })}
                    </div>
                  </div>
                  <button onClick={() => { if (configDraft) { setConfig(configDraft); setConfigDraft(null); } setShowConfig(false); }} style={{ width:"100%", background:LIME, border:"none", color:"#000", borderRadius:10, padding:"12px 0", fontSize:14, fontWeight:700, cursor:"pointer" }}>Guardar cambios</button>
                </div>
              </div>
            )}

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <Activity size={22} color={ORANGE} />
                <span style={{ fontSize:22, fontWeight:900, letterSpacing:-0.5 }}>Runalyze</span>
                <span style={{ fontSize:12, color:TEXT_MUTED, marginLeft:4 }}>· {filtered.length}/{activeData.length} actividades</span>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => { setCsvData(null); setShowDemo(false); setHomeForm({userName:"",raceName:"Maratón de Buenos Aires",raceDate:"2026-09-27",raceDist:42.195,fcMax:181,age:"",sex:"F"}); }} style={{ ...inputStyle, display:"flex", alignItems:"center", gap:6 }}><RefreshCw size={13} /> Reset</button>
                <button onClick={() => setImperial(!imperial)} style={{ ...inputStyle, background:imperial ? LIME:"rgba(255,255,255,0.06)", color:imperial ? "#000":TEXT_MUTED, border:`1px solid ${imperial ? LIME:"rgba(255,255,255,0.1)"}` }}>{imperial ? "Imperial (mi)" : "Métrico (km)"}</button>
              </div>
            </div>

            <div style={{ background:CARD_BG, border:`1px solid ${BORDER}`, borderRadius:12, padding:"14px 18px", marginBottom:20, display:"flex", flexWrap:"wrap", alignItems:"center", gap:12 }}>
              <Filter size={14} color={TEXT_MUTED} style={{ flexShrink:0 }} />
              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                <input type="date" value={dateFrom} min={dynamicEarliest} max={dateTo} onChange={e => { setDateFrom(e.target.value); setActivePreset(null); }} style={{ ...inputStyle, colorScheme:"dark" }} />
                <span style={{ color:TEXT_MUTED, fontSize:13 }}>→</span>
                <input type="date" value={dateTo} min={dateFrom} max={TODAY} onChange={e => { setDateTo(e.target.value); setActivePreset(null); }} style={{ ...inputStyle, colorScheme:"dark" }} />
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {PRESETS.map(p => (<button key={p.label} onClick={() => applyPreset(p.days)} style={{ ...inputStyle, padding:"5px 11px", fontSize:12, background:(activePreset===p.days||(p.days===null&&!activePreset)) ? ORANGE:CARD_BG, color:(activePreset===p.days||(p.days===null&&!activePreset)) ? "#000":TEXT_MUTED, border:`1px solid ${(activePreset===p.days||(p.days===null&&!activePreset)) ? ORANGE:BORDER}` }}>{p.label}</button>))}
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:12, marginBottom:24 }}>
              {[{ icon:<TrendingUp size={18} color={ORANGE}/>, label:"Total recorrido", value:fmtDist(kpis.totalKm, imperial) }, { icon:<Activity size={18} color={ORANGE}/>, label:"Actividades", value:kpis.count }, { icon:<Zap size={18} color={ORANGE}/>, label:"Ritmo promedio", value:`${fmtPace(kpis.avgPace)}/km` }].map((k,i) => (
                <div key={i} style={{ ...cardStyle, display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>{k.icon}<span style={{ fontSize:12, color:TEXT_MUTED, textTransform:"uppercase", letterSpacing:0.5 }}>{k.label}</span></div>
                  <span style={{ fontSize:32, fontWeight:900, color:TEXT_PRIMARY, lineHeight:1, letterSpacing:-1 }}>{k.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom:16, background:"rgba(191,95,255,0.15)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:"1px solid rgba(191,95,255,0.4)", borderRadius:16, padding:"24px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, right:0, width:200, height:200, background:LIME, opacity:.03, borderRadius:"50%", transform:"translate(60px,-60px)" }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}><Timer size={18} color={VIOLET}/><span style={{ fontSize:11, color:TEXT_MUTED, textTransform:"uppercase", letterSpacing:1 }}>Próxima carrera</span></div>
                  <div style={{ fontSize:22, fontWeight:800, color:TEXT_PRIMARY, lineHeight:1.1 }}>{config.raceName}</div>
                  <div style={{ fontSize:13, color:TEXT_MUTED, marginTop:4 }}>{RACE_DISTANCES.find(d => Math.abs(d.value-config.raceDist) < 0.1)?.label.split(" ")[0] || `${config.raceDist}km`} · {new Date(config.raceDate+"T12:00:00").toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"})}</div>
                </div>
                <button onClick={() => { setConfigDraft(null); setShowConfig(true); }} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:TEXT_MUTED, borderRadius:8, padding:"6px 12px", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:6, flexShrink:0 }}><RefreshCw size={12}/> Editar</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
                {[{val:countdown.days,label:"días",big:true},{val:countdown.hours,label:"horas",big:false},{val:countdown.mins,label:"minutos",big:false},{val:countdown.secs,label:"segundos",big:false}].map((u,i) => (
                  <div key={i} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"16px 0", textAlign:"center" }}>
                    <div style={{ fontSize:36, fontWeight:900, color:u.big ? VIOLET:TEXT_PRIMARY, lineHeight:1, fontVariantNumeric:"tabular-nums", letterSpacing:-1 }}>{String(u.val).padStart(2,"0")}</div>
                    <div style={{ fontSize:10, color:TEXT_MUTED, marginTop:6, textTransform:"uppercase", letterSpacing:1 }}>{u.label}</div>
                  </div>
                ))}
              </div>
              {(() => { const rd = new Date(config.raceDate+"T00:00:00"); const pct = Math.max(0,Math.min(100,((new Date()-new Date(TODAY))/(rd-new Date(TODAY)))*100)); const daysLeft = Math.round((rd-new Date())/86400000); return (<div><div style={{ background:"rgba(255,255,255,0.08)", borderRadius:8, height:8, overflow:"hidden" }}><div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg, ${VIOLET}88, ${VIOLET})`, borderRadius:8 }} /></div><div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}><span style={{ fontSize:11, color:TEXT_MUTED }}>Hoy · {new Date().toLocaleDateString("es-AR",{day:"numeric",month:"short"})}</span><span style={{ fontSize:11, color:daysLeft < 14 ? LIME:TEXT_MUTED }}>{daysLeft > 0 ? `${daysLeft} días para correr` : "¡Es hoy!"}</span></div></div>); })()}
            </div>

            <div style={{ ...cardStyle, marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}><TrendingUp size={16} color={ORANGE}/><span style={{ fontSize:14, fontWeight:600 }}>Volumen semanal</span></div>
              <div style={{ width:"100%", height:220 }}>
                <ResponsiveContainer>
                  <BarChart data={weeklyData} barSize={22}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                    <XAxis dataKey="label" tick={{ fill:TEXT_MUTED, fontSize:10, angle:-35, textAnchor:"end" }} axisLine={false} tickLine={false} interval={0} height={48}/>
                    <YAxis tick={{ fill:TEXT_MUTED, fontSize:11 }} axisLine={false} tickLine={false} unit=" km" width={48}/>
                    <Tooltip contentStyle={{ background:"rgba(15,15,15,0.95)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }} labelStyle={{ color:TEXT_PRIMARY }} formatter={(v) => [`${v} km`,"Volumen"]} cursor={{ fill:"#ffffff08" }}/>
                    <Bar dataKey="km" fill={LIME} radius={[6,6,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ ...cardStyle, marginBottom:16, borderLeft:`3px solid ${LIME}` }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}><Brain size={16} color={ORANGE}/><span style={{ fontSize:14, fontWeight:600 }}>Análisis del período</span><span style={{ fontSize:11, color:TEXT_MUTED }}>· IA</span></div>
                <button onClick={() => { insightKey.current = ""; fetchInsight(); }} style={{ background:"transparent", border:"none", cursor:"pointer", color:TEXT_MUTED, display:"flex", alignItems:"center", gap:4, fontSize:12 }}><RefreshCw size={13} style={{ animation:insightLoading ? "spin 1s linear infinite":"none" }}/>{insightLoading ? "Analizando...":"Regenerar"}</button>
              </div>
              {insightError && <p style={{ fontSize:13, color:"#e84800", margin:0 }}>No se pudo conectar.</p>}
              {!insightError && !insight && !insightLoading && <p style={{ fontSize:13, color:TEXT_MUTED, margin:0 }}>Seleccioná un rango para generar el análisis.</p>}
              {(insight || insightLoading) && <p style={{ fontSize:14, color:TEXT_PRIMARY, lineHeight:1.75, margin:0 }}>{insight}{insightLoading && <span style={{ display:"inline-block", width:8, height:14, background:ORANGE, marginLeft:3, verticalAlign:"middle", animation:"blink 0.8s step-end infinite" }}/>}</p>}
            </div>

            <div style={{ ...cardStyle, marginBottom:16, borderLeft:`3px solid ${VIOLET}` }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}><Zap size={16} color={VIOLET}/><span style={{ fontSize:14, fontWeight:600 }}>Recomendaciones para mejorar</span><span style={{ fontSize:11, color:TEXT_MUTED }}>· IA</span></div>
                <button onClick={() => { recsKey.current = ""; fetchRecs(); }} style={{ background:"transparent", border:"none", cursor:"pointer", color:TEXT_MUTED, display:"flex", alignItems:"center", gap:4, fontSize:12 }}><RefreshCw size={13} style={{ animation:recsLoading ? "spin 1s linear infinite":"none" }}/>{recsLoading ? "Generando...":"Regenerar"}</button>
              </div>
              {recsError && <p style={{ fontSize:13, color:"#e84800", margin:0 }}>No se pudo conectar.</p>}
              {!recsError && !recsLoading && recs.length === 0 && <p style={{ fontSize:13, color:TEXT_MUTED, margin:0 }}>Seleccioná un rango para generar recomendaciones.</p>}
              {recsLoading && [1,2,3,4].map(i => <div key={i} style={{ height:54, background:"rgba(255,255,255,0.05)", borderRadius:8, marginBottom:8, animation:"pulse 1.2s ease-in-out infinite" }}/>)}
              {!recsLoading && recs.length > 0 && <div style={{ display:"flex", flexDirection:"column", gap:10 }}>{recs.map((r,i) => (<div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"12px 14px" }}><span style={{ fontSize:13, fontWeight:700, color:VIOLET, minWidth:20, lineHeight:1.5 }}>{i+1}.</span><div><p style={{ margin:0, fontSize:13, fontWeight:600, color:TEXT_PRIMARY, lineHeight:1.4 }}>{r.titulo}</p><p style={{ margin:"3px 0 0", fontSize:12, color:TEXT_MUTED, lineHeight:1.55 }}>{r.detalle}</p></div></div>))}</div>}
            </div>

            {/* THRESHOLD BLOCK */}
            {(() => {
              // Method A: FC-based threshold (85-90% FC max)
              const fcMax = config.fcMax || 181;
              const thresholdFcLow = Math.round(fcMax * 0.85);
              const thresholdFcHigh = Math.round(fcMax * 0.90);

              // Method B: Pace-based threshold from zone 4 activities (80-90% FC max)
              const z4Lo = Math.round(fcMax * 0.80);
              const z4Hi = Math.round(fcMax * 0.90);
              const z4Activities = filtered.filter(a => a.avg_hr >= z4Lo && a.avg_hr < z4Hi && a.pace > 2 && a.pace < 12);
              const z4AvgPace = z4Activities.length > 0
                ? z4Activities.reduce((s,a) => s + a.pace, 0) / z4Activities.length
                : null;

              // Method C: Combined estimate
              // Threshold pace = avg pace of Z4 activities, or estimated from overall avg pace
              const overallAvgPace = kpis.avgPace > 2 && kpis.avgPace < 12 ? kpis.avgPace : null;
              const estimatedThresholdPace = z4AvgPace
                ? z4AvgPace
                : overallAvgPace ? overallAvgPace * 0.93 : null; // threshold ≈ 93% effort of easy pace

              // Threshold zones: tempo (slightly below), threshold (at), VO2 intervals (above)
              const tempoZonePace = estimatedThresholdPace ? estimatedThresholdPace * 1.06 : null;
              const intervalPace = estimatedThresholdPace ? estimatedThresholdPace * 0.94 : null;

              const fmtP = (p) => { if (!p) return "—"; const m=Math.floor(p); const s=Math.round((p-m)*60); return `${m}:${s.toString().padStart(2,"0")}`; };

              return (
                <div style={{ ...cardStyle, marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
                    <Zap size={16} color={LIME} />
                    <span style={{ fontSize:14, fontWeight:600 }}>Ritmo Umbral (Threshold)</span>
                    <span style={{ fontSize:11, color:TEXT_MUTED, marginLeft:2 }}>· método combinado FC + ritmo</span>
                  </div>

                  {/* Main threshold display */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:20 }}>
                    {[
                      { label:"Zona Tempo", sublabel:"Ligeramente por debajo", pace:tempoZonePace, color:"#d4c017", desc:"Carreras continuas de 20-40 min" },
                      { label:"Umbral exacto", sublabel:"Ritmo de umbral de lactato", pace:estimatedThresholdPace, color:LIME, desc:"Esfuerzo sostenible ~60 min", highlight:true },
                      { label:"Intervalos", sublabel:"Por encima del umbral", pace:intervalPace, color:VIOLET, desc:"Repeticiones de 3-8 min" },
                    ].map((z, i) => (
                      <div key={i} style={{ background: z.highlight ? "rgba(198,241,53,0.08)" : "rgba(255,255,255,0.04)", border:`1px solid ${z.highlight ? LIME+"44" : "rgba(255,255,255,0.08)"}`, borderRadius:12, padding:"16px 14px", textAlign:"center" }}>
                        <div style={{ fontSize:11, color:z.color, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, marginBottom:6 }}>{z.label}</div>
                        <div style={{ fontSize:28, fontWeight:900, color:z.highlight ? LIME : TEXT_PRIMARY, letterSpacing:-1, lineHeight:1 }}>{fmtP(z.pace)}</div>
                        <div style={{ fontSize:10, color:TEXT_MUTED, marginTop:4, marginBottom:8 }}>/km</div>
                        <div style={{ fontSize:11, color:TEXT_MUTED, lineHeight:1.4 }}>{z.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* FC threshold zones */}
                  <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"14px 16px", marginBottom:16 }}>
                    <p style={{ fontSize:12, fontWeight:600, color:TEXT_MUTED, margin:"0 0 12px", textTransform:"uppercase", letterSpacing:0.5 }}>Zona de FC del umbral</p>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ flex:1, background:"rgba(255,255,255,0.04)", borderRadius:8, height:20, overflow:"hidden", position:"relative" }}>
                        <div style={{ position:"absolute", left:"50%", top:0, height:"100%", width:"20%", transform:"translateX(-50%)", background:`linear-gradient(90deg, #d4c01788, ${LIME}cc, #BF5FFF88)`, borderRadius:8 }} />
                        <div style={{ position:"absolute", left:"50%", top:0, height:"100%", width:2, background:LIME, transform:"translateX(-50%)" }} />
                      </div>
                      <span style={{ fontSize:13, fontWeight:700, color:LIME, whiteSpace:"nowrap" }}>{thresholdFcLow}–{thresholdFcHigh} bpm</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
                      <span style={{ fontSize:11, color:TEXT_MUTED }}>Aeróbico</span>
                      <span style={{ fontSize:11, color:LIME, fontWeight:600 }}>Umbral (85–90% FC máx)</span>
                      <span style={{ fontSize:11, color:TEXT_MUTED }}>Anaeróbico</span>
                    </div>
                  </div>

                  {/* Data source info */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                    <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"12px 14px" }}>
                      <p style={{ fontSize:11, color:TEXT_MUTED, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:0.5 }}>Actividades en Z4 analizadas</p>
                      <p style={{ fontSize:22, fontWeight:800, color:TEXT_PRIMARY, margin:0 }}>{z4Activities.length}</p>
                      <p style={{ fontSize:11, color:TEXT_MUTED, margin:"2px 0 0" }}>FC {z4Lo}–{z4Hi} bpm</p>
                    </div>
                    <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"12px 14px" }}>
                      <p style={{ fontSize:11, color:TEXT_MUTED, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:0.5 }}>Método utilizado</p>
                      <p style={{ fontSize:14, fontWeight:700, color:TEXT_PRIMARY, margin:0 }}>
                        {z4Activities.length >= 3 ? "FC + Ritmo Z4" : z4Activities.length > 0 ? "FC + Ritmo parcial" : "FC estimado"}
                      </p>
                      <p style={{ fontSize:11, color:TEXT_MUTED, margin:"2px 0 0" }}>
                        {z4Activities.length >= 3 ? "Alta precisión" : z4Activities.length > 0 ? "Precisión media" : "Cargá más datos con FC"}
                      </p>
                    </div>
                  </div>

                  {/* AI Interpretation */}
                  <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:14, marginBottom:14 }}>
                    <p style={{ fontSize:12, color:TEXT_MUTED, margin:"0 0 6px", display:"flex", alignItems:"center", gap:6 }}>
                      <Brain size={12} color={TEXT_MUTED} /> Interpretación IA
                    </p>
                    {vo2Loading && <p style={{ fontSize:13, color:TEXT_MUTED, margin:0 }}>Analizando...<span style={{ display:"inline-block", width:7, height:13, background:LIME, marginLeft:3, verticalAlign:"middle", animation:"blink 0.8s step-end infinite" }}/></p>}
                    {vo2Insight && <p style={{ fontSize:13, color:TEXT_PRIMARY, lineHeight:1.7, margin:0 }}>{vo2Insight}</p>}
                  </div>

                  {/* AI Actions */}
                  <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:14 }}>
                    <p style={{ fontSize:12, color:TEXT_MUTED, margin:"0 0 12px", display:"flex", alignItems:"center", gap:6 }}>
                      <Zap size={12} color={TEXT_MUTED} /> Entrenamientos para mejorar tu umbral
                    </p>
                    {vo2ActLoading && [1,2,3].map(i => <div key={i} style={{ height:50, background:"rgba(255,255,255,0.05)", borderRadius:8, marginBottom:8, animation:"pulse 1.2s ease-in-out infinite" }}/>)}
                    {!vo2ActLoading && vo2Actions.length > 0 && (
                      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {vo2Actions.map((a,i) => (
                          <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"11px 13px", borderLeft:`3px solid ${LIME}44` }}>
                            <span style={{ fontSize:13, fontWeight:700, color:LIME, minWidth:20, lineHeight:1.5, flexShrink:0 }}>{i+1}.</span>
                            <div>
                              <p style={{ margin:0, fontSize:13, fontWeight:600, color:TEXT_PRIMARY, lineHeight:1.4 }}>{a.titulo}</p>
                              <p style={{ margin:"3px 0 0", fontSize:12, color:TEXT_MUTED, lineHeight:1.55 }}>{a.detalle}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* ── COMPARADOR DE ENTRENOS ── */}
            {(() => {
              const fmtTime = (s) => { if (!s) return "—"; const h=Math.floor(s/3600); const m=Math.floor((s%3600)/60); const ss=Math.round(s%60); return h>0 ? `${h}:${String(m).padStart(2,"0")}:${String(ss).padStart(2,"0")}` : `${m}:${String(ss).padStart(2,"0")}`; };
              const fmtP = (p) => { if (!p||p<=0) return "—"; const m=Math.floor(p); const s=Math.round((p-m)*60); return `${m}:${s.toString().padStart(2,"0")}`; };

              const listA = activeData.filter(a => a.name.toLowerCase().includes(searchA.toLowerCase()) || a.date.includes(searchA)).slice(0,8);
              const listB = activeData.filter(a => a.name.toLowerCase().includes(searchB.toLowerCase()) || a.date.includes(searchB)).slice(0,8);

              const diff = (a, b, key, invert=false) => {
                if (!a||!b) return null;
                const d = a[key] - b[key];
                const better = invert ? d > 0 : d < 0;
                return { d, better };
              };

              const MetricRow = ({ label, valA, valB, diffResult }) => (
                <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", gap:8, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ textAlign:"right" }}>
                    <span style={{ fontSize:15, fontWeight:700, color: diffResult?.better === true ? LIME : TEXT_PRIMARY }}>{valA}</span>
                    {diffResult?.better === true && <span style={{ fontSize:10, color:LIME, marginLeft:4 }}>▲</span>}
                  </div>
                  <span style={{ fontSize:11, color:TEXT_MUTED, textAlign:"center", minWidth:80 }}>{label}</span>
                  <div style={{ textAlign:"left" }}>
                    {diffResult?.better === false && <span style={{ fontSize:10, color:LIME, marginRight:4 }}>▲</span>}
                    <span style={{ fontSize:15, fontWeight:700, color: diffResult?.better === false ? LIME : TEXT_PRIMARY }}>{valB}</span>
                  </div>
                </div>
              );

              const Picker = ({ label, selected, onSelect, search, setSearch, list, open, setOpen, side }) => (
                <div style={{ flex:1, position:"relative" }}>
                  <div style={{ fontSize:11, color:TEXT_MUTED, marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</div>
                  <div onClick={() => setOpen(o => !o)} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${selected ? LIME+"55" : "rgba(255,255,255,0.1)"}`, borderRadius:10, padding:"10px 12px", cursor:"pointer", minHeight:52 }}>
                    {selected ? (
                      <>
                        <p style={{ margin:0, fontSize:12, fontWeight:600, color:TEXT_PRIMARY, lineHeight:1.3 }}>{selected.name.length > 30 ? selected.name.slice(0,30)+"…" : selected.name}</p>
                        <p style={{ margin:"2px 0 0", fontSize:11, color:TEXT_MUTED }}>{selected.date} · {selected.dist_km}km</p>
                      </>
                    ) : (
                      <p style={{ margin:0, fontSize:12, color:TEXT_MUTED }}>Elegir actividad...</p>
                    )}
                  </div>
                  {open && (
                    <div style={{ position:"absolute", top:"100%", [side==="left"?"left":"right"]:0, width:260, background:"rgba(20,20,20,0.98)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, zIndex:100, marginTop:4, overflow:"hidden" }}>
                      <input autoFocus type="text" placeholder="Buscar por nombre o fecha..." value={search} onChange={e => setSearch(e.target.value)}
                        style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"none", borderBottom:"1px solid rgba(255,255,255,0.08)", color:TEXT_PRIMARY, padding:"10px 12px", fontSize:12, outline:"none", colorScheme:"dark" }} />
                      <div style={{ maxHeight:200, overflowY:"auto" }}>
                        {list.length === 0 && <p style={{ fontSize:12, color:TEXT_MUTED, padding:"10px 12px", margin:0 }}>Sin resultados</p>}
                        {list.map(a => (
                          <div key={a.id} onClick={() => { onSelect(a); setOpen(false); setSearch(""); }}
                            style={{ padding:"9px 12px", cursor:"pointer", borderBottom:"1px solid rgba(255,255,255,0.04)" }}
                            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                            onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                            <p style={{ margin:0, fontSize:12, fontWeight:600, color:TEXT_PRIMARY }}>{a.name.length > 32 ? a.name.slice(0,32)+"…" : a.name}</p>
                            <p style={{ margin:"2px 0 0", fontSize:11, color:TEXT_MUTED }}>{a.date} · {a.dist_km}km · {fmtP(a.pace)}/km</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );

              return (
                <div style={{ ...cardStyle, marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
                    <Target size={16} color={LIME} />
                    <span style={{ fontSize:14, fontWeight:600 }}>Comparador de entrenos</span>
                    <span style={{ fontSize:11, color:TEXT_MUTED, marginLeft:2 }}>· mismo circuito, distinto día</span>
                  </div>

                  {/* Pickers */}
                  <div style={{ display:"flex", gap:12, marginBottom:20, position:"relative", alignItems:"flex-start" }}>
                    <Picker label="Entreno A" selected={compA} onSelect={setCompA} search={searchA} setSearch={setSearchA} list={listA} open={openA} setOpen={setOpenA} side="left" />
                    <div style={{ display:"flex", alignItems:"center", paddingTop:36 }}>
                      <span style={{ fontSize:16, color:TEXT_MUTED }}>vs</span>
                    </div>
                    <Picker label="Entreno B" selected={compB} onSelect={setCompB} search={searchB} setSearch={setSearchB} list={listB} open={openB} setOpen={setOpenB} side="right" />
                  </div>

                  {/* Comparison results */}
                  {compA && compB ? (
                    <>
                      {/* Dates header */}
                      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:8, marginBottom:4 }}>
                        <div style={{ textAlign:"right" }}><span style={{ fontSize:11, color:LIME, fontWeight:600 }}>{compA.date}</span></div>
                        <div style={{ minWidth:80 }}/>
                        <div style={{ textAlign:"left" }}><span style={{ fontSize:11, color:TEXT_MUTED, fontWeight:600 }}>{compB.date}</span></div>
                      </div>

                      <MetricRow label="Ritmo promedio" valA={`${fmtP(compA.pace)}/km`} valB={`${fmtP(compB.pace)}/km`} diffResult={diff(compA, compB, "pace", false)} />
                      <MetricRow label="Tiempo total" valA={fmtTime(compA.moving_time_s)} valB={fmtTime(compB.moving_time_s)} diffResult={diff(compA, compB, "moving_time_s", false)} />
                      <MetricRow label="Distancia" valA={`${compA.dist_km} km`} valB={`${compB.dist_km} km`} diffResult={null} />
                      <MetricRow label="FC promedio" valA={compA.avg_hr > 0 ? `${Math.round(compA.avg_hr)} bpm` : "—"} valB={compB.avg_hr > 0 ? `${Math.round(compB.avg_hr)} bpm` : "—"} diffResult={compA.avg_hr>0 && compB.avg_hr>0 ? diff(compA, compB, "avg_hr", false) : null} />

                      {/* Delta summary */}
                      {(() => {
                        const paceDiff = compB.pace - compA.pace;
                        const timeDiff = compB.moving_time_s - compA.moving_time_s;
                        const improved = paceDiff > 0;
                        const absPace = Math.abs(paceDiff);
                        const paceStr = `${Math.floor(absPace)}:${String(Math.round((absPace - Math.floor(absPace))*60)).padStart(2,"0")}`;
                        const absTime = Math.abs(timeDiff);
                        const timeStr = absTime >= 60 ? `${Math.floor(absTime/60)} min ${Math.round(absTime%60)} seg` : `${Math.round(absTime)} seg`;
                        return (
                          <div style={{ marginTop:14, background: improved ? "rgba(198,241,53,0.07)" : "rgba(191,95,255,0.07)", border:`1px solid ${improved ? LIME+"33" : VIOLET+"33"}`, borderRadius:10, padding:"12px 14px", textAlign:"center" }}>
                            <p style={{ margin:0, fontSize:13, color: improved ? LIME : VIOLET, fontWeight:700 }}>
                              {improved
                                ? `¡Mejoraste ${paceStr} min/km y ${timeStr} más rápido! 🎉`
                                : paceDiff < 0
                                  ? `Entreno A fue ${paceStr} min/km más rápido y ${timeStr} menos`
                                  : "Ritmos idénticos — gran consistencia 💪"
                              }
                            </p>
                          </div>
                        );
                      })()}
                    </>
                  ) : (
                    <div style={{ textAlign:"center", padding:"24px 0" }}>
                      <p style={{ fontSize:13, color:TEXT_MUTED, margin:0 }}>Seleccioná dos actividades para comparar</p>
                    </div>
                  )}
                </div>
              );
            })()}

            <div style={{ ...cardStyle, marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}><Flame size={16} color="#e84800"/><span style={{ fontSize:14, fontWeight:600 }}>Zonas de frecuencia cardíaca</span><span style={{ fontSize:11, color:TEXT_MUTED }}>· FC máx {config.fcMax} bpm</span></div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {HR_ZONES.map(z => { const lo = Math.round(config.fcMax*z.pct[0]); const hi = Math.round(config.fcMax*z.pct[1]); const count = filtered.filter(a => a.avg_hr>0 && a.avg_hr>=lo && a.avg_hr<hi).length; const maxCount = Math.max(...HR_ZONES.map(zz => filtered.filter(a => a.avg_hr>0 && a.avg_hr>=Math.round(config.fcMax*zz.pct[0]) && a.avg_hr<Math.round(config.fcMax*zz.pct[1])).length),1); return (<div key={z.zone}><div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:3 }}><span style={{ fontSize:11, fontWeight:700, color:z.color, width:22 }}>{z.zone}</span><span style={{ fontSize:12, color:TEXT_PRIMARY, width:110 }}>{z.name}</span><span style={{ fontSize:11, color:TEXT_MUTED, width:80 }}>{lo}–{hi} bpm</span><div style={{ flex:1, background:"rgba(255,255,255,0.04)", borderRadius:4, height:16, overflow:"hidden" }}><div style={{ height:"100%", width:`${(count/maxCount)*100}%`, background:z.color+"bb", borderRadius:4, minWidth:count>0 ? 6:0 }}/></div><span style={{ fontSize:12, color:TEXT_MUTED, width:28, textAlign:"right" }}>{count}</span></div><p style={{ fontSize:11, color:TEXT_MUTED, marginLeft:212, marginBottom:0 }}>{z.desc}</p></div>); })}
              </div>
            </div>

            <div style={{ ...cardStyle, marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}><Target size={16} color={ORANGE}/><span style={{ fontSize:14, fontWeight:600 }}>Predictor de tiempos</span><span style={{ fontSize:11, color:TEXT_MUTED }}>· fórmula de Riegel</span></div>
              {(() => { const refPace = kpis.avgPace > 2 && kpis.avgPace < 12 ? kpis.avgPace : 5.26; const refSecs = refPace*60*10; const fmtTime = (s) => { const h=Math.floor(s/3600); const m=Math.floor((s%3600)/60); const ss=Math.round(s%60); return h>0 ? `${h}:${String(m).padStart(2,"0")}:${String(ss).padStart(2,"0")}` : `${m}:${String(ss).padStart(2,"0")}`; }; const races = [{label:"5k",dist:5,emoji:"⚡"},{label:"10k",dist:10,emoji:"🏃"},{label:"21k",dist:21.0975,emoji:"💪"},{label:RACE_DISTANCES.find(d=>Math.abs(d.value-config.raceDist)<0.1)?.label.split(" ")[0]||"42k",dist:config.raceDist,emoji:"🏁",isTarget:true}]; return (<div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>{races.map((r,i) => { const predSecs = refSecs*Math.pow(r.dist/10,RIEGEL_EXP); const predPace = predSecs/60/r.dist; return (<div key={i} style={{ background:r.isTarget ? "rgba(198,241,53,0.08)":"rgba(255,255,255,0.04)", border:r.isTarget ? `1px solid ${ORANGE}55`:"none", borderRadius:10, padding:"14px 12px", textAlign:"center" }}><div style={{ fontSize:18, marginBottom:4 }}>{r.emoji}</div><div style={{ fontSize:13, color:TEXT_MUTED, marginBottom:6 }}>{r.label}</div><div style={{ fontSize:20, fontWeight:800, color:r.isTarget ? ORANGE:TEXT_PRIMARY, lineHeight:1 }}>{fmtTime(predSecs)}</div><div style={{ fontSize:11, color:TEXT_MUTED, marginTop:5 }}>{fmtTime(predPace*60)}/km</div></div>); })}</div>); })()}
              <p style={{ fontSize:11, color:TEXT_MUTED, marginTop:12 }}>Basado en tu ritmo promedio del período seleccionado.</p>
            </div>

            <div onDragOver={e => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={e => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }} onClick={() => document.getElementById("csv-footer-input").click()}
              style={{ marginTop:20, border:`1px dashed ${isDragging ? LIME : csvData ? "#4caf5066":"rgba(255,255,255,0.1)"}`, borderRadius:8, padding:"10px 16px", background:isDragging ? "rgba(198,241,53,0.06)":"transparent", cursor:"pointer", display:"flex", alignItems:"center", gap:10, transition:"all 0.2s" }}>
              <input id="csv-footer-input" type="file" accept=".csv" style={{ display:"none" }} onChange={e => handleFile(e.target.files[0])}/>
              <span style={{ fontSize:14 }}>{csvData ? "✅":"📂"}</span>
              <span style={{ fontSize:12, color:csvData ? "#4caf50":TEXT_MUTED, flex:1 }}>{csvData ? `${activeData.length} actividades · ${activeData[activeData.length-1]?.date} → ${activeData[0]?.date}` : "Subí tu CSV de Strava o Garmin"}</span>
              {csvData && <button onClick={e => { e.stopPropagation(); setCsvData(null); setCsvError(""); }} style={{ background:"transparent", border:`1px solid rgba(255,255,255,0.08)`, color:TEXT_MUTED, borderRadius:6, padding:"3px 10px", fontSize:11, cursor:"pointer" }}>Cambiar datos</button>}
            </div>

          </div>
        </div>
      )}

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @keyframes blink{0%,100%{opacity:1}50%{opacity:0}} @keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}} @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>

    {/* ELIUD CHATBOT */}
    {(csvData || showDemo) && (
      <>
        {/* Floating button */}
        <button
          onClick={() => setChatOpen(o => !o)}
          style={{ position:"fixed", bottom:24, right:24, zIndex:500, width:56, height:56, borderRadius:"50%", background:chatOpen ? "rgba(255,255,255,0.1)" : LIME, border:`2px solid ${chatOpen ? "rgba(255,255,255,0.2)" : LIME}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 24px ${chatOpen ? "rgba(0,0,0,0.4)" : "rgba(198,241,53,0.4)"}`, transition:"all 0.25s" }}
        >
          {chatOpen
            ? <span style={{ fontSize:20, color:TEXT_PRIMARY }}>✕</span>
            : <span style={{ fontSize:22 }}>🏃</span>
          }
        </button>

        {/* Chat panel */}
        {chatOpen && (
          <div style={{ position:"fixed", bottom:92, right:24, zIndex:499, width:360, maxWidth:"calc(100vw - 48px)", background:"rgba(15,15,15,0.97)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.6)", animation:"slideUp 0.25s ease" }}>
            {/* Header */}
            <div style={{ padding:"16px 18px", borderBottom:"1px solid rgba(255,255,255,0.08)", background:"rgba(198,241,53,0.06)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(198,241,53,0.15)", border:"1px solid rgba(198,241,53,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏃</div>
                <div>
                  <p style={{ margin:0, fontSize:14, fontWeight:800, color:TEXT_PRIMARY }}>Pregúntale a Eliud</p>
                  <p style={{ margin:0, fontSize:11, color:TEXT_MUTED }}>Tu coach IA personal · basado en tus datos</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ height:320, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
              {chatMessages.length === 0 && (
                <div style={{ textAlign:"center", marginTop:40 }}>
                  <div style={{ fontSize:32, marginBottom:10 }}>👋</div>
                  <p style={{ fontSize:13, color:TEXT_MUTED, lineHeight:1.6, margin:0 }}>Hola{config.userName ? `, ${config.userName}` : ""}! Soy Eliud, tu coach IA.<br/>Preguntame sobre entrenamiento, ritmos, recuperación, nutrición o lo que quieras.</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:16 }}>
                    {["¿Cuánto debería correr esta semana?", "¿Cómo mejorar mi ritmo umbral?", "¿Estoy listo para mi próxima carrera?"].map(s => (
                      <button key={s} onClick={() => sendMessage(s)} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:TEXT_MUTED, borderRadius:8, padding:"8px 12px", fontSize:12, cursor:"pointer", textAlign:"left" }}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
              {chatMessages.map((m, i) => (
                <div key={i} style={{ display:"flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "assistant" && (
                    <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(198,241,53,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, flexShrink:0, marginRight:8, alignSelf:"flex-end" }}>🏃</div>
                  )}
                  <div style={{ maxWidth:"80%", background: m.role === "user" ? LIME : "rgba(255,255,255,0.06)", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding:"10px 14px" }}>
                    <p style={{ margin:0, fontSize:13, color: m.role === "user" ? "#000" : TEXT_PRIMARY, lineHeight:1.55, whiteSpace:"pre-wrap" }}>
                      {m.content}
                      {m.role === "assistant" && chatLoading && i === chatMessages.length-1 && !m.content && <span style={{ display:"inline-block", width:7, height:13, background:LIME, marginLeft:3, verticalAlign:"middle", animation:"blink 0.8s step-end infinite" }}/>}
                    </p>
                  </div>
                </div>
              ))}
              {chatLoading && chatMessages[chatMessages.length-1]?.role === "user" && (
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(198,241,53,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>🏃</div>
                  <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"16px 16px 16px 4px", padding:"10px 14px" }}>
                    <div style={{ display:"flex", gap:4 }}>
                      {[0,1,2].map(i => <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:TEXT_MUTED, animation:`pulse 1s ease-in-out ${i*0.2}s infinite` }}/>)}
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef}/>
            </div>

            {/* Input */}
            <div style={{ padding:"12px 14px", borderTop:"1px solid rgba(255,255,255,0.08)", display:"flex", gap:8 }}>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage(chatInput)}
                placeholder="Preguntale a Eliud..."
                style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:TEXT_PRIMARY, borderRadius:10, padding:"9px 12px", fontSize:13, outline:"none", colorScheme:"dark" }}
              />
              <button
                onClick={() => sendMessage(chatInput)}
                disabled={!chatInput.trim() || chatLoading}
                style={{ background: chatInput.trim() && !chatLoading ? LIME : "rgba(255,255,255,0.08)", border:"none", borderRadius:10, width:38, height:38, cursor: chatInput.trim() && !chatLoading ? "pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}
              >
                <span style={{ fontSize:16, color: chatInput.trim() && !chatLoading ? "#000" : TEXT_MUTED }}>↑</span>
              </button>
            </div>
          </div>
        )}
      </>
    )}
    </>
  );
}
