"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { ChangeEvent, useState } from "react";
// import {
//   input as InputStyle,
//   // area as TextAreaStyle,
// } from "@nextui-org/theme";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { title } from "@/components/primitives";
import { z } from "@/lib/z";
import { trie } from "@/lib/trie";

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

      <Card className="flex flex-row w-full gap-2 p-4">
        <div className="flex flex-col w-6/12 gap-2">
          <input accept=".txt" type="file" onChange={handleFile1Read} />
          <textarea
            className="border p-2"
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
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
          </div>
          <Button color="secondary">Search palindrome</Button>
          <Input placeholder="Autocomplete here..." />
        </div>
        <div className="flex flex-col w-6/12 gap-2">
          <input accept=".txt" type="file" onChange={handleFile2Read} />
          <Textarea
            placeholder="Type here..."
            value={textInput2}
            onChange={(e) => setTextInput2(e.target.value)}
          />
          <Button color="warning">Find common subsequence</Button>

          {/* Aquí mostramos el texto resaltado */}
        </div>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div
                  dangerouslySetInnerHTML={{ __html: highlightText() }}
                  className="border p-2 mt-4"
                  style={{ whiteSpace: "pre-wrap" }} // Para mantener los saltos de línea
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
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
