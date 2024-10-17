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
import { findLCS } from "@/lib/lcs";

const Demo = () => {
  const [textInput1, setTextInput1] = useState("");
  const [textInput2, setTextInput2] = useState("");
  const [patternText, setPatternText] = useState("");
  const [highlightPositions, setHighlightPositions] = useState<number[]>([]);
  const [highlightPositionsPalindrome, setHighlightPositionsPalindrome] =
    useState<number[]>([]);
  const [lenPalinfrome, setLenPalinfrome] = useState(0);
  const [highlightLCS1, setHighlightLCS1] = useState<number[]>([]);
  const [highlightLCS2, setHighlightLCS2] = useState<number[]>([]);
  const [lenLCS, setLenLCS] = useState(0);

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
  const {
    isOpen: isLCSModalOpen,
    onOpen: onLCSModalOpen,
    onOpenChange: onLCSModalClose,
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

  const handleSearchLCS = () => {
    const { length, posTxt1, posTxt2 } = findLCS(textInput1, textInput2);

    setLenLCS(length);
    setHighlightLCS1(posTxt1);
    setHighlightLCS2(posTxt2);

    onLCSModalOpen();
  };

  const highlightText = ({
    bgColor = "yellow",
    textColor = "black",
    highlightPositions,
    highlightLength = patternText.length,
    textEval = textInput1,
  }: {
    bgColor?: string;
    textColor?: string;
    highlightPositions: number[];
    highlightLength?: number;
    textEval?: string;
  }) => {
    if (!highlightPositions.length) return textEval;

    const parts = [];
    let lastIndex = 0;

    highlightPositions.forEach((pos) => {
      parts.push(textEval.substring(lastIndex, pos));
      parts.push(
        `<mark style="background-color: ${bgColor}; color: ${textColor};">${textEval.substring(
          pos,
          pos + highlightLength
        )}</mark>`
      );
      lastIndex = pos + highlightLength;
    });
    parts.push(textEval.substring(lastIndex));

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
              isDisabled={textInput1 === "" || patternText === ""}
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
            onClick={handleSearchLCS}
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

      {/* Modal para buscar subsecuencia común más larga */}
      <CustomModal
        content={
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <span>Text1</span>
              <div
                dangerouslySetInnerHTML={{
                  __html: highlightText({
                    bgColor: "#02578f",
                    textColor: "white",
                    highlightPositions: highlightLCS1,
                    highlightLength: lenLCS,
                    textEval: textInput1,
                  }),
                }}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>Text2</span>

              <div
                dangerouslySetInnerHTML={{
                  __html: highlightText({
                    bgColor: "#02578f",
                    textColor: "white",
                    highlightPositions: highlightLCS2,
                    highlightLength: lenLCS,
                    textEval: textInput2,
                  }),
                }}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div>
          </div>
        }
        isOpen={isLCSModalOpen}
        title="Longest Common Subsequence Search Result"
        onClose={onLCSModalClose}
      />
    </div>
  );
};

export default Demo;
