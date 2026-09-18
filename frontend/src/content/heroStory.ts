// Frame rate must match the scrub-optimized video (including any env override).
export const heroStory={
  fps: 24,
  scrub: .5,
  chapterStarts: [.32,.7],
  chapterJumps: [0,.49,.9],
  posters: ['/media/hero-buffalo-poster.jpg','/images/salon-atmosphere.webp','/images/kenais-cut.webp'],
};

const clamp=(n: number) => Math.max(0,Math.min(1,n));
export function chapterOpacity(progress: number) {
  return [
    1-clamp((progress-.20)/.12),
    Math.min(clamp((progress-.24)/.12),clamp((.76-progress)/.13)),
    clamp((progress-.67)/.13),
  ];
}
