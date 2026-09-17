import { useEffect, useRef } from "react";

type DriftNode = {
  char: string;
  speed: number;
  x: number;
  y: number;
};

type DriftBeam = {
  length: number;
  opacity: number;
  speed: number;
  x: number;
  y: number;
};

const PARTICLE_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const GWS_CRIMSON = "132, 22, 23";
const GWS_CREAM = "248, 246, 236";

/**
 * GWS adaptation of the supplied Particle Drift concept. It is intentionally
 * canvas-only so the protected Buyer Journey package remains unchanged.
 */
export function GwsParticleDrift() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000 };
    let beams: DriftBeam[] = [];
    let frameId = 0;
    let height = 0;
    let nodes: DriftNode[] = [];
    let width = 0;

    const randomChar = () => PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)];

    const resetParticles = () => {
      const reducedMotion = motionQuery.matches;
      const nodeCount = reducedMotion ? 28 : 58;
      const beamCount = reducedMotion ? 7 : 15;
      nodes = Array.from({ length: nodeCount }, () => ({
        char: randomChar(),
        speed: reducedMotion ? 0 : Math.random() * 0.22 + 0.05,
        x: Math.random() * width,
        y: Math.random() * height,
      }));
      beams = Array.from({ length: beamCount }, () => ({
        length: Math.random() * 100 + 40,
        opacity: Math.random() * 0.24 + 0.13,
        speed: reducedMotion ? 0 : Math.random() * 2.1 + 0.9,
        x: Math.random() * width,
        y: Math.random() * height,
      }));
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      resetParticles();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      beams.forEach((beam) => {
        beam.y -= beam.speed;
        if (beam.y + beam.length < 0) {
          beam.y = height + beam.length;
          beam.x = Math.random() * width;
        }
        const gradient = context.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.length);
        gradient.addColorStop(0, `rgba(${GWS_CRIMSON}, ${beam.opacity})`);
        gradient.addColorStop(1, "rgba(132, 22, 23, 0)");
        context.strokeStyle = gradient;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(beam.x, beam.y);
        context.lineTo(beam.x, beam.y + beam.length);
        context.stroke();
      });

      context.font = "11px monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.lineWidth = 0.5;

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const a = nodes[first];
          const b = nodes[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 118) {
            context.strokeStyle = `rgba(${GWS_CRIMSON}, ${0.16 * (1 - distance / 118)})`;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        node.y += node.speed;
        if (node.y > height + 14) {
          node.y = -14;
          node.x = Math.random() * width;
        }
        const distance = Math.hypot(pointer.x - node.x, pointer.y - node.y);
        if (distance < 168 && !motionQuery.matches) {
          node.char = randomChar();
          context.strokeStyle = `rgba(${GWS_CRIMSON}, ${0.52 * (1 - distance / 168)})`;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(pointer.x, pointer.y);
          context.stroke();
        }
        context.fillStyle = distance < 168 ? `rgba(${GWS_CREAM}, .96)` : `rgba(${GWS_CREAM}, .3)`;
        context.fillText(node.char, node.x, node.y);
      });

      if (!motionQuery.matches) frameId = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };
    const onMotionChange = () => {
      window.cancelAnimationFrame(frameId);
      resize();
      draw();
    };

    resize();
    draw();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onMotionChange);
    motionQuery.addEventListener("change", onMotionChange);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onMotionChange);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="gws-ai-visibility-particle-canvas" aria-hidden="true" />;
}
