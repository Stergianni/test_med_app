import './ReportsLayout.css';
import { Table, Button } from 'react-bootstrap';
import "reactjs-popup/dist/index.css";
import React, { useState } from 'react';

export default function ReportsLayout() {
  const [selectedReport, setSelectedReport] = useState(null);

  // Open Report in a New Tab
  const openReportInNewTab = (reportFileName) => {
    const reportUrl = `${process.env.PUBLIC_URL}/${reportFileName}`;
    window.open(reportUrl, '_blank');
  };

  // Download Report
  const downloadReport = (reportFileName) => {
    const reportUrl = `${process.env.PUBLIC_URL}/${reportFileName}`;

    const link = document.createElement('a');
    link.href = reportUrl;
    link.download = reportFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ margin: "auto", maxWidth: "800px", marginTop: "10%" }}>
      <h2 style={{ marginBottom: "10px" }}>Reports</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Reports */}
          {[
            { id: 1, doctor: "Dr. John Doe", speciality: "Cardiology", reportFile: "patient_report.pdf" },
            { id: 2, doctor: "Dr. Paula Boe", speciality: "Dermatology", reportFile: null } // No report available
          ].map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.doctor}</td>
              <td>{entry.speciality}</td>
              <td>
                {entry.reportFile ? (
                  <Button variant="primary" size='sm' onClick={() => openReportInNewTab(entry.reportFile)}>
                    View Report
                  </Button>
                ) : (
                  <Button variant="secondary" size='sm' disabled>
                    Report Unavailable
                  </Button>
                )}
              </td>
              <td>
                {entry.reportFile ? (
                  <Button variant="success" size='sm' onClick={() => downloadReport(entry.reportFile)}>
                    Download Report
                  </Button>
                ) : (
                  <Button variant="secondary" size='sm' disabled>
                    Download Unavailable
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
