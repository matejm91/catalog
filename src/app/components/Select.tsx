import { Option } from "../types";

type Select = {
  options: Option[],
  onOptionChange: (value: string) => void,
  value?: string,
}

const Select = ({ options, onOptionChange, value }: Select) => {
  return <select
    className="min-w-[250px] my-2 mr-2 bg-transparent border border-[#ddd] min-h-[56px] rounded-lg"
    onChange={(e) => onOptionChange(e.target.value)}
    value={value}
  >
    {options.map((option: Option) => <option key={option.value} value={option.value}>{option.title}</option>)}
  </select>
}

export default Select;