import VerifyOrders from 'components/Verify/Verify'
import data from '../../info/data.json'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { SupplyChain__factory } from 'typechain/factories/contracts/SupplyChain__factory'
import { useAccount, useNetwork, useSwitchNetwork, useBalance } from 'wagmi'

export default function Verify() {
  const [showAlert, setShowAlert] = useState(false)
  const [txHash, setTxHash] = useState('')
  let contract
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    addressOrName: address,
  })
  const [unVerifiedArtworks, setUnVerifiedArtworks] = useState([])

  async function getUnverifiedArtworks() {
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

    console.log(contract)
    let artworks = []
    await contract.getAllArtworks().then(res => {
      artworks = res
      console.log(res)
    })
    setUnVerifiedArtworks(artworks.filter(artwork => artwork[5] === false))
  }

  useEffect(() => {
    getUnverifiedArtworks()
  }, [])

  return (
    <div className="h-full bg-primary px-48 py-24">
      <h1 className="text-4xl font-bold">Verify Created Artworks & Collectibles</h1>
      <div className="my-8 border border-b-2 border-new-gray" />
      <div className="flex flex-row justify-evenly space-x-48 pt-12 pb-8">
        <h1 className="text-2xl font-bold">Artworks</h1>
        <h1 className="text-2xl font-bold">Description</h1>
        <h1 className="text-2xl font-bold">Verify Items</h1>
      </div>
      <div>
        {unVerifiedArtworks.map(artwork => (
          <VerifyOrders artwork={artwork} />
        ))}
      </div>
    </div>
  )
}
