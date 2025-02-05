import React, { useState } from "react";
import html2canvas from "html2canvas";
import "../styles/styles.css";

const commonColors = [
  "#000000",
  "#FF5733",
  "#3498db",
  "#27ae60",
  "#f1c40f",
  "#8e44ad",
  "#e74c3c",
  "#ffffff",
];

const LogoGenerator = () => {
  const [text1, setText1] = useState("Line 1");
  const [text2, setText2] = useState("Line 2");
  const [textColor1, setTextColor1] = useState("#000000");
  const [textColor2, setTextColor2] = useState("#FF5733");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontSize1, setFontSize1] = useState(40);
  const [fontSize2, setFontSize2] = useState(40);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [isBold1, setIsBold1] = useState(false);
  const [isBold2, setIsBold2] = useState(false);

  const handleDownload = () => {
    const logoDiv = document.getElementById("logoPreview");
    html2canvas(logoDiv).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "logo.png";
      link.click();
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Logo Generator</h2>

      {/* Logo Preview Section */}
      <div
        id="logoPreview"
        style={{
          display: "inline-block",
          padding: "30px",
          backgroundColor: bgColor,
          border: "2px solid #000",
          borderRadius: "10px",
          width: "300px",
          height: "200px",
        }}
      >
        <div
          style={{
            color: textColor1,
            fontSize: `${fontSize1}px`,
            fontFamily: fontFamily,
            fontWeight: isBold1 ? "bold" : "normal",
          }}
        >
          {text1}
        </div>
        <div
          style={{
            color: textColor2,
            fontSize: `${fontSize2}px`,
            fontFamily: fontFamily,
            fontWeight: isBold2 ? "bold" : "normal",
          }}
        >
          {text2}
        </div>
      </div>

      {/* Controls */}
      <div style={{ marginTop: "20px" }}>
        {/* Text Input */}
        <label>Text 1:</label>
        <input
          type="text"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />

        {/* Color Input & Common Colors for Text 1 */}
        <label>Color 1:</label>
        <input
          type="text"
          value={textColor1}
          onChange={(e) => setTextColor1(e.target.value)}
          placeholder="#000000"
        />
        <div>
          {commonColors.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: color,
                border: "1px solid #ccc",
                width: "30px",
                height: "30px",
                margin: "2px",
                cursor: "pointer",
              }}
              onClick={() => setTextColor1(color)}
            />
          ))}
        </div>

        {/* Font Size 1 */}
        <label>Size 1:</label>
        <input
          type="number"
          value={fontSize1}
          min="10"
          max="100"
          onChange={(e) => setFontSize1(e.target.value)}
        />

        {/* Bold Toggle Button for Text 1 */}
        <button onClick={() => setIsBold1(!isBold1)}>
          {isBold1 ? "Unbold Text 1" : "Bold Text 1"}
        </button>

        <br />

        <br />

        {/* Text 2 */}
        <label>Text 2:</label>
        <input
          type="text"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />

        {/* Color Input & Common Colors for Text 2 */}
        <label>Color 2:</label>
        <input
          type="text"
          value={textColor2}
          onChange={(e) => setTextColor2(e.target.value)}
          placeholder="#FF5733"
        />
        <div>
          {commonColors.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: color,
                border: "1px solid #ccc",
                width: "30px",
                height: "30px",
                margin: "2px",
                cursor: "pointer",
              }}
              onClick={() => setTextColor2(color)}
            />
          ))}
        </div>

        {/* Font Size 2 */}
        <label>Size 2:</label>
        <input
          type="number"
          value={fontSize2}
          min="10"
          max="100"
          onChange={(e) => setFontSize2(e.target.value)}
        />

        {/* Bold Toggle Button for Text 2 */}
        <button onClick={() => setIsBold2(!isBold2)}>
          {isBold2 ? "Unbold Text 2" : "Bold Text 2"}
        </button>

        <br />

        {/* Font Selection */}
        <label>Font Family:</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
        </select>

        {/* Background Color Input & Common Colors */}
        <label>Background Color:</label>
        <input
          type="text"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          placeholder="#ffffff"
        />
        <div>
          {commonColors.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: color,
                border: "1px solid #ccc",
                width: "30px",
                height: "30px",
                margin: "2px",
                cursor: "pointer",
              }}
              onClick={() => setBgColor(color)}
            />
          ))}
        </div>

        <br />
        <button
          onClick={handleDownload}
          style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}
        >
          Download Logo
        </button>
      </div>
    </div>
  );
};

export default LogoGenerator;
