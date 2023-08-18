import React from 'react'
import fb from '../assets/fb.png'
import insta from '../assets/insta.png'
import linkedin from '../assets/linkedin.png'
import twitter from '../assets/twitter.png'
import './Footer.css'

export const Footer = () => {
  return (
    <div className='footer'>
       <div className='sb_footer section__padding'>
        <div className="sb__footer-links">
            <div className="sb__footer-links_div">
                <h4>For Business</h4>
                <a href="/employer">
                    <p>Employer</p>
                </a>
                <a href="/healthplan">
                    <p>HealthPlan</p>
                </a>
                <a href="/individual"> 
                    <p>Individual</p>
                </a>
            </div>
            <div className='sb__footer-links_div'>
                <h4>Resources</h4>
                <a href="/resources">
                    <p>FAQ</p>
                </a>
                <a href="/resources">
                    <p>MAS</p>
                </a>
                <a href="/resources">
                    <p>Kvu</p>
                </a>
            </div>
            <div className='sb__footer-links_div'>
                <h4>Partners</h4>
                <a href="/employer">
                    <p>Swing</p>
                </a>
            </div>
            <div className='sb__footer-links_div'>
                <h4>Company</h4>
                <a href="/about">
                    <p>About</p>
                </a>
                <a href="/services">
                    <p>Services</p>
                </a>
                <a href="/contact">
                    <p>Contac us</p>
                </a>
                <a href="/career">
                    <p>Carrer</p>
                </a>
            </div>
            <div className='sb__footer-links_div'>
                <h4>Coming soon on</h4>
                <div className='socialmedia'>
                  <p><img src={fb} alt=''/></p>
                  <p><img src={twitter} alt=''/></p>
                  <p><img src={linkedin} alt=''/></p>
                  <p><img src={insta} alt=''/></p>
                </div>
            </div>
        </div>

        <hr></hr>

        <div className='sb__footer-below'>
            <div className='sb__footer-copyright'>
                <p>
                    @{new Date().getFullYear()} CodeInn. All right reserved.
                </p>
            </div>
            <div className='sb__footer-below-links'>
                   <a href="/terms"><div><p>Terms & Conditions</p></div></a>
                   <a href="/privacy"><div><p>Privacy</p></div></a>
                   <a href="/security"><div><p>Security</p></div></a>
                   <a href="/cookie"><div><p>Cookie Declaration</p></div></a>
            </div>
        </div>
        </div>
    </div>
  )
}
