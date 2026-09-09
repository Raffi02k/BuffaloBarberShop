import type { CSSProperties } from "react";
const paths={
  arrow: 'M5 19 19 5M5 5h14v14',arrowRight: 'M4 12h16m-6-6 6 6-6 6',arrowLeft: 'M20 12H4m6-6-6 6 6 6',down: 'M12 4v16m-6-6 6 6 6-6',
  plus: 'M12 5v14M5 12h14',close: 'm6 6 12 12M6 18 18 6',menu: 'M4 8h16M4 16h16',play: 'm8 5 11 7-11 7Z',pause: 'M8 5v14M16 5v14',
  pin: 'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M17.5 6.5h.01',
  phone: 'M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c0 2-3 2-4 2A18 18 0 0 1 3 7c0-1 0-4 2-4Z',
  check: 'm5 12 4 4L19 6',star: 'm12 3 2.8 5.7 6.3.9-4.5 4.4 1.1 6.3-5.7-3-5.7 3 1.1-6.3L3.2 9.6l6.2-.9Z',
  expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5'
};
export function Icon({ name='arrow',className='',style }: { name?: keyof typeof paths; className?: string; style?: CSSProperties; }={}) {
  return <svg viewBox={"0 0 24 24"} className={`icon ${className}`} style={style} aria-hidden={"true"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.5"} strokeLinecap={"round"} strokeLinejoin={"round"}><path d={paths[name]} /></svg>;
}
