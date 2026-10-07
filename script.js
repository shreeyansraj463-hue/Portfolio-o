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
     MIRA 2.0 — LOCAL CONVERSATIONAL ENGINE
  ========================================================= */

  const miraKnowledge = {
    mira:{
      keys:["who are you","what are you","who is mira","tell me about mira","your name","what is mira","are you ai","are you real"],
      variants:[
        "Hnnn bro 👀 I'm Mira — the AI Shreeyans built for this portfolio. I'm here to make the site feel more like a conversation than a menu.",
        "Yap, Mira here ✨ I'm an AI created by Shreeyans. Ask me about him, his work, his interests, or me — I know the public story he's chosen to put here.",
        "I'm Mira 😌 — Shreeyans's portfolio AI. Think of me as the slightly nosy guide who actually knows the person behind the website."
      ]
    },
    creator:{
      keys:["who created you","who made you","who built you","your creator","who is your creator"],
      variants:[
        "Shreeyans created me. He built this portfolio and gave me a place inside it — that's where Mira's story starts.",
        "Acha, that one's easy 😌 Shreeyans built me. Creator → Mira. Simple.",
        "Hnnn… Shreeyans. My creator. He made me to be part of this portfolio, not just another random chatbot."
      ]
    },
    identity:{
      keys:["who is shreeyans","tell me about shreeyans","about shreeyans","shreeyans raj","who is shrey","about shrey","who is rishu","about rishu"],
      variants:[
        "Shreeyans Raj — Shrey to some, Rishu to others — is an engineering-minded creative who mixes frontend development, interactive design, physics, art, writing, music and a lot of curiosity.",
        "Shreeyans? Think code + creative tech + curiosity. He builds interactive web experiences, plays with 3D and physics, sketches, writes, listens to a ridiculous amount of music and keeps experimenting.",
        "He's Shreeyans Raj, though Shrey and Rishu work too. His world sits somewhere between engineering, interactive technology and creative expression."
      ], target:"#about", label:"Read about Shreeyans"
    },
    personal:{
      keys:["full name","real name","name","nickname","nicknames","preferred name","birthday","birth date","born","date of birth","dob","how old is shreeyans","age"],
      variants:[
        "His full name is Shreeyans Raj. Shrey is his preferred name and Rishu is a nickname. He was born on February 27, 2008.",
        "Hnnn — Shreeyans Raj, usually Shrey, sometimes Rishu 😌. Birthday: February 27, 2008.",
        "The public profile says Shreeyans Raj, with Shrey as the preferred name and Rishu as a nickname. He was born February 27, 2008."
      ], target:"#about", label:"Open profile"
    },
    projects:{
      keys:["projects","project","what did he build","what has he built","featured work","his work","what has shreeyans built"],
      variants:[
        "His work leans heavily into interactive tech: a 3D hand-gesture particle system using Three.js and MediaPipe Hands, Camlab, and a Unity/C# 3D multiplayer PUBG-style starter project.",
        "The portfolio shows hand-controlled 3D particles, frontend/interface experiments through Camlab, and a Unity/C# 3D multiplayer starter inspired by PUBG-style gameplay.",
        "Yep — interactive stuff is his thing. Three.js + MediaPipe hand gestures, Camlab for frontend experimentation, and a Unity/C# multiplayer 3D starter project."
      ], target:"#work", label:"View selected work"
    },
    particle:{
      keys:["particle","gesture","hand tracking","hand controlled","three.js","threejs","webgl","mediapipe","hand gesture"],
      variants:[
        "The Hand-Gesture 3D Particle System uses webcam hand movement to drive a real-time Three.js particle environment with MediaPipe Hands.",
        "That project is basically hands → camera → MediaPipe Hands → Three.js particles. Your gestures become part of the interface.",
        "Yep — webcam hand tracking controls the 3D particle experience. Three.js handles the scene and MediaPipe Hands provides the gesture input."
      ], target:"#work", label:"View particle project"
    },
    camlab:{
      keys:["camlab","interface","ui","ux","frontend","motion design"],
      variants:[
        "Camlab is an experimental frontend project focused on interaction, smooth motion and visual presentation.",
        "Camlab is the interface playground — interaction, motion and presentation rather than just static pages.",
        "Camlab explores how an interface feels: frontend work with an emphasis on interaction and motion."
      ], target:"#work", label:"View Camlab"
    },
    gaming:{
      keys:["gaming","game","games","unity","c#","c sharp","pubg","multiplayer","3d game"],
      variants:[
        "His gaming curiosity took him into Unity and C#, where he explored a 3D multiplayer PUBG-style starter project. Basically, he wanted to see how far the game-development side could go.",
        "Yep, games too 😭 He explored Unity + C# through a 3D multiplayer starter inspired by PUBG-style gameplay.",
        "On the gaming side, Unity and C# entered the picture — specifically through a 3D multiplayer PUBG-style starter project."
      ], target:"#work", label:"View the work"
    },
    skills:{
      keys:["skills","skill","technology","coding","programming","tech stack","what can he do","languages he uses","what technologies"],
      variants:[
        "His technical toolkit includes HTML, CSS, JavaScript, Python and Three.js, with work around WebGL, MediaPipe Hands, UI/UX and interactive design. Physics and mathematics sit alongside the coding side.",
        "Code-wise: HTML, CSS, JavaScript, Python and Three.js. Then there's WebGL, MediaPipe Hands, UI/UX, physics and maths — so it's not just a frontend-only toolbox.",
        "The main stack is HTML/CSS/JS + Python + Three.js, with interactive work using WebGL and MediaPipe Hands. He also mixes in physics, maths and design."
      ], target:"#capabilities", label:"View capabilities"
    },
    creative:{
      keys:["art","drawing","draw","sketch","sketching","creative","poem","poetry","writing","pencil art","pencil artwork","podcast script"],
      variants:[
        "There's a very offline side to him too — traditional pencil artwork and sketching, plus creative writing. He even wrote a podcast script called ‘The Physics of Heartbreak.’",
        "Acha, creative mode 🎨 He balances all the code with pencil art, sketching and writing. One of his writing projects is the podcast script ‘The Physics of Heartbreak.’",
        "Not everything is pixels and code. He sketches with a pencil, writes creatively, and has a podcast script titled ‘The Physics of Heartbreak.’"
      ], target:"#archive", label:"Open creative archive"
    },
    music:{
      keys:["music","songs","song","spotify","youtube music","artists","favorite artists","what music","what does he listen to","playlist"],
      variants:[
        "Music is a big part of his everyday life. His rotation jumps from KK, Nusrat Fateh Ali Khan, Kishore Kumar, Lata Mangeshkar and A.R. Rahman to Elvis Presley, Eminem, The Weeknd, Bruno Mars and One Direction.",
        "His music taste is properly all over the map 😭 — KK, Nusrat Fateh Ali Khan, Kishore Kumar, Lata Mangeshkar, A.R. Rahman, then Elvis, Eminem, The Weeknd, Bruno Mars and One Direction.",
        "Spotify and YouTube Music get a lot of use around here. Some go-tos include ‘Dil Se,’ ‘Die With A Smile’ and ‘Nadaan Parindey,’ alongside a very mixed artist lineup."
      ]
    },
    food:{
      keys:["food","foods","favorite food","favourite food","what does he eat","food he likes","biryani","gajar ka halwa","soyabean","tomato chutney","chicken","chicken leg"],
      variants:[
        "Food-wise, he's happily on both sides of the menu 😭. Gajar ka halwa and soyabean with tomato chutney are favorites, and chicken biryani and chicken leg pieces are definitely welcome too.",
        "Acha, important question 😂 He likes both veg and non-veg — gajar ka halwa, soyabean with tomato chutney, chicken biryani and chicken leg pieces are among the favorites.",
        "His food taste is balanced: gajar ka halwa and soyabean with tomato chutney on one side, chicken biryani and chicken legs on the other."
      ]
    },
    entertainment:{
      keys:["marvel","mcu","movies","movie","iron man","captain america","thor","hulk","black widow","spider-man","spiderman","entertainment","superhero"],
      variants:[
        "He's a dedicated Marvel Cinematic Universe follower. Iron Man, Captain America, Thor, Hulk, Black Widow and Spider-Man are all part of the lineup.",
        "Marvel definitely has a seat at the table 😌 — Iron Man, Cap, Thor, Hulk, Black Widow and Spider-Man are among the characters he follows.",
        "MCU fan, yep 😭. The familiar squad — Iron Man, Captain America, Thor, Hulk, Black Widow and Spider-Man — is very much his territory."
      ]
    },
    professional:{
      keys:["internshala","student partner","internshala student partner","professional","banner","raj medical","promotion","promotional web banner"],
      variants:[
        "He also stepped into a professional role through the Internshala Student Partner program and designed a promotional web banner for Raj Medical.",
        "Beyond personal projects, he joined the Internshala Student Partner program and worked on a promotional web banner for Raj Medical.",
        "Yep, there is some real-world work in the mix too — Internshala Student Partner and a promotional web banner designed for Raj Medical."
      ]
    },
    thinking:{
      keys:["thinking","think","logic","problem solving","problem","fundamental","approach","how does he think"],
      variants:[
        "His thinking style leans toward fundamentals: understand the mechanism, break the problem down, then build the solution instead of blindly brute-forcing it.",
        "Basically: don't just make it work — understand why it works. That fundamental approach shows up throughout the portfolio.",
        "He likes getting underneath the surface of a problem. Reduce it to fundamentals, understand the pieces, then rebuild it in a way that feels simple and meaningful."
      ], target:"#thinking", label:"See how he thinks"
    },
    future:{
      keys:["future","goal","career","direction","college","engineering","next","long term","plans","working toward","working towards"],
      variants:[
        "The direction is a mix of engineering and creative technology — especially deeper 3D web development, shaders, high-performance interfaces and immersive digital experiences.",
        "Future-wise, he's moving toward the overlap of engineering and creative tech: 3D, shaders, performance and immersive interfaces.",
        "He's still exploring, but the pattern is pretty clear: engineering on one side, creative technology on the other, with interactive 3D sitting right in the middle."
      ], target:"#future", label:"See the direction"
    },
    contact:{
      keys:["contact","email","mail","hire","opportunity","collaboration","collab","work with him"],
      variants:[
        "For opportunities and collaborations, the Contact section has the direct email address.",
        "Want to reach him? Head to Contact — especially for collaborations and opportunities.",
        "Yep, for a serious collaboration or opportunity, Contact is the right place."
      ], target:"#contact", label:"Go to contact"
    }
  };
  const miraState = {
    lastTopic:null,
    lastQuestion:"",
    repeatCount:0,
    turn:0,
    language:"en"
  };

  function normalizeMiraText(text){
    return String(text || "").toLowerCase().replace(/[^\p{L}\p{N}\s?]/gu," ").replace(/\s+/g," ").trim();
  }

  function detectMiraLanguage(text){
    const q=String(text||"");
    return /\b(hai|hain|kya|kaise|kaisa|kaun|tum|aap|mujhe|mera|mere|tera|teri|uska|batao|btao|kyu|kyon|nahi|nahin|acha|accha|haan|hnnn|bhai|bro|ye|woh|kahan|kab|kar|bana|banaya|chahiye|dikhao)\b/i.test(q)
      ? "hinglish" : "en";
  }

  function isGreeting(q){return /^(hi|hello|hey|hiya|yo|hii+|heyy+|namaste|hii mira|hey mira|hi mira)[!?\s]*$/i.test(q.trim());}
  function isThanks(q){return /\b(thanks|thank you|thx|ty|dhanyavaad|shukriya)\b/i.test(q);}
  function isBye(q){return /^(bye|goodbye|see you|cya|ttyl|jaa raha|chalo bye|gn|good night)[!?\s]*$/i.test(q.trim());}

  function chooseMiraVariant(item){
    const pool=item?.variants||[];
    if(!pool.length) return "";
    let index=miraState.turn % pool.length;
    if(pool.length>1 && pool[index]===miraState.lastQuestion) index=(index+1)%pool.length;
    return pool[index];
  }

  function scoreMiraItem(item,q){
    let score=0;
    item.keys.forEach(key=>{
      const k=normalizeMiraText(key);
      if(!k) return;
      if(q===k) score+=12;
      else if(new RegExp("\\b"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i").test(q)) score+=k.includes(" ")?7:(k.length>5?3:1);
      else if(k.length>4 && q.includes(k)) score+=2;
    });
    return score;
  }

  function getResponse(question){
    const raw=String(question||"").trim();
    const q=normalizeMiraText(raw);
    if(!q) return {text:"Hnnn bro 👀 say something and I'm listening."};

    miraState.turn+=1;
    miraState.language=detectMiraLanguage(raw);
    const lang=miraState.language;
    const previous=normalizeMiraText(miraState.lastQuestion);
    miraState.repeatCount=(previous && previous===q)?miraState.repeatCount+1:0;
    miraState.lastQuestion=raw;

    if(/\b(how old|age)\b.*(shreeyans|shrey|rishu|he|him)|\b(what is|whats|what's)\s+his age\b/i.test(raw)){
      return {text: lang==="hinglish" ? "Shreeyans was born on February 27, 2008, so he's 18 now 😌." : "Shreeyans was born on February 27, 2008, so he is 18 now."};
    }

    if(isGreeting(raw)){
      const list=lang==="hinglish"
        ? ["Hnnn bro 👀 kya scene? Mira online.","Areyyy hnnn 😭 Mira here. Bata bro, kya dekhna hai?","Haa bro ✨ I'm here. Portfolio mein kya explore karna hai?"]
        : ["Hnnn bro 👀 Mira online. What are we exploring?","Heyyy 😌 Mira here. What do you wanna know?","Yap, I'm here ✨ Ask me about me, Shreeyans or the portfolio."];
      return {text:list[miraState.turn%list.length]};
    }
    if(isThanks(raw)) return {text:lang==="hinglish"?["Hnnn, anytime bro 😌","Areee mention not 😂","Yap yap, always bro ✨"][miraState.turn%3]:["Anytime, bro 😌","Yap, you're welcome ✨","No worries. I'm right here."][miraState.turn%3]};
    if(isBye(raw)) return {text:lang==="hinglish"?"Hnnn, jaa bro 😭 milte hain phir.":"Alright bro 😌 see you around."};

    if(/^(tell me more|more|and|then|what about it|explain that|elaborate|aur|aur batao|iske baare mein|phir|haan|hnnn)$/i.test(q) && miraState.lastTopic){
      const item=miraKnowledge[miraState.lastTopic];
      return {text:chooseMiraVariant(item),target:item.target,label:item.label};
    }

    let best=null,bestScore=0,bestKey=null;
    const explicitMira=/\b(who are you|what are you|who is mira|tell me about mira|your name|what is mira|are you ai|are you real)\b/i.test(raw);
    const explicitCreator=/\b(who created you|who made you|who built you|your creator|who is your creator)\b/i.test(raw);
    Object.entries(miraKnowledge).forEach(([key,item])=>{
      if(explicitMira && key!=="mira") return;
      if(explicitCreator && key!=="creator") return;
      const score=scoreMiraItem(item,q);
      if(score>bestScore){bestScore=score;best=item;bestKey=key;}
    });

    if(best && bestScore>=1){
      miraState.lastTopic=bestKey;
      let text=chooseMiraVariant(best);
      if(miraState.repeatCount>=1){
        const tease=lang==="hinglish"
          ? ["Areee phir se? 😂","Bhai, ye toh abhi poocha tha 😭"][miraState.repeatCount%2]
          : ["Again? 😂","Bro, we just covered that 😭"][miraState.repeatCount%2];
        text=tease+" "+text;
      }
      return {text,target:best.target,label:best.label};
    }

    const follow=/\b(he|him|his|it|that|this|they|them|uske|uska|iske|yeh)\b/i.test(raw) && miraState.lastTopic;
    if(follow){
      const item=miraKnowledge[miraState.lastTopic];
      return {text:chooseMiraVariant(item),target:item.target,label:item.label};
    }

    const fallbacks=lang==="hinglish"
      ? ["Hmmm bro, ye portfolio ke public info se thoda bahar hai 😭 Mira guess nahi karegi. Publicly jo diya hai uske baare mein pucho 👀","Acha, iske liye mere paas enough public portfolio context nahi hai. Main private details invent/share nahi karungi.","Yap, but I don't want to make stuff up. Shreeyans ne portfolio par jo public kiya hai, main usi ke basis par bolungi."]
      : ["Hmm, that isn't covered by the portfolio's public information. I won't invent private details.","I don't have enough public portfolio context for that one yet. Ask me about Mira, Shreeyans, projects, skills, creative work, thinking, future or contact.","I could guess, but nah 😭 I'd rather stay accurate. Ask me about something represented on this site."];
    return {text:fallbacks[miraState.turn%fallbacks.length]};
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
     ASK MIRA
  ========================================================= */

  let pendingMiraResponses = 0;
  let miraResponseSerial = 0;

  function askMira(question){
    const cleanQuestion=String(question||"").trim();
    if(!cleanQuestion) return;
    if(!miraOpen) openMira();

    addMessage(cleanQuestion,"user");

    const result=getResponse(cleanQuestion);
    pendingMiraResponses += 1;
    miraResponseSerial += 1;
    const responseId=miraResponseSerial;

    typing?.classList.add("show");
    miraButton?.classList.add("thinking");

    // Each message owns its own timer. A new question can never cancel
    // an earlier answer, which is important when quick buttons are tapped
    // repeatedly or the user sends several messages quickly.
    window.setTimeout(()=>{
      pendingMiraResponses=Math.max(0,pendingMiraResponses-1);

      if(pendingMiraResponses===0){
        typing?.classList.remove("show");
        miraButton?.classList.remove("thinking");
      }

      miraButton?.classList.add("responding");
      addMessage(
        result.text,
        "bot",
        result.target?{target:result.target,label:result.label}:null
      );

      window.setTimeout(()=>{
        if(responseId===miraResponseSerial || pendingMiraResponses===0){
          miraButton?.classList.remove("responding");
        }
      },550);
    },reduced?80:480+Math.random()*300);
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
