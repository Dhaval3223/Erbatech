export const downloadCSV = (data: string, fileName: string): void => {
  const blob = new Blob([data], { type: 'text/csv' });
  const dataUrl = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = dataUrl;
  downloadLink.download = fileName;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  // Release the object URL to free up resources
  URL.revokeObjectURL(dataUrl);
};
