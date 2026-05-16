import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Activity, TrendingUp, Mountain, Zap, Filter, Brain, RefreshCw, Heart, Timer, Target, Flame } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, LineChart, Line, ReferenceLine
} from "recharts";

const RAW_DATA = [{"id":"18362912244","date":"2026-05-03","name":"Maratón de Mendoza 🚀 PR ✨","dist_km":42.16,"moving_time_s":13350,"pace":5.278,"elev":152.8,"avg_hr":165.0,"calories":2060.0,"year":2026,"week":"2026-W17","dow":6,"month":"2026-05"},{"id":"18346274535","date":"2026-05-02","name":"Shake out ✨","dist_km":6.03,"moving_time_s":1811,"pace":5.002,"elev":30.9,"avg_hr":163.0,"calories":300.0,"year":2026,"week":"2026-W17","dow":5,"month":"2026-05"},{"id":"18314208298","date":"2026-04-30","name":"Tempo 🏃🏻‍♀️‍➡️ 20' + 2 x 1000m + 4 x 500m + 5 x 200m","dist_km":8.99,"moving_time_s":2625,"pace":4.864,"elev":2.8,"avg_hr":150.0,"calories":372.0,"year":2026,"week":"2026-W17","dow":3,"month":"2026-04"},{"id":"18265846448","date":"2026-04-26","name":"The last dance 💃🏻","dist_km":15.01,"moving_time_s":4874,"pace":5.413,"elev":9.6,"avg_hr":153.0,"calories":732.0,"year":2026,"week":"2026-W16","dow":6,"month":"2026-04"},{"id":"18233785949","date":"2026-04-24","name":"30' contínuos","dist_km":6.01,"moving_time_s":1867,"pace":5.182,"elev":0.0,"avg_hr":145.0,"calories":265.0,"year":2026,"week":"2026-W16","dow":4,"month":"2026-04"},{"id":"18196736066","date":"2026-04-21","name":"8K zona umbral ✨","dist_km":8.05,"moving_time_s":2559,"pace":5.299,"elev":4.6,"avg_hr":152.0,"calories":384.0,"year":2026,"week":"2026-W16","dow":1,"month":"2026-04"},{"id":"18174711414","date":"2026-04-19","name":"Runcito con mi sobrina 🥰","dist_km":2.0,"moving_time_s":630,"pace":5.244,"elev":18.5,"avg_hr":155.0,"calories":96.0,"year":2026,"week":"2026-W15","dow":6,"month":"2026-04"},{"id":"18171297931","date":"2026-04-19","name":"Penúltimo fondo pre maratón ✅","dist_km":19.28,"moving_time_s":6667,"pace":5.763,"elev":14.9,"avg_hr":156.0,"calories":974.0,"year":2026,"week":"2026-W15","dow":6,"month":"2026-04"},{"id":"18143791541","date":"2026-04-17","name":"6k suaves","dist_km":6.06,"moving_time_s":2136,"pace":5.875,"elev":0.0,"avg_hr":150.0,"calories":317.0,"year":2026,"week":"2026-W15","dow":4,"month":"2026-04"},{"id":"18130446808","date":"2026-04-16","name":"6*1000m 🫠","dist_km":6.01,"moving_time_s":1766,"pace":4.898,"elev":0.0,"avg_hr":157.0,"calories":270.0,"year":2026,"week":"2026-W15","dow":3,"month":"2026-04"},{"id":"18103913837","date":"2026-04-14","name":"8k regenerativos ❤️‍🩹","dist_km":8.01,"moving_time_s":2818,"pace":5.86,"elev":2.7,"avg_hr":144.0,"calories":394.0,"year":2026,"week":"2026-W15","dow":1,"month":"2026-04"},{"id":"18082039003","date":"2026-04-12","name":"Regenerativo 🩹","dist_km":6.01,"moving_time_s":2034,"pace":5.641,"elev":4.9,"avg_hr":160.0,"calories":323.0,"year":2026,"week":"2026-W14","dow":6,"month":"2026-04"},{"id":"18082030610","date":"2026-04-12","name":"Hola, Lactato 👋🏻","dist_km":12.02,"moving_time_s":3325,"pace":4.612,"elev":8.0,"avg_hr":154.0,"calories":472.0,"year":2026,"week":"2026-W14","dow":6,"month":"2026-04"},{"id":"18039939113","date":"2026-04-09","name":"EC 1k + Fartlek x 2 piramide (500m) + VC 1,5k 👌🏻","dist_km":9.04,"moving_time_s":2934,"pace":5.407,"elev":91.8,"avg_hr":156.0,"calories":442.0,"year":2026,"week":"2026-W14","dow":3,"month":"2026-04"},{"id":"18027214505","date":"2026-04-08","name":"EC 1k + 12*500m + VC 1k 😴","dist_km":8.04,"moving_time_s":2542,"pace":5.271,"elev":2.7,"avg_hr":154.0,"calories":376.0,"year":2026,"week":"2026-W14","dow":2,"month":"2026-04"},{"id":"18011852702","date":"2026-04-07","name":"EC 2k + 10*400m + VC 2k","dist_km":8.27,"moving_time_s":2952,"pace":5.946,"elev":0.0,"avg_hr":154.0,"calories":434.0,"year":2026,"week":"2026-W14","dow":1,"month":"2026-04"},{"id":"17988482113","date":"2026-04-05","name":"Fondito de 22k 🫡","dist_km":22.01,"moving_time_s":7746,"pace":5.864,"elev":16.5,"avg_hr":138.0,"calories":860.0,"year":2026,"week":"2026-W13","dow":6,"month":"2026-04"},{"id":"17976376372","date":"2026-04-04","name":"1er intento de entreno en Z2: failed 😑","dist_km":6.52,"moving_time_s":2249,"pace":5.752,"elev":14.2,"avg_hr":141.0,"calories":309.0,"year":2026,"week":"2026-W13","dow":5,"month":"2026-04"},{"id":"17964580764","date":"2026-04-03","name":"7k de #NoSeQueFueEso 🙃","dist_km":7.01,"moving_time_s":2198,"pace":5.228,"elev":2.6,"avg_hr":158.0,"calories":347.0,"year":2026,"week":"2026-W13","dow":4,"month":"2026-04"},{"id":"17923387903","date":"2026-03-31","name":"Recovery Run ❤️‍🩹","dist_km":7.02,"moving_time_s":2370,"pace":5.628,"elev":2.4,"avg_hr":148.0,"calories":351.0,"year":2026,"week":"2026-W13","dow":1,"month":"2026-03"},{"id":"17904108848","date":"2026-03-29","name":"Fondito lluvioso de 24k 🌧️","dist_km":24.01,"moving_time_s":7965,"pace":5.528,"elev":13.6,"avg_hr":155.0,"calories":1177.0,"year":2026,"week":"2026-W12","dow":6,"month":"2026-03"},{"id":"17872011903","date":"2026-03-26","name":"2k + 8*500m + 1k 🏃🏻‍♀️‍➡️","dist_km":7.01,"moving_time_s":2064,"pace":4.908,"elev":2.5,"avg_hr":134.0,"calories":243.0,"year":2026,"week":"2026-W12","dow":3,"month":"2026-03"},{"id":"17851901438","date":"2026-03-25","name":"7k Fartlek ✅","dist_km":7.01,"moving_time_s":2127,"pace":5.059,"elev":2.7,"avg_hr":151.0,"calories":317.0,"year":2026,"week":"2026-W12","dow":2,"month":"2026-03"},{"id":"17840471485","date":"2026-03-24","name":"45' of recovery 🩹","dist_km":8.05,"moving_time_s":2738,"pace":5.669,"elev":2.8,"avg_hr":147.0,"calories":398.0,"year":2026,"week":"2026-W12","dow":1,"month":"2026-03"},{"id":"17817189319","date":"2026-03-22","name":"26k > Fondito de mi 🫀","dist_km":26.01,"moving_time_s":8650,"pace":5.543,"elev":14.5,"avg_hr":151.0,"calories":1236.0,"year":2026,"week":"2026-W11","dow":6,"month":"2026-03"},{"id":"17778410434","date":"2026-03-19","name":"15' warmup + 5*500m a 4:05'/km 🙌🏻","dist_km":5.01,"moving_time_s":1446,"pace":4.813,"elev":2.7,"avg_hr":151.0,"calories":212.0,"year":2026,"week":"2026-W11","dow":3,"month":"2026-03"},{"id":"17765258946","date":"2026-03-18","name":"3k warmUp + 3*1000m 4:15'/km ✅","dist_km":6.0,"moving_time_s":1804,"pace":5.01,"elev":4.1,"avg_hr":0,"calories":261.0,"year":2026,"week":"2026-W11","dow":2,"month":"2026-03"},{"id":"17752685544","date":"2026-03-17","name":"10k regenerativos ❤️‍🩹","dist_km":10.0,"moving_time_s":3341,"pace":5.568,"elev":2.8,"avg_hr":0,"calories":520.0,"year":2026,"week":"2026-W11","dow":1,"month":"2026-03"},{"id":"17731440956","date":"2026-03-15","name":"30k 🚀 Peak training","dist_km":30.01,"moving_time_s":10079,"pace":5.598,"elev":16.0,"avg_hr":0,"calories":1517.0,"year":2026,"week":"2026-W10","dow":6,"month":"2026-03"},{"id":"17707643142","date":"2026-03-13","name":"8k Fartlek ✔️","dist_km":8.01,"moving_time_s":2424,"pace":5.046,"elev":11.7,"avg_hr":0,"calories":392.0,"year":2026,"week":"2026-W10","dow":4,"month":"2026-03"},{"id":"17684373663","date":"2026-03-11","name":"20' Warmup + 3*1000m 4:35'/km + 4*500m 4:20'/km + 5*400m 4:15'/km 💫","dist_km":11.01,"moving_time_s":3163,"pace":4.788,"elev":22.5,"avg_hr":0,"calories":478.0,"year":2026,"week":"2026-W10","dow":2,"month":"2026-03"},{"id":"17670595039","date":"2026-03-10","name":"Easy Run 🫶🏻","dist_km":9.0,"moving_time_s":2901,"pace":5.369,"elev":38.0,"avg_hr":0,"calories":457.0,"year":2026,"week":"2026-W10","dow":1,"month":"2026-03"},{"id":"17599678484","date":"2026-03-04","name":"3k easy + 4*2000 threshold + 1k regen 🫡","dist_km":12.01,"moving_time_s":3586,"pace":4.978,"elev":7.2,"avg_hr":0,"calories":554.0,"year":2026,"week":"2026-W09","dow":2,"month":"2026-03"},{"id":"17586455160","date":"2026-03-03","name":"Recovery Run 🩹","dist_km":10.01,"moving_time_s":3344,"pace":5.569,"elev":4.9,"avg_hr":0,"calories":521.0,"year":2026,"week":"2026-W09","dow":1,"month":"2026-03"},{"id":"17565627489","date":"2026-03-01","name":"Reaching Peak ⚡ 28k","dist_km":28.02,"moving_time_s":9204,"pace":5.475,"elev":20.4,"avg_hr":0,"calories":1336.0,"year":2026,"week":"2026-W08","dow":6,"month":"2026-03"},{"id":"17541285130","date":"2026-02-27","name":"3k chill + 4*500m + 4*300m + 4*200m 💪🏻","dist_km":7.01,"moving_time_s":1953,"pace":4.642,"elev":2.6,"avg_hr":0,"calories":272.0,"year":2026,"week":"2026-W08","dow":4,"month":"2026-02"},{"id":"17516243337","date":"2026-02-25","name":"7k Fartlek 🎢","dist_km":7.01,"moving_time_s":2105,"pace":5.005,"elev":2.3,"avg_hr":0,"calories":321.0,"year":2026,"week":"2026-W08","dow":2,"month":"2026-02"},{"id":"17504218904","date":"2026-02-24","name":"20' warmup + 1k + 4*300 + 4*200m 🫡","dist_km":8.03,"moving_time_s":2333,"pace":4.844,"elev":2.8,"avg_hr":0,"calories":319.0,"year":2026,"week":"2026-W08","dow":1,"month":"2026-02"},{"id":"17484167571","date":"2026-02-22","name":"Fondito de domingo ✨","dist_km":26.01,"moving_time_s":8926,"pace":5.72,"elev":18.1,"avg_hr":0,"calories":1139.0,"year":2026,"week":"2026-W07","dow":6,"month":"2026-02"},{"id":"17460542143","date":"2026-02-20","name":"Morning Jog 🏃🏻‍♀️‍➡️","dist_km":7.02,"moving_time_s":2326,"pace":5.525,"elev":27.1,"avg_hr":0,"calories":362.0,"year":2026,"week":"2026-W07","dow":4,"month":"2026-02"},{"id":"17438518515","date":"2026-02-18","name":"5km chill + 2km + 4*500m 👌🏻","dist_km":9.01,"moving_time_s":2755,"pace":5.094,"elev":2.8,"avg_hr":0,"calories":420.0,"year":2026,"week":"2026-W07","dow":2,"month":"2026-02"},{"id":"17428144696","date":"2026-02-17","name":"4k shake out run + 4*1000m ✅","dist_km":8.02,"moving_time_s":2413,"pace":5.015,"elev":2.7,"avg_hr":0,"calories":349.0,"year":2026,"week":"2026-W07","dow":1,"month":"2026-02"},{"id":"17406324930","date":"2026-02-15","name":"Fondito Mendocino ⛰️✨","dist_km":24.01,"moving_time_s":8073,"pace":5.604,"elev":120.0,"avg_hr":0,"calories":1119.0,"year":2026,"week":"2026-W06","dow":6,"month":"2026-02"},{"id":"17400164526","date":"2026-02-14","name":"Light jog 🧘🏻‍♀️","dist_km":6.02,"moving_time_s":2028,"pace":5.612,"elev":35.1,"avg_hr":0,"calories":305.0,"year":2026,"week":"2026-W06","dow":5,"month":"2026-02"},{"id":"17373730490","date":"2026-02-12","name":"5k easy + 10*200m + 1k recovery ✅","dist_km":8.01,"moving_time_s":2389,"pace":4.97,"elev":39.4,"avg_hr":0,"calories":354.0,"year":2026,"week":"2026-W06","dow":3,"month":"2026-02"},{"id":"17349816106","date":"2026-02-10","name":"3k warm up + 6*1000m @ 4:30'/km + 1k recovery ✨","dist_km":10.01,"moving_time_s":2980,"pace":4.962,"elev":2.8,"avg_hr":0,"calories":467.0,"year":2026,"week":"2026-W06","dow":1,"month":"2026-02"},{"id":"17328467911","date":"2026-02-08","name":"Fondito querido 🫶🏻","dist_km":22.01,"moving_time_s":7207,"pace":5.458,"elev":19.5,"avg_hr":0,"calories":1070.0,"year":2026,"week":"2026-W05","dow":6,"month":"2026-02"},{"id":"17306310964","date":"2026-02-06","name":"4k Warm up + 5k Fartlek 🫡","dist_km":9.02,"moving_time_s":2785,"pace":5.148,"elev":18.3,"avg_hr":0,"calories":439.0,"year":2026,"week":"2026-W05","dow":4,"month":"2026-02"},{"id":"17293676311","date":"2026-02-05","name":"Shake Out Run 🤘🏻","dist_km":7.0,"moving_time_s":2286,"pace":5.44,"elev":0.0,"avg_hr":0,"calories":352.0,"year":2026,"week":"2026-W05","dow":3,"month":"2026-02"},{"id":"17283817164","date":"2026-02-04","name":"3k chill + 10*500m @ 4:15'/km + 1k recovery ✅","dist_km":9.01,"moving_time_s":2566,"pace":4.745,"elev":6.0,"avg_hr":0,"calories":371.0,"year":2026,"week":"2026-W05","dow":2,"month":"2026-02"},{"id":"17250883947","date":"2026-02-01","name":"Sunday's Fondito 🤙🏻","dist_km":20.01,"moving_time_s":6633,"pace":5.526,"elev":19.5,"avg_hr":0,"calories":1011.0,"year":2026,"week":"2026-W04","dow":6,"month":"2026-02"},{"id":"17226895841","date":"2026-01-30","name":"15' + 6*500m + 5*200m ✨","dist_km":7.01,"moving_time_s":1939,"pace":4.607,"elev":2.4,"avg_hr":0,"calories":282.0,"year":2026,"week":"2026-W04","dow":4,"month":"2026-01"},{"id":"17215314538","date":"2026-01-29","name":"5k suaves + 3k @ 4:35'/km ☑️","dist_km":8.02,"moving_time_s":2415,"pace":5.017,"elev":2.7,"avg_hr":0,"calories":366.0,"year":2026,"week":"2026-W04","dow":3,"month":"2026-01"},{"id":"17200070274","date":"2026-01-27","name":"Chill out run 👟","dist_km":5.08,"moving_time_s":1768,"pace":5.798,"elev":0.0,"avg_hr":0,"calories":246.0,"year":2026,"week":"2026-W04","dow":1,"month":"2026-01"},{"id":"17172272737","date":"2026-01-25","name":"Fondito 18k 💫","dist_km":18.02,"moving_time_s":5905,"pace":5.461,"elev":16.1,"avg_hr":0,"calories":857.0,"year":2026,"week":"2026-W03","dow":6,"month":"2026-01"},{"id":"17162411685","date":"2026-01-24","name":"3k Warm up + 6*500m @ 4:20'/km ✅","dist_km":6.0,"moving_time_s":1737,"pace":4.825,"elev":5.2,"avg_hr":0,"calories":250.0,"year":2026,"week":"2026-W03","dow":5,"month":"2026-01"},{"id":"17127239949","date":"2026-01-21","name":"Fartlek 3k + 2k + 2k 💫","dist_km":7.01,"moving_time_s":2138,"pace":5.086,"elev":0.0,"avg_hr":0,"calories":325.0,"year":2026,"week":"2026-W03","dow":2,"month":"2026-01"},{"id":"17114230156","date":"2026-01-20","name":"Chill Out Run ✅","dist_km":8.01,"moving_time_s":2569,"pace":5.348,"elev":2.8,"avg_hr":0,"calories":390.0,"year":2026,"week":"2026-W03","dow":1,"month":"2026-01"},{"id":"17092845662","date":"2026-01-18","name":"Sunday-Runday 🌞","dist_km":16.02,"moving_time_s":5680,"pace":5.91,"elev":13.4,"avg_hr":0,"calories":727.0,"year":2026,"week":"2026-W02","dow":6,"month":"2026-01"},{"id":"17069129557","date":"2026-01-16","name":"Shake out run 🏃🏻‍♀️‍➡️","dist_km":7.02,"moving_time_s":2206,"pace":5.239,"elev":2.4,"avg_hr":0,"calories":329.0,"year":2026,"week":"2026-W02","dow":4,"month":"2026-01"},{"id":"17046310014","date":"2026-01-14","name":"6k + 4*500m 👟","dist_km":8.01,"moving_time_s":2367,"pace":4.927,"elev":2.7,"avg_hr":0,"calories":369.0,"year":2026,"week":"2026-W02","dow":2,"month":"2026-01"},{"id":"17033749045","date":"2026-01-13","name":"3k + 4*1000m 🌞","dist_km":7.01,"moving_time_s":2140,"pace":5.086,"elev":2.4,"avg_hr":0,"calories":349.0,"year":2026,"week":"2026-W02","dow":1,"month":"2026-01"},{"id":"17012314335","date":"2026-01-11","name":"18k ✅","dist_km":18.01,"moving_time_s":6178,"pace":5.717,"elev":13.2,"avg_hr":0,"calories":933.0,"year":2026,"week":"2026-W01","dow":6,"month":"2026-01"},{"id":"16985443403","date":"2026-01-08","name":"4k + 10*400mts ✅","dist_km":8.01,"moving_time_s":2309,"pace":4.805,"elev":19.6,"avg_hr":0,"calories":295.0,"year":2026,"week":"2026-W01","dow":3,"month":"2026-01"},{"id":"16963369424","date":"2026-01-07","name":"Easy Run 🏃🏻‍♀️‍➡️  Workout 1/60 on my way to Mendoza's 42k 🏁","dist_km":6.01,"moving_time_s":1935,"pace":5.369,"elev":0.0,"avg_hr":0,"calories":298.0,"year":2026,"week":"2026-W01","dow":2,"month":"2026-01"},{"id":"16898679063","date":"2025-12-31","name":"Runcito por Chilecito 🇨🇱✨","dist_km":5.01,"moving_time_s":1390,"pace":4.627,"elev":68.5,"avg_hr":0,"calories":196.0,"year":2025,"week":"2025-W52","dow":2,"month":"2025-12"},{"id":"16789249863","date":"2025-12-20","name":"Night Run","dist_km":8.01,"moving_time_s":2615,"pace":5.443,"elev":2.8,"avg_hr":0,"calories":426.0,"year":2025,"week":"2025-W50","dow":5,"month":"2025-12"},{"id":"16718394743","date":"2025-12-12","name":"5k CCM + 4*500 a 4:10'/km ✅","dist_km":7.01,"moving_time_s":2101,"pace":4.994,"elev":2.6,"avg_hr":0,"calories":304.0,"year":2025,"week":"2025-W49","dow":4,"month":"2025-12"},{"id":"16703586319","date":"2025-12-10","name":"Morning Run ☀️","dist_km":10.0,"moving_time_s":3173,"pace":5.287,"elev":3.1,"avg_hr":0,"calories":475.0,"year":2025,"week":"2025-W49","dow":2,"month":"2025-12"},{"id":"16675934424","date":"2025-12-07","name":"Chillin' 🤙🏻","dist_km":5.02,"moving_time_s":1645,"pace":5.467,"elev":10.3,"avg_hr":0,"calories":228.0,"year":2025,"week":"2025-W48","dow":6,"month":"2025-12"},{"id":"16619772306","date":"2025-12-01","name":"Chill Out Run 👟","dist_km":9.01,"moving_time_s":2956,"pace":5.471,"elev":8.9,"avg_hr":0,"calories":469.0,"year":2025,"week":"2025-W48","dow":0,"month":"2025-12"},{"id":"16578043605","date":"2025-11-27","name":"Night Run 🌒","dist_km":7.01,"moving_time_s":2198,"pace":5.224,"elev":11.0,"avg_hr":0,"calories":309.0,"year":2025,"week":"2025-W47","dow":3,"month":"2025-11"},{"id":"16552475074","date":"2025-11-24","name":"Morning Run","dist_km":10.01,"moving_time_s":3144,"pace":5.233,"elev":11.8,"avg_hr":0,"calories":472.0,"year":2025,"week":"2025-W47","dow":0,"month":"2025-11"},{"id":"16544177427","date":"2025-11-23","name":"Sunday Runday 🌞","dist_km":12.01,"moving_time_s":3334,"pace":4.627,"elev":8.6,"avg_hr":0,"calories":487.0,"year":2025,"week":"2025-W46","dow":6,"month":"2025-11"},{"id":"16523526979","date":"2025-11-21","name":"5k Easy Run + 7 * 300 mts @ 3:40'/km 🚀","dist_km":7.12,"moving_time_s":2052,"pace":4.806,"elev":3.0,"avg_hr":0,"calories":312.0,"year":2025,"week":"2025-W46","dow":4,"month":"2025-11"},{"id":"16493458303","date":"2025-11-18","name":"7k Regenerativos 🔋","dist_km":7.04,"moving_time_s":2205,"pace":5.219,"elev":4.9,"avg_hr":0,"calories":333.0,"year":2025,"week":"2025-W46","dow":1,"month":"2025-11"},{"id":"16476020839","date":"2025-11-16","name":"Fondito con Squad 💫","dist_km":15.02,"moving_time_s":4864,"pace":5.397,"elev":6.2,"avg_hr":0,"calories":820.0,"year":2025,"week":"2025-W45","dow":6,"month":"2025-11"},{"id":"16431197596","date":"2025-11-12","name":"Easy Run 🤙🏻","dist_km":10.03,"moving_time_s":3186,"pace":5.293,"elev":3.1,"avg_hr":0,"calories":470.0,"year":2025,"week":"2025-W45","dow":2,"month":"2025-11"},{"id":"16331674569","date":"2025-11-02","name":"Just for fun ✨","dist_km":10.01,"moving_time_s":2895,"pace":4.819,"elev":5.2,"avg_hr":0,"calories":452.0,"year":2025,"week":"2025-W43","dow":6,"month":"2025-11"},{"id":"16321917237","date":"2025-11-01","name":"Easy Run w/ Club Suma 🧡","dist_km":5.0,"moving_time_s":1682,"pace":5.602,"elev":5.9,"avg_hr":0,"calories":251.0,"year":2025,"week":"2025-W43","dow":5,"month":"2025-11"},{"id":"16287786141","date":"2025-10-28","name":"8k CCL + 100x10 a 3:26'/km 🚀","dist_km":9.01,"moving_time_s":2697,"pace":4.99,"elev":5.5,"avg_hr":0,"calories":412.0,"year":2025,"week":"2025-W43","dow":1,"month":"2025-10"},{"id":"16261877674","date":"2025-10-26","name":"Easy Run 🐢","dist_km":12.02,"moving_time_s":4080,"pace":5.656,"elev":12.8,"avg_hr":0,"calories":627.0,"year":2025,"week":"2025-W42","dow":6,"month":"2025-10"},{"id":"16236751079","date":"2025-10-23","name":"Run & Kiddo 🏃🏻‍♀️‍➡️ 🍔","dist_km":4.01,"moving_time_s":1439,"pace":5.977,"elev":24.9,"avg_hr":0,"calories":231.0,"year":2025,"week":"2025-W42","dow":3,"month":"2025-10"},{"id":"16191034085","date":"2025-10-19","name":"PR @ 15k Saucony 🚀","dist_km":15.03,"moving_time_s":4315,"pace":4.784,"elev":13.4,"avg_hr":0,"calories":712.0,"year":2025,"week":"2025-W41","dow":6,"month":"2025-10"},{"id":"16158868456","date":"2025-10-16","name":"4k CCL + 10*400mts a 3:55'/km 🚀","dist_km":8.0,"moving_time_s":2290,"pace":4.769,"elev":5.1,"avg_hr":0,"calories":366.0,"year":2025,"week":"2025-W41","dow":3,"month":"2025-10"},{"id":"16143066402","date":"2025-10-14","name":"5k a CCL + 3k a 4:30'/km 💫","dist_km":8.02,"moving_time_s":2515,"pace":5.223,"elev":0.0,"avg_hr":0,"calories":384.0,"year":2025,"week":"2025-W41","dow":1,"month":"2025-10"},{"id":"16117146970","date":"2025-10-12","name":"6k + 6k 🚀","dist_km":12.01,"moving_time_s":3406,"pace":4.728,"elev":8.3,"avg_hr":0,"calories":551.0,"year":2025,"week":"2025-W40","dow":6,"month":"2025-10"},{"id":"16074002879","date":"2025-10-08","name":"Easy 8k + 2k Fartlek [(100+100*5) x2] 💫","dist_km":10.01,"moving_time_s":3101,"pace":5.162,"elev":8.1,"avg_hr":0,"calories":494.0,"year":2025,"week":"2025-W40","dow":2,"month":"2025-10"},{"id":"16036266140","date":"2025-10-05","name":"Fondito de 14k a CCL 🐌","dist_km":14.01,"moving_time_s":4537,"pace":5.398,"elev":4.4,"avg_hr":0,"calories":710.0,"year":2025,"week":"2025-W39","dow":6,"month":"2025-10"},{"id":"16015857219","date":"2025-10-03","name":"4k CCL + 5x1000m @ 4':20\"/k 🚀+ 1k regenerativo = 10k ✅","dist_km":6.01,"moving_time_s":1625,"pace":4.508,"elev":0.0,"avg_hr":0,"calories":251.0,"year":2025,"week":"2025-W39","dow":4,"month":"2025-10"},{"id":"15985298207","date":"2025-09-30","name":"Easy Run 🫁","dist_km":10.03,"moving_time_s":3182,"pace":5.289,"elev":3.1,"avg_hr":0,"calories":517.0,"year":2025,"week":"2025-W39","dow":1,"month":"2025-09"},{"id":"15971445647","date":"2025-09-29","name":"Recovery Run ❤️‍🩹","dist_km":8.02,"moving_time_s":2509,"pace":5.213,"elev":3.0,"avg_hr":0,"calories":370.0,"year":2025,"week":"2025-W39","dow":0,"month":"2025-09"},{"id":"15888873335","date":"2025-09-21","name":"42k Maratón BsAs 💫","dist_km":43.11,"moving_time_s":14058,"pace":5.435,"elev":162.3,"avg_hr":0,"calories":2079.0,"year":2025,"week":"2025-W37","dow":6,"month":"2025-09"},{"id":"15870100819","date":"2025-09-19","name":"The last dance 💃🏻","dist_km":6.02,"moving_time_s":1832,"pace":5.074,"elev":2.1,"avg_hr":0,"calories":274.0,"year":2025,"week":"2025-W37","dow":4,"month":"2025-09"},{"id":"15841287636","date":"2025-09-17","name":"Morning Run","dist_km":9.02,"moving_time_s":2735,"pace":5.053,"elev":3.1,"avg_hr":0,"calories":425.0,"year":2025,"week":"2025-W37","dow":2,"month":"2025-09"},{"id":"15819149554","date":"2025-09-15","name":"The last fondito 🤹🫶🏻","dist_km":14.01,"moving_time_s":4451,"pace":5.295,"elev":17.9,"avg_hr":0,"calories":668.0,"year":2025,"week":"2025-W37","dow":0,"month":"2025-09"},{"id":"15811657426","date":"2025-09-14","name":"Morning Run","dist_km":9.91,"moving_time_s":3423,"pace":5.757,"elev":10.1,"avg_hr":0,"calories":544.0,"year":2025,"week":"2025-W36","dow":6,"month":"2025-09"},{"id":"15763136688","date":"2025-09-10","name":"10k contínuos suaves","dist_km":10.02,"moving_time_s":3200,"pace":5.322,"elev":3.0,"avg_hr":0,"calories":498.0,"year":2025,"week":"2025-W36","dow":2,"month":"2025-09"},{"id":"15733638235","date":"2025-09-07","name":"Afternoon Run","dist_km":26.03,"moving_time_s":8448,"pace":5.41,"elev":18.4,"avg_hr":0,"calories":1285.0,"year":2025,"week":"2025-W35","dow":6,"month":"2025-09"},{"id":"15693117250","date":"2025-09-04","name":"Morning Run","dist_km":10.01,"moving_time_s":2842,"pace":4.733,"elev":34.3,"avg_hr":0,"calories":428.0,"year":2025,"week":"2025-W35","dow":3,"month":"2025-09"},{"id":"15681429930","date":"2025-09-03","name":"Morning Run","dist_km":8.02,"moving_time_s":2465,"pace":5.12,"elev":38.4,"avg_hr":0,"calories":385.0,"year":2025,"week":"2025-W35","dow":2,"month":"2025-09"},{"id":"15669461232","date":"2025-09-02","name":"Morning Run","dist_km":5.0,"moving_time_s":1566,"pace":5.217,"elev":20.1,"avg_hr":0,"calories":223.0,"year":2025,"week":"2025-W35","dow":1,"month":"2025-09"},{"id":"15643317354","date":"2025-08-30","name":"Evening Run","dist_km":30.01,"moving_time_s":9791,"pace":5.438,"elev":46.2,"avg_hr":0,"calories":1455.0,"year":2025,"week":"2025-W34","dow":5,"month":"2025-08"},{"id":"15625894817","date":"2025-08-29","name":"Morning Run","dist_km":10.01,"moving_time_s":3109,"pace":5.178,"elev":11.4,"avg_hr":0,"calories":514.0,"year":2025,"week":"2025-W34","dow":4,"month":"2025-08"},{"id":"15599312662","date":"2025-08-26","name":"Evening Run","dist_km":10.01,"moving_time_s":3213,"pace":5.35,"elev":2.9,"avg_hr":0,"calories":515.0,"year":2025,"week":"2025-W34","dow":1,"month":"2025-08"},{"id":"15473561588","date":"2025-08-16","name":"Night Run","dist_km":10.03,"moving_time_s":3126,"pace":5.194,"elev":4.3,"avg_hr":0,"calories":490.0,"year":2025,"week":"2025-W32","dow":5,"month":"2025-08"},{"id":"15447476723","date":"2025-08-13","name":"Morning Run","dist_km":10.01,"moving_time_s":3162,"pace":5.264,"elev":15.1,"avg_hr":0,"calories":454.0,"year":2025,"week":"2025-W32","dow":2,"month":"2025-08"},{"id":"15363449508","date":"2025-08-06","name":"Morning Run","dist_km":8.56,"moving_time_s":2902,"pace":5.649,"elev":6.7,"avg_hr":0,"calories":443.0,"year":2025,"week":"2025-W31","dow":2,"month":"2025-08"},{"id":"15351926759","date":"2025-08-05","name":"Morning Run","dist_km":12.01,"moving_time_s":3785,"pace":5.252,"elev":12.2,"avg_hr":0,"calories":605.0,"year":2025,"week":"2025-W31","dow":1,"month":"2025-08"},{"id":"15330911517","date":"2025-08-03","name":"Morning Run","dist_km":15.04,"moving_time_s":4394,"pace":4.868,"elev":13.8,"avg_hr":0,"calories":771.0,"year":2025,"week":"2025-W30","dow":6,"month":"2025-08"},{"id":"15274174890","date":"2025-07-29","name":"Morning Run","dist_km":11.02,"moving_time_s":3388,"pace":5.126,"elev":13.4,"avg_hr":0,"calories":538.0,"year":2025,"week":"2025-W30","dow":1,"month":"2025-07"},{"id":"15258687152","date":"2025-07-27","name":"Evening Run","dist_km":22.02,"moving_time_s":6759,"pace":5.116,"elev":33.4,"avg_hr":0,"calories":1046.0,"year":2025,"week":"2025-W29","dow":6,"month":"2025-07"},{"id":"15236331850","date":"2025-07-25","name":"Runcito con Dani 🏃🏻‍♀️‍➡️🏃🏻‍♀️‍➡️","dist_km":13.04,"moving_time_s":4503,"pace":5.754,"elev":6.2,"avg_hr":0,"calories":659.0,"year":2025,"week":"2025-W29","dow":4,"month":"2025-07"},{"id":"15204837589","date":"2025-07-23","name":"Night Run","dist_km":10.0,"moving_time_s":3174,"pace":5.289,"elev":3.1,"avg_hr":0,"calories":509.0,"year":2025,"week":"2025-W29","dow":2,"month":"2025-07"},{"id":"15181909581","date":"2025-07-20","name":"Evening Run","dist_km":20.02,"moving_time_s":6405,"pace":5.331,"elev":30.5,"avg_hr":0,"calories":913.0,"year":2025,"week":"2025-W28","dow":6,"month":"2025-07"},{"id":"15143925162","date":"2025-07-17","name":"Morning Run","dist_km":8.0,"moving_time_s":2639,"pace":5.495,"elev":2.8,"avg_hr":0,"calories":427.0,"year":2025,"week":"2025-W28","dow":3,"month":"2025-07"},{"id":"15100934828","date":"2025-07-13","name":"Morning Run","dist_km":30.04,"moving_time_s":9528,"pace":5.287,"elev":15.0,"avg_hr":0,"calories":1554.0,"year":2025,"week":"2025-W27","dow":6,"month":"2025-07"},{"id":"15073905310","date":"2025-07-10","name":"Evening Run","dist_km":10.03,"moving_time_s":2846,"pace":4.728,"elev":4.7,"avg_hr":0,"calories":400.0,"year":2025,"week":"2025-W27","dow":3,"month":"2025-07"},{"id":"15045188871","date":"2025-07-08","name":"Morning Run","dist_km":8.01,"moving_time_s":2570,"pace":5.347,"elev":2.7,"avg_hr":0,"calories":436.0,"year":2025,"week":"2025-W27","dow":1,"month":"2025-07"},{"id":"15030820301","date":"2025-07-06","name":"Evening Run","dist_km":22.0,"moving_time_s":7088,"pace":5.369,"elev":36.5,"avg_hr":0,"calories":1269.0,"year":2025,"week":"2025-W26","dow":6,"month":"2025-07"},{"id":"15010330032","date":"2025-07-05","name":"Night Run","dist_km":9.01,"moving_time_s":2585,"pace":4.781,"elev":2.8,"avg_hr":0,"calories":363.0,"year":2025,"week":"2025-W26","dow":5,"month":"2025-07"},{"id":"14993084481","date":"2025-07-03","name":"Morning Run","dist_km":10.01,"moving_time_s":3175,"pace":5.285,"elev":7.6,"avg_hr":0,"calories":501.0,"year":2025,"week":"2025-W26","dow":3,"month":"2025-07"},{"id":"14958077380","date":"2025-06-29","name":"Evening Run","dist_km":22.03,"moving_time_s":7116,"pace":5.384,"elev":46.6,"avg_hr":0,"calories":1084.0,"year":2025,"week":"2025-W25","dow":6,"month":"2025-06"},{"id":"14936620861","date":"2025-06-27","name":"Evening Run","dist_km":8.01,"moving_time_s":2361,"pace":4.911,"elev":0.0,"avg_hr":0,"calories":329.0,"year":2025,"week":"2025-W25","dow":4,"month":"2025-06"},{"id":"14917961637","date":"2025-06-26","name":"Night Run","dist_km":12.01,"moving_time_s":3828,"pace":5.313,"elev":10.2,"avg_hr":0,"calories":588.0,"year":2025,"week":"2025-W25","dow":3,"month":"2025-06"},{"id":"14880813810","date":"2025-06-22","name":"Morning Run","dist_km":20.01,"moving_time_s":6793,"pace":5.657,"elev":15.5,"avg_hr":0,"calories":942.0,"year":2025,"week":"2025-W24","dow":6,"month":"2025-06"},{"id":"14838291905","date":"2025-06-18","name":"Morning Run","dist_km":8.01,"moving_time_s":2550,"pace":5.303,"elev":10.5,"avg_hr":0,"calories":382.0,"year":2025,"week":"2025-W24","dow":2,"month":"2025-06"},{"id":"14807479767","date":"2025-06-15","name":"Morning Run","dist_km":25.35,"moving_time_s":8261,"pace":5.432,"elev":18.4,"avg_hr":0,"calories":1338.0,"year":2025,"week":"2025-W23","dow":6,"month":"2025-06"},{"id":"14785809684","date":"2025-06-13","name":"Morning Run","dist_km":8.0,"moving_time_s":2374,"pace":4.944,"elev":2.9,"avg_hr":0,"calories":390.0,"year":2025,"week":"2025-W23","dow":4,"month":"2025-06"},{"id":"14765314979","date":"2025-06-11","name":"Morning Run","dist_km":9.01,"moving_time_s":2874,"pace":5.319,"elev":2.5,"avg_hr":0,"calories":437.0,"year":2025,"week":"2025-W23","dow":2,"month":"2025-06"},{"id":"14662762747","date":"2025-06-01","name":"Morning Run","dist_km":24.03,"moving_time_s":8186,"pace":5.678,"elev":7.7,"avg_hr":0,"calories":1270.0,"year":2025,"week":"2025-W21","dow":6,"month":"2025-06"},{"id":"14631051659","date":"2025-05-29","name":"Morning Run","dist_km":10.01,"moving_time_s":3200,"pace":5.326,"elev":5.3,"avg_hr":0,"calories":536.0,"year":2025,"week":"2025-W21","dow":3,"month":"2025-05"},{"id":"14590932527","date":"2025-05-25","name":"Morning Run","dist_km":22.01,"moving_time_s":7482,"pace":5.665,"elev":10.9,"avg_hr":0,"calories":1141.0,"year":2025,"week":"2025-W20","dow":6,"month":"2025-05"},{"id":"14575046147","date":"2025-05-23","name":"Evening Run","dist_km":10.01,"moving_time_s":3006,"pace":5.007,"elev":0.0,"avg_hr":0,"calories":418.0,"year":2025,"week":"2025-W20","dow":4,"month":"2025-05"},{"id":"14559526491","date":"2025-05-22","name":"Morning Run","dist_km":8.01,"moving_time_s":2446,"pace":5.087,"elev":15.9,"avg_hr":0,"calories":413.0,"year":2025,"week":"2025-W20","dow":3,"month":"2025-05"},{"id":"14538716105","date":"2025-05-20","name":"Morning Run","dist_km":7.01,"moving_time_s":2156,"pace":5.129,"elev":8.5,"avg_hr":0,"calories":374.0,"year":2025,"week":"2025-W20","dow":1,"month":"2025-05"},{"id":"14446560781","date":"2025-05-11","name":"Morning Run","dist_km":21.04,"moving_time_s":6753,"pace":5.35,"elev":35.6,"avg_hr":0,"calories":1083.0,"year":2025,"week":"2025-W18","dow":6,"month":"2025-05"},{"id":"14400294916","date":"2025-05-06","name":"Evening Run","dist_km":10.02,"moving_time_s":3267,"pace":5.435,"elev":2.8,"avg_hr":0,"calories":463.0,"year":2025,"week":"2025-W18","dow":1,"month":"2025-05"},{"id":"14374966295","date":"2025-05-04","name":"Morning Run","dist_km":14.01,"moving_time_s":4662,"pace":5.548,"elev":7.9,"avg_hr":0,"calories":727.0,"year":2025,"week":"2025-W17","dow":6,"month":"2025-05"},{"id":"14359791465","date":"2025-05-03","name":"Night Run","dist_km":10.02,"moving_time_s":2935,"pace":4.883,"elev":29.2,"avg_hr":0,"calories":411.0,"year":2025,"week":"2025-W17","dow":5,"month":"2025-05"},{"id":"14344435869","date":"2025-05-01","name":"Morning Run","dist_km":9.01,"moving_time_s":2649,"pace":4.899,"elev":2.7,"avg_hr":0,"calories":412.0,"year":2025,"week":"2025-W17","dow":3,"month":"2025-05"},{"id":"14311154700","date":"2025-04-28","name":"Morning Run","dist_km":10.01,"moving_time_s":3096,"pace":5.153,"elev":2.7,"avg_hr":0,"calories":473.0,"year":2025,"week":"2025-W17","dow":0,"month":"2025-04"},{"id":"14277805886","date":"2025-04-25","name":"Night Run","dist_km":10.01,"moving_time_s":3024,"pace":5.034,"elev":4.7,"avg_hr":0,"calories":414.0,"year":2025,"week":"2025-W16","dow":4,"month":"2025-04"},{"id":"14257345610","date":"2025-04-22","name":"Evening Run","dist_km":10.0,"moving_time_s":3055,"pace":5.09,"elev":2.7,"avg_hr":0,"calories":428.0,"year":2025,"week":"2025-W16","dow":1,"month":"2025-04"},{"id":"14222621897","date":"2025-04-19","name":"Morning Run","dist_km":18.01,"moving_time_s":6023,"pace":5.574,"elev":10.4,"avg_hr":0,"calories":842.0,"year":2025,"week":"2025-W15","dow":5,"month":"2025-04"},{"id":"14217462594","date":"2025-04-18","name":"Evening Run","dist_km":10.01,"moving_time_s":2984,"pace":4.969,"elev":3.8,"avg_hr":0,"calories":489.0,"year":2025,"week":"2025-W15","dow":4,"month":"2025-04"},{"id":"14170511467","date":"2025-04-13","name":"Evening Run","dist_km":20.01,"moving_time_s":6779,"pace":5.645,"elev":35.7,"avg_hr":0,"calories":1059.0,"year":2025,"week":"2025-W14","dow":6,"month":"2025-04"},{"id":"14143992247","date":"2025-04-10","name":"Evening Run","dist_km":5.0,"moving_time_s":1432,"pace":4.77,"elev":8.2,"avg_hr":0,"calories":196.0,"year":2025,"week":"2025-W14","dow":3,"month":"2025-04"},{"id":"14117009449","date":"2025-04-08","name":"Morning Run","dist_km":9.01,"moving_time_s":2787,"pace":5.156,"elev":2.7,"avg_hr":0,"calories":442.0,"year":2025,"week":"2025-W14","dow":1,"month":"2025-04"},{"id":"14096689636","date":"2025-04-06","name":"Morning Run","dist_km":10.03,"moving_time_s":3153,"pace":5.24,"elev":2.8,"avg_hr":0,"calories":507.0,"year":2025,"week":"2025-W13","dow":6,"month":"2025-04"},{"id":"14059146902","date":"2025-04-02","name":"Morning Run","dist_km":9.02,"moving_time_s":2679,"pace":4.953,"elev":2.3,"avg_hr":0,"calories":381.0,"year":2025,"week":"2025-W13","dow":2,"month":"2025-04"},{"id":"14043922354","date":"2025-03-31","name":"Evening Run","dist_km":18.02,"moving_time_s":6086,"pace":5.63,"elev":25.2,"avg_hr":0,"calories":913.0,"year":2025,"week":"2025-W13","dow":0,"month":"2025-03"},{"id":"13997595374","date":"2025-03-26","name":"Evening Run","dist_km":9.02,"moving_time_s":2630,"pace":4.862,"elev":2.2,"avg_hr":0,"calories":377.0,"year":2025,"week":"2025-W12","dow":2,"month":"2025-03"},{"id":"13988191183","date":"2025-03-25","name":"Evening Run","dist_km":12.01,"moving_time_s":3826,"pace":5.308,"elev":5.4,"avg_hr":0,"calories":576.0,"year":2025,"week":"2025-W12","dow":1,"month":"2025-03"},{"id":"13953651526","date":"2025-03-22","name":"Morning Run","dist_km":21.01,"moving_time_s":7277,"pace":5.772,"elev":14.9,"avg_hr":0,"calories":1106.0,"year":2025,"week":"2025-W11","dow":5,"month":"2025-03"},{"id":"13931831231","date":"2025-03-19","name":"Evening Run","dist_km":6.01,"moving_time_s":1865,"pace":5.17,"elev":21.6,"avg_hr":0,"calories":258.0,"year":2025,"week":"2025-W11","dow":2,"month":"2025-03"},{"id":"13922438539","date":"2025-03-19","name":"Night Run","dist_km":10.01,"moving_time_s":3249,"pace":5.407,"elev":2.7,"avg_hr":0,"calories":491.0,"year":2025,"week":"2025-W11","dow":2,"month":"2025-03"},{"id":"13888790718","date":"2025-03-15","name":"Morning Run","dist_km":12.03,"moving_time_s":3945,"pace":5.467,"elev":9.2,"avg_hr":0,"calories":613.0,"year":2025,"week":"2025-W10","dow":5,"month":"2025-03"},{"id":"13872219597","date":"2025-03-13","name":"Morning Run","dist_km":6.01,"moving_time_s":1791,"pace":4.969,"elev":0.0,"avg_hr":0,"calories":261.0,"year":2025,"week":"2025-W10","dow":3,"month":"2025-03"},{"id":"13860893954","date":"2025-03-12","name":"Morning Run","dist_km":10.0,"moving_time_s":3172,"pace":5.284,"elev":3.6,"avg_hr":0,"calories":480.0,"year":2025,"week":"2025-W10","dow":2,"month":"2025-03"},{"id":"13833126793","date":"2025-03-09","name":"Morning Run","dist_km":18.02,"moving_time_s":6251,"pace":5.781,"elev":10.4,"avg_hr":0,"calories":860.0,"year":2025,"week":"2025-W09","dow":6,"month":"2025-03"},{"id":"13805757921","date":"2025-03-06","name":"Morning Run","dist_km":6.01,"moving_time_s":1950,"pace":5.408,"elev":0.0,"avg_hr":0,"calories":295.0,"year":2025,"week":"2025-W09","dow":3,"month":"2025-03"},{"id":"13795051928","date":"2025-03-05","name":"Morning Run","dist_km":8.0,"moving_time_s":2620,"pace":5.455,"elev":13.0,"avg_hr":0,"calories":393.0,"year":2025,"week":"2025-W09","dow":2,"month":"2025-03"},{"id":"13759709122","date":"2025-03-01","name":"Morning Run","dist_km":14.02,"moving_time_s":4594,"pace":5.462,"elev":11.4,"avg_hr":0,"calories":684.0,"year":2025,"week":"2025-W08","dow":5,"month":"2025-03"},{"id":"13740496095","date":"2025-02-27","name":"Morning Run","dist_km":8.02,"moving_time_s":2532,"pace":5.264,"elev":4.4,"avg_hr":0,"calories":380.0,"year":2025,"week":"2025-W08","dow":3,"month":"2025-02"},{"id":"13722178274","date":"2025-02-25","name":"Morning Run","dist_km":10.01,"moving_time_s":3302,"pace":5.497,"elev":2.6,"avg_hr":0,"calories":500.0,"year":2025,"week":"2025-W08","dow":1,"month":"2025-02"},{"id":"13694604594","date":"2025-02-22","name":"Morning Run","dist_km":14.01,"moving_time_s":4647,"pace":5.527,"elev":7.7,"avg_hr":0,"calories":681.0,"year":2025,"week":"2025-W07","dow":5,"month":"2025-02"},{"id":"13678611628","date":"2025-02-20","name":"Morning Run","dist_km":7.5,"moving_time_s":2310,"pace":5.13,"elev":2.6,"avg_hr":0,"calories":338.0,"year":2025,"week":"2025-W07","dow":3,"month":"2025-02"},{"id":"13658946860","date":"2025-02-18","name":"Morning Run","dist_km":8.01,"moving_time_s":2617,"pace":5.447,"elev":4.5,"avg_hr":0,"calories":398.0,"year":2025,"week":"2025-W07","dow":1,"month":"2025-02"},{"id":"13642785568","date":"2025-02-16","name":"Morning Run","dist_km":12.01,"moving_time_s":4007,"pace":5.559,"elev":6.8,"avg_hr":0,"calories":580.0,"year":2025,"week":"2025-W06","dow":6,"month":"2025-02"},{"id":"13581780403","date":"2025-02-09","name":"Morning Run","dist_km":14.04,"moving_time_s":4890,"pace":5.806,"elev":7.7,"avg_hr":0,"calories":750.0,"year":2025,"week":"2025-W05","dow":6,"month":"2025-02"},{"id":"13563003415","date":"2025-02-07","name":"Morning Run","dist_km":5.01,"moving_time_s":1662,"pace":5.529,"elev":8.4,"avg_hr":0,"calories":240.0,"year":2025,"week":"2025-W05","dow":4,"month":"2025-02"},{"id":"13542549378","date":"2025-02-04","name":"Morning Run","dist_km":5.51,"moving_time_s":1820,"pace":5.505,"elev":0.0,"avg_hr":0,"calories":283.0,"year":2025,"week":"2025-W05","dow":1,"month":"2025-02"},{"id":"13526867095","date":"2025-02-03","name":"Morning Run","dist_km":5.02,"moving_time_s":1636,"pace":5.434,"elev":14.5,"avg_hr":0,"calories":251.0,"year":2025,"week":"2025-W05","dow":0,"month":"2025-02"},{"id":"13419787014","date":"2025-01-21","name":"Evening Run","dist_km":6.1,"moving_time_s":1920,"pace":5.247,"elev":5.6,"avg_hr":0,"calories":293.0,"year":2025,"week":"2025-W03","dow":1,"month":"2025-01"},{"id":"13410186454","date":"2025-01-20","name":"Evening Run","dist_km":9.03,"moving_time_s":2897,"pace":5.349,"elev":2.7,"avg_hr":0,"calories":427.0,"year":2025,"week":"2025-W03","dow":0,"month":"2025-01"},{"id":"13397868834","date":"2025-01-19","name":"Morning Run","dist_km":5.0,"moving_time_s":1635,"pace":5.445,"elev":0.0,"avg_hr":0,"calories":245.0,"year":2025,"week":"2025-W02","dow":6,"month":"2025-01"},{"id":"13298817410","date":"2025-01-08","name":"Morning Run","dist_km":8.02,"moving_time_s":2562,"pace":5.327,"elev":2.7,"avg_hr":0,"calories":384.0,"year":2025,"week":"2025-W01","dow":2,"month":"2025-01"},{"id":"13289743219","date":"2025-01-07","name":"Morning Run","dist_km":9.0,"moving_time_s":2909,"pace":5.388,"elev":5.0,"avg_hr":0,"calories":450.0,"year":2025,"week":"2025-W01","dow":1,"month":"2025-01"},{"id":"13233730164","date":"2024-12-31","name":"Lunch Run","dist_km":6.0,"moving_time_s":1829,"pace":5.081,"elev":16.3,"avg_hr":0,"calories":276.0,"year":2024,"week":"2024-W53","dow":1,"month":"2024-12"},{"id":"13209104183","date":"2024-12-28","name":"Morning Run","dist_km":10.01,"moving_time_s":3107,"pace":5.172,"elev":2.6,"avg_hr":0,"calories":443.0,"year":2024,"week":"2024-W52","dow":5,"month":"2024-12"},{"id":"13192434103","date":"2024-12-26","name":"Morning Run","dist_km":5.88,"moving_time_s":1816,"pace":5.145,"elev":0.0,"avg_hr":0,"calories":283.0,"year":2024,"week":"2024-W52","dow":3,"month":"2024-12"},{"id":"13185263582","date":"2024-12-24","name":"Evening Run","dist_km":6.02,"moving_time_s":1847,"pace":5.115,"elev":0.0,"avg_hr":0,"calories":239.0,"year":2024,"week":"2024-W52","dow":1,"month":"2024-12"},{"id":"13171635482","date":"2024-12-22","name":"Evening Run","dist_km":6.01,"moving_time_s":1912,"pace":5.306,"elev":8.1,"avg_hr":0,"calories":302.0,"year":2024,"week":"2024-W51","dow":6,"month":"2024-12"},{"id":"13100638252","date":"2024-12-12","name":"Morning Run","dist_km":7.0,"moving_time_s":2224,"pace":5.292,"elev":17.0,"avg_hr":0,"calories":325.0,"year":2024,"week":"2024-W50","dow":3,"month":"2024-12"},{"id":"13077853024","date":"2024-12-09","name":"Morning Run","dist_km":7.01,"moving_time_s":2297,"pace":5.458,"elev":2.8,"avg_hr":0,"calories":334.0,"year":2024,"week":"2024-W50","dow":0,"month":"2024-12"},{"id":"13051367345","date":"2024-12-05","name":"Morning Run","dist_km":10.02,"moving_time_s":3263,"pace":5.428,"elev":2.9,"avg_hr":0,"calories":518.0,"year":2024,"week":"2024-W49","dow":3,"month":"2024-12"},{"id":"13037073022","date":"2024-12-03","name":"Morning Run","dist_km":9.02,"moving_time_s":2791,"pace":5.158,"elev":2.8,"avg_hr":0,"calories":427.0,"year":2024,"week":"2024-W49","dow":1,"month":"2024-12"},{"id":"13029277520","date":"2024-12-02","name":"Morning Run","dist_km":10.01,"moving_time_s":3216,"pace":5.354,"elev":2.8,"avg_hr":0,"calories":481.0,"year":2024,"week":"2024-W49","dow":0,"month":"2024-12"},{"id":"13008072390","date":"2024-11-29","name":"Morning Run","dist_km":9.01,"moving_time_s":2863,"pace":5.294,"elev":2.9,"avg_hr":0,"calories":447.0,"year":2024,"week":"2024-W48","dow":4,"month":"2024-11"},{"id":"12994246216","date":"2024-11-27","name":"Morning Run","dist_km":8.01,"moving_time_s":2430,"pace":5.053,"elev":2.6,"avg_hr":0,"calories":360.0,"year":2024,"week":"2024-W48","dow":2,"month":"2024-11"},{"id":"12991896490","date":"2024-11-26","name":"Morning Run","dist_km":10.02,"moving_time_s":3181,"pace":5.292,"elev":2.7,"avg_hr":0,"calories":453.0,"year":2024,"week":"2024-W48","dow":1,"month":"2024-11"},{"id":"12946711660","date":"2024-11-20","name":"Morning Run","dist_km":6.0,"moving_time_s":1909,"pace":5.302,"elev":2.6,"avg_hr":0,"calories":296.0,"year":2024,"week":"2024-W47","dow":2,"month":"2024-11"},{"id":"12935150153","date":"2024-11-19","name":"Morning Run","dist_km":8.02,"moving_time_s":2616,"pace":5.437,"elev":5.9,"avg_hr":0,"calories":419.0,"year":2024,"week":"2024-W47","dow":1,"month":"2024-11"},{"id":"12868199078","date":"2024-11-10","name":"Morning Run","dist_km":21.01,"moving_time_s":6819,"pace":5.408,"elev":68.8,"avg_hr":0,"calories":1130.0,"year":2024,"week":"2024-W45","dow":6,"month":"2024-11"},{"id":"12851393318","date":"2024-11-08","name":"Morning Run","dist_km":7.01,"moving_time_s":2015,"pace":4.792,"elev":4.9,"avg_hr":0,"calories":312.0,"year":2024,"week":"2024-W45","dow":4,"month":"2024-11"},{"id":"12835542417","date":"2024-11-06","name":"Morning Run","dist_km":10.01,"moving_time_s":3134,"pace":5.219,"elev":2.6,"avg_hr":0,"calories":463.0,"year":2024,"week":"2024-W45","dow":2,"month":"2024-11"},{"id":"12827287930","date":"2024-11-05","name":"Morning Run","dist_km":10.01,"moving_time_s":3195,"pace":5.318,"elev":2.6,"avg_hr":0,"calories":513.0,"year":2024,"week":"2024-W45","dow":1,"month":"2024-11"},{"id":"12813468623","date":"2024-11-03","name":"Morning Run","dist_km":15.02,"moving_time_s":5212,"pace":5.784,"elev":7.9,"avg_hr":0,"calories":800.0,"year":2024,"week":"2024-W44","dow":6,"month":"2024-11"},{"id":"12780402332","date":"2024-10-30","name":"Morning Run","dist_km":9.01,"moving_time_s":2845,"pace":5.265,"elev":2.8,"avg_hr":0,"calories":453.0,"year":2024,"week":"2024-W44","dow":2,"month":"2024-10"},{"id":"12772096348","date":"2024-10-29","name":"Morning Run","dist_km":11.0,"moving_time_s":3581,"pace":5.426,"elev":4.9,"avg_hr":0,"calories":605.0,"year":2024,"week":"2024-W44","dow":1,"month":"2024-10"},{"id":"12740318452","date":"2024-10-25","name":"Morning Run","dist_km":5.02,"moving_time_s":1581,"pace":5.244,"elev":26.8,"avg_hr":0,"calories":244.0,"year":2024,"week":"2024-W43","dow":4,"month":"2024-10"},{"id":"12715720987","date":"2024-10-22","name":"Morning Run","dist_km":10.01,"moving_time_s":3247,"pace":5.405,"elev":18.7,"avg_hr":0,"calories":504.0,"year":2024,"week":"2024-W43","dow":1,"month":"2024-10"},{"id":"12701158161","date":"2024-10-20","name":"Morning Run","dist_km":18.02,"moving_time_s":6033,"pace":5.58,"elev":13.5,"avg_hr":0,"calories":898.0,"year":2024,"week":"2024-W42","dow":6,"month":"2024-10"},{"id":"12676365813","date":"2024-10-17","name":"Morning Run","dist_km":7.95,"moving_time_s":2418,"pace":5.069,"elev":4.7,"avg_hr":0,"calories":368.0,"year":2024,"week":"2024-W42","dow":3,"month":"2024-10"},{"id":"12668457767","date":"2024-10-16","name":"Morning Run","dist_km":9.01,"moving_time_s":2752,"pace":5.091,"elev":18.8,"avg_hr":0,"calories":412.0,"year":2024,"week":"2024-W42","dow":2,"month":"2024-10"},{"id":"12660358410","date":"2024-10-15","name":"Morning Run","dist_km":10.05,"moving_time_s":3251,"pace":5.393,"elev":2.5,"avg_hr":0,"calories":493.0,"year":2024,"week":"2024-W42","dow":1,"month":"2024-10"},{"id":"12645916389","date":"2024-10-13","name":"Morning Run","dist_km":16.01,"moving_time_s":5424,"pace":5.647,"elev":8.5,"avg_hr":0,"calories":800.0,"year":2024,"week":"2024-W41","dow":6,"month":"2024-10"},{"id":"12620575248","date":"2024-10-10","name":"Morning Run","dist_km":9.0,"moving_time_s":2772,"pace":5.136,"elev":2.5,"avg_hr":0,"calories":418.0,"year":2024,"week":"2024-W41","dow":3,"month":"2024-10"},{"id":"12604370173","date":"2024-10-08","name":"Morning Run","dist_km":10.0,"moving_time_s":3210,"pace":5.348,"elev":2.5,"avg_hr":0,"calories":513.0,"year":2024,"week":"2024-W41","dow":1,"month":"2024-10"},{"id":"12589650632","date":"2024-10-06","name":"Morning Run","dist_km":14.01,"moving_time_s":4711,"pace":5.606,"elev":7.9,"avg_hr":0,"calories":750.0,"year":2024,"week":"2024-W40","dow":6,"month":"2024-10"},{"id":"12551069096","date":"2024-10-01","name":"Morning Run","dist_km":6.01,"moving_time_s":1910,"pace":5.3,"elev":0.0,"avg_hr":0,"calories":289.0,"year":2024,"week":"2024-W40","dow":1,"month":"2024-10"},{"id":"12497276275","date":"2024-09-25","name":"Evening Run","dist_km":8.02,"moving_time_s":2560,"pace":5.321,"elev":73.9,"avg_hr":0,"calories":383.0,"year":2024,"week":"2024-W39","dow":2,"month":"2024-09"},{"id":"12452201102","date":"2024-09-19","name":"Morning Run","dist_km":8.03,"moving_time_s":2521,"pace":5.234,"elev":117.4,"avg_hr":0,"calories":389.0,"year":2024,"week":"2024-W38","dow":3,"month":"2024-09"},{"id":"12239664975","date":"2024-08-25","name":"Morning Run","dist_km":21.03,"moving_time_s":6576,"pace":5.212,"elev":84.7,"avg_hr":0,"calories":1017.0,"year":2024,"week":"2024-W34","dow":6,"month":"2024-08"},{"id":"12212690537","date":"2024-08-22","name":"Morning Run","dist_km":8.0,"moving_time_s":2475,"pace":5.155,"elev":2.5,"avg_hr":0,"calories":375.0,"year":2024,"week":"2024-W34","dow":3,"month":"2024-08"},{"id":"12189083202","date":"2024-08-19","name":"Morning Run","dist_km":10.02,"moving_time_s":3090,"pace":5.139,"elev":2.5,"avg_hr":0,"calories":481.0,"year":2024,"week":"2024-W34","dow":0,"month":"2024-08"},{"id":"12179104859","date":"2024-08-18","name":"Morning Run","dist_km":10.02,"moving_time_s":3059,"pace":5.086,"elev":15.1,"avg_hr":0,"calories":490.0,"year":2024,"week":"2024-W33","dow":6,"month":"2024-08"},{"id":"12164628454","date":"2024-08-16","name":"Morning Run","dist_km":9.0,"moving_time_s":2769,"pace":5.126,"elev":2.5,"avg_hr":0,"calories":422.0,"year":2024,"week":"2024-W33","dow":4,"month":"2024-08"},{"id":"12137638047","date":"2024-08-13","name":"Morning Run","dist_km":10.01,"moving_time_s":3166,"pace":5.27,"elev":2.5,"avg_hr":0,"calories":507.0,"year":2024,"week":"2024-W33","dow":1,"month":"2024-08"},{"id":"12120227704","date":"2024-08-11","name":"Morning Run","dist_km":18.02,"moving_time_s":5976,"pace":5.527,"elev":10.6,"avg_hr":0,"calories":887.0,"year":2024,"week":"2024-W32","dow":6,"month":"2024-08"},{"id":"12106053871","date":"2024-08-09","name":"Morning Run","dist_km":6.01,"moving_time_s":1703,"pace":4.726,"elev":2.0,"avg_hr":0,"calories":233.0,"year":2024,"week":"2024-W32","dow":4,"month":"2024-08"},{"id":"12086690573","date":"2024-08-07","name":"Morning Run","dist_km":9.02,"moving_time_s":2683,"pace":4.956,"elev":2.5,"avg_hr":0,"calories":400.0,"year":2024,"week":"2024-W32","dow":2,"month":"2024-08"},{"id":"12076569687","date":"2024-08-06","name":"Morning Run","dist_km":10.04,"moving_time_s":3135,"pace":5.205,"elev":2.5,"avg_hr":0,"calories":503.0,"year":2024,"week":"2024-W32","dow":1,"month":"2024-08"},{"id":"12061546819","date":"2024-08-04","name":"Morning Run","dist_km":18.01,"moving_time_s":5767,"pace":5.336,"elev":12.4,"avg_hr":0,"calories":882.0,"year":2024,"week":"2024-W31","dow":6,"month":"2024-08"},{"id":"12043497029","date":"2024-08-02","name":"Morning Run","dist_km":8.01,"moving_time_s":2336,"pace":4.861,"elev":2.5,"avg_hr":0,"calories":364.0,"year":2024,"week":"2024-W31","dow":4,"month":"2024-08"},{"id":"12030465994","date":"2024-07-31","name":"Morning Run","dist_km":10.02,"moving_time_s":3084,"pace":5.128,"elev":2.6,"avg_hr":0,"calories":470.0,"year":2024,"week":"2024-W31","dow":2,"month":"2024-07"},{"id":"12010660154","date":"2024-07-29","name":"Morning Run","dist_km":10.03,"moving_time_s":3157,"pace":5.247,"elev":2.6,"avg_hr":0,"calories":500.0,"year":2024,"week":"2024-W31","dow":0,"month":"2024-07"},{"id":"11985158873","date":"2024-07-26","name":"Morning Run","dist_km":9.0,"moving_time_s":2633,"pace":4.874,"elev":2.5,"avg_hr":0,"calories":437.0,"year":2024,"week":"2024-W30","dow":4,"month":"2024-07"},{"id":"11968066905","date":"2024-07-24","name":"Morning Run","dist_km":10.02,"moving_time_s":2922,"pace":4.859,"elev":2.5,"avg_hr":0,"calories":470.0,"year":2024,"week":"2024-W30","dow":2,"month":"2024-07"},{"id":"11951055195","date":"2024-07-22","name":"Morning Run","dist_km":12.01,"moving_time_s":3686,"pace":5.114,"elev":5.0,"avg_hr":0,"calories":551.0,"year":2024,"week":"2024-W30","dow":0,"month":"2024-07"},{"id":"11937367508","date":"2024-07-20","name":"Afternoon Run","dist_km":12.01,"moving_time_s":3797,"pace":5.269,"elev":6.2,"avg_hr":0,"calories":565.0,"year":2024,"week":"2024-W29","dow":5,"month":"2024-07"},{"id":"11927155921","date":"2024-07-19","name":"Morning Run","dist_km":11.01,"moving_time_s":3624,"pace":5.487,"elev":19.1,"avg_hr":0,"calories":565.0,"year":2024,"week":"2024-W29","dow":4,"month":"2024-07"},{"id":"11915359762","date":"2024-07-17","name":"Evening Run","dist_km":8.01,"moving_time_s":2394,"pace":4.981,"elev":0.0,"avg_hr":0,"calories":348.0,"year":2024,"week":"2024-W29","dow":2,"month":"2024-07"},{"id":"11898354487","date":"2024-07-15","name":"Evening Run","dist_km":11.0,"moving_time_s":3615,"pace":5.479,"elev":11.2,"avg_hr":0,"calories":543.0,"year":2024,"week":"2024-W29","dow":0,"month":"2024-07"},{"id":"11879169499","date":"2024-07-13","name":"Lunch Run","dist_km":16.01,"moving_time_s":5244,"pace":5.46,"elev":8.3,"avg_hr":0,"calories":810.0,"year":2024,"week":"2024-W28","dow":5,"month":"2024-07"},{"id":"11830271008","date":"2024-07-07","name":"Morning Run","dist_km":30.11,"moving_time_s":10019,"pace":5.546,"elev":15.3,"avg_hr":0,"calories":1395.0,"year":2024,"week":"2024-W27","dow":6,"month":"2024-07"},{"id":"11824760100","date":"2024-07-05","name":"Evening Run","dist_km":6.02,"moving_time_s":1756,"pace":4.859,"elev":3.2,"avg_hr":0,"calories":265.0,"year":2024,"week":"2024-W27","dow":4,"month":"2024-07"},{"id":"11802878946","date":"2024-07-03","name":"Evening Run","dist_km":9.02,"moving_time_s":2849,"pace":5.262,"elev":0.0,"avg_hr":0,"calories":405.0,"year":2024,"week":"2024-W27","dow":2,"month":"2024-07"},{"id":"11786610147","date":"2024-07-01","name":"Evening Run","dist_km":10.04,"moving_time_s":3341,"pace":5.545,"elev":0.0,"avg_hr":0,"calories":467.0,"year":2024,"week":"2024-W27","dow":0,"month":"2024-07"},{"id":"11775269572","date":"2024-06-30","name":"Morning Run","dist_km":16.01,"moving_time_s":5405,"pace":5.626,"elev":8.7,"avg_hr":0,"calories":839.0,"year":2024,"week":"2024-W26","dow":6,"month":"2024-06"},{"id":"11748420990","date":"2024-06-26","name":"Evening Run","dist_km":10.01,"moving_time_s":2953,"pace":4.918,"elev":0.0,"avg_hr":0,"calories":422.0,"year":2024,"week":"2024-W26","dow":2,"month":"2024-06"},{"id":"11720431873","date":"2024-06-23","name":"Morning Run","dist_km":22.03,"moving_time_s":7525,"pace":5.692,"elev":26.2,"avg_hr":0,"calories":1050.0,"year":2024,"week":"2024-W25","dow":6,"month":"2024-06"},{"id":"11648837416","date":"2024-06-13","name":"Afternoon Run","dist_km":7.03,"moving_time_s":2359,"pace":5.595,"elev":26.0,"avg_hr":0,"calories":332.0,"year":2024,"week":"2024-W24","dow":3,"month":"2024-06"},{"id":"11619304003","date":"2024-06-10","name":"Morning Run","dist_km":10.03,"moving_time_s":3251,"pace":5.401,"elev":2.1,"avg_hr":0,"calories":540.0,"year":2024,"week":"2024-W24","dow":0,"month":"2024-06"},{"id":"11602828811","date":"2024-06-07","name":"Morning Run","dist_km":10.01,"moving_time_s":2946,"pace":4.904,"elev":3.4,"avg_hr":0,"calories":471.0,"year":2024,"week":"2024-W23","dow":4,"month":"2024-06"},{"id":"11576316289","date":"2024-06-05","name":"Night Run","dist_km":10.01,"moving_time_s":3154,"pace":5.252,"elev":0.0,"avg_hr":0,"calories":465.0,"year":2024,"week":"2024-W23","dow":2,"month":"2024-06"},{"id":"11555897236","date":"2024-06-02","name":"Morning Run","dist_km":22.02,"moving_time_s":7324,"pace":5.543,"elev":17.0,"avg_hr":0,"calories":1106.0,"year":2024,"week":"2024-W22","dow":6,"month":"2024-06"},{"id":"11521483901","date":"2024-05-29","name":"Night Run","dist_km":12.03,"moving_time_s":3710,"pace":5.14,"elev":0.0,"avg_hr":0,"calories":567.0,"year":2024,"week":"2024-W22","dow":2,"month":"2024-05"},{"id":"11503302087","date":"2024-05-26","name":"Morning Run","dist_km":22.06,"moving_time_s":7339,"pace":5.546,"elev":51.7,"avg_hr":0,"calories":1137.0,"year":2024,"week":"2024-W21","dow":6,"month":"2024-05"},{"id":"11483266864","date":"2024-05-24","name":"Night Run","dist_km":6.44,"moving_time_s":1778,"pace":4.604,"elev":0.0,"avg_hr":0,"calories":232.0,"year":2024,"week":"2024-W21","dow":4,"month":"2024-05"},{"id":"11467960337","date":"2024-05-22","name":"Night Run","dist_km":10.01,"moving_time_s":2950,"pace":4.913,"elev":0.0,"avg_hr":0,"calories":434.0,"year":2024,"week":"2024-W21","dow":2,"month":"2024-05"},{"id":"11459966344","date":"2024-05-20","name":"Evening Run","dist_km":12.25,"moving_time_s":3896,"pace":5.301,"elev":0.0,"avg_hr":0,"calories":566.0,"year":2024,"week":"2024-W21","dow":0,"month":"2024-05"},{"id":"11421102640","date":"2024-05-16","name":"Night Run","dist_km":10.01,"moving_time_s":2957,"pace":4.924,"elev":0.0,"avg_hr":0,"calories":396.0,"year":2024,"week":"2024-W20","dow":3,"month":"2024-05"},{"id":"11412866383","date":"2024-05-14","name":"Evening Run","dist_km":12.02,"moving_time_s":3702,"pace":5.132,"elev":0.0,"avg_hr":0,"calories":589.0,"year":2024,"week":"2024-W20","dow":1,"month":"2024-05"},{"id":"11395166777","date":"2024-05-12","name":"Lunch Run","dist_km":18.02,"moving_time_s":5955,"pace":5.509,"elev":101.7,"avg_hr":0,"calories":966.0,"year":2024,"week":"2024-W19","dow":6,"month":"2024-05"},{"id":"11381314158","date":"2024-05-10","name":"Evening Run","dist_km":8.01,"moving_time_s":2218,"pace":4.615,"elev":2.2,"avg_hr":0,"calories":330.0,"year":2024,"week":"2024-W19","dow":4,"month":"2024-05"},{"id":"11372812174","date":"2024-05-08","name":"Evening Run","dist_km":10.01,"moving_time_s":3155,"pace":5.252,"elev":4.3,"avg_hr":0,"calories":489.0,"year":2024,"week":"2024-W19","dow":2,"month":"2024-05"},{"id":"11349560773","date":"2024-05-06","name":"Evening Run","dist_km":12.02,"moving_time_s":3793,"pace":5.258,"elev":11.5,"avg_hr":0,"calories":596.0,"year":2024,"week":"2024-W19","dow":0,"month":"2024-05"},{"id":"11341021981","date":"2024-05-05","name":"Afternoon Run","dist_km":9.59,"moving_time_s":2943,"pace":5.113,"elev":2.0,"avg_hr":0,"calories":454.0,"year":2024,"week":"2024-W18","dow":6,"month":"2024-05"},{"id":"11283305028","date":"2024-04-28","name":"Morning Run","dist_km":21.05,"moving_time_s":6625,"pace":5.245,"elev":66.1,"avg_hr":0,"calories":1066.0,"year":2024,"week":"2024-W17","dow":6,"month":"2024-04"},{"id":"11264352813","date":"2024-04-25","name":"Evening Run","dist_km":9.03,"moving_time_s":2760,"pace":5.095,"elev":33.4,"avg_hr":0,"calories":437.0,"year":2024,"week":"2024-W17","dow":3,"month":"2024-04"},{"id":"11250477025","date":"2024-04-23","name":"Evening Run","dist_km":9.01,"moving_time_s":2647,"pace":4.895,"elev":37.9,"avg_hr":0,"calories":402.0,"year":2024,"week":"2024-W17","dow":1,"month":"2024-04"},{"id":"11233282378","date":"2024-04-21","name":"Lunch Run","dist_km":15.01,"moving_time_s":4751,"pace":5.275,"elev":23.2,"avg_hr":0,"calories":750.0,"year":2024,"week":"2024-W16","dow":6,"month":"2024-04"},{"id":"11219820346","date":"2024-04-19","name":"Evening Run","dist_km":9.02,"moving_time_s":2664,"pace":4.922,"elev":21.3,"avg_hr":0,"calories":368.0,"year":2024,"week":"2024-W16","dow":4,"month":"2024-04"},{"id":"11206785427","date":"2024-04-18","name":"Night Run","dist_km":10.01,"moving_time_s":3112,"pace":5.182,"elev":0.0,"avg_hr":0,"calories":482.0,"year":2024,"week":"2024-W16","dow":3,"month":"2024-04"},{"id":"11183969679","date":"2024-04-14","name":"Afternoon Run","dist_km":18.01,"moving_time_s":5783,"pace":5.351,"elev":0.0,"avg_hr":0,"calories":912.0,"year":2024,"week":"2024-W15","dow":6,"month":"2024-04"},{"id":"11161218321","date":"2024-04-11","name":"Evening Run","dist_km":9.01,"moving_time_s":2663,"pace":4.925,"elev":6.7,"avg_hr":0,"calories":396.0,"year":2024,"week":"2024-W15","dow":3,"month":"2024-04"},{"id":"11146089976","date":"2024-04-09","name":"Evening Run","dist_km":10.01,"moving_time_s":3040,"pace":5.063,"elev":0.0,"avg_hr":0,"calories":471.0,"year":2024,"week":"2024-W15","dow":1,"month":"2024-04"},{"id":"11129267138","date":"2024-04-07","name":"Morning Run","dist_km":21.18,"moving_time_s":7049,"pace":5.547,"elev":11.5,"avg_hr":0,"calories":1134.0,"year":2024,"week":"2024-W14","dow":6,"month":"2024-04"},{"id":"11111356612","date":"2024-04-05","name":"Morning Run","dist_km":7.0,"moving_time_s":2101,"pace":5.001,"elev":2.5,"avg_hr":0,"calories":332.0,"year":2024,"week":"2024-W14","dow":4,"month":"2024-04"},{"id":"11101845761","date":"2024-04-03","name":"Evening Run","dist_km":12.03,"moving_time_s":3792,"pace":5.253,"elev":0.0,"avg_hr":0,"calories":609.0,"year":2024,"week":"2024-W14","dow":2,"month":"2024-04"},{"id":"11052664259","date":"2024-03-27","name":"Evening Run","dist_km":7.03,"moving_time_s":2293,"pace":5.439,"elev":0.0,"avg_hr":0,"calories":321.0,"year":2024,"week":"2024-W13","dow":2,"month":"2024-03"},{"id":"11045905774","date":"2024-03-27","name":"Night Run","dist_km":10.02,"moving_time_s":3122,"pace":5.196,"elev":0.0,"avg_hr":0,"calories":488.0,"year":2024,"week":"2024-W13","dow":2,"month":"2024-03"},{"id":"11045904898","date":"2024-03-25","name":"Evening Run","dist_km":8.05,"moving_time_s":2487,"pace":5.147,"elev":0.0,"avg_hr":0,"calories":370.0,"year":2024,"week":"2024-W13","dow":0,"month":"2024-03"},{"id":"11017814645","date":"2024-03-22","name":"Evening Run","dist_km":18.03,"moving_time_s":6116,"pace":5.654,"elev":33.5,"avg_hr":0,"calories":894.0,"year":2024,"week":"2024-W12","dow":4,"month":"2024-03"},{"id":"11017812313","date":"2024-03-21","name":"Morning Run","dist_km":7.01,"moving_time_s":2031,"pace":4.826,"elev":2.3,"avg_hr":0,"calories":263.0,"year":2024,"week":"2024-W12","dow":3,"month":"2024-03"},{"id":"10992202869","date":"2024-03-19","name":"Morning Run","dist_km":10.02,"moving_time_s":3150,"pace":5.239,"elev":13.2,"avg_hr":0,"calories":477.0,"year":2024,"week":"2024-W12","dow":1,"month":"2024-03"},{"id":"10983066166","date":"2024-03-17","name":"Evening Run","dist_km":6.02,"moving_time_s":1786,"pace":4.944,"elev":0.0,"avg_hr":0,"calories":236.0,"year":2024,"week":"2024-W11","dow":6,"month":"2024-03"},{"id":"10968277159","date":"2024-03-16","name":"Night Run","dist_km":16.02,"moving_time_s":5209,"pace":5.418,"elev":2.6,"avg_hr":0,"calories":788.0,"year":2024,"week":"2024-W11","dow":5,"month":"2024-03"},{"id":"10959814486","date":"2024-03-14","name":"Afternoon Run","dist_km":8.03,"moving_time_s":2364,"pace":4.908,"elev":0.0,"avg_hr":0,"calories":359.0,"year":2024,"week":"2024-W11","dow":3,"month":"2024-03"},{"id":"10947440352","date":"2024-03-12","name":"Evening Run","dist_km":10.02,"moving_time_s":3164,"pace":5.261,"elev":0.0,"avg_hr":0,"calories":481.0,"year":2024,"week":"2024-W11","dow":1,"month":"2024-03"},{"id":"10929880658","date":"2024-03-09","name":"Morning Run","dist_km":14.01,"moving_time_s":4749,"pace":5.649,"elev":32.4,"avg_hr":0,"calories":801.0,"year":2024,"week":"2024-W10","dow":5,"month":"2024-03"},{"id":"10929880527","date":"2024-03-08","name":"Night Run","dist_km":7.01,"moving_time_s":1938,"pace":4.609,"elev":0.0,"avg_hr":0,"calories":270.0,"year":2024,"week":"2024-W10","dow":4,"month":"2024-03"},{"id":"10929880817","date":"2024-03-06","name":"Night Run","dist_km":9.01,"moving_time_s":2751,"pace":5.089,"elev":0.0,"avg_hr":0,"calories":407.0,"year":2024,"week":"2024-W10","dow":2,"month":"2024-03"},{"id":"10929880511","date":"2024-03-05","name":"Night Run","dist_km":10.02,"moving_time_s":3181,"pace":5.292,"elev":0.0,"avg_hr":0,"calories":468.0,"year":2024,"week":"2024-W10","dow":1,"month":"2024-03"},{"id":"10929880855","date":"2024-03-01","name":"Evening Run","dist_km":14.02,"moving_time_s":4755,"pace":5.653,"elev":22.9,"avg_hr":0,"calories":760.0,"year":2024,"week":"2024-W09","dow":4,"month":"2024-03"},{"id":"10929880665","date":"2024-02-28","name":"Evening Run","dist_km":8.03,"moving_time_s":2499,"pace":5.189,"elev":0.0,"avg_hr":0,"calories":380.0,"year":2024,"week":"2024-W09","dow":2,"month":"2024-02"},{"id":"10929880850","date":"2024-02-27","name":"Night Run","dist_km":10.03,"moving_time_s":3183,"pace":5.287,"elev":0.0,"avg_hr":0,"calories":494.0,"year":2024,"week":"2024-W09","dow":1,"month":"2024-02"},{"id":"10929880497","date":"2024-02-24","name":"Morning Run","dist_km":6.42,"moving_time_s":1904,"pace":4.942,"elev":5.2,"avg_hr":0,"calories":292.0,"year":2024,"week":"2024-W08","dow":5,"month":"2024-02"},{"id":"10929880646","date":"2024-02-21","name":"Morning Run","dist_km":12.03,"moving_time_s":4114,"pace":5.699,"elev":20.6,"avg_hr":0,"calories":622.0,"year":2024,"week":"2024-W08","dow":2,"month":"2024-02"},{"id":"10929880637","date":"2024-02-19","name":"Morning Run","dist_km":8.61,"moving_time_s":2884,"pace":5.582,"elev":0.0,"avg_hr":0,"calories":440.0,"year":2024,"week":"2024-W08","dow":0,"month":"2024-02"},{"id":"10929880685","date":"2024-02-16","name":"Lunch Run","dist_km":7.02,"moving_time_s":2270,"pace":5.388,"elev":41.5,"avg_hr":0,"calories":338.0,"year":2024,"week":"2024-W07","dow":4,"month":"2024-02"},{"id":"10929880678","date":"2024-02-13","name":"Morning Run","dist_km":8.03,"moving_time_s":2606,"pace":5.412,"elev":43.2,"avg_hr":0,"calories":379.0,"year":2024,"week":"2024-W07","dow":1,"month":"2024-02"},{"id":"10929880549","date":"2024-02-11","name":"Morning Run","dist_km":12.05,"moving_time_s":4211,"pace":5.823,"elev":65.2,"avg_hr":0,"calories":658.0,"year":2024,"week":"2024-W06","dow":6,"month":"2024-02"},{"id":"10929880652","date":"2024-02-09","name":"Morning Run","dist_km":7.03,"moving_time_s":2203,"pace":5.225,"elev":28.6,"avg_hr":0,"calories":316.0,"year":2024,"week":"2024-W06","dow":4,"month":"2024-02"},{"id":"10929880615","date":"2024-02-06","name":"Morning Run","dist_km":8.03,"moving_time_s":2676,"pace":5.555,"elev":28.7,"avg_hr":0,"calories":367.0,"year":2024,"week":"2024-W06","dow":1,"month":"2024-02"},{"id":"10929880820","date":"2024-02-02","name":"Morning Run","dist_km":10.77,"moving_time_s":3604,"pace":5.576,"elev":41.7,"avg_hr":0,"calories":500.0,"year":2024,"week":"2024-W05","dow":4,"month":"2024-02"}];

const ORANGE = "#FC4C02";
const VO2_DATA = [
  { month: "Jun 25", value: 50.0 },
  { month: "Jul 25", value: 51.2 },
  { month: "Aug 25", value: 48.9 },
  { month: "Sep 25", value: 50.1 },
  { month: "Oct 25", value: 49.3 },
  { month: "Nov 25", value: 51.1 },
  { month: "Dic 25", value: 51.1 },
  { month: "Ene 26", value: 51.7 },
  { month: "Feb 26", value: 53.5 },
  { month: "Mar 26", value: 52.6 },
  { month: "Abr 26", value: 52.6 },
  { month: "May 26", value: 50.1 },
];

// VO2 max reference ranges for women 30-39 (ml/kg/min)
// Source: ACSM guidelines
const VO2_RANGES = [
  { label: "Muy bajo",   min: 0,    max: 27.9, color: "#e84800" },
  { label: "Bajo",       min: 28,   max: 31.9, color: "#e88600" },
  { label: "Aceptable",  min: 32,   max: 35.9, color: "#d4c017" },
  { label: "Bueno",      min: 36,   max: 40.9, color: "#4caf50" },
  { label: "Excelente",  min: 41,   max: 46.9, color: "#2196f3" },
  { label: "Superior",   min: 47,   max: 999,  color: "#9c27b0" },
];

const getVO2Category = (v) => VO2_RANGES.find(r => v >= r.min && v <= r.max) || VO2_RANGES[VO2_RANGES.length - 1];

const ORANGE_DIM = "#e84800aa";
const DARK_BG = "#1a1a1a";
const CARD_BG = "#242424";
const BORDER = "#333";
const TEXT_PRIMARY = "#f0f0f0";
const TEXT_MUTED = "#888";

const fmtPace = (p) => {
  if (!p || p <= 0) return "—";
  const min = Math.floor(p);
  const sec = Math.round((p - min) * 60);
  return `${min}:${sec.toString().padStart(2,"0")}`;
};

const fmtDist = (km, imperial) => imperial ? `${(km * 0.621371).toFixed(1)} mi` : `${km.toFixed(1)} km`;
const fmtElev = (m, imperial) => imperial ? `${Math.round(m * 3.28084)} ft` : `${Math.round(m)} m`;

const DOW_LABELS = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

const PRESETS = [
  { label: "7 días", days: 7 },
  { label: "30 días", days: 30 },
  { label: "3 meses", days: 91 },
  { label: "6 meses", days: 182 },
  { label: "1 año", days: 365 },
  { label: "Todo", days: null },
];

const TODAY = "2026-05-14";
const EARLIEST = RAW_DATA[RAW_DATA.length - 1].date;

const RACE_DISTANCES = [
  { label: "5k", value: 5 },
  { label: "10k", value: 10 },
  { label: "21k — Media Maratón", value: 21.0975 },
  { label: "42k — Maratón", value: 42.195 },
];

const HR_ZONES = [
  { zone: "Z1", name: "Recuperación",  pct: [0.50, 0.60], color: "#4a9eff", desc: "Trote muy suave, conversación fluida" },
  { zone: "Z2", name: "Aeróbico base", pct: [0.60, 0.70], color: "#4caf50", desc: "Base aeróbica, fondos largos" },
  { zone: "Z3", name: "Tempo",         pct: [0.70, 0.80], color: "#d4c017", desc: "Ritmo de carrera, esfuerzo moderado" },
  { zone: "Z4", name: "Umbral",        pct: [0.80, 0.90], color: "#e88600", desc: "Intervalos, zona de lactato" },
  { zone: "Z5", name: "VO₂ máx",       pct: [0.90, 1.00], color: "#e84800", desc: "Sprints, máximo esfuerzo" },
];

const RIEGEL_K = { "5k": 5, "10k": 10, "21k": 21.0975, "42k": 42.195 };
const RIEGEL_EXP = 1.06;

export default function RunningDashboard() {
  const [csvData, setCsvData] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [csvError, setCsvError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({
    raceName: "Maratón de Buenos Aires",
    raceDate: "2026-09-27",
    raceDist: 42.195,
    fcMax: 181,
    age: 34,
    sex: "F",
  });
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

  const applyPreset = (days) => {
    if (days === null) {
      setDateFrom(EARLIEST);
      setDateTo(TODAY);
      setActivePreset(null);
    } else {
      const to = new Date(TODAY);
      const from = new Date(TODAY);
      from.setDate(from.getDate() - days + 1);
      setDateFrom(from.toISOString().slice(0, 10));
      setDateTo(to.toISOString().slice(0, 10));
      setActivePreset(days);
    }
  };

  const parseCSV = (text) => {
    try {
      const lines = text.trim().split("\n");
      const header = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g,""));
      const dateIdx = header.findIndex(h => h === "Activity Date");
      const distIdx = header.findIndex(h => h === "Distance" && header.indexOf(h) > 10);
      const movingIdx = header.findIndex(h => h === "Moving Time");
      const elevIdx = header.findIndex(h => h === "Elevation Gain");
      const hrIdx = header.findIndex(h => h === "Average Heart Rate");
      const calIdx = header.findIndex(h => h === "Calories");
      const nameIdx = header.findIndex(h => h === "Activity Name");
      const typeIdx = header.findIndex(h => h === "Activity Type");

      if (dateIdx === -1 || distIdx === -1) {
        setCsvError("No se encontraron columnas de fecha o distancia. Verificá que sea el CSV de Strava.");
        return null;
      }

      const parsed = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].match(/(".*?"|[^,]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g) || [];
        const clean = (idx) => (row[idx] || "").replace(/^"|"$/g,"").trim();
        const dateStr = clean(dateIdx);
        if (!dateStr) continue;
        let dt;
        try { dt = new Date(dateStr); } catch { continue; }
        if (isNaN(dt)) continue;
        const distM = parseFloat(clean(distIdx)) || 0;
        const distKm = distM > 500 ? distM / 1000 : distM;
        if (distKm < 0.5) continue;
        const movingS = parseFloat(clean(movingIdx)) || 0;
        const pace = movingS > 0 && distKm > 0 ? (movingS / 60) / distKm : 0;
        if (pace > 0 && (pace < 2 || pace > 15)) continue;
        const type = clean(typeIdx) || "Run";
        if (!["Run","VirtualRun","TrailRun","Treadmill"].includes(type) && type !== "") {}
        const year = dt.getFullYear();
        const week = (() => {
          const d = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
          d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
          const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
          const wk = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
          return `${d.getUTCFullYear()}-W${String(wk).padStart(2,"0")}`;
        })();
        parsed.push({
          id: String(i),
          date: dt.toISOString().slice(0,10),
          name: clean(nameIdx) || "Run",
          dist_km: Math.round(distKm * 100) / 100,
          moving_time_s: Math.round(movingS),
          pace: Math.round(pace * 1000) / 1000,
          elev: parseFloat(clean(elevIdx)) || 0,
          avg_hr: parseFloat(clean(hrIdx)) || 0,
          calories: parseFloat(clean(calIdx)) || 0,
          year,
          week,
          dow: (dt.getDay() + 6) % 7,
          month: dt.toISOString().slice(0,7),
        });
      }
      if (parsed.length === 0) {
        setCsvError("No se encontraron actividades válidas en el archivo.");
        return null;
      }
      setCsvError("");
      return parsed.sort((a,b) => b.date.localeCompare(a.date));
    } catch(e) {
      setCsvError("Error al procesar el archivo. Asegurate de que sea un CSV válido de Strava.");
      return null;
    }
  };

  const handleFile = (file) => {
    if (!file || !file.name.endsWith(".csv")) {
      setCsvError("Por favor subí un archivo .csv");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = parseCSV(e.target.result);
      if (result) setCsvData(result);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (csvData && csvData.length) {
      setDateFrom(csvData[csvData.length-1].date);
      setDateTo(csvData[0].date);
    } else if (showDemo) {
      setDateFrom(EARLIEST);
      setDateTo(TODAY);
    }
  }, [csvData, showDemo]);

  const activeData = csvData || RAW_DATA;
  const dynamicEarliest = activeData && activeData.length ? activeData[activeData.length-1].date : EARLIEST;

  const filtered = useMemo(() =>
    activeData.filter(a => a.date >= dateFrom && a.date <= dateTo),
    [dateFrom, dateTo]
  );

  const kpis = useMemo(() => {
    const totalKm = filtered.reduce((s, a) => s + a.dist_km, 0);
    const totalElev = filtered.reduce((s, a) => s + a.elev, 0);
    const validPaces = filtered.filter(a => a.pace > 2 && a.pace < 12);
    const avgPace = validPaces.length ? validPaces.reduce((s, a) => s + a.pace, 0) / validPaces.length : 0;
    return {
      totalKm,
      count: filtered.length,
      avgPace,
      totalElev,
    };
  }, [filtered]);

  const weeklyData = useMemo(() => {
    const map = {};
    filtered.forEach(a => {
      if (!map[a.week]) map[a.week] = { week: a.week, km: 0 };
      map[a.week].km += a.dist_km;
    });
    const weeks = Object.values(map).sort((a, b) => a.week.localeCompare(b.week));
    const display = weeks.length > 26 ? weeks.slice(-26) : weeks;
    return display.map(w => {
      const [year, weekNum] = w.week.split("-W");
      const jan4 = new Date(parseInt(year), 0, 4);
      const startOfWeek1 = new Date(jan4);
      startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
      const weekStart = new Date(startOfWeek1);
      weekStart.setDate(startOfWeek1.getDate() + (parseInt(weekNum) - 1) * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      const fmt = (d) => `${d.getDate()}/${d.getMonth() + 1}`;
      return {
        ...w,
        label: `${fmt(weekStart)}–${fmt(weekEnd)}`,
        km: imperial ? parseFloat((w.km * 0.621371).toFixed(1)) : parseFloat(w.km.toFixed(1)),
      };
    });
  }, [filtered, imperial]);

  const scatterData = useMemo(() =>
    filtered
      .filter(a => a.pace > 3 && a.pace < 9)
      .map(a => ({
        dist: imperial ? parseFloat((a.dist_km * 0.621371).toFixed(2)) : a.dist_km,
        pace: a.pace,
        name: a.name,
        date: a.date,
      })),
    [filtered, imperial]
  );

  const dowData = useMemo(() => {
    const counts = Array(7).fill(0);
    filtered.forEach(a => counts[a.dow]++);
    const max = Math.max(...counts);
    return counts.map((c, i) => ({ day: DOW_LABELS[i], count: c, pct: max > 0 ? c / max : 0 }));
  }, [filtered]);

  const inputStyle = {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    color: TEXT_PRIMARY,
    borderRadius: 8,
    padding: "6px 12px",
    fontSize: 13,
    cursor: "pointer",
  };

  const cardStyle = {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: "20px 24px",
  };

  const fetchInsight = useCallback(async () => {
    if (!filtered.length) return;
    const key = `${dateFrom}|${dateTo}|${imperial}`;
    if (insightKey.current === key && insight) return;
    insightKey.current = key;
    setInsightLoading(true);
    setInsightError(false);
    setInsight("");

    const topPace = [...filtered].filter(a => a.pace > 3 && a.pace < 9).sort((a,b) => a.pace - b.pace).slice(0,3);
    const longestRun = [...filtered].sort((a,b) => b.dist_km - a.dist_km)[0];
    const validPaces = filtered.filter(a => a.pace > 3 && a.pace < 9);
    const avgPace = validPaces.length ? validPaces.reduce((s,a) => s + a.pace, 0) / validPaces.length : 0;
    const totalKm = filtered.reduce((s,a) => s + a.dist_km, 0);
    const totalElev = filtered.reduce((s,a) => s + a.elev, 0);
    const dowCounts = Array(7).fill(0);
    filtered.forEach(a => dowCounts[a.dow]++);
    const DOW = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];
    const favDay = DOW[dowCounts.indexOf(Math.max(...dowCounts))];
    const weeks = {};
    filtered.forEach(a => { weeks[a.week] = (weeks[a.week]||0) + a.dist_km; });
    const weekVals = Object.values(weeks);
    const avgWeekKm = weekVals.length ? weekVals.reduce((s,v)=>s+v,0)/weekVals.length : 0;
    const maxWeekKm = weekVals.length ? Math.max(...weekVals) : 0;
    const fmtP = (p) => { const m=Math.floor(p); const s=Math.round((p-m)*60); return `${m}:${s.toString().padStart(2,"0")}`; };

    const prompt = `Sos un coach de running. Con los datos de abajo escribí exactamente 2 oraciones en español: una que destaque lo más llamativo del período, y otra con una sugerencia concreta. Sin introducciones, sin listas, directo al punto.

Período: ${dateFrom} al ${dateTo}
Total actividades: ${filtered.length}
Kilómetros totales: ${totalKm.toFixed(1)} km
Ritmo promedio: ${fmtP(avgPace)} min/km
Elevación acumulada: ${Math.round(totalElev)} m
Semana promedio: ${avgWeekKm.toFixed(1)} km | Semana pico: ${maxWeekKm.toFixed(1)} km
Día favorito de entreno: ${favDay}
Top 3 ritmos más rápidos: ${topPace.map(a=>`${fmtP(a.pace)}/km (${a.dist_km.toFixed(1)}km, ${a.date})`).join(" · ")}
Salida más larga: ${longestRun ? `${longestRun.dist_km.toFixed(1)}km el ${longestRun.date} (${fmtP(longestRun.pace)}/km)` : "—"}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          stream: true,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const ev = JSON.parse(json);
            if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") {
              setInsight(prev => prev + ev.delta.text);
            }
          } catch {}
        }
      }
    } catch {
      setInsightError(true);
    } finally {
      setInsightLoading(false);
    }
  }, [filtered, dateFrom, dateTo, imperial, insight]);

  useEffect(() => {
    const t = setTimeout(() => fetchInsight(), 600);
    return () => clearTimeout(t);
  }, [dateFrom, dateTo]);

  const fetchVo2Insight = useCallback(async () => {
    if (vo2Loaded.current) return;
    vo2Loaded.current = true;
    setVo2Loading(true);
    setVo2Insight("");
    const current = VO2_DATA[VO2_DATA.length - 1].value;
    const first = VO2_DATA[0].value;
    const peak = Math.max(...VO2_DATA.map(d => d.value));
    const cat = getVO2Category(current);
    const prompt = `Sos un fisiólogo del ejercicio. En 2 oraciones en español explicá qué significa un VO2 máx de ${current} ml/kg/min para una mujer de 30-39 años (categoría: ${cat.label}), mencioná la mejora de ${first} a ${current} desde junio 2025, y terminá con una implicancia práctica para su running. Sin introducciones, directo.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          stream: true,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const ev = JSON.parse(json);
            if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") {
              setVo2Insight(prev => prev + ev.delta.text);
            }
          } catch {}
        }
      }
    } catch { setVo2Insight("No se pudo cargar la interpretación."); }
    finally { setVo2Loading(false); }
  }, []);

  useEffect(() => { fetchVo2Insight(); }, []);

  const fetchVo2Actions = useCallback(async () => {
    if (vo2ActLoaded.current) return;
    vo2ActLoaded.current = true;
    setVo2ActLoading(true);
    const current = VO2_DATA[VO2_DATA.length - 1].value;
    const peak = Math.max(...VO2_DATA.map(d => d.value));
    const prompt = `Sos un fisiólogo del ejercicio y coach de running. Devolvé ÚNICAMENTE un array JSON con exactamente 4 objetos. Cada objeto tiene: "titulo" (3-5 palabras, acción concreta), "detalle" (1 oración específica con números reales, orientada a subir el VO2 máx). Sin texto extra, sin markdown, solo el JSON.

Perfil: mujer 30-39 años, VO2 máx actual ${current} ml/kg/min (categoría Superior, >47), pico histórico ${peak} ml/kg/min. Enfocá en estrategias de entrenamiento aeróbico avanzado para pasar de Superior a Elite (>55 ml/kg/min).

Ejemplo: [{"titulo":"Intervalos al 95% FC máx","detalle":"Hacer 4x4 min al 95% de tu FC máx con 3 min de recuperación activa 2 veces por semana puede aumentar el VO2 en 2-3 ml/kg/min en 8 semanas."}]`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.find(b => b.type === "text")?.text || "[]";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setVo2Actions(Array.isArray(parsed) ? parsed : []);
    } catch { setVo2Actions([]); }
    finally { setVo2ActLoading(false); }
  }, []);

  useEffect(() => { fetchVo2Actions(); }, []);

  useEffect(() => {
    const tick = () => {
      const raceDate = new Date(config.raceDate + "T00:00:00");
      const diff = raceDate - new Date();
      if (diff <= 0) { setCountdown({ days:0, hours:0, mins:0, secs:0 }); return; }
      setCountdown({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000) / 60000),
        secs:  Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [config.raceDate]);

  const fetchRecs = useCallback(async () => {
    if (!filtered.length) return;
    const key = `${dateFrom}|${dateTo}`;
    if (recsKey.current === key && recs.length) return;
    recsKey.current = key;
    setRecsLoading(true);
    setRecsError(false);
    setRecs([]);

    const validPaces = filtered.filter(a => a.pace > 3 && a.pace < 9);
    const avgPace = validPaces.length ? validPaces.reduce((s,a) => s + a.pace,0)/validPaces.length : 0;
    const totalKm = filtered.reduce((s,a) => s + a.dist_km, 0);
    const weeks = {};
    filtered.forEach(a => { weeks[a.week] = (weeks[a.week]||0) + a.dist_km; });
    const weekVals = Object.values(weeks);
    const avgWeekKm = weekVals.length ? weekVals.reduce((s,v)=>s+v,0)/weekVals.length : 0;
    const dowCounts = Array(7).fill(0);
    filtered.forEach(a => dowCounts[a.dow]++);
    const activeDays = dowCounts.filter(c => c > 0).length;
    const longestRun = [...filtered].sort((a,b) => b.dist_km - a.dist_km)[0];
    const fmtP = (p) => { const m=Math.floor(p); const s=Math.round((p-m)*60); return `${m}:${s.toString().padStart(2,"0")}`; };

    const prompt = `Sos un coach de running experto. Basándote en los datos de abajo, devolvé ÚNICAMENTE un array JSON con exactamente 4 objetos. Cada objeto tiene: "titulo" (3-5 palabras, accionable), "detalle" (1 oración concreta y específica con los números del corredor). Sin texto extra, sin markdown, solo el JSON.

Datos:
- Período: ${dateFrom} al ${dateTo}
- Actividades: ${filtered.length} | Días activos/semana: ~${(activeDays/Math.max(weekVals.length,1)).toFixed(1)}
- KM totales: ${totalKm.toFixed(1)} | Promedio semanal: ${avgWeekKm.toFixed(1)} km
- Ritmo promedio: ${fmtP(avgPace)}/km
- Salida más larga: ${longestRun ? longestRun.dist_km.toFixed(1)+"km" : "—"}

Ejemplo de formato esperado:
[{"titulo":"Incorporá una sesión de intervalos","detalle":"Con tu ritmo promedio de X:XX/km, trabajar 6x400m al 90% te ayudaría a bajar de X:XX."}]`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.find(b => b.type === "text")?.text || "[]";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setRecs(Array.isArray(parsed) ? parsed : []);
    } catch {
      setRecsError(true);
    } finally {
      setRecsLoading(false);
    }
  }, [filtered, dateFrom, dateTo, recs]);

  useEffect(() => {
    const t = setTimeout(() => fetchRecs(), 800);
    return () => clearTimeout(t);
  }, [dateFrom, dateTo]);

  return (
    <div style={{ background: DARK_BG, minHeight: "100vh", fontFamily: "system-ui, sans-serif", color: TEXT_PRIMARY }}>

      {/* ── WELCOME SCREEN ── */}
      {!csvData && !showDemo && (
        <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px" }}>
          <div style={{ marginBottom:24, textAlign:"center" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:12 }}>
              <Activity size={28} color={ORANGE} />
              <span style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5 }}>Running Stats</span>
            </div>
            <p style={{ fontSize:15, color:TEXT_MUTED, maxWidth:380, lineHeight:1.6, margin:"0 auto" }}>
              Tu dashboard personal de running. Cargá tu CSV de Strava o Garmin para ver tus estadísticas, VO₂ máx, zonas de FC y más.
            </p>
          </div>

          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => document.getElementById("csv-input").click()}
            style={{ width:"100%", maxWidth:460, border:`2px dashed ${isDragging ? ORANGE : "#444"}`, borderRadius:16, padding:"40px 32px", textAlign:"center", cursor:"pointer", background: isDragging ? "#FC4C0210" : "#1e1e1e", transition:"all 0.2s", marginBottom:20 }}
          >
            <input id="csv-input" type="file" accept=".csv" style={{ display:"none" }} onChange={e => handleFile(e.target.files[0])} />
            <div style={{ fontSize:40, marginBottom:16 }}>📂</div>
            <p style={{ fontSize:15, fontWeight:700, color:TEXT_PRIMARY, margin:"0 0 8px" }}>Arrastrá tu CSV aquí</p>
            <p style={{ fontSize:13, color:TEXT_MUTED, margin:0 }}>o hacé clic para seleccionar el archivo</p>
            {csvError && <p style={{ fontSize:12, color:"#e84800", marginTop:12 }}>{csvError}</p>}
          </div>

          <div style={{ width:"100%", maxWidth:460, background:"#1e1e1e", border:`1px solid ${BORDER}`, borderRadius:12, padding:"16px 20px", marginBottom:20 }}>
            <p style={{ fontSize:12, fontWeight:600, color:TEXT_MUTED, marginBottom:12, textTransform:"uppercase", letterSpacing:.5 }}>¿Cómo exportar tu CSV?</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:16, flexShrink:0 }}>🟠</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:TEXT_PRIMARY, margin:0 }}>Strava</p>
                  <p style={{ fontSize:12, color:TEXT_MUTED, margin:"2px 0 0", lineHeight:1.5 }}>Configuración → Mi cuenta → Mis datos → Solicitar tus archivos → <code style={{ background:"#2a2a2a", padding:"1px 5px", borderRadius:4 }}>activities.csv</code></p>
                </div>
              </div>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:16, flexShrink:0 }}>🔵</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:TEXT_PRIMARY, margin:0 }}>Garmin Connect</p>
                  <p style={{ fontSize:12, color:TEXT_MUTED, margin:"2px 0 0", lineHeight:1.5 }}>Actividades → Exportar → CSV</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowDemo(true)}
            style={{ background:"transparent", border:`1px solid ${BORDER}`, color:TEXT_MUTED, borderRadius:10, padding:"10px 28px", fontSize:13, cursor:"pointer" }}
          >
            Ver demo con datos de ejemplo
          </button>
        </div>
      )}

      {/* ── MAIN DASHBOARD ── */}
      {(csvData || showDemo) && (
      <div style={{ padding: "24px 20px" }}>
      <h2 className="sr-only">Dashboard de estadísticas de running — Strava</h2>

      {/* ── CSV INPUT (hidden, triggered from footer) ── */}
      <input id="csv-input" type="file" accept=".csv" style={{ display:"none" }} onChange={e => handleFile(e.target.files[0])} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Activity size={22} color={ORANGE} />
          <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.3 }}>Running Stats</span>
          <span style={{ fontSize: 12, color: TEXT_MUTED, marginLeft: 4 }}>Strava · {filtered.length}/{activeData.length} actividades</span>
        </div>
        <div style={{ display:"flex", gap:8 }}>
        <button onClick={() => { setConfigDraft(null); setShowConfig(true); }}
          style={{ ...inputStyle, display:"flex", alignItems:"center", gap:6 }}>
          <RefreshCw size={13} /> Configurar
        </button>
        <button
          onClick={() => setImperial(!imperial)}
          style={{ ...inputStyle, background: imperial ? ORANGE : CARD_BG, color: imperial ? "#fff" : TEXT_MUTED, border: `1px solid ${imperial ? ORANGE : BORDER}` }}
        >
          {imperial ? "Imperial (mi)" : "Métrico (km)"}
        </button>
        </div>
      </div>

      {/* Date filter bar */}
      <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
        <Filter size={14} color={TEXT_MUTED} style={{ flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <input
            type="date"
            value={dateFrom}
            min={dynamicEarliest}
            max={dateTo}
            onChange={e => { setDateFrom(e.target.value); setActivePreset(null); }}
            style={{ ...inputStyle, colorScheme: "dark" }}
          />
          <span style={{ color: TEXT_MUTED, fontSize: 13 }}>→</span>
          <input
            type="date"
            value={dateTo}
            min={dateFrom}
            max={TODAY}
            onChange={e => { setDateTo(e.target.value); setActivePreset(null); }}
            style={{ ...inputStyle, colorScheme: "dark" }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => applyPreset(p.days)}
              style={{
                ...inputStyle,
                padding: "5px 11px",
                fontSize: 12,
                background: activePreset === p.days || (p.days === null && dateFrom === EARLIEST && dateTo === TODAY && !activePreset)
                  ? ORANGE : CARD_BG,
                color: activePreset === p.days || (p.days === null && dateFrom === EARLIEST && dateTo === TODAY && !activePreset)
                  ? "#fff" : TEXT_MUTED,
                border: `1px solid ${activePreset === p.days || (p.days === null && dateFrom === EARLIEST && dateTo === TODAY && !activePreset) ? ORANGE : BORDER}`,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>


      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24, marginTop: 16 }}>
        {[
          { icon: <TrendingUp size={18} color={ORANGE} />, label: "Total recorrido", value: fmtDist(kpis.totalKm, imperial) },
          { icon: <Activity size={18} color={ORANGE} />, label: "Actividades", value: kpis.count },
          { icon: <Zap size={18} color={ORANGE} />, label: "Ritmo promedio", value: imperial ? `${fmtPace(kpis.avgPace / 1.60934)}/mi` : `${fmtPace(kpis.avgPace)}/km` },
        ].map((k, i) => (
          <div key={i} style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {k.icon}
              <span style={{ fontSize: 12, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: 0.5 }}>{k.label}</span>
            </div>
            <span style={{ fontSize: 26, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1 }}>{k.value}</span>
          </div>
        ))}
      </div>

      {/* Weekly Volume Chart */}
      <div style={{ ...cardStyle, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <TrendingUp size={16} color={ORANGE} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Volumen semanal</span>
        </div>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={weeklyData} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: TEXT_MUTED, fontSize: 10, angle: -35, textAnchor: "end" }} axisLine={false} tickLine={false} interval={0} height={48} />
              <YAxis tick={{ fill: TEXT_MUTED, fontSize: 11 }} axisLine={false} tickLine={false} unit={imperial ? " mi" : " km"} width={48} />
              <Tooltip
                contentStyle={{ background: "#1e1e1e", border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: TEXT_PRIMARY }}
                formatter={(v) => [`${v} ${imperial ? "mi" : "km"}`, "Volumen"]}
                cursor={{ fill: "#ffffff08" }}
              />
              <Bar dataKey="km" fill={ORANGE} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ ...cardStyle, marginBottom: 16, borderLeft: `3px solid ${ORANGE}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Brain size={16} color={ORANGE} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Análisis del período</span>
            <span style={{ fontSize: 11, color: TEXT_MUTED, marginLeft: 2 }}>· generado por IA</span>
          </div>
          <button
            onClick={() => { insightKey.current = ""; fetchInsight(); }}
            title="Regenerar análisis"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: TEXT_MUTED, display: "flex", alignItems: "center", gap: 4, fontSize: 12, padding: "4px 8px", borderRadius: 6 }}
          >
            <RefreshCw size={13} style={{ animation: insightLoading ? "spin 1s linear infinite" : "none" }} />
            {insightLoading ? "Analizando..." : "Regenerar"}
          </button>
        </div>
        {insightError && <p style={{ fontSize: 13, color: "#e84800", margin: 0 }}>No se pudo conectar con la IA.</p>}
        {!insightError && !insight && !insightLoading && <p style={{ fontSize: 13, color: TEXT_MUTED, margin: 0 }}>Seleccioná un rango de fechas para generar el análisis.</p>}
        {(insight || insightLoading) && (
          <p style={{ fontSize: 14, color: TEXT_PRIMARY, lineHeight: 1.75, margin: 0 }}>
            {insight}
            {insightLoading && <span style={{ display: "inline-block", width: 8, height: 14, background: ORANGE, marginLeft: 3, verticalAlign: "middle", animation: "blink 0.8s step-end infinite" }} />}
          </p>
        )}
      </div>

      {/* Recommendations */}
      <div style={{ ...cardStyle, marginBottom: 16, borderLeft: `3px solid #4a9eff` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Zap size={16} color="#4a9eff" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Recomendaciones para mejorar</span>
            <span style={{ fontSize: 11, color: TEXT_MUTED, marginLeft: 2 }}>· generado por IA</span>
          </div>
          <button onClick={() => { recsKey.current = ""; fetchRecs(); }} style={{ background: "transparent", border: "none", cursor: "pointer", color: TEXT_MUTED, display: "flex", alignItems: "center", gap: 4, fontSize: 12, padding: "4px 8px", borderRadius: 6 }}>
            <RefreshCw size={13} style={{ animation: recsLoading ? "spin 1s linear infinite" : "none" }} />
            {recsLoading ? "Generando..." : "Regenerar"}
          </button>
        </div>
        {recsError && <p style={{ fontSize: 13, color: "#e84800", margin: 0 }}>No se pudo conectar. Intentá de nuevo.</p>}
        {!recsError && !recsLoading && recs.length === 0 && <p style={{ fontSize: 13, color: TEXT_MUTED, margin: 0 }}>Seleccioná un rango de fechas para generar recomendaciones.</p>}
        {recsLoading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1,2,3,4].map(i => <div key={i} style={{ height: 54, background: "#2a2a2a", borderRadius: 8, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i*0.1}s` }} />)}
          </div>
        )}
        {!recsLoading && recs.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recs.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#2a2a2a", borderRadius: 8, padding: "12px 14px" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#4a9eff", minWidth: 20, lineHeight: 1.5 }}>{i + 1}.</span>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY, lineHeight: 1.4 }}>{r.titulo}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: TEXT_MUTED, lineHeight: 1.55 }}>{r.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* VO2 Max Block */}
      <div style={{ ...cardStyle, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Heart size={16} color="#e040fb" />
          <span style={{ fontSize: 14, fontWeight: 600 }}>VO₂ Máx</span>
          <span style={{ fontSize: 11, color: TEXT_MUTED, marginLeft: 2 }}>· mujer 30-39 · ACSM</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center", marginBottom: 24 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: getVO2Category(VO2_DATA[VO2_DATA.length-1].value).color, lineHeight: 1 }}>
              {VO2_DATA[VO2_DATA.length-1].value}
            </div>
            <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 4 }}>ml/kg/min</div>
            <div style={{ marginTop: 8, display: "inline-block", background: getVO2Category(VO2_DATA[VO2_DATA.length-1].value).color + "22", border: `1px solid ${getVO2Category(VO2_DATA[VO2_DATA.length-1].value).color}66`, borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 600, color: getVO2Category(VO2_DATA[VO2_DATA.length-1].value).color }}>
              {getVO2Category(VO2_DATA[VO2_DATA.length-1].value).label}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {VO2_RANGES.slice().reverse().map(r => {
                const isCurrent = getVO2Category(VO2_DATA[VO2_DATA.length-1].value).label === r.label;
                return (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, flexShrink: 0, boxShadow: isCurrent ? `0 0 6px ${r.color}` : "none" }} />
                    <div style={{ flex: 1, background: "#2a2a2a", borderRadius: 4, height: isCurrent ? 18 : 10, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.max(isCurrent ? 100 : 30, 2)}%`, background: r.color + (isCurrent ? "55" : "25"), borderRadius: 4, border: isCurrent ? `1px solid ${r.color}88` : "none" }} />
                    </div>
                    <span style={{ fontSize: 11, color: isCurrent ? r.color : TEXT_MUTED, fontWeight: isCurrent ? 600 : 400, width: 58, textAlign: "right" }}>{r.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: TEXT_MUTED, margin: "0 0 10px" }}>Evolución jun 2025 – may 2026</p>
          <div style={{ width: "100%", height: 160 }}>
            <ResponsiveContainer>
              <LineChart data={VO2_DATA} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: TEXT_MUTED, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[46, 56]} tick={{ fill: TEXT_MUTED, fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={{ background: "#1e1e1e", border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 12 }} formatter={v => [`${v} ml/kg/min`, "VO₂ máx"]} labelStyle={{ color: TEXT_PRIMARY }} />
                <ReferenceLine y={47} stroke="#9c27b0" strokeDasharray="4 4" strokeOpacity={0.5} label={{ value: "Superior ▸47", fill: "#9c27b0", fontSize: 10, position: "insideTopRight" }} />
                <Line type="monotone" dataKey="value" stroke="#e040fb" strokeWidth={2} dot={{ fill: "#e040fb", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Inicial (jun 25)", value: `${VO2_DATA[0].value}`, unit: "ml/kg/min" },
            { label: "Pico registrado", value: `${Math.max(...VO2_DATA.map(d=>d.value))}`, unit: "ml/kg/min" },
            { label: "Progreso total", value: `+${(VO2_DATA[VO2_DATA.length-1].value - VO2_DATA[0].value).toFixed(1)}`, unit: "ml/kg/min" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#2a2a2a", borderRadius: 8, padding: "10px 12px" }}>
              <p style={{ margin: 0, fontSize: 11, color: TEXT_MUTED }}>{s.label}</p>
              <p style={{ margin: "4px 0 0", fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY }}>{s.value} <span style={{ fontSize: 10, fontWeight: 400, color: TEXT_MUTED }}>{s.unit}</span></p>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14 }}>
          <p style={{ fontSize: 12, color: TEXT_MUTED, margin: "0 0 6px", display: "flex", alignItems: "center", gap: 6 }}>
            <Brain size={12} color={TEXT_MUTED} /> Interpretación IA
          </p>
          {vo2Loading && <p style={{ fontSize: 13, color: TEXT_MUTED, margin: 0 }}>Analizando...<span style={{ display: "inline-block", width: 7, height: 13, background: "#e040fb", marginLeft: 3, verticalAlign: "middle", animation: "blink 0.8s step-end infinite" }} /></p>}
          {vo2Insight && <p style={{ fontSize: 13, color: TEXT_PRIMARY, lineHeight: 1.7, margin: "0 0 16px" }}>{vo2Insight}</p>}
        </div>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14 }}>
          <p style={{ fontSize: 12, color: TEXT_MUTED, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <Zap size={12} color={TEXT_MUTED} /> Cómo mejorar tu VO₂ máx
          </p>
          {vo2ActLoading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[1,2,3].map(i => <div key={i} style={{ height: 50, background: "#2a2a2a", borderRadius: 8, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i*0.1}s` }} />)}
            </div>
          )}
          {!vo2ActLoading && vo2Actions.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {vo2Actions.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#2a2a2a", borderRadius: 8, padding: "11px 13px", borderLeft: `3px solid #e040fb44` }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#e040fb", minWidth: 20, lineHeight: 1.5, flexShrink: 0 }}>{i + 1}.</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY, lineHeight: 1.4 }}>{a.titulo}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 12, color: TEXT_MUTED, lineHeight: 1.55 }}>{a.detalle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CONFIG MODAL ── */}
      {showConfig && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={() => setShowConfig(false)}>
          <div style={{ background:"#1e1e1e", border:`1px solid ${BORDER}`, borderRadius:16, padding:"28px 32px", width:420, maxWidth:"90vw" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <span style={{ fontSize:16, fontWeight:700, color:TEXT_PRIMARY }}>Configuración</span>
              <button onClick={() => setShowConfig(false)} style={{ background:"transparent", border:"none", color:TEXT_MUTED, cursor:"pointer", fontSize:20, lineHeight:1 }}>✕</button>
            </div>
            {[
              { label:"Nombre de la carrera", key:"raceName", type:"text", placeholder:"ej: Maratón de Buenos Aires" },
              { label:"Fecha de la carrera", key:"raceDate", type:"date" },
              { label:"FC Máxima (bpm)", key:"fcMax", type:"number", placeholder:"ej: 181" },
              { label:"Edad", key:"age", type:"number", placeholder:"ej: 34" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, color:TEXT_MUTED, display:"block", marginBottom:5 }}>{f.label}</label>
                <input
                  type={f.type}
                  value={configDraft ? configDraft[f.key] : config[f.key]}
                  placeholder={f.placeholder}
                  onChange={e => setConfigDraft(prev => ({ ...(prev || config), [f.key]: f.type==="number" ? parseFloat(e.target.value)||0 : e.target.value }))}
                  style={{ width:"100%", background:"#2a2a2a", border:`1px solid ${BORDER}`, color:TEXT_PRIMARY, borderRadius:8, padding:"8px 12px", fontSize:13, colorScheme:"dark" }}
                />
              </div>
            ))}
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:12, color:TEXT_MUTED, display:"block", marginBottom:5 }}>Distancia de la carrera</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {RACE_DISTANCES.map(d => {
                  const cur = configDraft ? configDraft.raceDist : config.raceDist;
                  const active = Math.abs(cur - d.value) < 0.1;
                  return (
                    <button key={d.value} onClick={() => setConfigDraft(prev => ({ ...(prev || config), raceDist: d.value }))}
                      style={{ background: active ? ORANGE : "#2a2a2a", border:`1px solid ${active ? ORANGE : BORDER}`, color: active ? "#fff" : TEXT_MUTED, borderRadius:8, padding:"8px 12px", fontSize:12, cursor:"pointer", fontWeight: active ? 600 : 400 }}>
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:12, color:TEXT_MUTED, display:"block", marginBottom:5 }}>Sexo biológico</label>
              <div style={{ display:"flex", gap:8 }}>
                {[{label:"Femenino", val:"F"},{label:"Masculino", val:"M"}].map(s => {
                  const cur = configDraft ? configDraft.sex : config.sex;
                  return (
                    <button key={s.val} onClick={() => setConfigDraft(prev => ({ ...(prev || config), sex: s.val }))}
                      style={{ flex:1, background: cur===s.val ? ORANGE : "#2a2a2a", border:`1px solid ${cur===s.val ? ORANGE : BORDER}`, color: cur===s.val ? "#fff" : TEXT_MUTED, borderRadius:8, padding:"8px 12px", fontSize:12, cursor:"pointer" }}>
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => { if (configDraft) { setConfig(configDraft); setConfigDraft(null); } setShowConfig(false); }}
              style={{ width:"100%", background:ORANGE, border:"none", color:"#fff", borderRadius:10, padding:"12px 0", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              Guardar cambios
            </button>
          </div>
        </div>
      )}

      {/* ── COUNTDOWN ── */}
      <div style={{ marginTop:16, background:"linear-gradient(135deg,#1a1a1a 0%,#242424 100%)", border:`1px solid ${BORDER}`, borderRadius:16, padding:"24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, right:0, width:200, height:200, background:ORANGE, opacity:0.04, borderRadius:"50%", transform:"translate(60px,-60px)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, width:120, height:120, background:ORANGE, opacity:0.03, borderRadius:"50%", transform:"translate(-40px,40px)" }} />

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, position:"relative" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <Timer size={18} color={ORANGE} />
              <span style={{ fontSize:11, color:TEXT_MUTED, textTransform:"uppercase", letterSpacing:1 }}>Próxima carrera</span>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:TEXT_PRIMARY, lineHeight:1.1 }}>{config.raceName}</div>
            <div style={{ fontSize:13, color:TEXT_MUTED, marginTop:4 }}>
              {RACE_DISTANCES.find(d => Math.abs(d.value - config.raceDist) < 0.1)?.label.split(" ")[0] || `${config.raceDist}km`} · {new Date(config.raceDate + "T12:00:00").toLocaleDateString("es-AR", { day:"numeric", month:"long", year:"numeric" })}
            </div>
          </div>
          <button onClick={() => { setConfigDraft(null); setShowConfig(true); }}
            style={{ background:"#2a2a2a", border:`1px solid ${BORDER}`, color:TEXT_MUTED, borderRadius:8, padding:"6px 12px", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
            <RefreshCw size={12} /> Editar
          </button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16, position:"relative" }}>
          {[
            { val: countdown.days,  label: "días",     big: true },
            { val: countdown.hours, label: "horas",    big: false },
            { val: countdown.mins,  label: "minutos",  big: false },
            { val: countdown.secs,  label: "segundos", big: false },
          ].map((u, i) => (
            <div key={i} style={{ background: u.big ? "#FC4C0218" : "#2a2a2a", border:`1px solid ${u.big ? ORANGE+"55" : BORDER}`, borderRadius:12, padding:"16px 0", textAlign:"center" }}>
              <div style={{ fontSize: u.big ? 48 : 32, fontWeight:800, color: u.big ? ORANGE : TEXT_PRIMARY, lineHeight:1, fontVariantNumeric:"tabular-nums", letterSpacing:-1 }}>
                {String(u.val).padStart(2,"0")}
              </div>
              <div style={{ fontSize:10, color:TEXT_MUTED, marginTop:6, textTransform:"uppercase", letterSpacing:1 }}>{u.label}</div>
            </div>
          ))}
        </div>

        {(() => {
          const raceDate = new Date(config.raceDate + "T00:00:00");
          const startDate = new Date(TODAY);
          const total = raceDate - startDate;
          const elapsed = new Date() - startDate;
          const pct = Math.max(0, Math.min(100, (elapsed / total) * 100));
          const daysLeft = Math.round((raceDate - new Date()) / 86400000);
          return (
            <div style={{ position:"relative" }}>
              <div style={{ background:"#2a2a2a", borderRadius:8, height:8, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg, ${ORANGE}88, ${ORANGE})`, borderRadius:8, transition:"width 1s linear" }} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
                <span style={{ fontSize:11, color:TEXT_MUTED }}>Hoy · {new Date().toLocaleDateString("es-AR",{day:"numeric",month:"short"})}</span>
                <span style={{ fontSize:11, color: daysLeft < 14 ? ORANGE : TEXT_MUTED, fontWeight: daysLeft < 14 ? 600 : 400 }}>
                  {daysLeft > 0 ? `${daysLeft} días para correr` : "¡Es hoy!"}
                </span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── HR ZONES ── */}
      <div style={{ ...cardStyle, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Flame size={16} color="#e84800" />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Zonas de frecuencia cardíaca</span>
          <span style={{ fontSize: 11, color: TEXT_MUTED, marginLeft: 2 }}>· FC máx {config.fcMax} bpm</span>
        </div>
        {(() => {
          const totalRuns = activeData.filter(a => a.avg_hr > 0);
          const zoneCounts = HR_ZONES.map(z => {
            const lo = Math.round(config.fcMax * z.pct[0]);
            const hi = Math.round(config.fcMax * z.pct[1]);
            const count = totalRuns.filter(a => a.avg_hr >= lo && a.avg_hr < hi).length;
            return { ...z, lo, hi, count };
          });
          const maxCount = Math.max(...zoneCounts.map(z => z.count), 1);
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {zoneCounts.map((z, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: z.color, width: 20 }}>{z.zone}</span>
                    <span style={{ fontSize: 12, color: TEXT_PRIMARY, width: 110 }}>{z.name}</span>
                    <span style={{ fontSize: 11, color: TEXT_MUTED, width: 80 }}>{z.lo}–{z.hi} bpm</span>
                    <div style={{ flex: 1, background: "#2a2a2a", borderRadius: 4, height: 16, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(z.count / maxCount) * 100}%`, background: z.color + "bb", borderRadius: 4, minWidth: z.count > 0 ? 6 : 0, transition: "width 0.5s ease" }} />
                    </div>
                    <span style={{ fontSize: 12, color: TEXT_MUTED, width: 32, textAlign: "right" }}>{z.count}</span>
                  </div>
                  <p style={{ fontSize: 11, color: TEXT_MUTED, marginLeft: 130, marginBottom: 0 }}>{z.desc}</p>
                </div>
              ))}
              <p style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 6 }}>
                Basado en {totalRuns.length} actividades con datos de FC. {activeData.length - totalRuns.length} actividades sin datos de FC no incluidas.
              </p>
            </div>
          );
        })()}
      </div>

      {/* ── RACE TIME PREDICTOR ── */}
      <div style={{ ...cardStyle, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Target size={16} color={ORANGE} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Predictor de tiempos</span>
          <span style={{ fontSize: 11, color: TEXT_MUTED, marginLeft: 2 }}>· fórmula de Riegel · basado en tu ritmo histórico</span>
        </div>
        {(() => {
          const refPace = 4.875;
          const refDist = 10;
          const raceDist = config.raceDist;
          const fmtTime = (secs) => {
            const h = Math.floor(secs / 3600);
            const m = Math.floor((secs % 3600) / 60);
            const s = Math.round(secs % 60);
            return h > 0 ? `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}` : `${m}:${String(s).padStart(2,"0")}`;
          };
          const refSecs = refPace * 60 * refDist;
          const races = [
            { label: "5k",    dist: 5,        emoji: "⚡" },
            { label: "10k",   dist: 10,       emoji: "🏃" },
            { label: "21k",   dist: 21.0975,  emoji: "💪" },
            { label: RACE_DISTANCES.find(d=>Math.abs(d.value-config.raceDist)<0.1)?.label.split(' ')[0]||'42k', dist: config.raceDist, emoji: "🏁", isTarget:true },
          ];
          return (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {races.map((r, i) => {
                const predSecs = refSecs * Math.pow(r.dist / refDist, RIEGEL_EXP);
                const predPace = predSecs / 60 / r.dist;
                const isMarathon = r.isTarget;
                return (
                  <div key={i} style={{ background: isMarathon ? "#FC4C0218" : "#2a2a2a", border: isMarathon ? `1px solid ${ORANGE}55` : "none", borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{r.emoji}</div>
                    <div style={{ fontSize: 13, color: TEXT_MUTED, marginBottom: 6 }}>{r.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: isMarathon ? ORANGE : TEXT_PRIMARY, lineHeight: 1 }}>{fmtTime(predSecs)}</div>
                    <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 5 }}>{fmtTime(predPace * 60)}/km</div>
                  </div>
                );
              })}
            </div>
          );
        })()}
        <p style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 12 }}>Basado en ritmo de referencia 4:52/km en 10k. Los tiempos son estimaciones ideales en condiciones óptimas.</p>
      </div>

      {/* ── CSV FOOTER ── */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => document.getElementById("csv-footer-input").click()}
        style={{ marginTop:20, border:`1px dashed ${isDragging ? ORANGE : csvData ? "#4caf5066" : BORDER}`, borderRadius:8, padding:"10px 16px", background: isDragging ? "#FC4C0210" : "transparent", cursor:"pointer", display:"flex", alignItems:"center", gap:10, transition:"all 0.2s" }}
      >
        <input id="csv-footer-input" type="file" accept=".csv" style={{ display:"none" }} onChange={e => handleFile(e.target.files[0])} />
        <span style={{ fontSize:14 }}>{csvData ? "✅" : "📂"}</span>
        <span style={{ fontSize:12, color: csvData ? "#4caf50" : TEXT_MUTED, flex:1 }}>
          {csvData
            ? `${activeData.length} actividades · ${activeData[activeData.length-1]?.date} → ${activeData[0]?.date}`
            : "Subí tu CSV de Strava o Garmin para usar tus datos"}
        </span>
        {csvData
          ? <button onClick={e => { e.stopPropagation(); if(!showDemo){ setShowDemo(false); } setCsvData(null); setCsvError(""); setShowDemo(false); }}
              style={{ background:"transparent", border:`1px solid ${BORDER}`, color:TEXT_MUTED, borderRadius:6, padding:"3px 10px", fontSize:11, cursor:"pointer" }}>
              Cambiar datos
            </button>
          : <span style={{ fontSize:11, color:TEXT_MUTED, flexShrink:0 }}>Hacé clic o arrastrá</span>
        }
        {csvError && <span style={{ fontSize:11, color:"#e84800" }}>{csvError}</span>}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
      `}</style>
      </div>
      )}
    </div>
  );
}
