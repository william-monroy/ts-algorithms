"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { ChangeEvent, useState } from "react";

import { title } from "@/components/primitives";

const Demo = () => {
  const [textInput1, setTextInput1] = useState("");
  const [textInput2, setTextInput2] = useState("");

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

  return (
    <div className="flex flex-col justify-center max-w-3xl mx-auto gap-4">
      <h1 className={title({ color: "blue", size: "md" })}>
        Let&apos;s try it out!
      </h1>

      <Card className="flex flex-row w-full gap-2 p-4">
        <div className="flex flex-col w-6/12 gap-2">
          <input accept=".txt" type="file" onChange={handleFile1Read} />
          <Textarea
            placeholder="Type here..."
            value={textInput1}
            onChange={(e) => setTextInput1(e.target.value)}
          />
          <Button color="primary">Search</Button>
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
        </div>
      </Card>
    </div>
  );
};

export default Demo;
