// export default async function RevealAnimation() {
//   const ScrollReveal = (await import('scrollreveal')).default;
//   ScrollReveal.debug = true;
//   const sr = ScrollReveal({
//     distance: '60px',
//     duration: 2800,
//     reset: true,
//     interval: 100,
//     container: document.querySelector('#scroll'),
//   });
//   // sr.clean([
//   //   '#sr-top',
//   //   '#sr-bottom',
//   //   '#sr-bottom-delay',
//   //   '#sr-bottom-delay-hero',
//   //   '#sr-right-img-hero',
//   //   '#sr-right-img',
//   // ]);
//   sr.sync();
//   sr.reveal('#sr-top', {
//     origin: 'top',
//   });
//   sr.reveal('#sr-bottom', {
//     origin: 'bottom',
//   });

//   sr.reveal('#sr-bottom-delay', {
//     origin: 'bottom',
//     delay: 625,
//   });
//   sr.reveal('#sr-bottom-delay-hero', {
//     origin: 'bottom',
//     delay: 650,
//     beforeReveal: () =>
//       (document.querySelector('#sr-bottom-delay-hero').style.visibility =
//         'visible'),
//   });
//   sr.reveal('#sr-right-img-hero', {
//     origin: 'right',
//     distance: '220px',
//     scale: 1.3,
//     easing: 'ease-out',
//     duration: 1300,
//     reset: false,
//   });
//   sr.reveal('#sr-right-img', {
//     origin: 'right',
//     distance: '200px',
//     scale: 1.2,
//     easing: 'ease-out',
//     duration: 1250,
//     reset: false,
//   });
// }
export async function SrFeatured() {
  const ScrollReveal = (await import('scrollreveal')).default;
  const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    reset: true,
    interval: 100,
    container: document.querySelector('#scroll'),
  });
  sr.reveal('#sr-bottom-delay-hero', {
    origin: 'bottom',
    delay: 650,
    beforeReveal: () =>
      (document.querySelector('#sr-bottom-delay-hero').style.visibility =
        'visible'),
  });
  sr.reveal('#sr-right-img-hero', {
    origin: 'right',
    distance: '220px',
    scale: 1.3,
    easing: 'ease-out',
    duration: 1300,
    reset: false,
    beforeReveal: () =>
      (document.querySelector('#sr-right-img-hero').style.visibility =
        'visible'),
  });
}
export async function SrSection() {
  const ScrollReveal = (await import('scrollreveal')).default;
  const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    reset: true,
    interval: 100,
    container: document.querySelector('#scroll'),
  });
  sr.reveal('#sr-right', {
    origin: 'right',
    distance: '80px',
  });
}
export const ListReveal = async (container) => {
  const ScrollReveal = (await import('scrollreveal')).default;
  ScrollReveal({
    distance: '60px',
    duration: 2800,
    reset: false,
    interval: 100,
    container: document.querySelector(container),
  }).reveal('#sr-right-list', {
    origin: 'right',
    distance: '80px',
  });
};
