import data from '../../info/data.json'
import SingleArt from 'components/Artworks/Artwork'
import Search from 'components/Search/Search'
import NavbarHome from 'layouts/navbar'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance } from 'wagmi'
import { SupplyChain__factory } from 'typechain/factories/contracts/supplyChain.sol/SupplyChain__factory'

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

  async function checkIfWalletIsConnected() {
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

    console.log(await contract.name())
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <div className="bg-primary">
      <NavbarHome current={'marketplace'} />
      <div className="p-24">
        <h1 className="text-4xl font-bold">Browse Marketplace</h1>
        <h4 className="my-6 font-body text-2xl capitalize">Browse through more than 100 Artworks on the Marketplace</h4>
        <div className="my-8">
          <Search />
        </div>
      </div>
      <div className="bg-new-gray px-48 py-16">
        <div className="my-4 grid grid-cols-3 grid-rows-3 gap-8">
          <SingleArt imgSrc={'/art-1.jpg'} Title={'Testing'} Artist={'Tasmia'} price={'3.5 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-2.jpg'} Title={'Testing'} Artist={'Jitesh'} price={'1.4 ETH'} premium={true} />
          <SingleArt imgSrc={'/art-3.jpg'} Title={'Testing'} Artist={'Mustahid'} price={'4.1 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-4.jpg'} Title={'Testing'} Artist={'Tasmia'} price={'3.5 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-5.jpg'} Title={'Testing'} Artist={'Jitesh'} price={'1.4 ETH'} premium={true} />
          <SingleArt imgSrc={'/art-6.jpg'} Title={'Testing'} Artist={'Mustahid'} price={'4.1 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-1.jpg'} Title={'Testing'} Artist={'Tasmia'} price={'3.5 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-2.jpg'} Title={'Testing'} Artist={'Jitesh'} price={'1.4 ETH'} premium={false} />
          <SingleArt imgSrc={'/art-3.jpg'} Title={'Testing'} Artist={'Mustahid'} price={'4.1 ETH'} premium={true} />
        </div>
      </div>
    </div>
  )
}
