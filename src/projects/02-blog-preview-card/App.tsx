export default function App(){
    return (
        <div className="bg-yellow-400/60 min-h-screen flex items-center justify-center font-figtree text-base">
            <div className="bg-white w-full max-w-xs p-5 rounded-xl border border-slate-900 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
                <div className="">
                    <img src="/blog-preview-card/illustration-article.svg" alt="" className="rounded-lg"/>
                </div>
                <div className="">
                    <button className="bg-yellow-400/60 mt-4 rounded-sm px-3">Learning</button>
                    <p className="text-xs mt-2">Published 21 Dec 2023</p>
                    <h2 className="font-bold my-4 hover:text-yellow-400/60 hover:cursor-pointer">HTML & CSS foundations</h2>
                    <p className="text-sm text-slate-500">These languages are the backbone of every website, defining structure, content, and presentation.</p>
                    <div className="flex flex-row mt-3" >
                        <img src="/blog-preview-card/image-avatar.webp" alt="" className="rounded-full w-6"/>
                        <p className="font-bold text-sm mx-2">Greg Hooper</p>
                    </div>
                </div>
            </div>

        </div>
    )
}