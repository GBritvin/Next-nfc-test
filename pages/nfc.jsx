import { useState } from "react";

export default function Nfc() {
  const [tagData, setTagData] = useState();
  const [tagSerialNumber, setTagSerialNumber] = useState();
  async function readTag() {
    console.log(window);
    if ("NDEFReader" in window) {
      const ndef = new window.NDEFReader();
      try {
        await ndef.scan();
        ndef.onreading = (event) => {
          setTagSerialNumber(event.serialNumber);
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            console.log(record);
            console.log("Record type:  " + record.recordType);
            console.log("MIME type:    " + record.mediaType);
            console.log("=== data ===\n" + decoder.decode(record.data));
            setTagData(decoder.decode(record.data));
          }
        };
      } catch (error) {
        console.log(error);
        setTagData(error);
      }
    } else {
      console.log("Web NFC is not supported.");
      setTagData("no");
    }
  }

  return (
    <div>
      <button onClick={readTag}>NFC start</button>
      <button>NFC Stop</button>
      {tagData}
    </div>
  );
}
