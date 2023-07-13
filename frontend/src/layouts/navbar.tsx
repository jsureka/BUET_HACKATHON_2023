import { Disclosure } from '@headlessui/react';
import { useState } from 'react';

export default function NavbarHome() {
  const [name, setName] = useState('Tasmia Zerin');

  return (
    <Disclosure as="nav" className="bg-primary p-2">
      {() => (
        <div className="mx-auto max-w-8xl px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden" />
            <div className="flex items-center justify-start sm:items-center sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="\logo-sm-blue.svg"
                  alt="ArteVerse"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="\logo-sm-blue.svg"
                  alt="ArteVerse"
                />
              </div>
            </div>
            <div
              className="absolute inset-y-0 right-0 flex pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >
            <button type="button" className="mx-6">
                Marketplace
            </button>
            <button type="button" className="mx-6">
                Ranking
            </button>
              <div>
                <img
                  className="block mr-4 ml-6 h-8 sm:h-8 lg:h-10 rounded-full sm:shrink-0"
                  src="\jsureka.jpg"
                  alt="profile"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}