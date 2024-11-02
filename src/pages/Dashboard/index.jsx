import EmailEditor from "../../components/EmailEditor";
import { useRef, useState } from "react";
import defaultBlockList from "./defaultBlockList.json";
import Header from "./Header";
import { useEffect } from "react";

function Dashboard() {
  const emailEditorRef = useRef(null);
  const [emailData, setEmailData] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setTimeout(() => {
      setEmailData(defaultBlockList);
    }, 300);
  }, []);

  return (
    <div className="dashboard">
      <Header emailEditorEl={emailEditorRef} setLanguage={setLanguage} />
      <div className="dashboard-content">
        {emailData && (
          <EmailEditor
            ref={emailEditorRef}
            defaultBlockList={emailData}
            language={language}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
