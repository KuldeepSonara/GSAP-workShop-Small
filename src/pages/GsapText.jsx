import { useEffect } from "react";
import { gsap } from "gsap";
import Flip from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import "./style.css";

const GsapText = () => {
  gsap.registerPlugin(Flip);

  useEffect(() => {
    let layouts = ["final", "plain", "columns", "grid"],
      container = document.querySelector(".container"),
      curLayout = 0; // index of the current layout

    function nextState() {
      const state = Flip.getState(".letter, .for, .gsap", {
        props: "color,backgroundColor",
        simple: true,
      }); // capture current state

      container.classList.remove(layouts[curLayout]); // remove old class
      curLayout = (curLayout + 1) % layouts.length; // increment (loop back to the start if at the end)
      container.classList.add(layouts[curLayout]); // add the new class

      Flip.from(state, {
        // animate from the previous state
        absolute: true,
        stagger: 0.07,
        duration: 0.7,
        ease: "power2.inOut",
        spin: curLayout === 0, // only spin when going to the "final" layout
        simple: true,
        onEnter: (elements, animation) =>
          gsap.fromTo(
            elements,
            { opacity: 0 },
            { opacity: 1, delay: animation.duration() - 0.1 }
          ),
        onLeave: (elements) => gsap.to(elements, { opacity: 0 }),
      });

      gsap.delayedCall(curLayout === 0 ? 3.5 : 1.5, nextState);
    }

    gsap.delayedCall(1, nextState);

    return () => {
      // Clean up any GSAP animations when the component unmounts
      gsap.killTweensOf(".letter, .for, .gsap, .oculus");
    };
  }, []);

  useGSAP(() => {
    gsap.to("#text", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power1.out",
    });

    gsap.fromTo(
      ".para",
      {
        opacity: 0,
        y: 10,
        x: 20,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        ease: "power1.out",
        stagger: 0.5,
      }
    );
  });

  return (
    <main>
      <style></style>
      <h1 id="text" className="opacity-0 translate-y-10">
        GsapText
      </h1>

      <p className="mt-5 text-gray-500 para">
        We can use same method like <code>gsap.to()</code>,{" "}
        <code>gsap.from()</code>, <code>gsap.fromTo()</code> and{" "}
        <code>gsap.timeline()</code> to animate text.
      </p>

      <p className="mt-5 text-gray-500 para">
        Using these methods we can achieve various text animations and effects
        like fade in, fade out, slide in, slide out, and many more.
      </p>

      <p className="mt-5 text-gray-500 para">
        For more advanced text animations and effects, you can explore the GSAP
        TextPlugin or other third-party libraries that specialize in text
        animations.
      </p>

      <p className="mt-5 text-gray-500 para">
        Read more about the{" "}
        <a
          href="https://greensock.com/docs/v3/Plugins/TextPlugin"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          TextPlugin
        </a>{" "}
        plugin.
      </p>

      <div className="container final">
        <div className="letter F">F</div>
        <div className="letter l">L</div>
        <div className="letter i">I</div>
        <div className="letter p">P</div>
        <div className="for">for</div>
        <div className="gsap">GSAP</div>
      </div>

      <a href="https://gsap.com/">
        <img
          src="https://assets.codepen.io/16327/gsap-logo-light.svg"
          className="logo"
        />
      </a>
    </main>
  );
};

export default GsapText;
