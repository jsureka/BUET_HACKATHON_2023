import data from '../../info/data.json'
import SingleArt from 'components/Artworks/Artwork'
import Search from 'components/Search/Search'
import NavbarHome from 'layouts/navbar'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance } from 'wagmi'
import { SupplyChain__factory } from 'typechain/factories/contracts/SupplyChain__factory'

export default function Marketplace() {
  const [showAlert, setShowAlert] = useState(false)
  const [txHash, setTxHash] = useState('')
  let contract
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    addressOrName: address,
  })
  const [artworks, setArtworks] = useState([])
  const [searchArtworks, setSearchArtworks] = useState([])

  const [searchName, setSearchName] = useState('')
  async function fetchAllArtworks() {
    const { ethereum } = window
    if (ethereum) {
      console.log('Got the ethereum object: ', ethereum)
    } else {
      console.log('No Wallet found. Connect Wallet')
    }
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    contract = SupplyChain__factory.connect(data.contractAddress, signer)
    console.log('Get method:')

    console.log(contract)

    await contract.getAllArtworks().then(res => {
      setArtworks(res)
      setSearchArtworks(res)
      console.log(res)
    })
  }

  function searchArtworksByName(e) {
    setSearchArtworks(artworks.filter(artwork => artwork[1].toLowerCase().includes(searchName.toLowerCase())))
  }
  useEffect(() => {
    fetchAllArtworks()
  }, [])

  return (
    <div className="bg-primary">
      <NavbarHome current={'marketplace'} />
      <div className="p-24">
        <h1 className="text-4xl font-bold">Browse Marketplace</h1>
        <h4 className="my-6 font-body text-2xl capitalize">Browse through more than 100 Artworks on the Marketplace</h4>
        <div className="my-8">
          <div className="mb-3">
            <div className="w-full relative mb-4 flex flex-wrap items-stretch">
              <input
                type="search"
                className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <button
                onClick={e => {
                  searchArtworksByName(e)
                }}
                className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                id="basic-addon2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path
                    fill-rule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-new-gray px-48 py-16">
        <div className="my-4 grid grid-cols-3 grid-rows-3 gap-8">
          {searchArtworks &&
            searchArtworks.map((artwork, index) => {
              return (
                <SingleArt
                  artwork={artwork}
                  key={index}
                  imgSrc={artwork[6]}
                  Title={artwork.description}
                  Artist={artwork[4].toString()}
                  price={artwork.price.toString()}
                  premium={artwork.isPremium}
                />
              )
            })}
          {/* <SingleArt imgSrc={'/art-1.jpg'} Title={'Testing'} Artist={'Tasmia'} price={'3.5 ETH'} premium={false} /> */}
          {/* <SingleArt imgSrc={'/art-2.jpg'} Title={'Testing'} Artist={'Jitesh'} price={'1.4 ETH'} premium={true} />
          <SingleArt imgSrc={'/art-3.jpg'} Title={'Testing'} Artist={'Mustahid'} price={'4.1 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-4.jpg'} Title={'Testing'} Artist={'Tasmia'} price={'3.5 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-5.jpg'} Title={'Testing'} Artist={'Jitesh'} price={'1.4 ETH'} premium={true} />
          <SingleArt imgSrc={'/art-6.jpg'} Title={'Testing'} Artist={'Mustahid'} price={'4.1 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-1.jpg'} Title={'Testing'} Artist={'Tasmia'} price={'3.5 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-2.jpg'} Title={'Testing'} Artist={'Jitesh'} price={'1.4 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-3.jpg'} Title={'Testing'} Artist={'Mustahid'} price={'4.1 ETH'} premium={true} /> */}
        </div>
      </div>
    </div>
  )
}
