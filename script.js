const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

let circle = document.querySelector("#mini-circle");
let tl = gsap.timeline();
var timeout;

document.addEventListener("mouseleave", function () {
  circle.style.display = "none"
})

function circleMouseFollower(xscale, yscale) {

  window.addEventListener("mousemove", function (dets) {
    // console.log(dets.clientX,dets.clientY);
    circle.style.display = "block";
    circle.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale} , ${yscale})`;
  });

}
function flatCircle() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(0.7, 1.3, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.7, 1.3, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      circle.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1 , 1)`;
    }, 100);
  });
}
function heroPageAnim() {
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    ease: Expo.easInOut,
    duration: 1,
  });

  tl.to(".boundingElem", {
    y: 0,
    ease: Expo.easInOut,
    duration: 2,
    delay: -1,
    stagger: 0.2,
  });

  tl.from("#hero-footer", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easInOut,
  });
}


document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0
  var diffrot = 0

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,

    })
  })





  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;


    // elem.querySelector("img").style.top = `${diff}px`
    // elem.querySelector("img").style.left = `${dets.clientX}px`

    diffrot = dets.clientX - rotate
    rotate = dets.clientX

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power1,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
    })
  })

})



flatCircle();
circleMouseFollower();
heroPageAnim();
