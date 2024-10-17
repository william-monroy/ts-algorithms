"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { ChangeEvent, useState } from "react";
import { useDisclosure } from "@nextui-org/modal";

import CustomModal from "@/components/modal";
import { title } from "@/components/primitives";
import { z } from "@/lib/z";
import { findPalindrom } from "@/lib/manacher";

const Demo = () => {
  const [textInput1, setTextInput1] = useState("");
  const [textInput2, setTextInput2] = useState("");
  const [patternText, setPatternText] = useState("");
  const [highlightPositions, setHighlightPositions] = useState<number[]>([]);
  const [highlightPositionsPalindrome, setHighlightPositionsPalindrome] =
    useState<number[]>([]);
  const [lenPalinfrome, setLenPalinfrome] = useState(0);

  const {
    isOpen: isPatternModalOpen,
    onOpen: onPatternModalOpen,
    onOpenChange: onPatternModalClose,
  } = useDisclosure();
  const {
    isOpen: isPalindromeModalOpen,
    onOpen: onPalindromeModalOpen,
    onOpenChange: onPalindromeModalClose,
  } = useDisclosure();

  const handleFile1Read = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => setTextInput1(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleFile2Read = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => setTextInput2(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleSearchPattern = () => {
    const positions = z(textInput1, patternText);

    setHighlightPositions(positions);

    onPatternModalOpen();
  };

  const handleSearchPalindrome = () => {
    const { positions, length } = findPalindrom(textInput1);

    setHighlightPositionsPalindrome(positions);
    setLenPalinfrome(length);

    onPalindromeModalOpen();
  };

  const highlightText = ({
    bgColor = "yellow",
    textColor = "black",
    highlightPositions,
    highlightLength = patternText.length,
  }: {
    bgColor?: string;
    textColor?: string;
    highlightPositions: number[];
    highlightLength?: number;
  }) => {
    if (!highlightPositions.length) return textInput1;

    const parts = [];
    let lastIndex = 0;

    highlightPositions.forEach((pos) => {
      parts.push(textInput1.substring(lastIndex, pos));
      parts.push(
        `<mark style="background-color: ${bgColor}; color: ${textColor};">${textInput1.substring(
          pos,
          pos + highlightLength
        )}</mark>`
      );
      lastIndex = pos + highlightLength;
    });
    parts.push(textInput1.substring(lastIndex));

    return parts.join("");
  };

  return (
    <div className="flex flex-col justify-center max-w-3xl mx-auto gap-4">
      <h1 className={title({ color: "blue", size: "md" })}>
        Let&apos;s try it out!
      </h1>

      <Card className="flex flex-row w-full gap-4 p-4">
        <div className="flex flex-col w-6/12 gap-2">
          <label
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            accept=".txt"
            aria-describedby="file_input_help"
            className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none  border-none dark:placeholder-gray-400
            bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100
            "
            id="file_input"
            type="file"
            onChange={handleFile1Read}
          />
          <label
            className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="input_text_1"
          >
            Text 1
          </label>
          <Textarea
            id="input_text_1"
            placeholder="Type here or upload a file..."
            rows={10} // Ajusta el tamaño según sea necesario
            value={textInput1}
            onChange={(e) => setTextInput1(e.target.value)}
          />
          <div className="flex flex-row gap-2">
            <Input
              className="w-8/12"
              isDisabled={textInput1 === ""}
              placeholder="Type here..."
              value={patternText}
              onChange={(e) => setPatternText(e.target.value)}
            />
            <Button
              color="primary"
              isDisabled={textInput1 === ""}
              onClick={handleSearchPattern}
            >
              Search pattern
            </Button>
          </div>
          <Button
            color="secondary"
            isDisabled={textInput1 === ""}
            onClick={handleSearchPalindrome}
          >
            Search palindrome
          </Button>
          <Input
            isDisabled={textInput1 === ""}
            placeholder="Autocomplete here..."
          />
        </div>
        <div className="flex flex-col w-6/12 gap-2">
          <label
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input_2"
          >
            Upload file
          </label>
          <input
            accept=".txt"
            aria-describedby="file_input_help"
            className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none  border-none dark:placeholder-gray-400
            bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100
            "
            id="file_input_2"
            type="file"
            onChange={handleFile2Read}
          />
          <label
            className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="input_text_1"
          >
            Text 2
          </label>
          <Textarea
            placeholder="Type here or upload a file..."
            value={textInput2}
            onChange={(e) => setTextInput2(e.target.value)}
          />
          <Button
            color="warning"
            isDisabled={textInput1 === "" || textInput2 === ""}
          >
            Find common subsequence
          </Button>
        </div>
      </Card>

      {/* Modal para buscar patrón */}
      <CustomModal
        content={
          <div
            dangerouslySetInnerHTML={{
              __html: highlightText({ highlightPositions }),
            }}
            style={{ whiteSpace: "pre-wrap" }}
          />
        }
        isOpen={isPatternModalOpen}
        title={`Results for pattern search "${patternText}"`}
        onClose={onPatternModalClose}
      />

      {/* Modal para buscar palíndromo */}
      <CustomModal
        content={
          <div
            dangerouslySetInnerHTML={{
              __html: highlightText({
                bgColor: "green",
                textColor: "white",
                highlightPositions: highlightPositionsPalindrome,
                highlightLength: lenPalinfrome,
              }),
            }}
            style={{ whiteSpace: "pre-wrap" }}
          />
        }
        isOpen={isPalindromeModalOpen}
        title="Palindrome Search Result"
        onClose={onPalindromeModalClose}
      />
    </div>
  );
};

export default Demo;
