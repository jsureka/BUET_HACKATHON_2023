import { ethers } from 'ethers'
import { useState } from 'react'
import { SupplyChain__factory } from 'typechain/factories/contracts/SupplyChain__factory'
import { useAccount, useNetwork, useSwitchNetwork, useBalance } from 'wagmi'
import data from '../../info/data.json'

export default function VerifyOrders({ artwork }) {
  const [showAlert, setShowAlert] = useState(false)
  const [txHash, setTxHash] = useState('')
  let contract
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    addressOrName: address,
  })

  async function verifyArtwork(e) {
    console.log('Buy Artwork')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    contract = SupplyChain__factory.connect(data.contractAddress, signer)
    let tx = await contract.issueCertificate(parseInt(artwork[0].toString()), Date.now().toString(), 'verified artwork')
    let reciept = await tx.wait()
    console.log(reciept)
    setTxHash(reciept.transactionHash)
    setShowAlert(true)
  }
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-1 items-center gap-48 py-4 hover:bg-primary">
        <div className="flex flex-row items-center justify-start">
          <div className="w-12 relative mx-auto my-4 h-12">
            <img className="w-full h-full rounded-md object-cover" src={artwork.tokenURI} alt="Profile Image" />
          </div>
          <h1 className="text-bold ml-4 text-lg">{parseInt(artwork[0].toString())}</h1>
        </div>
        <div>
          <h1 className="pl-20 text-lg">{artwork.description}</h1>
        </div>
        <div className="px-6 text-center">
          <button
            onClick={e => {
              verifyArtwork(e)
            }}
            className="w-8 rounded-lg bg-secondary-1 py-2 px-6 text-white"
          >
            <h1>Verify</h1>
          </button>
        </div>
      </div>
    </>
  )
}
