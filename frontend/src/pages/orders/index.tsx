import data from '../../info/data.json'
import OwnOrders from 'components/OwnOrders/OwnOrders'
import PlacedOrders from 'components/PlacedOrders/PlacedOrders'
import { ethers } from 'ethers'
import NavbarHome from 'layouts/navbar'
import { useEffect, useState } from 'react'
import { SupplyChain__factory } from 'typechain/factories/contracts/SupplyChain__factory'
import { useAccount, useNetwork, useSwitchNetwork, useBalance } from 'wagmi'
import contract from 'web3/eth/contract'

export default function Orders() {
  const [ownOrder, setOwnOrder] = useState(true)
  const [ownOrders, setOwnOrders] = useState([])
  const [placedOrders, setPlacedOrders] = useState([])
  const [txHash, setTxHash] = useState('')
  let contract
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    addressOrName: address,
  })
  function changeType(type) {
    if (type === 'own') {
      setOwnOrder(true)
    } else {
      setOwnOrder(false)
    }
  }

  async function fetchMyOrders() {
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

    contract.getOrdersByBuyer(address).then(res => {
      console.log('own orders', res)
      setOwnOrders(res)
    })

    contract.getOrdersByCreator().then(res => {
      console.log('placed orders', res)
      setPlacedOrders(res)
    })
  }

  useEffect(() => {
    fetchMyOrders()
  }, [])
  return (
    <div className="bg-primary">
      <NavbarHome current={'orders'} />
      <div className="px-32 pt-12">
        <div className="flex flex-row space-x-16">
          <div>
            {ownOrder ? (
              <h1 className="bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text px-6 text-3xl font-bold text-transparent">
                My Orders
              </h1>
            ) : (
              <h1 className="px-6 text-3xl font-bold" onClick={() => changeType('own')}>
                My Orders
              </h1>
            )}
            {ownOrder && (
              <>
                <div className="mt-6 h-1 bg-gradient-to-br from-secondary-1 to-secondary-2" />
              </>
            )}
          </div>
          <div>
            {!ownOrder ? (
              <h1 className="bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text px-6 text-3xl font-bold text-transparent">
                Placed Orders
              </h1>
            ) : (
              <h1 className="px-6 text-3xl font-bold" onClick={() => changeType('place')}>
                Placed Orders
              </h1>
            )}
            {!ownOrder && (
              <>
                <div className="mt-6 h-1 bg-gradient-to-br from-secondary-1 to-secondary-2" />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="justify-center bg-new-gray px-48 text-center">
        <div className="flex flex-row justify-between pt-12 pb-8">
          <h1 className="text-2xl font-bold">Artwork & Collectibles</h1>
          <h1 className="text-2xl font-bold">Artwork ID</h1>
          <h1 className="text-2xl font-bold">Current Status</h1>
        </div>
        <hr />
        {ownOrder ? (
          <div>
            {ownOrders &&
              ownOrders.map((order, index) => {
                return <OwnOrders artworkId={order[1]} id={order.id} status={order.deliveryStatus} />
              })}

            {/* <OwnOrders name={'Master Shifu'} id={'001'} status={'Not Delivered'} />
            <OwnOrders name={'Master Shi'} id={'002'} status={'Delivered'} />
            <OwnOrders name={'Master Shif'} id={'003'} status={'Approve'} />
            <OwnOrders name={'Master Pro'} id={'004'} status={'Approve'} />
            <OwnOrders name={'Master Ultra'} id={'005'} status={'Delivered'} /> */}
          </div>
        ) : (
          <div>
            {placedOrders &&
              placedOrders.map((order, index) => {
                return <PlacedOrders artworkId={order[1]} id={order.id} status={order.deliveryStatus} />
              })}

            {/* <PlacedOrders name={'Master Shifu'} id={'001'} status={'Not Delivered'} />
            <PlacedOrders name={'Master Shi'} id={'002'} status={'Delivered'} />
            <PlacedOrders name={'Master Shif'} id={'003'} status={'Approve'} />
            <PlacedOrders name={'Master Pro'} id={'004'} status={'Approve'} />
            <PlacedOrders name={'Master Ultra'} id={'005'} status={'Delivered'} /> */}
          </div>
        )}
      </div>
    </div>
  )
}
