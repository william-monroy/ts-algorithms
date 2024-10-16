"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { ChangeEvent, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { title } from "@/components/primitives";
import { z } from "@/lib/z";

const Demo = () => {
  const [textInput1, setTextInput1] = useState("");
  const [textInput2, setTextInput2] = useState("");
  const [patternText, setPatternText] = useState("");
  const [highlightPositions, setHighlightPositions] = useState<number[]>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    onOpen();
  };

  const highlightText = () => {
    if (!patternText) return textInput1;

    const parts = [];
    let lastIndex = 0;

    highlightPositions.forEach((pos) => {
      parts.push(textInput1.substring(lastIndex, pos));
      parts.push(
        `<mark>${textInput1.substring(pos, pos + patternText.length)}</mark>`
      );
      lastIndex = pos + patternText.length;
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
            placeholder="Type here..."
            rows={10} // Ajusta el tamaño según sea necesario
            value={textInput1}
            onChange={(e) => setTextInput1(e.target.value)}
          />
          <div className="flex flex-row gap-2">
            <Input
              placeholder="Type pattern..."
              value={patternText}
              onChange={(e) => setPatternText(e.target.value)}
            />
            <Button color="primary" onClick={handleSearchPattern}>
              Search
            </Button>
          </div>
          <Button color="secondary">Search palindrome</Button>
          <Input placeholder="Autocomplete here..." />
        </div>
        <div className="flex flex-col w-6/12 gap-2">
          {/* <input accept=".txt" type="file" onChange={handleFile2Read} /> */}
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
            placeholder="Type here..."
            value={textInput2}
            onChange={(e) => setTextInput2(e.target.value)}
          />
          <Button color="warning">Find common subsequence</Button>
        </div>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Results for pattern search &quot;{patternText}&quot;
              </ModalHeader>
              <ModalBody>
                <ScrollShadow className="w-full h-full max-h-96">
                  <div
                    dangerouslySetInnerHTML={{ __html: highlightText() }}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Demo;
