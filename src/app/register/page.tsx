import React from 'react'
import Link from 'next/link'

export default function Register() {
  return (
    <div className='home-page-parent'>
      <div className='home-page-container' style={{padding: 10}}>
        <h2>Register</h2>
        <form className='login-form-input-holder'>
          <input className='login-form-input' type='text' placeholder='Enter your name' required></input>

          {/* Dropdown input for user role */}
          <select className='login-form-input' required>
            <option value='n/a' disabled selected>What is your role?</option>
            <option value='publisher'>Publisher</option>
            <option value='advertiser'>Advertiser</option>
          </select>

          <input className='login-form-input' type='email' placeholder='Enter your email' required></input>
          <input className='login-form-input' type='phone' placeholder='Enter your phone number'></input>
          <input className='login-form-input' type='password' placeholder='Enter your password' required></input><br />
          <button className='home-page-button'>Register</button>
        </form>
        <p style={{ paddingTop: 20 }}>Already have an account? <Link href="/">Login</Link></p>
      </div>
    </div>
  )
}
