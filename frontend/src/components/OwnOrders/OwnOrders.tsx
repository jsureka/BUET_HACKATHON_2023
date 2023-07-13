import data from '../../info/data.json'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance } from 'wagmi'
import { SupplyChain__factory } from 'typechain/factories/contracts/SupplyChain__factory'

export default function OwnOrders({ artworkId, id, status }) {
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

  async function markAsReceived(e) {
    console.log('Confirm received')
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
    let artwork = await contract.artworks(parseInt(artworkId.toString()))
    // let artwork = artworks.find(artwork => artwork[0].toString() === artworkId.toString())
    console.log(artwork)
    if (artwork) {
      var splittedValue = Math.floor((parseInt(artwork[2].toString()) * 9) / 10)
      let tx = await contract.confirmOrderReception(parseInt(id.toString()), {
        from: signer.getAddress(),
        gasLimit: 2000000,
        value: splittedValue,
      })
      let reciept = await tx.wait()
      console.log(reciept)
      setTxHash(reciept.transactionHash)
      setShowAlert(true)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-1 items-center gap-48 py-4 hover:bg-primary">
        <div className="flex flex-row items-center justify-start">
          <div className="w-12 relative mx-auto my-4 h-12">
            <img className="w-full h-full rounded-md object-cover" src="/soldArt.png" alt="Profile Image" />
          </div>
          <h1 className="text-bold ml-4 text-lg">{id.toString()}</h1>
        </div>
        <div>
          <h1 className="text-lg">{artworkId.toString()}</h1>
        </div>
        <div className="px-6 text-center">
          {status === 2 && (
            <button className="w-8 rounded-lg bg-secondary-2 py-2 px-6 text-white">
              <h1>Received</h1>
            </button>
          )}
          {status === 0 && (
            <button className="w-8 rounded-lg bg-secondary-3 py-2 px-6 text-primary">
              <h1>Not Delivered</h1>
            </button>
          )}
          {status === 1 && (
            <button onClick={e => markAsReceived(e)} className="w-8 rounded-lg bg-secondary-1 py-2 px-6 text-white">
              <h1>Mark as Received</h1>
            </button>
          )}
        </div>
      </div>
    </>
  )
}
