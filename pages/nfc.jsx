import { useState } from "react";

export default function Nfc() {
  const [readnilk, setReadnik] = useState();
  async function readTag() {
    console.log(window);
    if ("NDEFReader" in window) {
      const ndef = new window.NDEFReader();
      try {
        await ndef.scan();
        ndef.onreading = (event) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            console.log("Record type:  " + record.recordType);
            console.log("MIME type:    " + record.mediaType);
            console.log("=== data ===\n" + decoder.decode(record.data));
            setReadnik(decoder.decode(record.data));
          }
        };
      } catch (error) {
        console.log(error);
        setReadnik(error);
      }
    } else {
      console.log("Web NFC is not supported.");
      setReadnik("no");
    }
  }

  return (
    <div>
      <button onClick={readTag}>NFC start</button>
      <button>NFC Stop</button>
      {readnilk}
    </div>
  );
}
