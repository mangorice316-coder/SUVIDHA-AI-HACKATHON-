import React, { useEffect, useRef } from 'react';

interface ShaderGradientProps {
  colorA?: string; // Hex e.g. '#00e5ff'
  colorB?: string; // Hex e.g. '#10b981'
  colorC?: string; // Hex e.g. '#a855f7'
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ShaderGradientCanvas: React.FC<ShaderGradientProps> = ({
  colorA = '#00e5ff',
  colorB = '#10b981',
  colorC = '#090d16',
  speed = 0.002,
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Simple quad vertices
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vertexShaderSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSrc = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      
      // Simplex noise-like pattern for fluid shader gradient
      vec3 colorA = vec3(0.0, 0.9, 1.0);   // Cyan
      vec3 colorB = vec3(0.06, 0.72, 0.5);  // Emerald
      vec3 colorC = vec3(0.04, 0.05, 0.09); // Dark Canvas

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        float d = length(st - vec2(0.5, 0.5));
        float t = u_time * 0.8;

        float wave1 = sin(st.x * 3.0 + t) * cos(st.y * 3.0 + t);
        float wave2 = sin(st.y * 4.0 - t * 0.5) * 0.5;

        float mixFactor = smoothstep(0.0, 1.0, wave1 + wave2 + d * 0.5);
        vec3 finalColor = mix(colorC, mix(colorA, colorB, st.x + wave2), mixFactor * 0.35);

        gl_FragColor = vec4(finalColor, 0.85);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const resUniform = gl.getUniformLocation(program, 'u_resolution');
    const timeUniform = gl.getUniformLocation(program, 'u_time');

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += speed;
      if (canvas) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resUniform, canvas.width, canvas.height);
        gl.uniform1f(timeUniform, time);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [colorA, colorB, colorC, speed]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={150}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        borderRadius: 'inherit',
        opacity: 0.75,
        ...style
      }}
    />
  );
};
