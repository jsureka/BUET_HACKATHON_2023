import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function BidModal({isOpen, closeModal, price}) {

    const [currentBid, setCurrentBid] = useState(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-new-gray p-12 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h1"
                  className="text-2xl font-bold leading-6"
                >
                  Place Your Bid
                </Dialog.Title>
                <Dialog.Description as="p" className="text-md mt-3">Current Sale Price: <b>{price}</b> WEI</Dialog.Description>

                <input type="text" className='mt-6 w-hundred py-4 px-6 rounded-lg' onChange={(e) => setCurrentBid(e.target.value)}/>

                <div className="flex mt-8 space-x-8 justify-between">
                  <button
                    type="button"
                    className="border border-white py-2 px-6 rounded-lg"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="justify-center bg-secondary-1 rounded-lg px-6 py-2"
                    
                  >
                    Confirm Bid
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}