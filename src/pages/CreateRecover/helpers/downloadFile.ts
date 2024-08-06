import FileSaver from 'file-saver';
import { isChromeIOS } from './isChromeIOS';

interface DownloadFileType {
  data: string;
  name: string;
  fileType: 'csv' | 'json';
}

export const downloadFile = ({ data, name, fileType }: DownloadFileType) => {
  if (!data || !name) {
    return;
  }

  const type =
    fileType === 'csv'
      ? 'data:text/csv;charset=utf-8'
      : 'application/json; charset=utf-8';

  const blob = new Blob([data], { type });

  if (!isChromeIOS()) {
    FileSaver.saveAs(blob, name + '.' + fileType);
  } else {
    const reader = new FileReader();
    reader.onload = () => {
      window.location.href = reader.result as any;
    };

    reader.readAsDataURL(blob);

    const fileURL = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = fileURL;
    a.target = '_blank';
    a.download = name + '.' + fileType;
    document.body.appendChild(a);
    a.click();
  }
};
