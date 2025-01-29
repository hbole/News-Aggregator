const Select = <T,>({ label, data, value, dataKey, dataValue, dataLabel, onChange }: SelectProps<T>) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <p className="font-bold">{label}</p>
      <div className="relative w-full">
        <select
          className="w-full p-2 border border-gray-600 rounded-lg text-white shadow-sm 
            appearance-none pr-10 hover:bg-gray-700 
            focus:outline-none transition-all"
          value={value}
          onChange={(e) => onChange(e)}
        >
          {data?.map((dataItem: T) => (
            <option key={String(dataItem[dataKey])} value={String(dataItem?.[dataValue])}>
              {String(dataItem?.[dataLabel])}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 pointer-events-none flex flex-col items-center justify-center">
          <i className="text-[10px] fa-solid fa-chevron-up"></i>
          <i className="text-[10px] fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </div>
  )
}

export default Select