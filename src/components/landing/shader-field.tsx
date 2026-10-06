import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_dark;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + 0.13;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float t = u_time * 0.045;
  vec2 m = (u_mouse - 0.5) * 0.5;

  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p * 1.4 + 3.2 * q + vec2(1.7, 9.2) + 0.15 * t + m),
    fbm(p * 1.4 + 3.2 * q + vec2(8.3, 2.8) + 0.126 * t - m)
  );
  float f = fbm(p * 1.4 + 3.0 * r);

  vec3 darkBase = vec3(0.071, 0.062, 0.054);
  vec3 lightBase = vec3(0.958, 0.938, 0.902);
  vec3 base = mix(lightBase, darkBase, u_dark);

  vec3 umber = mix(vec3(0.86, 0.76, 0.62), vec3(0.22, 0.13, 0.07), u_dark);
  vec3 bronze = mix(vec3(0.74, 0.52, 0.29), vec3(0.80, 0.56, 0.30), u_dark);
  vec3 glow = vec3(0.95, 0.78, 0.52);

  vec3 col = base;
  col = mix(col, umber, clamp(f * f * 2.2, 0.0, 1.0) * 0.85);
  col = mix(col, bronze, smoothstep(0.55, 0.95, f) * (0.55 + 0.25 * length(q)));
  col = mix(col, glow, smoothstep(0.78, 1.05, f + 0.15 * r.x) * 0.35 * u_dark);

  // Soft vignette pulling edges back to the page background
  float v = smoothstep(1.25, 0.15, length(p * vec2(0.85, 1.1)));
  col = mix(base, col, v);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

interface ShaderFieldProps {
  dark?: boolean;
  className?: string;
  /** Render scale relative to CSS pixels. Noise is soft, so low values look identical and run much faster. */
  scale?: number;
}

export function ShaderField({ dark = true, className, scale = 0.55 }: ShaderFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(dark ? 1 : 0);
  darkRef.current = dark ? 1 : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uDark = gl.getUniformLocation(prog, "u_dark");

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let dk = darkRef.current;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const start = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      dk += (darkRef.current - dk) * 0.08;
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000 + 12);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uDark, dk);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [scale]);

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ width: "100%", height: "100%", display: "block" }} />;
}
