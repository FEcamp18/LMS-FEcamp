export async function getFile(fileId: number, filename: string) {
  try {
    const fileExtension = filename.split(".").pop()?.toLowerCase();

    const mimeTypes: { [key: string]: string } = {
      pdf: "application/pdf",
      png: "image/png",
      jpg: "image/jpeg",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-pdf/${fileId}`,
      {
        method: "GET",
        headers: {
          Accept: Object.values(mimeTypes).join(", "),
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to fetch file: ${response.statusText}`,
      );
    }

    const blob = await response.blob();
    const mimeType = fileExtension ? mimeTypes[fileExtension] : blob.type;
    const blobWithType = mimeType ? new Blob([blob], { type: mimeType }) : blob;

    const url = URL.createObjectURL(blobWithType);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error: unknown) {
    console.error("Failed to download file:", error);
    throw error;
  }
}
