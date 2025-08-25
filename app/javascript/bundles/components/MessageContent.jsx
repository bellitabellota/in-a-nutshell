import { useMemo } from "react";

function MessageContent({ messageBodyContent }) {
  const processedHtml = useMemo(
    () => {
      const container = document.createElement("div");
      container.innerHTML = messageBodyContent;

      container.querySelectorAll("action-text-attachment").forEach(attachment => {
        // the two lines below are necessary to avoid double wrapping in dev mode
        if (attachment.dataset.isWrapped) return;
        attachment.dataset.isWrapped = "true";

        const width = parseInt(attachment.getAttribute("width"));
        const height = parseInt(attachment.getAttribute("height"));

        const figure = attachment.querySelector("figure.attachment");
        if (!figure) return;
        const img = figure.querySelector("img");
        if (!img) return;

        figure.style.width = `${width}px`;
        figure.style.maxWidth = "100%";
        figure.style.aspectRatio = `${width} / ${height}`;
        figure.style.background = "rgba(37, 51, 60, 0.15)";

        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";
      });

      return container.innerHTML;
        },
        [messageBodyContent]
      );
  
  // ActionText & Sanitization:
  // https://github.com/rails/actiontext/issues/13
  // https://github.com/rails/actiontext/issues/6
  return <div dangerouslySetInnerHTML={{ __html: processedHtml }} />;
}

export default MessageContent;
