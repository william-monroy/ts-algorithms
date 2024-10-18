import { Input } from "@nextui-org/input";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { searchText } from "@/lib/trie";

interface AutocompleteProps {
  isDisabled?: boolean;
  data: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  isDisabled = false,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<string[]>(data);
  const [inputText, setInputText] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Crear un contenedor para el portal, solo en el cliente
  const [dropdownContainer, setDropdownContainer] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const container = document.createElement("div");
      document.body.appendChild(container);
      setDropdownContainer(container);

      return () => {
        document.body.removeChild(container);
      };
    }
  }, []);

  // Filtrado dinámico
  useEffect(() => {
    const results = searchText(data.join(" "), inputText);
    setFilteredData(results);
    setIsOpen(inputText.length > 0 && results.length > 0);
  }, [inputText, data]);

  // Manejo del teclado para la navegación
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < filteredData.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      setInputText(filteredData[highlightedIndex]);
      setIsOpen(false);
    }
  };

  // Posicionamiento del dropdown
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    placeAbove: false, // Estado para saber si debe estar arriba o abajo
  });

  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const dropdownHeight = dropdownRef.current
        ? dropdownRef.current.offsetHeight
        : 200; // Altura estimada del dropdown

      // Detectar si hay suficiente espacio abajo del input
      const spaceBelow = windowHeight - rect.bottom;
      const placeAbove = spaceBelow < dropdownHeight;

      setDropdownPosition({
        top: placeAbove
          ? rect.top + window.scrollY - dropdownHeight
          : rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        placeAbove,
      });
    }
  };

  useEffect(() => {
    updateDropdownPosition();
    window.addEventListener("resize", updateDropdownPosition);

    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        isDisabled={isDisabled}
        placeholder="Search..."
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setIsOpen(true)} // Abre el dropdown al enfocar
        onKeyDown={handleKeyDown} // Soporte para teclas
      />

      {isOpen &&
        dropdownContainer &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute bg-default-100 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto border border-default-200"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 999, // Asegura que el dropdown esté encima de otros elementos
              position: "absolute",
            }}
          >
            <ScrollShadow className="max-h-40">
              {filteredData.length === 0 ? (
                <div className="p-2 text-gray-500">No results found</div>
              ) : (
                filteredData.map((item, index) => (
                  <div
                    key={index}
                    aria-selected={highlightedIndex === index}
                    className={`p-2 cursor-pointer hover:bg-default-200 ${
                      highlightedIndex === index ? "bg-default-100" : ""
                    }`}
                    role="option"
                    tabIndex={0}
                    onClick={() => {
                      setInputText(item);
                      setIsOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setInputText(item);
                        setIsOpen(false);
                      }
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)} // Resaltar al pasar el ratón
                  >
                    {item}
                  </div>
                ))
              )}
            </ScrollShadow>
          </div>,
          dropdownContainer
        )}
    </div>
  );
};

export default Autocomplete;
