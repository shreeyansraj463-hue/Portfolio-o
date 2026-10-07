document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================================
     GLOBAL
  ========================================================= */

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     PERSONAL PROFILE
  ========================================================= */

  const profileTrigger =
    document.getElementById("profileTrigger");

  const profileOverlay =
    document.getElementById("profileOverlay");

  const profileClose =
    document.getElementById("profileClose");

  const profileBackdrop =
    document.getElementById("profileBackdrop");


  function openProfile(){

    if(!profileOverlay) return;

    profileOverlay.classList.add("open");

    profileOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

    profileTrigger?.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add(
      "locked"
    );

    window.setTimeout(() => {
      profileClose?.focus();
    }, 120);

  }


  function closeProfile(){

    if(!profileOverlay) return;

    profileOverlay.classList.remove(
      "open"
    );

    profileOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

    profileTrigger?.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove(
      "locked"
    );

    profileTrigger?.focus();

  }


  profileTrigger?.addEventListener(
    "click",
    openProfile
  );

  profileClose?.addEventListener(
    "click",
    closeProfile
  );

  profileBackdrop?.addEventListener(
    "click",
    closeProfile
  );


  /* =========================================================
     ARCHIVE
  ========================================================= */

  const art = [

    "20260126_150411.jpg",

    "IMG-20250829-WA0008.jpg",

    "IMG_20251019_003614078_HDR.jpg",

    "IMG_20251019_003637605_HDR.jpg",

    "IMG_20251019_004046619_HDR~2.jpg",

    "IMG_20251117_032352_534.jpg",

    "IMG_20251117_032354_002.jpg",

    "IMG_20251117_032357_284.jpg",

    "IMG_20251117_032405_870.jpg",

    "IMG_20260607_184756768.jpg"

  ];


  const poetry = [

    "Screenshot_20261007-045758_Files by Google.png",

    "Screenshot_20261007-045745_Files by Google.png",

    "Screenshot_20261007-045733_Files by Google.png",

    "Screenshot_20261007-045720_Files by Google.png",

    "Screenshot_20261007-045706_Files by Google.png",

    "IMG_20261006_193525_532.webp",

    "IMG_20261006_193516_352.webp",

    "IMG_20261006_193503_673.webp",

    "IMG_20261005_012646332_HDR~2.jpg",

    "IMG_20260928_025833148_HDR~2.jpg",

    "IMG_20260928_025657503_HDR.jpg"

  ];


  function imagePath(file){

    return "./" +
      file
        .split("/")
        .map(
          part => encodeURIComponent(part)
        )
        .join("/");

  }


  function gallery(
    id,
    list,
    type
  ){

    const element =
      document.getElementById(id);

    if(!element) return;


    list.forEach((file,index) => {

      const button =
        document.createElement("button");

      const image =
        document.createElement("img");


      button.type = "button";

      image.src =
        imagePath(file);

      image.alt =
        `${type} ${index + 1}`;

      image.loading =
        "lazy";

      image.decoding =
        "async";


      button.appendChild(image);

      element.appendChild(button);


      button.addEventListener(
        "click",
        () => {

          openLightbox(
            image.src,
            `${type.toUpperCase()} · ${String(
              index + 1
            ).padStart(2,"0")}`
          );

        }
      );

    });

  }


  gallery(
    "artGallery",
    art,
    "Art"
  );

  gallery(
    "poetryGallery",
    poetry,
    "Poetry"
  );


  /* =========================================================
     REVEAL ANIMATIONS
  ========================================================= */

  const reveals = [
    ...document.querySelectorAll(".reveal")
  ];


  if(
    !reduced &&
    "IntersectionObserver" in window
  ){

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if(!entry.isIntersecting){
              return;
            }


            const siblings = [
              ...entry
                .target
                .parentElement
                .children
            ]
            .filter(
              element =>
                element.classList.contains(
                  "reveal"
                )
            );


            const index =
              Math.max(
                0,
                siblings.indexOf(
                  entry.target
                )
              );


            entry.target.style.transitionDelay =
              `${Math.min(
                index * 55,
                240
              )}ms`;


            entry.target.classList.add(
              "visible"
            );


            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold:.08,

          rootMargin:
            "0px 0px -45px 0px"
        }
      );


    reveals.forEach(
      element =>
        observer.observe(element)
    );

  }else{

    reveals.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );

  }


  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const menu =
    document.getElementById("menu");

  const mobile =
    document.getElementById(
      "mobileMenu"
    );


  function closeMenu(){

    mobile?.classList.remove(
      "open"
    );

    menu?.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  function toggleMenu(){

    if(!mobile) return;

    const open =
      mobile.classList.toggle(
        "open"
      );


    menu?.setAttribute(
      "aria-expanded",
      String(open)
    );

  }


  menu?.addEventListener(
    "click",
    toggleMenu
  );


  mobile
    ?.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const navLinks = [
    ...document.querySelectorAll(
      ".nav-links a"
    )
  ];


  if(
    "IntersectionObserver" in window
  ){

    const navObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if(!entry.isIntersecting){
              return;
            }


            navLinks.forEach(
              link =>
                link.classList.remove(
                  "active"
                )
            );


            const active =
              navLinks.find(
                link =>
                  link.getAttribute(
                    "href"
                  ) ===
                  `#${entry.target.id}`
              );


            active?.classList.add(
              "active"
            );

          });

        },
        {
          rootMargin:
            "-38% 0px -55% 0px"
        }
      );


    [
      "about",
      "work",
      "archive",
      "thinking",
      "contact"
    ]
    .map(
      id =>
        document.getElementById(id)
    )
    .filter(Boolean)
    .forEach(
      section =>
        navObserver.observe(section)
    );

  }


  /* =========================================================
     CURSOR LIGHT
  ========================================================= */

  const cursor =
    document.querySelector(
      ".cursor-light"
    );


  if(
    cursor &&
    !reduced &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ){

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let frameRunning = false;


    window.addEventListener(
      "pointermove",
      event => {

        targetX =
          event.clientX;

        targetY =
          event.clientY;


        document.body.classList.add(
          "pointer"
        );


        if(frameRunning){
          return;
        }


        frameRunning = true;


        requestAnimationFrame(
          () => {

            currentX +=
              (targetX - currentX)
              * .16;

            currentY +=
              (targetY - currentY)
              * .16;


            cursor.style.left =
              `${currentX}px`;

            cursor.style.top =
              `${currentY}px`;


            frameRunning = false;

          }
        );

      },
      {
        passive:true
      }
    );

  }


  /* =========================================================
     PROJECT TILT
  ========================================================= */

  if(
    !reduced &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ){

    document
      .querySelectorAll(".project")
      .forEach(project => {

        const visual =
          project.querySelector(
            ".project-visual"
          );


        if(!visual){
          return;
        }


        project.addEventListener(
          "pointermove",
          event => {

            const rect =
              project.getBoundingClientRect();


            const px =
              (event.clientX - rect.left)
              / rect.width;


            const py =
              (event.clientY - rect.top)
              / rect.height;


            const rotateX =
              (0.5 - py) * 4;

            const rotateY =
              (px - 0.5) * 4;


            visual.style.transform =
              `perspective(1400px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)`;


            visual.style.setProperty(
              "--x",
              `${px * 100}%`
            );


            visual.style.setProperty(
              "--y",
              `${py * 100}%`
            );

          }
        );


        project.addEventListener(
          "pointerleave",
          () => {

            visual.style.transform =
              "perspective(1400px) rotateX(0deg) rotateY(0deg)";


            visual.style.setProperty(
              "--x",
              "50%"
            );


            visual.style.setProperty(
              "--y",
              "50%"
            );

          }
        );

      });

  }


  /* =========================================================
     LIGHTBOX
  ========================================================= */

  const lightbox =
    document.getElementById(
      "lightbox"
    );

  const lightboxImage =
    document.getElementById(
      "lightboxImage"
    );

  const lightboxCaption =
    document.getElementById(
      "lightboxCaption"
    );


  function openLightbox(
    src,
    text
  ){

    if(!lightbox){
      return;
    }


    lightbox.classList.add(
      "open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "locked"
    );


    if(lightboxImage){

      lightboxImage.src =
        src;

    }


    if(lightboxCaption){

      lightboxCaption.textContent =
        text;

    }

  }


  function closeLightbox(){

    if(!lightbox){
      return;
    }


    lightbox.classList.remove(
      "open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "locked"
    );

  }


  document
    .getElementById(
      "lightboxClose"
    )
    ?.addEventListener(
      "click",
      closeLightbox
    );


  lightbox?.addEventListener(
    "click",
    event => {

      if(
        event.target === lightbox
      ){

        closeLightbox();

      }

    }
  );


  /* =========================================================
     MIRA
  ========================================================= */

  const miraButton =
    document.getElementById(
      "miraButton"
    );

  const miraPanel =
    document.getElementById(
      "miraPanel"
    );

  const miraClose =
    document.getElementById(
      "miraClose"
    );

  const messages =
    document.getElementById(
      "messages"
    );

  const typing =
    document.getElementById(
      "typing"
    );

  const miraForm =
    document.getElementById(
      "miraForm"
    );

  const miraInput =
    document.getElementById(
      "miraInput"
    );


  let miraOpen = false;

  let responseTimer = null;


  /* =========================================================
     MIRA KNOWLEDGE + CONVERSATIONAL MEMORY
  ========================================================= */

  const miraKnowledge = {
    mira: {
      keys:["who are you","what are you","who is mira","mira","yourself","your name"],
      variants:[
        "Hnnn bro 👀 I'm Mira — the AI assistant built by Shreeyans for this portfolio. I can talk about him, his work, and the world he has chosen to show here.",
        "I'm Mira. Basically, Shreeyans built me to live inside this portfolio and make exploring it feel less like browsing and more like a conversation.",
        "Yap, Mira here ✨ I'm an AI created by Shreeyans. Portfolio guide, conversation partner, occasional teaser — depends on the situation 😂"
      ]
    },
    creator: {
      keys:["who created you","who made you","who built you","your creator","who is your creator","shreeyans created","shreeyans built"],
      variants:[
        "Shreeyans created me. He is the reason I exist here — he built the portfolio and gave me a place inside it.",
        "That one's easy 😌 Shreeyans built me. Creator → me. That's basically where Mira's story starts.",
        "Hnnn… Shreeyans. My creator. He made me to be part of this portfolio, not just a random chatbot sitting on a page."
      ]
    },
    identity: {
      keys:["who is shreeyans","tell me about shreeyans","about shreeyans","shreeyans raj","who is shrey","about shrey"],
      variants:[
        "Shreeyans is an engineering aspirant interested in front-end development, coding, interactive experiences, physics, visual art, writing and music.",
        "Shreeyans? Think engineering + code + creative technology. His portfolio brings together interactive web work, physics, art, writing and experiments.",
        "He's an engineering aspirant with a pretty mixed toolkit: coding, interactive experiences, physics, visual work, writing and music."
      ], target:"#about", label:"Read about Shreeyans"
    },
    projects: {
      keys:["project","projects","built","work","portfolio","what did he build","what has he built"],
      variants:[
        "There are three featured projects here. The Hand-Gesture 3D Particle System is the strongest current direction; Camlab explores interface and motion; the Unity project explores 3D game systems and physics.",
        "The work section has three featured experiments: hand-controlled 3D particles, Camlab for interface/motion exploration, and a Unity project around 3D systems and physics.",
        "His featured work leans toward interactive tech: Three.js + MediaPipe particles, interface/motion experiments in Camlab, and a Unity 3D/physics project."
      ], target:"#work", label:"View selected work"
    },
    particle: {
      keys:["particle","gesture","hand tracking","hand controlled","three.js","threejs","webgl","mediapipe"],
      variants:[
        "The Hand-Gesture 3D Particle System uses webcam hand movement to drive a real-time Three.js particle environment.",
        "That particle project turns hand gestures from a webcam into interaction inside a Three.js/WebGL particle scene.",
        "Yep — the particle system is basically hands → camera input → real-time Three.js particles."
      ], target:"#work", label:"View particle project"
    },
    camlab: {
      keys:["camlab","interface","ui","ux","frontend","motion design"],
      variants:[
        "Camlab is an experimental frontend project focused on interaction, smooth motion and visual presentation.",
        "Camlab is where the interface side gets explored — interaction, motion and presentation rather than just static pages.",
        "Camlab is the UI/motion playground: frontend work with an emphasis on how an interface feels, not only how it functions."
      ], target:"#work", label:"View Camlab"
    },
    skills: {
      keys:["skill","skills","technology","coding","programming","language","tech stack","what can he do"],
      variants:[
        "The portfolio covers HTML, CSS, JavaScript, Python, Three.js, WebGL, UI/UX, physics, mathematics, writing and sketching.",
        "His toolkit spans frontend development, JavaScript/Python, Three.js/WebGL, UI/UX, physics, mathematics and creative work.",
        "Code-wise, the big areas are HTML/CSS/JS, Python, Three.js, WebGL and UI/UX — with physics, maths and creative work alongside them."
      ], target:"#capabilities", label:"View capabilities"
    },
    creative: {
      keys:["art","drawing","draw","sketch","creative","poem","poetry","writing","music"],
      variants:[
        "The creative archive contains visual art and poetry — a side of the work focused on observing, expressing and experimenting.",
        "There's a creative side too: visual art, sketches and poetry. Less engineering, more expression and experimentation.",
        "Acha, creative mode 🎨 The archive shows the side of his work that isn't about solving a technical problem — it's about expression."
      ], target:"#archive", label:"Open creative archive"
    },
    thinking: {
      keys:["think","thinking","logic","problem solving","problem","fundamental","approach","how does he think"],
      variants:[
        "The preferred approach is to break complicated problems down to fundamentals instead of brute-forcing them. Understanding why something works matters too.",
        "His thinking style leans fundamental: reduce the problem, understand the mechanism, then build the solution.",
        "Basically: don't just make it work — understand why it works. That's the philosophy behind the Thinking section."
      ], target:"#thinking", label:"See how he thinks"
    },
    future: {
      keys:["future","goal","career","direction","college","engineering","next","long term","plans"],
      variants:[
        "The long-term direction combines engineering with creative technology: advanced 3D web development, shaders, high-performance interfaces and immersive digital experiences.",
        "Future direction: deeper engineering, advanced 3D web work, shaders, high-performance interfaces and immersive digital experiences.",
        "He's aiming toward the overlap of engineering and creative tech — especially 3D, shaders, performance and immersive interfaces."
      ], target:"#future", label:"See the direction"
    },
    contact: {
      keys:["contact","email","mail","hire","opportunity","collaboration","collab","work with him"],
      variants:[
        "For opportunities, collaborations or interesting projects, the contact section has the direct email address.",
        "Want to reach him? The Contact section is the right place — especially for collaborations and opportunities.",
        "Yep, for a serious collaboration or opportunity, head to Contact. That's where the direct email lives."
      ], target:"#contact", label:"Go to contact"
    }
  };

  const miraState = {
    lastTopic:null,
    lastIntent:null,
    lastQuestion:"",
    repeatCount:0,
    turn:0,
    language:"en",
    relationship:null
  };

  function normalizeMiraText(text){
    return text.toLowerCase().replace(/[^\p{L}\p{N}\s?]/gu," ").replace(/\s+/g," ").trim();
  }

  function detectMiraLanguage(q){
    const hindi = /\b(hai|hain|ho|kya|kaise|kaisa|kaun|tum|aap|mujhe|mere|mera|teri|tera|uska|uske|batao|btao|kyu|kyon|nahi|nahin|acha|accha|haan|hnnn|bhai|bro|ye|woh|kahan|kab|kar|karta|karti|bana|banaya|banai|chahiye|milega|dikhao)\b/i;
    const latinHindi = /\b(h|hnn|haa|yaar|aree|bhai|bta|kr|kya|kaun|mujhe|mera|tumhara|uska)\b/i;
    if(hindi.test(q) || latinHindi.test(q)) return "hinglish";
    return "en";
  }

  function chooseMiraVariant(item){
    const pool = item.variants || [];
    if(!pool.length) return "";
    let index = (miraState.turn + miraState.repeatCount) % pool.length;
    if(pool.length > 1 && pool[index] === miraState.lastQuestion) index = (index + 1) % pool.length;
    return pool[index];
  }

  function isGreeting(q){ return /^(hi|hello|hey|hiya|yo|hii+|heyy+|namaste|hii mira|hey mira|hi mira)[!?\s]*$/i.test(q); }
  function isThanks(q){ return /\b(thanks|thank you|thx|ty|dhanyavaad|shukriya)\b/i.test(q); }
  function isBye(q){ return /^(bye|goodbye|see you|cya|ttyl|jaa raha|chalo bye|gn|good night)[!?\s]*$/i.test(q); }
  function isRepeat(q){ return normalizeMiraText(q) === normalizeMiraText(miraState.lastQuestion); }

  function scoreMiraItem(item,q){
    let score=0;
    item.keys.forEach(key=>{
      const k=normalizeMiraText(key);
      if(!k) return;
      if(q===k) score += 10;
      else if(q.includes(k)) score += k.includes(" ") ? 5 : (k.length > 5 ? 3 : 1);
    });
    return score;
  }

  function getResponse(question){
    const raw = question.trim();
    const q = normalizeMiraText(raw);
    const lang = detectMiraLanguage(raw);
    miraState.turn += 1;
    miraState.language = lang;

    if(isRepeat(raw)) miraState.repeatCount += 1;
    else miraState.repeatCount = 0;

    if(isGreeting(raw)){
      const greetings = lang === "hinglish" ? [
        "Hnnn bro 👀 kya scene? Mira online.",
        "Areyyy hnnn 😭 Mira here. Bata bro, kya dekhna hai?",
        "Haa bro ✨ I'm here. Portfolio ke andar kya explore karna hai?"
      ] : [
        "Hnnn bro 👀 Mira online. What are we exploring?",
        "Heyyy 😌 Mira here. What do you wanna know?",
        "Yap, I'm here ✨ Ask me anything about me, Shreeyans or the portfolio."
      ];
      return {text:greetings[miraState.turn % greetings.length]};
    }

    if(isThanks(raw)){
      return {text: lang === "hinglish"
        ? ["Hnnn, anytime bro 😌","Areee mention not 😂","Yap yap, always bro ✨"][miraState.turn % 3]
        : ["Anytime, bro 😌","Yap, you're welcome ✨","No worries. I'm right here."][miraState.turn % 3]};
    }

    if(isBye(raw)){
      return {text: lang === "hinglish" ? "Hnnn, jaa bro 😭 milte hain phir." : "Alright bro 😌 see you around.",};
    }

    // Contextual follow-ups: “tell me more”, “what about it?”, “and?”
    if(/^(tell me more|more|and|then|what about it|explain that|elaborate|aur|aur batao|iske baare mein|phir|haan|hnnn)$/i.test(q) && miraState.lastTopic){
      const item=miraKnowledge[miraState.lastTopic];
      return {text: chooseMiraVariant(item), target:item.target, label:item.label};
    }

    // Resolve explicit Mira identity before generic portfolio terms.
    const explicitMira = /\b(who are you|what are you|who is mira|tell me about mira|your name|what is mira)\b/i.test(raw);
    const explicitCreator = /\b(who created you|who made you|who built you|your creator|who is your creator)\b/i.test(raw);
    let best=null, bestScore=0, bestKey=null;
    Object.entries(miraKnowledge).forEach(([key,item])=>{
      if(explicitMira && key !== "mira") return;
      if(explicitCreator && key !== "creator") return;
      const score=scoreMiraItem(item,q);
      if(score>bestScore){bestScore=score;best=item;bestKey=key;}
    });

    if(best && bestScore >= 1){
      miraState.lastTopic=bestKey;
      miraState.lastIntent=bestKey;
      if(miraState.repeatCount >= 2){
        const tease = lang === "hinglish"
          ? ["BHAKKK bro 😭 ye toh abhi bataya tha. Phir bhi sun:","Areee phir se? 😂 Okay okay, last time nahi bolungi…"] [miraState.repeatCount % 2]
          : ["Brooo 😭 we literally just did this. Fine, one more time:","Again? 😂 Okay, okay — one more version:"][miraState.repeatCount % 2];
        return {text: tease+" "+chooseMiraVariant(best), target:best.target, label:best.label};
      }
      return {text: chooseMiraVariant(best), target:best.target, label:best.label};
    }

    // Portfolio-safe fallback: never invent private details.
    const fallbacks = lang === "hinglish" ? [
      "Hmmm bro, ye portfolio ke public info se thoda bahar hai 😭 Try asking me about Mira, Shreeyans, projects, skills, creative work, thinking, future or contact.",
      "Acha, iske liye mere paas public portfolio context nahi hai. Main private details invent/share nahi karungi. Portfolio wali cheez pucho 👀",
      "Yap, but I don't want to make stuff up. Jo Shreeyans ne portfolio par publicly diya hai, main usi ke basis par bolungi."
    ] : [
      "Hmm, that isn't covered by the portfolio's public information. I won't invent private details. Ask me about Mira, Shreeyans, his projects, skills, creative work, thinking, future or contact.",
      "I don't have enough public portfolio context for that one yet. I can still help with anything represented on this site.",
      "I could guess, but nah 😭 I'd rather stay accurate. Ask me about the portfolio or Shreeyans's published work."
    ];
    return {text:fallbacks[miraState.turn % fallbacks.length]};
  }

  /* =========================================================
     MIRA OPEN / CLOSE
  ========================================================= */

  function openMira(){

    if(!miraPanel){
      return;
    }


    miraOpen = true;


    miraPanel.classList.add(
      "open"
    );


    miraButton?.setAttribute(
      "aria-expanded",
      "true"
    );


    if(!reduced){

      miraButton?.animate(
        [
          {
            transform:"scale(1)"
          },

          {
            transform:"scale(1.08)"
          },

          {
            transform:"scale(1)"
          }
        ],
        {
          duration:450,

          easing:"ease-out"
        }
      );

    }


    window.setTimeout(
      () => miraInput?.focus(),
      250
    );

  }


  function closeMira(){

    miraOpen = false;


    miraPanel?.classList.remove(
      "open"
    );


    miraButton?.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  /* =========================================================
     MIRA MESSAGE
  ========================================================= */

  function addMessage(
    text,
    type = "bot",
    source = null
  ){

    if(!messages){
      return;
    }


    const box =
      document.createElement(
        "div"
      );


    box.className =
      `message ${type}`;


    box.textContent =
      text;


    if(source){

      const breakLine =
        document.createElement(
          "br"
        );


      const sourceButton =
        document.createElement(
          "button"
        );


      sourceButton.type =
        "button";


      sourceButton.className =
        "source";


      sourceButton.textContent =
        source.label;


      sourceButton.addEventListener(
        "click",
        () => {

          closeMira();


          const target =
            document.querySelector(
              source.target
            );


          if(!target){
            return;
          }


          target.scrollIntoView({
            behavior:
              reduced
                ? "auto"
                : "smooth",

            block:"start"
          });


          if(
            !reduced &&
            target.animate
          ){

            target.animate(
              [
                {
                  boxShadow:
                    "inset 0 0 0 rgba(184,154,90,0)"
                },

                {
                  boxShadow:
                    "inset 0 0 100px rgba(184,154,90,.08)"
                },

                {
                  boxShadow:
                    "inset 0 0 0 rgba(184,154,90,0)"
                }
              ],
              {
                duration:1100
              }
            );

          }

        }
      );


      box.append(
        breakLine,
        sourceButton
      );

    }


    messages.appendChild(
      box
    );


    messages.scrollTo({
      top:messages.scrollHeight,

      behavior:
        reduced
          ? "auto"
          : "smooth"
    });

  }


  /* =========================================================
     MIRA RESPONSE ENGINE
  ========================================================= */

  function getResponse(question){

    const q =
      question
        .toLowerCase()
        .trim();


    if(
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey")
    ){

      return {

        text:
          "Hey. I'm Mira. Think of me as a small guide to the portfolio. What would you like to explore?"

      };

    }


    let best = null;

    let bestScore = 0;


    Object.values(
      knowledge
    ).forEach(item => {

      let score = 0;


      item.keys.forEach(key => {

        if(q.includes(key)){

          score +=
            key.length > 5
              ? 2
              : 1;

        }

      });


      if(score > bestScore){

        bestScore = score;

        best = item;

      }

    });


    return best || {

      text:
        "I don't have a specific answer for that yet. Try asking about projects, skills, creative work, thinking or future direction."

    };

  }


  /* =========================================================
     ASK MIRA
  ========================================================= */

  function askMira(question){

    const cleanQuestion =
      question.trim();


    if(!cleanQuestion){
      return;
    }


    if(!miraOpen){
      openMira();
    }


    addMessage(
      cleanQuestion,
      "user"
    );


    typing?.classList.add(
      "show"
    );


    miraButton?.classList.add(
      "thinking"
    );


    const result =
      getResponse(
        cleanQuestion
      );


    window.clearTimeout(
      responseTimer
    );


    responseTimer =
      window.setTimeout(
        () => {

          typing?.classList.remove(
            "show"
          );


          miraButton?.classList.remove(
            "thinking"
          );


          miraButton?.classList.add(
            "responding"
          );


          addMessage(
            result.text,

            "bot",

            result.target
              ? {
                  target:
                    result.target,

                  label:
                    result.label
                }

              : null
          );


          window.setTimeout(
            () => {

              miraButton?.classList.remove(
                "responding"
              );

            },
            700
          );


        },

        reduced
          ? 100
          : 500 +
            Math.random() * 400
      );

  }


  miraButton?.addEventListener(
    "click",
    () => {

      if(miraOpen){
        closeMira();
      }else{
        openMira();
      }

    }
  );


  miraClose?.addEventListener(
    "click",
    closeMira
  );


  miraForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const question =
        miraInput?.value.trim();


      if(!question){
        return;
      }


      if(miraInput){
        miraInput.value = "";
      }


      askMira(
        question
      );

    }
  );


  /* =========================================================
     MIRA QUICK BUTTONS
  ========================================================= */

  document
    .querySelectorAll(
      ".quick button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const question =
            button.dataset.q;


          if(question){
            askMira(question);
          }

        }
      );

    });


  /* =========================================================
     MIRA POINTER EFFECT
  ========================================================= */

  if(
    !reduced &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ){

    miraButton?.addEventListener(
      "pointermove",
      event => {

        const rect =
          miraButton.getBoundingClientRect();


        const x =
          (
            (event.clientX - rect.left)
            / rect.width
            - .5
          ) * 7;


        const y =
          (
            (event.clientY - rect.top)
            / rect.height
            - .5
          ) * 7;


        const orb =
          miraButton.querySelector(
            ".mira-orb"
          );


        orb?.style.setProperty(
          "--mx",
          `${x}px`
        );


        orb?.style.setProperty(
          "--my",
          `${y}px`
        );

      }
    );


    miraButton?.addEventListener(
      "pointerleave",
      () => {

        const orb =
          miraButton.querySelector(
            ".mira-orb"
          );


        orb?.style.setProperty(
          "--mx",
          "0px"
        );


        orb?.style.setProperty(
          "--my",
          "0px"
        );

      }
    );

  }


  /* =========================================================
     KEYBOARD
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if(
        event.key !== "Escape"
      ){
        return;
      }


      closeLightbox();

      closeMira();

      closeMenu();

      closeProfile();

    }
  );


  /* =========================================================
     FIRST VISIT MIRA
  ========================================================= */

  try{

    const seen =
      sessionStorage.getItem(
        "mira-presence"
      );


    if(
      !seen &&
      !reduced
    ){

      window.setTimeout(
        () => {

          miraButton?.animate(
            [
              {
                transform:"scale(1)"
              },

              {
                transform:"scale(1.1)"
              },

              {
                transform:"scale(1)"
              }
            ],
            {
              duration:800,

              easing:"ease-in-out"
            }
          );


          sessionStorage.setItem(
            "mira-presence",
            "1"
          );

        },
        2400
      );

    }

  }catch(error){

    /* Storage may be blocked. */

  }


  /* =========================================================
     SCROLL AMBIENCE
  ========================================================= */

  const glowA =
    document.querySelector(
      ".glow-a"
    );

  const glowB =
    document.querySelector(
      ".glow-b"
    );


  let scrollFrame =
    false;


  window.addEventListener(
    "scroll",
    () => {

      if(
        reduced ||
        scrollFrame
      ){
        return;
      }


      scrollFrame =
        true;


      requestAnimationFrame(
        () => {

          const max =
            document.documentElement
              .scrollHeight
            - window.innerHeight;


          const progress =
            max > 0
              ? window.scrollY / max
              : 0;


          if(glowA){

            glowA.style.transform =
              `translateY(${progress * 100}px)`;

          }


          if(glowB){

            glowB.style.transform =
              `translateY(${-progress * 130}px)`;

          }


          scrollFrame =
            false;

        }
      );

    },
    {
      passive:true
    }
  );


  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  document.addEventListener(
    "error",
    event => {

      const target =
        event.target;


      if(
        target &&
        target.tagName === "IMG"
      ){

        target.style.background =
          "#111015";

      }

    },
    true
  );


});
