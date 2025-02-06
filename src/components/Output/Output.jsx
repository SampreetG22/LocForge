import React from "react";
import "./Output.css";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export const Output = (props) => {
  const { line1, line2, fontFamily, styles, alignment } = props;

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

    html2canvas(logoDiv).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Logo.png";
      if (type === "logo" || type === "both") {
        link.click();
      }
    });

    html2canvas(faviconDiv).then((canvas) => {
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

  return (
    <div className="outputMainContainer">
      <div
        className="logoContainer"
        style={{ backgroundColor: styles.backgroundColor }}
      >
        <p style={{ fontFamily, ...getStyle("line1") }}>{line1}</p>
        <p style={{ fontFamily, ...getStyle("line2") }}>{line2}</p>
      </div>
      <div
        className="faviconContainer"
        style={{ backgroundColor: styles.backgroundColor }}
      >
        <p style={{ fontFamily, ...getStyle("favicon") }}>
          {firstLetter(line1)}
        </p>
      </div>
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
      </div>
    </div>
  );
};
