import SingleArt from "components/Artworks/Artwork";
import Search from "components/Search/Search";
import NavbarHome from "layouts/navbar";

export default function Marketplace() {
    return(
        <div className="bg-primary">
            <NavbarHome current={"marketplace"}/>
            <div className="p-24">
            <h1 className='font-bold text-4xl'>Browse Marketplace</h1>
            <h4 className='capitalize text-2xl font-body my-6'>Browse through more than 100 Artworks on the Marketplace</h4>
            <div className="my-8">
                <Search/>
            </div>
            </div>
            <div className="bg-new-gray px-48 py-16">
                <div className='grid gap-8 grid-cols-3 grid-rows-3 my-4'>
                    <SingleArt imgSrc={'/art-1.jpg'} Title={'Testing'} Artist={'Tasmia'} price={'3.5 ETH'} premium={false}/>
                    <SingleArt imgSrc={'/art-2.jpg'} Title={'Testing'} Artist={'Jitesh'} price={'1.4 ETH'} premium={true}/>
                    <SingleArt imgSrc={'/art-3.jpg'} Title={'Testing'} Artist={'Mustahid'} price={'4.1 ETH'} premium={false}/>
                    <SingleArt imgSrc={'/art-4.jpg'} Title={'Testing'} Artist={'Tasmia'} price={'3.5 ETH'} premium={false}/>
                    <SingleArt imgSrc={'/art-5.jpg'} Title={'Testing'} Artist={'Jitesh'} price={'1.4 ETH'} premium={true}/>
                    <SingleArt imgSrc={'/art-6.jpg'} Title={'Testing'} Artist={'Mustahid'} price={'4.1 ETH'} premium={false}/>
                    <SingleArt imgSrc={'/art-1.jpg'} Title={'Testing'} Artist={'Tasmia'} price={'3.5 ETH'} premium={false}/>
                    <SingleArt imgSrc={'/art-2.jpg'} Title={'Testing'} Artist={'Jitesh'} price={'1.4 ETH'} premium={false}/>
                    <SingleArt imgSrc={'/art-3.jpg'} Title={'Testing'} Artist={'Mustahid'} price={'4.1 ETH'} premium={true}/>
                </div>
            </div>
        </div>
    )
}