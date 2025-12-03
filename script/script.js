console.clear();

const gsapAni__init = () => {
  const AniTarget = document.querySelectorAll(`
      [data-gsap="fade"],
      [data-gsap="popin"],
      [data-gsap="slideLeft"],
      [data-gsap="slideRight"],
      [data-gsap="slideUp"],
      [data-gsap="counter"],
      [data-gsap="curtain"],
      [data-gsap="fadeUp"]`);

  if (AniTarget.length === 0) return;
  gaspAni__logo();
  hoverAni();
  gsapAni_hoverToRotate();
  gaspAni__jourenyMap();
  gaspAni__projectGaol();
  gsapAni__character__init();

  gsapAni__graph(".mask-circle-1", ".sec-survey .box-1");
  gsapAni__graph(".mask-circle-2", ".sec-survey .box-2");
  const Duration = 600;

  AniTarget.forEach((el) => {
    const AniName = el.getAttribute("data-gsap");
    const delay = Number(el.dataset.delay) || 0;
    let scrub = el.dataset.scrub || 1;
    if (scrub === "false") scrub = false;

    gsap.set(el, { transformOrigin: "50% 50%" });

    if (AniName === "popin") {
      gsapAni__popIn(el, Duration, delay);
    } else if (AniName === "fade") {
      gsapAni__fade(el, Duration, delay, scrub);
    } else if (AniName === "slideLeft") {
      gsapAni__slideLeft(el, Duration, delay);
    } else if (AniName === "slideRight") {
      gsapAni__slideRight(el, Duration, delay);
    } else if (AniName === "slideUp") {
      gsapAni__slideUp(el, Duration, delay, scrub);
    } else if (AniName === "fadeUp") {
      gsapAni__fadeUp(el, Duration, delay);
    } else if (AniName === "counter") {
      gsapAni__counter(el, Duration, delay);
    } else if (AniName === "curtain") {
      gsapAni__curtainCall(el, Duration, delay, scrub);
    }

    AOS.refresh();
  });
};

const gsapAni__popIn = (target, duration, delay) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { scale: 0.75, opacity: 0, duration: duration / 1000, ease: "none" });
  tl.to(target, { scale: 1.04, ease: "none" });
  tl.to(target, { scale: 1, ease: "none" });
  gaspAni__createST(target, tl, 1);
};

const gsapAni__fadeUp = (target, duration, delay) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { y: 100, opacity: 0, duration: duration / 1000, ease: "power1.out" });
  gaspAni__createST(target, tl, false);
};

const gsapAni__fade = (target, duration, delay, scrub) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { opacity: 0, duration: duration / 1000, ease: "none" });
  gaspAni__createST(target, tl, scrub);
};

const gsapAni__slideLeft = (target, duration, delay) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { opacity: 0, x: "-25%", duration: duration / 1000, ease: "none" });
  gaspAni__createST(target, tl, 1);
};

const gsapAni__slideRight = (target, duration, delay) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { opacity: 0, x: "25%", duration: duration / 1000, ease: "none" });
  gaspAni__createST(target, tl, 1);
};

const gsapAni__slideUp = (target, duration, delay, isScrub) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { y: "50%", duration: duration / 1000, ease: "power1.out" });
  gaspAni__createST(target, tl, isScrub);
};

const gsapAni__counter = (target, duration, delay) => {
  let targetNum = parseFloat(target.getAttribute("data-target"));
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.to(target, {
    innerHTML: targetNum,
    duration: (duration * 3) / 1000,
    snap: { innerHTML: 0.1 },
    ease: "none",
  });
  gaspAni__createST(target, tl, false);
};

const gsapAni__curtainCall = (target, duration, delay, scrub) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.fromTo(target, { clipPath: "rect(0% 50% 100% 50%)" }, { clipPath: "rect(0% 100% 100% 0%)", duration: (duration * 2) / 1000, ease: "power1.out" });
  gaspAni__createST(target, tl, scrub);
};

const gaspAni__createST = (targetEl, timeline, scrub) => {
  const st = ScrollTrigger.create({
    trigger: targetEl,
    animation: timeline,
    scrub: scrub,
    start: "top bottom",
    end: "bottom +=75%",
    toggleActions: "play none none reverse",
  });
};
function hoverAni() {
  const targetAll = document.querySelectorAll(`[data-hover="up"]`);
  targetAll.forEach((el) => {
    el.addEventListener("pointerenter", () => {
      gsap.to(el, { y: "-0.5vw", duration: 0.3, ease: "power1.out" });
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { y: 0, duration: 0.3, ease: "power1.out" });
    });
  });
}

const gsapAni_hoverToRotate = () => {
  const targetAll = document.querySelectorAll(`[data-hover="rotate"]`);

  targetAll.forEach((el) => {
    gsap.to(el, { transformOrigin: "50% 50%" });
    el.addEventListener("pointerenter", () => {
      gsap.to(el, { rotate: -6, scale: 1.02, duration: 0.6, ease: "power4.inOut" });
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { rotate: 0, scale: 1, duration: 0.6, ease: "power4.inOut" });
    });
  });
};

const gaspAni__logo = () => {
  const pathArr = document.querySelectorAll(".sec-hero .logo path");

  let duration = 0.4,
    ease = "power1.out";

  const tl = gsap.timeline();
  tl.from(pathArr, {
    opacity: 0,
    scale: 0.5,
    filter: "blur(4px)",
    transformOrigin: "50% 50%",
    stagger: (duration * 2) / pathArr.length,
    duration: duration,
    ease: ease,
  });
  tl.to(pathArr[9], { x: 5, y: -5, yoyo: true, repeat: 1, duration: duration, ease: ease });
  tl.to(pathArr[3], { x: 5, y: -5, yoyo: true, repeat: 1, duration: duration, ease: ease });

  const mainImg = document.querySelector(".sec-hero > .img-box img");
  gsap.from(mainImg, { y: 100, opacity: 0, duration: 1, ease: "power1.out" });

  const mainText = document.querySelector(".sec-hero .content-wrap");
  gsap.from(mainText, { y: -100, opacity: 0, duration: 1, delay: 0.5, ease: "power1.out" });
};

const gaspAni__jourenyMap = () => {
  const pathNodeList = document.querySelectorAll(".sec-journeyMap .grid-box .svg-box path");
  const pathArr = Array.from(pathNodeList);
  pathArr.splice(0, 4);

  const tl = gsap.timeline({ delay: 1.4 });
  tl.from(pathArr, { opacity: 0, ease: "power1.out", stagger: 0.1 });

  gaspAni__createST(pathArr, tl, false);
};

const gaspAni__projectGaol = () => {
  // 스크롤트리거 시작할 지점 불러오기
  const pinTarget = document.querySelector(".sec-projectGoal");

  // 애니메이션 넣을 요소들 찾기
  const svgItems = pinTarget.querySelectorAll(".svg-box");
  const textBox = pinTarget.querySelector(".heading-text");

  //svg-box들 로고,캐릭터 제거하고 나머지 쪼가리들만 남기는 과정
  // 1. 노드리스트에서 어레이로 변환 (노드리스트는 수정불가)
  // 2. splice를 통해 인덱스0번부터 2개 제거
  const particle = Array.from(svgItems);
  particle.splice(0, 2);

  // 여러 요소들 애니메이션 관리를 위해 gsap 타임라인 생성
  const tl = gsap.timeline();

  // 타임라인에 gsap 트윈 메서드를 통해 애니메이션 추가
  // from : 지정된 스타일에서 css스타일로
  // to : css스타일에서 지정된 스타일로
  // fromTo : 지정된 스타일에서 지정된 스타일로
  // add : 타임라인에 태그 추가
  tl.from(svgItems[1], { opacity: 0 });
  tl.to(textBox, { opacity: 0, y: 100 });
  tl.add("start");
  tl.from(particle, { top: "50%", left: "50%", rotate: 360, scale: 0.75, opacity: 0, stagger: 0.04 }, "start");
  tl.from(pinTarget, { backgroundColor: "#fff" }, "start");
  tl.from(svgItems[0], { opacity: 0, scale: 0.75 }, "start");
  tl.to(svgItems[1], { y: "-100%" }, "<50%");
  tl.to(svgItems[0], { y: -200, rotate: 4 }, "<");

  // 스크롤 트리거로 애니메이션 발동
  const st = ScrollTrigger.create({
    trigger: pinTarget, //발동지점 설정
    pin: true, //화면 고정 설정 불리언값, 혹은 핀하고 싶은 요소
    end: "+=200%", //스크롤 거리 설정 200vh만큼 스크롤
    animation: tl, //애니메이션 타임라인 연결
    scrub: 1, //애니메이션 반응속도 지정, 0은 즉시, 숫자올라갈수록 반응속도 느려짐

    onLeave: () => AOS.refresh(),
  });
};

gsap.registerPlugin(ScrollTrigger);

// GSAP scrollTrigger ------------------------------ //
function scrollTrigger__init() {
  const pinStart = document.querySelector(".sec-positioning");
  const circles = pinStart.querySelectorAll(".graph-inside-logo");

  const tl = gsap.timeline();
  tl.from(circles, { top: "50%", left: "50%", translate: "0% 0%", opacity: 0, duration: 1, ease: "bounce.out", stagger: 0.05 });

  ScrollTrigger.create({
    trigger: pinStart,
    animation: tl,
    start: "top center",
    toggleActions: "play none none reverse",
  });
}

function tooltip() {
  const toolTipBox = document.querySelector(".tooltip-box");
  const toolTipText = toolTipBox.querySelector(".tipText");
  const hoverEl = document.querySelectorAll(`[data-hover="true"]`);

  document.addEventListener("mousemove", (eh) => {
    let mouseX = eh.clientX;
    let mouseY = eh.clientY;
    toolTipBox.style.transform = `translate3d(${mouseX + 10}px, calc(${mouseY}px + 2.4rem), 0)`;
  });

  hoverEl.forEach((el) => {
    let text;
    let timer;

    el.addEventListener("mouseenter", (e) => {
      text = el.getAttribute("data-hover-text");
      toolTipText.innerHTML = text;

      timer = setTimeout(() => {
        clearTimeout(timer);

        toolTipBox.classList.add("active");
      }, 400);
    });
    el.addEventListener("mouseleave", (e) => {
      clearTimeout(timer);
      toolTipBox.classList.remove("active");
    });
  });
}

const gsapAni__character__init = () => {
  const character1 = document.querySelector(".sec-character-normal");
  const characterEl = character1.querySelector(".img-container");
  const character2 = document.querySelector(".sec-character-vary");
  const characterEl2 = character2.querySelector(".img-container");

  const characterEl3 = document.querySelector(".sec-gui-Onboarding-intro-grid .onboarding-background-img-box");
  const distance = 500;

  const tl1 = gsap.timeline();
  tl1.from(characterEl, { x: -distance, rotate: -10, ease: "none" });

  const tl2 = gsap.timeline();
  tl2.from(characterEl2, { x: distance, rotate: 10, ease: "none" });

  gsap.set(characterEl3, { transformOrigin: "50% 50%" });
  const tl3 = gsap.timeline();
  tl3.from(characterEl3, { opacity: 0, x: 100, ease: "none" });
  tl3.to(characterEl3, { rotate: 0, ease: "none" }, "<");

  function gsapAni__characterST(trigger, tl) {
    const st = ScrollTrigger.create({
      trigger: trigger,
      animation: tl,
      end: "+=50%",
      scrub: 1,
    });
  }
  const chLevelUp = document.querySelector(".sec-character-level-up");
  const imgContainers = chLevelUp.querySelectorAll(".img-container");

  const tlLevelUp = gsap.timeline();
  gsap.set(imgContainers, { transformOrigin: "50% 50%" });
  tlLevelUp.from(imgContainers, { opacity: 0, scale: 0.75, ease: "none", stagger: 0.1 }).to(imgContainers, { scale: 1.05, ease: "none", stagger: 0.1 }, "<50%").to(imgContainers, { scale: 1, ease: "none", stagger: 0.1 });

  const stLevelUp = ScrollTrigger.create({
    trigger: chLevelUp,
    animation: tlLevelUp,
    start: "20% center",
    end: "60% center",
    scrub: 1,
  });

  gsapAni__characterST(character1, tl1);
  gsapAni__characterST(character2, tl2);
  gsapAni__characterST(characterEl3, tl3);
};

const gsapAni__graph = (target, startPoint) => {
  const maskCircle = document.querySelector(target);

  const r = 82.5;
  const circumference = 2 * Math.PI * r;

  gsap.set(maskCircle, {
    strokeDasharray: circumference,
    strokeDashoffset: circumference,
  });

  gsap.to(maskCircle, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: startPoint,
      start: "top center",
      end: "+=30%",
      scrub: 1,
    },
  });
};
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  gsapAni__init();
  scrollTrigger__init();
  tooltip();
});
