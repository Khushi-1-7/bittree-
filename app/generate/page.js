"use client"

import { useSearchParams } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function GenerateContent() {

    const searchParams = useSearchParams()

    const [handle, sethandle] = useState(searchParams.get('handle') || "")

    const [links, setLinks] = useState([
        { link: "", linktext: "" }
    ])

    const [pic, setpic] = useState("")

    // Update link fields
    const handleChange = (index, key, value) => {

        setLinks((prevLinks) =>
            prevLinks.map((item, i) =>
                i === index
                    ? { ...item, [key]: value }
                    : item
            )
        )
    }

    // Add new empty link input
    const addLink = () => {

        setLinks([
            ...links,
            { link: "", linktext: "" }
        ])
    }

    // Submit data
    const submitLinks = async () => {

        const myHeaders = new Headers()

        myHeaders.append(
            "Content-Type",
            "application/json"
        )

        const raw = JSON.stringify({
            links: links,
            handle: handle,
            pic: pic
        })

        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw
        }

        try {

            const r = await fetch(
                "/api/add",
                requestOptions
            )

            const result = await r.json()

            if (result.success) {

                toast.success(result.message)

                setLinks([
                    { link: "", linktext: "" }
                ])

                setpic("")
                sethandle("")

            } else {

                toast.error(result.message)
            }

        } catch (error) {

            toast.error("Something went wrong")

            console.log(error)
        }
    }

    return (

        <div className='bg-[#E9C0E9] min-h-screen grid grid-cols-2'>

            {/* LEFT SECTION */}
            <div className='flex flex-col justify-center items-center'>

                <h1 className='font-bold text-4xl text-gray-900'>
                    Create your Bittree
                </h1>

                <div className='flex flex-col w-[34vw] mt-5 gap-5'>

                    {/* HANDLE */}
                    <h2>Step 1: Claim your handle</h2>

                    <input
                        value={handle}
                        onChange={(e) => sethandle(e.target.value)}
                        type="text"
                        className="py-2 px-4 bg-white rounded-full focus:outline-pink-500"
                        placeholder='Enter your handle'
                    />

                    {/* LINKS */}
                    <h2>Step 2: Add links</h2>

                    {links.map((item, index) => (

                        <div key={index} className='flex gap-2'>

                            <input
                                value={item.linktext}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "linktext",
                                        e.target.value
                                    )
                                }
                                type="text"
                                className="py-2 px-4 bg-white rounded-full"
                                placeholder='Enter link text'
                            />

                            <input
                                value={item.link}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "link",
                                        e.target.value
                                    )
                                }
                                type="text"
                                className="py-2 px-4 bg-white rounded-full"
                                placeholder='Enter link'
                            />

                        </div>
                    ))}

                    <button
                        onClick={addLink}
                        className='bg-black text-white rounded-full px-4 py-2 font-bold w-fit'
                    >
                        Add Link
                    </button>

                    {/* PICTURE */}
                    <h2>Step 3: Add Picture</h2>

                    <input
                        value={pic}
                        onChange={(e) => setpic(e.target.value)}
                        type="text"
                        className="py-2 px-4 bg-white rounded-full"
                        placeholder='Enter image URL'
                    />

                    {/* SUBMIT */}
                    <button
                        disabled={
                            pic === "" ||
                            handle === "" ||
                            links[0].linktext === ""
                        }
                        onClick={submitLinks}
                        className='bg-black disabled:bg-slate-500 text-white rounded-full px-4 py-2 font-bold'
                    >
                        Create your Bitlink
                    </button>

                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className='w-full h-screen'>

                <img
                    className="h-full object-contain"
                    src="/generate.png"
                    alt="generate"
                />

            </div>

            <ToastContainer />

        </div>
    )
}

export default function Generate() {

    return (

        <Suspense fallback={<div>Loading...</div>}>

            <GenerateContent />

        </Suspense>
    )
}