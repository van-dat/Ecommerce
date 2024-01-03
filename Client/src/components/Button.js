import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({text, css , link }) => {
    const navigate = useNavigate()
  return (
    <button className={css} onClick={()=> {
       navigate(link)
    } }>{text}</button>
  )
}

export default Button
