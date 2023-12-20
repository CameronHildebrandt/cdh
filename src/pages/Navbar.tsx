import { Outlet, Link } from "react-router-dom";


const verbose = false;
const sectionNames = ['welcome', 'portfolio', 'experience', 'skills', 'personal', 'resume', 'contact']; // TODO: refactor this into a type.
const mobileNav = document.getElementById('mobileNav');
const mobileNavScroller = document.getElementById('mobileNavScroller');
const mobileNavScrollerLinks = document.querySelectorAll('.mobileNav_link');
const heroGradientText = document.getElementById('landingSector_bodyTextGradient');
const scrollTimeout = 2000; // Amount of time to wait after scrolling to hide thing.
const scrollNavToTimeout = 0; // Amount of time to wait after scrolling nav to jump on page.
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
var sectionElements: HTMLElement[] = [];
var isLastScrollDirectionDown = false;
var isAllowedToHideMobileNav = true;
var lastScrollTop = 0;
var scrollTimer = -1; // Overwritten with the timeout object.
var scrollNavToTimer = -1; // Overwritten with the timeout object.
var elements = document.getElementsByClassName("pageSection");
var prevSector = -1;
var scrollStartTS = null;
var scrollStartResetTimeout = null;
var mainScrollNavResetterTimeout = null;
var navScrollMainResetterTimeout = null;
var scrollStartResetSensitivity = 500; // more is less sensitive
var programmaticScrollSensitivity = 500; // more is less sensitive

var isNavScrollingMainProgrammatically = false;
var isMainScrollingNavProgrammatically = false;


function hideNav() {
  if(mobileNav) {
    mobileNav.style.opacity = "0";
    mobileNav.style.top = "-400px";
  } else {
    throw new Error("Failed to hide navbar, mobile nav undefined.");
  }
};

function showNav() {
  if(mobileNav) {
  mobileNav.style.opacity = "1";
  mobileNav.style.top = "-300px";
  } else {
    throw new Error("Failed to show navbar, mobile nav undefined.");
  }
};

const throttle = (delay: number, fn: Function) => { 
  let time = Date.now(); 
  return () => { if((time + delay - Date.now()) <= 0) { 
    fn(); 
    time = Date.now(); 
  }} 
} 

function scrollToSectionNamed(querySectionName: string) {
  var activeSectionBasedOnHash = sectionNames.indexOf(querySectionName);
  
  if(activeSectionBasedOnHash != -1) {
    sectionElements[activeSectionBasedOnHash].scrollIntoView();
    window.scrollBy(0,-100); // Position the div closer to the middle of the screen
  }
}





//// Pop up on scroll up ////
// window.addEventListener("scroll", e => { 
//   var st = window.pageYOffset || document.documentElement.scrollTop;
//   if (st > lastScrollTop || st == 0) {
//       // console.log("Scrolled Down");
//       hideNav();
//       isLastScrollDirectionDown = true;
//   } else if (st < lastScrollTop) {
//       // console.log("Scrolled Up");
//       showNav();
//       isLastScrollDirectionDown = false;
//   } // else was horizontal scroll
//   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
// }, false);
//// Pop up on scroll up ////




//// Pop up when scrolling ////		
// setTimeout(() => {
//   window.addEventListener('scroll', e => {
//     showNav();

//     if (scrollTimer != -1) {
//       clearTimeout(scrollTimer);
//     }

//     if(isLastScrollDirectionDown && isAllowedToHideMobileNav) { // Only hide nav after timeout if down was the last direction.
//       scrollTimer = window.setTimeout(hideNav, scrollTimeout);
//     }
//   });
// }, 100); // The timeout ensures we don't mess around with scroll stuff while page is initializing.
//// Pop up when scrolling ////






// Main Scroll Nav //
// function mainScrollNav(firstRun = false) {
//   /// Don't update when scrolling programmatically ///
//   if(isNavScrollingMainProgrammatically) {
//     return;
//   }
//   /// Don't update when scrolling programmatically ///


//   /// Scroll start timeout ///
//   clearTimeout(scrollStartResetTimeout); // After a while not scrolling, reset the timeout.
//   scrollStartResetTimeout = setTimeout(() => {
//     scrollStartTS = null;
//   }, scrollStartResetSensitivity);

//   if(scrollStartTS == null) { // If it's our first run, start the timer!
//     scrollStartTS = new Date().getTime();
//   }

//   if(!firstRun && (scrollStartTS + (scrollStartResetSensitivity) > new Date().getTime())) {
//     return; // Don't run if we haven't scrolled for long enough.
//   }
//   /// Scroll start timeout ///


//   /// Update the active nav ///
//   var st = window.pageYOffset || document.documentElement.scrollTop;
//   var isInFinalSector = st > elements[elements.length - 1].offsetTop - (vh/2);

//   for (var i = 0, len = elements.length; i < len; i++) {
//     if (elements[i].offsetTop - (vh/2) >= st || isInFinalSector) {
//       var currSector = i-1;
//       if(isInFinalSector) { var currSector = elements.length-1; }
//       if(currSector != prevSector) {

//         if(verbose) {console.log("main -> nav");}
//         clearTimeout(mainScrollNavResetterTimeout);
//         isMainScrollingNavProgrammatically = true;

//         mainScrollNavResetterTimeout = setTimeout(() => {
//           if(verbose) {console.log("main DONE nav");}
//           isMainScrollingNavProgrammatically = false;
//         }, programmaticScrollSensitivity);

//         mobileNavScroller.scroll({
//           top: 20*(currSector),
//           behavior: "smooth",
//         });
//         prevSector = currSector;
//       }
//       break;
//     }
//   }
//   /// Update the active nav ///

// }
// Main Scroll Nav //



// Nav Scroll Main //
function navScrollMain(firstRun = false) {

  //// If the user touches the mobile nav, keep it there ////
  // isLastScrollDirectionDown = false;
  // if (scrollTimer != -1) {
  //   clearTimeout(scrollTimer);
  // }
  //// If the user touches the mobile nav, keep it there ////


  //// Update the active link ////
  // const numPixelsPerLink = 20;
  // var activeLink = Math.round(mobileNavScroller.scrollTop/numPixelsPerLink);
  // mobileNavScrollerLinks.forEach(e => { // Deselect all
  //   e.classList.remove('active');
  // });
  // var nItem = document.querySelector(".mobileNav_link:nth-child(" + (activeLink+3) + ")"); // Select active
  // nItem.classList.add("active");
  //// Update the active link ////


  /// Don't update when scrolling programmatically ///
  // if(isMainScrollingNavProgrammatically) {
  //   return;
  // }
  /// Don't update when scrolling programmatically ///

  //// Update the active section ////
  // if(verbose) {console.log("nav -> main");}
  // clearTimeout(navScrollMainResetterTimeout);
  // isNavScrollingMainProgrammatically = true;

  // navScrollMainResetterTimeout = setTimeout(() => {
  //   if(verbose) {console.log("nav DONE main");}
  //   isNavScrollingMainProgrammatically = false;
  // }, programmaticScrollSensitivity);

  // sectionElements[activeLink].scrollIntoView(); //{behavior: "smooth"} doesn't work - need to do fancy stuff to know how to ignore the feedback loop.
  // window.scrollBy(0,-100); // Position the div closer to the middle of the screen
  //// Update the active section ////

}
// Nav Scroll Main //



// TODO: uncomment?
// window.addEventListener("scroll", e => {mainScrollNav()});
// mobileNavScroller.addEventListener('scroll', e => {navScrollMain();});




//// On Load Actions ////

// Grab the section elements //
// sectionNames.forEach(e => {
//   sectionElements.push(document.getElementById(e + 'Sector'));
// });
// Grab the section elements //

// Use main position to scroll nav //
// window.addEventListener('load', () => {
//   setTimeout(() => {
//     mainScrollNav(true);
//   }, 100);
// });
// Use main position to scroll nav //

// Handle anchors //
// window.addEventListener('load', () => {
//   setTimeout(() => {
//     var hash = (window.location.hash).replace('#', '').toLowerCase();
//     var activeSectionBasedOnHash = sectionNames.indexOf(hash);
    
//     if(activeSectionBasedOnHash != -1) {
//       sectionElements[activeSectionBasedOnHash].scrollIntoView();
//       window.scrollBy(0,-100); // Position the div closer to the middle of the screen
//       mainScrollNav(true); // Update the nav
//     }
//   }, 10);
// });
// Handle anchors //

//// On Load Actions ////




const Navbar = () => (
  <div>
    <div className="mobileNav" id="mobileNav">
      <img className="mobileNav_simpleArrow" src="/image/leftArrow.svg" alt="Nav Arrow" />
      <div className="mobileNav_mainContainer">

        <div className="mobileNav_titleContainer">
          <img className="mobileNav_title" src="/logo/cdh.svg" alt="CDH Personal Logo" />
        </div>


        <div className="mobileNav_linksContainer" id="mobileNavScroller">
          <div className="mobileNav_link"></div>
          <div className="mobileNav_link"></div>
          <div className="mobileNav_link active">Welcome</div>
          <div className="mobileNav_link">Portfolio</div>
          <div className="mobileNav_link">Experience</div>
          <div className="mobileNav_link">Skills</div>
          <div className="mobileNav_link">Personal</div>
          <div className="mobileNav_link">Resume</div>
          <div className="mobileNav_link">Contact</div>
          <div className="mobileNav_link"></div>
          <div className="mobileNav_link"></div>
        </div>

      </div>
    </div>



    {/* refactor into desktopNav */}
    <div className="desktopNav">
      <Link to="/" className="nav_element nav_element_active">Home</Link>
      <Link to="/blogs" className="nav_element">Blog</Link>
      <Link to="/contact" className="nav_element">Contact</Link>
      <Link to="/capstone" className="nav_element">Capstone</Link>
      <Link to="/github" className="nav_element">GitHub</Link>
      <Link to="/linkedin" className="nav_element">LinkedIn</Link>
    </div>
    {/* refactor into desktopNav */}
  </div>
);

export default Navbar;