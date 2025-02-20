import React, { useState, useEffect } from "react";
import "./Inputs.css";
import { Output } from "../Output/Output";
import {
  IconButton,
  MenuItem,
  Select,
  TextField,
  Checkbox,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import { HexColorPicker } from "react-colorful";
import { fonts, fontSizes } from "../../constants";

export const Inputs = () => {
  const [lines, setLines] = useState(1);
  const [text, setText] = useState({ line1: "", line2: "" });
  const [styles, setStyles] = useState({
    line1: { bold: false, italic: false, fontSize: 50 },
    line2: { bold: false, italic: false, fontSize: 22 },
    favicon: { letter: "", fontSize: 50 },
    color: "#000",
    backgroundColor: "#fff",
  });
  const [selectedFont, setSelectedFont] = useState("Lucida Sans");
  const [alignment, setAlignment] = useState("left");
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    setIsTransparent(styles.backgroundColor === "transparent");
  }, [styles.backgroundColor]);

  const handleTextChange = (line, value) => {
    setText((prev) => ({ ...prev, [line]: value }));
  };

  const clearText = (line) => {
    setText((prev) => ({ ...prev, [line]: "" }));
  };

  const toggleStyle = (line, style) => {
    setStyles((prev) => ({
      ...prev,
      [line]: { ...prev[line], [style]: !prev[line][style] },
    }));
  };

  const handleFontSizeChange = (line, size) => {
    setStyles((prev) => ({
      ...prev,
      [line]: { ...prev[line], fontSize: size },
    }));
  };

  const handleColorChange = (color) => {
    setStyles((prev) => ({
      ...prev,
      color,
    }));
  };

  const handleBackgroundColorChange = (backgroundColor) => {
    setStyles((prev) => ({
      ...prev,
      backgroundColor,
    }));
  };

  const handleFaviconLetterChange = (letter) => {
    setStyles((prev) => ({
      ...prev,
      favicon: { ...prev.favicon, letter },
    }));
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsTransparent(isChecked);
    handleBackgroundColorChange(isChecked ? "transparent" : "#fff");
  };

  const copyColor = (color) => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        console.log("Color copied to clipboard:", color);
      })
      .catch((err) => {
        console.error("Failed to copy color:", err);
      });
  };

  return (
    <div className="mainContainer">
      <div className="inputsContainer">
        <h1 className="logoTitle">DETAILS</h1>
        <div className="numberOfLinesWrapper">
          <p className="linesText">Select Number of Lines</p>
          <Select
            value={lines}
            onChange={(e) => setLines(parseInt(e.target.value))}
            className="linesDropdown"
            size="small"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>
        </div>
        <div className="inputsWrapper">
          <div className="textAndFormatter">
            <TextField
              label="Line 1"
              variant="outlined"
              className="textFields"
              value={text.line1}
              onChange={(e) => handleTextChange("line1", e.target.value)}
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => clearText("line1")}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />
            <IconButton
              className="iconButton"
              onClick={() => toggleStyle("line1", "bold")}
              color={styles.line1.bold ? "primary" : "default"}
              type="contained"
            >
              <FormatBoldIcon />
            </IconButton>
            <IconButton
              className="iconButton"
              onClick={() => toggleStyle("line1", "italic")}
              color={styles.line1.italic ? "primary" : "default"}
            >
              <FormatItalicIcon />
            </IconButton>
            <Select
              value={styles.line1.fontSize}
              onChange={(e) => handleFontSizeChange("line1", e.target.value)}
              className="fontSizeDropdown"
              size="small"
            >
              {fontSizes.map((size, index) => (
                <MenuItem key={index} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </div>
          {lines === 2 && (
            <div className="textAndFormatter">
              <TextField
                label="Line 2"
                variant="outlined"
                className="textFields"
                value={text.line2}
                onChange={(e) => handleTextChange("line2", e.target.value)}
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => clearText("line2")}>
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              />
              <IconButton
                className="iconButton"
                onClick={() => toggleStyle("line2", "bold")}
                color={styles.line2.bold ? "primary" : "default"}
              >
                <FormatBoldIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                onClick={() => toggleStyle("line2", "italic")}
                color={styles.line2.italic ? "primary" : "default"}
              >
                <FormatItalicIcon />
              </IconButton>
              <Select
                value={styles.line2.fontSize}
                onChange={(e) => handleFontSizeChange("line2", e.target.value)}
                className="fontSizeDropdown"
                size="small"
              >
                {fontSizes.map((size, index) => (
                  <MenuItem key={index} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
        </div>
        <div className="fontFamilyWrapper">
          <p className="linesText">Font Family</p>
          <Select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="fontsDropdown"
            style={{ fontFamily: selectedFont }}
            size="small"
          >
            {fonts.map((font, index) => (
              <MenuItem key={index} value={font} style={{ fontFamily: font }}>
                {font}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="alignmentWrapper">
          <p className="linesText">Alignment</p>
          <IconButton
            className="iconButton"
            onClick={() => setAlignment("left")}
            color={alignment === "left" ? "primary" : "default"}
          >
            <FormatAlignLeftIcon />
          </IconButton>
          <IconButton
            className="iconButton"
            onClick={() => setAlignment("center")}
            color={alignment === "center" ? "primary" : "default"}
          >
            <FormatAlignCenterIcon />
          </IconButton>
          <IconButton
            className="iconButton"
            onClick={() => setAlignment("right")}
            color={alignment === "right" ? "primary" : "default"}
          >
            <FormatAlignRightIcon />
          </IconButton>
        </div>
        <div className="faviconDetailsWrapper">
          <div className="faviconSizeWrapper">
            <p className="linesText">Favicon Letter</p>
            <TextField
              label="Letter"
              size="small"
              className="faviconLetter"
              value={styles.favicon.letter}
              onChange={(e) => handleFaviconLetterChange(e.target.value)}
            />
          </div>
          <div className="faviconSizeWrapper">
            <p className="linesText">Favicon Size</p>
            <Select
              value={styles.favicon.fontSize}
              onChange={(e) => handleFontSizeChange("favicon", e.target.value)}
              className="fontSizeDropdown"
              size="small"
            >
              {fontSizes.map((size, index) => (
                <MenuItem key={index} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <p className="transparentBackground">
          <Checkbox
            checked={isTransparent}
            onChange={handleCheckboxChange}
            color="primary"
            className="checkbox"
          />
          Transparent Background
        </p>
        <div className="colorPickerWrapper">
          <div className="backgroundColorWrapper">
            <h6>Background Color</h6>
            <HexColorPicker
              color={styles.backgroundColor}
              onChange={handleBackgroundColorChange}
              className="colorPicker"
            />
            <TextField
              label="Hex Code"
              className="hexCode"
              variant="outlined"
              value={styles.backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => copyColor(styles.backgroundColor)}>
                    <ContentCopyIcon />
                  </IconButton>
                ),
              }}
            />
          </div>
          <div className="backgroundColorWrapper">
            <h6>Text Color</h6>
            <HexColorPicker
              color={styles.color}
              onChange={handleColorChange}
              className="colorPicker"
            />
            <TextField
              label="Hex Code"
              className="hexCode"
              variant="outlined"
              value={styles.color}
              onChange={(e) => handleColorChange(e.target.value)}
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => copyColor(styles.color)}>
                    <ContentCopyIcon />
                  </IconButton>
                ),
              }}
            />
          </div>
        </div>
      </div>
      <div className="outputContainer">
        <h1 className="logoTitle">RESULT</h1>
        {text.line1 || styles.favicon.letter ? (
          <Output
            line1={text.line1}
            line2={text.line2}
            fontFamily={selectedFont}
            styles={styles}
            alignment={alignment}
            faviconLetter={styles.favicon.letter} // Pass favicon letter to Output component
            isTransparent={isTransparent} // Pass transparency state to Output component
          />
        ) : (
          <div className="noResultWrapper">
            <img src="noResult.png" alt="No Result" className="noResultImage" />
            <p className="noText">Oops! Add text to generate...</p>
          </div>
        )}
      </div>
    </div>
  );
};
