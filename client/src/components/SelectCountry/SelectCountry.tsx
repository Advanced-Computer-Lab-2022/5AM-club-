import { COUNTRIES } from "./countries";
import { SelectMenuOption } from "./types";
import { AnimatePresence, motion } from "framer-motion";
import { MutableRefObject, useEffect, useState } from "react";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import "./SelectCountry.css";
export const SelectCountry = React.forwardRef<
  HTMLDivElement,
  {
    id: string;
    open: boolean;
    onToggle: () => void;
    onChange: (value: any) => void;
    selectedValue: SelectMenuOption;
  }
>((props, ref) => {
  useEffect(() => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;

    const handleClickOutside = (event: any) => {
      if (
        mutableRef.current &&
        !mutableRef.current.contains(event.target) &&
        props.open
      ) {
        props.onToggle();
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const [query, setQuery] = useState("");

  return (
    <div
      ref={ref}
      style={{
        marginRight: "5px",
      }}
    >
      <div className=" relative">
        <button
          type="button"
          className="bg-transparent relative w-full border-transparent rounded-md pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm select-country-wrapper"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={props.onToggle}
          style={{
            height: "50px",
            width: "60px",
            padding: "0px",
            border: "none",
            outline: "none",
          }}
        >
          <div>
            <img
              alt={`${props.selectedValue.value}`}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${props.selectedValue.value}.svg`}
              className="inline mr-2 h-4 rounded-sm bg-transparent relative w-full border-transparent rounded-md pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              style={{
                borderRadius: "7px",
                width: "60px",
                padding: "0px",
                border: "none",
                outline: "none",
              }}
            />
          </div>
        </button>
        <div className=" relative">
          <AnimatePresence>
            {props.open && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="scroll-hidden absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                tabIndex={-1}
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
                style={{
                  zIndex: "9999",
                  overflowY: "scroll",
                  maxHeight: "300px",
                  width: "400px",
                  position: "absolute",
                  right: "200px",
                  top: "60px",
                  borderRadius: "20px",
                }}
              >
                <div
                  className="sticky top-0 z-10 "
                  style={{
                    backgroundColor: "#96CEA8",
                    padding: "10px",
                    position: "sticky",
                    width: "100%",
                    top: "0",
                    zIndex: "999",
                  }}
                >
                  <input
                    type="search"
                    name="search"
                    autoComplete={"off"}
                    className="expand-search search-input-country focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder={"Search a country"}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                      marginBottom: "10px",
                      marginLeft: "20px",
                    }}
                  />
                </div>

                <div
                  className={
                    "max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll"
                  }
                  style={{ backgroundColor: "white" }}
                >
                  {COUNTRIES.filter((country) =>
                    country.title.toLowerCase().startsWith(query.toLowerCase())
                  ).length === 0 ? (
                    <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                      No countries found
                    </li>
                  ) : (
                    COUNTRIES.filter((country) =>
                      country.title
                        .toLowerCase()
                        .startsWith(query.toLowerCase())
                    ).map((value, index) => {
                      return (
                        <div
                          key={`${props.id}-${index}`}
                          id="listbox-option-0"
                          onClick={() => {
                            props.onChange(value.value);
                            setQuery("");
                            props.onToggle();
                            localStorage.setItem("refresh", "true");
                          }}
                          style={{
                            height: "40px",
                            margin: "20px",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            className={
                              "green-hover" +
                              (props.selectedValue.value === value.value
                                ? " selected-country"
                                : "")
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              alt={`${value.value}`}
                              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                              className={"inline mr-2 h-4 rounded-sm"}
                              style={{
                                height: "40px",
                                borderRadius: "7px",
                              }}
                            />

                            <span className="font-normal truncate country-text">
                              {value.title}
                            </span>
                            {value.value === props.selectedValue.value ? (
                              <CheckIcon></CheckIcon>
                            ) : null}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});
