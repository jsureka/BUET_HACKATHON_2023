export default function OwnOrders({name, id, status}) {
    return (
        <>
                <div className="grid grid-cols-3 grid-rows-1 gap-48 items-center py-4 hover:bg-primary">
                    <div className="flex flex-row items-center justify-start">
                        <div className="relative w-12 h-12 mx-auto my-4">
                            <img className="w-full h-full object-cover rounded-md" src="/soldArt.png" alt="Profile Image" />
                        </div>
                        <h1 className="text-bold text-lg ml-4">{name}</h1>
                    </div>
                    <div>
                        <h1 className="text-lg">{id}</h1>
                    </div>
                    <div className="text-center px-6">
                        { status === 'Delivered' &&
                        <button className="w-8 bg-secondary-2 text-white py-2 px-6 rounded-lg">
                            <h1>Received</h1>
                        </button>
                        }
                        { status === 'Not Delivered' &&
                        <button className="w-8 bg-secondary-3 text-primary py-2 px-6 rounded-lg">
                            <h1>Not Received</h1>
                        </button>
                        }
                        { status === 'Approve' &&
                        <button className="w-8 bg-secondary-1 text-white py-2 px-6 rounded-lg">
                            <h1>Mark as Received</h1>
                        </button>
                        }
                    </div>

                </div>
        </>
    )
}