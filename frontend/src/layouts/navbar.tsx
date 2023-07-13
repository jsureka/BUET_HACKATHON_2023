import { Disclosure } from '@headlessui/react';
import { useState } from 'react';
import ConnectWallet from 'components/Connect/ConnectWallet';
import Link from 'next/link'

export default function NavbarHome({current}) {
  const [name, setName] = useState('Tasmia Zerin');
  const [connected, setConnected] = useState(true);

  return (
    <Disclosure as="nav" className="bg-primary p-2 sticky top-0 z-50">
      {() => (
        <div className="mx-auto max-w-8xl px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden" />
            <div className="flex items-center justify-start sm:items-center sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href='/'>
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="\logo-BUET.svg"
                  alt="ArteVerse"
                />
                </Link>
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="\logo-BUET.svg"
                  alt="ArteVerse"
                />
                <h1 className="font-display text-xl font-bold ml-2"><Link href='/'>ARTeVERSE</Link></h1>
              </div>
              
            </div>
            <div
              className="absolute inset-y-0 right-0 flex pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >
            <button type="button" className="mx-6 font-semibold">
              { current === 'marketplace' ? <h1 className='bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent'>Marketplace</h1> : <h1><Link href='/marketplace'>Marketplace</Link></h1> }
            </button>
            <button type="button" className="mx-6 font-semibold">
              { current === 'ranking' ? <h1 className='bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent'>Ranking</h1> : <h1><Link href='/ranking'>Ranking</Link></h1> }
            </button>
            <button type="button" className="mx-6 font-semibold">
              { current === 'orders' ? <h1 className='bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent'>Orders</h1> : <h1><Link href='/orders'>Orders</Link></h1> }
            </button>
            <button type="button" className="mx-6 font-semibold">
              { current === 'create' ? <h1 className='bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent'>Create</h1> : <h1><Link href='/create'>Create</Link></h1> }
            </button>
            <div className="flex w-full flex-col items-center ml-6">
             <ConnectWallet />
            </div>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}