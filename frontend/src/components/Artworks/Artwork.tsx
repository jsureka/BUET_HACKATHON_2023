import { parse } from 'path'
import data from '../../info/data.json'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { SupplyChain__factory } from 'typechain/factories/contracts/supplyChain.sol/SupplyChain__factory'
import { useAccount, useNetwork, useSwitchNetwork, useBalance } from 'wagmi'
import { utils } from 'web3'

export default function SingleArt({ artwork, imgSrc, Title, Artist, price, premium }) {
  const [showAlert, setShowAlert] = useState(false)
  const [txHash, setTxHash] = useState('')
  let contract
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    addressOrName: address,
  })
  const [convertedDeadline, setConvertedDeadline] = useState('')

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

  async function buyArtwork(e) {
    console.log('Buy Artwork')
    const splittedValue = Math.floor(parseInt(price) / 10)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    contract = SupplyChain__factory.connect(data.contractAddress, signer)
    let tx = await contract.placeOrder(parseInt(artwork[0].toString()), {
      from: signer.getAddress(),
      gasLimit: 2000000,
      value: splittedValue,
    })
    let reciept = await tx.wait()
    console.log(reciept)
    setTxHash(reciept.transactionHash)
    setShowAlert(true)
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    setConvertedDeadline(new Date(parseInt(artwork.deadline.toString())).toLocaleDateString())
  }, [])
  return (
    <div>
      <div className="block overflow-hidden rounded-2xl shadow-lg hover:scale-105 hover:ease-in">
        <img className="w-full object-cover" src={imgSrc} alt={Title} />
        <div className="bg-primary px-10 py-4">
          <div className="flex flex-row items-start justify-between pt-4">
            <div>
              <h1 className="font-display text-lg font-semibold">{Title}</h1>
              <div className="my-2 flex items-center space-x-2">
                <img className="h-7" src="/Avatar.png" />
                <h1 className="text-md font-display">{Artist}</h1>
              </div>
            </div>
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00AC4F" className="w-8 h-8">
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            {premium ? (
              <div className="mt-6 mb-4">
                <p className="text-gray-400">Auction Ends In</p>
                <h1 className="mt-2 bg-secondary-1-dark font-bold">{convertedDeadline}</h1>
              </div>
            ) : (
              <div className="mt-8 mb-4">
                <h1 className="text-gray-400">Price</h1>
                <p>{price}</p>
              </div>
            )}
            <div className="mt-4">
              {premium ? (
                <button className="rounded-lg bg-secondary-2 py-2 px-3 font-display hover:bg-secondary-1-dark">
                  Place Bid
                </button>
              ) : (
                <button
                  className="rounded-lg bg-secondary-1 py-2 px-4 font-display hover:bg-secondary-1-dark"
                  onClick={e => {
                    buyArtwork(e)
                  }}
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
