import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"

export default async function Page({ params }) {
    // ✅ FIX: Await params in Next.js 15
    const { handle } = await params

    const client = await clientPromise
    const db = client.db("bittree")
    const collection = db.collection("links")

    const item = await collection.findOne({ handle: handle })

    if (!item) {
        return notFound()
    }

    return (
        <div className="flex min-h-screen bg-gray-800 justify-center items-start py-24">
            <div className="photo flex justify-center flex-col items-center gap-4">
                <div className="bg-red-500 rounded-full h-36 w-36">
                    <img className="rounded-full" height={250} width={250} src={item.pic} />
                </div>
                <span className="font-bold text-xl text-white">@{item.handle}</span>
                <span className="desc text-white w-80 text-center">
                    Made to Travel. For help, please follow one of our customer support links below.
                </span>
                <div className="links">
                    {item.links.map((link, index) => {
                        return (
                            <Link key={index} href={link.link}>
                                <div className="bg-white py-4 px-2 rounded-md my-3 min-w-96 flex items-center justify-center">
                                    {link.linktext}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}