import NavbarHome from 'layouts/navbar'
import { ArrowRightIcon } from '@heroicons/react/solid'
import CreatorCard from 'components/CreatorCard/CreatorCard'
import StepOne from 'components/HowItWorks/Step1'
import StepTwo from 'components/HowItWorks/Step2'
import StepThree from 'components/HowItWorks/Step3'
import Footer from 'layouts/footer'

const array = [...Array(8)]

export default function Home() {
  return (
    <div className='bg-primary'>
      <NavbarHome />
      <div className='px-48'>
      <div className='flex lg:flex-row sm:flex-col my-12 items-center'>
        <div className='w-3/5 pr-12'>
          <h1 className='text-6xl font-bold capitalize leading-normal'>discover <span className='bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent'>unique</span> arts & <span className='bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent'>premium</span> collectibles</h1>
          <h4 className='text-2xl font-body mt-6 capitalize leading-normal'>Collect Authentic Artworks from The Artists & Creators across the Globe</h4>
          <button className='bg-secondary-1 mt-8 px-10 py-3 rounded-2xl font-semibold text-lg font-display'>Get Started</button>
          <div className='flex flex-row my-12 space-x-16'>
              <h1 className='text-2xl'><b className='text-3xl'>240K+</b><br />Total Sale</h1>
              <h1 className='text-2xl'><b className='text-3xl'>100K+</b><br />Auctions</h1>
              <h1 className='text-2xl'><b className='text-3xl'>260K+</b><br />Artists & Creators</h1>
          </div>
        </div>
        <div className='w-3/5 flex justify-center'>
           <div className="w-full h-auto rounded-lg overflow-hidden shadow-lg">
            <div className='flex-shrink-0'>
              <img className="w-full aspect-video object-cover" src="/dashboard-nft.png" alt="The Cat" />
              </div>
            <div className="px-6 py-4 bg-new-gray">
            <div className="text-lg mb-2">The Wool Cat</div>
            </div>
          </div>
          </div>
      </div>
      <div className='mt-36'>
        <div className='flex flex-row justify-between items-end'>
          <div>
            <h1 className='font-bold text-4xl'>Discover <span className='bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent'>Trending</span> Artworks</h1>
            <h4 className='capitalize text-2xl font-body my-6'>Explore Our Weekly Updated Trending Collection</h4>
          </div>
          <button className='border border-secondary-2 text-secondary-2 hover:bg-secondary-2 hover:text-white px-6 py-2 rounded-md font-bold text-lg flex flex-row items-center mb-6'><ArrowRightIcon className='h-4 mr-2'/> See All</button>
          </div>
        <div className='flex flex-row justify-between my-12'>
          <div className='w-new h-auto'>
            <img className='aspect-square w-full object-cover rounded-2xl' src='/art-1.jpg' />
            <h1 className='font-display font-semibold text-lg mt-4'>The Sneezing Egg</h1>
            <div className='flex items-center space-x-2 my-2'>
              <img className='h-7' src="/Avatar.png" />
              <h1 className='font-display text-md'>Tasmia Zerin</h1>
            </div>
          </div>
          <div className='w-new h-auto'>
            <img className='aspect-square w-full object-cover rounded-2xl' src='/art-2.jpg' />
            <h1 className='font-display font-semibold text-lg mt-4'>The Cinema Fish</h1>
            <div className='flex items-center space-x-2 my-2'>
              <img className='h-7' src="/Avatar.png" />
              <h1 className='font-display text-md'>JSureka</h1>
            </div>
          </div>
          <div className='w-new h-auto'>
            <img className='aspect-square w-full object-cover rounded-2xl' src='/art-3.jpg' />
            <h1 className='font-display font-semibold text-lg mt-4'>Just Vibing</h1>
            <div className='flex items-center space-x-2 my-2'>
              <img className='h-7' src="/Avatar.png" />
              <h1 className='font-display text-md'>Mustahid Hasan</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-36'>
      <div className='flex flex-row justify-between items-end'>
          <div>
            <h1 className='font-bold text-4xl'>Top <span className='bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent'>Creators</span></h1>
            <h4 className='capitalize text-2xl font-body my-6'>Checkout Top Rated Creators On The Marketplace</h4>
          </div>
          <button className='border border-secondary-2 text-secondary-2 hover:bg-secondary-2 hover:text-white px-6 py-2 rounded-md font-bold text-md flex flex-row items-center mb-6'><ArrowRightIcon className='h-4 mr-2'/> View Ranking</button>
      </div>
      <div className='grid gap-4 grid-cols-4 grid-rows-2 my-12'>
      {array.map(_=><CreatorCard />)}
      </div>
      </div>
      <div className='mt-36'>
      <div className='flex flex-row justify-between items-end'>
          <div>
            <h1 className='font-bold text-4xl'>How It <span className='bg-gradient-to-br from-secondary-1 to-secondary-2 bg-clip-text text-transparent'>Works</span></h1>
            <h4 className='capitalize text-2xl font-body my-6'>Find Out How To Get Started</h4>
            <div className='grid gap-4 grid-cols-3 grid-rows-1 my-12'>
              <StepOne />
              <StepTwo />
              <StepThree />
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}