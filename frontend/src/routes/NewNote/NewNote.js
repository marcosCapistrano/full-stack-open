import React, {useRef} from "react";
import styles from "./NewNote.module.css";


export default function NewNote() {
  const textRef = useRef(null);

  const handleSelect = () => {
    const ref = textRef.current;
    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const selection = ref.value.substring(start, end);

    console.log(selection);
  }

  return (
    <>
      <div className={styles.titleContainer}>
        <input
          type="text"
          placeholder="Enter a title"
          autoFocus
          className={styles.title}
        ></input>
      </div>
      <div contentEditable className={styles.textArea}>

      </div>
    </>
  );
}
