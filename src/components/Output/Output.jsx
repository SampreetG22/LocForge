import React, { useState } from "react";
import "./Output.css";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export const Output = (props) => {
  const {
    line1,
    line2,
    fontFamily,
    styles,
    alignment,
    faviconLetter,
    isTransparent,
  } = props;

  const [contrast, setContrast] = useState("");

  const getStyle = (line) => ({
    fontWeight: styles[line].bold ? "bold" : "normal",
    fontStyle: styles[line].italic ? "italic" : "normal",
    textAlign: alignment,
    fontSize: styles[line].fontSize,
    color: styles.color,
    margin: 0,
  });

  const handleDownload = (type) => {
    const logoDiv = document.querySelector(".logoContainer");
    const faviconDiv = document.querySelector(".faviconContainer");

    html2canvas(logoDiv, { backgroundColor: null }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Logo.png";
      if (type === "logo" || type === "both") {
        link.click();
      }
    });

    html2canvas(faviconDiv, { backgroundColor: null }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Favicon.png";
      if (type === "favicon" || type === "both") {
        link.click();
      }
    });
  };

  const firstLetter = (word) => {
    const letter = word.charAt(0).toUpperCase();
    return letter;
  };

  const checkContrast = async () => {
    const fColor = styles.color.slice(1);
    const bgColor = styles.backgroundColor.slice(1);
    const apiUrl = `https://webaim.org/resources/contrastchecker/?fcolor=${fColor}&bcolor=${bgColor}&api`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setContrast(data);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <div className="outputMainContainer">
      <div
        className="logoContainer"
        style={{
          backgroundColor: isTransparent
            ? "transparent"
            : styles.backgroundColor,
        }}
      >
        <p style={{ fontFamily, ...getStyle("line1") }}>{line1}</p>
        <p style={{ fontFamily, ...getStyle("line2") }}>{line2}</p>
      </div>
      <div
        className="faviconContainer"
        style={{
          backgroundColor: isTransparent
            ? "transparent"
            : styles.backgroundColor,
        }}
      >
        <p style={{ fontFamily, ...getStyle("favicon") }}>
          {faviconLetter.toUpperCase() || firstLetter(line1)}
        </p>
      </div>
      {contrast["AA"] && (
        <p>
          {contrast["AA"].toUpperCase()} +- {contrast["ratio"]}
        </p>
      )}
      <div className="buttonsWrapper">
        <Button
          variant="contained"
          onClick={() => handleDownload("logo")}
          endIcon={<CloudDownloadIcon />}
          className="downloadButtons"
        >
          Logo
        </Button>
        <Button
          variant="contained"
          onClick={() => handleDownload("favicon")}
          endIcon={<CloudDownloadIcon />}
          className="downloadButtons"
        >
          Favicon
        </Button>
        <Button
          variant="contained"
          onClick={() => handleDownload("both")}
          endIcon={<CloudDownloadIcon />}
          className="downloadButtons"
        >
          Both
        </Button>
        <Button
          variant="contained"
          onClick={checkContrast}
          endIcon={<CloudDownloadIcon />}
          className="downloadButtons"
        >
          Check Contrast
        </Button>
      </div>
    </div>
  );
};
