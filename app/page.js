"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router=useRouter()
  const createTree =() => {
    router.push(`/generate?handle=${text}`)
    
    
  }
  const [text,setText]=useState("")
  
  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2 gap-3">
        <div className="flex justify-center flex-col gap-2 ml-[10vw]">
          <p className="text-yellow-300 font-bold text-5xl ">Everything you</p> 
            <p className="text-yellow-300 font-bold text-5xl ">are. In one,</p>
            <p className="text-yellow-300 font-bold text-5xl mb-4 ">simple link in bio.</p>

            
          <p className="text-yellow-300 text-xl">Join 50M+ people using linktree for their link in bio. One link to help you share
            everything you create,curate and sell from your Instagram, Twitter,TikTok,YouTube and other social media platforms.
          </p>

          <div className="input flex gap-2 my-3 ">
            <input value={text} onChange={(e)=>setText(e.target.value)} className="bg-white rounded-xl px-2 py-2 focus:outline-green-800" type="text" placeholder="Enter your handle"/>
            <button onClick={()=>createTree()} className="bg-pink-300 font-semibold rounded-full px-4 py-4">Claim now</button>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mr-[10vw]">
          <img src="/home.png"/>

        </div>
        
      </section>

    
      
    </main>
  );
}
