import React from 'react'
import Navbar from '../../layouts/Navbar'
import backgroundImage from '../../assets/man-and-social-network-background-with-media-icons-DN875P.jpg'
const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <img src={backgroundImage} className='w-full h-full ' />
        </div>
    )
}

export default LandingPage
