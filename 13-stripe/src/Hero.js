import React from 'react'
import { useGlobalContext } from './context'
import phoneImg from './images/phone.svg'

const Hero = () => {
    const { closeSubmenu } = useGlobalContext();

    return <section className="hero" onMouseOver={closeSubmenu}>
        <div className="hero-center">
            <article className="hero-info">
                <h1>Payments infrastructure for the internet</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatum, exercitationem eligendi, cum tempore quam omnis ex maiores, ratione rerum illo numquam magni impedit minima.</p>
                <button className='btn'>
                    Start now
                </button>
            </article>
            <article className="hero-images">
                <img src={phoneImg} alt="phone img" />
            </article>
        </div>
    </section>
}

export default Hero
