import VerifyOrders from "components/Verify/Verify";

export default function Verify() {
    return(
        <div className="h-full bg-primary px-48 py-24">
            <h1 className="text-4xl font-bold">Verify Created Artworks & Collectibles</h1>
            <div className="border border-b-2 border-new-gray my-8" />
            <div className="flex flex-row justify-evenly space-x-48 pt-12 pb-8">
                    <h1 className="font-bold text-2xl">Artworks</h1>
                    <h1 className="font-bold text-2xl">Artwork ID</h1>
                    <h1 className="font-bold text-2xl">Verify Items</h1>
                </div>
                <div>
                    <VerifyOrders name={"Master Jitesh"} id={"0001"} />
                    <VerifyOrders name={"Master Jitesh"} id={"0001"} />
                    <VerifyOrders name={"Master Jitesh"} id={"0001"} />
                    <VerifyOrders name={"Master Jitesh"} id={"0001"} />
                    <VerifyOrders name={"Master Jitesh"} id={"0001"} />
                </div>
        </div>
    )
}