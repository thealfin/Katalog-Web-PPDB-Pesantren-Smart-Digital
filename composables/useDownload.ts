export const useDownload = () => {
  const downloadZip = (zipPath: string, templateName: string) => {
    const link = document.createElement('a')
    link.href = zipPath
    link.download = `${templateName.replace(/\s+/g, '-').toLowerCase()}.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    downloadZip,
  }
}
