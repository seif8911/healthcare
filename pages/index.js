import Head from 'next/head'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Water from '../components/Dashboard/Water'
import BloodPressure from '../components/Dashboard/BloodPressure'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
    else {
      localStorage.setItem('healthcare', JSON.stringify(session))
      handleSignUp()
    }
  }, [])


  const handleSignUp = async () => {
    const docRef = doc(db, 'users', session?.user?.email)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log('Document Data', docSnap.data())
    }
    else {
      router.push({
        pathname: "/signup",
        query: { session }
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
      <main className='p-1 h-full grow flex '>
        <div className='flex flex-col h-full  md:flex-[.4] flex-1'>
          <div className='grid grid-cols-2 gap-3 h-[42%]  grid-rows-2'>
            <div className='w-full h-[120px] font-[600]'>
              <h2 className='text-3xl text-black capitalize'>Hi, {session?.user?.name?.split(' ')[0].toLowerCase()}.</h2>
              <h2 className='text-3xl text-black'>Check your</h2>
              <h2 className='text-3xl text-black'>Health!</h2>
            </div>
            <div className='w-full h-[140px] '></div>
            <div className='lilBox h-[200px] '>
              <div className='flex items-end  gap-1'>
                <h1 className='text-2xl'>5 </h1><p className='text-md text-gray-400 font-light'>Litre Today</p>
              </div>
              <Water />
              <p>Water Consumption</p>
            </div>
            <div className='lilBox h-[200px] '>
              <div className='flex items-end  gap-1'>
                <h1 className='text-2xl'>110 </h1><p className='text-md text-gray-400 font-light'>Good</p>
              </div>
              <BloodPressure />
              <p>Blood Pressure</p>
            </div>
          </div>
        </div>
      </main >
    </div >

  )
}
