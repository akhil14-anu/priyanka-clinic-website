/* Clinic website frontend.
   WhatsApp requests work without a backend. Secure database booking/admin requires
   the optional Supabase setup described in README.md and supabase-schema.sql. */
(() => {
  "use strict";
  const PHONE = "919155588488";
  const $ = (s, root=document) => root.querySelector(s);
  $("#year").textContent = new Date().getFullYear();

  const toggle = $("#menuToggle"), nav = $("#mainNav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); toggle?.setAttribute("aria-expanded","false");
    if (toggle) toggle.textContent = "☰";
  }));

  const translations = {
    en: {
      topline:"Thoughtful care. A personal approach.",brandSub:"HOMEOPATHY CLINIC",navAbout:"About",navCare:"Our approach",navVisit:"Visit us",navBook:"Request appointment",eyebrow:"PERSONAL • CONSIDERED • CARE",heroTitle:"Care that begins<br>with <em>listening.</em>",heroText:"A welcoming space to discuss your health concerns, understand your options, and plan your next steps with care.",heroBook:"Request a visit",heroLearn:"Meet the clinic",heroNote:"Appointment requests are confirmed by the clinic.",artCaption:"A calmer conversation<br>about your wellbeing.",seal:"CARE<br>WITH TIME",bottomLeft:"A personal approach to every conversation",aboutEyebrow:"WELCOME",aboutTitle:"A clinic where<br><em>you are heard.</em>",aboutText:"We believe a helpful consultation begins with listening carefully, discussing your concerns, and explaining the options available to you. Contact the clinic to ask questions or request a visit.",aboutLink:"Start a conversation",careEyebrow:"OUR APPROACH",careTitle:"Care, with clarity.",careIntro:"A considered visit should leave you better informed about your next steps.",card1Title:"Listen first",card1Text:"Share your concerns and questions in a respectful, welcoming setting.",card2Title:"Discuss options",card2Text:"Talk through your questions and understand the available care options.",card3Title:"Plan next steps",card3Text:"Get clear information about follow-up and when other medical care may be needed.",medicalNote:"Important: Homeopathy has not been shown to be effective for treating health conditions by reliable scientific evidence. Do not delay or replace evidence-based medical care, prescribed treatment, vaccination, or emergency care.",doctorArtLabel:"YOUR CONSULTATION STARTS HERE",doctorEyebrow:"THE PRACTITIONER",doctorTitle:"Meet Dr. Priyanka Reddy.",doctorText:"Contact the clinic to confirm the practitioner's qualifications, registration details, consultation availability, and whether the clinic is suitable for your needs.",factLanguage:"Languages",factLanguageValue:"Telugu · English",factHours:"Clinic hours",doctorLink:"Ask about a consultation",bookEyebrow:"APPOINTMENTS",bookTitle:"Let's find a time<br><em>that works for you.</em>",bookText:"Send an appointment request. The clinic will need to confirm your date and time before your visit is booked.",bookPoint1:"Simple appointment request",bookPoint2:"Confirmation from the clinic",bookPoint3:"WhatsApp option available",privacyNote:"Please do not include diagnoses, test results, or other sensitive medical details in this form.",formLabel:"APPOINTMENT REQUEST",nameLabel:"Your name",phoneLabel:"Phone number",dateLabel:"Preferred date",timeLabel:"Preferred time",languageLabel:"Preferred language",messageLabel:"Short note (optional — no medical details)",consentText:"I understand this is a request, not a confirmed appointment, and the clinic will contact me.",submitButton:"Send request via WhatsApp",formFoot:"This version opens WhatsApp and does not save booking data to a database. See README to configure secure online booking and admin access.",visitEyebrow:"FIND THE CLINIC",visitTitle:"Your next step<br><em>starts here.</em>",visitText:"Call ahead to confirm today's availability before travelling.",addressLabel:"Address",addressValue:"Palnadu Road, behind LG Showroom, Narasaraopet",hoursLabel:"Consultation hours",phoneLabel2:"Phone",mapButton:"Open directions",mapCaption:"Plan your visit",footerText:"Clear information. Thoughtful conversations. Informed choices.",whatsappLink:"Chat on WhatsApp",adminLink:"Staff sign in",footerDisclaimer:"Website information is not a substitute for medical advice."
    },
    te: {
      topline:"ఆలోచనాత్మకమైన సంరక్షణ. వ్యక్తిగత శ్రద్ధ.",brandSub:"హోమియోపతి క్లినిక్",navAbout:"మా గురించి",navCare:"మా విధానం",navVisit:"క్లినిక్ చిరునామా",navBook:"అపాయింట్‌మెంట్ కోరండి",eyebrow:"వ్యక్తిగత శ్రద్ధ • సంరక్షణ",heroTitle:"మీ మాట వినడంతో<br><em>సంరక్షణ ప్రారంభం.</em>",heroText:"మీ ఆరోగ్య సందేహాలను చర్చించడానికి, అందుబాటులో ఉన్న ఎంపికలను తెలుసుకోవడానికి ఆహ్వానించే స్థలం.",heroBook:"అపాయింట్‌మెంట్ కోరండి",heroLearn:"క్లినిక్ గురించి",heroNote:"మీ అభ్యర్థనను క్లినిక్ నిర్ధారిస్తుంది.",artCaption:"మీ ఆరోగ్యం గురించి<br>ప్రశాంతంగా మాట్లాడండి.",seal:"శ్రద్ధతో<br>సంరక్షణ",bottomLeft:"ప్రతి సంభాషణకు వ్యక్తిగత శ్రద్ధ",aboutEyebrow:"స్వాగతం",aboutTitle:"మీ మాటకు<br><em>విలువ ఇచ్చే క్లినిక్.</em>",aboutText:"మీ సందేహాలను శ్రద్ధగా విని, అందుబాటులో ఉన్న ఎంపికలను వివరించడం ముఖ్యం. ప్రశ్నలు అడగడానికి లేదా అపాయింట్‌మెంట్ కోరడానికి క్లినిక్‌ను సంప్రదించండి.",aboutLink:"సంభాషణ ప్రారంభించండి",careEyebrow:"మా విధానం",careTitle:"స్పష్టమైన సమాచారం.",careIntro:"మీ తదుపరి అడుగుల గురించి మరింత అవగాహనతో వెళ్లేందుకు మేము సహాయపడాలనుకుంటున్నాము.",card1Title:"ముందుగా వినడం",card1Text:"మీ సందేహాలను గౌరవప్రదమైన వాతావరణంలో పంచుకోండి.",card2Title:"ఎంపికల చర్చ",card2Text:"మీ ప్రశ్నలను చర్చించి అందుబాటులో ఉన్న వైద్య ఎంపికలను తెలుసుకోండి.",card3Title:"తదుపరి అడుగులు",card3Text:"తదుపరి సంప్రదింపు మరియు ఇతర వైద్య సహాయం ఎప్పుడు అవసరమో తెలుసుకోండి.",medicalNote:"ముఖ్యమైనది: ఆరోగ్య సమస్యల చికిత్సలో హోమియోపతి ప్రభావవంతమని విశ్వసనీయ శాస్త్రీయ ఆధారాలు చూపలేదు. ఆధారపూర్వక వైద్యం, సూచించిన చికిత్స, టీకాలు లేదా అత్యవసర వైద్య సహాయాన్ని ఆలస్యం చేయకండి లేదా వాటికి బదులుగా హోమియోపతిని ఉపయోగించకండి.",doctorArtLabel:"మీ సంప్రదింపు ఇక్కడ ప్రారంభం",doctorEyebrow:"వైద్యురాలు",doctorTitle:"డా. ప్రియాంక రెడ్డి.",doctorText:"వైద్య అర్హతలు, రిజిస్ట్రేషన్ వివరాలు, సంప్రదింపు సమయం మరియు మీ అవసరాలకు క్లినిక్ అనుకూలమో కాదో నిర్ధారించడానికి క్లినిక్‌ను సంప్రదించండి.",factLanguage:"భాషలు",factLanguageValue:"తెలుగు · ఇంగ్లీష్",factHours:"క్లినిక్ సమయాలు",doctorLink:"సంప్రదింపు గురించి అడగండి",bookEyebrow:"అపాయింట్‌మెంట్లు",bookTitle:"మీకు అనుకూలమైన<br><em>సమయాన్ని ఎంచుకోండి.</em>",bookText:"అపాయింట్‌మెంట్ అభ్యర్థన పంపండి. మీ తేదీ, సమయాన్ని క్లినిక్ నిర్ధారించిన తర్వాతే అపాయింట్‌మెంట్ ఖరారు అవుతుంది.",bookPoint1:"సులభమైన అభ్యర్థన",bookPoint2:"క్లినిక్ నిర్ధారణ",bookPoint3:"వాట్సాప్ ద్వారా సంప్రదించవచ్చు",privacyNote:"ఈ ఫారమ్‌లో వ్యాధి నిర్ధారణలు, పరీక్ష ఫలితాలు లేదా సున్నితమైన వైద్య వివరాలు రాయకండి.",formLabel:"అపాయింట్‌మెంట్ అభ్యర్థన",nameLabel:"మీ పేరు",phoneLabel:"ఫోన్ నంబర్",dateLabel:"మీకు కావలసిన తేదీ",timeLabel:"మీకు కావలసిన సమయం",languageLabel:"భాష",messageLabel:"చిన్న గమనిక (ఐచ్ఛికం — వైద్య వివరాలు వద్దు)",consentText:"ఇది అభ్యర్థన మాత్రమే, ఖరారైన అపాయింట్‌మెంట్ కాదు; క్లినిక్ నన్ను సంప్రదిస్తుంది అని అర్థం చేసుకున్నాను.",submitButton:"వాట్సాప్ ద్వారా పంపండి",formFoot:"ఈ వెర్షన్ వాట్సాప్ తెరుస్తుంది; అపాయింట్‌మెంట్ డేటాబేస్‌లో సేవ్ చేయదు. సురక్షిత ఆన్‌లైన్ బుకింగ్, అడ్మిన్ యాక్సెస్ కోసం README చూడండి.",visitEyebrow:"క్లినిక్‌ను కనుగొనండి",visitTitle:"మీ తదుపరి అడుగు<br><em>ఇక్కడ ప్రారంభం.</em>",visitText:"ప్రయాణించే ముందు ఆ రోజు సమయాన్ని ఫోన్ చేసి నిర్ధారించండి.",addressLabel:"చిరునామా",addressValue:"పల్నాడు రోడ్, LG షోరూమ్ వెనుక, నరసరావుపేట",hoursLabel:"సంప్రదింపు సమయాలు",phoneLabel2:"ఫోన్",mapButton:"దారి చూపించు",mapCaption:"మీ సందర్శనను ప్లాన్ చేయండి",footerText:"స్పష్టమైన సమాచారం. శ్రద్ధగల సంభాషణలు.",whatsappLink:"వాట్సాప్‌లో మాట్లాడండి",adminLink:"సిబ్బంది లాగిన్",footerDisclaimer:"వెబ్‌సైట్ సమాచారం వైద్య సలహాకు ప్రత్యామ్నాయం కాదు."
    }
  };
  let lang = "en";
  $("#languageToggle")?.addEventListener("click", () => {
    lang = lang === "en" ? "te" : "en";
    document.documentElement.lang = lang === "te" ? "te" : "en";
    document.body.classList.toggle("telugu", lang === "te");
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
    $("#languageToggle").textContent = lang === "en" ? "తెలుగు" : "English";
  });

  const date = $("#preferredDate");
  if (date) {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,10);
    date.min = localDate;
  }
  $("#appointmentForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const message = [
      "Appointment request — Dr. Priyanka Reddy Homeopathy Clinic",
      "Name: " + String(d.get("name") || "").trim(),
      "Phone: " + String(d.get("phone") || "").trim(),
      "Preferred date: " + d.get("preferred_date"),
      "Preferred time: " + d.get("preferred_time"),
      "Preferred language: " + d.get("language"),
      "Note: " + String(d.get("message") || "None").trim(),
      "",
      "I understand this is a request, not a confirmed appointment."
    ].join("\n");
    $("#formStatus").textContent = "Opening WhatsApp. Please review the message and press Send there.";
    window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  });
})();