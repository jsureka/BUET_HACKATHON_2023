import OwnOrders from "components/OwnOrders/OwnOrders";
import PlacedOrders from "components/PlacedOrders/PlacedOrders";
import NavbarHome from "layouts/navbar";
import { useState } from "react";

export default function Orders() {

    const [ownOrder, setOwnOrder] = useState(true);

    function changeType(type) {
        if(type === 'own') {
            setOwnOrder(true);
        } else {
            setOwnOrder(false);
        }
    }

    return (
        <div className="bg-primary">
            <NavbarHome current={'orders'} />
            <div className="px-32 pt-12">
                <div className="flex flex-row space-x-16">
                    <div>
                        {ownOrder ? <h1 className="text-3xl px-6 font-bold bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent">My Orders</h1> : <h1 className="text-3xl px-6 font-bold" onClick={() => changeType('own')}>My Orders</h1>}
                        {ownOrder && <><div className="h-1 mt-6 bg-gradient-to-br from-secondary-1 to-secondary-2" /></>}
                    </div>
                    <div>
                    {!ownOrder ? <h1 className="text-3xl px-6 font-bold bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent">Placed Orders</h1> : <h1 className="text-3xl px-6 font-bold" onClick={() => changeType('place')}>Placed Orders</h1>}
                        {!ownOrder && <><div className="h-1 mt-6 bg-gradient-to-br from-secondary-1 to-secondary-2" /></>}
                    </div>
                </div>
            </div>
            <div className="bg-new-gray px-48 justify-center text-center">
                <div className="flex flex-row justify-between pt-12 pb-8">
                    <h1 className="font-bold text-2xl">Artwork & Collectibles</h1>
                    <h1 className="font-bold text-2xl">Artwork ID</h1>
                    <h1 className="font-bold text-2xl">Current Status</h1>
                </div>
                <hr />
                { ownOrder ?
                <div>
                    <OwnOrders name={'Master Shifu'} id={'001'} status={'Not Delivered'}/>
                    <OwnOrders name={'Master Shi'} id={'002'} status={'Delivered'}/>
                    <OwnOrders name={'Master Shif'} id={'003'} status={'Approve'}/>
                    <OwnOrders name={'Master Pro'} id={'004'} status={'Approve'}/>
                    <OwnOrders name={'Master Ultra'} id={'005'} status={'Delivered'}/>
                </div>
                :
                <div>
                    <PlacedOrders name={'Master Shifu'} id={'001'} status={'Not Delivered'}/>
                    <PlacedOrders name={'Master Shi'} id={'002'} status={'Delivered'}/>
                    <PlacedOrders name={'Master Shif'} id={'003'} status={'Approve'}/>
                    <PlacedOrders name={'Master Pro'} id={'004'} status={'Approve'}/>
                    <PlacedOrders name={'Master Ultra'} id={'005'} status={'Delivered'}/>
                </div>
                }
            </div>
        </div>
    )
}