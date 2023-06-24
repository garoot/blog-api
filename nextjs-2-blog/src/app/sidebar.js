"use client"

import { useEffect, useRef } from 'react'
import styles from './sidebar.module.css'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function Sidebar({ }) {

    let arrow = useRef(null)
    let subnavRef = useRef(null)

    var tl = gsap.timeline()
    var toggle = false;

    const handleClick = () => {
        toggle = !toggle;
        if(toggle){
            tl.play()
            tl.to('activator', {
                background: '#805ad5',
                'borderRadius': '5em 0 0 5em',
            })
            tl.to(subnavRef.current, {
                'clipPath': 'ellipse(100% 100% at 50% 50%)',
                width: '80%'
            }, "-=.5")
        } else {
            tl.play()
            tl.reverse()
        }
    }

    // const sideButton = useRef()
    // const handleButtonFocus = () => {
    //     sideButton.current.focus()
    // }

    return (
        <>
            <div className={styles.sidebarContainer}>
                <div className={styles.sidebarTop}>
                    <div className={styles.sidebarLogo}>
                        <img src="/images/logo.png" alt="" />
                    </div>
                    <Link  className={styles.button}  href={'/explore'} > Explore</Link>
                    <Link  className={styles.button} href={'/courses'} >Courses</Link>
                    <Link  className={styles.button} href={'/upcoming'} id={styles.gold}>Upcoming</Link>
                    <Link  className={styles.button} href={'/used-courses'} id={styles.used}>Used Courses</Link>
                    <Link  className={styles.button} href={'/blog-list'}>Blogs</Link>
                    <div>
                        <hr />
                    </div>
                    <Link  className={styles.button} href={'/settings'} >Settings</Link>
                </div>
                <div className={styles.sidebarBottom}>
                    <Link  className={styles.button} href={'/about-us'}>About Us</Link>
                    <Link  className={styles.button} href={'/support'}>Support</Link>
                </div>

                <div className={styles.sidebar2}>
                    <img className={styles.activator} onClick={handleClick} src="//s.svgbox.net/hero-outline.svg?fill=f3f3f3#chevron-down"/>
                    <nav className={styles.subnav} ref={subnavRef}>
                        <a href="#"><img src="/icons/cart.png"/></a>
                        <a href="#"><img src="/icons/notifications.png"/></a>
                        <a href="#"><img src="//s.svgbox.net/hero-outline.svg?fill=805ad5#chat"/></a>
                        <a href="#"><img src="//s.svgbox.net/hero-outline.svg?fill=805ad5#cloud-download"/></a>
                        <a href="#"><img src="//s.svgbox.net/hero-outline.svg?fill=805ad5#cog"/></a>
                    </nav>
                </div>
            </div>
        </>

)

}
