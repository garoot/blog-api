"use client"

import styles from './navbar.module.css'
import Script from 'next/script'
import {gsap} from "gsap"
import { useEffect, useRef } from 'react';


export default function Navbar({}) {

    let card = useRef(null)
    let subnavRef = useRef(null)
    let searchBar2Ref = useRef(null)
    var tl = gsap.timeline({defaults: {ease: "power2.inOut"}})
    var toggle = false;

    // tl.pause();

    const handleClick = () => {
        toggle = !toggle;
        if(toggle){
            console.log(toggle)
            tl.play()
            tl.to('activator', {
                background: '#805ad5',
                'borderRadius': '5em 0 0 5em',
                // width: '150%'
            });
            tl.to(subnavRef.current, {
                'clipPath': 'ellipse(100% 100% at 50% 50%)',
                width: '80%'
            }, "-=.5")
            // tl.to(subnavRef.current.img, {
            //     opacity: 1,
            //     transform: 'translateX(10)',
            //     // stagger: 1
            // }, "-=.5")
            // tl.pause()

        } else {
            console.log(toggle)
            tl.play()
            tl.reverse()
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.nav1}>
                    <div className={styles.navLeft}>
                        <input className={styles.searchBar} type="text" placeholder='Search for courses and blogs..'/>
                        <button type='submit'>
                            <img src="/icons/search.png" alt="" />
                        </button>
                    </div>
                    <ul className={styles.navRight}>
                        <li><a className={styles.btn} href=""><img src="/icons/cart.png" alt="" /></a></li>
                        <li><a className={styles.btn} href=""><img src="/icons/notifications.png" alt="" /></a> </li>
                        {/* <li><a className={styles.profile} href="">Profile</a></li> */}
                        <li><button className={styles.profile}>Profile</button></li>
                    </ul>
            </div>
            <header className={styles.nav2}>
                <img className={styles.activator} onClick={handleClick} id="activator" src="//s.svgbox.net/hero-outline.svg?fill=fff#menu-alt-1" alt=""/>
                <nav className={styles.subnav} ref={subnavRef} id='subnav'>
                    <ul>
                        <li className={styles.burgerOpt}><a href="#"><img src="/icons/cart.png"/></a></li>
                        <li className={styles.burgerOpt}><a href="#"><img src="/icons/notifications.png"/></a></li>
                    </ul>
                </nav>
                <div className={styles.navLeft2}>
                        <input className={styles.searchBar2} ref={searchBar2Ref} type="text" placeholder='Search for courses and blogs..'/>
                        <img src="/icons/search.png" alt="" />
                </div>
            </header>
        </div>

    )
}
