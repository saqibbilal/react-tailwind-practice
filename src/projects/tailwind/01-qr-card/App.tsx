export default function App() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-300 font-outfit">
            <div className="flex flex-col w-full max-w-sm bg-white p-4 rounded-xl shadow-md text-center">

                <div className="p-4">
                    <img
                        src="/image-qr-code.png"
                        alt="QR Code"
                        className="rounded-lg"
                    />
                </div>


                <h2 className="text-slate-900 font-semibold text-lg mb-2 px-4">
                    Improve your front-end skills by building projects
                </h2>

                <p className="text-slate-500 text-[15px] px-4">
                    Scan the QR code to visit Frontend Mentor and take your coding skills to the next level
                </p>

            </div>
        </div>
    )
}