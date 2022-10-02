import React from 'react';
import { downloadPasswordsAsPDF } from '../../common/utils';
import DownloadPdfIcon from '../../assets/download_pdf_icon.png';

const PasswordDetailsToPDF = () => {
    return <button className="download-pdf-button" onClick={downloadPasswordsAsPDF}>
        Download as PDF
        <img src={DownloadPdfIcon} alt="Download PDF Icon" />
    </button>

}

export default PasswordDetailsToPDF;