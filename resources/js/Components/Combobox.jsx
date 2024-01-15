import { useState } from "react";
import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

export default function Combobox({ options, value, onChange, className }) {
    const [query, setQuery] = useState("");

    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) => {
                  return option.toLowerCase().includes(query.toLowerCase());
              });

    return (
        <HeadlessCombobox value={value} onChange={onChange}>
            <div className="relative">
                <div className="relative">
                    <HeadlessCombobox.Input
                        className={
                            "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                            className
                        }
                        onChange={(event) => setQuery(event.target.value)}
                    />

                    <HeadlessCombobox.Button
                        className={"absolute inset-y-0 right-2"}
                    >
                        <ChevronUpDownIcon className="h-6 w-6" />
                    </HeadlessCombobox.Button>
                </div>
                <HeadlessCombobox.Options
                    className={
                        "absolute z-50 max-h-40 w-full mt-2 py-1 overflow-auto bg-white rounded-lg shadow border"
                    }
                >
                    {filteredOptions.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                            Nothing found.
                        </div>
                    ) : (
                        filteredOptions.map((option) => (
                            <HeadlessCombobox.Option
                                key={option}
                                value={option}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-8 pr-4 ${
                                        active
                                            ? "bg-indigo-500 text-white"
                                            : "text-gray-900"
                                    }`
                                }
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {option}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-2 ${
                                                    active
                                                        ? "text-white"
                                                        : "text-indigo-500"
                                                }`}
                                            >
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </HeadlessCombobox.Option>
                        ))
                    )}
                </HeadlessCombobox.Options>
            </div>
        </HeadlessCombobox>
    );
}
