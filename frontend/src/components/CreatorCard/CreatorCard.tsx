export default function CreatorCard() {
    return(
        <div className="w-full bg-new-gray text-center flex flex-col py-6 rounded-lg">
            <div className="relative w-28 h-28 mx-auto my-4">
                <img className="w-full h-full object-cover rounded-full" src="/Avatar.png" alt="Profile Image" />
            </div>
            <h1 className="text-bold text-2xl">Jitesh Sureka</h1>
            <h4 className="text-lg text-gray-400">Total Sales: <span className="text-white">34.53 ETH</span></h4>
        </div>
    )
}