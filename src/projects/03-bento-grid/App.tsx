export default function App() {
    return (
        <div className="bg-[#f5f5f5] h-full md:h-screen flex items-center justify-center p-4 md:p-20 font-dm-sans">
            <main className="grid grid-cols-1 md:grid-cols-12 grid-rows-10 gap-6 w-full max-w-screen-xl md:h-full">
                <article className="bg-[#7252d9] rounded-lg md:col-span-6 md:row-span-4 md:col-start-4 text-white p-4 flex flex-col items-center justify-center">
                    <p className="text-6xl font-semibold text-it text-center">Social Media <span className="text-yellow-300">10x</span> <span className="italic">Faster</span> with AI</p>
                    <img src="/bento-grid/images/illustration-five-stars.webp" alt="Dashboard" className="w-1/3 mt-4" />
                    <footer className="text-xl">Over 4,000 5-star reviews</footer>
                </article>

                <article className="bg-white flex flex-col justify-center items-center p-4 md:p-8 rounded-lg md:col-span-3 md:row-span-3 md:col-start-4">
                    <img src="/bento-grid/images/illustration-multiple-platforms.webp" alt="Dashboard" className="w-full ml-45" />
                    <span className="text-3xl font-semibold">Manage <br/>multiple <br/>accounts and platforms.</span>
                </article>
                <article className="bg-[#f6ce6f] rounded-lg md:col-span-3 md:row-span-3">Maintain a consistent posting schedule.</article>
                <article className="bg-[#dad1fb] rounded-lg md:col-span-3 md:row-span-7 md:row-start-1 md:col-start-10">
                    Schedule to social media.
                    Optimize post timings to publish content at the perfect time for your audience.</article>
                <article className="bg-[#7252d9] rounded-lg md:col-span-6 md:col-start-7 md:row-start-8 md:row-span-3">Grow followers with non-stop content.</article>
                <article className="bg-white rounded-lg md:col-span-3 md:row-span-3 md:row-start-8 md:col-start-4"> 56% faster audience growth</article>
                <article className="bg-[#f8eee2] font-semibold text-4xl flex flex-col justify-center p-4 md:p-10 rounded-lg md:col-span-3 md:row-span-5 md:col-start-1 md:row-start-1">
                    <p>Create and schedule content <span className="text-purple-600/80 italic">quicker.</span></p>
                    <img src="/bento-grid/images/illustration-create-post.webp" alt="Dashboard" className="w-6/7 mt-4" />
                </article>
                <article className="bg-[#f6ce6f] rounded-lg flex flex-col gap-2 items-center justify-center text-4xl font-semibold p-4 md:p-8 md:col-span-3 md:row-span-5 md:col-start-1 md:row-start-6">
                    <p className="">Write your content using AI.</p>
                    <img src="/bento-grid/images/illustration-ai-content.webp" alt="Dashboard" className="w-7/8" />
                </article>
            </main>
        </div>
    )
}