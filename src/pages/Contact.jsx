import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Contact() {
  return (
    <>
    <h1>Contact</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi unde accusamus voluptatibus, nemo sapiente temporibus facere! Illo est tenetur omnis.</p>
    <Link to="faq">FAQ</Link>
    <Link to="form">Form</Link>

    <Outlet></Outlet>
    </>
  )
}

export default Contact