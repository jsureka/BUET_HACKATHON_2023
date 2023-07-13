export default function MyListbox({ type, setType }) {
  function changeType(newType: boolean) {
    setType(newType)
  }

  return (
    <div className="flex flex-row space-x-12">
      {type === false ? (
        <div className="flex items-center rounded border border-gray-200 bg-secondary-2 px-8 dark:border-gray-700">
          <label className="w-full ml-2 py-3 font-display text-sm font-medium text-gray-900 dark:text-gray-300">
            Classic
          </label>
        </div>
      ) : (
        <div className="flex items-center rounded border border-gray-200 px-8" onClick={() => changeType(false)}>
          <h1 className="w-full ml-2 py-3 font-display text-sm font-medium text-gray-900 dark:text-gray-300">
            Classic
          </h1>
        </div>
      )}
      {type === true ? (
        <div className="flex items-center rounded border border-gray-200 bg-secondary-2 px-8 dark:border-gray-700">
          <label className="w-full ml-2 py-3 font-display text-sm font-medium text-gray-900 dark:text-gray-300">
            Premium
          </label>
        </div>
      ) : (
        <div className="flex items-center rounded border border-gray-200 px-8" onClick={() => changeType(true)}>
          <h1 className="w-full ml-2 py-3 font-display text-sm font-medium text-gray-900 dark:text-gray-300">
            Premium
          </h1>
        </div>
      )}
    </div>
  )
}
