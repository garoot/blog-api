import { gsap } from 'gsap'
import styles from './gsap-test.module.css'
import { useEffect, useRef } from 'react'

export default function GsapTest({  }) {

    let activatorRef = useRef(null)
    var tl = gsap.timeline({defaults:{}})

    const handleClick = () => {
        tl.to(activatorRef.current, {x:45, scale:2, rotation:180})
    }



    useEffect(() => {
        // gsap.defaults({duration:4})
        // var toggle = false;
    })
    return (
        <>
            <img ref={activatorRef} onClick={handleClick} className={styles.activator} id="activator" src="/icons/like.png" alt=""/>
        </>
    )
}
