import MyListbox from "layouts/listbox";
import NavbarHome from "layouts/navbar";
import { useState } from "react";

export default function CreateArt() {

    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [type, setType] = useState('classic');

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('No File Chosen');

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Created!');
    }

    function changeQuantity(type: string) {
        if (type === 'add') {
            setQuantity(quantity + 1);
        } else {
            if (quantity > 0) {
                setQuantity(quantity - 1);
            }
        }
    }

    function handleImage(e) {
        setSelectedFile(e.target.files[0]);
        if(selectedFile !== null) {
            setSelectedFileName(e.target.files[0].name);
        } else {
            setSelectedFileName('No File Chosen');
        }
    }

    return (
        <div className="bg-primary">
            <NavbarHome current={"create"} />
            <div className="py-24 px-48 flex flex-col">
                <h1 className="font-bold text-5xl mb-12">Create New Art</h1>
                <form className="pr-8" onSubmit={handleSubmit}>
                    <div>
                        <h2 className="my-8 font-display text-xl">Image of Your Original Artwork</h2>
                        <label>
                            { selectedFile === null ? 
                            <div className="border border-dashed bg-new-gray w-16 h-24 rounded-lg flex items-center justify-center mx-auto flex-row">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                </svg>
                                <h1 className="text-center ml-4">{selectedFileName}</h1>
                            </div> 
                            : 
                            <div className="border border-dashed bg-secondary-1-dark w-16 h-24 rounded-lg flex items-center justify-center mx-auto flex-row">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                </svg>
                                <h1 className="text-center ml-4">{selectedFileName}</h1>
                            </div>
                            }
                            <input type="file" id="doc" name="doc" hidden onChange={(e) => handleImage(e)} />
                        </label>
                    </div>
                    <div className="mb-8">
                        <h2 className="my-4 font-display text-xl">Name</h2>
                        <input className="w-hundred shadow appearance-none border rounded-md px-4 py-3 leading-normal focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-8">
                        <h2 className="my-4 font-display text-xl">Price</h2>
                        <input className="w-hundred shadow appearance-none border rounded-md px-4 py-3 leading-normal focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="0.0 ETH" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="mb-8">
                        <h2 className="my-4 font-display text-xl">Choose Type</h2>
                        <MyListbox type={type} setType={setType} />
                    </div>
                    <div className="mb-8">
                        <h2 className="my-4 font-display text-xl">Quantity</h2>
                        <div className="flex flex-row w-new">
                            <button className="text-2xl font-bold" onClick={() => changeQuantity('add')}>+</button>
                            <input disabled className="w-new border mx-4 rounded-md px-4 py-3 focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="1" value={quantity} />
                            <button className="text-2xl font-bold" onClick={() => changeQuantity('sub')}>-</button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button type='submit' className="bg-secondary-1 font-display font-bold text-lg px-12 py-4 rounded-lg mt-16">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}