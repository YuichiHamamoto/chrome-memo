import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getBrowserLanguage } from "./slices/settingSlice";
import { AppDispatch, RootState } from "./store";
import ReactMarkdown from "react-markdown";

const STORAGE_KEY = "side_memo";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const lang = useSelector((state: RootState) => state.setting.language);
  const [editing, setEditing] = useState<boolean>(false);
  const [memo, setMemo] = useState<string>("");

  useEffect(() => {
    dispatch(getBrowserLanguage());
    chrome.storage.sync.get([STORAGE_KEY]).then((result) => {
      setMemo(result[STORAGE_KEY]);
    });
  }, []);

  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([memo], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "memo.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleEdit = () => {
    if (editing) {
      chrome.storage.sync.set({ [STORAGE_KEY]: memo });
    }
    setEditing((cur) => !cur);
  };

  const startEditing = () => {
    setEditing(true);
  };

  const handleTextAreaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__header__icon" onClick={download} title={lang === "en" ? "Download" : "ダウンロード"}>
          ⬇️
        </div>
        <div className="app__header__icon" onClick={handleEdit} title={editing ? (lang === "en" ? "Save" : "保存") : lang === "en" ? "Edit" : "編集"}>
          {editing ? "💾" : "✍️"}
        </div>
      </div>
      <div className="app__body">
        {editing ? (
          <>
            <textarea onChange={handleTextAreaOnChange} value={memo}></textarea>
          </>
        ) : (
          <>
            <div className="app__memo" onDoubleClick={startEditing}>
              <ReactMarkdown
                children={memo}
                className="app__memo__md"
                components={{
                  a: (props) => (
                    <a href={props.href} target="_blank">
                      {props.children}
                    </a>
                  ),
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
