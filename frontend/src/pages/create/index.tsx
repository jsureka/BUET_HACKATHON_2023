import data from '../../info/data.json'
import { ethers } from 'ethers'
import MyListbox from 'layouts/listbox'
import NavbarHome from 'layouts/navbar'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork, useSwitchNetwork, useBalance } from 'wagmi'
import { SupplyChain__factory } from 'typechain/factories/contracts/SupplyChain__factory'
import { uploadFileToIPFS } from 'pages/pinata'
import { useRouter } from 'next/router';

export default function CreateArt() {
  const router = useRouter();
  const { artworkId } = router.query;

  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [isPremium, setIsPremium] = useState(false)
  const [tokenURI, setTokenURI] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedFileName, setSelectedFileName] = useState('No File Chosen')
  const [auctionTime, setAuctionTime] = useState(new Date());

  const [showAlert, setShowAlert] = useState(false)
  const [txHash, setTxHash] = useState('')
  let contract
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    addressOrName: address,
  })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(selectedFile)
      console.log(response)
      if (response.success === true) {
        console.log('Uploaded image to Pinata: ' + response.pinataURL)
        setTokenURI(response.pinataURL)

        const artwork = {
          description: description,
          price: price,
          quantity: quantity,
          isPremium: isPremium,
          tokenURI: tokenURI,
          certificateId: 0,
          deadline: 0,
          creator: address,
        }
        console.log(artwork)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        contract = SupplyChain__factory.connect(data.contractAddress, signer)
        let tx = await contract.addArtwork(description, price, quantity, tokenURI, 0, 0)
        let reciept = await tx.wait()
        console.log(reciept)
        setTxHash(reciept.transactionHash)
        setShowAlert(true)
        await contract.getAllArtworks()
      }
    } catch (e) {
      console.log('Error during file upload', e)
    }
  }

  function changeQuantity(type: string, e) {
    e.preventDefault()
    if (type === 'add') {
      setQuantity(quantity + 1)
    } else {
      if (quantity > 0) {
        setQuantity(quantity - 1)
      }
    }
  }

  function handleImage(e) {
    e.preventDefault()
    setSelectedFile(e.target.files[0])
    if (selectedFile !== null) {
      setSelectedFileName(e.target.files[0].name)
    } else {
      setSelectedFileName('No File Chosen')
    }
  }

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
    console.log(artworkId);
    checkIfWalletIsConnected()
  }, [])

  return (
    <div className="bg-primary">
      <NavbarHome current={'create'} />
      <div className="flex flex-col py-24 px-48">
        <h1 className="mb-12 text-5xl font-bold">Create New Art</h1>
        <form className="pr-8" onSubmit={handleSubmit}>
          <div>
            <h2 className="my-8 font-display text-xl">Image of Your Original Artwork</h2>
            <label>
              {selectedFile === null ? (
                <div className="w-16 mx-auto flex h-24 flex-row items-center justify-center rounded-lg border border-dashed bg-new-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h1 className="ml-4 text-center">{selectedFileName}</h1>
                </div>
              ) : (
                <div className="w-16 mx-auto flex h-24 flex-row items-center justify-center rounded-lg border border-dashed bg-secondary-1-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h1 className="ml-4 text-center">{selectedFileName}</h1>
                </div>
              )}
              <input type="file" id="doc" name="doc" hidden onChange={e => handleImage(e)} />
            </label>
          </div>
          <div className="mb-8">
            <h2 className="my-4 font-display text-xl">Name</h2>
            <input
              className="focus:shadow-outline w-hundred appearance-none rounded-md border px-4 py-3 leading-normal shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="Item Name"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <h2 className="my-4 font-display text-xl">Price</h2>
            <input
              className="focus:shadow-outline w-hundred appearance-none rounded-md border px-4 py-3 leading-normal shadow focus:outline-none"
              id="price"
              type="number"
              placeholder="1000 WEI"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <h2 className="my-4 font-display text-xl">Choose Type</h2>
            <MyListbox type={isPremium} setType={setIsPremium} />
          </div>
          { isPremium ? 
          <div className="mb-8">
            <h2 className="my-4 font-display text-xl">Set Auction Ending Time</h2>
            <input type="datetime-local" onChange={(e) => setAuctionTime(new Date(e.target.value))}/>
          </div>
          :
          <></>
              }
          <div className="mb-8">
            <h2 className="my-4 font-display text-xl">Quantity</h2>
            <div className="flex w-new flex-row">
              <button className="text-2xl font-bold" onClick={e => changeQuantity('sub', e)}>
                -
              </button>
              <input
                disabled
                className="focus:shadow-outline mx-4 w-new rounded-md border px-4 py-3 focus:outline-none"
                id="price"
                type="text"
                placeholder="1"
                value={quantity}
              />
              <button className="text-2xl font-bold" onClick={e => changeQuantity('add', e)}>
                +
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <button type="submit" className="mt-16 rounded-lg bg-secondary-1 px-12 py-4 font-display text-lg font-bold">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
