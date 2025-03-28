import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { CareTakerContext } from '../context/CareTakerContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)
  const { setCToken } = useContext(CareTakerContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        //(data.token)
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else if (state === 'Doctor') {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }
    else   {

      const { data } = await axios.post(backendUrl + '/api/CareTaker/login', { email, password })
      if (data.success) {
        setCToken(data.token)
        localStorage.setItem('cToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {
            <p>
            {state === 'Admin' && (
              <>Doctor or Caretaker Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span> | <span onClick={() => setState('Caretaker')} className='text-primary underline cursor-pointer'>Click here</span></>
            )}
            {state === 'Doctor' && (
              <>Admin or Caretaker Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span> | <span onClick={() => setState('Caretaker')} className='text-primary underline cursor-pointer'>Click here</span></>
            )}
            {state === 'Caretaker' && (
              <>Admin or Doctor Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span> | <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></>
            )}
          </p>
        }
      </div>
    </form>
  )
}

export default Login