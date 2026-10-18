(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const STORE_KEY = "velaris-winter-state-v2";
  const QUOTES = [
    { text: "All we have to decide is what to do with the time that is given us.", source: "J.R.R. Tolkien, The Fellowship of the Ring" },
    { text: "It is our choices that show what we truly are, far more than our abilities.", source: "J.K. Rowling, Harry Potter and the Chamber of Secrets" },
    { text: "The world is full of magic things, patiently waiting for our senses to grow sharper.", source: "W.B. Yeats" },
    { text: "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.", source: "John C. Maxwell" },
    { text: "You are allowed to be both a masterpiece and a work in progress.", source: "A reminder for the road ahead" },
    { text: "You do not have to see the whole staircase. Just take the first step.", source: "Martin Luther King Jr. (commonly attributed)" }
  ];
  const CAT_MESSAGES = [
    "Your tiny familiar believes in you. Begin with one task.",
    "The library is quiet, the tea is warm, and your future is waiting.",
    "A little progress still counts as magic.",
    "Rest is part of the quest. Return when you are ready.",
    "One checked task is one promise kept to yourself."
  ];
  const todayISO = () => {
    const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };
  const addDays = (iso, n) => { const d = new Date(`${iso}T12:00:00`); d.setDate(d.getDate()+n); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
  const prettyDate = (iso, options={weekday:"long", day:"numeric", month:"long"}) => new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, options);
  const makeId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const starterTasks = () => {
    // Personalised UGC NET JRF plan. Exam date is provisionally 16 Dec 2026;
    // move tasks if NTA publishes a different Psychology date or the college timetable changes.
    const tasks = [];
    const add = (date, title, category, minutes, extra={}) => tasks.push({
      id:`net26-${date}-${tasks.length}`, date, title, category, minutes, completed:false,
      updated_at:new Date().toISOString(), ...extra
    });
    const study = (date, title, category, minutes) => add(date,title,category,minutes);
    const reminder = (date,title) => add(date,title,"Protected commitment",0,{reminder:true});

    // October: deliberately light because of MBA exams, MAPC submissions and NeuroSymp.
    study("2026-10-18","Paper 1: Higher Education — build one-page timeline from June/KSET/TGSET mistakes","Paper 1",60);
    study("2026-10-19","Paper 1: Environment — revise core conventions, reports and terms","Paper 1",45);
    study("2026-10-19","Paper 1: 10 Quant/DI questions; write the method for every miss","Paper 1",15);
    study("2026-10-21","Paper 1: Higher-ed commissions/policies — closed-book recall, then correct","Paper 1",40);
    study("2026-10-21","Paper 1: 10 Quant/DI questions","Paper 1",20);
    study("2026-10-22","Psychology Unit 2 diagnostic: 10 PYQs, sort misses into stats/research design","Psychology",60);
    reminder("2026-10-23","MBA end-term exam — no NET target");
    reminder("2026-10-24","MBA end-term exam — no NET target");
    reminder("2026-10-25","MAPC practical record + project synopsis drafting; NET is optional, not expected");
    reminder("2026-10-26","MAPC practical record + synopsis: protected submission work");
    reminder("2026-10-27","MBA end-term exam — no NET target");
    reminder("2026-10-28","MBA end-term + BITS NeuroSymp clash — protect commitments, no NET target");
    reminder("2026-10-29","BITS NeuroSymp — no NET target; finish/submit practical record if needed");
    reminder("2026-10-30","MBA end-term + MAPC practical record due — no NET target");
    reminder("2026-10-31","MBA end-term + MAPC synopsis due — no NET target");
    study("2026-11-01","Gentle restart: Paper 1 quant/DI drill + review October error notes","Paper 1",120);
    reminder("2026-11-02","MBA timetable / MAPC practical date expected — reassign flexible 8h and 2h weekdays");
    reminder("2026-11-03","MBA end-term exam — no NET target");

    // The 30-day syllabus pass: Nov 4-Dec 3. Weekly instructor sessions are watched
    // after the unit content is covered, at 2x (5h recording -> about 150 minutes).
    const dayPlan = {
      "2026-11-04":[["Unit 2: Research methods — designs, variables, sampling, hypotheses","Psychology",240],["Paper 1: Quant/DI timed drill + corrections","Paper 1",60],["Unit 2: start error log from 10 diagnostic PYQs","Psychology",60]],
      "2026-11-05":[["Unit 2: Statistics — distributions, central tendency, variability, normal curve","Psychology",240],["Paper 1: Quant/DI — ratios, percentages, averages","Paper 1",60]],
      "2026-11-06":[["Unit 2: inferential statistics — z, t, chi-square, ANOVA, assumptions","Psychology",90],["Paper 1: 15 Quant/DI questions; method-first corrections","Paper 1",30]],
      "2026-11-07":[["Unit 2: correlation, regression, effect size, Type I/II error, df and power","Psychology",180],["Unit 2: PYQs + MCQs; explain every wrong option","Psychology",150],["Paper 1: timed Quant/DI set","Paper 1",60],["Instructor recording: Unit 2 full revision + PYQs/MCQs at 2x","Recorded revision",150]],
      "2026-11-08":[["Catch-up buffer: Unit 2 weak points or unfinished work","Buffer",180],["RMET Phase 2 project work","RMET",90],["Instructor recording: Unit 2 follow-up/revision at 2x if available; otherwise revise errors","Recorded revision",150]],
      "2026-11-09":[["Unit 3: psychometrics — reliability, validity, norms, standardisation","Psychology",240],["Paper 1: Quant/DI drill","Paper 1",60]],
      "2026-11-10":[["Unit 3: item analysis, discrimination, difficulty, test construction, ethics","Psychology",240],["Paper 1: Logic — argument forms and fallacies","Paper 1",60]],
      "2026-11-11":[["Unit 3: PYQs/MCQs + error log; close Unit 3","Psychology",180],["Unit 4: biological basis — neuron, synapse, neurotransmitters overview","Psychology",180],["Paper 1: Quant/DI drill","Paper 1",60]],
      "2026-11-12":[["Unit 4: brain structures, lobes, limbic system, lateralisation","Psychology",240],["Paper 1: Research Aptitude — variables, sampling, designs","Paper 1",60]],
      "2026-11-13":[["Unit 4: endocrine system, sleep, sensation pathways and methods","Psychology",90],["Paper 1: 15 Quant/DI questions","Paper 1",30]],
      "2026-11-14":[["Unit 4: PYQs/MCQs; draw brain and pathway diagrams from memory","Psychology",180],["Unit 1: history timeline — schools, psychologists, dates and contributions","Psychology",150],["Paper 1: timed mixed set + corrections","Paper 1",60],["Instructor recording: Unit 4 full revision + PYQs/MCQs at 2x","Recorded revision",150]],
      "2026-11-15":[["Catch-up buffer: Unit 4/Unit 1 weak points","Buffer",180],["RMET Phase 2 project work","RMET",90],["Instructor recording: Unit 1 revision/PYQs at 2x, after first-pass notes","Recorded revision",150]],
      "2026-11-16":[["Unit 1: Western psychology history, schools, key experiments and dates","Psychology",240],["Paper 1: Teaching/Communication revision + PYQs","Paper 1",60]],
      "2026-11-17":[["Unit 1: PYQs/MCQs, sequence and match-the-following practice","Psychology",240],["Paper 1: Quant/DI drill","Paper 1",60]],
      "2026-11-18":[["Unit 9: clinical assessment, diagnosis/classification and intervention foundations","Psychology",240],["Paper 1: ICT timed PYQs","Paper 1",60]],
      "2026-11-19":[["Unit 9: psychotherapy schools, techniques, indications and key theorists","Psychology",240],["Paper 1: Higher Education policy/commissions retrieval practice","Paper 1",60]],
      "2026-11-20":[["Unit 9: developmental disorders, counselling, ethics and evidence","Psychology",90],["Paper 1: Quant/DI drill","Paper 1",30]],
      "2026-11-21":[["Unit 9: PYQs/MCQs; map therapy → theorist → technique","Psychology",180],["Unit 8: social cognition, attribution, attitudes and persuasion","Psychology",150],["Paper 1: mixed timed set","Paper 1",60],["Instructor recording: Unit 9 revision + PYQs/MCQs at 2x","Recorded revision",150]],
      "2026-11-22":[["Catch-up buffer: Unit 9/Unit 8 error log","Buffer",180],["RMET Phase 2 project work","RMET",90],["Instructor recording: Unit 8 revision/PYQs at 2x","Recorded revision",150]],
      "2026-11-23":[["Unit 8: classic studies, researchers, effects and social psychology names","Psychology",240],["Paper 1: Environment — conventions, reports and terms","Paper 1",60]],
      "2026-11-24":[["Unit 8: PYQs, passage-based questions, match pairs and error log","Psychology",240],["Paper 1: Quant/DI drill","Paper 1",60]],
      "2026-11-25":[["Unit 7: personality theories — psychoanalytic, trait, humanistic, social-cognitive","Psychology",240],["Paper 1: Logic — sequences, syllogisms and fallacies","Paper 1",60]],
      "2026-11-26":[["Unit 7: motivation, emotion, theories, theorist-concept distinctions","Psychology",240],["Paper 1: Quant/DI drill","Paper 1",60]],
      "2026-11-27":[["Unit 7: PYQs/MCQs; compare theorists and close Unit 7","Psychology",90],["Unit 5: attention, perception and memory foundations","Psychology",90]],
      "2026-11-28":[["Unit 5: memory models, forgetting, attention and perception theories","Psychology",180],["Unit 6: thinking, language, problem solving and decision-making","Psychology",150],["Paper 1: timed mixed set + corrections","Paper 1",60],["Instructor recording: Unit 7 revision/PYQs at 2x","Recorded revision",150]],
      "2026-11-29":[["Catch-up buffer: Units 5–7; prioritize missed PYQs","Buffer",180],["RMET Phase 2 project work","RMET",90],["Instructor recording: Unit 5/6 revision at 2x; choose the weaker unit","Recorded revision",150]],
      "2026-11-30":[["Unit 5: PYQs and error log; review known strength areas quickly","Psychology",180],["Unit 10: emerging areas — AI, health, community, environmental and applied topics","Psychology",60],["Paper 1: Quant/DI drill","Paper 1",60]],
      "2026-12-01":[["Unit 10: finish syllabus, definitions, current themes and PYQs","Psychology",180],["Unit 6: PYQs/MCQs and error log","Psychology",120],["Paper 1: Higher Education + Environment recall sheet","Paper 1",60]],
      "2026-12-02":[["Syllabus gap audit: list untouched topics and fix highest-risk Unit 2/4/8/9 gaps","Revision",240],["Paper 1: full weak-area set — Quant/DI, Higher-ed, Environment","Paper 1",60]],
      "2026-12-03":[["Syllabus completion deadline: finish remaining PDFs and flagged lectures; no perfectionism","Revision",240],["Psychology: 30 mixed PYQs and update error log","Psychology",60]]
    };
    const addDayPlan = (date, items) => items.forEach(([title,category,minutes])=>study(date,title,category,minutes));
    Object.entries(dayPlan).forEach(([date,items])=>addDayPlan(date,items));

    // Early December: exam rehearsal, with the known midterms and conference protected.
    study("2026-12-04","Full Psychology paper under timed conditions + detailed error analysis","Mock test",180);
    study("2026-12-04","Review highest-risk error log: research/stats, biology, social and therapy","Revision",120);
    study("2026-12-05","Full Paper 1 paper under timed conditions + detailed error analysis","Mock test",120);
    study("2026-12-05","Psychology weak-unit repair: 30 targeted PYQs","Psychology",120);
    study("2026-12-06","Combined mock rehearsal: Paper 1 + Psychology in exam conditions","Mock test",180);
    study("2026-12-06","Analyze only repeat errors; prepare final one-page ladders and formula sheet","Revision",120);
    for(let d=7;d<=11;d++) {
      const date=`2026-12-${String(d).padStart(2,'0')}`;
      reminder(date,"MBA midterms — keep NET maintenance to 60 minutes maximum");
      study(date,"NET maintenance: reread error log + one-page ladders; 10 mixed questions only","Revision",60);
    }
    for(let d=12;d<=14;d++) reminder(`2026-12-${d}`,"ACCS conference + travel — ZERO study planned; do not make up hours");
    study("2026-12-15","Final light review: formulas, timelines, names and repeat mistakes only","Revision",90);
    study("2026-12-15","Pack exam essentials, check admit-card instructions and sleep early","Personal",30);
    reminder("2026-12-16","PROVISIONAL UGC NET Psychology exam date — confirm when NTA publishes the subject shift");
    return tasks;
  };
  const legacySeed = window.LEGACY_IMPORT || {days:{},scores:{},resources:[],priorityTables:[]};
  const makeLegacyExtras = () => ({
    scores: JSON.parse(JSON.stringify(legacySeed.scores || {})),
    resources: JSON.parse(JSON.stringify(legacySeed.resources || [])),
    priorityTables: JSON.parse(JSON.stringify(legacySeed.priorityTables || [])),
    studyFrom: legacySeed.studyFrom || ""
  });
  const readState = () => {
    let parsed = null;
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) parsed = JSON.parse(raw);
    } catch (e) { console.warn("Local state could not be read", e); }
    const result = parsed && Array.isArray(parsed.tasks)
      ? {...parsed, notes: parsed.notes || {}, history: parsed.history || {}, extras: parsed.extras || makeLegacyExtras(), extrasUpdatedAt: parsed.extrasUpdatedAt || "2026-10-18T00:00:00.000Z"}
      : {tasks:starterTasks(), notes:{}, history:{}, extras:makeLegacyExtras(), extrasUpdatedAt:"2026-10-18T00:00:00.000Z", lastDay:""};
    // Import the original planner's completed work and notes once, without replacing
    // the newer NET plan or duplicating entries if the site is reopened.
    const known = new Set(result.tasks.map(t=>t.id));
    Object.entries(legacySeed.days || {}).forEach(([date,day]) => {
      result.history[date] = result.history[date] || {reps:day.reps || "", notes:day.notes || ""};
      (day.tasks || []).forEach(task => { if (!known.has(task.id)) { result.tasks.push(task); known.add(task.id); } });
      if (day.notes || day.reps) {
        const noteParts = [];
        if (day.notes) noteParts.push(day.notes);
        if (day.reps) noteParts.push("Recorded study minutes: " + day.reps);
        if (!(date in result.notes)) result.notes[date] = noteParts.join("\\n");
      }
    });
    // Keep the planned horizon open through the GATE date, but do not invent
    // any preparation tasks after the user's NET exam decision point.
    result.tasks = result.tasks.filter(t => !t.date || t.date <= "2026-12-16" || t.legacy);
    return result;
  };
  let state = readState(), currentView = "today", currentQuote = 0, supabase = null, user = null, syncBusy = false, channel = null;
  const config = window.APP_CONFIG || {};
  const cloudConfigured = config.SUPABASE_URL && !config.SUPABASE_URL.startsWith("YOUR_") && config.SUPABASE_ANON_KEY && !config.SUPABASE_ANON_KEY.startsWith("YOUR_");
  const setSync = (message, kind="local") => { $("#syncText").textContent = message; $("#syncPill").dataset.state = kind; };
  const saveLocal = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch(e) { setSync("Local save failed", "error"); } };
  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const visibleTasks = () => {
    const today = todayISO();
    let tasks = [...state.tasks].filter(t=>!t.deleted).sort((a,b)=>a.date.localeCompare(b.date) || (a.created_at||"").localeCompare(b.created_at||"") || a.title.localeCompare(b.title));
    if (currentView==="today") tasks = tasks.filter(t=>t.date===today);
    if (currentView==="week") { const end=addDays(today,6); tasks=tasks.filter(t=>t.date>=today&&t.date<=end); }
    if (currentView==="records") tasks = [];
    return tasks;
  };
  function render() {
    const tasks = visibleTasks(), done = tasks.filter(t=>t.completed).length;
    const today = todayISO(), todayTasks = state.tasks.filter(t=>!t.deleted && t.date===today);
    $("#dateLabel").textContent = currentView==="today" ? prettyDate(today).toUpperCase() : currentView==="week" ? "THE NEXT SEVEN DAYS" : currentView==="months" ? "THE YEAR IN CHAPTERS" : currentView==="records" ? "YOUR STUDY ARCHIVE" : "EVERY CHAPTER, ONE STEP AT A TIME";
    $("#viewTitle").textContent = currentView==="today" ? "Today's chapter" : currentView==="week" ? "This week's chapters" : currentView==="months" ? "Your months in the Night Court" : currentView==="records" ? "Scores, priorities & resources" : "Your quest log";
    $("#heroSub").textContent = currentView==="today" ? "You do not need to conquer the whole mountain today. Just take the next step." : currentView==="week" ? "Steady progress beats an impossible plan. Make the next move count." : currentView==="months" ? "Past work is imported from your original planner. NET tasks stop on 16 December; January and February are intentionally left open." : currentView==="records" ? "Your original score log, priority tables and resource checklist have been brought across." : "Every task is a small promise. Keep the ones you can, reschedule the ones you can't.";
    $("#taskHeading").textContent = currentView==="today" ? "Today's tasks" : currentView==="week" ? "Tasks for this week" : currentView==="months" ? "Month-by-month quest log" : currentView==="records" ? "Study records" : "All tasks";
    $("#progressText").textContent = `${done} / ${tasks.length} complete`;
    $("#progressFill").style.width = tasks.length ? `${done/tasks.length*100}%` : "0%";
    $("#totalDone").textContent = state.tasks.filter(t=>!t.deleted && t.completed).length;
    const days = new Set(state.tasks.filter(t=>!t.deleted && t.completed).map(t=>t.date)); let streak=0, cursor=today;
    while(days.has(cursor)){streak++;cursor=addDays(cursor,-1);}
    $("#streakCount").textContent = streak;
    $("#catMessage").textContent = CAT_MESSAGES[state.tasks.filter(t=>!t.deleted && t.completed).length % CAT_MESSAGES.length];
    const taskMarkup = t => `
      <article class="task-card ${t.completed?"done":""}" data-task-id="${escapeHTML(t.id)}">
        <button class="check-button" type="button" role="checkbox" aria-checked="${!!t.completed}" aria-label="${t.completed?"Mark incomplete":"Mark complete"}: ${escapeHTML(t.title)}" data-action="toggle">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5.1 5L20 5.5"/></svg>
        </button>
        <div class="task-body"><p class="task-title">${escapeHTML(t.title)}</p><div class="task-meta"><span>${escapeHTML(prettyDate(t.date,{month:"short",day:"numeric"}))}</span><span>·</span><span>${Number(t.minutes)||0} min</span><span class="category-tag">${escapeHTML(t.category||"Other")}</span></div></div>
        <div class="task-actions"><button type="button" data-action="edit" aria-label="Edit task">✎</button><button type="button" data-action="delete" aria-label="Delete task">×</button></div>
      </article>`;
    if (currentView === "months") {
      const monthKeys = ["2026-09","2026-10","2026-11","2026-12","2027-01","2027-02"];
      const monthNames = {"2026-09":"September 2026","2026-10":"October 2026","2026-11":"November 2026","2026-12":"December 2026","2027-01":"January 2027","2027-02":"February 2027"};
      const grouped = new Map(monthKeys.map(k=>[k,[]]));
      state.tasks.filter(t=>!t.deleted && t.date).forEach(t=>{const k=t.date.slice(0,7); if(grouped.has(k)) grouped.get(k).push(t);});
      $("#taskList").innerHTML = monthKeys.map(key => {
        const items = grouped.get(key).sort((a,b)=>a.date.localeCompare(b.date));
        const doneCount = items.filter(t=>t.completed).length;
        const gate = key==="2027-02" ? `<p class="month-note"><strong>GATE Psychology · 21 February 2027</strong><br>No preparation tasks added. This section is deliberately open until you decide the strategy after NET.</p>` : key==="2027-01" ? `<p class="month-note">No preparation tasks added. Plan this month after the 16 December NET decision point.</p>` : "";
        const records = Object.entries(state.history||{}).filter(([date])=>date.startsWith(key)).map(([date,rec])=>({date,rec})).filter(x=>x.rec.notes||x.rec.reps);
        const notes = records.map(x=>`<details class="history-note"><summary>${escapeHTML(prettyDate(x.date,{weekday:"short",day:"numeric",month:"short"}))} · Past note</summary><p>${escapeHTML([x.rec.notes,x.rec.reps?("Study minutes recorded: "+x.rec.reps):""].filter(Boolean).join(" · "))}</p></details>`).join("");
        return `<details class="month-group month-details" ${key==="2026-10"?"open":""}><summary class="month-group-head"><div><span class="eyebrow">${key.slice(0,4)} · CHAPTER</span><h3>${monthNames[key]}</h3></div><span class="month-count">${doneCount}/${items.length} done　⌄</span></summary><div class="month-content">${gate}${items.length?items.map(taskMarkup).join(""):`<p class="month-note">No tasks scheduled here yet.</p>`}${notes?`<details class="past-notes"><summary>Imported daily notes (${records.length})</summary>${notes}</details>`:""}</div></details>`;
      }).join("");
    } else {
      $("#taskList").innerHTML = tasks.map(taskMarkup).join("");
    }
    /* TASK MARKUP GENERATED ABOVE */
    /* removed legacy inline template */
    /*
      <article class="task-card ${t.completed?"done":""}" data-task-id="${escapeHTML(t.id)}">
        <button class="check-button" type="button" role="checkbox" aria-checked="${!!t.completed}" aria-label="${t.completed?"Mark incomplete":"Mark complete"}: ${escapeHTML(t.title)}" data-action="toggle">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5.1 5L20 5.5"/></svg>
        </button>
        <div class="task-body"><p class="task-title">${escapeHTML(t.title)}</p><div class="task-meta"><span>${escapeHTML(prettyDate(t.date,{month:"short",day:"numeric"}))}</span><span>·</span><span>${Number(t.minutes)||0} min</span><span class="category-tag">${escapeHTML(t.category||"Other")}</span></div></div>
        <div class="task-actions"><button type="button" data-action="edit" aria-label="Edit task">✎</button><button type="button" data-action="delete" aria-label="Delete task">×</button></div>
      </article>`;
    */
    $("#emptyState").hidden = currentView==="months" || currentView==="records" || tasks.length>0;
    $("#taskList").hidden = currentView==="records"; 
    $("#recordsPanel").hidden = currentView!=="records";
    $("#reflectionSection").hidden = currentView==="months" || currentView==="records";
    const note = state.notes[today] || "";
    if (document.activeElement !== $("#reflectionInput")) $("#reflectionInput").value = note;
  }
  function showReward(t) {
    const messages = ["One promise kept to yourself.","The stars mark this small victory.","Your future self just got a little closer.","A little discipline, a little magic.","Even the longest night gives way to dawn."];
    $("#rewardTitle").textContent = t.completed ? "A tiny victory!" : "Task reopened";
    $("#rewardMessage").textContent = t.completed ? messages[Math.floor(Math.random()*messages.length)] : "No guilt. Keep moving at a sustainable pace.";
    $("#rewardToast").hidden = false;
    if(t.completed) { $("#rewardToast").animate?.([{transform:"translateY(8px) scale(.98)",opacity:0},{transform:"translateY(0) scale(1)",opacity:1}],{duration:240,easing:"ease-out"}); }
  }
  function touchTask(t) { t.updated_at = new Date().toISOString(); saveLocal(); render(); queueSync(); }
  let activeTickStroke = null, drawnTickSuppress = false;
  const tickPoint = (event, button) => {
    const rect = button.getBoundingClientRect();
    return {x:Math.max(0,Math.min(24,(event.clientX-rect.left)/rect.width*24)),y:Math.max(0,Math.min(24,(event.clientY-rect.top)/rect.height*24))};
  };
  // Mouse, touch and Apple Pencil can either tap to toggle or draw a tick directly.
  $("#taskList").addEventListener("pointerdown", e => {
    const button=e.target.closest('button[data-action="toggle"]'); if(!button)return;
    const card=button.closest("[data-task-id]"); if(!card)return;
    activeTickStroke={id:card.dataset.taskId,button,points:[tickPoint(e,button)],moved:false,pointerId:e.pointerId};
    try { button.setPointerCapture(e.pointerId); } catch {}
  });
  $("#taskList").addEventListener("pointermove", e => {
    if(!activeTickStroke || activeTickStroke.pointerId!==e.pointerId)return;
    const point=tickPoint(e,activeTickStroke.button), last=activeTickStroke.points[activeTickStroke.points.length-1];
    if(Math.hypot(point.x-last.x,point.y-last.y)>2.5) activeTickStroke.moved=true;
    if(activeTickStroke.moved) {
      activeTickStroke.points.push(point);
      const svg=activeTickStroke.button.querySelector("svg");
      let path=svg.querySelector(".freehand-tick");
      if(!path){path=document.createElementNS("http://www.w3.org/2000/svg","path");path.setAttribute("class","freehand-tick");path.setAttribute("fill","none");path.setAttribute("stroke","#3d285b");path.setAttribute("stroke-width","3.2");path.setAttribute("stroke-linecap","round");path.setAttribute("stroke-linejoin","round");svg.appendChild(path);}
      path.setAttribute("d",activeTickStroke.points.map((p,i)=>(i?"L":"M")+p.x.toFixed(1)+" "+p.y.toFixed(1)).join(" "));
    }
  });
  const finishTickStroke = e => {
    if(!activeTickStroke || activeTickStroke.pointerId!==e.pointerId)return;
    const stroke=activeTickStroke; activeTickStroke=null;
    if(stroke.moved) {
      const task=state.tasks.find(t=>t.id===stroke.id);
      if(task && !task.completed){task.completed=true;touchTask(task);showReward(task);}
      drawnTickSuppress=true; setTimeout(()=>{drawnTickSuppress=false;},300);
    }
  };
  $("#taskList").addEventListener("pointerup", finishTickStroke);
  $("#taskList").addEventListener("pointercancel", e=>{activeTickStroke=null;});
  $("#taskList").addEventListener("click", e => {
    if(drawnTickSuppress){drawnTickSuppress=false;return;}
    const action = e.target.closest("[data-action]"); if(!action) return;
    const card = action.closest("[data-task-id]"); if(!card) return;
    const task = state.tasks.find(t=>t.id===card.dataset.taskId); if(!task) return;
    if(action.dataset.action==="toggle") { task.completed=!task.completed; touchTask(task); showReward(task); }
    if(action.dataset.action==="delete") {
      if(confirm(`Delete “${task.title}”?`)) { task.deleted=true; task.updated_at=new Date().toISOString(); saveLocal(); render(); queueSync(); }
    }
    if(action.dataset.action==="edit") {
      const title=prompt("Task name:",task.title); if(title===null) return;
      const date=prompt("Date (YYYY-MM-DD):",task.date); if(date===null) return;
      const mins=prompt("Duration in minutes:",String(task.minutes||0)); if(mins===null) return;
      if(!title.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date > "2026-12-16" || !Number.isFinite(Number(mins)) || Number(mins)<0) { alert("Please enter a task name, a date no later than 2026-12-16, and a non-negative duration."); return; }
      Object.assign(task,{title:title.trim(),date,minutes:Number(mins),updated_at:new Date().toISOString()}); saveLocal(); render(); queueSync();
    }
  });
  document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>{currentView=b.dataset.view;document.querySelectorAll("[data-view]").forEach(x=>x.classList.toggle("active",x===b));render(); if(currentView==="records") renderRecords();}));
  $("#addTaskButton").addEventListener("click",()=>{ $("#taskDate").value=todayISO(); $("#taskDialog").showModal(); $("#taskTitle").focus(); });
  $("#closeDialog").addEventListener("click",()=>$("#taskDialog").close());
  $("#cancelTask").addEventListener("click",()=>$("#taskDialog").close());
  $("#taskForm").addEventListener("submit",e=>{
    e.preventDefault(); const title=$("#taskTitle").value.trim(), date=$("#taskDate").value;
    if(!title||!date) return;
    state.tasks.push({id:makeId(),date,title,category:$("#taskCategory").value,minutes:Number($("#taskMinutes").value)||0,completed:false,updated_at:new Date().toISOString()});
    saveLocal(); render(); queueSync(); $("#taskDialog").close(); $("#taskForm").reset(); showReward({completed:true});
  });
  $("#dismissReward").addEventListener("click",()=>$("#rewardToast").hidden=true);
  $("#newQuote").addEventListener("click",()=>{currentQuote=(currentQuote+1)%QUOTES.length;renderQuote();});
  function renderQuote(){const q=QUOTES[currentQuote];$("#quoteText").textContent=q.text;$("#quoteSource").textContent=q.source;}
  $("#reflectionInput").addEventListener("input",()=>{state.notes[todayISO()]=$("#reflectionInput").value;saveLocal();$("#reflectionStatus").textContent="Saved on this device";});
  $("#saveReflection").addEventListener("click",()=>{state.notes[todayISO()]=$("#reflectionInput").value;saveLocal();queueSync();$("#reflectionStatus").textContent="Note saved";});
  $("#syncButton").addEventListener("click",async()=>{if(!cloudConfigured){alert("Add your Supabase URL and publishable/anon key in config.js first, then run the SQL in supabase/schema.sql.");return;} if(!user){await signInPrompt();return;} await syncNow();});

  function saveExtras() { state.extrasUpdatedAt = new Date().toISOString(); saveLocal(); queueSync(); }
  function renderRecords() {
    const extras = state.extras || (state.extras = makeLegacyExtras());
    const scoreGroups = [
      ["fullMock","Full mocks / SET papers"],
      ["fullPyqP1","Full Paper 1 PYQs"],
      ["fullPyqP2","Full Paper 2 PYQs"],
      ["unitPyqP1","Unit-wise Paper 1"],
      ["unitPyqP2","Unit-wise Psychology"]
    ];
    $("#scoreRecords").innerHTML = scoreGroups.map(([key,label]) => {
      const rows = extras.scores[key] || [];
      return `<section class="record-card"><h3>${escapeHTML(label)} <button class="small-action" data-score-add="${key}" type="button">＋ Add</button></h3><div class="score-list">${rows.map((r,i)=>`<div class="score-row"><input aria-label="Test name" data-score-key="${key}" data-score-index="${i}" data-score-field="name" value="${escapeHTML(r.name||"")}" placeholder="Test name"><input aria-label="Score" data-score-key="${key}" data-score-index="${i}" data-score-field="score" value="${escapeHTML(r.score||"")}" placeholder="Score e.g. 210/300"><button class="remove-button" type="button" data-score-delete="${key}" data-score-index="${i}" aria-label="Delete score">×</button></div>`).join("") || `<p class="month-note">No scores recorded.</p>`}</div></section>`;
    }).join("");
    $("#priorityRecords").innerHTML = (extras.priorityTables||[]).map((table,ti)=>`<section class="record-card"><h3>${escapeHTML(table.title||"Priority table")}</h3><div class="priority-records"><div class="priority-row priority-labels"><span>Unit / topic</span><span>PYQ share</span><span>Priority</span><span></span></div>${(table.rows||[]).map((row,ri)=>`<div class="priority-row"><input value="${escapeHTML(row.unit||"")}" data-priority-table="${ti}" data-priority-row="${ri}" data-priority-field="unit" aria-label="Topic"><input value="${escapeHTML(row.pyq||"")}" data-priority-table="${ti}" data-priority-row="${ri}" data-priority-field="pyq" aria-label="PYQ share"><select data-priority-table="${ti}" data-priority-row="${ri}" data-priority-field="priority" aria-label="Priority">${["Extreme","Very High","High","Moderate","Cover once","Once"].map(v=>`<option ${v===row.priority?"selected":""}>${v}</option>`).join("")}</select><button class="remove-button" data-priority-delete="${ti}" data-priority-row="${ri}" type="button" aria-label="Delete priority row">×</button></div>`).join("")}</div><button class="small-action" data-priority-add="${ti}" type="button">＋ Add topic</button></section>`).join("");
    $("#resourceRecords").innerHTML = (extras.resources||[]).map((r,i)=>`<label class="resource-row"><input type="checkbox" data-resource-index="${i}" ${r.done?"checked":""}><input value="${escapeHTML(r.text||"")}" data-resource-text="${i}" aria-label="Resource name"><button class="remove-button" data-resource-delete="${i}" type="button" aria-label="Delete resource">×</button></label>`).join("") + `<button class="small-action" id="addResource" type="button">＋ Add resource</button>`;
    $("#recordsStatus").textContent = "Imported from your original planner. Changes save on this device and sync after cloud setup.";
  }
  $("#recordsPanel").addEventListener("change", e => {
    const x=state.extras||(state.extras=makeLegacyExtras());
    if(e.target.matches("[data-resource-index]")) {const r=x.resources[Number(e.target.dataset.resourceIndex)]; if(r)r.done=e.target.checked;saveExtras();renderRecords();}
    if(e.target.matches("[data-score-key]")) {const a=x.scores[e.target.dataset.scoreKey]||[];const r=a[Number(e.target.dataset.scoreIndex)];if(r){r[e.target.dataset.scoreField]=e.target.value;saveExtras();}}
    if(e.target.matches("[data-priority-table]")) {const r=x.priorityTables[Number(e.target.dataset.priorityTable)]?.rows?.[Number(e.target.dataset.priorityRow)];if(r){r[e.target.dataset.priorityField]=e.target.value;saveExtras();}}
  });
  $("#recordsPanel").addEventListener("click", e => {
    const x=state.extras||(state.extras=makeLegacyExtras());
    const b=e.target.closest("button"); if(!b)return;
    if(b.dataset.scoreAdd){(x.scores[b.dataset.scoreAdd]||(x.scores[b.dataset.scoreAdd]=[])).push({id:makeId(),name:"",score:""});saveExtras();renderRecords();}
    if(b.dataset.scoreDelete!==undefined){x.scores[b.dataset.scoreDelete].splice(Number(b.dataset.scoreIndex),1);saveExtras();renderRecords();}
    if(b.dataset.priorityAdd!==undefined){x.priorityTables[Number(b.dataset.priorityAdd)].rows.push({id:makeId(),unit:"",pyq:"",priority:"High"});saveExtras();renderRecords();}
    if(b.dataset.priorityDelete!==undefined){x.priorityTables[Number(b.dataset.priorityDelete)].rows.splice(Number(b.dataset.priorityRow),1);saveExtras();renderRecords();}
    if(b.dataset.resourceDelete!==undefined){x.resources.splice(Number(b.dataset.resourceDelete),1);saveExtras();renderRecords();}
    if(b.id==="addResource"){x.resources.push({id:makeId(),done:false,path:null,text:"New resource"});saveExtras();renderRecords();}
  });
  $("#recordsPanel").addEventListener("change", e => {
    if(e.target.matches("[data-resource-text]")) {const x=state.extras.resources[Number(e.target.dataset.resourceText)];if(x){x.text=e.target.value;saveExtras();}}
  });

  async function signInPrompt() {
    const email=prompt("Enter the email address for your study planner account:");
    if(!email) return;
    const password=prompt("Enter your password (or create the account in Supabase Auth first):");
    if(!password) return;
    setSync("Signing in…","syncing");
    const {data,error}=await supabase.auth.signInWithPassword({email,password});
    if(error){setSync("Sign-in failed","error");alert(error.message+"\n\nIf this is a new account, enable email/password sign-in in Supabase and create the user first.");return;}
    user=data.user; await syncNow();
  }
  async function bootCloud() {
    if(!cloudConfigured || !window.supabase?.createClient){setSync("Saved on this device","local");return;}
    supabase=window.supabase.createClient(config.SUPABASE_URL,config.SUPABASE_ANON_KEY);
    const {data}=await supabase.auth.getSession(); user=data.session?.user||null;
    supabase.auth.onAuthStateChange((_event,session)=>{user=session?.user||null;if(user) setTimeout(()=>syncNow(),0);else setSync("Saved on this device","local");});
    if(user) await syncNow(); else setSync("Sign in to sync","local");
  }
  let syncTimer=null;
  function queueSync(){if(!cloudConfigured||!user)return;clearTimeout(syncTimer);syncTimer=setTimeout(()=>syncNow(),700);}
  async function syncNow() {
    if(!supabase||!user||syncBusy)return;
    syncBusy=true;setSync("Syncing…","syncing");
    try {
      // Merge per task ID, choosing the newer timestamp. This prevents an old device
      // snapshot from replacing every newer task when it reconnects.
      const {data:remote,error}=await supabase.from("study_tasks").select("*").eq("user_id",user.id);
      if(error) throw error;
      const byId=new Map(state.tasks.map(t=>[t.id,t]));
      for(const row of (remote||[])) {
        if (String(row.task_id).startsWith("starter-")) continue;
        const local=byId.get(row.task_id);
        const remoteTask={id:row.task_id,date:row.task_date,title:row.title,category:row.category,minutes:row.minutes,completed:row.completed,updated_at:row.updated_at,deleted:row.deleted};
        if(!local || new Date(remoteTask.updated_at).getTime()>new Date(local.updated_at||0).getTime()) byId.set(row.task_id,remoteTask);
      }
      state.tasks=[...byId.values()];
      const payload=state.tasks.map(t=>({user_id:user.id,task_id:t.id,task_date:t.date,title:t.title,category:t.category||"Other",minutes:Number(t.minutes)||0,completed:!!t.completed,updated_at:t.updated_at||new Date().toISOString(),deleted:!!t.deleted}));
      if(payload.length) {
        const {error:upsertError}=await supabase.from("study_tasks").upsert(payload,{onConflict:"user_id,task_id"});
        if(upsertError) throw upsertError;
      }
      // Notes use their own row per date.
      const {data:notes,error:noteError}=await supabase.from("study_notes").select("*").eq("user_id",user.id);
      if(noteError) throw noteError;
      const mergedNotes={...(state.notes||{})};
      (notes||[]).forEach(n=>{if(!(n.note_date in mergedNotes)) mergedNotes[n.note_date]=n.body;});
      state.notes=Object.fromEntries(Object.entries(mergedNotes).map(([k,v])=>[k,typeof v==="string"?v:v.text||""]));
      const notePayload=Object.entries(state.notes).map(([date,body])=>({user_id:user.id,note_date:date,body,updated_at:new Date().toISOString()}));
      if(notePayload.length){const {error:e}=await supabase.from("study_notes").upsert(notePayload,{onConflict:"user_id,note_date"});if(e)throw e;}
      // Sync the imported score log, priority tables, resource checklist and legacy day metadata.
      const {data:profile,error:profileError}=await supabase.from("planner_data").select("*").eq("user_id",user.id).maybeSingle();
      if(profileError) throw profileError;
      if(profile && profile.data && new Date(profile.updated_at).getTime() > new Date(state.extrasUpdatedAt||0).getTime()) {
        state.extras = profile.data.extras || state.extras || makeLegacyExtras();
        state.history = profile.data.history || state.history || {};
        state.extrasUpdatedAt = profile.updated_at;
      }
      const profilePayload={user_id:user.id,data:{extras:state.extras||makeLegacyExtras(),history:state.history||{}},updated_at:state.extrasUpdatedAt||new Date().toISOString()};
      const {error:profileUpsertError}=await supabase.from("planner_data").upsert(profilePayload,{onConflict:"user_id"});
      if(profileUpsertError) throw profileUpsertError;
      saveLocal();render();renderRecords();setSync("Saved to cloud","ok");
      if(channel) supabase.removeChannel(channel);
      channel=supabase.channel("study-tasks-"+user.id).on("postgres_changes",{event:"*",schema:"public",table:"study_tasks",filter:`user_id=eq.${user.id}`},()=>{if(!syncBusy)syncNow();}).subscribe();
    } catch(err) { console.error("Cloud sync failed",err);setSync("Sync failed — local copy safe","error"); }
    finally {syncBusy=false;}
  }
  // Reconnect automatically when the browser comes back online.
  window.addEventListener("online",()=>{if(user)syncNow();});
  window.addEventListener("offline",()=>setSync("Offline — saved locally","local"));
  // Dense, layered snowfall with varied sizes and drift, no external assets.
  for(let i=0;i<96;i++){
    const f=document.createElement("span");
    const size=i%9===0?4:i%4===0?3:2;
    f.className="snowflake";
    f.style.cssText=`left:${(i*37.17)%100}%;width:${size}px;height:${size}px;opacity:${.28+(i%6)*.1};animation-duration:${12+(i%19)}s;animation-delay:-${(i*1.73)%28}s;`;
    $("#snow").appendChild(f);
  }
  saveLocal();render();renderQuote();renderRecords();bootCloud();
  if("serviceWorker" in navigator && location.protocol.startsWith("http")) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.warn));
})();