export default function App() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-400 font-figtree">

            <div className="w-full max-w-xs bg-white p-5 rounded-xl border border-slate-900 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">

                <img
                    src="/blog-preview-card/illustration-article.svg"
                    alt="Illustration of article"
                    className="rounded-lg"
                />

                <span className="bg-yellow-400 text-sm font-bold px-3 py-1 rounded-sm w-fit">
                    Learning
                </span>

                <p className="text-xs">
                    Published 21 Dec 2023
                </p>

                <h2 className="font-extrabold text-lg hover:text-yellow-400 cursor-pointer transition-colors">
                    HTML & CSS foundations
                </h2>

                <p className="text-sm text-slate-500">
                    These languages are the backbone of every website, defining structure, content, and presentation.
                </p>

                <div className="flex items-center gap-2 mt-2">
                    <img
                        src="/blog-preview-card/image-avatar.webp"
                        alt="Greg Hooper avatar"
                        className="w-6 h-6 rounded-full"
                    />
                    <p className="font-bold text-sm">
                        Greg Hooper
                    </p>
                </div>

            </div>

        </div>
    );
}