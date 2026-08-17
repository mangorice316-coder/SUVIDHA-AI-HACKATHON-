import React from 'react';
import { Lottie } from 'lottie-react';

// Lightweight embedded Lottie JSON data for instant offline success checkmarks
const CHECKMARK_LOTTIE = {
  v: "5.5.7",
  fr: 60,
  ip: 0,
  op: 60,
  w: 120,
  h: 120,
  nm: "Success Check",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Checkmark",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { 
          a: 1, 
          k: [
            { i: { x: [0.16, 0.16, 0.16], y: [1, 1, 1] }, o: { x: [0.3, 0.3, 0.3], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] },
            { t: 30, s: [100, 100, 100] }
          ] 
        }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [70, 70] }
            },
            {
              ty: "st",
              c: { a: 0, k: [0, 0.9, 0.6, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 5 },
              lc: 2,
              lj: 2
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    }
  ]
};

export const LottieSuccessAnimation: React.FC<{ size?: number }> = ({ size = 64 }) => {
  return (
    <div style={{ width: size, height: size, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Lottie
        src={CHECKMARK_LOTTIE}
        autoplay
        style={{ width: size, height: size }}
      />
    </div>
  );
};
