/*  Reveal text */
gsap.registerPlugin(ScrollTrigger);
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char, i) => {
    const text = new SplitType(char, {
        types: "chars"
    });
    gsap.from(text.chars, {
        scrollTrigger: {
            trigger: char,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            markers: false,
            scrub: 1, // Delay
        },
        opacity: 0.1,
        stagger: 0.1,
    });
});
/*  Reveal text  Ends */







/*  scroll_sec  */
const sections = gsap.utils.toArray(".scroll_divs");

const stInstances = [];

sections.forEach((section, index) => {
    let panel = Array.from(section.querySelectorAll(".panel"));

    let tl = gsap.timeline({
        scrollTrigger: {
            pin: true,
            scrub: 1,
            trigger: section,
            invalidateOnRefresh: true,
            end: () =>
                "+=" + (section.scrollWidth - document.documentElement.clientWidth)
        }
    });
    tl.to(
        panel, {
        x: () =>
            -(section.scrollWidth - document.documentElement.clientWidth) + "px",
        duration: 1,
        ease: "none"
    },
        0.05
    );
    tl.to({}, {
        duration: 0.1
    }); // some padding at the end
    stInstances.push(tl.scrollTrigger);
});

document.querySelectorAll("[data-trigger]").forEach((item, index) => {
    item.addEventListener("click", (event) => {
        event.preventDefault();
        const st = stInstances[index];
        gsap.set(window, {
            scrollTo: {
                y: st.start
            }
        });
        st.animation.progress(0);
    });
});

/*    COMMON */


const gsap_fade_up = document.querySelectorAll('.circle1');

gsap_fade_up.forEach((circle) => {
    const a1 = gsap.fromTo(circle, {
        x: 1500,
        opacity: 0,
        duration: 1,
        scale: 0.2
    }, {
        x: 200,
        opacity: 1,
        duration: 1,
        scale: 2
    });

    ScrollTrigger.create({
        trigger: '.founder',
        animation: a1,
        start: 'top bottom',
        end: 'bottom center',
        scrub: 1,
    });
});



const gsap_fade_left = document.querySelectorAll('.circle2');

gsap_fade_left.forEach((circle2) => {
    const a2 = gsap.fromTo(circle2, {
        y: 800,
        x: 100,
        opacity: 0,
        duration: 1,
        rotation: -30,
    }, {
        y: 0,
        x: 1000,
        opacity: 1,
        duration: 1,
        rotation: 30,
    });

    ScrollTrigger.create({
        trigger: '.founder',
        animation: a2,
        start: 'top bottom',
        end: 'bottom center',
        scrub: 1,
    });
});









