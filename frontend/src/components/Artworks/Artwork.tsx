export default function SingleArt({ imgSrc, Title, Artist, price, premium }) {
    return (
        <div>
            <div className="block rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:ease-in">
                <img className="object-cover w-full" src={imgSrc} alt={Title} />
                <div className="px-10 py-4 bg-primary">
                    <div className="flex flex-row justify-between items-start pt-4">
                        <div>
                            <h1 className='font-display font-semibold text-lg'>{Title}</h1>
                            <div className='flex items-center space-x-2 my-2'>
                                <img className='h-7' src="/Avatar.png" />
                                <h1 className='font-display text-md'>{Artist}</h1>
                            </div>
                        </div>
                        <div className="mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00AC4F" className="w-8 h-8">
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>

                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        { premium ? 
                        <div className="mt-6 mb-4">
                            <p className="text-gray-400">Auction Ends In</p>
                            <h1 className="font-bold bg-secondary-1-dark mt-2">23h : 06m : 12s</h1>
                        </div>
                        : 
                        <div className="mt-8 mb-4">
                            <h1 className="text-gray-400">Price</h1>
                            <p>{price}</p>
                        </div>
                        }
                        <div className="mt-4">
                            { premium ? <button className="bg-secondary-2 font-display py-2 px-3 rounded-lg hover:bg-secondary-1-dark">Place Bid</button> : <button className="bg-secondary-1 font-display py-2 px-4 rounded-lg hover:bg-secondary-1-dark">Buy Now</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}