(() => {
  "use strict";
  const $ = s => document.querySelector(s);
  const cfg = window.CLINIC_BACKEND || {};
  const ready = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase);
  let client = null;
  const warning = $("#setupWarning"), login = $("#loginForm"), dash = $("#dashboard");
  if (!ready) {
    warning.textContent = "Backend not configured. Staff login and database-backed appointment management are unavailable. Follow README.md and supabase-schema.sql.";
    return;
  }
  client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  warning.textContent = "Backend settings loaded. Sign in with an authorized staff account.";
  login.classList.remove("hidden");
  login.addEventListener("submit", async e => {
    e.preventDefault();
    const fd = new FormData(login);
    warning.textContent = "Signing in…";
    const {error} = await client.auth.signInWithPassword({email:fd.get("email"),password:fd.get("password")});
    if (error) { warning.textContent = "Sign-in failed. Check the email/password and confirm that this account is authorized."; return; }
    login.classList.add("hidden"); dash.classList.remove("hidden");
    await loadRows();
  });
  async function loadRows() {
    $("#dashboardStatus").textContent = "Loading appointment requests…";
    const {data,error} = await client.from("appointments").select("id,created_at,full_name,phone,preferred_date,preferred_time,language,short_note,status").order("created_at",{ascending:false}).limit(100);
    if (error) { $("#dashboardStatus").textContent = "Could not load requests. Check admin role and database policies."; return; }
    const body = $("#appointmentRows"); body.replaceChildren();
    for (const row of data || []) {
      const tr = document.createElement("tr");
      const values = [new Date(row.created_at).toLocaleString(), `${row.full_name}\n${row.phone}`, `${row.preferred_date}\n${row.preferred_time}`, row.short_note || "—", row.status];
      values.forEach(value => { const td=document.createElement("td"); td.textContent=value; tr.appendChild(td); });
      const action = document.createElement("td");
      const select = document.createElement("select");
      ["requested","confirmed","completed","cancelled"].forEach(s => { const o=document.createElement("option");o.value=s;o.textContent=s;o.selected=s===row.status;select.appendChild(o);});
      select.addEventListener("change",async()=>{select.disabled=true;const {error}=await client.from("appointments").update({status:select.value}).eq("id",row.id);select.disabled=false;if(error){$("#dashboardStatus").textContent="Update failed; verify admin access.";select.value=row.status;}else{row.status=select.value;$("#dashboardStatus").textContent="Status updated.";}});
      action.appendChild(select);tr.appendChild(action);body.appendChild(tr);
    }
    $("#dashboardStatus").textContent = `${(data||[]).length} most recent request(s) shown.`;
  }
  $("#refreshButton").addEventListener("click",loadRows);
  $("#logoutButton").addEventListener("click",async()=>{await client.auth.signOut();dash.classList.add("hidden");login.classList.remove("hidden");warning.textContent="Signed out.";});
})();