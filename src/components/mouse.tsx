// "use client";

// import { useEffect } from "react";

// export default function MouseEffect() {
//   useEffect(() => {
//     const $bigBall = document.querySelector(".cursor__ball--big");
//     const $smallBall = document.querySelector(".cursor__ball--small");
//     const $links = document.querySelectorAll("a");

//     document.body.addEventListener("mousemove", (event) => {
//       if ($bigBall && $smallBall) {
//         $bigBall.style.transform = `translate3d(${event.pageX - 15}px, ${event.pageY - 15}px, 0)`;
//         $smallBall.style.transform = `translate3d(${event.pageX - 5}px, ${event.pageY - 7}px, 0)`;
//       }
//     });

//     // for (let i = 0; i < $links.length; i++) {
//     //     $links[i]?.addEventListener("mouseenter", onMouseHover);
//     //     $links[i]?.addEventListener("mouseleave", onMouseHoverOut);
//     // }

//     // Move the cursor

//     // // Hover an element
//     // function onMouseHover() {
//     //     TweenMax.to($bigBall, .3, {
//     //         scale: 4
//     //     })
//     // }
//     // function onMouseHoverOut() {
//     //     TweenMax.to($bigBall, .3, {
//     //         scale: 1
//     //     })
//     // }
//   }, []);

//   return (
//     <div className="cursor">
//       <div className="cursor__ball cursor__ball--big">
//         <svg height="30" width="30">
//           <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
//         </svg>
//       </div>

//       <div className="cursor__ball cursor__ball--small">
//         <svg height="10" width="10">
//           <circle cx="5" cy="5" r="4" stroke-width="0"></circle>
//         </svg>
//       </div>
//     </div>
//   );
// }
