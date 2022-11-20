import Head from 'next/head'
import Image from 'next/image'
import { getSession, signOut, useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import Water from '../components/Dashboard/Water'
import BloodPressure from '../components/Dashboard/BloodPressure'
import BMI from '../components/Dashboard/BMI'
import Circle from '../components/Dashboard/Circle'
import {RiVirusFill} from 'react-icons/ri'
import {IoFootstepsSharp} from 'react-icons/io5'
import News from '../components/Dashboard/News'

export default function Home({ data }) {
  const router = useRouter()
  const [userData,setUserData] = useState(null)
  // const { data: session } = useSession()
  useEffect(() => {
    if (!data) {
      router.push('/login')
    }
    else {
      handleSignUp()
    }
  }, [])

  useEffect(()=>
    onSnapshot(doc(db,'users',data?.user?.email),(doc)=>setUserData(doc.data()))
  ,[])


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  },[])

  const successCallback =async (position) => {
    console.log(position);
    const res = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=YOUR_PRIVATE_TOKEN&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
    {method:"GET"})
    console.log(await res.json())
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };

  const handleSignUp = async () => {
    const docRef = doc(db, 'users', data?.user?.email)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const userData = docSnap.data()
      localStorage.setItem("userDoc", JSON.stringify(userData))
    }
    else {
      router.push({
        pathname: "/signup",
      })
    }
  }

  return (
    <div className="grow">
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='p-1 h-full grow flex gap-3 '>
        <div className='flex flex-col p-2 pb-0 md:overflow-hidden h-full gap-3 md:w-[50%] '>
          <div className='grid grid-cols-2 px-2  gap-6 h-[50%]  grid-rows-2'>
            <div className='w-full h-full font-[600]'>
              <h2 className='text-3xl text-black capitalize'>Hi, {data?.user?.name?.split(' ')[0].toLowerCase()}.</h2>
              <h2 className='text-3xl text-black'>Check your</h2>
              <h2 className='text-3xl text-black'>Health!</h2>
            </div>
            <div className='w-full flex bg-white rounded-xl h-full'>
              <div className='flex flex-col w-[40%] items-center justify-center '>
                <h2 className='text-2xl font-bold'>2506</h2>
                <p className='text-md text-gray-400 font-light'>Steps</p>
              </div>
              <div className='grow flex items-center flex-col justify-center'>
                <IoFootstepsSharp className = "text-[4rem] text-green-600" />
                25%
              </div>
            </div>
            <div className='relative lilBox h-full'>
              <div className='flex flex-col items-center  h-full w-[40%] justify-center gap-1'>
                <h1 className='text-2xl'>5 </h1><p className='text-md text-gray-400 font-light'>Litre</p>
                <p>Water</p>
              </div>
              <Water />
            </div>
            <div className='lilBox h-full'>
              <div className='flex flex-col items-center  h-full w-[40%] justify-center gap-1'>
                <h1 className='text-2xl'>110</h1><p className='text-md text-gray-400 font-light'>Good</p>
                <p>BP</p>
              </div>
              <BloodPressure />
              
            </div>
          </div>
          <div className='w-full md:h-[50%] p-2 pb-0'>
            <News search={"health"} />
          </div>
        </div>

        <div className='w-full h-full flex flex-col md:w-[50%]'>
          <BMI data = {userData} />
          <a href = "https://selfregistration.cowin.gov.in/" target="_blank" className=' mx-2.5 mt-auto hover:text-green-400 cursor-pointer trans hover:font-productSansBold  bg-white rounded-xl p-4 flex justify-between items-center'>
            <p>Download vaccine certificate</p>
            <RiVirusFill />
          </a>
        </div>
      </main >
    </div >

  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log(session)
  return ({
    props: {
      data: session,
      session
    }
  })
}