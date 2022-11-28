import React from "react";
import {motion} from "framer-motion";

//images
import logo from "../images/Logo.svg";

//animations
let easing = [0.6, -0.5, 0.01, 0.99];

const stagger = {
    animate:{
        transition:{
            delayChildren:0.4,
            staggerChildren:0.2,
            staggerDirection:1
        }
    }
};

const header={
    initial:{
        y:-60,
        opacity:0,
        transition:{duration:0.05, ease:easing}
    },
    animate:{
        y:0,
        opacity:1,
        animation:{
            duration:0.6,
            ease:easing
        }
    }
};

//Hide navbar
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-150px";
  }
  prevScrollpos = currentScrollPos;
}

const LandingNav = () => {

    return(
        <motion.div initial='initial' animate='animate'>
            <motion.header id="navbar" className="landingNav" variants={stagger}>
                <motion.div variants={header}>
                    <img src={logo} alt="logo" />
                </motion.div>
                <div className="landingNav__right">
                    <ul className="landingNav__options">
                        <motion.li variants={header} className='landingNav__links'><a href="#home">Home</a></motion.li>
                        <motion.li variants={header} className='landingNav__links'><a href="#">Why Iara?</a></motion.li>
                        <motion.li variants={header} className='landingNav__links'><a href="#team">About us</a></motion.li>
                        <motion.li variants={header} className='landingNav__links'><a href="#">Get in touch</a></motion.li>
                    </ul>
                    <motion.div variants={header}>
                        <button className="land_clearBtn">Get Started</button>
                    </motion.div>
                </div>
            </motion.header>
        </motion.div>
    );
};

export default LandingNav;