export default function MyListbox({type, setType}) {

    function changeType(newType: string){
        setType(newType);
    }

    return (
        <div className="flex flex-row space-x-12">
            { type === 'classic' ? 
            <div className="flex items-center px-8 border bg-secondary-2 border-gray-200 rounded dark:border-gray-700">
                <label className="font-display w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Classic</label>
            </div>
            :
            <div className="flex items-center px-8 border border-gray-200 rounded" onClick={() => changeType('classic')}>
                <h1 className="font-display w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Classic</h1>
            </div>
            }
            { type === 'premium' ? 
            <div className="flex items-center px-8 border bg-secondary-2 border-gray-200 rounded dark:border-gray-700">
                <label className="font-display w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Premium</label>
            </div>
            :
            <div className="flex items-center px-8 border border-gray-200 rounded" onClick={() => changeType('premium')}>
                <h1 className="font-display w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Premium</h1>
            </div>
            }
        </div>
    )
}